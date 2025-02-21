import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SigninDto } from './dtos/signin.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async signIn(
    @Body() signinDto: SigninDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.authService.signin(signinDto, res);
  }

  @Post('/google-sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async googleSignIn(
    @Body('googleToken') googleToken: string,
    @Res() res: Response,
  ) {
    return await this.authService.googleLogin(googleToken, res);
  }

  @Post('/sign-out')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(AuthType.None)
  public signOut(@Res() res: Response) {
    return this.authService.signout(res);
  }
}
