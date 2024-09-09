import React, { useCallback, useMemo, useState } from 'react';
import {
  Stack,
  ToggleButtonGroup,
  ToggleButton,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { DriveFolderUpload as PublishIcon } from '@mui/icons-material';
import { useModal } from '@ebay/nice-modal-react';
import { useFileSelector, useFormik } from '@demo-A/utils';
import {
  CreateServicePayload,
  createServicePayloadSchema,
} from '@demo-A/api-types';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { ImageSelector } from '../../molecules';
import { Button, Typography, Paper } from '../../atoms';
import { TextField } from '../../inputs';
import { ConfirmationModalProps } from './create-service-modal.types';
import { ModalDrawer } from '../components';
import { useConfirmationModal } from '../ConfirmationModal';
import { getInitialValues } from './create-service-modal.constants';

export const CreateServiceModalController: React.FC<ConfirmationModalProps> = (
  props,
) => {
  const { visible, hide, remove } = useModal();
  const { open: openConfirmationModal } = useConfirmationModal();
  const { initialVariant, onCancel, onClosed, onSubmit, onPreview } = props;
  const [isSaveAsDraft, setIsSaveAsDraft] = useState(false);

  const handleExited = useCallback(() => {
    onClosed?.();
    remove();
  }, [remove, onClosed]);

  const handleCancel = useCallback(() => {
    openConfirmationModal({
      title: 'Cancel creating new service?',
      description: 'All changes will be lost.',
      onConfirm: () => {
        onCancel?.();
        hide().catch(console.error);
      },
    });
  }, [hide, onCancel, openConfirmationModal]);

  const initialValues = useMemo(
    () => getInitialValues({ variant: initialVariant }),
    [initialVariant],
  );
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
  } = useFormik<CreateServicePayload>({
    initialValues,
    validationSchema: toFormikValidationSchema(createServicePayloadSchema),
    onSubmit: (values) => {
      if (!file) return;
      return onSubmit({
        values: {
          ...values,
          status: isSaveAsDraft ? 'draft' : 'active',
        },
        media: { image: file },
        modalActions: { hide },
      });
    },
  });

  return (
    <ModalDrawer open={visible} onClose={handleCancel} onExited={handleExited}>
      <Stack spacing={3} p={2} pb={5} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h1">
          Creating a service card
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
          <FormControlLabel
            label="Save as Draft"
            control={
              <Switch
                checked={isSaveAsDraft}
                onChange={(e, value) => setIsSaveAsDraft(value)}
              />
            }
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!isSubmitAvailable}
            startIcon={<PublishIcon />}
            loading={isSubmitting}
            loadingPosition="start"
          >
            {isSaveAsDraft ? 'Save as Draft' : 'Publish'}
          </Button>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                onPreview({ values, media: { imageSrc: fileSrc || '' } })
              }
            >
              Preview
            </Button>
            <Button
              fullWidth
              color="secondary"
              variant="outlined"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </ModalDrawer>
  );
};
