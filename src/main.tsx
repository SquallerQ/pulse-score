import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './context/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { ToastViewport } from './components/ToastViewport/ToastViewport';
import { pushToast } from './lib/toastBus';

import App from './App.tsx';
import './styles/reset.css';
import './styles/main.css';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.suppressToast) return;

      const message =
        error instanceof Error && error.message
          ? error.message.includes('429')
            ? 'API request limit reached. Please try again later.'
            : error.message
          : 'Something went wrong while loading data.';

      pushToast(message, 'error');
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastViewport />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
