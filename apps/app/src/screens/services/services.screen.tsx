import React, { useCallback } from 'react';
import { ServicesPage, useCreateServiceModal } from '@demo-A/app-design-system';
import { useAuth, useServicesQuery } from '@demo-A/app-modules';
import { Routes, Route } from 'react-router-dom';

import { ServiceDetailsScreen } from '../service-details';

export const ServicesScreen: React.FC = () => {
  const { profile } = useAuth();
  const { open: openCreateServiceModal } = useCreateServiceModal();

  const handleCreateServiceClick = useCallback(
    (variant: 'banner' | 'default') =>
      openCreateServiceModal({ initialVariant: variant }),
    [openCreateServiceModal],
  );

  const { services } = useServicesQuery();

  if (!profile) {
    return (
      <>
        <ServicesPage
          services={services}
          isEditModeEnabled={false}
          isAuthenticated={false}
          profileName={null}
          profileImageSrc={null}
          onCreateServiceClick={() => undefined}
        />
        <Routes>
          <Route
            path="/services/:serviceId"
            element={<ServiceDetailsScreen />}
          />
        </Routes>
      </>
    );
  }
  return (
    <>
      <ServicesPage
        isAuthenticated
        services={services}
        isEditModeEnabled={profile.isEditModeEnabled}
        profileName={profile.fullName}
        profileImageSrc={profile.image}
        onCreateServiceClick={handleCreateServiceClick}
      />
      <Routes>
        <Route path="/services/:serviceId" element={<ServiceDetailsScreen />} />
      </Routes>
    </>
  );
};
