import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

type SkeletonBlockProps = {
  height?: number;
};

export const SkeletonBlock = ({ height = 16 }: SkeletonBlockProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const theme = useTheme();

  return (
    <View
      style={[
        styles.block,
        {
          height,
          backgroundColor: theme.colors.surfaceVariant
        }
      ]}
    />
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    block: {
      borderRadius: radii.lg,
      marginBottom: spacing[1.5]
    }
  });
}
