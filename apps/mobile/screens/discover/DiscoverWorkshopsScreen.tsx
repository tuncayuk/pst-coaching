import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import {
  getDiscoverWorkshopDifficultyColors,
  getDiscoverWorkshopDifficultyLabels,
  getDiscoverWorkshopSortOptions,
  getDiscoverWorkshopTypeBackgroundColors,
  getDiscoverWorkshopTypeForegroundColors,
  getDiscoverWorkshopTypeLabels,
  getDiscoverWorkshopTypeOptions,
  getWorkshopGroups,
  getWorkshops,
  getWorkshopsForGroup
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';

type Workshop = ReturnType<typeof getWorkshops>[number];
type WorkshopGroup = ReturnType<typeof getWorkshopGroups>[number];

const getField = <T,>(w: Workshop, key: string, fallback: T): T => ((w as any)[key] ?? fallback) as T;
const normalizeToken = (value: string) =>
  value
    .toLowerCase()
    .replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[çÇ]/g, 'c')
    .replace(/[ğĞ]/g, 'g')
    .trim();

const getMode = (w: Workshop) => getField(w, 'delivery_mode', getField(w, 'type', 'kamp'));

const getDurationLabel = (w: Workshop) => {
  const preset = getField(w, 'duration_label', '');
  if (preset) {
    return preset;
  }
  const mins = getField(w, 'total_duration_minutes', 0);
  if (mins >= 60) {
    return `${Math.round(mins / 60)} saat`;
  }
  return mins > 0 ? `${mins} dk` : '—';
};

const getDifficulty = (w: Workshop) => {
  const explicit = normalizeToken(getField(w, 'difficulty', ''));
  if (explicit) {
    return explicit;
  }
  const mins = getField(w, 'total_duration_minutes', 0);
  if (mins >= 1200) {
    return 'ileri';
  }
  if (mins >= 300) {
    return 'orta';
  }
  return 'baslangic';
};

const getSessionCount = (w: Workshop) => {
  const explicit = getField(w, 'session_count', 0);
  if (explicit > 0) {
    return explicit;
  }
  const mins = getField(w, 'total_duration_minutes', 0);
  if (mins <= 0) {
    return 0;
  }
  return Math.max(1, Math.round(mins / 90));
};

const getGroupChipCount = (group: WorkshopGroup | null | { catalog_count?: number }, fallbackCount: number) => {
  if (!group) {
    return fallbackCount;
  }
  return Math.max(fallbackCount, Number(group.catalog_count ?? 0));
};

const DiscoverWorkshopsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const groups = getWorkshopGroups();
  const allCatalogCount = groups.reduce((sum, group) => sum + Number(group.catalog_count ?? 0), 0);
  const groupOptions = useMemo(
    () => [
      {
        id: 'all',
        title: 'Tum Gruplar',
        description: 'Tum atolyeler tek listede',
        catalog_count: allCatalogCount,
        featured_workshop_ids: []
      },
      ...groups
    ],
    [groups, allCatalogCount]
  );

  const sortOptionsRaw = getDiscoverWorkshopSortOptions();
  const sortOptions = sortOptionsRaw.length > 0 ? sortOptionsRaw : ['Tumu', 'Onerilen', 'Populer', 'Yeni'];
  const typeOptionsRaw = getDiscoverWorkshopTypeOptions();
  const typeOptions =
    typeOptionsRaw.length > 0
      ? typeOptionsRaw
      : [
          { key: 'tumu', label: 'Tumu' },
          { key: 'kamp', label: 'Kamp' },
          { key: 'rehber', label: 'Rehber' },
          { key: 'calisma_kitabi', label: 'Calisma Kitabi' }
        ];
  const typeLabels = getDiscoverWorkshopTypeLabels();
  const typeBg = getDiscoverWorkshopTypeBackgroundColors();
  const typeFg = getDiscoverWorkshopTypeForegroundColors();
  const difficultyLabels = getDiscoverWorkshopDifficultyLabels();
  const difficultyColors = getDiscoverWorkshopDifficultyColors();

  const [selectedGroupId, setSelectedGroupId] = React.useState<string>(groupOptions[0]?.id ?? 'all');
  const [selectedSort, setSelectedSort] = React.useState<string>(sortOptions[0] ?? 'Tumu');
  const [selectedType, setSelectedType] = React.useState<string>(typeOptions[0]?.key ?? 'tumu');

  const activeGroup = groupOptions.find(group => group.id === selectedGroupId) ?? groupOptions[0] ?? null;
  const workshops = selectedGroupId === 'all' ? getWorkshops() : getWorkshopsForGroup(selectedGroupId);
  const availableTypeOptions = useMemo(() => {
    if (selectedGroupId === 'all') {
      return typeOptions;
    }
    const groupModes = new Set(activeGroup?.delivery_modes ?? []);
    return typeOptions.filter(opt => opt.key === 'tumu' || groupModes.has(opt.key));
  }, [activeGroup, selectedGroupId, typeOptions]);

  useEffect(() => {
    const hasSelectedType = availableTypeOptions.some(option => option.key === selectedType);
    if (!hasSelectedType) {
      setSelectedType(availableTypeOptions[0]?.key ?? 'tumu');
    }
  }, [availableTypeOptions, selectedType]);

  const workshopSignals = useMemo(() => {
    const featuredIds = new Set(activeGroup?.featured_workshop_ids ?? []);
    const sortedByRecency = [...workshops].sort((a, b) => {
      const bDate = new Date(getField(b, 'updated_at', getField(b, 'created_at', '1970-01-01'))).getTime();
      const aDate = new Date(getField(a, 'updated_at', getField(a, 'created_at', '1970-01-01'))).getTime();
      return bDate - aDate;
    });
    const newIdSet = new Set(sortedByRecency.slice(0, Math.max(4, Math.ceil(workshops.length * 0.25))).map(item => item.id));
    const popularityScores = new Map(
      workshops.map((workshop, index) => {
        const attendeeCount = getField(workshop, 'attendee_count', 0);
        const featuredBoost = featuredIds.has(workshop.id) ? 40 : 0;
        const durationBoost = Math.round(getField(workshop, 'total_duration_minutes', 0) / 30);
        const freshnessBoost = workshops.length - index;
        const score = attendeeCount > 0 ? attendeeCount : featuredBoost + durationBoost + freshnessBoost;
        return [workshop.id, score];
      })
    );
    const topPopularThreshold = Math.max(1, Math.ceil(workshops.length * 0.3));
    const popularIds = new Set(
      [...workshops]
        .sort((a, b) => (popularityScores.get(b.id) ?? 0) - (popularityScores.get(a.id) ?? 0))
        .slice(0, topPopularThreshold)
        .map(item => item.id)
    );

    return new Map(
      workshops.map(workshop => {
        const explicitRecommended = getField(workshop, 'is_recommended', false);
        const explicitUpcoming = getField(workshop, 'is_upcoming', false);
        const explicitPopular = getField(workshop, 'is_popular', false);
        const attendeeCount = getField(workshop, 'attendee_count', 0);
        const isRecommended = explicitRecommended || featuredIds.has(workshop.id);
        const isNew = explicitUpcoming || newIdSet.has(workshop.id);
        const isPopular = explicitPopular || attendeeCount > 0 || popularIds.has(workshop.id);
        return [
          workshop.id,
          {
            isRecommended,
            isNew,
            isPopular,
            popularityScore: popularityScores.get(workshop.id) ?? 0,
            attendeeCount: attendeeCount > 0 ? attendeeCount : Math.max(12, Math.round((popularityScores.get(workshop.id) ?? 0) * 1.4))
          }
        ];
      })
    );
  }, [activeGroup, workshops]);

  const filtered = useMemo(() => {
    const sortKey = normalizeToken(selectedSort);
    let list = workshops.filter(workshop => (selectedType === 'tumu' ? true : getMode(workshop) === selectedType));
    if (sortKey === 'onerilen') {
      list = list.filter(workshop => workshopSignals.get(workshop.id)?.isRecommended);
    }
    if (sortKey === 'yeni') {
      list = list.filter(workshop => workshopSignals.get(workshop.id)?.isNew);
    }

    if (sortKey === 'populer') {
      list = [...list].sort(
        (a, b) => (workshopSignals.get(b.id)?.popularityScore ?? 0) - (workshopSignals.get(a.id)?.popularityScore ?? 0)
      );
    } else if (sortKey === 'yeni') {
      list = [...list].sort((a, b) => {
        const bDate = new Date(getField(b, 'updated_at', getField(b, 'created_at', '1970-01-01'))).getTime();
        const aDate = new Date(getField(a, 'updated_at', getField(a, 'created_at', '1970-01-01'))).getTime();
        return bDate - aDate;
      });
    }
    return list;
  }, [selectedSort, selectedType, workshopSignals, workshops]);

  const activeTypeLabel =
    availableTypeOptions.find(option => option.key === selectedType)?.label ?? typeLabels[selectedType] ?? 'Tumu';

  return (
    <View>
      <View style={styles.premiumPanel}>
        <PText style={styles.premiumTitle}>Atolye katalogu</PText>
        <PText style={styles.premiumSubtitle}>
          {filtered.length.toLocaleString('en-US')} sonuc · {activeGroup?.title ?? 'Tum Gruplar'}
        </PText>
        <View style={styles.activeFilterRow}>
          <View style={styles.activeFilterChip}>
            <PText style={styles.activeFilterText}>Siralama: {selectedSort}</PText>
          </View>
          <View style={styles.activeFilterChip}>
            <PText style={styles.activeFilterText}>Tur: {activeTypeLabel}</PText>
          </View>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {groupOptions.map(group => (
          <PButton
            key={group.id}
            mode={selectedGroupId === group.id ? 'contained' : 'outlined'}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedGroupId === group.id ? c.primary : 'transparent'}
            textColor={selectedGroupId === group.id ? c.onPrimary : c.textBrand}
            onPress={() => setSelectedGroupId(group.id)}
          >
            {group.title}
          </PButton>
        ))}
      </ScrollView>

      <View style={styles.groupSummary}>
        <PText style={styles.groupTitle}>{activeGroup?.title ?? 'Tum Gruplar'}</PText>
        <PText style={styles.groupDesc}>{activeGroup?.description ?? 'Tum atolye gruplari'}</PText>
        <PText style={styles.groupCount}>
          {getGroupChipCount(activeGroup, workshops.length).toLocaleString('en-US')} katalog atolyesi
        </PText>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {sortOptions.map(label => (
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {availableTypeOptions.map(opt => (
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
          description="Başka bir grup veya tür filtresi deneyin."
          actionLabel="Tümünü Göster"
          icon="filter-remove-outline"
          onAction={() => {
            setSelectedGroupId(groupOptions[0]?.id ?? 'all');
            setSelectedSort(sortOptions[0] ?? 'Tumu');
            setSelectedType(typeOptions[0]?.key ?? 'tumu');
          }}
        />
      ) : (
        filtered.map(item => {
          const signal = workshopSignals.get(item.id);
          const wType = getMode(item);
          const emoji: string = getField(item, 'emoji', '🎓');
          const color: string = getField(item, 'color', '#F3F4F6');
          const durationLabel = getDurationLabel(item);
          const sessionCount = getSessionCount(item);
          const ageTarget: string = getField(item, 'target_audience', getField(item, 'age_target', '18+'));
          const isRecommended: boolean = signal?.isRecommended ?? getField(item, 'is_recommended', false);
          const isPopular: boolean = signal?.isPopular ?? getField(item, 'is_popular', false);
          const isNew: boolean = signal?.isNew ?? getField(item, 'is_upcoming', false);
          const attendeeCount: number = signal?.attendeeCount ?? getField(item, 'attendee_count', 0);
          const difficulty: string = getDifficulty(item);
          const scheduledDate: string | null = getField(item, 'scheduled_date', null);
          const hasWorkbook: boolean =
            getField(item, 'has_workbook', false) || getField(item, 'participant_workbook_asset_id', null) != null;
          const hasCamp: boolean = getField(item, 'has_camp', false) || wType === 'kamp';

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
                {(isRecommended || isPopular || isNew) && (
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
                    {isNew && (
                      <View style={styles.badgeNew}>
                        <PText style={styles.badgeNewText}>✨ Yeni</PText>
                      </View>
                    )}
                  </View>
                )}

                <View style={styles.cardTop}>
                  <View style={[styles.cardIcon, { backgroundColor: color }]}>
                    <PText style={styles.cardEmoji}>{emoji}</PText>
                  </View>
                  <View style={styles.cardInfo}>
                    <PText style={styles.cardTitle}>{item.title}</PText>
                    <PText style={styles.cardDesc} numberOfLines={2}>
                      {getField(item, 'description', getField(item, 'theme', ''))}
                    </PText>
                  </View>
                </View>

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

                <View style={styles.chipTagRow}>
                  <View style={[styles.typeChip, { backgroundColor: typeBg[wType] ?? '#F3F4F6' }]}>
                    <PText style={[styles.typeChipText, { color: typeFg[wType] ?? '#111' }]}>
                      {typeLabels[wType] ?? wType}
                    </PText>
                  </View>
                  <View style={[styles.diffChip, { backgroundColor: '#F3F4F6' }]}>
                    <PText style={[styles.typeChipText, { color: difficultyColors[difficulty] ?? '#555' }]}>
                      {difficultyLabels[difficulty] ?? difficulty}
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
      <ScreenLayout title="Atölyeler" subtitle="Canlı ve kayıtlı atölyeler">
        <OfflineNotice />
        <DiscoverWorkshopsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölyeler" subtitle="Canlı ve kayıtlı atölyeler">
      <DiscoverWorkshopsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    chipsRow: { gap: spacing[1], paddingBottom: 4, marginBottom: spacing[1] },
    premiumPanel: {
      backgroundColor: c.secondaryContainer,
      borderRadius: radii.xl,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    premiumTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: c.textPrimary },
    premiumSubtitle: { fontSize: fontSizes.sm, color: c.textSecondary, marginTop: 2 },
    activeFilterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing[1] },
    activeFilterChip: {
      backgroundColor: c.surface,
      borderRadius: radii.sm,
      paddingHorizontal: spacing[1],
      paddingVertical: 4
    },
    activeFilterText: { fontSize: fontSizes.sm, color: c.textSecondary, fontWeight: fontWeights.semiBold },
    chip: { borderRadius: radii['2xl'], elevation: 0 },
    chipContent: { height: 34, paddingHorizontal: 4 },
    chipLabel: { fontSize: fontSizes.base, fontWeight: fontWeights.semiBold },
    groupSummary: {
      backgroundColor: c.surfaceVariant,
      borderRadius: radii.lg,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    groupTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: c.textPrimary },
    groupDesc: { fontSize: fontSizes.sm, color: c.textSecondary, marginTop: 2 },
    groupCount: { fontSize: fontSizes.sm, color: c.textBrand, marginTop: spacing[0.5], fontWeight: fontWeights.semiBold },
    card: { borderRadius: radii.xl, marginBottom: spacing[2] },
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
    badgeNew: {
      backgroundColor: '#E0F2FE',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm
    },
    badgeText: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold, color: '#92400E' },
    badgeNewText: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold, color: '#075985' },
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
