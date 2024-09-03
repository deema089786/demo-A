import React from 'react';
import Stack from '@mui/material/Stack';
import CreatePasswordIcon from '@mui/icons-material/EnhancedEncryption';

import { CreatePasswordCardProps } from './create-password-card.types';
import { Paper, Button, Typography } from '../../atoms';
import { TextField } from '../../inputs';

export const CreatePasswordCard: React.FC<CreatePasswordCardProps> = (
  props,
) => {
  const { onSubmit } = props;

  return (
    <Paper>
      <Stack spacing={2} p={2}>
        <Stack>
          <Typography fontWeight="bold">Protect your account!</Typography>
          <Typography variant="caption">
            Your account does not have password yet. To protect your account,
            please create a strong password.
          </Typography>
        </Stack>
        <TextField label="Password" placeholder="Enter your password" />
        <TextField
          label="Confirm Password"
          placeholder="Configrm your password"
        />
        <Button variant="contained" startIcon={<CreatePasswordIcon />}>
          Create password
        </Button>
      </Stack>
    </Paper>
  );
};
