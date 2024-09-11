import { SelectProps } from '@mui/material/Select';

import { TextFieldProps } from '../../inputs';

type FieldProps = TextFieldProps;
export type ServicePriceInputProps = {
  isEnabled: boolean;
  onIsEnabledChange: (isEnabled: boolean) => void;
  priceFieldProps?: FieldProps;
  discountPriceFieldProps?: FieldProps;
  amountFieldProps?: FieldProps;
  unitFieldProps?: SelectProps;
};
