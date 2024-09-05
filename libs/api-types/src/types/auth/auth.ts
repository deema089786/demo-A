import { z } from 'zod';

import { JWTAccessToken, JWTRefreshToken } from '../base';
import { UserRole } from '../users';

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
const passwordSchema = z
  .string()
  .min(8)
  .max(20)
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number');
// .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');

export const authCreatePasswordPayloadSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords must match',
        path: ['passwordConfirmation'],
      });
    }
  });
export type AuthCreatePasswordPayload = z.infer<
  typeof authCreatePasswordPayloadSchema
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
  isPasswordCreated: boolean;
  role: UserRole;
  supabase: { projectUrl: string; apiKey: string } | null;
}
// endregion
