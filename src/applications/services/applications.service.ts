import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateApplicationDto } from '../dtos/create-application.dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { UserService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { JobApplication } from '../applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetApplicationsProvider } from './get-applications.provider';
import { GetApplicationsQueryDto } from '../dtos/get-applications-query.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.inteface';
import { CreateApplicationProvider } from './create-application.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

/**
 * Job Applications service class implementation
 */
@Injectable()
export class ApplicationService {
  /**
   * Constructor for Dependency Injection
   * @param userService
   * @param applicationRepository
   */
  constructor(
    private readonly userService: UserService,
    @InjectRepository(JobApplication)
    private readonly applicationRepository: Repository<JobApplication>,

    private readonly getApplicationsProvider: GetApplicationsProvider,
    private readonly createApplicationProvider: CreateApplicationProvider,
  ) {}

  /**
   * Creates a new job application
   * @param createApplicationDto
   * @returns
   * @throws
   */
  public async createApplication(
    createApplicationDto: CreateApplicationDto,
    user: ActiveUserData,
  ) {
    return this.createApplicationProvider.createApplication(
      createApplicationDto,
      user,
    );
  }

  /**
   * Get user Job Applications
   * @param params
   * @param pagination
   * @returns
   */
  public async getApplications(
    query: GetApplicationsQueryDto,
    user: ActiveUserData,
  ): Promise<Paginated<JobApplication>> {
    return await this.getApplicationsProvider.getApplications(query, user);
  }
}
