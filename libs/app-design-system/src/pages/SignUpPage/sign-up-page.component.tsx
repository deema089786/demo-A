import React from 'react';
import { Box } from '@mui/material';

import { ScreenLayout } from '../../layout';
import { SignUpPageProps } from './sign-up-page.types';
import { SignUpForm } from '../../organisms';

export const SignUpPage: React.FC<SignUpPageProps> = (props) => {
  const { googleClientId } = props;
  return (
    <ScreenLayout user={null}>
      {/*Spacing component*/}
      <Box height="40px" />
      <SignUpForm googleClientId={googleClientId} />
    </ScreenLayout>
  );
};
