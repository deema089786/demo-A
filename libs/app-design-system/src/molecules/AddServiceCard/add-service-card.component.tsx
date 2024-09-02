import React from 'react';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import Stack from '@mui/material/Stack';
import { ButtonBase } from '@mui/material';

import { AddServiceCardProps } from './add-service-card.types';
import { Typography } from '../../atoms';

const BANNER_HEIGHT = 80;
const DEFAULT_HEIGHT = 48;

export const AddServiceCard: React.FC<AddServiceCardProps> = (props) => {
  const { variant, onClick } = props;

  return (
    <Stack
      onClick={onClick}
      component={ButtonBase}
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px dashed',
        height: variant === 'banner' ? BANNER_HEIGHT : DEFAULT_HEIGHT,
        justifyContent: 'center',
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <AddIcon fontSize="large" />
        <Typography variant="h6" textAlign="center">
          {`Add ${variant === 'banner' ? 'banner' : ''} service`}
        </Typography>
      </Stack>
    </Stack>
  );
};
