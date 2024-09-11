import React from 'react';
import TextFieldMUI from '@mui/material/TextField';

import { TextFieldProps } from './text-field.types';

export const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    name,
    value,
    onChange,
    onBlur,
    id,
    label,
    placeholder,
    variant,
    errorMessage,
    helperText,
    type,
    multiline,
    maxRows,
    minRows,
    size,
    startAdornment,
    endAdornment,
  } = props;

  return (
    <TextFieldMUI
      id={id}
      name={name}
      label={label}
      variant={variant}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={Boolean(errorMessage)}
      helperText={errorMessage || helperText}
      type={type}
      multiline={multiline}
      maxRows={maxRows}
      minRows={minRows}
      size={size}
      slotProps={{
        input: { startAdornment, endAdornment },
      }}
    />
  );
};
