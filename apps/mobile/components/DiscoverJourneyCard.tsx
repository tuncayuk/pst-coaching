import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PCard } from './PCard';
import { PText } from './PText';

export type DiscoverJourneyCardItem = {
  id: string;
  title: string;
  description?: string;
  duration_days: number;
  level: string;
  daily_target?: string;
  featured?: boolean;
};

export type DiscoverJourneyCardProps = {
  journey: DiscoverJourneyCardItem;
  index: number;
  showFreeBadge?: boolean;
  onPress: () => void;
};

const ICON_PALETTES: { bg: string; emoji: string }[] = [
  { bg: '#DBEAFE', emoji: '🎯' },
  { bg: '#D1FAE5', emoji: '🙏' },
  { bg: '#EDE9FE', emoji: '🌿' },
  { bg: '#FEF3C7', emoji: '🧘' },
  { bg: '#FCE7F3', emoji: '✨' }
];

const LEVEL_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  baslangic: { label: 'Başlangıç', bg: '#D1FAE5', text: '#065F46' },
  beginner:  { label: 'Başlangıç', bg: '#D1FAE5', text: '#065F46' },
  basico:    { label: 'Başlangıç', bg: '#D1FAE5', text: '#065F46' },
  orta:      { label: 'Orta',      bg: '#FEF3C7', text: '#92400E' },
  intermediate: { label: 'Orta',   bg: '#FEF3C7', text: '#92400E' },
  ileri:     { label: 'İleri',     bg: '#FEE2E2', text: '#991B1B' },
  advanced:  { label: 'İleri',     bg: '#FEE2E2', text: '#991B1B' }
};

export const DiscoverJourneyCard = ({ journey, index, showFreeBadge, onPress }: DiscoverJourneyCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const palette = ICON_PALETTES[index % ICON_PALETTES.length];
  const levelCfg = LEVEL_CONFIG[journey.level] ?? { label: journey.level, bg: '#F3F4F6', text: '#374151' };

  return (
    <PCard
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={`${journey.title}, ${journey.duration_days} gun yolculuk`}
      accessibilityHint="Yolculuk detaylarini acmak icin dokun"
      accessibilityRole="button"
    >
      <View style={styles.inner}>
        {/* Icon */}
        <View style={[styles.icon, { backgroundColor: palette.bg }]} accessibilityElementsHidden>
          <PText style={styles.emoji}>{palette.emoji}</PText>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title row */}
          <View style={styles.titleRow}>
            <PText style={styles.title} numberOfLines={1}>
              {journey.title}
            </PText>
            {showFreeBadge && (
              <View style={styles.freeBadge}>
                <PText style={styles.freeBadgeText}>Ücretsiz</PText>
              </View>
            )}
          </View>

          {/* Description */}
          {!!journey.description && (
            <PText style={styles.description} numberOfLines={1}>
              {journey.description}
            </PText>
          )}

          {/* Meta row */}
          <View style={styles.metaRow}>
            <PText style={styles.metaText}>⏱ {journey.duration_days} gün</PText>
            <View style={[styles.levelChip, { backgroundColor: levelCfg.bg }]}>
              <PText style={[styles.levelText, { color: levelCfg.text }]}>{levelCfg.label}</PText>
            </View>
          </View>

          {/* Daily target */}
          {!!journey.daily_target && (
            <View style={styles.targetPill}>
              <PText style={styles.targetText}>{journey.daily_target}</PText>
            </View>
          )}
        </View>

        {/* Chevron */}
        <View style={styles.chevron} accessibilityElementsHidden>
          <Icon source="chevron-right" size={20} color={c.textDisabled} />
        </View>
      </View>
    </PCard>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      borderRadius: radii.xl,
      marginBottom: spacing[1.5]
    },
    inner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1.5],
      padding: spacing[1.5]
    },
    icon: {
      width: 64,
      height: 64,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    emoji: {
      fontSize: fontSizes['8xl']
    },
    content: {
      flex: 1,
      gap: 4
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing[1]
    },
    title: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      flex: 1
    },
    freeBadge: {
      backgroundColor: c.tertiaryContainer,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.xs
    },
    freeBadgeText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold,
      color: c.onTertiaryContainer
    },
    description: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      lineHeight: 17
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    metaText: {
      fontSize: fontSizes.sm,
      color: c.textTertiary
    },
    levelChip: {
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    levelText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold
    },
    targetPill: {
      alignSelf: 'flex-start',
      backgroundColor: c.primaryContainer,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm
    },
    targetText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semiBold,
      color: c.onPrimaryContainer
    },
    chevron: {
      flexShrink: 0,
      opacity: 0.5
    }
  });
}
