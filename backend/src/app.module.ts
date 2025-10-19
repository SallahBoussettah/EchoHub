import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Scheduling (for cron jobs)
    ScheduleModule.forRoot(),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
    ClientsModule,

    // TODO: Add more modules as you build them
    // ProjectsModule,
    // NotesModule,
    // FilesModule,
    // AiModule,
    // SearchModule,
    // NotificationsModule,
    // ActivityModule,
    // DashboardModule,
  ],
})
export class AppModule {}
