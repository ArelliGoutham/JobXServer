import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UpdateApplicationDto } from './dtos/update-application.dto';
import { ApplicationService } from './services/applications.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetApplicationsQueryDto } from './dtos/get-applications-query.dto';
import { AccessTokenGuard } from 'src/auth/gaurds/access-token/access-token.guard';
import { request } from 'http';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly applicationService: ApplicationService, // Uncomment this line if using a service for application-related operations
  ) {}
  applications: any = [];
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Application created successfully',
  })
  public createApplication(
    @Body() request: CreateApplicationDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(user);
    return this.applicationService.createApplication(request, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Get applications for a specific user',
    description:
      'Returns an array of applications based on the provided user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Applications retrieved successfully',
  })
  public getApplications(
    @Query() applicationDto: GetApplicationsQueryDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.applicationService.getApplications(applicationDto, user);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a specific application by ID',
    description: 'Returns the application with the given ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Application retrieved successfully',
  })
  public getApplicationById(@Param('id') id: number) {
    return {
      id: 1,
      company: 'Atlassian',
      role: 'Software Engineer',
      location: 'New York, NY',
      status: 'bookmarked',
      salary: '$100,000 - $130,000',
      jobPostingLink: 'https://www.example.com/job/12345',
      skills: 'React, Node.js, TypeScript, PostgreSQL',
      applicationSource: 'LinkedIn',
      description:
        'We are looking for a skilled full stack developer to work on innovative web applications. The ideal candidate should have experience with React, Node.js, and PostgreSQL.',
      notes: 'Candidate must be willing to work in a remote environment.',
      createdAt: '2025-02-21',
    };
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Application updated successfully',
  })
  public updateApplication(@Body() patchApplicationDto: UpdateApplicationDto) {
    // Implement application-related operations here
    return 'application updated';
  }

  @Delete()
  public deleteApplication() {
    this.applications = [];
    return this.applications;
  }
}
