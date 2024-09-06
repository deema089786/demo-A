import React, { ReactNode, useCallback } from 'react';
import { Box, Slide, Backdrop, Portal, styled, alpha } from '@mui/material';

const ANIMATION_TIMEOUT = 300;

export const ModalPaper = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  borderRadius: theme.spacing(2, 2, 0, 0),
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  justifyContent: 'center',
  overflow: 'hidden',
}));

type ModalDrawerProps = {
  open: boolean;
  children: ReactNode;
  onClose?(): void;
  onExited?(): void;
};

export const ModalDrawer: React.FC<ModalDrawerProps> = (props) => {
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
        sx={{
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'stretch',
          backgroundColor: (theme) =>
            alpha(theme.palette.background.paper, 0.8),
        }}
        timeout={ANIMATION_TIMEOUT}
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
              overflow: 'auto',
              overscrollBehavior: 'contain',
              outline: 'none',
              paddingTop: '100px',
            }}
            onClick={onClick}
            tabIndex={0}
            role="button"
          >
            <ModalPaper sx={{ minHeight: 100 }}>{children}</ModalPaper>
          </Box>
        </Slide>
      </Backdrop>
    </Portal>
  );
};
