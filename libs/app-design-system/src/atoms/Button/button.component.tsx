import React from 'react';
import ButtonMUI from '@mui/material/Button';

import { ButtonProps } from './button.types';

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <ButtonMUI role="button" {...rest}>
      {children}
    </ButtonMUI>
  );
};
