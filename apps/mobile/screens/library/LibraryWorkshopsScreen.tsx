import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PText } from '../../components';
import { getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const categories = ['Canlı', 'Kayıt', 'Mini', 'Toplu'];

const LibraryWorkshopsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const upcomingWorkshops = getWorkshops();

  return (
    <>
      <SectionCard title="Kategoriler" actionLabel="Filtre">
        <View style={styles.chipRow}>
          {categories.map(label => (
            <PChip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </PChip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Yaklaşan Atölyeler" actionLabel="Takvim">
        {upcomingWorkshops.map(workshop => (
          <PCard key={workshop.id} style={styles.card}>
            <PCard.Title title={workshop.title} subtitle={workshop.description} />
            <PCard.Content>
              <PText variant="bodySmall">Bugün 20:00</PText>
            </PCard.Content>
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'ContentWorkshopHome',
                    params: { id: workshop.id }
                  })
                }
              >
                Kaydol
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryWorkshopsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Atölyeler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Etkinlikler">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
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
    <ScreenLayout title="Atölyeler" subtitle="Etkinlikleri takip et">
      <LibraryWorkshopsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    chip: {
      marginRight: 8,
      marginBottom: spacing[1]
    },
    card: {
      marginBottom: spacing[1.5]
    }
  });
}
