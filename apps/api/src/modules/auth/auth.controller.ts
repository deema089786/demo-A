import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  AuthSignUpByGoogleTokenPayload,
  AuthSignUpByGoogleTokenResponse,
  authSignUpByGoogleTokenPayloadSchema,
  AuthSignUpByCredentialsPayload,
  AuthSignUpByCredentialsResponse,
  authSignUpByCredentialsPayloadSchema,
  AuthProfileResponse,
  updateProfilePayloadSchema,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '@demo-A/api-types';
import { ZodValidationPipe } from '@demo-A/nest-utils';

import { AuthJwtGuard } from './auth.jwt.strategy';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up/google')
  @UsePipes(new ZodValidationPipe(authSignUpByGoogleTokenPayloadSchema))
  signUpByGoogleToken(
    @Body() payload: AuthSignUpByGoogleTokenPayload,
  ): Promise<AuthSignUpByGoogleTokenResponse> {
    return this.authService.signUpByGoogleToken(payload);
  }

  @Post('/sign-up/credentials')
  @UsePipes(new ZodValidationPipe(authSignUpByCredentialsPayloadSchema))
  signUpByCredentials(
    @Body() payload: AuthSignUpByCredentialsPayload,
  ): Promise<AuthSignUpByCredentialsResponse> {
    return this.authService.signUpByCredentials(payload);
  }

  @Get('/profile')
  @UseGuards(AuthJwtGuard)
  getUserProfile(): Promise<AuthProfileResponse> {
    return this.authService.getUserProfile();
  }

  @Patch('/profile')
  @UseGuards(AuthJwtGuard)
  @UsePipes(new ZodValidationPipe(updateProfilePayloadSchema))
  updateUserProfile(
    @Body() updateProfilePayload: UpdateProfilePayload,
  ): Promise<UpdateProfileResponse> {
    return this.authService.updateUserProfile(updateProfilePayload);
  }
}
