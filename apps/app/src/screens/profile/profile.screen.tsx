import React from 'react';
import { ProfilePage } from '@demo-A/app-design-system';
import {
  useAuth,
  useProfile,
  useCreatePasswordMutation,
} from '@demo-A/app-modules';

export const ProfileScreen: React.FC = () => {
  const profile = useProfile();
  const { logout } = useAuth();
  const { createPassword, isLoading: isCreatePasswordLoading } =
    useCreatePasswordMutation();

  return (
    <ProfilePage
      profileImageSrc={profile.image}
      profileName={profile.fullName}
      onLogout={logout}
      isCreatePasswordEnabled={!profile.isPasswordCreated}
      onCreatePassword={createPassword}
      isCreatePasswordLoading={isCreatePasswordLoading}
    />
  );
};
