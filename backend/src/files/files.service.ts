import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  private uploadDir = path.join(process.cwd(), 'uploads');

  constructor(private prisma: PrismaService) {
    // Ensure uploads directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async create(
    userId: string,
    file: Express.Multer.File,
    clientId?: string,
    projectId?: string,
  ) {
    // Verify ownership
    if (clientId) {
      const client = await this.prisma.client.findUnique({
        where: { id: clientId },
      });
      if (!client || client.userId !== userId) {
        throw new ForbiddenException('You do not have access to this client');
      }
    }

    if (projectId) {
      const project = await this.prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!project || project.userId !== userId) {
        throw new ForbiddenException('You do not have access to this project');
      }
    }

    // Save file metadata to database
    const fileRecord = await this.prisma.file.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        url: `/uploads/${file.filename}`,
        userId,
        clientId,
        projectId,
      },
    });

    // Log activity
    await this.prisma.activity.create({
      data: {
        action: 'FILE_UPLOADED',
        description: `Uploaded file "${file.originalname}"`,
        userId,
        clientId,
        projectId,
      },
    });

    return fileRecord;
  }

  async findAllByClient(userId: string, clientId: string) {
    const client = await this.prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client || client.userId !== userId) {
      throw new ForbiddenException('You do not have access to this client');
    }

    return this.prisma.file.findMany({
      where: { userId, clientId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllByProject(userId: string, projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.userId !== userId) {
      throw new ForbiddenException('You do not have access to this project');
    }

    return this.prisma.file.findMany({
      where: { userId, projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(userId: string, id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!file || file.userId !== userId) {
      throw new ForbiddenException('You do not have access to this file');
    }

    // Delete physical file
    const filePath = path.join(this.uploadDir, file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from database
    await this.prisma.file.delete({
      where: { id },
    });

    return { message: 'File deleted successfully' };
  }

  async download(userId: string, id: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!file || file.userId !== userId) {
      throw new ForbiddenException('You do not have access to this file');
    }

    const filePath = path.join(this.uploadDir, file.filename);
    if (!fs.existsSync(filePath)) {
      throw new ForbiddenException('File not found on disk');
    }

    return { file, filePath };
  }
}
