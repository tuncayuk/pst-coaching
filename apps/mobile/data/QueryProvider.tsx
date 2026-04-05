import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { queryClient } from './queryClient';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
