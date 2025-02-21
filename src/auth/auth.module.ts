import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HashingProvider } from './services/hashing.provider';
import { BcryptProvider } from './services/bcrypt.provider';
import { SigninUserProvider } from './services/signin-user.provider';
import { JwtModule } from '@nestjs/jwt';
import { JwtProvider } from './services/jwt.provider';
import { GoogleSigninProvider } from './services/google-signin.provider';
import { SignoutProvider } from './services/signout.provider';
import jwtConfig from './config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    SigninUserProvider,
    JwtProvider,
    GoogleSigninProvider,
    SignoutProvider,
  ],
  exports: [AuthService, HashingProvider, JwtProvider],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class AuthModule {}
