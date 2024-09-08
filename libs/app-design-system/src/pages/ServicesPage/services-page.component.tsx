import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import AddServiceIcon from '@mui/icons-material/CreateNewFolder';

import { ScreenLayout } from '../../layout';
import { ServicesPageProps } from './services-page.types';
import { ServiceCard, NoServicesCard } from '../../molecules';
import { Button } from '../../atoms';

export const ServicesPage: React.FC<ServicesPageProps> = (props) => {
  const {
    services,
    isEditModeEnabled,
    isAuthenticated,
    profileImageSrc,
    profileName,
    onCreateServiceClick,
    isServiceSettingsAvailable,
    onServiceSettingsClick,
  } = props;

  const bannerServiceCards = useMemo(
    () =>
      services
        .filter((service) => service.variant === 'banner')
        .map((service) => (
          <ServiceCard
            key={service.id}
            imageSrc={service.imageSrc}
            variant={service.variant}
            title={service.title}
            description={service.shortDescription}
            href={service.inAppPath}
            status={service.status}
            isActionsAvailable={isServiceSettingsAvailable}
            onActionsClick={() =>
              onServiceSettingsClick({ serviceId: service.id })
            }
          />
        )),
    [isServiceSettingsAvailable, onServiceSettingsClick, services],
  );

  const defaultServiceCards = useMemo(
    () =>
      services
        .filter((service) => service.variant === 'default')
        .map((service) => (
          <ServiceCard
            key={service.id}
            imageSrc={service.imageSrc}
            variant={service.variant}
            title={service.title}
            description={service.shortDescription}
            href={service.inAppPath}
            status={service.status}
            isActionsAvailable={isServiceSettingsAvailable}
            onActionsClick={() =>
              onServiceSettingsClick({ serviceId: service.id })
            }
          />
        )),
    [isServiceSettingsAvailable, onServiceSettingsClick, services],
  );

  return (
    <ScreenLayout
      isAuthenticated={isAuthenticated}
      profileImageSrc={profileImageSrc}
      profileName={profileName}
    >
      <Stack spacing={2} divider={<Divider />}>
        <Stack spacing={2}>
          {!bannerServiceCards.length && <NoServicesCard variant="banner" />}
          {bannerServiceCards}
          {isEditModeEnabled && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => onCreateServiceClick('banner')}
              startIcon={<AddServiceIcon />}
            >
              Add banner service
            </Button>
          )}
        </Stack>
        <Stack spacing={1}>
          {!defaultServiceCards.length && <NoServicesCard variant="default" />}
          {defaultServiceCards}
          {isEditModeEnabled && (
            <Button
              variant="outlined"
              size="large"
              onClick={() => onCreateServiceClick('default')}
              startIcon={<AddServiceIcon />}
            >
              Add service
            </Button>
          )}
        </Stack>
      </Stack>
    </ScreenLayout>
  );
};
