import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './context/ThemeContext/ThemeProvider';
import { AuthProvider } from './context/AuthContext/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ToastViewport } from './components/ToastViewport/ToastViewport';
import { queryClient } from './lib/react-query/queryClient';

import App from './App.tsx';
import './styles/reset.css';
import './styles/main.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <ToastViewport />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
