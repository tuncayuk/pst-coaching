import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PProgressBar } from '../../components';
import { getModules } from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const focusAreas = ['Sınırlar', 'Kendine Şefkat', 'Kaygı', 'İletişim'];

const LibraryModulesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const modules = getModules();
  const moduleProgress = modules.map((module, index) => ({
    id: module.id,
    title: module.title,
    progress: 0.25 + index * 0.2,
    subtitle: `${index + 1}/4 bölüm tamamlandı`
  }));

  return (
    <>
      <SectionCard title="Odak Alanları" actionLabel="Filtrele">
        <View style={styles.chipRow}>
          {focusAreas.map(label => (
            <PChip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </PChip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Modül İlerlemesi" actionLabel="Tümü">
        {moduleProgress.map(module => (
          <PCard key={module.title} style={styles.card}>
            <PCard.Title title={module.title} subtitle={module.subtitle} />
            <PCard.Content>
              <PProgressBar progress={module.progress} />
            </PCard.Content>
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'ContentModuleHome',
                    params: { id: module.id }
                  })
                }
              >
                Devam Et
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryModulesScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Modüller" subtitle="Modüller hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Modüller">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Modüller" subtitle="Yeni modüller eklenecek">
        <StateMessage
          title="Modül bulunamadı"
          description="Henüz modül eklenmedi. İlgi alanlarına göre öneriler yakında burada."
          actionLabel="Önerileri Gör"
          icon="view-module-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Modüller" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Modüller yüklenemedi"
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
      <ScreenLayout title="Modüller" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryModulesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Modüller" subtitle="Programlarına göz at">
      <LibraryModulesContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chip: {
    marginRight: 8,
    marginBottom: 8
  },
  card: {
    marginBottom: 12
  }
});
