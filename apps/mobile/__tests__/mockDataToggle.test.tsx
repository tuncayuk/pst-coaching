import { QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';

import { getMockData, setMockDataEnabled } from '../config/mockData';
import { useJourneys } from '../data/content';
import { createQueryClient } from '../data/queryClient';

afterEach(() => {
  setMockDataEnabled(true);
});

const MockJourneyPreview = () => {
  const { data } = useJourneys();
  return <Text>{data?.[0]?.title ?? 'Yükleniyor'}</Text>;
};

describe('mock data toggles', () => {
  it('returns fixtures when enabled', () => {
    setMockDataEnabled(true);

    const data = getMockData();

    expect(data?.meta?.notes).toBeTruthy();
  });

  it('returns null when disabled', () => {
    setMockDataEnabled(false);

    expect(getMockData()).toBeNull();
  });

  it('renders mock data without network', async () => {
    setMockDataEnabled(true);

    const queryClient = createQueryClient();

    const { findByText } = render(
      <QueryClientProvider client={queryClient}>
        <MockJourneyPreview />
      </QueryClientProvider>
    );

    const data = getMockData();
    const firstTitle = data?.journeys?.[0]?.title ?? '';

    expect(await findByText(firstTitle)).toBeTruthy();
  });
});
