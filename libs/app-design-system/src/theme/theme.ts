import { createTheme, ThemeOptions } from '@mui/material/styles';
import _merge from 'lodash/merge';

const defaultThemeOptions: ThemeOptions = {
  spacing: 8,
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': { marginTop: 0 },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10000,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10000,
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      light: '#4d02b3',
      main: '#300170',
      dark: '#20014a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      paper: '#fbf6fd',
      default: '#f9f3ff',
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      light: '#ffffff',
      main: '#e0d0f3',
      dark: '#a790c3',
      contrastText: '#232323',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    text: {
      primary: '#f7e9fa',
      secondary: '#b7abba',
      disabled: '#534557',
    },
    background: {
      paper: '#1c1c1c',
      default: '#333333',
    },
  },
  // components: {
  //   MuiDivider: {
  //     styleOverrides: {
  //       root: {
  //         backgroundColor: '#e0d0f3',
  //       },
  //     },
  //   },
  // },
};

export const lightTheme = createTheme(
  _merge(defaultThemeOptions, lightThemeOptions),
);
export const darkTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
  ..._merge(defaultThemeOptions, darkThemeOptions),
});
