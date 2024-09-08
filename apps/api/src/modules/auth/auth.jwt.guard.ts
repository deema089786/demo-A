import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {}

@Injectable()
export class AuthOptionalJwtGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    // no error is thrown if no user is found
    // You can use info for logging (e.g. token is expired etc.)
    // e.g.: if (info instanceof TokenExpiredError) ...
    return user;
  }
}
