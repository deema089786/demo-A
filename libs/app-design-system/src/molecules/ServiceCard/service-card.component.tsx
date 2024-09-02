import React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

import { ServiceCardProps } from './service-card.types';
import { PaperButton, Typography } from '../../atoms';

const BannerImage = styled('img')({
  height: '100px',
  objectFit: 'cover',
});

const DefaultImage = styled('img')({
  minHeight: '80px',
  width: '80px',
  objectFit: 'cover',
});

export const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const { variant, title, description, imageSrc } = props;

  return (
    <PaperButton>
      <Stack>
        {variant === 'banner' && <BannerImage src={imageSrc} alt={title} />}
        <Stack direction="row">
          {variant === 'default' && <DefaultImage src={imageSrc} alt={title} />}
          <Stack p={variant === 'default' ? 1 : 2}>
            <Typography variant="body1" fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </PaperButton>
  );
};
