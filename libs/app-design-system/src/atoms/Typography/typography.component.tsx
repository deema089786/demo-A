import React, { PropsWithChildren } from 'react';
import TypographyMUI from '@mui/material/Typography';

import { TypographyProps } from './typography.types';

export const Typography: React.FC<PropsWithChildren<TypographyProps>> = (
  props,
) => {
  return <TypographyMUI {...props} />;
};
