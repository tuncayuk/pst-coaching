import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PProgressBar, PText } from '../../components';
import { getEbookById, getEbookChaptersForEbook, getHighlightsForUser, getPrimaryUser } from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const READING_PARAGRAPHS = [
  'Kendine karsi nazik olmak, zorlayici anlarda ic sesini yumusatmanin ilk adimidir.',
  'Nefesini sayarken omuzlarinin gevsettigini fark et. Zihin baska yerlere gittiginde yargilamadan geri getir.',
  'Okuma sonrasi dusuncelerini not etmek icin birkas dakika ayir. Bu kisa refleksiyon, ogrenmeyi kalici hale getirir.',
  'Her sayfada kendi hikayeni gor. Sukur hem bir eylem hem de bir baki acisidir.'
];

const HIGHLIGHT_COLORS = [
  { key: 'yellow', label: 'Sari', color: '#FDE68A' },
  { key: 'green', label: 'Yesil', color: '#BBF7D0' },
  { key: 'blue', label: 'Mavi', color: '#BAE6FD' },
  { key: 'pink', label: 'Pembe', color: '#FBCFE8' }
];

const AUDIO_SPEEDS = ['0.75x', '1x', '1.25x'] as const;
type AudioSpeed = (typeof AUDIO_SPEEDS)[number];

const ContentEbookReaderContent = ({
  isOffline,
  ebookId,
  chapterId
}: {
  isOffline?: boolean;
  ebookId?: string;
  chapterId?: string;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const ebook = getEbookById(ebookId) ?? getEbookById(undefined);
  const chapters = getEbookChaptersForEbook(ebook?.id ?? ebookId);
  const userHighlights = getHighlightsForUser(user?.id);

  const currentIndex = chapterId ? chapters.findIndex((c: any) => c.id === chapterId) : 0;
  const safeIndex = currentIndex < 0 ? 0 : currentIndex;
  const current = chapters[safeIndex] ?? chapters[0];
  const prev = chapters[safeIndex - 1];
  const next = chapters[safeIndex + 1];
  // AC-FR-E7-02-04: progress bar
  const progress = chapters.length > 0 ? (safeIndex + 1) / chapters.length : 0;

  // AC-FR-E7-04-01: highlight color picker state
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addedHighlight, setAddedHighlight] = useState(false);
  // AC-FR-E7-04-02: note auto-save state
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  // AC-FR-E7-06-01/03/04: audio state
  const hasAudio = ebook?.has_audio ?? false;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<AudioSpeed>('1x');

  const handleAddHighlight = (colorKey: string) => {
    setSelectedColor(colorKey);
    setAddedHighlight(true);
    setShowHighlightPicker(false);
  };

  const handleSaveNote = () => {
    // AC-FR-E7-04-02 BR-12: auto-save
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <>
      {/* AC-FR-E7-01-02: Book + chapter title + page range */}
      <SectionCard title={ebook?.title ?? 'e-Kitap'}>
        <PText style={styles.chapterTitle}>
          {current
            ? 'Bolum ' + (current.order_index ?? safeIndex + 1) + ': ' + current.title
            : 'Bolum ' + (safeIndex + 1)}
        </PText>
        {current?.page_start != null && (
          <PText style={styles.pageRange}>
            Sayfa {current.page_start}-{current.page_end}
          </PText>
        )}
        {/* AC-FR-E7-02-04: progress bar */}
        <PProgressBar
          progress={progress}
          style={styles.progressBar}
          accessibilityLabel={'Okuma ilerlemesi yuzde ' + Math.round(progress * 100)}
        />
        <PText style={styles.progressLabel}>
          {safeIndex + 1} / {chapters.length} bolum ({Math.round(progress * 100)}% tamamlandi)
        </PText>
      </SectionCard>

      {/* Reading content */}
      <SectionCard title="Icerik">
        {READING_PARAGRAPHS.map((para, i) => (
          <View
            key={i}
            style={[
              styles.paraBlock,
              selectedColor
                ? { backgroundColor: HIGHLIGHT_COLORS.find(h => h.key === selectedColor)?.color }
                : undefined
            ]}
          >
            <PText style={styles.paragraph}>{para}</PText>
          </View>
        ))}
        {/* AC-FR-E7-04-01: simulated text selection highlight picker */}
        {!showHighlightPicker && !addedHighlight && (
          <PButton mode="text" compact onPress={() => setShowHighlightPicker(true)} style={styles.highlightBtn}>
            Metin Sec ve Vurgula
          </PButton>
        )}
        {showHighlightPicker && (
          <View style={styles.colorPickerRow}>
            <PText style={styles.colorPickerLabel}>Renk sec:</PText>
            {HIGHLIGHT_COLORS.map(hc => (
              <TouchableOpacity
                key={hc.key}
                onPress={() => handleAddHighlight(hc.key)}
                style={[styles.colorSwatch, { backgroundColor: hc.color }]}
                accessibilityLabel={hc.label}
              />
            ))}
          </View>
        )}
        {addedHighlight && (
          <PText style={styles.highlightSaved}>Vurgu eklendi! Vurgularim ekraninda gorulebilir.</PText>
        )}
      </SectionCard>

      {/* AC-FR-E7-04-02: note adding with auto-save (BR-12) */}
      <SectionCard title="Not Ekle">
        <View style={styles.noteRow}>
          <TouchableOpacity
            style={styles.noteArea}
            onPress={() => setNote(note.length ? note : 'Not yazin...')}
            accessibilityLabel="Not alani"
          >
            <PText style={[styles.notePlaceholder, !!note && styles.noteText]}>
              {note || 'Okuma notunuzu buraya yazin...'}
            </PText>
          </TouchableOpacity>
        </View>
        <View style={styles.noteActions}>
          {noteSaved && <PText style={styles.noteSavedLabel}>Kaydedildi</PText>}
          <PButton mode="text" compact onPress={handleSaveNote} disabled={isOffline}>
            Kaydet
          </PButton>
        </View>
      </SectionCard>

      {/* AC-FR-E7-06-01/02/03/04: audio player panel — shown only if has_audio */}
      {hasAudio ? (
        <SectionCard title="Sesli Kitap">
          <View style={styles.audioRow}>
            <PButton
              mode={isPlaying ? 'contained' : 'outlined'}
              icon={isPlaying ? 'pause' : 'play'}
              onPress={() => setIsPlaying(!isPlaying)}
              disabled={isOffline}
              style={styles.audioPlayBtn}
            >
              {isPlaying ? 'Duraklat' : 'Dinle'}
            </PButton>
            <PText style={styles.audioSync}>{isPlaying ? 'Metin takip ediliyor...' : 'Baslatmak icin tiklayin'}</PText>
          </View>
          {/* AC-FR-E7-06-03: speed selector */}
          <View style={styles.speedRow}>
            <PText style={styles.speedLabel}>Hiz:</PText>
            {AUDIO_SPEEDS.map(spd => (
              <PChip
                key={spd}
                compact
                selected={audioSpeed === spd}
                onPress={() => setAudioSpeed(spd)}
                style={styles.speedChip}
              >
                {spd}
              </PChip>
            ))}
          </View>
          {/* AC-FR-E7-06-04: background play hint */}
          {isPlaying && <PText style={styles.bgPlayHint}>Uygulamadan ciksan da ses arka planda devam eder.</PText>}
        </SectionCard>
      ) : (
        <SectionCard title="Sesli Kitap">
          <PText style={styles.audioUnavailable}>Bu kitabin sesli versiyonu mevcut degil.</PText>
        </SectionCard>
      )}

      {/* Chapter navigation + quick tools */}
      <SectionCard title="Navigasyon">
        <View style={styles.navRow}>
          <PButton
            mode="outlined"
            icon="chevron-left"
            compact
            style={styles.navBtn}
            disabled={!prev || isOffline}
            onPress={() => prev && navigation.navigate('ContentEbookReader', { id: ebookId ?? '', chapterId: prev.id })}
          >
            Onceki
          </PButton>
          <PButton
            mode="contained"
            icon="chevron-right"
            compact
            style={styles.navBtn}
            disabled={!next || isOffline}
            onPress={() => next && navigation.navigate('ContentEbookReader', { id: ebookId ?? '', chapterId: next.id })}
          >
            Sonraki
          </PButton>
        </View>
        <View style={styles.toolbarRow}>
          <PButton
            mode="text"
            compact
            icon="format-list-bulleted"
            onPress={() => navigation.navigate('ContentEbookToc', { id: ebookId ?? '' })}
          >
            Icindekiler
          </PButton>
          <PButton
            mode="text"
            compact
            icon="marker"
            onPress={() => navigation.navigate('ContentEbookHighlights', { id: ebookId ?? '' })}
          >
            Vurgularim
          </PButton>
          <PButton
            mode="text"
            compact
            icon="cog"
            onPress={() => navigation.navigate('ContentEbookSettings', { id: ebookId ?? '' })}
          >
            Ayarlar
          </PButton>
        </View>
      </SectionCard>
    </>
  );
};

export const ContentEbookReaderScreen = ({
  route
}: {
  route?: { params?: { state?: ScreenState; id?: string; chapterId?: string } };
}) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;
  const chapterId = route?.params?.chapterId;

  if (state === 'loading') {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={40} />
        </SectionCard>
        <SectionCard title="Icerik">
          <SkeletonBlock height={120} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }
  if (state === 'empty') {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Bolum bulunamadi"
          description="Bu bolum su anda erisebilir degil."
          actionLabel="Icindekiler"
          icon="book-open-variant"
        />
      </ScreenLayout>
    );
  }
  if (state === 'error') {
    return (
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Bir sorun olustu">
        <StateMessage
          title="Okuyucu yuklenemedi"
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
      <ScreenLayout title="e-Kitap Okuyucu" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentEbookReaderContent isOffline ebookId={ebookId} chapterId={chapterId} />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="e-Kitap Okuyucu" subtitle="Okumaya devam et">
      <ContentEbookReaderContent ebookId={ebookId} chapterId={chapterId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chapterTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 4 },
  pageRange: { fontSize: 12, color: '#9CA3AF', marginBottom: 8 },
  progressBar: { marginBottom: 4 },
  progressLabel: { fontSize: 11, color: '#737373', textAlign: 'right' },
  paraBlock: { padding: 4, marginBottom: 2 },
  paragraph: { fontSize: 15, color: '#1F2937', lineHeight: 26, marginBottom: 14 },
  highlightBtn: { alignSelf: 'flex-start', marginTop: 4 },
  colorPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 8
  },
  colorPickerLabel: { fontSize: 13, color: '#525252' },
  colorSwatch: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: '#E5E7EB' },
  highlightSaved: { fontSize: 12, color: '#15803D', marginTop: 4 },
  noteRow: { marginBottom: 8 },
  noteArea: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    minHeight: 60,
    backgroundColor: '#FAFAFA'
  },
  notePlaceholder: { fontSize: 14, color: '#9CA3AF' },
  noteText: { color: '#1F2937' },
  noteActions: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  noteSavedLabel: { fontSize: 12, color: '#15803D', marginRight: 8 },
  audioRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  audioPlayBtn: { flex: 0 },
  audioSync: { flex: 1, fontSize: 13, color: '#525252', fontStyle: 'italic' },
  speedRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  speedLabel: { fontSize: 13, color: '#525252' },
  speedChip: {},
  bgPlayHint: { fontSize: 12, color: '#6B46C1', fontStyle: 'italic' },
  audioUnavailable: { fontSize: 13, color: '#9CA3AF' },
  navRow: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  navBtn: { flex: 1 },
  toolbarRow: { flexDirection: 'row', justifyContent: 'space-between' }
});
