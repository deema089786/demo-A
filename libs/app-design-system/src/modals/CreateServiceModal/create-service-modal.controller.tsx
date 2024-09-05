import React, { useCallback, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { useModal } from '@ebay/nice-modal-react';
import { useFileSelector, useFormik } from '@demo-A/utils';
import {
  CreateServicePayload,
  createServicePayloadSchema,
} from '@demo-A/api-types';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useCreateServiceMutation, useProfile } from '@demo-A/app-modules';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

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
  const { open: openConfirmationModal } = useConfirmationModal();
  const { initialVariant, onCancel, onClosed } = props;
  const profile = useProfile();

  const { visible, hide, remove } = useModal();

  const handleExited = useCallback(() => {
    onClosed?.();
    remove();
  }, [remove, onClosed]);

  const handleCancel = useCallback(() => {
    openConfirmationModal({
      title: 'Are you sure?',
      description: 'All changes will be lost.',
      onConfirm: () => {
        onCancel?.();
        hide().catch(console.error);
      },
    });
  }, [hide, onCancel, openConfirmationModal]);

  const { createService } = useCreateServiceMutation({
    onSuccess: hide,
  });
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
  const { register, handleSubmit, isSubmitAvailable } =
    useFormik<CreateServicePayload>({
      initialValues,
      validationSchema: toFormikValidationSchema(createServicePayloadSchema),
      onSubmit: async (values) => {
        if (!profile.supabase) return;
        if (!file) return;

        const supabaseClient = createSupabaseClient(
          profile.supabase.projectUrl,
          profile.supabase.apiKey,
        );

        const fileName = uuid();
        const { data, error } = await supabaseClient.storage
          .from('demo-a-service-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) console.error(error);
        if (!data) return;

        const {
          data: { publicUrl },
        } = supabaseClient.storage
          .from('demo-a-service-images')
          .getPublicUrl(data.path);

        await createService({
          cardVariant: values.cardVariant,
          title: values.title,
          shortDescription: values.shortDescription,
          longDescription: values.longDescription,
          imagePath: data.path,
          imageUrl: publicUrl,
        });
      },
    });

  return (
    <ModalDrawer
      open={visible}
      // prevent closing on clicking outside
      onClose={undefined}
      onExited={handleExited}
    >
      <Stack spacing={3} p={3} pt={4} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" component="h1">
          Creating a service card
        </Typography>
        <Stack spacing={1}>
          <ToggleButtonGroup
            color="primary"
            value={initialVariant}
            exclusive
            onChange={(v) => console.log({ v })}
            fullWidth
            size="small"
            aria-label="Variant"
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
              {initialVariant === 'banner'
                ? 'Banner cards are displayed at the top of the screen and have bigger size.'
                : null}
              {initialVariant === 'default'
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
        <Stack spacing={1}>
          <Button variant="contained">Preview</Button>
          <Button
            variant="contained"
            type="submit"
            disabled={!isSubmitAvailable}
          >
            Create
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </ModalDrawer>
  );
};
