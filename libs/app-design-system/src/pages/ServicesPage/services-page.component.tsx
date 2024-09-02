import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';

import { ScreenLayout } from '../../layout';
import { ServicesPageProps } from './services-page.types';
import { ServiceCard, AddServiceCard, NoServicesCard } from '../../molecules';

export const ServicesPage: React.FC<ServicesPageProps> = (props) => {
  const { services, editModeEnabled } = props;

  const bannerServiceCards = useMemo(
    () =>
      services
        .filter((service) => service.variant === 'banner')
        .map((service) => (
          <ServiceCard
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
            imageSrc={service.imageSrc}
            variant={service.variant}
            title={service.title}
            description={service.description}
          />
        )),
    [services],
  );

  return (
    <ScreenLayout user={null}>
      <Stack spacing={2} divider={<Divider />}>
        <Stack spacing={2}>
          {!bannerServiceCards.length && <NoServicesCard variant="banner" />}
          {bannerServiceCards}
          {editModeEnabled && (
            <AddServiceCard variant="banner" onClick={() => undefined} />
          )}
        </Stack>
        <Stack spacing={1}>
          {!defaultServiceCards.length && <NoServicesCard variant="default" />}
          {defaultServiceCards}
          {editModeEnabled && (
            <AddServiceCard variant="default" onClick={() => undefined} />
          )}
        </Stack>
      </Stack>
    </ScreenLayout>
  );
};
