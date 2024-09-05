import React, { useCallback } from 'react';
import { ProfilePage, useConfirmationModal } from '@demo-A/app-design-system';
import {
  useAuth,
  useProfile,
  useCreatePasswordMutation,
} from '@demo-A/app-modules';

export const ProfileScreen: React.FC = () => {
  const { open: openConfirmationActionSheet } = useConfirmationModal();
  const profile = useProfile();
  const { logout } = useAuth();
  const { createPassword, isLoading: isCreatePasswordLoading } =
    useCreatePasswordMutation();

  const handleLogout = useCallback(
    () =>
      openConfirmationActionSheet({
        title: 'Are you sure?',
        description: 'You can sign up any time later.',
        onConfirm: logout,
      }),
    [logout, openConfirmationActionSheet],
  );

  return (
    <ProfilePage
      profileImageSrc={profile.image}
      profileName={profile.fullName}
      onLogout={handleLogout}
      isCreatePasswordEnabled={!profile.isPasswordCreated}
      onCreatePassword={createPassword}
      isCreatePasswordLoading={isCreatePasswordLoading}
    />
  );
};
