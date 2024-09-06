import React, { useCallback } from 'react';
import { ServicesPage, useCreateServiceModal } from '@demo-A/app-design-system';
import {
  useAuth,
  useCreateServiceMutation,
  useServicesQuery,
} from '@demo-A/app-modules';
import { Routes, Route } from 'react-router-dom';
import { CreateServicePayload } from '@demo-A/api-types';
import { uploadFileToStorage } from '@demo-A/utils';

import { ServiceDetailsScreen } from '../service-details';

export const ServicesScreen: React.FC = () => {
  const { profile } = useAuth();
  const { open: openCreateServiceModal } = useCreateServiceModal();

  const { services } = useServicesQuery();

  const { createService } = useCreateServiceMutation();

  const handleCreateServiceSubmit = useCallback(
    async (params: {
      values: CreateServicePayload;
      media: { image: File };
      modalActions: { hide(): void };
    }) => {
      const { values, media, modalActions } = params;
      if (!profile?.supabase) return;

      const { id, publicUrl, path, fullPath } = await uploadFileToStorage({
        file: media.image,
        bucket: 'demo-a-service-images',
        auth: {
          projectUrl: profile.supabase.projectUrl,
          apiKey: profile.supabase.apiKey,
        },
      });

      await createService({
        cardVariant: values.cardVariant,
        title: values.title,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        supabaseImage: { id, publicUrl, path, fullPath },
      });

      modalActions.hide();
    },
    [createService, profile?.supabase],
  );

  const handleCreateServiceClick = useCallback(
    (variant: 'banner' | 'default') =>
      openCreateServiceModal({
        initialVariant: variant,
        onSubmit: handleCreateServiceSubmit,
      }),
    [handleCreateServiceSubmit, openCreateServiceModal],
  );

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
