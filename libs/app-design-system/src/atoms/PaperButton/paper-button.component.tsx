import React, { PropsWithChildren } from 'react';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';

import { Paper, PaperProps } from '../Paper';

export const PaperButton: React.FC<
  PropsWithChildren<ButtonBaseProps & { variant?: PaperProps['variant'] }>
> = (props) => {
  const { children, variant, ...rest } = props;
  return (
    <ButtonBase
      sx={{
        display: 'block',
        overflow: 'hidden',
        borderRadius: '16px',
        bgcolor: 'background.paper',
      }}
      {...rest}
    >
      <Paper variant={variant}>{children}</Paper>
    </ButtonBase>
  );
};
