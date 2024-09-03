import React, { PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { ScreenLayoutProps } from './screen-layout.types';
import { ScreenHeader } from '../ScreenHeader';
import { ScreenFooter } from '../ScreenFooter';

export const ScreenLayout: React.FC<PropsWithChildren<ScreenLayoutProps>> = (
  props,
) => {
  const { children, isAuthenticated, profileImageSrc, profileName } = props;
  return (
    <Stack
      spacing={4}
      sx={{
        p: 1,
        pb: 3,
        height: '100svh',
        overflow: 'hidden',
        overflowY: 'auto',
        bgcolor: 'background.default',
        alignItems: 'center',
      }}
    >
      <ScreenHeader
        isAuthenticated={isAuthenticated}
        profileImageSrc={profileImageSrc}
        profileName={profileName}
      />
      <Container maxWidth="xl" disableGutters sx={{ flex: 1 }}>
        <Stack spacing={2}>{children}</Stack>
      </Container>
      <ScreenFooter />
    </Stack>
  );
};
