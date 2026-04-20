import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PText } from '../../components';
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
import { ColorTokens, fontSizes, fontWeights, radii, shadows, spacing, themeShadow, useAppTheme } from '../../theme';

type Workshop = ReturnType<typeof getWorkshops>[number];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
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
  if (preset) return preset;
  const mins = getField(w, 'total_duration_minutes', 0);
  if (mins >= 60) return `${Math.round(mins / 60)} saat`;
  return mins > 0 ? `${mins} dk` : '';
};

const getDifficulty = (w: Workshop) => {
  const explicit = normalizeToken(getField(w, 'difficulty', ''));
  if (explicit) return explicit;
  const mins = getField(w, 'total_duration_minutes', 0);
  if (mins >= 1200) return 'ileri';
  if (mins >= 300) return 'orta';
  return 'baslangic';
};

const getSessionCount = (w: Workshop) => {
  const explicit = getField(w, 'session_count', 0);
  if (explicit > 0) return explicit;
  const mins = getField(w, 'total_duration_minutes', 0);
  if (mins <= 0) return 0;
  return Math.max(1, Math.round(mins / 90));
};

// ---------------------------------------------------------------------------
// WorkshopCard
// ---------------------------------------------------------------------------
type CardSignal = {
  isRecommended: boolean;
  isNew: boolean;
  isPopular: boolean;
  popularityScore: number;
  attendeeCount: number;
};

type WorkshopCardProps = {
  item: Workshop;
  signal: CardSignal | undefined;
  typeBg: Record<string, string>;
  typeFg: Record<string, string>;
  typeLabels: Record<string, string>;
  difficultyColors: Record<string, string>;
  difficultyLabels: Record<string, string>;
  isOffline: boolean;
  isDark: boolean;
  styles: ReturnType<typeof makeStyles>;
  colors: ColorTokens;
  onPress: () => void;
};

function WorkshopCardInner({
  item,
  signal,
  typeBg,
  typeFg,
  typeLabels,
  difficultyColors,
  difficultyLabels,
  isOffline,
  isDark,
  styles,
  colors: c,
  onPress
}: WorkshopCardProps) {
  const wType = getMode(item);
  const emoji: string = getField(item, 'emoji', '🎓');
  const color: string = getField(item, 'color', c.surfaceVariant);
  const durationLabel = getDurationLabel(item);
  const sessionCount = getSessionCount(item);
  const isRecommended = signal?.isRecommended ?? getField(item, 'is_recommended', false);
  const isNew = signal?.isNew ?? getField(item, 'is_upcoming', false);
  const isPopular = signal?.isPopular ?? getField(item, 'is_popular', false);
  const difficulty = getDifficulty(item);
  const scheduledDate: string | null = getField(item, 'scheduled_date', null);
  const desc: string = getField(item, 'description', getField(item, 'theme', ''));

  // One badge only — highest priority wins
  const badge = isRecommended
    ? { label: '★ Önerilen', bg: c.warningContainer, fg: c.onWarningContainer }
    : isNew
      ? { label: '✨ Yeni', bg: c.primaryContainer, fg: c.onPrimaryContainer }
      : isPopular
        ? { label: '🔥 Popüler', bg: c.errorContainer, fg: c.onErrorContainer }
        : null;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isOffline}
      onPress={onPress}
      style={[styles.card, themeShadow(shadows.sm, isDark)]}
      accessibilityLabel={item.title}
      accessibilityHint="Atölye detaylarını açmak için dokun"
      accessibilityRole="button"
    >
      <View style={styles.cardHeader}>
        <View style={[styles.cardIcon, { backgroundColor: color }]}>
          <PText style={styles.cardEmoji}>{emoji}</PText>
        </View>
        <View style={styles.cardHeaderText}>
          <PText style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </PText>
          {!!desc && (
            <PText style={styles.cardDesc} numberOfLines={2}>
              {desc}
            </PText>
          )}
        </View>
        {badge && (
          <View style={[styles.badge, { backgroundColor: badge.bg }]}>
            <PText style={[styles.badgeText, { color: badge.fg }]}>{badge.label}</PText>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.tag, { backgroundColor: typeBg[wType] ?? c.surfaceVariant }]}>
          <PText style={[styles.tagText, { color: typeFg[wType] ?? c.textPrimary }]}>{typeLabels[wType] ?? wType}</PText>
        </View>
        <View style={[styles.tag, { backgroundColor: c.surfaceVariant }]}>
          <PText style={[styles.tagText, { color: difficultyColors[difficulty] ?? c.textSecondary }]}>
            {difficultyLabels[difficulty] ?? difficulty}
          </PText>
        </View>
        {!!durationLabel && <PText style={styles.footerMeta}>⏱ {durationLabel}</PText>}
        {sessionCount > 0 && <PText style={styles.footerMeta}>{sessionCount} oturum</PText>}
        <View style={styles.footerSpacer} />
        {scheduledDate ? (
          <PText style={styles.footerDate}>📅 {scheduledDate}</PText>
        ) : (
          <PText style={[styles.footerDate, { color: c.textAccent }]}>Kendi hızında</PText>
        )}
      </View>
    </TouchableOpacity>
  );
}

const WorkshopCard = React.memo(WorkshopCardInner);

// ---------------------------------------------------------------------------
// Workshop list content
// ---------------------------------------------------------------------------
type ContentProps = {
  groupId: string | null;
  isOffline?: boolean;
};

const DiscoverWorkshopGroupContent = ({ groupId, isOffline }: ContentProps) => {
  const { colors: c, isDark } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  const sortOptionsRaw = getDiscoverWorkshopSortOptions();
  const sortOptions = useMemo(
    () => (sortOptionsRaw.length > 0 ? sortOptionsRaw : ['Tümü', 'Önerilen', 'Popüler', 'Yeni']),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const typeOptionsRaw = getDiscoverWorkshopTypeOptions();
  const typeOptions = useMemo(
    () =>
      typeOptionsRaw.length > 0
        ? typeOptionsRaw
        : [
            { key: 'tumu', label: 'Tümü' },
            { key: 'kamp', label: 'Kamp' },
            { key: 'rehber', label: 'Rehber' },
            { key: 'calisma_kitabi', label: 'Çalışma Kitabı' }
          ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const typeLabels = useMemo(() => getDiscoverWorkshopTypeLabels(), []);
  const typeBg = useMemo(() => getDiscoverWorkshopTypeBackgroundColors(), []);
  const typeFg = useMemo(() => getDiscoverWorkshopTypeForegroundColors(), []);
  const difficultyLabels = useMemo(() => getDiscoverWorkshopDifficultyLabels(), []);
  const difficultyColors = useMemo(() => getDiscoverWorkshopDifficultyColors(), []);

  const [selectedSort, setSelectedSort] = React.useState<string>(sortOptions[0] ?? 'Tümü');
  const [selectedType, setSelectedType] = React.useState<string>(typeOptions[0]?.key ?? 'tumu');

  const activeGroup = groupId ? getWorkshopGroups().find(g => g.id === groupId) ?? null : null;
  const workshops = groupId ? getWorkshopsForGroup(groupId) : getWorkshops();

  const availableTypeOptions = useMemo(() => {
    if (!groupId) return typeOptions;
    const modes = new Set(activeGroup?.delivery_modes ?? []);
    return typeOptions.filter(opt => opt.key === 'tumu' || modes.has(opt.key));
  }, [activeGroup, groupId, typeOptions]);

  const showTypeFilter = availableTypeOptions.length > 2;

  useEffect(() => {
    const valid = availableTypeOptions.some(o => o.key === selectedType);
    if (!valid) setSelectedType(availableTypeOptions[0]?.key ?? 'tumu');
  }, [availableTypeOptions, selectedType]);

  const workshopSignals = useMemo(() => {
    const featuredIds = new Set(activeGroup?.featured_workshop_ids ?? []);
    const sortedByRecency = [...workshops].sort((a, b) => {
      const bDate = new Date(getField(b, 'updated_at', getField(b, 'created_at', '1970-01-01'))).getTime();
      const aDate = new Date(getField(a, 'updated_at', getField(a, 'created_at', '1970-01-01'))).getTime();
      return bDate - aDate;
    });
    const newIdSet = new Set(
      sortedByRecency.slice(0, Math.max(4, Math.ceil(workshops.length * 0.25))).map(w => w.id)
    );
    const popularityScores = new Map(
      workshops.map((w, index) => {
        const cnt = getField(w, 'attendee_count', 0);
        const featuredBoost = featuredIds.has(w.id) ? 40 : 0;
        const durationBoost = Math.round(getField(w, 'total_duration_minutes', 0) / 30);
        const score = cnt > 0 ? cnt : featuredBoost + durationBoost + (workshops.length - index);
        return [w.id, score];
      })
    );
    const threshold = Math.max(1, Math.ceil(workshops.length * 0.3));
    const popularIds = new Set(
      [...workshops]
        .sort((a, b) => (popularityScores.get(b.id) ?? 0) - (popularityScores.get(a.id) ?? 0))
        .slice(0, threshold)
        .map(w => w.id)
    );
    return new Map(
      workshops.map(w => {
        const cnt = getField(w, 'attendee_count', 0);
        const score = popularityScores.get(w.id) ?? 0;
        return [
          w.id,
          {
            isRecommended: getField(w, 'is_recommended', false) || featuredIds.has(w.id),
            isNew: getField(w, 'is_upcoming', false) || newIdSet.has(w.id),
            isPopular: getField(w, 'is_popular', false) || cnt > 0 || popularIds.has(w.id),
            popularityScore: score,
            attendeeCount: cnt > 0 ? cnt : Math.max(12, Math.round(score * 1.4))
          }
        ];
      })
    );
  }, [activeGroup, workshops]);

  const filtered = useMemo(() => {
    const sortKey = normalizeToken(selectedSort);
    let list = workshops.filter(w => selectedType === 'tumu' || getMode(w) === selectedType);
    if (sortKey === 'onerilen') list = list.filter(w => workshopSignals.get(w.id)?.isRecommended);
    if (sortKey === 'yeni') list = list.filter(w => workshopSignals.get(w.id)?.isNew);
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

  const chipProps = (active: boolean, isSecondary = false) => ({
    mode: (active ? 'contained' : 'outlined') as 'contained' | 'outlined',
    buttonColor: active ? (isSecondary ? c.secondary : c.primary) : 'transparent',
    textColor: active ? (isSecondary ? c.onSecondary : c.onPrimary) : c.textBrand
  });

  return (
    <View>
      {/* Sort filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
        {sortOptions.map(label => (
          <PButton
            key={label}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            onPress={() => setSelectedSort(label)}
            {...chipProps(selectedSort === label, true)}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      {/* Type filter — only when multiple delivery types exist */}
      {showTypeFilter && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {availableTypeOptions.map(opt => (
            <PButton
              key={opt.key}
              compact
              disabled={isOffline}
              style={styles.chip}
              contentStyle={styles.chipContent}
              labelStyle={styles.chipLabel}
              onPress={() => setSelectedType(opt.key)}
              {...chipProps(selectedType === opt.key)}
            >
              {opt.label}
            </PButton>
          ))}
        </ScrollView>
      )}

      {/* Result count */}
      <PText style={styles.resultCount}>{filtered.length} atölye</PText>

      {/* Workshop list */}
      {filtered.length === 0 ? (
        <StateMessage
          title="Sonuç bulunamadı"
          description="Başka bir filtre deneyin."
          actionLabel="Filtreleri Sıfırla"
          icon="filter-remove-outline"
          onAction={() => {
            setSelectedSort(sortOptions[0] ?? 'Tümü');
            setSelectedType(typeOptions[0]?.key ?? 'tumu');
          }}
        />
      ) : (
        filtered.map(item => (
          <WorkshopCard
            key={item.id}
            item={item}
            signal={workshopSignals.get(item.id)}
            typeBg={typeBg}
            typeFg={typeFg}
            typeLabels={typeLabels}
            difficultyColors={difficultyColors}
            difficultyLabels={difficultyLabels}
            isOffline={isOffline ?? false}
            isDark={isDark}
            styles={styles}
            colors={c}
            onPress={() =>
              navigation.navigate('Content', { screen: 'ContentWorkshopDetail', params: { id: item.id } })
            }
          />
        ))
      )}

      <View style={styles.bottomSpacer} />
    </View>
  );
};

// ---------------------------------------------------------------------------
// Screen shell
// ---------------------------------------------------------------------------
type RouteParams = {
  groupId: string | null;
  groupTitle: string;
  state?: ScreenState;
};

export const DiscoverWorkshopGroupScreen = () => {
  const route = useRoute<any>();
  const { groupId = null, groupTitle = 'Atölyeler', state } = (route.params ?? {}) as RouteParams;
  const resolvedState = resolveScreenState({ params: { state } });

  if (resolvedState === 'loading') {
    return (
      <ScreenLayout title={groupTitle}>
        <PActivityIndicator animating />
        <SkeletonBlock height={36} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (resolvedState === 'error') {
    return (
      <ScreenLayout title={groupTitle}>
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

  if (resolvedState === 'offline') {
    return (
      <ScreenLayout title={groupTitle}>
        <OfflineNotice />
        <DiscoverWorkshopGroupContent groupId={groupId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={groupTitle}>
      <DiscoverWorkshopGroupContent groupId={groupId} />
    </ScreenLayout>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    // Chips
    chipsRow: { gap: spacing[1], paddingBottom: spacing[1], paddingHorizontal: 2 },
    chip: { borderRadius: radii.full, elevation: 0 },
    chipContent: { height: 34, paddingHorizontal: 4 },
    chipLabel: { fontSize: fontSizes.md, fontWeight: fontWeights.semiBold },

    // Result count
    resultCount: {
      fontSize: fontSizes.sm,
      color: c.textTertiary,
      fontWeight: fontWeights.semiBold,
      marginBottom: spacing[1.5],
      paddingHorizontal: 2
    },

    // Workshop card
    card: {
      backgroundColor: c.surface,
      borderRadius: radii.xl,
      marginBottom: spacing[1.5],
      overflow: 'hidden'
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing[1.5],
      padding: spacing[2]
    },
    cardIcon: {
      width: 48,
      height: 48,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    },
    cardEmoji: { fontSize: fontSizes['5xl'] },
    cardHeaderText: { flex: 1 },
    cardTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      letterSpacing: -0.2,
      marginBottom: 3
    },
    cardDesc: { fontSize: fontSizes.base, color: c.textSecondary, lineHeight: 18 },
    badge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: radii.sm, alignSelf: 'flex-start', flexShrink: 0 },
    badgeText: { fontSize: fontSizes.xs, fontWeight: fontWeights.bold },

    // Card footer
    cardFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      paddingHorizontal: spacing[2],
      paddingBottom: spacing[1.5],
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: c.outlineVariant
    },
    tag: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: radii.sm },
    tagText: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold },
    footerMeta: { fontSize: fontSizes.sm, color: c.textTertiary },
    footerSpacer: { flex: 1 },
    footerDate: { fontSize: fontSizes.sm, color: c.textTertiary },

    bottomSpacer: { height: spacing[4] }
  });
}
