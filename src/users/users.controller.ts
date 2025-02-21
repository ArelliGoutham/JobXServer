import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './services/users.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
/**
 * Users comtroller for REST operations
 */
@Controller('users')
@ApiTags('Users') //Optional
export class UsersController {
  /**
   * Class constructor
   * @param userService
   */
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new User
   * @param user
   * @returns
   */
  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  /**
   * Retrieve all Users
   * @deprecated
   * @returns
   */

  @Get()
  public findAll() {
    return 'Deprecated API';
    // return this.userService.findAll();
  }
}
