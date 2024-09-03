import {
  AuthSignUpByCredentialsPayload,
  AuthSignUpByGoogleTokenPayload,
} from '@demo-A/api-types';

export type SignUpFormProps = {
  googleClientId: string | null;
  onSignUpByGoogleToken(payload: AuthSignUpByGoogleTokenPayload): void;
  onSignUpByCredentials(payload: AuthSignUpByCredentialsPayload): void;
  isLoading: boolean;
};
