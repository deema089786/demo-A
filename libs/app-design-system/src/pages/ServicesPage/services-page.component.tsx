import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';

import { ScreenLayout } from '../../layout';
import { ServicesPageProps } from './services-page.types';
import { ServiceCard, AddServiceCard, NoServicesCard } from '../../molecules';

export const ServicesPage: React.FC<ServicesPageProps> = (props) => {
  const {
    services,
    isEditModeEnabled,
    isAuthenticated,
    profileImageSrc,
    profileName,
    onCreateServiceClick,
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
            description={service.description}
          />
        )),
    [services],
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
            description={service.description}
          />
        )),
    [services],
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
            <AddServiceCard
              variant="banner"
              onClick={() => onCreateServiceClick('banner')}
            />
          )}
        </Stack>
        <Stack spacing={1}>
          {!defaultServiceCards.length && <NoServicesCard variant="default" />}
          {defaultServiceCards}
          {isEditModeEnabled && (
            <AddServiceCard
              variant="default"
              onClick={() => onCreateServiceClick('default')}
            />
          )}
        </Stack>
      </Stack>
    </ScreenLayout>
  );
};
