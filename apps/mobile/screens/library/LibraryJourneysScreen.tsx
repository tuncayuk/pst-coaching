import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import {
  ContentProgressRow,
  PActivityIndicator,
  PButton,
  PCard
} from '../../components';
import { getJourneys } from '../../data/mockSelectors';
import { ColorTokens, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LibraryJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const journeys = getJourneys();
  const activeJourneys = journeys.slice(0, 2).map((journey, index) => ({
    id: journey.id,
    title: journey.title,
    progress: 0.2 + index * 0.2,
    subtitle: `Gün ${index + 1} · ${journey.daily_target ?? '10 dk'}`
  }));
  const suggestedJourneys = journeys.slice(2, 4).map(journey => ({
    id: journey.id,
    title: journey.title,
    subtitle: `${journey.duration_days ?? 0} gün · ${journey.daily_target ?? '10 dk'}`
  }));

  return (
    <>
      <SectionCard title="Aktif Yolculuklar" actionLabel="Tümü">
        {activeJourneys.map(journey => (
          <ContentProgressRow
            key={journey.id}
            title={journey.title}
            progress={journey.progress}
            subtitle={journey.subtitle}
          />
        ))}
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.primaryButton}
          onPress={() =>
            navigation.navigate('Content', {
              screen: 'ContentJourneyDay',
              params: { id: activeJourneys[0]?.id, day: '1' }
            })
          }
        >
          Bugünkü Adımı Aç
        </PButton>
      </SectionCard>

      <SectionCard title="Önerilen Yolculuklar" actionLabel="Keşfet">
        {suggestedJourneys.map(journey => (
          <PCard key={journey.id} style={styles.card}>
            <PCard.Title title={journey.title} subtitle={journey.subtitle} />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'ContentJourneyDetail',
                    params: { id: journey.id }
                  })
                }
              >
                İncele
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryJourneysScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Yolculuklar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Öneriler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Kişisel programın hazır">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Henüz başladığın bir yolculuk yok. Sana uygun bir program seçebilirsin."
          actionLabel="Yolculuk Seç"
          icon="map-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yolculuklar yüklenemedi"
          description="Verileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryJourneysContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuklar" subtitle="Programlarını yönet">
      <LibraryJourneysContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    primaryButton: {
      marginTop: spacing[1],
      alignSelf: 'flex-start'
    },
    card: {
      marginBottom: spacing[1.5]
    }
  });
}
