import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';

/**
 * QueryClient configuration.
 *
 * - retry: 1  — only retry once on failure (static data won't benefit from more)
 * - staleTime: Infinity — data never goes stale globally; individual queries
 *   can override this when a real API is introduced
 * - refetchOnWindowFocus: false — no background refetches for static data
 * - throwOnError: false — errors are handled per-query, not via error boundaries
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      throwOnError: false,
    },
    mutations: {
      retry: 0,
      throwOnError: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
