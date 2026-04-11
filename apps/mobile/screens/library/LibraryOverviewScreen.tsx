import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  ContentProgressRow,
  PActivityIndicator,
  PButton,
  PCard,
  PListIcon,
  PListItem,
  PText
} from '../../components';
import {
  getCollectionsForUser,
  getDownloadsForUser,
  getEbookById,
  getEbookProgressForUser,
  getFavoritesForUser,
  getHighlightsForUser,
  getPrimaryUser
} from '../../data/mockSelectors';
import { ColorTokens, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LibraryReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const favorites = getFavoritesForUser(user?.id);
  const collections = getCollectionsForUser(user?.id);
  const ebookProgress = getEbookProgressForUser(user?.id);
  const downloads = getDownloadsForUser(user?.id);
  const highlights = getHighlightsForUser(user?.id);
  const readingProgress = ebookProgress.slice(0, 2).map((item: any) => ({
    title: getEbookById(item.content_item_id)?.title ?? 'e-Kitap',
    progress: (item.progress_percent ?? 0) / 100
  }));

  return (
    <>
      <SectionCard title="Kütüphane Özeti" actionLabel="Yönet">
        <PListItem
          title="Favoriler"
          description={`${favorites.length} içerik`}
          left={props => <PListIcon {...props} icon="bookmark-outline" />}
          accessibilityLabel={`Favoriler: ${favorites.length} içerik`}
          accessibilityHint="Favori içerikleri görüntüler"
          onPress={() => navigation.navigate('LibraryFavorites')}
        />
        <PListItem
          title="Koleksiyonlar"
          description={`${collections.length} koleksiyon`}
          left={props => <PListIcon {...props} icon="folder-outline" />}
          accessibilityLabel={`Koleksiyonlar: ${collections.length} koleksiyon`}
          accessibilityHint="Koleksiyonları görüntüler"
          onPress={() => navigation.navigate('LibraryCollections')}
        />
        <PButton
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          accessibilityLabel="Yeni koleksiyon oluştur"
        >
          Koleksiyon Oluştur
        </PButton>
      </SectionCard>

      <SectionCard title="Devam Edenler" actionLabel="Tümü">
        {readingProgress.map(item => (
          <ContentProgressRow key={item.title} title={item.title} progress={item.progress} />
        ))}
      </SectionCard>

      <SectionCard title="İndirilenler" actionLabel="Yönet">
        {downloads.slice(0, 2).map(download => (
          <PCard key={download.id} style={styles.card}>
            <PCard.Title
              title={`İndirilen ${download.content_type}`}
              subtitle={`${download.status} · ${(download.size_bytes / 1048576).toFixed(1)} MB`}
            />
            <PCard.Actions>
              <PButton mode="outlined" disabled={isOffline}>
                Aç
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Vurgular & Notlar" actionLabel="Tümü">
        <View style={styles.noteBox}>
          <PText variant="bodyMedium" style={{ color: c.onSurfaceVariant }}>
            "{highlights[0]?.quote ?? 'Kendine karşı nazik olmak, dönüşümün ilk adımıdır.'}"
          </PText>
          <PText variant="labelSmall" style={{ color: c.primary }}>
            {getEbookById(highlights[0]?.content_item_id)?.title ?? 'Kişisel Notlar'}
          </PText>
        </View>
      </SectionCard>
    </>
  );
};

export const LibraryOverviewScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);
  const navigation = useNavigation<any>();

  if (state === 'loading') {
    return (
      <ScreenLayout title="Kütüphane" subtitle="İçerikler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Öğeler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Kütüphane" subtitle="Kişisel arşivin hazır">
        <StateMessage
          title="Kütüphanen boş"
          description="Favorilerine eklediğin içerikler burada görünecek. Şimdi bir içerik keşfet."
          actionLabel="Keşfet"
          onAction={() => navigation.navigate('Discover')}
          icon="bookmark-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Kütüphane" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Kütüphane yüklenemedi"
          description="Verileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          onAction={() => navigation.setParams({ state: undefined })}
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Kütüphane" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kütüphane" subtitle="Kaydedilen içerikler">
      <LibraryReadyContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    actionButton: {
      marginTop: spacing[1],
      alignSelf: 'flex-start'
    },
    card: {
      marginBottom: spacing[1.5]
    },
    noteBox: {
      padding: spacing[1.5],
      borderRadius: radii.xl,
      backgroundColor: c.surfaceVariant
    }
  });
}
