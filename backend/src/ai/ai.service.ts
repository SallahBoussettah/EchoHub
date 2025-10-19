import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiService {
  private genAI: GoogleGenerativeAI;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const apiKey = this.configService.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateProjectSummary(userId: string, projectId: string) {
    // Check if user has access to this project
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      include: {
        client: true,
        milestones: {
          orderBy: { order: 'asc' },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
          take: 5, // Latest 5 notes
        },
      },
    });

    if (!project || project.userId !== userId) {
      throw new ForbiddenException('You do not have access to this project');
    }

    // Check user's AI usage limit
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { aiUsage: true, aiLimit: true, plan: true },
    });

    if (user.aiUsage >= user.aiLimit) {
      throw new BadRequestException(
        `AI quota exceeded. You've used ${user.aiUsage}/${user.aiLimit} summaries this month. Upgrade to Pro for more.`,
      );
    }

    // Check if we have a recent cached summary (within 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const cachedSummary = await this.prisma.aiSummary.findFirst({
      where: {
        projectId,
        createdAt: { gte: oneDayAgo },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (cachedSummary) {
      return {
        summary: cachedSummary.content,
        cached: true,
        createdAt: cachedSummary.createdAt,
      };
    }

    // Generate new summary
    const summary = await this.generateSummaryWithGemini(project);

    // Save summary to database
    const savedSummary = await this.prisma.aiSummary.create({
      data: {
        content: summary.content,
        type: 'PROJECT',
        projectId,
        tokensUsed: summary.tokensUsed,
        model: 'gemini-2.0-flash-exp',
      },
    });

    // Increment user's AI usage
    await this.prisma.user.update({
      where: { id: userId },
      data: { aiUsage: { increment: 1 } },
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'AI_SUMMARY_GENERATED',
        description: `Generated AI summary for project "${project.title}"`,
        userId,
        clientId: project.clientId,
        projectId,
      },
    });

    return {
      summary: savedSummary.content,
      cached: false,
      createdAt: savedSummary.createdAt,
      tokensUsed: savedSummary.tokensUsed,
    };
  }

  private async generateSummaryWithGemini(project: any) {
    // Using gemini-2.0-flash-exp (experimental, free tier, latest)
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
    });

    // Build context from project data
    const milestonesText =
      project.milestones.length > 0
        ? `\n\nMilestones:\n${project.milestones
            .map(
              (m: any) =>
                `- ${m.completed ? '✅' : '⏳'} ${m.title}${m.description ? ': ' + m.description : ''}`,
            )
            .join('\n')}`
        : '';

    const notesText =
      project.notes.length > 0
        ? `\n\nRecent Notes:\n${project.notes.map((n: any) => `- ${n.content}`).join('\n')}`
        : '';

    const deadlineText = project.deadline
      ? `\nDeadline: ${new Date(project.deadline).toLocaleDateString()}`
      : '';

    const prompt = `Please provide a concise 3-5 bullet point summary of this project's current status and next steps:

Project: ${project.title}
Client: ${project.client.name}
Status: ${project.status.replace('_', ' ')}
Description: ${project.description || 'No description provided'}${deadlineText}${milestonesText}${notesText}

Focus on:
1. Current progress and what's been completed
2. What's currently in progress or pending
3. Key next steps or priorities
4. Any potential blockers or important deadlines

Keep it professional and actionable. Use bullet points starting with •`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Estimate token usage (rough approximation)
      const tokensUsed = Math.ceil((prompt.length + text.length) / 4);

      return {
        content: text.trim(),
        tokensUsed,
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      // Provide more detailed error message
      const errorMessage = error?.message || 'Unknown error';
      throw new BadRequestException(
        `Failed to generate AI summary: ${errorMessage}. Please check your API key and model availability.`,
      );
    }
  }

  async getUserAiUsage(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        aiUsage: true,
        aiLimit: true,
        plan: true,
      },
    });

    return {
      usage: user.aiUsage,
      limit: user.aiLimit,
      remaining: user.aiLimit - user.aiUsage,
      plan: user.plan,
    };
  }

  async resetMonthlyUsage() {
    // This would be called by a cron job on the 1st of each month
    await this.prisma.user.updateMany({
      data: { aiUsage: 0 },
    });
  }
}
