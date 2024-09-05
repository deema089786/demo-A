import React, { ReactNode, useCallback } from 'react';
import { Slide, Backdrop, Portal, Box } from '@mui/material';

const ANIMATION_TIMEOUT = 300;

type ModalFullScreenDrawerProps = {
  open: boolean;
  children: ReactNode;
  onClose?(): void;
  onExited?(): void;
};

export const ModalFullScreenDrawer: React.FC<ModalFullScreenDrawerProps> = (
  props,
) => {
  const { open = false, children, onClose, onExited } = props;

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClose !== undefined && e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  return (
    <Portal>
      <Backdrop
        open={open}
        onClick={onClick}
        timeout={ANIMATION_TIMEOUT}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
        }}
      >
        <Slide
          direction="up"
          appear
          in={open}
          onExited={onExited}
          timeout={ANIMATION_TIMEOUT}
          unmountOnExit
        >
          <Box
            sx={{
              width: '100%',
              height: '100dvh',
              display: 'flex',
              justifyContent: 'start',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            {children}
          </Box>
        </Slide>
      </Backdrop>
    </Portal>
  );
};
