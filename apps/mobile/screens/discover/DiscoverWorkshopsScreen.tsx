import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
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

  const sortOptions = getDiscoverWorkshopSortOptions();
  const typeOptions = getDiscoverWorkshopTypeOptions();
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

  const filtered = useMemo(() => {
    const featuredIds = new Set(activeGroup?.featured_workshop_ids ?? []);
    let list = workshops.filter(workshop => (selectedType === 'tumu' ? true : getMode(workshop) === selectedType));
    if (selectedSort === 'Onerilen') {
      list = list.filter(workshop => getField(workshop, 'is_recommended', false) || featuredIds.has(workshop.id));
    }
    if (selectedSort === 'Populer') {
      list = [...list].sort((a, b) => getField(b, 'attendee_count', 0) - getField(a, 'attendee_count', 0));
    }
    if (selectedSort === 'Yeni') {
      list = [...list].filter(workshop => getField(workshop, 'is_upcoming', false));
    }
    return list;
  }, [activeGroup, workshops, selectedSort, selectedType]);

  return (
    <View>
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
        {typeOptions.map(opt => (
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
          const wType = getMode(item);
          const emoji: string = getField(item, 'emoji', '🎓');
          const color: string = getField(item, 'color', '#F3F4F6');
          const durationLabel = getDurationLabel(item);
          const sessionCount = getSessionCount(item);
          const ageTarget: string = getField(item, 'target_audience', getField(item, 'age_target', '18+'));
          const isRecommended: boolean = getField(item, 'is_recommended', false);
          const isPopular: boolean = getField(item, 'is_popular', false);
          const attendeeCount: number = getField(item, 'attendee_count', 0);
          const difficulty: string = getField(item, 'difficulty', 'orta');
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
