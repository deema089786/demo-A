import { ChangeEvent } from 'react';

export type SwitchFieldProps = {
  label?: string | null;
  name?: string;
  value?: boolean | unknown;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeValue?: (value: boolean) => void;
};
