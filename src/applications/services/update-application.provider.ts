import { Injectable } from '@nestjs/common';
import { UpdateApplicationDto } from '../dtos/update-application.dto';
import { JobApplication } from '../applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateApplicationProvider {
  constructor(
    @InjectRepository(JobApplication)
    private readonly applicationRepository: Repository<JobApplication>,
  ) {}
  public async updateApplication(
    application: UpdateApplicationDto,
  ): Promise<JobApplication | null> {
    await this.applicationRepository.update(application.id, {
      ...application,
    });

    return await this.applicationRepository.findOneBy({ id: application.id });
  }
}
