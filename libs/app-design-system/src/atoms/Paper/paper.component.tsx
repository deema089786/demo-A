import React, { PropsWithChildren } from 'react';
import PaperMUI from '@mui/material/Paper';

import { PaperProps } from './paper.types';

export const Paper: React.FC<PropsWithChildren<PaperProps>> = (props) => {
  return <PaperMUI {...props} />;
};
