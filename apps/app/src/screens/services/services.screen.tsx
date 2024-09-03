import React from 'react';
import { ServicesPage } from '@demo-A/app-design-system';
import { useAuth } from '@demo-A/app-modules';

export const ServicesScreen: React.FC = () => {
  const { profile } = useAuth();
  if (!profile) {
    return (
      <ServicesPage
        services={[]}
        editModeEnabled={false}
        isAuthenticated={false}
        profileName={null}
        profileImageSrc={null}
      />
    );
  }
  return (
    <ServicesPage
      isAuthenticated
      services={[]}
      editModeEnabled={false}
      profileName={profile.fullName}
      profileImageSrc={profile.image}
    />
  );
};
