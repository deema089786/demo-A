import React, { useCallback } from 'react';
import { Stack } from '@mui/material';
import { useModal } from '@ebay/nice-modal-react';

import { Button, Typography } from '../../atoms';
import { ConfirmationModalProps } from './confirmation-modal.types';
import { ModalDrawer } from '../components';

export const ConfirmationModalController: React.FC<ConfirmationModalProps> = (
  props,
) => {
  const {
    title,
    description,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
    onConfirm,
    onCancel,
    onClosed,
  } = props;

  const { visible, hide, remove, resolve } = useModal();

  const handleExited = useCallback(() => {
    onClosed?.();
    remove();
  }, [remove, onClosed]);

  const handleConfirm = useCallback(() => {
    console.log('res');
    onConfirm?.();
    resolve({ confirmed: true });
    hide();
  }, [onConfirm, resolve, hide]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    resolve({ confirmed: false });
    hide();
  }, [onCancel, resolve, hide]);

  return (
    <ModalDrawer open={visible} onClose={handleCancel} onExited={handleExited}>
      <Stack spacing={3} p={3} pt={4}>
        <Stack>
          <Typography variant="h5" component="h1">
            {title}
          </Typography>
          {description && <Typography>{description}</Typography>}
        </Stack>
        <Stack spacing={1}>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            {confirmButtonText}
          </Button>
          <Button onClick={handleCancel} color="primary" variant="text">
            {cancelButtonText}
          </Button>
        </Stack>
      </Stack>
    </ModalDrawer>
  );
};
