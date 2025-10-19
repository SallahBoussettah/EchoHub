import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            file.fieldname + '-' + uniqueSuffix + extname(file.originalname),
          );
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async uploadFile(
    @CurrentUser() user: any,
    @UploadedFile() file: Express.Multer.File,
    @Query('clientId') clientId?: string,
    @Query('projectId') projectId?: string,
  ) {
    const fileRecord = await this.filesService.create(
      user.id,
      file,
      clientId,
      projectId,
    );
    return {
      success: true,
      data: fileRecord,
      message: 'File uploaded successfully',
    };
  }

  @Get('client/:clientId')
  async findAllByClient(
    @CurrentUser() user: any,
    @Param('clientId') clientId: string,
  ) {
    const files = await this.filesService.findAllByClient(user.id, clientId);
    return {
      success: true,
      data: files,
    };
  }

  @Get('project/:projectId')
  async findAllByProject(
    @CurrentUser() user: any,
    @Param('projectId') projectId: string,
  ) {
    const files = await this.filesService.findAllByProject(user.id, projectId);
    return {
      success: true,
      data: files,
    };
  }

  @Get('download/:id')
  async downloadFile(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { file, filePath } = await this.filesService.download(user.id, id);

    const fileStream = fs.createReadStream(filePath);

    res.set({
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename="${file.originalName}"`,
    });

    return new StreamableFile(fileStream);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    await this.filesService.remove(user.id, id);
    return {
      success: true,
      message: 'File deleted successfully',
    };
  }
}
