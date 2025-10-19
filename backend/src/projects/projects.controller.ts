import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller()
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('projects')
  async findAll(@CurrentUser() user: any) {
    const projects = await this.projectsService.findAll(user.id);
    return {
      success: true,
      data: projects,
    };
  }

  @Post('clients/:clientId/projects')
  async create(
    @CurrentUser() user: any,
    @Param('clientId') clientId: string,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const project = await this.projectsService.create(
      user.id,
      clientId,
      createProjectDto,
    );
    return {
      success: true,
      data: project,
      message: 'Project created successfully',
    };
  }

  @Get('clients/:clientId/projects')
  async findAllByClient(
    @CurrentUser() user: any,
    @Param('clientId') clientId: string,
  ) {
    const projects = await this.projectsService.findAllByClient(
      user.id,
      clientId,
    );
    return {
      success: true,
      data: projects,
    };
  }

  @Get('projects/:id')
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    const project = await this.projectsService.findOne(user.id, id);
    return {
      success: true,
      data: project,
    };
  }

  @Patch('projects/:id')
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const project = await this.projectsService.update(
      user.id,
      id,
      updateProjectDto,
    );
    return {
      success: true,
      data: project,
      message: 'Project updated successfully',
    };
  }

  @Delete('projects/:id')
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    await this.projectsService.remove(user.id, id);
    return {
      success: true,
      message: 'Project deleted successfully',
    };
  }

  @Post('projects/:id/milestones')
  async createMilestone(
    @CurrentUser() user: any,
    @Param('id') projectId: string,
    @Body() createMilestoneDto: CreateMilestoneDto,
  ) {
    const milestone = await this.projectsService.createMilestone(
      user.id,
      projectId,
      createMilestoneDto,
    );
    return {
      success: true,
      data: milestone,
      message: 'Milestone created successfully',
    };
  }

  @Patch('projects/:id/milestones/:milestoneId')
  async updateMilestone(
    @CurrentUser() user: any,
    @Param('id') projectId: string,
    @Param('milestoneId') milestoneId: string,
    @Body() data: any,
  ) {
    const milestone = await this.projectsService.updateMilestone(
      user.id,
      projectId,
      milestoneId,
      data,
    );
    return {
      success: true,
      data: milestone,
      message: 'Milestone updated successfully',
    };
  }

  @Delete('projects/:id/milestones/:milestoneId')
  async deleteMilestone(
    @CurrentUser() user: any,
    @Param('id') projectId: string,
    @Param('milestoneId') milestoneId: string,
  ) {
    await this.projectsService.deleteMilestone(user.id, projectId, milestoneId);
    return {
      success: true,
      message: 'Milestone deleted successfully',
    };
  }
}
