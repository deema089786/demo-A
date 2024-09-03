import React from 'react';
import Stack from '@mui/material/Stack';
import CreatePasswordIcon from '@mui/icons-material/EnhancedEncryption';
import { useFormik } from '@demo-A/utils';
import {
  AuthCreatePasswordPayload,
  authCreatePasswordPayloadSchema,
} from '@demo-A/api-types';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { CreatePasswordFormProps } from './create-password-form.types';
import { Button, Typography } from '../../atoms';
import { TextField } from '../../inputs';
import { initialValues } from './create-password-form.constants';

export const CreatePasswordForm: React.FC<CreatePasswordFormProps> = (
  props,
) => {
  const { onSubmit, isLoading } = props;

  const { register, handleSubmit, isSubmitAvailable } =
    useFormik<AuthCreatePasswordPayload>({
      validationSchema: toFormikValidationSchema(
        authCreatePasswordPayloadSchema,
      ),
      enableReinitialize: true,
      initialValues,
      onSubmit: (values) =>
        onSubmit({
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        }),
    });

  return (
    <Stack spacing={2} p={2} component="form" onSubmit={handleSubmit}>
      <Stack>
        <Typography fontWeight="bold">Protect your account!</Typography>
        <Typography variant="caption">
          Your account does not have password yet. To protect your account,
          please create a strong password.
        </Typography>
      </Stack>
      {/*TODO add autocomplete attributes*/}
      {/*https://www.chromium.org/developers/design-documents/create-amazing-password-forms/*/}
      <TextField
        type="password"
        label="Password"
        placeholder="Enter your password"
        {...register('password')}
      />
      {/*TODO add autocomplete attributes*/}
      {/*https://www.chromium.org/developers/design-documents/create-amazing-password-forms/*/}
      <TextField
        type="password"
        label="Confirm Password"
        placeholder="Configrm your password"
        {...register('passwordConfirmation')}
      />
      <Button
        variant="contained"
        type="submit"
        startIcon={<CreatePasswordIcon />}
        disabled={!isSubmitAvailable}
      >
        Create password
      </Button>
    </Stack>
  );
};
