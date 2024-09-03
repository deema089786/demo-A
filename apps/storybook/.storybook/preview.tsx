import { Preview } from '@storybook/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { darkTheme, lightTheme } from '@demo-A/app-design-system';
import { AuthProvider } from '@demo-A/app-modules';
import './reset.css';

const queryClient = new QueryClient();

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
    defaultTheme: 'dark',
    Provider: ThemeProvider,
    GlobalStyles: CssBaseline,
  }),
  (story: any) => <AuthProvider>{story()}</AuthProvider>,
  (story: any) => (
    <QueryClientProvider client={queryClient}>{story()}</QueryClientProvider>
  ),
];

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#e0e0e0',
        },
        {
          name: 'dark',
          value: '#383838',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
        {
          name: 'black',
          value: '#000000',
        },
      ],
    },
  },
};

export default preview;
