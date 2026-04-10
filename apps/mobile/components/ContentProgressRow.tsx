import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorTokens, fontSizes, fontWeights, spacing, useAppTheme } from '../theme';
import { PChip } from './PChip';
import { PProgressBar } from './PProgressBar';
import { PText } from './PText';

export type ContentProgressRowProps = {
  title: string;
  /** Value between 0 and 1. */
  progress: number;
  /** Optional subtitle shown below the title (e.g. "Gün 3 · 10 dk"). */
  subtitle?: string;
};

export const ContentProgressRow = ({ title, progress, subtitle }: ContentProgressRowProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const pct = Math.round(progress * 100);

  return (
    <View style={styles.container} accessibilityLabel={`${title}: ${pct}% tamamlandı`}>
      <View style={styles.header}>
        <PText style={styles.title} numberOfLines={1}>
          {title}
        </PText>
        <PChip compact accessibilityLabel={`${pct} yüzde`}>
          {pct}%
        </PChip>
      </View>
      {!!subtitle && (
        <PText style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </PText>
      )}
      <PProgressBar progress={progress} style={styles.bar} />
    </View>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      marginBottom: spacing[2]
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[1]
    },
    title: {
      flex: 1,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginRight: spacing[1]
    },
    subtitle: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      marginBottom: spacing[1]
    },
    bar: {
      height: spacing[1],
      borderRadius: 999
    }
  });
}
