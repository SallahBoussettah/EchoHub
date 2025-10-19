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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@CurrentUser() user: any, @Body() createNoteDto: CreateNoteDto) {
    const note = await this.notesService.create(user.id, createNoteDto);
    return {
      success: true,
      data: note,
      message: 'Note created successfully',
    };
  }

  @Get('client/:clientId')
  async findAllByClient(
    @CurrentUser() user: any,
    @Param('clientId') clientId: string,
  ) {
    const notes = await this.notesService.findAllByClient(user.id, clientId);
    return {
      success: true,
      data: notes,
    };
  }

  @Get('project/:projectId')
  async findAllByProject(
    @CurrentUser() user: any,
    @Param('projectId') projectId: string,
  ) {
    const notes = await this.notesService.findAllByProject(user.id, projectId);
    return {
      success: true,
      data: notes,
    };
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
  ) {
    const note = await this.notesService.update(user.id, id, updateNoteDto);
    return {
      success: true,
      data: note,
      message: 'Note updated successfully',
    };
  }

  @Delete(':id')
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    await this.notesService.remove(user.id, id);
    return {
      success: true,
      message: 'Note deleted successfully',
    };
  }
}
