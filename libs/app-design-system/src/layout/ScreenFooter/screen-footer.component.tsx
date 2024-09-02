import React from 'react';
import Stack from '@mui/material/Stack';

import { ScreenFooterProps } from './screen-footer.types';
import { Paper, Typography, Logo } from '../../atoms';

const LOGO_HEIGHT = 32;
const LOGO_WIDTH = 100;

export const ScreenFooter: React.FC<ScreenFooterProps> = (props) => {
  return (
    <Stack
      component={Paper}
      spacing={2}
      p={2}
      px={4}
      direction="row"
      alignItems="center"
      justifyContent="center"
    >
      <Typography color="gray" fontWeight="bold" fontSize="1.2rem">
        Powered By
      </Typography>
      <Logo width={LOGO_WIDTH} height={LOGO_HEIGHT} />
    </Stack>
  );
};
