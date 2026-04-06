import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { PSurface, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

export const OfflineNotice = () => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <PSurface style={[styles.notice, { backgroundColor: c.secondaryContainer }]}>
      <PText variant="labelLarge" style={{ color: c.onSecondaryContainer }}>
        Çevrimdışısınız
      </PText>
      <PText variant="bodySmall" style={{ color: c.onSecondaryContainer }}>
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
