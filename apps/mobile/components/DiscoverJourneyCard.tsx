import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PCard } from './PCard';
import { PText } from './PText';

export type DiscoverJourneyCardItem = {
  id: string;
  title: string;
  duration_days: number;
  level: string;
  daily_target?: string;
};

export type DiscoverJourneyCardProps = {
  journey: DiscoverJourneyCardItem;
  index: number;
  showFreeBadge?: boolean;
  onPress: () => void;
};

const JOURNEY_COLORS = ['#FFDDC1', '#D1FAE5', '#E9D5FF', '#FDE68A'];
const JOURNEY_EMOJIS = ['🎯', '🙏', '🌿', '🧘'];

const LEVEL_LABELS: Record<string, string> = {
  baslangic: 'Baslangic',
  beginner: 'Baslangic',
  orta: 'Orta',
  intermediate: 'Orta',
  ileri: 'Ileri',
  advanced: 'Ileri'
};

export const DiscoverJourneyCard = ({ journey, index, showFreeBadge, onPress }: DiscoverJourneyCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const iconBg = JOURNEY_COLORS[index % JOURNEY_COLORS.length];
  const emoji = JOURNEY_EMOJIS[index % JOURNEY_EMOJIS.length];
  const levelLabel = LEVEL_LABELS[journey.level] ?? journey.level;

  return (
    <PCard
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={`${journey.title}, ${journey.duration_days} gun yolculuk`}
      accessibilityHint="Yolculuk detaylarini acmak icin dokun"
      accessibilityRole="button"
    >
      <View style={styles.row}>
        <View style={[styles.icon, { backgroundColor: iconBg }]} accessibilityElementsHidden>
          <PText style={styles.emoji}>{emoji}</PText>
        </View>
        <View style={styles.info}>
          <View style={styles.titleRow}>
            <PText style={styles.title} numberOfLines={2}>
              {journey.title}
            </PText>
            {showFreeBadge && (
              <View style={styles.freeBadge}>
                <PText style={styles.freeBadgeText}>Ucretsiz</PText>
              </View>
            )}
          </View>
          <View style={styles.metaRow}>
            <PText style={styles.metaText}>⏱ {journey.duration_days} gun</PText>
            <PText style={styles.metaDot}>·</PText>
            <PText style={styles.metaText}>📊 {levelLabel}</PText>
          </View>
          {!!journey.daily_target && (
            <PText style={styles.dailyTarget}>{journey.daily_target}</PText>
          )}
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
    row: {
      flexDirection: 'row',
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
    info: {
      flex: 1
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacing[1],
      marginBottom: 4
    },
    title: {
      fontSize: fontSizes.xl,
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
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 2
    },
    metaText: {
      fontSize: fontSizes.base,
      color: c.textTertiary
    },
    metaDot: {
      fontSize: fontSizes.base,
      color: c.outline
    },
    dailyTarget: {
      fontSize: fontSizes.sm,
      color: c.onPrimaryContainer,
      fontWeight: fontWeights.semiBold
    }
  });
}
