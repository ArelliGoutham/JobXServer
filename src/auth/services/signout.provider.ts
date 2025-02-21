import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class SignoutProvider {
  public signout(res: Response) {
    res.clearCookie('access_token');
    return res.send();
  }
}
