import React, { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import ArchiveIcon from '@mui/icons-material/VisibilityOff';
import PublishIcon from '@mui/icons-material/CheckCircle';
import { useModal } from '@ebay/nice-modal-react';

import { Button, Paper, StatusLogo, Typography } from '../../atoms';
import { ServiceSettingsModalProps } from './service-settings-modal.types';
import { ModalDrawer } from '../components';

export const ServiceSettingsModalController: React.FC<
  ServiceSettingsModalProps
> = (props) => {
  const {
    serviceStatus,
    serviceTitle,
    onServiceEdit,
    onServiceDelete,
    onServiceArchive,
    onServicePublish,
    onClosed,
  } = props;

  const { visible, hide, remove } = useModal();

  const handleExited = useCallback(() => {
    onClosed?.();
    remove();
  }, [remove, onClosed]);

  return (
    <ModalDrawer open={visible} onClose={hide} onExited={handleExited}>
      <Stack spacing={3} p={3} pt={4}>
        <Stack spacing={1}>
          <Typography variant="caption">Service Settings</Typography>
          <Typography variant="h5" component="h1">
            {serviceTitle}
          </Typography>
          <Stack
            spacing={1}
            component={Paper}
            direction="row"
            alignItems="center"
            variant="outlined"
            sx={{ p: 1 }}
          >
            <Typography>Service status:</Typography>
            <StatusLogo variant={serviceStatus} size="small" />
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Button
            onClick={onServiceEdit}
            color="primary"
            variant="contained"
            startIcon={<EditIcon />}
          >
            Edit service
          </Button>
          {['active'].includes(serviceStatus) && (
            <Button
              onClick={onServiceArchive}
              color="primary"
              variant="contained"
              startIcon={<ArchiveIcon />}
            >
              Archive service
            </Button>
          )}
          {['archived', 'draft'].includes(serviceStatus) && (
            <Button
              onClick={onServicePublish}
              color="primary"
              variant="contained"
              startIcon={<PublishIcon />}
            >
              Publish service
            </Button>
          )}

          <Button
            onClick={onServiceDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete service
          </Button>
          <Button onClick={hide} color="primary" variant="text">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </ModalDrawer>
  );
};
