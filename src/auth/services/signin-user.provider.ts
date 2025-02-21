import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { UserService } from 'src/users/services/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { JwtProvider } from './jwt.provider';
import { Response } from 'express';
import { User } from 'src/users/user.entity';
import appConfig from 'src/config/app.config';

@Injectable()
export class SigninUserProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtProvider: JwtProvider,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  public async signin(signinDto: SigninDto, res: Response) {
    let user: User | null;
    try {
      user = await this.userService.findByEmailIncPassword(signinDto.email);
    } catch (error) {
      throw new RequestTimeoutException('Could not process the request', error);
    }

    if (!user) {
      throw new BadRequestException('Email not found');
    }

    let isMatch = false;
    try {
      isMatch = await this.hashingProvider.comparePassword(
        signinDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException('Could not compare passwords', error);
    }

    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = await this.jwtProvider.generateToken(user);

    res.cookie('access_token', accessToken, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: this.appConfiguration.environment === 'production' ? true : false,
      path: '/',
      sameSite:
        // this.appConfiguration.environment === 'production' ? 'none' : 'lax',
        'lax',
    });
    let response = {
      name: user.name,
      role: user.role,
      email: user.email,
    };
    return res.send(response);
  }
}
