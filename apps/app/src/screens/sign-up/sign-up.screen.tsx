import React from 'react';
import { SignUpPage } from '@demo-A/app-design-system';
import {
  useSignUpByGoogleMutation,
  useSignUpByCredentialsMutation,
  useAuth,
} from '@demo-A/app-modules';

export const SignUpScreen: React.FC = () => {
  const auth = useAuth();
  const { signUpByGoogle, isLoading: isSignUpByGoogleLoading } =
    useSignUpByGoogleMutation({
      onSuccess: async (data) => auth.signUp({ accessToken: data.accessToken }),
    });

  const { signUpByCredentials, isLoading: isSignUpByCredentialsLoading } =
    useSignUpByCredentialsMutation({
      onSuccess: async (data) => auth.signUp({ accessToken: data.accessToken }),
    });

  return (
    <SignUpPage
      googleClientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
      onSignUpByCredentials={signUpByCredentials}
      onSignUpByGoogleToken={signUpByGoogle}
      isLoading={isSignUpByGoogleLoading || isSignUpByCredentialsLoading}
    />
  );
};
