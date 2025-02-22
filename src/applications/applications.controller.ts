import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { UpdateApplicationDto } from './dtos/update-application.dto';
import { ApplicationService } from './services/applications.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetApplicationsQueryDto } from './dtos/get-applications-query.dto';
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
    console.log(typeof id);
    return this.applicationService.getApplicationById(id);
  }

  @Put()
  @ApiResponse({
    status: 200,
    description: 'Application updated successfully',
  })
  public updateApplication(@Body() updateApplicationDto: UpdateApplicationDto) {
    return this.applicationService.updateApplication(updateApplicationDto);
  }

  @Delete()
  public deleteApplication() {
    this.applications = [];
    return this.applications;
  }
}
