import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PIconButton, PText } from '../../components';
import { getEbooks } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const SORT_OPTIONS = ['Tumu', 'Onerilen', 'Populer', 'Yeni'];
const COVER_COLORS = ['#B2EBF2', '#D1FAE5', '#E9D5FF', '#FDE68A'];
const COVER_EMOJIS = ['📖', '📘', '📕', '📗'];

const DiscoverEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const ebooks = getEbooks();
  const [selectedSort, setSelectedSort] = React.useState('Tumu');
  const [selectedCategory, setSelectedCategory] = React.useState('Tumu');

  const categories = ['Tumu', ...Array.from(new Set(ebooks.map(e => e.category ?? 'Diger')))];

  const filtered = ebooks.filter(e =>
    selectedCategory === 'Tumu' ? true : (e.category ?? 'Diger') === selectedCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === 'Populer') return (b.total_pages ?? 0) - (a.total_pages ?? 0);
    if (selectedSort === 'Yeni') return b.id.localeCompare(a.id);
    if (selectedSort === 'Onerilen') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  return (
    <View>
      {/* Sort chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {SORT_OPTIONS.map(label => (
          <PButton
            key={label}
            mode="contained"
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedSort === label ? '#2B1B5D' : '#F5F5F5'}
            textColor={selectedSort === label ? '#FFFFFF' : '#525252'}
            onPress={() => setSelectedSort(label)}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      {/* Category filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {categories.map(cat => (
          <PButton
            key={cat}
            mode={selectedCategory === cat ? 'contained' : 'outlined'}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedCategory === cat ? '#00B4D8' : 'transparent'}
            textColor={selectedCategory === cat ? '#FFFFFF' : '#2B1B5D'}
            onPress={() => setSelectedCategory(cat)}
          >
            {cat}
          </PButton>
        ))}
      </ScrollView>

      {sorted.length === 0 ? (
        <StateMessage
          title="Sonuc bulunamadi"
          description="Baska bir kategori filtresi deneyin."
          actionLabel="Tumu Goster"
          icon="filter-remove-outline"
        />
      ) : (
        <View style={styles.grid}>
          {sorted.map(item => {
            const origIndex = ebooks.findIndex(e => e.id === item.id);
            const pages = item.total_pages ?? 180;
            const readHours = Math.max(1, Math.round(pages / 60));
            return (
              <Pressable
                key={item.id}
                style={styles.gridItem}
                disabled={isOffline}
                accessibilityRole="button"
                accessibilityLabel={item.title}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'ContentEbookDetail',
                    params: { id: item.id }
                  })
                }
              >
                <View style={[styles.cover, { backgroundColor: COVER_COLORS[origIndex % COVER_COLORS.length] }]}>
                  <PText style={styles.coverEmoji}>{COVER_EMOJIS[origIndex % COVER_EMOJIS.length]}</PText>
                  {item.featured && (
                    <View style={styles.featuredBadge}>
                      <PText style={styles.featuredBadgeText}>One Cikan</PText>
                    </View>
                  )}
                </View>
                <PText style={styles.bookTitle} numberOfLines={2}>
                  {item.title}
                </PText>
                <PText style={styles.bookCategory}>{item.category ?? 'Genel'}</PText>
                <PText style={styles.bookMeta}>
                  {pages} s. · ~{readHours}s
                </PText>
              </Pressable>
            );
          })}
        </View>
      )}
      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverEbooksScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="e-Kitaplar">
        <PActivityIndicator animating />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={36} />
        <SkeletonBlock height={200} />
        <SkeletonBlock height={200} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="e-Kitaplar">
        <StateMessage
          title="e-Kitap bulunamadi"
          description="Yakinda yeni e-Kitaplar eklenecek."
          actionLabel="Bildirimleri Ac"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="e-Kitaplar">
        <StateMessage
          title="e-Kitaplar yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="e-Kitaplar">
        <OfflineNotice />
        <DiscoverEbooksContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitaplar">
      <DiscoverEbooksContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: c.background },
    content: { paddingHorizontal: spacing[2.5], paddingTop: 20, paddingBottom: 96 },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[2]
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    title: { fontSize: fontSizes['7xl'], fontWeight: fontWeights.extraBold, color: c.textBrand },
    countBadge: {
      backgroundColor: palette.purple50,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radii.lg
    },
    countBadgeText: { fontSize: fontSizes.base, fontWeight: fontWeights.bold, color: '#4C1D95' },
    chipsRow: { gap: spacing[1], paddingBottom: 4, marginBottom: spacing[1.5] },
    chip: { borderRadius: radii['2xl'], elevation: 0 },
    chipContent: { height: 34, paddingHorizontal: 4 },
    chipLabel: { fontSize: fontSizes.base, fontWeight: fontWeights.semiBold },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 20
    },
    gridItem: { flexBasis: '48%' },
    cover: {
      height: 180,
      borderRadius: radii.xl,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3
    },
    coverEmoji: { fontSize: fontSizes['11xl'] },
    featuredBadge: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: c.textBrand,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    featuredBadgeText: { fontSize: fontSizes.xs, fontWeight: fontWeights.bold, color: palette.white },
    bookTitle: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      lineHeight: 17,
      marginBottom: 3
    },
    bookCategory: { fontSize: fontSizes.sm, color: '#00758C', fontWeight: fontWeights.semiBold, marginBottom: 2 },
    bookMeta: { fontSize: fontSizes.sm, color: '#9CA3AF', marginBottom: 4 },
    bottomSpacer: { height: 24 }
  });
}
