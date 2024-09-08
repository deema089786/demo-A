import React, { PropsWithChildren, useMemo } from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';

import { StatusLogoProps } from './status-logo.types';

const colors: Record<StatusLogoProps['variant'], ChipProps['color']> = {
  active: 'success',
  archived: 'warning',
  draft: 'warning',
  deleted: 'warning',
};

const labels: Record<StatusLogoProps['variant'], string> = {
  active: 'Published',
  archived: 'Archived',
  draft: 'Draft',
  deleted: 'Deleted',
};

export const StatusLogo: React.FC<StatusLogoProps> = (props) => {
  const { variant, size = 'medium' } = props;
  const { color, label } = useMemo(
    () => ({
      color: colors[variant],
      label: labels[variant],
    }),
    [variant],
  );

  return <Chip color={color} label={label} size={size} />;
};
