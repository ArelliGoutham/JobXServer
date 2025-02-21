import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { JwtProvider } from 'src/auth/services/jwt.provider';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtProvider: JwtProvider) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract request from execution context
    const request = context.switchToHttp().getRequest();

    // Get access token from request headers
    const accessToken = this.extractRequestFromCookie(request);

    if (!accessToken) {
      // No access token found in request headers, deny access
      throw new UnauthorizedException();
    }

    try {
      // Verify and decode access token
      const payload = await this.jwtProvider.verifyToken(accessToken);

      // Set user to request context
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractRequestFromHeader(request: Request): string | undefined {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }

  private extractRequestFromCookie(request: Request): string | undefined {
    return request.cookies?.access_token;
  }
}
