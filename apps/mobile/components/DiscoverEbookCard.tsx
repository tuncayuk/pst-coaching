import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PCard } from './PCard';
import { PText } from './PText';

export type DiscoverEbookCardItem = {
  id: string;
  title: string;
  total_pages?: number;
};

export type DiscoverEbookCardProps = {
  ebook: DiscoverEbookCardItem;
  index: number;
  onPress: () => void;
};

const EBOOK_COLORS = ['#B2EBF2', '#D1FAE5', '#E9D5FF', '#FDE68A'];
const EBOOK_EMOJIS = ['📖', '📘', '📕', '📗'];

export const DiscoverEbookCard = ({ ebook, index, onPress }: DiscoverEbookCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const coverBg = EBOOK_COLORS[index % EBOOK_COLORS.length];
  const emoji = EBOOK_EMOJIS[index % EBOOK_EMOJIS.length];

  return (
    <PCard
      style={styles.card}
      onPress={onPress}
      accessibilityLabel={`${ebook.title}, ${ebook.total_pages ?? 180} sayfa`}
      accessibilityHint="e-Kitap detaylarini acmak icin dokun"
      accessibilityRole="button"
    >
      <View style={[styles.cover, { backgroundColor: coverBg }]} accessibilityElementsHidden>
        <PText style={styles.emoji}>{emoji}</PText>
      </View>
      <PText style={styles.title} numberOfLines={2}>
        {ebook.title}
      </PText>
      <PText style={styles.meta}>{ebook.total_pages ?? 180} s.</PText>
    </PCard>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      width: 130,
      borderRadius: radii.lg
    },
    cover: {
      height: 160,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing[1]
    },
    emoji: {
      fontSize: fontSizes['11xl']
    },
    title: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      lineHeight: 16,
      paddingHorizontal: 4,
      marginBottom: 2
    },
    meta: {
      fontSize: fontSizes.sm,
      color: c.textDisabled,
      paddingHorizontal: 4,
      marginBottom: 4
    }
  });
}
