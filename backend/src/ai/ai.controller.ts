import { Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summarize/project/:id')
  async summarizeProject(
    @CurrentUser() user: any,
    @Param('id') projectId: string,
  ) {
    const result = await this.aiService.generateProjectSummary(
      user.id,
      projectId,
    );
    return {
      success: true,
      data: result,
      message: result.cached
        ? 'Retrieved cached summary'
        : 'AI summary generated successfully',
    };
  }

  @Get('usage')
  async getUsage(@CurrentUser() user: any) {
    const usage = await this.aiService.getUserAiUsage(user.id);
    return {
      success: true,
      data: usage,
    };
  }
}
