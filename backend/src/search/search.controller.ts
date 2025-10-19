import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('search')
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchAll(@CurrentUser() user: any, @Query('q') query: string) {
    const results = await this.searchService.searchAll(user.id, query);
    return {
      success: true,
      data: results,
    };
  }

  @Get('clients')
  async searchClients(@CurrentUser() user: any, @Query('q') query: string) {
    const results = await this.searchService.searchClients(user.id, query);
    return {
      success: true,
      data: results,
    };
  }

  @Get('projects')
  async searchProjects(@CurrentUser() user: any, @Query('q') query: string) {
    const results = await this.searchService.searchProjects(user.id, query);
    return {
      success: true,
      data: results,
    };
  }
}
