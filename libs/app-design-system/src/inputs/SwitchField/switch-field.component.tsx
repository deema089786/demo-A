import { FormControlLabel, Switch } from '@mui/material';
import React from 'react';

import { SwitchFieldProps } from './switch-field.types';

export const SwitchField: React.FC<SwitchFieldProps> = (props) => {
  const { label, value, onChange, onChangeValue, name } = props;
  return (
    <FormControlLabel
      label={label}
      control={
        <Switch
          name={name}
          checked={value}
          value={value}
          onChange={(e, value) => {
            onChange?.(e);
            onChangeValue?.(value);
          }}
        />
      }
    />
  );
};
