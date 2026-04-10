import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PCard } from './PCard';
import { PText } from './PText';

export type DiscoverEbookCardItem = {
  id: string;
  title: string;
  total_pages?: number;
  category?: string;
  has_audio?: boolean;
  featured?: boolean;
};

export type DiscoverEbookCardProps = {
  ebook: DiscoverEbookCardItem;
  index: number;
  onPress: () => void;
};

const COVER_PALETTES: { bg: string; emoji: string }[] = [
  { bg: '#DBEAFE', emoji: '📘' },
  { bg: '#D1FAE5', emoji: '📗' },
  { bg: '#EDE9FE', emoji: '📕' },
  { bg: '#FEF3C7', emoji: '📙' },
  { bg: '#FCE7F3', emoji: '📓' }
];

export const DiscoverEbookCard = ({ ebook, index, onPress }: DiscoverEbookCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const palette = COVER_PALETTES[index % COVER_PALETTES.length];

  return (
    <PCard
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={`${ebook.title}, ${ebook.total_pages ?? 180} sayfa`}
      accessibilityHint="e-Kitap detaylarini acmak icin dokun"
      accessibilityRole="button"
    >
      {/* Cover */}
      <View style={[styles.cover, { backgroundColor: palette.bg }]} accessibilityElementsHidden>
        {ebook.featured && (
          <View style={styles.featuredBadge}>
            <PText style={styles.featuredText}>★</PText>
          </View>
        )}
        {ebook.has_audio && (
          <View style={styles.audioBadge}>
            <PText style={styles.audioText}>🎧</PText>
          </View>
        )}
        <PText style={styles.emoji}>{palette.emoji}</PText>
        {!!ebook.category && (
          <View style={styles.categoryBadge}>
            <PText style={styles.categoryText} numberOfLines={1}>{ebook.category}</PText>
          </View>
        )}
      </View>

      {/* Body */}
      <View style={styles.body}>
        <PText style={styles.title} numberOfLines={2}>
          {ebook.title}
        </PText>
        <View style={styles.metaRow}>
          <PText style={styles.metaText}>{ebook.total_pages ?? 180} s.</PText>
          {ebook.has_audio && <PText style={styles.metaText}>· Sesli</PText>}
        </View>
      </View>
    </PCard>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      width: 148,
      borderRadius: radii.xl
    },
    cover: {
      height: 168,
      borderTopLeftRadius: radii.xl,
      borderTopRightRadius: radii.xl,
      alignItems: 'center',
      justifyContent: 'center'
    },
    featuredBadge: {
      position: 'absolute',
      top: spacing[1],
      left: spacing[1],
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    featuredText: {
      fontSize: fontSizes.sm,
      color: '#92400E',
      fontWeight: fontWeights.bold
    },
    audioBadge: {
      position: 'absolute',
      top: spacing[1],
      right: spacing[1],
      backgroundColor: 'rgba(255,255,255,0.85)',
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    audioText: {
      fontSize: fontSizes.sm
    },
    emoji: {
      fontSize: fontSizes['11xl']
    },
    categoryBadge: {
      position: 'absolute',
      bottom: spacing[1],
      left: spacing[1],
      right: spacing[1],
      backgroundColor: 'rgba(0,0,0,0.12)',
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: radii.sm,
      alignItems: 'center'
    },
    categoryText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.semiBold,
      color: '#1e293b',
      textTransform: 'capitalize'
    },
    body: {
      paddingHorizontal: spacing[1.5],
      paddingTop: spacing[1],
      paddingBottom: spacing[1.5]
    },
    title: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      lineHeight: 18,
      marginBottom: 4
    },
    metaRow: {
      flexDirection: 'row',
      gap: 4
    },
    metaText: {
      fontSize: fontSizes.xs,
      color: c.textDisabled
    }
  });
}
