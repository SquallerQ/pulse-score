import { QueryCache, QueryClient } from '@tanstack/react-query';
import { pushToast } from '../toastBus';

export const queryClient = new QueryClient({
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
