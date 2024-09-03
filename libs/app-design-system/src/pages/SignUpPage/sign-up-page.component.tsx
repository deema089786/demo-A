import React from 'react';
import { Box } from '@mui/material';

import { ScreenLayout } from '../../layout';
import { SignUpPageProps } from './sign-up-page.types';
import { SignUpForm } from '../../organisms';

export const SignUpPage: React.FC<SignUpPageProps> = (props) => {
  const {
    googleClientId,
    onSignUpByCredentials,
    onSignUpByGoogleToken,
    isLoading,
  } = props;
  return (
    <ScreenLayout
      isAuthenticated={false}
      profileName={null}
      profileImageSrc={null}
    >
      {/*Spacing component*/}
      <Box height="40px" />
      <SignUpForm
        googleClientId={googleClientId}
        onSignUpByGoogleToken={onSignUpByGoogleToken}
        onSignUpByCredentials={onSignUpByCredentials}
        isLoading={isLoading}
      />
    </ScreenLayout>
  );
};
