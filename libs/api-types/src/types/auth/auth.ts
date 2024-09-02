import { z } from 'zod';

import { JWTAccessToken, JWTRefreshToken } from '../base';

export enum CookiesField {
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
}

// region Sign Up by Google
export const authSignUpByGoogleTokenPayloadSchema = z.object({
  token: z.string(),
});
export type AuthSignUpByGoogleTokenPayload = z.infer<
  typeof authSignUpByGoogleTokenPayloadSchema
>;
export type AuthSignUpByGoogleTokenResponse = {
  accessToken: JWTAccessToken;
  refreshToken: JWTRefreshToken;
};
// endregion

// region Sign Up by Credentials
export const authSignUpByCredentialsPayloadSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type AuthSignUpByCredentialsPayload = z.infer<
  typeof authSignUpByCredentialsPayloadSchema
>;
export type AuthSignUpByCredentialsResponse = {
  accessToken: JWTAccessToken;
  refreshToken: JWTRefreshToken;
};
// endregion

// region Sign Up by Credentials
export const authCreatePasswordPayloadSchema = z.object({
  password: z.string(),
});
export type AuthCreatePasswordPayload = z.infer<
  typeof authSignUpByCredentialsPayloadSchema
>;
export type AuthCreatePasswordResponse = {
  success: boolean;
};
// endregion

// region User's Profile
export interface AuthProfileResponse {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
}
// endregion
