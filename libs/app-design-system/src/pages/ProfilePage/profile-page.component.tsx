import React from 'react';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';

import { ScreenLayout } from '../../layout';
import { ProfilePageProps } from './profile-page.types';
import { Paper } from '../../atoms';
import { LogoutCard } from '../../molecules';
import { CreatePasswordForm } from '../../organisms';

export const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const {
    profileName,
    profileImageSrc,
    onLogout,
    isCreatePasswordEnabled,
    onCreatePassword,
    isCreatePasswordLoading,
  } = props;

  return (
    <ScreenLayout
      isAuthenticated
      profileImageSrc={profileImageSrc}
      profileName={profileName}
    >
      <Stack spacing={2}>
        {isCreatePasswordEnabled && (
          <Paper>
            <CreatePasswordForm
              onSubmit={onCreatePassword}
              isLoading={isCreatePasswordLoading}
            />
          </Paper>
        )}
        <LogoutCard onLogoutClick={onLogout} />
      </Stack>
    </ScreenLayout>
  );
};
