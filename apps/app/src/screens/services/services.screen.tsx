import React, { useCallback } from 'react';
import {
  ServicesPage,
  useConfirmationModal,
  useCreateServiceModal,
  useEditServiceModal,
  useServiceDetailsModal,
  useServiceSettingsModal,
} from '@demo-A/app-design-system';
import {
  Service,
  useAuth,
  useCreateServiceMutation,
  useServicesQuery,
  useUpdateServiceStatusMutation,
  useUpdateServiceMutation,
} from '@demo-A/app-modules';
import { Routes, Route } from 'react-router-dom';
import { CreateServicePayload, UpdateServicePayload } from '@demo-A/api-types';
import {
  uploadFileToStorage,
  UploadFileToStorageParamsResult,
} from '@demo-A/utils';
import { useSnackbar } from 'notistack';

import { ServiceDetailsScreen } from '../service-details';

export const ServicesScreen: React.FC = () => {
  const { profile } = useAuth();
  const { open: openConfirmationModal } = useConfirmationModal();
  const { open: openServiceDetailsModal } = useServiceDetailsModal();
  const { open: openCreateServiceModal, close: closeCreateServiceModal } =
    useCreateServiceModal();
  const { open: openServiceSettings, close: closeServiceSettingsModal } =
    useServiceSettingsModal();
  const { open: openEditServiceModal, close: closeEditeServiceModal } =
    useEditServiceModal();
  const { enqueueSnackbar } = useSnackbar();

  const { services } = useServicesQuery({
    statusIncludes: ['active', 'draft', 'archived'],
  });
  const { createService } = useCreateServiceMutation();
  const { updateServiceStatus } = useUpdateServiceStatusMutation();
  const { updateService } = useUpdateServiceMutation();

  // region Service Settings/Editing
  const handleEditServiceSubmit = useCallback(
    async (params: {
      values: UpdateServicePayload;
      media: { image: File | null };
    }) => {
      const { values, media } = params;
      if (!profile?.supabase) return;

      let supabaseImage: UploadFileToStorageParamsResult | null = null;
      if (media.image) {
        supabaseImage = await uploadFileToStorage({
          file: media.image,
          bucket: profile.supabase.serviceImagesBucketName,
          auth: {
            projectUrl: profile.supabase.projectUrl,
            apiKey: profile.supabase.apiKey,
          },
        });
      }

      await updateService({
        id: values.id,
        status: values.status,
        cardVariant: values.cardVariant,
        title: values.title,
        shortDescription: values.shortDescription,
        longDescription: values.longDescription,
        isPurchaseButtonVisible: values.isPurchaseButtonVisible,
        newSupabaseImage: supabaseImage
          ? {
              id: supabaseImage.id,
              publicUrl: supabaseImage.publicUrl,
              path: supabaseImage.path,
              fullPath: supabaseImage.fullPath,
            }
          : null,
      });

      closeEditeServiceModal();
      closeServiceSettingsModal();
    },
    [
      profile?.supabase,
      updateService,
      closeEditeServiceModal,
      closeServiceSettingsModal,
    ],
  );

  const handleEditServiceClick = useCallback(
    (service: Service) => {
      if (!service) return;
      const initialValues: UpdateServicePayload = {
        id: service.id,
        status: service.status,
        cardVariant: service.variant,
        title: service.title,
        shortDescription: service.shortDescription,
        longDescription: service.longDescription,
        isPurchaseButtonVisible: service.isPurchaseButtonVisible,
        newSupabaseImage: null,
      };
      openEditServiceModal({
        initialValues,
        imageSrc: service.imageSrc,
        onSubmit: handleEditServiceSubmit,
        onCancel: closeEditeServiceModal,
      });
    },
    [closeEditeServiceModal, handleEditServiceSubmit, openEditServiceModal],
  );

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
      closeServiceSettingsModal();
    },
    [
      closeServiceSettingsModal,
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
      closeServiceSettingsModal();
    },
    [
      closeServiceSettingsModal,
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
      closeServiceSettingsModal();
    },
    [
      closeServiceSettingsModal,
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
        onServiceEdit: () => handleEditServiceClick(service),
        onServiceDelete: () => handleServiceDelete(service),
        onServiceArchive: () => handleServiceArchive(service),
        onServicePublish: () => handleServicePublish(service),
      });
    },
    [
      handleEditServiceClick,
      handleServiceArchive,
      handleServiceDelete,
      handleServicePublish,
      openServiceSettings,
      services,
    ],
  );
  // endregion

  // region Service Creation
  const handleCreateServiceSubmit = useCallback(
    async (params: {
      values: CreateServicePayload;
      media: { image: File };
    }) => {
      const { values, media } = params;
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
        isPurchaseButtonVisible: values.isPurchaseButtonVisible,
        supabaseImage: { id, publicUrl, path, fullPath },
        price: values.price.enabled
          ? {
              enabled: true,
              unit: values.price.unit,
              value: values.price.value,
              discountValue: values.price.discountValue,
              amount: values.price.amount,
            }
          : {
              enabled: false,
              unit: 'no-unit',
              value: 0,
              discountValue: null,
              amount: null,
            },
      });

      closeCreateServiceModal();
    },
    [createService, profile?.supabase, closeCreateServiceModal],
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

  const handleCreateServiceCancel = useCallback(async () => {
    const { confirmed } = await openConfirmationModal({
      title: 'Cancel creating new service?',
      description: 'You can create new service any time later.',
    });
    if (!confirmed) return;
    closeCreateServiceModal();
  }, [closeCreateServiceModal, openConfirmationModal]);

  const handleCreateServiceClick = useCallback(
    (variant: 'banner' | 'default') =>
      openCreateServiceModal({
        initialVariant: variant,
        onSubmit: handleCreateServiceSubmit,
        onPreview: handleCreateServicePreview,
        onCancel: handleCreateServiceCancel,
      }),
    [
      handleCreateServiceCancel,
      handleCreateServicePreview,
      handleCreateServiceSubmit,
      openCreateServiceModal,
    ],
  );
  // endregion

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
