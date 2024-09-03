import {
  AuthSignUpByCredentialsPayload,
  AuthSignUpByGoogleTokenPayload,
} from '@demo-A/api-types';

export type SignUpPageProps = {
  googleClientId: string | null;
  onSignUpByGoogleToken(payload: AuthSignUpByGoogleTokenPayload): void;
  onSignUpByCredentials(payload: AuthSignUpByCredentialsPayload): void;
  isLoading: boolean;
};
