import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createNoteDto: CreateNoteDto) {
    // Verify ownership of client or project if provided
    if (createNoteDto.clientId) {
      const client = await this.prisma.client.findUnique({
        where: { id: createNoteDto.clientId },
      });
      if (!client || client.userId !== userId) {
        throw new ForbiddenException('You do not have access to this client');
      }
    }

    if (createNoteDto.projectId) {
      const project = await this.prisma.project.findUnique({
        where: { id: createNoteDto.projectId },
      });
      if (!project || project.userId !== userId) {
        throw new ForbiddenException('You do not have access to this project');
      }
    }

    const note = await this.prisma.note.create({
      data: {
        ...createNoteDto,
        userId,
      },
      include: {
        client: {
          select: { id: true, name: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'NOTE_CREATED',
        description: 'Created a new note',
        userId,
        clientId: createNoteDto.clientId,
        projectId: createNoteDto.projectId,
      },
    });

    return note;
  }

  async findAllByClient(userId: string, clientId: string) {
    // Verify client ownership
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client || client.userId !== userId) {
      throw new ForbiddenException('You do not have access to this client');
    }

    return this.prisma.note.findMany({
      where: {
        userId,
        clientId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllByProject(userId: string, projectId: string) {
    // Verify project ownership
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== userId) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return this.prisma.note.findMany({
      where: {
        userId,
        projectId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(userId: string, id: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note || note.userId !== userId) {
      throw new ForbiddenException('You do not have access to this note');
    }

    return this.prisma.note.update({
      where: { id },
      data: updateNoteDto,
    });
  }

  async remove(userId: string, id: string) {
    const note = await this.prisma.note.findUnique({
      where: { id },
    });

    if (!note || note.userId !== userId) {
      throw new ForbiddenException('You do not have access to this note');
    }

    await this.prisma.note.delete({
      where: { id },
    });

    return { message: 'Note deleted successfully' };
  }
}
