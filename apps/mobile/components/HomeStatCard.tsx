import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PText } from './PText';

export type StatTone = 'primary' | 'success' | 'warning';

export type HomeStatCardProps = {
  label: string;
  value: number | string;
  icon: string;
  tone: StatTone;
  onPress?: () => void;
};

export const HomeStatCard = ({ label, value, icon, tone, onPress }: HomeStatCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const bgStyle =
    tone === 'primary' ? styles.bgPrimary : tone === 'success' ? styles.bgSuccess : styles.bgWarning;
  const iconColor = tone === 'primary' ? c.primary : tone === 'success' ? c.tertiary : c.warning;

  return (
    <TouchableOpacity
      style={[styles.card, bgStyle]}
      onPress={onPress}
      activeOpacity={onPress ? 0.82 : 1}
      accessibilityLabel={`${label}: ${value}`}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityHint={onPress ? `${label} detaylarini goruntule` : undefined}
    >
      <View accessibilityElementsHidden>
        <Icon source={icon} size={22} color={iconColor} />
      </View>
      <PText style={styles.value}>{value}</PText>
      <PText style={styles.label}>{label}</PText>
    </TouchableOpacity>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: radii.xl,
      padding: spacing[1.5],
      alignItems: 'center',
      minHeight: 88,
      justifyContent: 'center',
      gap: spacing[0.5]
    },
    bgPrimary: { backgroundColor: c.primaryContainer },
    bgSuccess: { backgroundColor: c.tertiaryContainer },
    bgWarning: { backgroundColor: c.warningContainer },
    value: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.extraBold,
      color: c.textBrand
    },
    label: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      color: c.textSecondary,
      textAlign: 'center'
    }
  });
}
