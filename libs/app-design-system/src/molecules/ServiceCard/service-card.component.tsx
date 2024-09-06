import React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

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

const ServiceCardText: React.FC<{ title: string; description: string }> = (
  props,
) => {
  const { title, description } = props;
  return (
    <>
      <Typography variant="body1" fontWeight="bold" align="left">
        {title}
      </Typography>
      <Typography variant="body2" align="left">
        {description}
      </Typography>
    </>
  );
};

export const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const { variant, title, description, imageSrc, href } = props;

  return (
    <PaperButton>
      <Stack
        component={NavLink}
        to={href}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        {variant === 'banner' && (
          <>
            <BannerImage src={imageSrc || ''} alt={title} />
            <Stack p={2}>
              <ServiceCardText title={title} description={description} />
            </Stack>
          </>
        )}
        {variant === 'default' && (
          <Stack direction="row">
            <DefaultImage src={imageSrc || ''} alt={title} />
            <Stack p={1}>
              <ServiceCardText title={title} description={description} />
            </Stack>
          </Stack>
        )}
      </Stack>
    </PaperButton>
  );
};
