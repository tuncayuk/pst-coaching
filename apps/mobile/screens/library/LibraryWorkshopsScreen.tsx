import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { FilterChipBar, PActivityIndicator, PButton, PText } from '../../components';
import { getContentProgressForUser, getPrimaryUser, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type Workshop = ReturnType<typeof getWorkshops>[number];

const MODE_LABELS: Record<string, string> = {
  kamp: 'Kamp',
  rehber: 'Rehber',
  calisma_kitabi: 'Calisma Kitabi'
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
const TYPE_LABELS: Record<string, string> = {
  kamp: 'Kamp',
  rehber: 'Rehber',
  calisma_kitabi: 'Calisma Kitabi'
};

const getField = <T,>(w: Workshop, key: string, fallback: T): T =>
  ((w as any)[key] ?? fallback) as T;

const WorkshopListCard = ({
  workshop,
  isUpcoming,
  isOffline,
  onPress
}: {
  workshop: Workshop;
  isUpcoming: boolean;
  isOffline: boolean;
  onPress: () => void;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const emoji: string = getField(workshop, 'emoji', '🎓');
  const color: string = getField(workshop, 'color', '#F3F4F6');
  const wType: string = getField(workshop, 'delivery_mode', 'kamp');
  const durationMins: number = getField(workshop, 'total_duration_minutes', 0);
  const durationLabel: string = durationMins >= 60 ? `${Math.round(durationMins / 60)} saat` : `${durationMins} dk`;
  const ageTarget: string = getField(workshop, 'target_audience', '18+');
  const scheduledDate: string | null = getField(workshop, 'scheduled_date', null);
  const attendeeCount: number = getField(workshop, 'attendee_count', 0);
  const facilitator: string = getField(workshop, 'facilitator', 'PST Coaching');

  return (
    <View style={styles.workshopCard}>
      <View style={styles.cardLeft}>
        <View style={[styles.emojiBox, { backgroundColor: color }]}>
          <PText style={styles.emojiText}>{emoji}</PText>
        </View>
      </View>
      <View style={styles.cardBody}>
        <PText style={styles.workshopTitle} numberOfLines={2}>
          {workshop.title}
        </PText>
        <PText style={styles.workshopDesc} numberOfLines={2}>
          {(workshop as any).description ?? ''}
        </PText>
        <View style={styles.metaRow}>
          <View style={[styles.typeChip, { backgroundColor: TYPE_BG[wType] ?? '#F3F4F6' }]}>
            <PText style={[styles.typeChipText, { color: TYPE_FG[wType] ?? '#111' }]}>
              {TYPE_LABELS[wType] ?? wType}
            </PText>
          </View>
          <PText style={styles.metaText}>⏱ {durationLabel}</PText>
          <PText style={styles.metaText}>👥 {ageTarget}</PText>
          {attendeeCount > 0 && <PText style={styles.metaText}>👤 {attendeeCount}</PText>}
        </View>
        <View style={styles.facilitatorRow}>
          <PText style={styles.facilitatorText}>{facilitator}</PText>
          {scheduledDate ? (
            <View style={[styles.dateBadge, isUpcoming && styles.dateBadgeUpcoming]}>
              <PText style={styles.dateText}>📅 {scheduledDate}</PText>
            </View>
          ) : (
            <View style={styles.dateBadge}>
              <PText style={styles.dateText}>Kendi hızında</PText>
            </View>
          )}
        </View>
        <PButton
          mode={isUpcoming ? 'contained' : 'outlined'}
          compact
          disabled={isOffline}
          style={styles.actionBtn}
          onPress={onPress}
        >
          {isUpcoming ? 'Kaydol' : 'İncele'}
        </PButton>
      </View>
    </View>
  );
};

const LibraryWorkshopsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const allWorkshops = getWorkshops();
  const modes = useMemo(
    () => Array.from(new Set(allWorkshops.map(w => (w as any).delivery_mode).filter(Boolean))),
    [allWorkshops]
  );
  const categories = useMemo(() => modes.map(mode => MODE_LABELS[mode] ?? mode), [modes]);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] ?? '');
  const progressRows = getContentProgressForUser(user?.id).filter(row => row.target_type === 'workshop');
  const progressMap = new Map(progressRows.map(row => [row.content_item_id, row]));

  const activeModeKey = modes[categories.indexOf(activeCategory)] ?? modes[0];
  const filtered = activeModeKey
    ? allWorkshops.filter(w => getField(w, 'delivery_mode', '') === activeModeKey)
    : allWorkshops;
  const upcomingCount = filtered.filter(w => progressMap.get(w.id)?.status === 'available').length;

  return (
    <>
      <SectionCard title="Kategoriler">
        <FilterChipBar
          options={categories}
          activeOption={activeCategory}
          onOptionPress={setActiveCategory}
          disabled={isOffline}
        />
        <PText style={styles.categoryDesc}>
          {activeModeKey === 'kamp' && 'Uzun soluklu kamp formatli atolyeler.'}
          {activeModeKey === 'rehber' && 'Rehber odakli atolyeler.'}
          {activeModeKey === 'calisma_kitabi' && 'Calisma kitabi destekli atolyeler.'}
        </PText>
      </SectionCard>

      <SectionCard
        title={`${activeCategory} Atölyeler`}
        actionLabel={upcomingCount > 0 ? `${upcomingCount} Yaklaşan` : undefined}
      >
        {filtered.length === 0 ? (
          <StateMessage
            title="Bu kategoride atölye yok"
            description="Diğer kategorilere göz atabilirsiniz."
            actionLabel="Tümünü Gör"
            icon="calendar-blank"
            onAction={() => setActiveCategory(categories[0] ?? '')}
          />
        ) : (
          filtered.map(workshop => (
            <WorkshopListCard
              key={workshop.id}
              workshop={workshop}
              isUpcoming={progressMap.get(workshop.id)?.status === 'available'}
              isOffline={!!isOffline}
              onPress={() =>
                navigation.navigate('Content', {
                  screen: 'ContentWorkshopDetail',
                  params: { id: workshop.id }
                })
              }
            />
          ))
        )}
      </SectionCard>
    </>
  );
};

export const LibraryWorkshopsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);
  const total = getWorkshops().length;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Atölyeler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={36} />
        </SectionCard>
        <SectionCard title="Atölyeler">
          {[1, 2, 3].map(i => (
            <SkeletonBlock key={i} height={100} />
          ))}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Yeni etkinlikler eklenecek">
        <StateMessage
          title="Atölye bulunamadı"
          description="Şu anda gösterilecek atölye yok. Bildirimleri açarak haberdar ol."
          actionLabel="Bildirimleri Aç"
          icon="calendar-blank"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Bir sorun oluştu">
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
      <ScreenLayout title="Atölyeler" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryWorkshopsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölyeler" subtitle={`${total} atölye · Etkinlikleri takip et`}>
      <LibraryWorkshopsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    categoryDesc: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      marginTop: 6,
      lineHeight: 18
    },
    workshopCard: {
      flexDirection: 'row',
      gap: spacing[1.5],
      paddingVertical: spacing[1.5],
      borderBottomWidth: 1,
      borderBottomColor: c.surfaceVariant
    },
    cardLeft: { flexShrink: 0 },
    emojiBox: {
      width: 52,
      height: 52,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center'
    },
    emojiText: { fontSize: fontSizes['5xl'] },
    cardBody: { flex: 1 },
    workshopTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 3
    },
    workshopDesc: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      lineHeight: 18,
      marginBottom: spacing[1]
    },
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      alignItems: 'center',
      marginBottom: 6
    },
    typeChip: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: radii.sm },
    typeChipText: { fontSize: fontSizes.xs, fontWeight: fontWeights.bold },
    metaText: { fontSize: fontSizes.xs, color: c.textTertiary },
    facilitatorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    },
    facilitatorText: { fontSize: fontSizes.xs, color: c.textTertiary, flex: 1 },
    dateBadge: {
      backgroundColor: c.surfaceVariant,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.sm
    },
    dateBadgeUpcoming: { backgroundColor: '#D1FAE5' },
    dateText: { fontSize: fontSizes.xs, color: c.textSecondary },
    actionBtn: { alignSelf: 'flex-start' }
  });
}
