import React from 'react';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import { ButtonBase } from '@mui/material';

import { NoServicesCardProps } from './no-services-card.types';
import { Typography } from '../../atoms';

const BANNER_HEIGHT = 120;
const DEFAULT_HEIGHT = 80;

export const NoServicesCard: React.FC<NoServicesCardProps> = (props) => {
  const { variant } = props;

  return (
    <Stack
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid',
        height: variant === 'banner' ? BANNER_HEIGHT : DEFAULT_HEIGHT,
        justifyContent: 'center',
        color: 'primary.light',
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1" textAlign="center">
          There is no services yet
        </Typography>
      </Stack>
    </Stack>
  );
};
