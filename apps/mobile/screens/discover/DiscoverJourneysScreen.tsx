import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PIconButton, PText } from '../../components';
import { getJourneys, getPackages } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const SORT_OPTIONS = ['Tumu', 'Onerilen', 'Populer', 'Yeni'];
const LEVEL_OPTIONS = [
  { key: 'tumu', label: 'Tumu' },
  { key: 'baslangic', label: 'Baslangic' },
  { key: 'orta', label: 'Orta' },
  { key: 'ileri', label: 'Ileri' }
];
const CARD_EMOJIS = ['🎯', '🙏', '🌿', '🧘'];
const CARD_COLORS = ['#FFDDC1', '#D1FAE5', '#E9D5FF', '#FDE68A'];
const LEVEL_LABELS: Record<string, string> = {
  baslangic: 'Baslangic',
  beginner: 'Baslangic',
  orta: 'Orta',
  intermediate: 'Orta',
  ileri: 'Ileri',
  advanced: 'Ileri'
};
const BEGINNER_KEYS = new Set(['baslangic', 'beginner']);
const ORTA_KEYS = new Set(['orta', 'intermediate']);
const ILERI_KEYS = new Set(['ileri', 'advanced']);

const DiscoverJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const allJourneys = getJourneys();
  const packages = getPackages();
  const [selectedSort, setSelectedSort] = React.useState('Tumu');
  const [selectedLevel, setSelectedLevel] = React.useState('tumu');
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const levelMatches = (journeyLevel: string) => {
    if (selectedLevel === 'tumu') return true;
    if (selectedLevel === 'baslangic') return BEGINNER_KEYS.has(journeyLevel);
    if (selectedLevel === 'orta') return ORTA_KEYS.has(journeyLevel);
    if (selectedLevel === 'ileri') return ILERI_KEYS.has(journeyLevel);
    return true;
  };

  const filtered = allJourneys.filter(j => levelMatches(j.level));

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === 'Populer') return (b.duration_days ?? 0) - (a.duration_days ?? 0);
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
            buttonColor={selectedSort === label ? c.secondary : c.surfaceVariant}
            textColor={selectedSort === label ? c.onSecondary : c.textSecondary}
            onPress={() => setSelectedSort(label)}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      {/* Level filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {LEVEL_OPTIONS.map(lvl => (
          <PButton
            key={lvl.key}
            mode={selectedLevel === lvl.key ? 'contained' : 'outlined'}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedLevel === lvl.key ? c.primary : 'transparent'}
            textColor={selectedLevel === lvl.key ? c.onPrimary : c.textBrand}
            onPress={() => setSelectedLevel(lvl.key)}
          >
            {lvl.label}
          </PButton>
        ))}
      </ScrollView>

      {sorted.length === 0 ? (
        <StateMessage
          title="Sonuc bulunamadi"
          description="Baska bir seviye filtresi deneyin."
          actionLabel="Tumu Goster"
          icon="filter-remove-outline"
        />
      ) : (
        sorted.map((item, index) => {
          const origIndex = allJourneys.findIndex(j => j.id === item.id);
          const duration = item.duration_days ?? 40;
          const level = LEVEL_LABELS[item.level] ?? item.level;
          const pkgCount =
            packages.filter(p => item.featured_modules?.some((mid: string) => p.module_id === mid)).length ||
            3 + (origIndex % 2);
          const workshopCount = item.featured_workshops?.length || 2 + (origIndex % 2);
          const ebookCount = item.featured_ebooks?.length || 1;
          const isFav = favorites.has(item.id);
          const color = CARD_COLORS[origIndex % CARD_COLORS.length];
          const emoji = CARD_EMOJIS[origIndex % CARD_EMOJIS.length];

          return (
            <PCard
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Content', {
                  screen: 'ContentJourneyDetail',
                  params: { id: item.id }
                })
              }
            >
              <View style={styles.cardInner}>
                <View style={styles.cardTop}>
                  <View style={[styles.cardIcon, { backgroundColor: color }]}>
                    <PText style={styles.cardEmoji}>{emoji}</PText>
                  </View>
                  <View style={styles.cardInfo}>
                    <PText style={styles.cardTitle}>{item.title}</PText>
                    <View style={styles.cardMetaRow}>
                      <PText style={styles.cardMeta}>⏱ {duration} gun</PText>
                      <PText style={styles.cardMetaSep}>·</PText>
                      <PText style={styles.cardMeta}>📊 {level}</PText>
                    </View>
                    <PText style={styles.cardTarget}>{item.daily_target ?? '10 dk/gun'}</PText>
                    <View style={styles.chipRow}>
                      <PText style={styles.chipPrimary}>📦 {pkgCount} Modul</PText>
                      <PText style={styles.chipSuccess}>🎨 {workshopCount} Atolye</PText>
                      <PText style={styles.chipSecondary}>📖 {ebookCount} Kitap</PText>
                    </View>
                  </View>
                  <PIconButton
                    icon={isFav ? 'heart' : 'heart-outline'}
                    size={20}
                    iconColor={isFav ? '#E11D48' : '#9CA3AF'}
                    onPress={() => !isOffline && toggleFavorite(item.id)}
                    style={styles.favButton}
                    accessibilityLabel={isFav ? 'Favorilerden kaldir' : 'Favorilere ekle'}
                  />
                </View>
                <View style={styles.cardFooter}>
                  <PButton
                    mode="contained"
                    compact
                    disabled={isOffline}
                    style={styles.startButton}
                    contentStyle={styles.startButtonContent}
                    labelStyle={styles.startButtonLabel}
                    buttonColor={c.secondary}
                    onPress={() =>
                      navigation.navigate('Content', {
                        screen: 'ContentJourneyDetail',
                        params: { id: item.id }
                      })
                    }
                  >
                    Yolculugu Baslat
                  </PButton>
                </View>
              </View>
            </PCard>
          );
        })
      )}
      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverJourneysScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Yolculuklar">
        <PActivityIndicator animating />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={36} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Yolculuklar">
        <StateMessage
          title="Yolculuk bulunamadi"
          description="Yeni icerikler kisa sure icinde eklenecek."
          actionLabel="Bildirimleri Ac"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Yolculuklar">
        <StateMessage
          title="Yolculuklar yuklenemedi"
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
      <ScreenLayout title="Yolculuklar">
        <OfflineNotice />
        <DiscoverJourneysContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuklar">
      <DiscoverJourneysContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: c.background },
    content: { paddingHorizontal: spacing[2.5], paddingTop: spacing[2.5], paddingBottom: 96 },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[2]
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    title: { fontSize: fontSizes['7xl'], fontWeight: fontWeights.extraBold, color: c.textBrand },
    countBadge: {
      backgroundColor: c.primaryContainer,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radii.lg
    },
    countBadgeText: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      color: c.onPrimaryContainer
    },
    chipsRow: { gap: spacing[1], paddingBottom: 4, marginBottom: spacing[1.5] },
    chip: { borderRadius: spacing[2.5], elevation: 0 },
    chipContent: { height: 34, paddingHorizontal: 4 },
    chipLabel: { fontSize: fontSizes.base, fontWeight: fontWeights.semiBold },
    card: { borderRadius: radii.xl, marginBottom: spacing[2] },
    cardInner: { borderRadius: radii.xl, overflow: 'hidden' },
    cardTop: { flexDirection: 'row', gap: spacing[1.5], padding: spacing[2] },
    cardIcon: {
      width: 72,
      height: 72,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    cardEmoji: { fontSize: fontSizes['8xl'] },
    cardInfo: { flex: 1 },
    cardTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 4
    },
    cardMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
    cardMeta: { fontSize: fontSizes.base, color: c.textTertiary },
    cardMetaSep: { fontSize: fontSizes.base, color: c.outline },
    cardTarget: {
      fontSize: fontSizes.sm,
      color: c.onPrimaryContainer,
      fontWeight: fontWeights.semiBold,
      marginBottom: 6
    },
    chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
    chipPrimary: {
      backgroundColor: c.primaryContainer,
      color: c.onPrimaryContainer,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    chipSuccess: {
      backgroundColor: c.tertiaryContainer,
      color: c.onTertiaryContainer,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    chipSecondary: {
      backgroundColor: c.secondaryContainer,
      color: c.textBrand,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    favButton: { margin: 0, alignSelf: 'flex-start' },
    cardFooter: {
      borderTopWidth: 1,
      borderTopColor: c.outlineVariant,
      paddingHorizontal: spacing[2],
      paddingVertical: 10,
      alignItems: 'flex-start'
    },
    startButton: { borderRadius: radii.md, elevation: 0 },
    startButtonContent: { height: 36, paddingHorizontal: spacing[2] },
    startButtonLabel: { fontSize: fontSizes.md, fontWeight: fontWeights.bold },
    bottomSpacer: { height: spacing[3] }
  });
}
