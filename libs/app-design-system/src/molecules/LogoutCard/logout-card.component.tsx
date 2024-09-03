import React from 'react';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';

import { LogoutCardProps } from './logout-card.types';
import { Paper, Button, Typography } from '../../atoms';

export const LogoutCard: React.FC<LogoutCardProps> = (props) => {
  const { onLogoutClick } = props;

  return (
    <Paper>
      <Stack spacing={2} p={2}>
        <Stack>
          <Typography fontWeight="bold">Sign Out</Typography>
          <Typography variant="caption">
            Exit from the account. You can sign up again any time after.
          </Typography>
        </Stack>
        <Button
          onClick={onLogoutClick}
          variant="contained"
          startIcon={<LogoutIcon />}
        >
          Sign Out
        </Button>
      </Stack>
    </Paper>
  );
};
