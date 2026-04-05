import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PSurface, PText } from '../../components';

export const OfflineNotice = () => {
  const theme = useTheme();

  return (
    <PSurface style={[styles.notice, { backgroundColor: theme.colors.secondaryContainer }]}>
      <PText variant="labelLarge" style={{ color: theme.colors.onSecondaryContainer }}>
        Çevrimdışısınız
      </PText>
      <PText variant="bodySmall" style={{ color: theme.colors.onSecondaryContainer }}>
        Önbellekteki içerikler gösteriliyor. Bağlantı geldiğinde senkronize edeceğiz.
      </PText>
    </PSurface>
  );
};

const styles = StyleSheet.create({
  notice: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 16
  }
});
