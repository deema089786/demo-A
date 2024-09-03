import React from 'react';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';

import { ScreenLayout } from '../../layout';
import { ProfilePageProps } from './profile-page.types';
import { Button } from '../../atoms';
import { CreatePasswordCard, LogoutCard } from '../../molecules';

export const ProfilePage: React.FC<ProfilePageProps> = (props) => {
  const { profileName, profileImageSrc, onLogout, isCreatePasswordEnabled } =
    props;
  return (
    <ScreenLayout
      isAuthenticated
      profileImageSrc={profileImageSrc}
      profileName={profileName}
    >
      <Stack spacing={2}>
        {isCreatePasswordEnabled && (
          <CreatePasswordCard onSubmit={() => undefined} />
        )}
        <LogoutCard onLogoutClick={onLogout} />
      </Stack>
    </ScreenLayout>
  );
};
