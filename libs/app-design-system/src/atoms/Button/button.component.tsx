import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

import { ButtonProps } from './button.types';

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <LoadingButton role="button" {...rest}>
      {children}
    </LoadingButton>
  );
};
