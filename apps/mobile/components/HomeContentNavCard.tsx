import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PText } from './PText';

export type HomeContentNavCardProps = {
  label: string;
  icon: string;
  count: string;
  description?: string;
  accentColor?: string;
  bg?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const HomeContentNavCard = ({
  label,
  icon,
  count,
  description,
  accentColor,
  bg,
  onPress,
  disabled
}: HomeContentNavCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const accent = accentColor ?? c.primary;
  const cardBg = bg ?? c.surfaceVariant;

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardBg, borderColor: accent + '38' }]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.75}
      accessibilityLabel={`${label}, ${count}`}
      accessibilityRole="button"
      accessibilityHint={`${label} katalna gider`}
      accessibilityState={{ disabled }}
    >
      {/* Watermark icon — decorative background element */}
      <View style={styles.watermark} accessibilityElementsHidden pointerEvents="none">
        <Icon source={icon} size={64} color={accent} />
      </View>
      <View style={styles.content}>
        <PText style={[styles.countHero, { color: accent }]}>{count.split(' ')[0]}</PText>
        <PText style={styles.label}>{label}</PText>
        {description ? (
          <PText style={styles.description} numberOfLines={2}>
            {description}
          </PText>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      flex: 1,
      borderRadius: radii['2xl'],
      borderWidth: 1.5,
      overflow: 'hidden',
      minHeight: 116,
      padding: spacing[1.5],
      position: 'relative'
    },
    watermark: {
      position: 'absolute',
      bottom: -10,
      right: -6,
      opacity: 0.1
    },
    content: {
      flex: 1
    },
    countHero: {
      fontSize: fontSizes['8xl'],
      fontWeight: fontWeights.black,
      lineHeight: 32,
      marginBottom: spacing[0.5]
    },
    label: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.extraBold,
      color: c.textPrimary,
      marginBottom: 3
    },
    description: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      lineHeight: 16
    }
  });
}
