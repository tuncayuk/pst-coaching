import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PText } from '../../components';
import { getDownloadsForUser, getEbookById, getPrimaryUser, getWorkshopById } from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LOW_STORAGE_MB = 200;
const TOTAL_STORAGE_MB = 512; // simulated device storage

const TYPE_ICON: Record<string, string> = {
  ebook: 'book-open-outline',
  workshop: 'account-group-outline'
};

const LibraryDownloadsContent = ({ isOffline }: { isOffline?: boolean }) => {
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

  // Simulate used storage
  const usedMb = downloads.reduce((acc: number, d: any) => acc + parseFloat(d.sizeMb || '0'), 0);
  const freeMb = TOTAL_STORAGE_MB - usedMb;

  // AC-FR-E9-06-03: storage warning
  const showStorageWarning = freeMb < LOW_STORAGE_MB;

  // AC-FR-E9-06-02: simulate sync
  const [syncing, setSyncing] = useState(false);
  const [syncDone, setSyncDone] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncDone(true);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    setDownloads((prev: any[]) => prev.filter((d: any) => d.id !== id));
  };

  const resolveTitle = (d: any): string => {
    if (d.contentType === 'ebook') {
      return getEbookById(d.contentId)?.title ?? 'e-Kitap';
    }
    if (d.contentType === 'workshop') {
      return getWorkshopById(d.contentId)?.title ?? 'Atolye';
    }
    return 'Icerik';
  };

  return (
    <>
      {/* Storage summary */}
      <SectionCard title="Depolama Durumu">
        <View style={styles.storageRow}>
          <PText variant="labelMedium" style={styles.storageLabel}>
            Kullanilanlar
          </PText>
          <PText variant="bodySmall">
            {usedMb.toFixed(1)} MB / {TOTAL_STORAGE_MB} MB
          </PText>
        </View>
        {/* AC-FR-E9-06-03: low storage warning */}
        {showStorageWarning && (
          <View style={styles.warnBox}>
            <PText variant="labelMedium" style={styles.warnTitle}>
              Depolama Uyarisi
            </PText>
            <PText variant="bodySmall" style={styles.warnText}>
              Yalnizca {freeMb.toFixed(0)} MB bos alan kaldi. Yeni indirmeden once eski dosyalari temizle.
            </PText>
          </View>
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

      {/* AC-FR-E9-06-01: downloaded content list */}
      <SectionCard title={'Indirilenler (' + downloads.length + ')'} actionLabel="Temizle">
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
            return (
              <View key={item.id}>
                <View style={styles.downloadItem}>
                  <View style={styles.downloadInfo}>
                    <PText variant="titleSmall" style={styles.downloadTitle}>
                      {title}
                    </PText>
                    <View style={styles.downloadMeta}>
                      <PChip compact style={styles.typeChip}>
                        {item.contentType === 'ebook' ? 'e-Kitap' : 'Atolye'}
                      </PChip>
                      <PText variant="labelSmall" style={styles.sizeText}>
                        {item.sizeMb} MB
                      </PText>
                      <PChip
                        compact
                        style={[
                          styles.statusChip,
                          item.statusRaw === 'downloaded' ? styles.doneChip : styles.pendingChip
                        ]}
                      >
                        {item.statusRaw === 'downloaded' ? 'Tamamlandi' : 'Bekliyor'}
                      </PChip>
                    </View>
                  </View>
                  <View style={styles.downloadActions}>
                    <PButton
                      mode="outlined"
                      compact
                      disabled={isOffline && item.statusRaw !== 'downloaded'}
                      onPress={() => {
                        if (item.contentType === 'ebook') {
                          navigation.navigate('Content', {
                            screen: 'ContentEbookDetail',
                            params: { id: item.contentId }
                          });
                        } else {
                          navigation.navigate('Content', {
                            screen: 'ContentWorkshopDetail',
                            params: { id: item.contentId }
                          });
                        }
                      }}
                      accessibilityLabel={'Ac: ' + title}
                    >
                      Ac
                    </PButton>
                    <PButton
                      mode="text"
                      compact
                      disabled={isOffline}
                      onPress={() => handleDelete(item.id)}
                      accessibilityLabel={'Sil: ' + title}
                    >
                      Sil
                    </PButton>
                  </View>
                </View>
                {idx < downloads.length - 1 && <PDivider style={styles.divider} />}
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

const styles = StyleSheet.create({
  storageRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  storageLabel: { opacity: 0.6 },
  warnBox: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#F57C00'
  },
  warnTitle: { color: '#E65100', fontWeight: '700', marginBottom: 4 },
  warnText: { color: '#BF360C', lineHeight: 18 },
  syncBtn: { alignSelf: 'flex-start', marginTop: 4 },
  offlineNote: { opacity: 0.55, marginTop: 6, fontStyle: 'italic' },
  downloadItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 10
  },
  downloadInfo: { flex: 1 },
  downloadTitle: { fontWeight: '600', marginBottom: 6 },
  downloadMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  typeChip: {},
  sizeText: { opacity: 0.55 },
  statusChip: {},
  doneChip: { backgroundColor: '#E8F5E9' },
  pendingChip: { backgroundColor: '#FFF9C4' },
  downloadActions: { flexDirection: 'column', gap: 4 },
  divider: { marginHorizontal: 0 }
});
