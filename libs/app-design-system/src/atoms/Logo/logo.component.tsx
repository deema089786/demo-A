import { useColorScheme } from '@mui/material';
import React, { ImgHTMLAttributes } from 'react';

import LOGO_DARK from '../../assets/images/logo.svg';
import LOGO_LIGHT from '../../assets/images/logo-light.svg';

export const Logo: React.FC<ImgHTMLAttributes<any>> = (props) => {
  const { mode } = useColorScheme();
  const logoSrc = mode === 'dark' ? LOGO_LIGHT : LOGO_DARK;
  return <img src={logoSrc} alt="Presento Logo" {...props} />;
};
