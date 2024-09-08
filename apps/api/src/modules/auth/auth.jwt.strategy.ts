import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { UsersRepository } from '@demo-A/api-modules';
import { CookiesField, User } from '@demo-A/api-types';
import { ClsService } from 'nestjs-cls';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { JWT_ACCESS_TOKEN_SECRETE } from './auth.constants';
import { JWTUserTokenData } from './auth.types';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersRepository: UsersRepository,
    private readonly cls: ClsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AuthJwtStrategy.extractJWTFromCookies,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: JWT_ACCESS_TOKEN_SECRETE,
      ignoreExpiration: false,
    });
  }

  // requires nest cookies parser (initialized in main.ts)
  private static extractJWTFromCookies(req: Request): string | null {
    if (!req.cookies) return null;
    if (typeof req.cookies[CookiesField.accessToken] !== 'string') return null;
    if (req.cookies[CookiesField.accessToken].length < 1) return null;
    return req.cookies[CookiesField.accessToken];
  }

  async validate(payload: JWTUserTokenData): Promise<User> {
    const user = await this.usersRepository.getUserById(payload.userId);
    if (!user) throw new UnauthorizedException();
    this.cls.set('user', user);
    return user;
  }
}
