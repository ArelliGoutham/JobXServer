import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService, ConfigType } from '@nestjs/config';
import axios from 'axios';
import { UserService } from 'src/users/services/users.service';
import { User } from 'src/users/user.entity';
import { UserRoles } from 'src/users/enums/userRoles.enum';
import authConfig from '../config/jwt.config';
import { SigninDto } from '../dtos/signin.dto';
import { SigninUserProvider } from './signin-user.provider';
import { JwtProvider } from './jwt.provider';
import { Response } from 'express';
import { GoogleSigninProvider } from './google-signin.provider';
import { SignoutProvider } from './signout.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly googleSigninProvider: GoogleSigninProvider,
    private readonly signinProvider: SigninUserProvider,
    private readonly signoutProvider: SignoutProvider,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async googleLogin(googleToken: string, res: Response): Promise<any> {
    return this.googleSigninProvider.googleLogin(googleToken, res);
  }

  public async signin(signinDto: SigninDto, res: Response) {
    return await this.signinProvider.signin(signinDto, res);
  }

  public signout(res: Response) {
    return this.signoutProvider.signout(res);
  }

  public isAuth() {
    return true;
  }
}
