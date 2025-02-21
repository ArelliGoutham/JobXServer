import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/services/users.service';
import { JwtProvider } from './jwt.provider';
import { UserRoles } from 'src/users/enums/userRoles.enum';
import axios from 'axios';
import { Response } from 'express';

@Injectable()
export class GoogleSigninProvider {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtProvider: JwtProvider,
  ) {}

  async googleLogin(googleToken: string, res: Response): Promise<any> {
    // Verify Google token using Google API
    const googleUser = await this.verifyGoogleToken(googleToken);

    // Check if user already exists in the database
    let user = await this.userService.findByEmail(googleUser.email);

    if (!user) {
      // If the user doesn't exist, create a new one
      user = await this.userService.createUser({
        email: googleUser.email,
        name: googleUser.name,
        role: UserRoles.USER, // Default role
      });
    }

    // Generate a custom JWT for your application
    const jwtToken = await this.jwtProvider.generateToken(user);

    res.cookie('access_token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000,
    });
    res.send({ message: 'Successfully verified google signin' });
  }

  private async verifyGoogleToken(token: string): Promise<any> {
    const res = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`,
    );
    return res.data; // Google user data
  }
}
