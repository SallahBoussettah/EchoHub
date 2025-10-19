import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createClientDto: CreateClientDto) {
    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        userId,
      },
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'CLIENT_CREATED',
        description: `Created client "${client.name}"`,
        userId,
        clientId: client.id,
      },
    });

    return client;
  }

  async findAll(userId: string, status?: string) {
    const where: any = { userId };

    if (status && status !== 'ALL') {
      where.status = status;
    }

    return this.prisma.client.findMany({
      where,
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(userId: string, id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        projects: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            projects: true,
            clientNotes: true,
            files: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client.userId !== userId) {
      throw new ForbiddenException('You do not have access to this client');
    }

    return client;
  }

  async update(userId: string, id: string, updateClientDto: UpdateClientDto) {
    // Check ownership
    const client = await this.findOne(userId, id);

    const updated = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'CLIENT_UPDATED',
        description: `Updated client "${updated.name}"`,
        userId,
        clientId: updated.id,
      },
    });

    return updated;
  }

  async remove(userId: string, id: string) {
    // Check ownership
    await this.findOne(userId, id);

    return this.prisma.client.delete({
      where: { id },
    });
  }

  async archive(userId: string, id: string) {
    // Check ownership
    await this.findOne(userId, id);

    const archived = await this.prisma.client.update({
      where: { id },
      data: {
        status: 'ARCHIVED',
        archivedAt: new Date(),
      },
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'CLIENT_ARCHIVED',
        description: `Archived client "${archived.name}"`,
        userId,
        clientId: archived.id,
      },
    });

    return archived;
  }
}
