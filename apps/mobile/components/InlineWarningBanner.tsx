import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PText } from './PText';

export type InlineWarningBannerTone = 'warning' | 'error' | 'info' | 'success';

export type InlineWarningBannerProps = {
  title: string;
  message: string;
  tone?: InlineWarningBannerTone;
};

const TONE_ICONS: Record<InlineWarningBannerTone, string> = {
  warning: 'alert-outline',
  error: 'alert-circle-outline',
  info: 'information-outline',
  success: 'check-circle-outline'
};

/**
 * Inline contextual banner with a left accent border, icon, title, and message.
 * Replaces all hardcoded hex colors (`#FFF3E0`, `#F57C00`, `#E65100`, `#BF360C`) with
 * semantic design tokens — fully dark-mode safe.
 *
 * Usage: `<InlineWarningBanner title="Uyari" message="..." tone="warning" />`
 */
export const InlineWarningBanner = ({ title, message, tone = 'warning' }: InlineWarningBannerProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c, tone), [c, tone]);

  const colors = getToneColors(c, tone);

  return (
    <View
      style={styles.container}
      accessibilityRole="alert"
      accessibilityLabel={`${title}: ${message}`}
    >
      <View style={[styles.accentBar, { backgroundColor: colors.accent }]} accessibilityElementsHidden />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View accessibilityElementsHidden>
            <Icon source={TONE_ICONS[tone]} size={16} color={colors.title} />
          </View>
          <PText style={[styles.title, { color: colors.title }]}>{title}</PText>
        </View>
        <PText style={[styles.message, { color: colors.message }]}>{message}</PText>
      </View>
    </View>
  );
};

function getToneColors(c: ColorTokens, tone: InlineWarningBannerTone) {
  switch (tone) {
    case 'error':
      return { bg: c.errorContainer, accent: c.error, title: c.onErrorContainer, message: c.onErrorContainer };
    case 'info':
      return { bg: c.primaryContainer, accent: c.primary, title: c.onPrimaryContainer, message: c.onPrimaryContainer };
    case 'success':
      return { bg: c.tertiaryContainer, accent: c.tertiary, title: c.onTertiaryContainer, message: c.onTertiaryContainer };
    case 'warning':
    default:
      return { bg: c.warningContainer, accent: c.warning, title: c.onWarningContainer, message: c.onWarningContainer };
  }
}

function makeStyles(c: ColorTokens, tone: InlineWarningBannerTone) {
  const colors = getToneColors(c, tone);
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: colors.bg,
      borderRadius: radii.lg,
      marginBottom: spacing[1.5],
      overflow: 'hidden'
    },
    accentBar: {
      width: 4
    },
    body: {
      flex: 1,
      padding: spacing[1.5]
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[0.5],
      marginBottom: spacing[0.5]
    },
    title: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold
    },
    message: {
      fontSize: fontSizes.base,
      lineHeight: 18
    }
  });
}
