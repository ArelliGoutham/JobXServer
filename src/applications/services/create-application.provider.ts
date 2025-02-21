import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateApplicationDto } from '../dtos/create-application.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { UserService } from 'src/users/services/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobApplication } from '../applications.entity';

@Injectable()
export class CreateApplicationProvider {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(JobApplication)
    private readonly applicationRepository: Repository<JobApplication>,
  ) {}
  public async createApplication(
    createApplicationDto: CreateApplicationDto,
    user: ActiveUserData,
  ) {
    let existingUser;
    try {
      existingUser = await this.userService.findOneById(user.sub);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unbale to process the request at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }

    const application = await this.applicationRepository.create({
      ...createApplicationDto,
      user: existingUser,
    });

    try {
      await this.applicationRepository.save(application);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to save the application at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }

    return application;
  }
}
