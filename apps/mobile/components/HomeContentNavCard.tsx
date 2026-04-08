import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PText } from './PText';

export type HomeContentNavCardProps = {
  label: string;
  icon: string;
  count: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const HomeContentNavCard = ({ label, icon, count, onPress, disabled }: HomeContentNavCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.78}
      accessibilityLabel={`${label}, ${count}`}
      accessibilityRole="button"
      accessibilityHint={`${label} katalna gider`}
      accessibilityState={{ disabled }}
    >
      <View style={styles.header} accessibilityElementsHidden>
        <Icon source={icon} size={22} color={c.primary} />
        <Icon source="chevron-right" size={16} color={c.outline} />
      </View>
      <PText style={styles.label}>{label}</PText>
      <PText style={styles.count}>{count}</PText>
    </TouchableOpacity>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: c.surface,
      borderRadius: radii.xl,
      padding: spacing[1.5],
      borderWidth: 1.5,
      borderColor: c.outlineVariant,
      minHeight: 88,
      justifyContent: 'center'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[0.5]
    },
    label: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: spacing[0.5]
    },
    count: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    }
  });
}
