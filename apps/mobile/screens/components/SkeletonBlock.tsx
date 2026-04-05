import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

type SkeletonBlockProps = {
  height?: number;
};

export const SkeletonBlock = ({ height = 16 }: SkeletonBlockProps) => {
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

const styles = StyleSheet.create({
  block: {
    borderRadius: 12,
    marginBottom: 12
  }
});
