import React from 'react';

export type TagPropsColor =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'warning'
  | 'success';

export type TagProps = {
  children?: React.ReactNode;
  color?: TagPropsColor;
};
