import { TextFieldProps as TextFieldPropsMUI } from '@mui/material/TextField';

export type TextFieldProps = {
  value?: TextFieldPropsMUI['value'];
  onChange?: TextFieldPropsMUI['onChange'];
  onBlur?: TextFieldPropsMUI['onBlur'];
  errorMessage?: string;
  name?: string;
  id?: string;
  label?: string;
  placeholder?: string;
  variant?: TextFieldPropsMUI['variant'];
};
