import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import {
  getContentProgressForUser,
  getPrimaryUser,
  getWorkshopGroups,
  getWorkshops,
  getWorkshopsForGroup
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';

type Workshop = ReturnType<typeof getWorkshops>[number];
type WorkshopGroup = ReturnType<typeof getWorkshopGroups>[number];

const getField = <T,>(w: Workshop, key: string, fallback: T): T => ((w as any)[key] ?? fallback) as T;

const getDurationLabel = (workshop: Workshop) => {
  const minutes = getField(workshop, 'total_duration_minutes', 0);
  return minutes >= 60 ? `${Math.round(minutes / 60)} saat` : `${minutes} dk`;
};

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
  const durationLabel = getDurationLabel(workshop);
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
          {getField(workshop, 'description', getField(workshop, 'theme', ''))}
        </PText>
        <View style={styles.metaRow}>
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
  const groups = getWorkshopGroups();
  const allCatalogCount = groups.reduce((sum, group) => sum + Number(group.catalog_count ?? 0), 0);
  const groupOptions = useMemo(
    () => [
      {
        id: 'all',
        title: 'Tum Gruplar',
        description: 'Tum atolyeler tek listede',
        catalog_count: allCatalogCount
      },
      ...groups
    ],
    [groups, allCatalogCount]
  );

  const [activeGroupId, setActiveGroupId] = useState<string>(groupOptions[0]?.id ?? 'all');
  const activeGroup: WorkshopGroup | (typeof groupOptions)[number] | null =
    groupOptions.find(group => group.id === activeGroupId) ?? groupOptions[0] ?? null;

  const groupWorkshops = activeGroupId === 'all' ? getWorkshops() : getWorkshopsForGroup(activeGroupId);
  const activeCategory = 'Tumu';

  const progressRows = getContentProgressForUser(user?.id).filter(row => row.target_type === 'workshop');
  const progressMap = new Map(progressRows.map(row => [row.content_item_id, row]));

  const filtered = groupWorkshops;
  const upcomingCount = filtered.filter(w => progressMap.get(w.id)?.status === 'available').length;

  return (
    <>
      <SectionCard title="Atölye Grupları">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.groupChipRow}>
          {groupOptions.map(group => (
            <PButton
              key={group.id}
              mode={activeGroupId === group.id ? 'contained' : 'outlined'}
              compact
              disabled={isOffline}
              style={styles.groupChip}
              contentStyle={styles.groupChipContent}
              onPress={() => setActiveGroupId(group.id)}
            >
              {group.title}
            </PButton>
          ))}
        </ScrollView>
        <PText style={styles.categoryDesc}>{activeGroup?.description}</PText>
        <PText style={styles.catalogCountText}>
          {Math.max(filtered.length, Number(activeGroup?.catalog_count ?? 0)).toLocaleString('en-US')} katalog atolyesi
        </PText>
      </SectionCard>

      <SectionCard title={`${activeCategory} Atölyeler`} actionLabel={upcomingCount > 0 ? `${upcomingCount} Yaklaşan` : undefined}>
        {filtered.length === 0 ? (
          <StateMessage
            title="Bu kategoride atölye yok"
            description="Diğer kategorilere göz atabilirsiniz."
            actionLabel="Tümünü Gör"
            icon="calendar-blank"
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
    groupChipRow: { gap: spacing[1], paddingBottom: spacing[0.5] },
    groupChip: { borderRadius: radii['2xl'] },
    groupChipContent: { height: 34 },
    categoryDesc: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      marginTop: 6,
      lineHeight: 18
    },
    catalogCountText: {
      marginTop: spacing[0.5],
      fontSize: fontSizes.sm,
      color: c.textBrand,
      fontWeight: fontWeights.semiBold
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
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    metaText: {
      fontSize: fontSizes.sm,
      color: c.textTertiary
    },
    facilitatorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing[1]
    },
    facilitatorText: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      flex: 1,
      marginRight: spacing[1]
    },
    dateBadge: {
      backgroundColor: c.surfaceVariant,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: radii.sm
    },
    dateBadgeUpcoming: {
      backgroundColor: '#D1FAE5'
    },
    dateText: {
      fontSize: fontSizes.xs,
      color: c.textSecondary
    },
    actionBtn: {
      alignSelf: 'flex-start',
      borderRadius: radii.md
    }
  });
}
