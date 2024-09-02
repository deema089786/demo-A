import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import { useFormik } from '@demo-A/utils';
import {
  AuthSignUpByCredentialsPayload,
  authSignUpByCredentialsPayloadSchema,
} from '@demo-A/api-types';
import {
  useSignUpByGoogleMutation,
  useSignUpByCredentialsMutation,
} from '@demo-A/app-modules';

import { SignUpFormProps } from './sign-up-form.types';
import { Button, GoogleSignUpButton, Typography } from '../../atoms';
import { TextField } from '../../inputs';
import { initialValues } from './sign-up-form.constants';

export const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const { googleClientId } = props;
  const { signUpByCredentials } = useSignUpByCredentialsMutation();
  const { signUpByGoogle } = useSignUpByGoogleMutation();

  const { register, handleSubmit, isSubmitAvailable } =
    useFormik<AuthSignUpByCredentialsPayload>({
      validationSchema: toFormikValidationSchema(
        authSignUpByCredentialsPayloadSchema,
      ),
      enableReinitialize: true,
      initialValues,
      onSubmit: (values) =>
        signUpByCredentials({
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
        >
          Sign Up
        </Button>
      </Stack>
      <Stack alignItems="center">
        {googleClientId && (
          <GoogleSignUpButton
            clientId={googleClientId}
            onSuccess={signUpByGoogle}
          />
        )}
      </Stack>
    </Stack>
  );
};
