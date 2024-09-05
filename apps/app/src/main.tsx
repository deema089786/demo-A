import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { darkTheme } from '@demo-A/app-design-system';
import { ClientApi, AuthProvider } from '@demo-A/app-modules';

import { App } from './app';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

ClientApi.setBaseUrl({ baseURL: import.meta.env.VITE_API_BASE_URL });
ClientApi.setJWTAccessTokenGetter(async () => ({
  accessToken: localStorage.getItem('accessToken') || '',
}));

root.render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NiceModalProvider>
            <App />
          </NiceModalProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
);
