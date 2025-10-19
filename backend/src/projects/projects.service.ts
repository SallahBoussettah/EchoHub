import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateMilestoneDto } from './dto/create-milestone.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(
    userId: string,
    clientId: string,
    createProjectDto: CreateProjectDto,
  ) {
    // Verify client ownership
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client || client.userId !== userId) {
      throw new ForbiddenException('You do not have access to this client');
    }

    // Convert deadline string to Date if provided
    const projectData: any = {
      ...createProjectDto,
      clientId,
      userId,
    };

    if (createProjectDto.deadline) {
      projectData.deadline = new Date(createProjectDto.deadline);
    }

    const project = await this.prisma.project.create({
      data: projectData,
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'PROJECT_CREATED',
        description: `Created project "${project.title}"`,
        userId,
        clientId,
        projectId: project.id,
      },
    });

    return project;
  }

  async findAllByClient(userId: string, clientId: string) {
    // Verify client ownership
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client || client.userId !== userId) {
      throw new ForbiddenException('You do not have access to this client');
    }

    return this.prisma.project.findMany({
      where: { clientId, userId },
      include: {
        milestones: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            notes: true,
            files: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        milestones: {
          orderBy: { order: 'asc' },
        },
        notes: {
          orderBy: { createdAt: 'desc' },
        },
        files: {
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            notes: true,
            files: true,
            milestones: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    if (project.userId !== userId) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return project;
  }

  async update(userId: string, id: string, updateProjectDto: UpdateProjectDto) {
    // Check ownership
    await this.findOne(userId, id);

    // Convert deadline string to Date if provided
    const projectData: any = { ...updateProjectDto };
    if (updateProjectDto.deadline) {
      projectData.deadline = new Date(updateProjectDto.deadline);
    }

    const updated = await this.prisma.project.update({
      where: { id },
      data: projectData,
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'PROJECT_UPDATED',
        description: `Updated project "${updated.title}"`,
        userId,
        clientId: updated.clientId,
        projectId: updated.id,
      },
    });

    return updated;
  }

  async remove(userId: string, id: string) {
    // Check ownership
    await this.findOne(userId, id);

    return this.prisma.project.delete({
      where: { id },
    });
  }

  async createMilestone(
    userId: string,
    projectId: string,
    createMilestoneDto: CreateMilestoneDto,
  ) {
    // Check ownership
    await this.findOne(userId, projectId);

    // Get the next order number
    const lastMilestone = await this.prisma.milestone.findFirst({
      where: { projectId },
      orderBy: { order: 'desc' },
    });

    const order =
      createMilestoneDto.order ?? (lastMilestone ? lastMilestone.order + 1 : 0);

    return this.prisma.milestone.create({
      data: {
        ...createMilestoneDto,
        order,
        projectId,
      },
    });
  }

  async updateMilestone(
    userId: string,
    projectId: string,
    milestoneId: string,
    data: any,
  ) {
    // Check ownership
    await this.findOne(userId, projectId);

    const updated = await this.prisma.milestone.update({
      where: { id: milestoneId },
      data,
    });

    // Log activity if completed
    if (data.completed && !updated.completedAt) {
      await this.prisma.activity.create({
        data: {
          action: 'MILESTONE_COMPLETED',
          description: `Completed milestone "${updated.title}"`,
          userId,
          projectId,
        },
      });
    }

    return updated;
  }

  async deleteMilestone(
    userId: string,
    projectId: string,
    milestoneId: string,
  ) {
    // Check ownership
    await this.findOne(userId, projectId);

    return this.prisma.milestone.delete({
      where: { id: milestoneId },
    });
  }
}
