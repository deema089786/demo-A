import React, { useCallback } from 'react';
import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { DriveFolderUpload as PublishIcon } from '@mui/icons-material';
import { useModal } from '@ebay/nice-modal-react';
import { useFileSelector, useFormik } from '@demo-A/utils';
import {
  UpdateServicePayload,
  updateServicePayloadSchema,
} from '@demo-A/api-types';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { ImageSelector } from '../../molecules';
import { Button, Typography, Paper } from '../../atoms';
import { TextField } from '../../inputs';
import { EditModalProps } from './edit-service-modal.types';
import { ModalDrawer } from '../components';

export const EditServiceModalController: React.FC<EditModalProps> = (props) => {
  const { visible, remove } = useModal();
  const { initialValues, imageSrc, onCancel, onClosed, onSubmit } = props;

  const handleExited = useCallback(() => {
    onClosed?.();
    remove();
  }, [remove, onClosed]);

  const {
    file,
    fileSrc,
    select: selectFile,
    clear: clearFile,
  } = useFileSelector({ accept: '.png, .jpg' });
  const {
    register,
    setFieldValue,
    values,
    handleSubmit,
    isSubmitAvailable,
    isSubmitting,
    isDirty,
  } = useFormik<UpdateServicePayload>({
    initialValues,
    validationSchema: toFormikValidationSchema(updateServicePayloadSchema),
    onSubmit: (values) =>
      onSubmit({
        values,
        media: { image: file },
      }),
  });

  return (
    <ModalDrawer open={visible} onClose={onCancel} onExited={handleExited}>
      <Stack spacing={3} p={2} pb={5} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h1">
          Editing a service card
        </Typography>
        <Stack spacing={1}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            fullWidth
            size="small"
            aria-label="Variant"
            value={values.cardVariant}
            onChange={(_, value) => setFieldValue('cardVariant', value)}
          >
            <ToggleButton value="banner">Banner</ToggleButton>
            <ToggleButton value="default">Default</ToggleButton>
          </ToggleButtonGroup>
          <Paper sx={{ p: 1, borderRadius: '8px' }}>
            <Typography
              variant="caption"
              component="p"
              color="textSecondary"
              lineHeight="0.8rem"
            >
              {values.cardVariant === 'banner'
                ? 'Banner cards are displayed at the top of the screen and have bigger size.'
                : null}
              {values.cardVariant === 'default'
                ? 'Default cards are displayed at the lower part of the screen and looks like list items.'
                : null}
            </Typography>
          </Paper>
        </Stack>
        <ImageSelector
          src={fileSrc}
          defaultSrc={imageSrc}
          onClearClick={clearFile}
          onSelectClick={selectFile}
        />
        <Stack spacing={2}>
          <TextField
            label="Service Title"
            placeholder="Service title"
            {...register('title')}
          />
          <TextField
            label="Short Description"
            placeholder="Short Description"
            {...register('shortDescription')}
          />
          <TextField
            label="Long Description"
            placeholder="Long Description"
            {...register('longDescription')}
            multiline
            minRows={4}
            maxRows={8}
          />
        </Stack>
        <Stack spacing={2}>
          <Button
            variant="contained"
            type="submit"
            disabled={!isSubmitAvailable || (!isDirty && !file)}
            startIcon={<PublishIcon />}
            loading={isSubmitting}
            loadingPosition="start"
          >
            Save Changes
          </Button>
          <Button fullWidth variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </ModalDrawer>
  );
};
