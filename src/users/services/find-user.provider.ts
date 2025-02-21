import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindUserProvider {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    let user;
    try {
      user = this.userRepository.findOne({ where: { email } });
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }

    return user;
  }

  async findByEmailIncPassword(email: string): Promise<User | null> {
    let user;
    try {
      user = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password') // Explicitly include password
        .where('user.email = :email', { email })
        .getOne();
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  /**
   * Find a user by Id
   * @param id
   * @returns
   */
  findOneById(id: number): Promise<User> {
    let user;
    try {
      user = this.userRepository.findOne({ where: { id: id } });
    } catch (err) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment',
        {
          description: 'Error Connecting to the database',
        },
      );
    }
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
}
