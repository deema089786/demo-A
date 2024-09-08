import React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ActionsIcon from '@mui/icons-material/Settings';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { ServiceStatus } from '@demo-A/app-modules';

import { ServiceCardProps } from './service-card.types';
import { Paper, PaperButton, StatusLogo, Typography } from '../../atoms';

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

const ServiceSettingsButton: React.FC<{
  onClick: () => void;
  status: ServiceStatus;
}> = (props) => {
  const { onClick, status } = props;
  return (
    <Paper
      variant="outlined"
      sx={{ position: 'absolute', top: 4, right: 4, borderRadius: 100000 }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <StatusLogo variant={status} />
        <IconButton size="small" onClick={onClick}>
          <ActionsIcon color="primary" />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export const ServiceCard: React.FC<ServiceCardProps> = (props) => {
  const {
    variant,
    title,
    description,
    imageSrc,
    href,
    status,
    isActionsAvailable,
    onActionsClick,
  } = props;

  return (
    <PaperButton>
      <Stack
        component={NavLink}
        to={href}
        sx={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}
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
        {isActionsAvailable && (
          <ServiceSettingsButton onClick={onActionsClick} status={status} />
        )}
      </Stack>
    </PaperButton>
  );
};
