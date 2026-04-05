import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PProgressBar, PText } from '../../components';
import {
  getDownloadsForUser,
  getEbookById,
  getEbookChaptersForEbook,
  getEbookProgressForUser,
  getPrimaryUser
} from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LOW_STORAGE_MB = 200;
const AVG_MIN_PER_PAGE = 2.5;

const ContentEbookDetailContent = ({ ebookId, isOffline }: { ebookId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const ebook = getEbookById(ebookId) ?? getEbookById(undefined);
  const chapters = getEbookChaptersForEbook(ebook?.id);
  const ebookProgress = getEbookProgressForUser(user?.id);
  const downloads = getDownloadsForUser(user?.id);

  const progressEntry = ebookProgress.find((p: any) => p.ebook_id === ebook?.id);
  const progressPercent: number = progressEntry?.progress_percent ?? 0;
  const chaptersRead = Math.round((progressPercent / 100) * (chapters.length || 1));
  const totalPages = ebook?.total_pages ?? 100;
  const pagesLeft = Math.round(((100 - progressPercent) / 100) * totalPages);
  const estimatedMinutes = Math.round(pagesLeft * AVG_MIN_PER_PAGE);
  const hoursLeft = Math.floor(estimatedMinutes / 60);
  const minsLeft = estimatedMinutes % 60;
  // AC-FR-E7-07-02: estimated remaining time
  const timeLeftLabel = hoursLeft > 0 ? hoursLeft + ' saat ' + minsLeft + ' dk' : minsLeft + ' dk';
  const download = downloads.find((d: any) => d.content_id === ebook?.id);
  const isDownloaded = download?.status === 'completed';
  const [isSimulating, setIsSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);
  // AC-FR-E7-08-04: downloaded ebooks show checkmark
  const [downloadDone, setDownloadDone] = useState(isDownloaded);
  const [showStorageWarn, setShowStorageWarn] = useState(false);
  const isCompleted = progressPercent >= 100;

  const handleDownload = () => {
    // AC-FR-E7-08-03: low storage warning
    const simulatedFreeMB = 150;
    if (simulatedFreeMB < LOW_STORAGE_MB) {
      setShowStorageWarn(true);
      return;
    }
    setIsSimulating(true);
    let prog = 0;
    const iv = setInterval(() => {
      prog += 25;
      setSimProgress(prog);
      if (prog >= 100) {
        clearInterval(iv);
        setIsSimulating(false);
        setDownloadDone(true);
      }
    }, 500);
  };

  return (
    <>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>{downloadDone ? '📖 ✓' : '📖'}</PText>
        <PText style={styles.heroTitle}>{ebook?.title ?? 'e-Kitap'}</PText>
        <View style={styles.tagRow}>
          <PChip compact style={styles.tagChip}>
            {ebook?.category ?? 'Kisisel Gelisim'}
          </PChip>
          <PChip compact style={styles.tagChip}>
            {totalPages} sayfa
          </PChip>
          {ebook?.has_audio && (
            <PChip compact style={styles.audioChip}>
              Sesli
            </PChip>
          )}
          {downloadDone && (
            <PChip compact style={styles.downloadedChip}>
              Indirildi
            </PChip>
          )}
        </View>
      </View>

      <SectionCard title="Okuma Ilerlemesi">
        <View style={styles.progressHeader}>
          <PText style={styles.progressPct}>{Math.round(progressPercent)}%</PText>
          <PText style={styles.progressSub}>
            {chaptersRead}/{chapters.length} bolum
          </PText>
        </View>
        <PProgressBar
          progress={progressPercent / 100}
          style={styles.progressBar}
          accessibilityLabel={'Okuma ilerlemesi yuzde ' + Math.round(progressPercent)}
        />
        <View style={styles.metaRow}>
          <PText style={styles.metaItem}>
            Sayfa {Math.round((progressPercent / 100) * totalPages)}/{totalPages}
          </PText>
          <PText style={styles.metaItem}>Kalan: {timeLeftLabel}</PText>
        </View>
        {isCompleted && (
          <View style={styles.completionBadge}>
            <PText style={styles.completionIcon}>🏆</PText>
            <PText style={styles.completionText}>Tebrikler! Bu kitabi tamamladin.</PText>
            <PButton
              mode="contained"
              compact
              onPress={() => navigation.navigate('ContentAchievement', { id: ebookId ?? '' })}
              style={styles.badgeCta}
            >
              Sertifikani Al
            </PButton>
          </View>
        )}
      </SectionCard>

      <SectionCard title="Cevrimdisi Erisim">
        {isSimulating ? (
          <View>
            <PText style={styles.downloadLabel}>Indiriliyor... {simProgress}%</PText>
            <PProgressBar
              progress={simProgress / 100}
              style={styles.progressBar}
              accessibilityLabel={'Indirme ilerlemesi yuzde ' + simProgress}
            />
          </View>
        ) : downloadDone ? (
          <View style={styles.downloadedRow}>
            <PText style={styles.downloadedText}>Kitap indirildi. Cevrimdisiyken okuyabilirsin.</PText>
            <PButton mode="text" compact textColor="#DC2626">
              Sil
            </PButton>
          </View>
        ) : (
          <PButton mode="outlined" icon="download" disabled={isOffline} onPress={handleDownload}>
            Cevrimdisi Indir
          </PButton>
        )}
      </SectionCard>

      <SectionCard title="Kitap Hakkinda">
        <PText style={styles.paragraph}>
          Sukrun donusturucu gucunu kesfet. Gunluk hayatta sukru nasil yasayacagini ogren.
        </PText>
        <View style={styles.metaBox}>
          <PText style={styles.metaText}>Yazar: PST Coaching Ekibi</PText>
          <PText style={styles.metaText}>Kategori: Kisisel Gelisim</PText>
          <PText style={styles.metaText}>Toplam: {totalPages} sayfa</PText>
        </View>
      </SectionCard>

      <SectionCard title="Icindekiler">
        {chapters.slice(0, 5).map((ch: any, i: number) => (
          <View key={ch.id} style={styles.chapRow}>
            <PText style={styles.chapIndex}>{ch.order_index ?? i + 1}</PText>
            <View style={styles.chapInfo}>
              <PText style={styles.chapTitle}>{ch.title}</PText>
              {ch.page_start != null && (
                <PText style={styles.chapPages}>
                  Sayfa {ch.page_start}-{ch.page_end}
                </PText>
              )}
            </View>
          </View>
        ))}
        {chapters.length > 5 && (
          <PButton mode="text" compact onPress={() => navigation.navigate('ContentEbookToc', { id: ebookId ?? '' })}>
            Tum Bolumleri Gor (+{chapters.length - 5})
          </PButton>
        )}
      </SectionCard>

      <SectionCard title="Araclar">
        <View style={styles.toolRow}>
          <PButton
            mode="outlined"
            icon="marker"
            compact
            style={styles.toolBtn}
            onPress={() => navigation.navigate('ContentEbookHighlights', { id: ebookId ?? '' })}
          >
            Vurgularim
          </PButton>
          <PButton
            mode="outlined"
            icon="cog"
            compact
            style={styles.toolBtn}
            onPress={() => navigation.navigate('ContentEbookSettings', { id: ebookId ?? '' })}
          >
            Okuma Ayarlari
          </PButton>
        </View>
      </SectionCard>

      <PButton
        mode="contained"
        disabled={isOffline}
        onPress={() => navigation.navigate('ContentEbookReader', { id: ebook?.id ?? '' })}
        style={styles.primaryCta}
      >
        {progressPercent > 0 ? 'Okumaya Devam Et' : 'Okumaya Basla'}
      </PButton>

      <Modal
        visible={showStorageWarn}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStorageWarn(false)}
      >
        <View style={styles.modalOverlay}>
          <PCard style={styles.modalCard}>
            <PCard.Content>
              <PText style={styles.modalTitle}>Yetersiz Depolama</PText>
              <PText style={styles.modalBody}>Cihazinda yeterli alan yok. Bazi dosyalari silip tekrar dene.</PText>
              <PButton mode="contained" onPress={() => setShowStorageWarn(false)}>
                Anladim
              </PButton>
            </PCard.Content>
          </PCard>
        </View>
      </Modal>
    </>
  );
};

export const ContentEbookDetailScreen = ({ route }: { route?: { params?: { state?: ScreenState; id?: string } } }) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={80} />
        </SectionCard>
        <SectionCard title="Ilerleme">
          <SkeletonBlock height={60} />
        </SectionCard>
        <SectionCard title="Icindekiler">
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }
  if (state === 'empty') {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Icerik bulunamadi">
        <StateMessage
          title="e-Kitap bulunamadi"
          description="Bu e-Kitap su anda erisebilir degil."
          actionLabel="Kesfe Don"
          icon="book-open-page-variant"
        />
      </ScreenLayout>
    );
  }
  if (state === 'error') {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Bir sorun olustu">
        <StateMessage
          title="e-Kitap yuklenemedi"
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
      <ScreenLayout title="e-Kitap Detay" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentEbookDetailContent ebookId={ebookId} isOffline />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="e-Kitap Detay" subtitle="Kitap bilgileri ve ilerleme">
      <ContentEbookDetailContent ebookId={ebookId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    marginBottom: 16
  },
  heroEmoji: { fontSize: 64, marginBottom: 12 },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 12
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  tagChip: { backgroundColor: '#E0F7FA' },
  audioChip: { backgroundColor: '#FEF3C7' },
  downloadedChip: { backgroundColor: '#DCFCE7' },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 8
  },
  progressPct: { fontSize: 28, fontWeight: '800', color: '#6B46C1' },
  progressSub: { fontSize: 12, color: '#737373' },
  progressBar: { marginBottom: 8 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  metaItem: { fontSize: 12, color: '#737373' },
  completionBadge: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FEF9C3',
    borderRadius: 12,
    alignItems: 'center',
    gap: 8
  },
  completionIcon: { fontSize: 32 },
  completionText: { fontSize: 14, fontWeight: '600', color: '#1F2937', textAlign: 'center' },
  badgeCta: { marginTop: 8 },
  downloadLabel: { fontSize: 13, color: '#525252', marginBottom: 8 },
  downloadedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  downloadedText: { flex: 1, fontSize: 13, color: '#15803D', marginRight: 8 },
  paragraph: { fontSize: 14, color: '#525252', lineHeight: 22, marginBottom: 12 },
  metaBox: { backgroundColor: '#F9FAFB', borderRadius: 10, padding: 12, gap: 4 },
  metaText: { fontSize: 12, color: '#525252' },
  chapRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB'
  },
  chapIndex: { fontSize: 14, fontWeight: '700', color: '#6B46C1', width: 20, textAlign: 'center' },
  chapInfo: { flex: 1 },
  chapTitle: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  chapPages: { fontSize: 11, color: '#9CA3AF', marginTop: 2 },
  toolRow: { flexDirection: 'row', gap: 10 },
  toolBtn: { flex: 1 },
  primaryCta: { marginBottom: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  modalCard: { width: '100%', borderRadius: 16 },
  modalTitle: { fontSize: 17, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  modalBody: { fontSize: 14, color: '#525252', lineHeight: 22, marginBottom: 20 }
});
