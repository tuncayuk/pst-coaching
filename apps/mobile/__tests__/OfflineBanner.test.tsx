import { render } from '@testing-library/react-native';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

import { OfflineBanner } from '../components/OfflineBanner';
import { createAppStore } from '../state/store';

describe('OfflineBanner', () => {
  it('shows when offline', () => {
    const store = createAppStore({
      connectivity: { isOnline: false }
    });

    const { getByText } = render(
      <StoreProvider store={store}>
        <PaperProvider>
          <OfflineBanner />
        </PaperProvider>
      </StoreProvider>
    );

    expect(getByText('Çevrimdışısınız')).toBeTruthy();
  });

  it('hides when online', () => {
    const store = createAppStore({
      connectivity: { isOnline: true }
    });

    const { queryByText } = render(
      <StoreProvider store={store}>
        <PaperProvider>
          <OfflineBanner />
        </PaperProvider>
      </StoreProvider>
    );

    expect(queryByText('Çevrimdışısınız')).toBeNull();
  });
});
