import { QueryClient } from "@tanstack/react-query";

const DEFAULT_STALE_TIME_MS = 1000 * 60;
const DEFAULT_GC_TIME_MS = 1000 * 60 * 10;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: DEFAULT_STALE_TIME_MS,
        gcTime: DEFAULT_GC_TIME_MS,
        refetchOnWindowFocus: false,
      },
    },
  });

export const queryClient = createQueryClient();
