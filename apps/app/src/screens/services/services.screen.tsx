import React, { useCallback } from 'react';
import {
  ServicesPage,
  useConfirmationModal,
  useCreateServiceModal,
  useServiceDetailsModal,
  useServiceSettingsModal,
} from '@demo-A/app-design-system';
import {
  Service,
  useAuth,
  useCreateServiceMutation,
  useServicesQuery,
  useUpdateServiceStatusMutation,
} from '@demo-A/app-modules';
import { Routes, Route } from 'react-router-dom';
import { CreateServicePayload } from '@demo-A/api-types';
import { uploadFileToStorage } from '@demo-A/utils';
import { useSnackbar } from 'notistack';

import { ServiceDetailsScreen } from '../service-details';

export const ServicesScreen: React.FC = () => {
  const { profile } = useAuth();
  const { open: openConfirmationModal } = useConfirmationModal();
  const { open: openServiceDetailsModal } = useServiceDetailsModal();
  const { open: openCreateServiceModal } = useCreateServiceModal();
  const { open: openServiceSettings, close: closeServiceSettings } =
    useServiceSettingsModal();
  const { enqueueSnackbar } = useSnackbar();

  const { services } = useServicesQuery({
    statusIncludes: ['active', 'draft', 'archived'],
  });
  const { createService } = useCreateServiceMutation();
  const { updateServiceStatus } = useUpdateServiceStatusMutation();

  // region Settings
  const handleServiceDelete = useCallback(
    async (service: Service) => {
      const { confirmed } = await openConfirmationModal({
        title: 'Are you sure?',
        description:
          'When service is deleted it will not longer be visible for you and clients.',
      });
      if (!confirmed) return;
      await updateServiceStatus({ id: service.id, status: 'deleted' });
      enqueueSnackbar('Service deleted!', { variant: 'warning' });
      closeServiceSettings();
    },
    [
      closeServiceSettings,
      enqueueSnackbar,
      openConfirmationModal,
      updateServiceStatus,
    ],
  );

  const handleServiceArchive = useCallback(
    async (service: Service) => {
      const { confirmed } = await openConfirmationModal({
        title: 'Are you sure?',
        description:
          'When service is archived it will not longer be visible for clients.',
      });
      if (!confirmed) return;
      await updateServiceStatus({ id: service.id, status: 'archived' });
      enqueueSnackbar('Service archived!', { variant: 'warning' });
      closeServiceSettings();
    },
    [
      closeServiceSettings,
      enqueueSnackbar,
      openConfirmationModal,
      updateServiceStatus,
    ],
  );

  const handleServicePublish = useCallback(
    async (service: Service) => {
      const { confirmed } = await openConfirmationModal({
        title: 'Are you sure?',
        description:
          'When service is published it will be visible for clients.',
      });
      if (!confirmed) return;
      await updateServiceStatus({ id: service.id, status: 'active' });
      enqueueSnackbar('Service published!', { variant: 'success' });
      closeServiceSettings();
    },
    [
      closeServiceSettings,
      enqueueSnackbar,
      openConfirmationModal,
      updateServiceStatus,
    ],
  );

  const handleServiceSettingsClick = useCallback(
    (params: { serviceId: string }) => {
      const service = services.find((s) => s.id === params.serviceId);
      if (!service) return;
      openServiceSettings({
        serviceStatus: service.status,
        serviceTitle: service.title,
        onServiceDelete: () => handleServiceDelete(service),
        onServiceArchive: () => handleServiceArchive(service),
        onServicePublish: () => handleServicePublish(service),
      });
    },
    [
      handleServiceArchive,
      handleServiceDelete,
      handleServicePublish,
      openServiceSettings,
      services,
    ],
  );
  // endregion

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
        bucket: profile.supabase.serviceImagesBucketName,
        auth: {
          projectUrl: profile.supabase.projectUrl,
          apiKey: profile.supabase.apiKey,
        },
      });

      await createService({
        status: values.status,
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

  const handleCreateServicePreview = useCallback(
    (params: { values: CreateServicePayload; media: { imageSrc: string } }) =>
      openServiceDetailsModal({
        serviceTitle: params.values.title,
        serviceDescription: params.values.longDescription,
        serviceImageSrc: params.media.imageSrc,
      }),
    [openServiceDetailsModal],
  );

  const handleCreateServiceClick = useCallback(
    (variant: 'banner' | 'default') =>
      openCreateServiceModal({
        initialVariant: variant,
        onSubmit: handleCreateServiceSubmit,
        onPreview: handleCreateServicePreview,
      }),
    [
      handleCreateServicePreview,
      handleCreateServiceSubmit,
      openCreateServiceModal,
    ],
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
          isServiceSettingsAvailable={false}
          onServiceSettingsClick={() => undefined}
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
        isServiceSettingsAvailable={profile.isEditModeEnabled}
        onServiceSettingsClick={handleServiceSettingsClick}
      />
      <Routes>
        <Route path="/services/:serviceId" element={<ServiceDetailsScreen />} />
      </Routes>
    </>
  );
};
