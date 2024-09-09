import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { Typography } from '../../atoms';

const ServiceDetailsImage = styled('img')({
  height: '150px',
  objectFit: 'cover',
});

type ServiceDetailsModalViewProps = {
  serviceTitle: string;
  serviceDescription: string;
  serviceImageSrc: string;
};

export const ServiceDetailsModalView: React.FC<ServiceDetailsModalViewProps> = (
  props,
) => {
  const { serviceTitle, serviceDescription, serviceImageSrc } = props;

  return (
    <Stack>
      <ServiceDetailsImage src={serviceImageSrc} />
      <Stack spacing={2} p={2}>
        <Typography variant="h5" fontWeight="bold" component="h1">
          {serviceTitle}
        </Typography>
        <Typography variant="body2">{serviceDescription}</Typography>
      </Stack>
    </Stack>
  );
};
