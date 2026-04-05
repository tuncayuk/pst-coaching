import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PProgressBar, PText } from '../../components';
import { getEbooks, getJourneys, getWorkshops } from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

/** AC-FR-E2-06-01: Type chip colors */
const TYPE_CHIP_STYLES: Record<string, { bg: string; text: string }> = {
  Yolculuk: { bg: '#E0F7FA', text: '#0096B8' },
  Atolye: { bg: '#EDE9FE', text: '#7C3AED' },
  'e-Kitap': { bg: '#FEF3C7', text: '#92400E' }
};

const HomeActiveContentListContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const ebooks = getEbooks();

  /** AC-FR-E2-06-01: max 3 active content cards, each with type label + progress % */
  const activeItems = [
    {
      id: journeys[0]?.id,
      title: journeys[0]?.title ?? 'Yolculuk',
      subtitle: 'Gun 1 -- 12 dk kaldi',
      type: 'Yolculuk',
      progress: 0.42,
      locked: false,
      target: 'ContentJourneyHome'
    },
    {
      id: ebooks[0]?.id,
      title: ebooks[0]?.title ?? 'e-Kitap',
      subtitle: 'Bolum 1 -- 8 dk kaldi',
      type: 'e-Kitap',
      progress: 0.18,
      locked: true, // AC-FR-E2-06-03: explicitly locked by business rules
      target: 'ContentEbookReader'
    },
    {
      id: workshops[0]?.id,
      title: workshops[0]?.title ?? 'Atolye',
      subtitle: 'Bolum 2 -- 14 dk kaldi',
      type: 'Atolye',
      progress: 0.6,
      locked: false,
      target: 'ContentWorkshopHome'
    }
  ];

  return (
    <>
      {/* AC-FR-E2-06-01/02/03: Active content list */}
      <SectionCard title="Aktif Iceriklerim" actionLabel="Kutuphaneme Git">
        {activeItems.map(item => {
          const chipStyle = TYPE_CHIP_STYLES[item.type] ?? { bg: '#F5F5F5', text: '#404040' };
          return (
            <PCard key={item.title} style={styles.card}>
              <PCard.Content>
                {/* AC-FR-E2-06-01: type label */}
                <View style={styles.cardHeader}>
                  <View style={[styles.typeChip, { backgroundColor: chipStyle.bg }]}>
                    <PText style={[styles.typeChipText, { color: chipStyle.text }]}>{item.type}</PText>
                  </View>
                  {/* AC-FR-E2-06-03: locked content visual label */}
                  {item.locked && (
                    <PChip compact style={styles.lockedChip} accessibilityLabel="Bu icerik kilitli">
                      Kilitli
                    </PChip>
                  )}
                </View>
                <PText style={styles.cardTitle}>{item.title}</PText>
                <PText style={styles.cardSubtitle}>{item.subtitle}</PText>
                <View style={styles.progressRow}>
                  <PProgressBar
                    progress={item.progress}
                    style={styles.progress}
                    accessibilityLabel={`Ilerleme: %${Math.round(item.progress * 100)}`}
                  />
                  <PText style={styles.progressPct}>{Math.round(item.progress * 100)}%</PText>
                </View>
              </PCard.Content>
              <PCard.Actions>
                <PButton
                  mode="contained"
                  disabled={isOffline || item.locked}
                  onPress={() =>
                    navigation.navigate('Content', {
                      screen: item.target,
                      params: { id: item.id }
                    })
                  }
                  accessibilityLabel={item.locked ? `${item.title} kilitli` : `${item.title} devam et`}
                  accessibilityHint={item.locked ? 'Bu icerige erisim icin abonelik gerekir' : undefined}
                >
                  {item.locked ? 'Kilidi Ac' : 'Devam Et'}
                </PButton>
              </PCard.Actions>
            </PCard>
          );
        })}

        {/* AC-FR-E2-06-02: "Tumunu Gor" navigates to Library */}
        <PButton
          mode="text"
          style={styles.seeAllButton}
          onPress={() => navigation.navigate('Library')}
          accessibilityLabel="Tum aktif iceriklerimi kutuphanede gor"
        >
          Tumunu Gor
        </PButton>
      </SectionCard>

      <SectionCard title="Planlama" actionLabel="Hatirlatici">
        <PText variant="bodySmall" style={styles.planningText}>
          Haftalik hedefini belirle ve iceriklerini duzenli takip et.
        </PText>
        <PButton
          mode="outlined"
          style={styles.secondaryButton}
          disabled={isOffline}
          accessibilityLabel="Haftalik hedef belirle"
          onPress={() => navigation.navigate('HomeReminderSetting')}
        >
          Hedef Belirle
        </PButton>
      </SectionCard>
    </>
  );
};

export const HomeActiveContentListScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Aktif Icerikler" subtitle="Icerikler hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Icerikler">
          <SkeletonBlock height={96} />
          <SkeletonBlock height={96} />
          <SkeletonBlock height={96} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Aktif Icerikler" subtitle="Henuz aktif icerik yok">
        <StateMessage
          title="Aktif icerik yok"
          description="Kesfe cikarak yeni bir yolculuk secebilirsin."
          actionLabel="Kesfe Git"
          icon="compass-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Aktif Icerikler" subtitle="Bir sorun olustu">
        <StateMessage
          title="Aktif icerikler yuklenemedi"
          description="Baglantiyi kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Aktif Icerikler" subtitle="Onbellekteki icerikler">
        <OfflineNotice />
        <HomeActiveContentListContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Aktif Icerikler" subtitle="Devam ettigin icerikler">
      <HomeActiveContentListContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6
  },
  typeChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: 'flex-start'
  },
  typeChipText: {
    fontSize: 11,
    fontWeight: '700'
  },
  lockedChip: {
    backgroundColor: '#FEE2E2'
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#525252',
    marginBottom: 8
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  progress: {
    flex: 1,
    height: 8,
    borderRadius: 999
  },
  progressPct: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00B4D8',
    minWidth: 32,
    textAlign: 'right'
  },
  seeAllButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    minHeight: 48
  },
  planningText: {
    color: '#525252',
    marginBottom: 8
  },
  secondaryButton: {
    marginTop: 4,
    alignSelf: 'flex-start',
    minHeight: 48
  }
});
