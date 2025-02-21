import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/services/hashing.provider';
import { FindUserProvider } from './find-user.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    let existingUser: any = undefined;
    try {
      existingUser = await this.findUserProvider.findByEmail(
        createUserDto.email,
      );
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }
    if (existingUser) {
      throw new BadRequestException(
        'User already exists. Please check your email address!',
      );
    }

    let hashPassword: string | undefined = undefined;
    if (createUserDto.password) {
      hashPassword = await this.hashingProvider.hashPassword(
        createUserDto.password,
      );
    }
    let user = await this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });
    try {
      user = await this.userRepository.save(user);
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to save the user at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }
    return user;
  }
}
