import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { LockOpen as SignUpIcon } from '@mui/icons-material';
import { useFormik } from '@demo-A/utils';
import {
  AuthSignUpByCredentialsPayload,
  authSignUpByCredentialsPayloadSchema,
} from '@demo-A/api-types';

import { SignUpFormProps } from './sign-up-form.types';
import { Button, GoogleSignUpButton, Typography } from '../../atoms';
import { TextField } from '../../inputs';
import { initialValues } from './sign-up-form.constants';

export const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const {
    googleClientId,
    onSignUpByGoogleToken,
    onSignUpByCredentials,
    isLoading,
  } = props;

  const { register, handleSubmit, isSubmitAvailable, isSubmitting } =
    useFormik<AuthSignUpByCredentialsPayload>({
      validationSchema: toFormikValidationSchema(
        authSignUpByCredentialsPayloadSchema,
      ),
      enableReinitialize: true,
      initialValues,
      onSubmit: (values) =>
        onSignUpByCredentials({
          username: values.username,
          password: values.password,
        }),
    });

  return (
    <Stack
      p={3}
      divider={
        <Divider>
          <Typography>OR</Typography>
        </Divider>
      }
      spacing={4}
    >
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          placeholder="Input your Email"
          {...register('username')}
        />
        <TextField
          label="Password"
          placeholder="Input your password"
          {...register('password')}
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={!isSubmitAvailable}
          loading={isSubmitting}
          loadingPosition="start"
          startIcon={<SignUpIcon />}
        >
          Sign Up
        </Button>
      </Stack>
      <Stack alignItems="center">
        {googleClientId && (
          <GoogleSignUpButton
            clientId={googleClientId}
            onSuccess={onSignUpByGoogleToken}
          />
        )}
      </Stack>
    </Stack>
  );
};
