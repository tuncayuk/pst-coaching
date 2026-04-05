import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useAppSelector } from '../state/hooks';
import { selectIsOnline } from '../state/selectors';
import { PSurface, PText } from './index';

export const OfflineBanner = () => {
  const theme = useTheme();
  const isOnline = useAppSelector(selectIsOnline);

  if (isOnline) {
    return null;
  }

  return (
    <PSurface style={[styles.banner, { backgroundColor: theme.colors.errorContainer }]}>
      <PText variant="labelLarge" style={{ color: theme.colors.onErrorContainer }}>
        Çevrimdışısınız
      </PText>
      <PText variant="bodySmall" style={{ color: theme.colors.onErrorContainer }}>
        İnternet bağlantısı yok. Önbellekteki içerikler gösteriliyor.
      </PText>
    </PSurface>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8
  }
});
