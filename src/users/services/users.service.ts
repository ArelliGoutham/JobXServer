import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { AuthService } from 'src/auth/services/auth.service';
import { CreateUserProvider } from './create-user.provider';
import { FindUserProvider } from './find-user.provider';
/**
 * Class for performing User related functionality
 */
@Injectable()
export class UserService {
  /**
   * For creatling instance of the Service
   * @constructor
   * @param userRepository
   * @param authService
   */
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    @Inject(forwardRef(() => CreateUserProvider))
    private readonly createUserProvider: CreateUserProvider,

    private readonly findUserProvider: FindUserProvider,
  ) {}

  /**
   * Find a user by their email address
   * @param email
   * @returns
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.findUserProvider.findByEmail(email);
  }

  async findByEmailIncPassword(email: string): Promise<User | null> {
    return await this.findUserProvider.findByEmailIncPassword(email);
  }

  /**
   * Find a user by Id
   * @param id
   * @returns
   */
  findOneById(id: number) {
    return this.findUserProvider.findOneById(id);
  }

  /**
   * Create a new user
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.createUserProvider.createUser(createUserDto);
  }

  public findAll(): Promise<User[]> {
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'This API endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 112,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description:
          'Occured when trying to access this API endpoint which is moved permanently',
      },
    );
  }
}
