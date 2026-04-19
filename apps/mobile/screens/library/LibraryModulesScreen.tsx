import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { FilterChipBar, PActivityIndicator, PButton, PCard, PProgressBar } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getContentProgressForUser, getModules, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, spacing, useAppTheme } from '../../theme';

const LibraryModulesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const modules = getModules();
  const progressRows = getContentProgressForUser(user?.id).filter(p => p.target_type === 'module');
  const moduleProgressMap = new Map(progressRows.map(row => [row.content_item_id, row]));

  const focusAreas = useMemo(() => {
    const areaTitles = modules.map(module => module.title).filter(Boolean);
    return ['Tum Moduller', ...areaTitles.slice(0, 4)];
  }, [modules]);
  const [activeArea, setActiveArea] = useState<string>(focusAreas[0] ?? 'Tum Moduller');

  const visibleModules =
    activeArea === 'Tum Moduller' ? modules : modules.filter(module => module.title === activeArea);

  const moduleProgress = modules.map(module => ({
    id: module.id,
    title: module.title,
    progress: Math.min(1, Math.max(0, (moduleProgressMap.get(module.id)?.progress_percent ?? 0) / 100)),
    subtitle: `${Math.round(
      (Math.min(100, Math.max(0, moduleProgressMap.get(module.id)?.progress_percent ?? 0)) / 100) * 4
    )}/4 bölüm tamamlandı`
  }));

  return (
    <>
      <SectionCard title="Odak Alanları" actionLabel="Filtrele">
        <FilterChipBar
          options={focusAreas}
          activeOption={activeArea}
          onOptionPress={setActiveArea}
          disabled={isOffline}
        />
      </SectionCard>

      <SectionCard title="Modül İlerlemesi" actionLabel="Tümü">
        {moduleProgress
          .filter(module => activeArea === 'Tum Moduller' || module.title === activeArea)
          .map(module => (
            <PCard key={module.id} style={styles.card}>
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
        {visibleModules.length === 0 ? (
          <StateMessage
            title="Bu alanda modül yok"
            description="Başka bir odak alanı seçebilirsin."
            actionLabel="Tümünü Gör"
            icon="view-module-outline"
            onAction={() => setActiveArea('Tum Moduller')}
          />
        ) : null}
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

function makeStyles(_c: ColorTokens) {
  return StyleSheet.create({
    card: {
      marginBottom: spacing[1.5]
    }
  });
}
