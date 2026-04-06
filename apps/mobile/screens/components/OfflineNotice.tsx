import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PSurface, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

export const OfflineNotice = () => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

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

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    notice: {
      padding: spacing[1.5],
      borderRadius: radii.xl,
      marginBottom: spacing[2]
    }
  });
}
