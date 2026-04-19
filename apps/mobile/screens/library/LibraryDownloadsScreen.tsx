import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  InlineWarningBanner,
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PText
} from '../../components';
import { LOW_STORAGE_WARNING_MB } from '../../data/constants/mockData';
import { getDownloadsForUser, getEbookById, getPrimaryUser, getWorkshopById } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const TOTAL_STORAGE_MB = 512;

const LibraryDownloadsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const rawDownloads = getDownloadsForUser(user?.id);

  const [downloads, setDownloads] = useState(
    rawDownloads.map((d: any) => ({
      id: d.id,
      contentId: d.content_id,
      contentType: d.content_type,
      statusRaw: d.status,
      sizeMb: d.size_bytes ? (d.size_bytes / 1048576).toFixed(1) : '?'
    }))
  );

  const usedMb = downloads.reduce((acc: number, d: any) => acc + parseFloat(d.sizeMb || '0'), 0);
  const freeMb = TOTAL_STORAGE_MB - usedMb;
  const showStorageWarning = freeMb < LOW_STORAGE_WARNING_MB;

  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => { setSyncing(false); setSyncDone(true); }, 1500);
  };

  const handleDelete = (id: string) => {
    setDownloads((prev: any[]) => prev.filter((d: any) => d.id !== id));
  };

  const resolveTitle = (d: any): string => {
    if (d.contentType === 'ebook') return getEbookById(d.contentId)?.title ?? 'e-Kitap';
    if (d.contentType === 'workshop') return getWorkshopById(d.contentId)?.title ?? 'Atolye';
    return 'Icerik';
  };

  return (
    <>
      {/* AC-FR-E9-06-03: Storage summary + warning */}
      <SectionCard title="Depolama Durumu">
        <View style={styles.storageRow}>
          <PText variant="labelMedium" style={styles.storageLabel}>Kullanilanlar</PText>
          <PText variant="bodySmall">{usedMb.toFixed(1)} MB / {TOTAL_STORAGE_MB} MB</PText>
        </View>
        {showStorageWarning && (
          <InlineWarningBanner
            tone="warning"
            title="Depolama Uyarisi"
            message={`Yalnizca ${freeMb.toFixed(0)} MB bos alan kaldi. Yeni indirmeden once eski dosyalari temizle.`}
          />
        )}
        {/* AC-FR-E9-06-02: sync trigger */}
        <PButton
          mode="outlined"
          compact
          disabled={isOffline || syncing}
          style={styles.syncBtn}
          onPress={handleSync}
          accessibilityLabel="Indirmeleri senkronize et"
        >
          {syncing ? 'Senkronize ediliyor...' : syncDone ? 'Senkronize edildi' : 'Senkronize Et'}
        </PButton>
        {isOffline && (
          <PText variant="labelSmall" style={styles.offlineNote}>
            Baglanti gelince otomatik senkronize edilecek.
          </PText>
        )}
      </SectionCard>

      {/* AC-FR-E9-06-01: Downloaded content list */}
      <SectionCard title={`Indirilenler (${downloads.length})`} actionLabel="Temizle">
        {downloads.length === 0 ? (
          <StateMessage
            title="Indirilen icerik yok"
            description="Cevrimdisi erisim icin icerikleri indirip burada saklayabilirsin."
            actionLabel="Icerik Kesfet"
            icon="download-outline"
          />
        ) : (
          downloads.map((item: any, idx: number) => {
            const title = resolveTitle(item);
            const isDone = item.statusRaw === 'downloaded';
            return (
              <View key={item.id}>
                <View style={styles.downloadItem}>
                  <View style={styles.downloadInfo}>
                    <PText style={styles.downloadTitle}>{title}</PText>
                    <View style={styles.downloadMeta}>
                      <PChip compact>
                        {item.contentType === 'ebook' ? 'e-Kitap' : 'Atolye'}
                      </PChip>
                      <PText variant="labelSmall" style={styles.sizeText}>{item.sizeMb} MB</PText>
                      <PChip
                        compact
                        style={isDone ? styles.doneChip : styles.pendingChip}
                      >
                        {isDone ? 'Tamamlandi' : 'Bekliyor'}
                      </PChip>
                    </View>
                  </View>
                  <View style={styles.downloadActions}>
                    <PButton
                      mode="outlined"
                      compact
                      disabled={isOffline && !isDone}
                      onPress={() => {
                        if (item.contentType === 'ebook') {
                          navigation.navigate('Content', { screen: 'ContentEbookDetail', params: { id: item.contentId } });
                        } else {
                          navigation.navigate('Content', { screen: 'ContentWorkshopDetail', params: { id: item.contentId } });
                        }
                      }}
                      accessibilityLabel={`Ac: ${title}`}
                    >
                      Ac
                    </PButton>
                    <PButton
                      mode="text"
                      compact
                      disabled={isOffline}
                      onPress={() => handleDelete(item.id)}
                      accessibilityLabel={`Sil: ${title}`}
                    >
                      Sil
                    </PButton>
                  </View>
                </View>
                {idx < downloads.length - 1 && <PDivider />}
              </View>
            );
          })
        )}
      </SectionCard>
    </>
  );
};

export const LibraryDownloadsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Indirilenler" subtitle="Yukleniyor">
        <SectionCard title="Depolama">
          <SkeletonBlock height={36} />
        </SectionCard>
        <SectionCard title="Indirilenler">
          <PActivityIndicator animating />
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Indirilenler" subtitle="Cevrimdisi erisim">
        <StateMessage
          title="Indirilen icerik yok"
          description="Cevrimdisi erisim icin icerikleri indirip burada saklayabilirsin."
          actionLabel="Icerik Indir"
          icon="download-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Indirilenler" subtitle="Bir sorun olustu">
        <StateMessage
          title="Indirilenler yuklenemedi"
          description="Verileri getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Indirilenler" subtitle="Cevrimdisi dosyalar">
        <OfflineNotice />
        <LibraryDownloadsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Indirilenler" subtitle="Dosyalarin yonet">
      <LibraryDownloadsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    storageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing[1]
    },
    storageLabel: {
      color: c.textTertiary
    },
    syncBtn: {
      alignSelf: 'flex-start',
      marginTop: spacing[0.5]
    },
    offlineNote: {
      color: c.textTertiary,
      marginTop: spacing[1],
      fontStyle: 'italic'
    },
    downloadItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingVertical: spacing[1.5],
      gap: spacing[1]
    },
    downloadInfo: {
      flex: 1
    },
    downloadTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginBottom: spacing[1]
    },
    downloadMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: spacing[1]
    },
    sizeText: {
      color: c.textTertiary
    },
    doneChip: {
      backgroundColor: c.tertiaryContainer
    },
    pendingChip: {
      backgroundColor: c.warningContainer
    },
    downloadActions: {
      flexDirection: 'column',
      gap: spacing[0.5]
    }
  });
}
