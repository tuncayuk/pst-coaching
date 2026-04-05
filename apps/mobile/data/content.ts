import { useQuery } from '@tanstack/react-query';

import { getMockData, isMockDataEnabled } from '../config/mockData';
import { queryKeys } from './queryKeys';

export type Journey = {
  id: string;
  title: string;
  description?: string;
  duration_days?: number;
  daily_target?: string;
  level?: string;
  language?: string;
};

const loadMockJourneys = async (): Promise<Journey[]> => {
  const data = getMockData();
  return data?.journeys ?? [];
};

export const useJourneys = () => {
  const enabled = isMockDataEnabled();

  return useQuery({
    queryKey: queryKeys.journeys,
    queryFn: loadMockJourneys,
    enabled
  });
};

export const getMockJourneys = (): Journey[] => {
  const data = getMockData();
  return data?.journeys ?? [];
};
