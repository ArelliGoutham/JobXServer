import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationService } from './services/applications.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './applications.entity';
import { GetApplicationsProvider } from './services/get-applications.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { AuthModule } from 'src/auth/auth.module';
import { CreateApplicationProvider } from './services/create-application.provider';
import { UpdateApplicationProvider } from './services/update-application.provider';

@Module({
  controllers: [ApplicationsController],
  providers: [
    ApplicationService,
    GetApplicationsProvider,
    CreateApplicationProvider,
    UpdateApplicationProvider,
  ],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([JobApplication]),
    PaginationModule,
    AuthModule,
  ],
})
export class ApplicationsModule {}
