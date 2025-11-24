/**
 * React Query Client Configuration
 * 
 * Centralized configuration for React Query (TanStack Query).
 * Provides default options for queries and mutations.
 * 
 * @example
 * ```tsx
 * import { QueryClientProvider } from '@tanstack/react-query';
 * import { queryClient } from '@/base/api';
 * 
 * function App() {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       <YourApp />
 *     </QueryClientProvider>
 *   );
 * }
 * ```
 */

import { QueryClient } from '@tanstack/react-query';

/**
 * Default query client configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * Create a custom query client with specific options
 */
export function createQueryClient(options?: {
  staleTime?: number;
  retry?: number;
  refetchOnWindowFocus?: boolean;
}): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: options?.staleTime ?? 1000 * 60 * 5,
        retry: options?.retry ?? 2,
        refetchOnWindowFocus: options?.refetchOnWindowFocus ?? false,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

