import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import { ScreenLayout } from '../../layout';
import { ServiceDetailsPageProps } from './service-details-page.types';
import { ModalDrawer } from '../../modals/components';
import { Typography } from '../../atoms';

const ServiceDetailsImage = styled('img')({
  height: '150px',
  objectFit: 'cover',
});

export const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = (
  props,
) => {
  const {
    service,
    isAuthenticated,
    isEditModeEnabled,
    profileImageSrc,
    profileName,
    onExited,
  } = props;

  const [open, setOpen] = useState(true);

  return (
    <ModalDrawer open={open} onClose={() => setOpen(false)} onExited={onExited}>
      <ServiceDetailsImage src={service.imageSrc || ''} />
      <Stack spacing={2} p={2}>
        <Typography variant="h5" fontWeight="bold" component="h1">
          {service.title}
        </Typography>
        <Typography variant="body2">{service.longDescription}</Typography>
      </Stack>
    </ModalDrawer>
  );
};
