import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchAll(userId: string, query: string) {
    if (!query || query.trim().length < 2) {
      return {
        clients: [],
        projects: [],
        notes: [],
        total: 0,
      };
    }

    const searchTerm = query.trim();

    // Search clients
    const clients = await this.prisma.client.findMany({
      where: {
        userId,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { company: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { notes: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        _count: {
          select: { projects: true },
        },
      },
      take: 10,
    });

    // Search projects
    const projects = await this.prisma.project.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            milestones: true,
            notes: true,
          },
        },
      },
      take: 10,
    });

    // Search notes
    const notes = await this.prisma.note.findMany({
      where: {
        userId,
        content: { contains: searchTerm, mode: 'insensitive' },
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            clientId: true,
          },
        },
      },
      take: 10,
    });

    return {
      clients,
      projects,
      notes,
      total: clients.length + projects.length + notes.length,
    };
  }

  async searchClients(userId: string, query: string) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerm = query.trim();

    return this.prisma.client.findMany({
      where: {
        userId,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { company: { contains: searchTerm, mode: 'insensitive' } },
          { email: { contains: searchTerm, mode: 'insensitive' } },
          { notes: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        _count: {
          select: { projects: true },
        },
      },
      take: 20,
    });
  }

  async searchProjects(userId: string, query: string) {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const searchTerm = query.trim();

    return this.prisma.project.findMany({
      where: {
        userId,
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      include: {
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            milestones: true,
            notes: true,
          },
        },
      },
      take: 20,
    });
  }
}
