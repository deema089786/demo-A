import { TextFieldProps as TextFieldPropsMUI } from '@mui/material/TextField';
import React from 'react';

export type TextFieldProps = {
  value?: TextFieldPropsMUI['value'];
  onChange?: TextFieldPropsMUI['onChange'];
  onBlur?: TextFieldPropsMUI['onBlur'];
  errorMessage?: string | unknown;
  helperText?: string;
  name?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  variant?: TextFieldPropsMUI['variant'];
  type?: TextFieldPropsMUI['type'];
  multiline?: TextFieldPropsMUI['multiline'];
  minRows?: TextFieldPropsMUI['minRows'];
  maxRows?: TextFieldPropsMUI['maxRows'];
  size?: TextFieldPropsMUI['size'];
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};
