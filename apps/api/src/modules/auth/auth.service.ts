import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '@demo-A/api-modules';
import {
  AuthSignUpByGoogleTokenPayload,
  AuthSignUpByGoogleTokenResponse,
  AuthSignUpByCredentialsPayload,
  AuthSignUpByCredentialsResponse,
  AuthCreatePasswordPayload,
  AuthCreatePasswordResponse,
  AuthProfileResponse,
  JWTAccessToken,
  JWTRefreshToken,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '@demo-A/api-types';
import { ConfigService } from '@demo-A/nest-modules';
import { OAuth2Client } from 'google-auth-library';
import { ClsService } from 'nestjs-cls';
import * as bcrypt from 'bcrypt';

import { Config } from '../../config/config.types';
import {
  JWT_ACCESS_TOKEN_SECRETE,
  JWT_REFRESH_TOKEN_SECRETE,
} from './auth.constants';
import { JWTUserTokenData } from './auth.types';

@Injectable()
export class AuthService {
  private oAuth2Client: OAuth2Client;
  private passwordHashSaltRound = 10;

  constructor(
    private configService: ConfigService<Config>,
    private jwtService: JwtService,
    private usersRepository: UsersRepository,
    private cls: ClsService,
  ) {
    const google = this.configService.getBy('google');
    this.oAuth2Client = new OAuth2Client(google.clientId);
  }

  async getUserProfile(): Promise<AuthProfileResponse> {
    const _user = this.cls.get('user');
    if (!_user) throw new Error('User not found');
    const user = await this.usersRepository.getUserById(_user.id, {
      relations: ['profile'],
    });
    if (!user) throw new Error('User not found');
    if (!user.profile) throw new Error('User profile not found');

    const supabase = this.configService.getBy('supabase');

    return {
      id: user.id,
      email: user.email,
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      image: user.profile.image,
      isPasswordCreated: Boolean(user.password),
      role: user.role,
      supabase: ['admin'].includes(user.role)
        ? { projectUrl: supabase.projectUrl, apiKey: supabase.apiKey }
        : null,
    };
  }

  async updateUserProfile(
    payload: UpdateProfilePayload,
  ): Promise<UpdateProfileResponse> {
    try {
      const _user = this.cls.get('user');
      if (!_user) throw new Error('User not found');
      await this.usersRepository.updateUserProfileByUserId(_user.id, {
        firstName: payload.firstName,
        lastName: payload.lastName,
      });
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  }

  async signUpByGoogleToken(
    payload: AuthSignUpByGoogleTokenPayload,
  ): Promise<AuthSignUpByGoogleTokenResponse> {
    const { token } = payload;
    const google = this.configService.getBy('google');
    const ticket = await this.oAuth2Client.verifyIdToken({
      idToken: token,
      audience: google.clientId,
    });
    const ticketPayload = ticket.getPayload();
    if (!ticketPayload) throw new Error('TicketPayload is empty');
    if (!ticketPayload.email)
      throw new Error('TicketPayload does not have "email" field');

    let user = await this.usersRepository.getUserBy({
      email: ticketPayload.email,
    });
    if (!user) {
      user = await this.usersRepository.createUser({
        email: ticketPayload.email,
        firstName: ticketPayload.given_name,
        lastName: ticketPayload.family_name,
        image: ticketPayload.picture,
      });
    }

    const tokens = await this.generateAuthTokens({ userId: user.id });
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async signUpByCredentials(
    payload: AuthSignUpByCredentialsPayload,
  ): Promise<AuthSignUpByCredentialsResponse> {
    const user = await this.usersRepository.getUserBy({
      email: payload.username,
    });

    if (!user) {
      throw new Error('User not found or password incorrect #1');
    }
    // if (!user || !user.password) {
    //   throw new Error('User not found or password incorrect #1');
    // }
    // if (!(await bcrypt.compare(payload.password, user.password))) {
    //   throw new Error('User not found or password incorrect #2');
    // }

    const tokens = await this.generateAuthTokens({ userId: user.id });
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async createPassword(
    payload: AuthCreatePasswordPayload,
  ): Promise<AuthCreatePasswordResponse> {
    const _user = this.cls.get('user');
    if (!_user) throw new Error('User not found');
    const user = await this.usersRepository.getUserById(_user.id);
    if (!user) throw new Error('User not found');
    if (user.password) throw new Error('Password already exist');

    const hashedPassword = await bcrypt.hash(
      payload.password,
      this.passwordHashSaltRound,
    );
    await this.usersRepository.updateUserByUserId(user.id, {
      password: hashedPassword,
    });
    return { success: true };
  }

  async generateAuthTokens(
    payload: JWTUserTokenData,
  ): Promise<{ accessToken: JWTAccessToken; refreshToken: JWTRefreshToken }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: JWT_ACCESS_TOKEN_SECRETE,
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: JWT_REFRESH_TOKEN_SECRETE,
        expiresIn: '14d',
      }),
    ]);

    return {
      accessToken: accessToken as JWTAccessToken,
      refreshToken: refreshToken as JWTRefreshToken,
    };
  }
}
