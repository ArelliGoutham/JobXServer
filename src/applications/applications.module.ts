import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationService } from './services/applications.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './applications.entity';
import { GetApplicationsProvider } from './services/get-applications.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/gaurds/access-token/access-token.guard';
import { CreateApplicationProvider } from './services/create-application.provider';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationService, GetApplicationsProvider, CreateApplicationProvider],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([JobApplication]),
    PaginationModule,
    AuthModule,
  ],
})
export class ApplicationsModule {}
