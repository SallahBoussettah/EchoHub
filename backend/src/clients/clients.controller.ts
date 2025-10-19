import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(
    @CurrentUser() user: any,
    @Body() createClientDto: CreateClientDto,
  ) {
    const client = await this.clientsService.create(user.id, createClientDto);
    return {
      success: true,
      data: client,
      message: 'Client created successfully',
    };
  }

  @Get()
  async findAll(@CurrentUser() user: any, @Query('status') status?: string) {
    const clients = await this.clientsService.findAll(user.id, status);
    return {
      success: true,
      data: clients,
    };
  }

  @Get(':id')
  async findOne(@CurrentUser() user: any, @Param('id') id: string) {
    const client = await this.clientsService.findOne(user.id, id);
    return {
      success: true,
      data: client,
    };
  }

  @Patch(':id')
  async update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const client = await this.clientsService.update(
      user.id,
      id,
      updateClientDto,
    );
    return {
      success: true,
      data: client,
      message: 'Client updated successfully',
    };
  }

  @Delete(':id')
  async remove(@CurrentUser() user: any, @Param('id') id: string) {
    await this.clientsService.remove(user.id, id);
    return {
      success: true,
      message: 'Client deleted successfully',
    };
  }

  @Patch(':id/archive')
  async archive(@CurrentUser() user: any, @Param('id') id: string) {
    const client = await this.clientsService.archive(user.id, id);
    return {
      success: true,
      data: client,
      message: 'Client archived successfully',
    };
  }
}
