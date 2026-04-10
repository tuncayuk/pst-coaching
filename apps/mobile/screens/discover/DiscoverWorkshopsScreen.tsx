import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
import { getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type Workshop = ReturnType<typeof getWorkshops>[number];

const SORT_OPTIONS = ['Tümü', 'Önerilen', 'Popüler', 'Yeni'] as const;
const TYPE_OPTIONS = [
  { key: 'tumu', label: 'Tümü' },
  { key: 'kamp', label: 'Kamp' },
  { key: 'rehber', label: 'Rehber' },
  { key: 'calisma_kitabi', label: 'Çalışma Kitabı' }
] as const;

const TYPE_LABELS: Record<string, string> = {
  kamp: 'Kamp',
  rehber: 'Rehber',
  calisma_kitabi: 'Çalışma Kitabı'
};
const TYPE_BG: Record<string, string> = {
  kamp: '#FEE2E2',
  rehber: '#D1FAE5',
  calisma_kitabi: '#EDE7F6'
};
const TYPE_FG: Record<string, string> = {
  kamp: '#B91C1C',
  rehber: '#065F46',
  calisma_kitabi: '#4C1D95'
};
const DIFFICULTY_LABELS: Record<string, string> = {
  baslangic: 'Başlangıç',
  orta: 'Orta',
  ileri: 'İleri'
};
const DIFFICULTY_COLOR: Record<string, string> = {
  baslangic: '#065F46',
  orta: '#92400E',
  ileri: '#7C2D12'
};

const getField = <T,>(w: Workshop, key: string, fallback: T): T =>
  ((w as any)[key] ?? fallback) as T;

const DiscoverWorkshopsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const workshops = getWorkshops();
  const [selectedSort, setSelectedSort] = React.useState<string>('Tümü');
  const [selectedType, setSelectedType] = React.useState<string>('tumu');

  const filtered = useMemo(() => {
    let list = workshops.filter(w =>
      selectedType === 'tumu' ? true : getField(w, 'type', '') === selectedType
    );
    if (selectedSort === 'Önerilen') list = list.filter(w => getField(w, 'is_recommended', false));
    if (selectedSort === 'Popüler') list = [...list].sort((a, b) => getField(b, 'attendee_count', 0) - getField(a, 'attendee_count', 0));
    if (selectedSort === 'Yeni') list = [...list].filter(w => getField(w, 'is_upcoming', false));
    return list;
  }, [workshops, selectedSort, selectedType]);

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

      {/* Type filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {TYPE_OPTIONS.map(opt => (
          <PButton
            key={opt.key}
            mode={selectedType === opt.key ? 'contained' : 'outlined'}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedType === opt.key ? c.primary : 'transparent'}
            textColor={selectedType === opt.key ? c.onPrimary : c.textBrand}
            onPress={() => setSelectedType(opt.key)}
          >
            {opt.label}
          </PButton>
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <StateMessage
          title="Sonuç bulunamadı"
          description="Başka bir tür filtresi deneyin."
          actionLabel="Tümünü Göster"
          icon="filter-remove-outline"
          onAction={() => { setSelectedSort('Tümü'); setSelectedType('tumu'); }}
        />
      ) : (
        filtered.map(item => {
          const wType: string = getField(item, 'type', 'kamp');
          const emoji: string = getField(item, 'emoji', '🎓');
          const color: string = getField(item, 'color', '#F3F4F6');
          const durationLabel: string = getField(item, 'duration_label', '—');
          const sessionCount: number = getField(item, 'session_count', 0);
          const ageTarget: string = getField(item, 'age_target', '18+');
          const isRecommended: boolean = getField(item, 'is_recommended', false);
          const isPopular: boolean = getField(item, 'is_popular', false);
          const attendeeCount: number = getField(item, 'attendee_count', 0);
          const difficulty: string = getField(item, 'difficulty', 'orta');
          const scheduledDate: string | null = getField(item, 'scheduled_date', null);
          const hasWorkbook: boolean = getField(item, 'has_workbook', false);
          const hasCamp: boolean = getField(item, 'has_camp', false);

          return (
            <PCard
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate('Content', {
                  screen: 'ContentWorkshopDetail',
                  params: { id: item.id }
                })
              }
              accessibilityLabel={item.title}
              accessibilityHint="Atölye detaylarını açmak için dokun"
              accessibilityRole="button"
            >
              <View style={styles.cardInner}>
                {/* Badge row */}
                {(isRecommended || isPopular) && (
                  <View style={styles.badgeRow}>
                    {isRecommended && (
                      <View style={styles.badgeRecommended}>
                        <PText style={styles.badgeText}>★ Önerilen</PText>
                      </View>
                    )}
                    {isPopular && (
                      <View style={styles.badgePopular}>
                        <PText style={styles.badgeText}>🔥 Popüler</PText>
                      </View>
                    )}
                  </View>
                )}

                {/* Card top */}
                <View style={styles.cardTop}>
                  <View style={[styles.cardIcon, { backgroundColor: color }]}>
                    <PText style={styles.cardEmoji}>{emoji}</PText>
                  </View>
                  <View style={styles.cardInfo}>
                    <PText style={styles.cardTitle}>{item.title}</PText>
                    <PText style={styles.cardDesc} numberOfLines={2}>
                      {(item as any).description ?? ''}
                    </PText>
                  </View>
                </View>

                {/* Meta row */}
                <View style={styles.metaRow}>
                  <PText style={styles.metaItem}>⏱ {durationLabel}</PText>
                  <PText style={styles.metaSep}>·</PText>
                  <PText style={styles.metaItem}>👥 {ageTarget}</PText>
                  <PText style={styles.metaSep}>·</PText>
                  <PText style={styles.metaItem}>📋 {sessionCount} oturum</PText>
                  {attendeeCount > 0 && (
                    <>
                      <PText style={styles.metaSep}>·</PText>
                      <PText style={styles.metaItem}>👤 {attendeeCount}</PText>
                    </>
                  )}
                </View>

                {/* Chip row */}
                <View style={styles.chipTagRow}>
                  <View style={[styles.typeChip, { backgroundColor: TYPE_BG[wType] ?? '#F3F4F6' }]}>
                    <PText style={[styles.typeChipText, { color: TYPE_FG[wType] ?? '#111' }]}>
                      {TYPE_LABELS[wType] ?? wType}
                    </PText>
                  </View>
                  <View style={[styles.diffChip, { backgroundColor: '#F3F4F6' }]}>
                    <PText style={[styles.typeChipText, { color: DIFFICULTY_COLOR[difficulty] ?? '#555' }]}>
                      {DIFFICULTY_LABELS[difficulty] ?? difficulty}
                    </PText>
                  </View>
                  {hasCamp && (
                    <View style={styles.featureChip}>
                      <PText style={styles.featureChipText}>⛺ Kamp</PText>
                    </View>
                  )}
                  {hasWorkbook && (
                    <View style={styles.featureChip}>
                      <PText style={styles.featureChipText}>📓 Defter</PText>
                    </View>
                  )}
                </View>

                {/* Footer */}
                <View style={styles.cardFooter}>
                  {scheduledDate ? (
                    <PText style={styles.dateText}>📅 {scheduledDate}</PText>
                  ) : (
                    <PText style={styles.dateText}>Kendi hızında</PText>
                  )}
                  <PButton
                    mode="outlined"
                    compact
                    disabled={isOffline}
                    style={styles.detailButton}
                    contentStyle={styles.detailButtonContent}
                    labelStyle={styles.detailButtonLabel}
                    onPress={() =>
                      navigation.navigate('Content', {
                        screen: 'ContentWorkshopDetail',
                        params: { id: item.id }
                      })
                    }
                  >
                    Detayları Gör
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

export const DiscoverWorkshopsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Atölyeler">
        <PActivityIndicator animating />
        <SkeletonBlock height={34} />
        <SkeletonBlock height={34} />
        <SkeletonBlock height={140} />
        <SkeletonBlock height={140} />
        <SkeletonBlock height={140} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Atölyeler">
        <StateMessage
          title="Atölye bulunamadı"
          description="Yeni atölyeler kısa süre içinde eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Atölyeler">
        <StateMessage
          title="Atölyeler yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Atölyeler">
        <OfflineNotice />
        <DiscoverWorkshopsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölyeler" subtitle={`${getWorkshops().length} atölye`}>
      <DiscoverWorkshopsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    chipsRow: { gap: spacing[1], paddingBottom: 4, marginBottom: spacing[1] },
    chip: { borderRadius: radii['2xl'], elevation: 0 },
    chipContent: { height: 34, paddingHorizontal: 4 },
    chipLabel: { fontSize: fontSizes.base, fontWeight: fontWeights.semiBold },
    card: { borderRadius: radii.xl, marginBottom: spacing[2], overflow: 'hidden' },
    cardInner: { borderRadius: radii.xl, overflow: 'hidden' },
    badgeRow: {
      flexDirection: 'row',
      gap: spacing[1],
      paddingHorizontal: spacing[2],
      paddingTop: spacing[1.5],
      paddingBottom: 0
    },
    badgeRecommended: {
      backgroundColor: '#FEF3C7',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm
    },
    badgePopular: {
      backgroundColor: '#FEE2E2',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm
    },
    badgeText: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold, color: '#92400E' },
    cardTop: { flexDirection: 'row', gap: spacing[1.5], padding: spacing[2], paddingTop: spacing[1.5] },
    cardIcon: {
      width: 56,
      height: 56,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    cardEmoji: { fontSize: fontSizes['6xl'] },
    cardInfo: { flex: 1 },
    cardTitle: { fontSize: fontSizes['2xl'], fontWeight: fontWeights.bold, color: c.textPrimary, marginBottom: 4 },
    cardDesc: { fontSize: fontSizes.base, color: c.textSecondary, lineHeight: 19 },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 4,
      paddingHorizontal: spacing[2],
      marginBottom: spacing[1]
    },
    metaItem: { fontSize: fontSizes.sm, color: c.textTertiary },
    metaSep: { fontSize: fontSizes.sm, color: c.outline },
    chipTagRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      paddingHorizontal: spacing[2],
      marginBottom: spacing[1]
    },
    typeChip: { paddingHorizontal: spacing[1], paddingVertical: 3, borderRadius: radii.sm },
    diffChip: { paddingHorizontal: spacing[1], paddingVertical: 3, borderRadius: radii.sm },
    featureChip: {
      paddingHorizontal: spacing[1],
      paddingVertical: 3,
      borderRadius: radii.sm,
      backgroundColor: '#F0FDF4'
    },
    typeChipText: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold },
    featureChipText: { fontSize: fontSizes.sm, color: '#166534' },
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: c.surfaceVariant,
      paddingHorizontal: spacing[2],
      paddingVertical: 10
    },
    dateText: { fontSize: fontSizes.sm, color: c.textTertiary },
    detailButton: { borderRadius: radii.md },
    detailButtonContent: { height: 36, paddingHorizontal: spacing[1.5] },
    detailButtonLabel: { fontSize: fontSizes.md, fontWeight: fontWeights.bold },
    bottomSpacer: { height: 24 }
  });
}
