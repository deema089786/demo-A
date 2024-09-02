import React from 'react';
import { SignUpPage } from '@demo-A/app-design-system';

export const SignUpScreen: React.FC = () => {
  return (
    <SignUpPage
      googleClientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
    />
  );
};
