import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { FilterChipBar, PActivityIndicator, PButton, PCard, PProgressBar, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getEbookProgressForUser, getEbooks, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, spacing, useAppTheme } from '../../theme';

const FILTERS = ['Yeni', 'Devam Eden', 'Tamamlanan', 'İndirilen'] as const;

const LibraryEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const ebooks = getEbooks();
  const progress = getEbookProgressForUser(user?.id);
  const [activeFilter, setActiveFilter] = useState<string>(FILTERS[0]);

  const ebooksWithProgress = ebooks.map(book => {
    const found = progress.find(item => item.ebook_id === book.id);
    return { ...book, progress: (found?.progress_percent ?? 0) / 100 };
  });

  return (
    <>
      <SectionCard title="Filtre" actionLabel="Sırala">
        <FilterChipBar
          options={FILTERS}
          activeOption={activeFilter}
          onOptionPress={setActiveFilter}
          disabled={isOffline}
        />
      </SectionCard>

      <SectionCard title="e-Kitaplar" actionLabel="Tümü">
        {ebooksWithProgress.map(book => (
          <PCard key={book.id} style={styles.card}>
            <PCard.Title title={book.title} subtitle={`${book.total_pages ?? 0} sayfa`} />
            <PCard.Content>
              <PText variant="bodySmall" style={styles.progressLabel}>
                {Math.round(book.progress * 100)}% tamamlandı
              </PText>
              <PProgressBar progress={book.progress} />
            </PCard.Content>
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'ContentEbookReader',
                    params: { id: book.id }
                  })
                }
              >
                Oku
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryEbooksScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="e-Kitaplar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Kitaplar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Kütüphane gelişiyor">
        <StateMessage
          title="e-Kitap bulunamadı"
          description="Henüz kitap eklenmedi. Keşfet bölümünden yeni e-kitaplar bulabilirsin."
          actionLabel="Keşfe Git"
          icon="book-open-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="e-Kitaplar yüklenemedi"
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
      <ScreenLayout title="e-Kitaplar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryEbooksContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitaplar" subtitle="Okumalarına devam et">
      <LibraryEbooksContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      marginBottom: spacing[1.5]
    },
    progressLabel: {
      marginBottom: spacing[1]
    }
  });
}
