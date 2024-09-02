import React, { PropsWithChildren } from 'react';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';

import { Paper } from '../Paper';

export const PaperButton: React.FC<PropsWithChildren<ButtonBaseProps>> = (
  props,
) => {
  const { children, ...rest } = props;
  return (
    <ButtonBase
      component={Paper}
      sx={{
        display: 'block',
        overflow: 'hidden',
        borderRadius: '16px',
        bgcolor: 'background.paper',
      }}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};
