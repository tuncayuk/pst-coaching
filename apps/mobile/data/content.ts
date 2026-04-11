import { useQuery } from '@tanstack/react-query';

import { isMockDataEnabled } from '../config/mockData';
import { getJourneys } from './mockSelectors';
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
  return getJourneys();
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
  return getJourneys();
};
