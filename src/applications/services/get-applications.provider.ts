import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JobApplication } from '../applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { GetApplicationsQueryDto } from '../dtos/get-applications-query.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.inteface';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class GetApplicationsProvider {
  constructor(
    @InjectRepository(JobApplication)
    private readonly applicationRepository: Repository<JobApplication>,

    private readonly paginationProvider: PaginationProvider,
  ) {}
  public async getApplications(
    query: GetApplicationsQueryDto,
    user: ActiveUserData,
  ): Promise<Paginated<JobApplication>> {
    const { page = 1, limit = 6 } = query;
    let applications;
    try {
      applications = this.paginationProvider.paginateQuery(
        query,
        this.applicationRepository,
        { user: { id: user.sub } },
      );
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to retrieve the applications at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }
    return applications;
  }
}
