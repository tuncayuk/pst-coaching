import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { PButton, PText } from '../../components';
import {
  READER_AUDIO_SPEEDS,
  READER_FONT_ORDER,
  READER_FONT_SIZES,
  READER_HIGHLIGHT_COLORS,
  type ReaderFontKey
} from '../../data/constants/reader';
import {
  getEbookById,
  getEbookChaptersForEbook,
  getHighlightsForUser,
  getPrimaryUser,
  getReadingParagraphs
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { PremiumReaderLayout } from '../components/PremiumReaderLayout';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

// ─────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────

type RouteParams = { state?: ScreenState; id?: string; chapterId?: string };
const READING_PARAGRAPHS = getReadingParagraphs();

// ─────────────────────────────────────────────
// Audio bar (conditional on has_audio)
// ─────────────────────────────────────────────

const EbookAudioBar = ({
  isPlaying,
  speedIndex,
  onToggle,
  onSpeed,
  disabled
}: {
  isPlaying: boolean;
  speedIndex: number;
  onToggle: () => void;
  onSpeed: (i: number) => void;
  disabled?: boolean;
}) => {
  const { colors: c } = useAppTheme();
  return (
    <View style={[abStyles.bar, { backgroundColor: '#F5F3FF', borderBottomColor: c.outlineVariant }]}>
      <PButton
        mode="text"
        compact
        icon={isPlaying ? 'pause-circle' : 'play-circle'}
        onPress={onToggle}
        disabled={disabled}
      >
        {isPlaying ? 'Duraklat' : 'Sesli Kitap'}
      </PButton>
      <View style={abStyles.speeds}>
        {READER_AUDIO_SPEEDS.map((s, i) => (
          <PButton
            key={s}
            mode={speedIndex === i ? 'contained' : 'text'}
            compact
            disabled={disabled}
            onPress={() => onSpeed(i)}
            style={abStyles.speedBtn}
            labelStyle={abStyles.speedLabel}
          >
            {s}
          </PButton>
        ))}
      </View>
      {isPlaying && (
        <PText style={[abStyles.hint, { color: '#6B46C1' }]}>Arka planda devam eder</PText>
      )}
    </View>
  );
};

const abStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[1.5],
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: spacing[1]
  },
  speeds: { flexDirection: 'row', gap: 2 },
  speedBtn: { minWidth: 42 },
  speedLabel: { fontSize: fontSizes.xs },
  hint: { fontSize: fontSizes.xs, fontStyle: 'italic', flex: 1, textAlign: 'right' }
});

// ─────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────

const ContentEbookReaderContent = ({
  isOffline,
  ebookId,
  chapterId
}: {
  isOffline?: boolean;
  ebookId?: string;
  chapterId?: string;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  const user = getPrimaryUser();
  const ebook = getEbookById(ebookId);
  const chapters = getEbookChaptersForEbook(ebook?.id ?? ebookId);
  const userHighlights = getHighlightsForUser(user?.id);
  const highlightCount = userHighlights.filter((h: any) => h.source_id === chapterId).length;

  const currentIndex = chapterId ? chapters.findIndex((ch: any) => ch.id === chapterId) : 0;
  const safeIndex = Math.max(0, currentIndex);
  const current = chapters[safeIndex] ?? chapters[0];
  const prev = chapters[safeIndex - 1];
  const next = chapters[safeIndex + 1];
  const progress = chapters.length > 0 ? (safeIndex + 1) / chapters.length : 0;

  // Font size
  const [fontKey, setFontKey] = useState<ReaderFontKey>('medium');
  const cycleFontSize = () =>
    setFontKey(prev => READER_FONT_ORDER[(READER_FONT_ORDER.indexOf(prev) + 1) % READER_FONT_ORDER.length]);
  const fontSize = READER_FONT_SIZES[fontKey];

  // Audio
  const hasAudio = ebook?.has_audio ?? false;
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);

  // Highlight picker
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [highlightColor, setHighlightColor] = useState<string | null>(null);

  // Note
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const noteRef = useRef<TextInput>(null);
  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  // Bookmark
  const [bookmarked, setBookmarked] = useState(false);

  const pageLabel = chapters.length > 0 ? `${safeIndex + 1} / ${chapters.length}` : 'e-Kitap';
  const chapterTitle = current
    ? `Bölüm ${current.order_index ?? safeIndex + 1}: ${current.title}`
    : `Bölüm ${safeIndex + 1}`;

  const hlBg = highlightColor
    ? READER_HIGHLIGHT_COLORS.find(h => h.key === highlightColor)?.color
    : undefined;

  return (
    <PremiumReaderLayout
      title={ebook?.title ?? 'e-Kitap'}
      subtitle={chapterTitle}
      progress={progress}
      pageLabel={pageLabel}
      accentColor="#1D4ED8"
      canGoPrev={!!prev}
      canGoNext={!!next}
      onPrev={() => prev && navigation.navigate('Content', { screen: 'ContentEbookReader', params: { id: ebookId ?? '', chapterId: prev.id } })}
      onNext={() => next && navigation.navigate('Content', { screen: 'ContentEbookReader', params: { id: ebookId ?? '', chapterId: next.id } })}
      isBookmarked={bookmarked}
      onBookmark={() => setBookmarked(v => !v)}
      onHighlight={() => setShowHighlightPicker(v => !v)}
      onNote={() => noteRef.current?.focus()}
      fontSize={fontSize}
      onFontSizeCycle={cycleFontSize}
      audioBarSlot={
        hasAudio ? (
          <EbookAudioBar
            isPlaying={isPlaying}
            speedIndex={speedIndex}
            onToggle={() => !isOffline && setIsPlaying(p => !p)}
            onSpeed={setSpeedIndex}
            disabled={isOffline}
          />
        ) : undefined
      }
      isOffline={isOffline}
    >
      {/* ── Chapter meta ── */}
      <View style={styles.chapterMeta}>
        {current?.page_start != null && (
          <PText style={[styles.pageRange, { color: c.textDisabled }]}>
            Sayfa {current.page_start}–{current.page_end}
          </PText>
        )}
        {highlightCount > 0 && (
          <PText style={[styles.highlightCount, { color: c.textTertiary }]}>
            {highlightCount} vurgu
          </PText>
        )}
      </View>

      {/* ── Highlight picker ── */}
      {showHighlightPicker && (
        <View style={[styles.highlightPicker, { backgroundColor: c.surfaceVariant }]}>
          <PText style={[styles.pickerLabel, { color: c.textTertiary }]}>Renk seç:</PText>
          {READER_HIGHLIGHT_COLORS.map(h => (
            <PButton
              key={h.key}
              mode={highlightColor === h.key ? 'contained' : 'outlined'}
              compact
              buttonColor={h.color}
              textColor="#111"
              style={[styles.swatchBtn, { borderColor: h.color }]}
              onPress={() => { setHighlightColor(h.key); setShowHighlightPicker(false); }}
            >
              {h.label}
            </PButton>
          ))}
        </View>
      )}

      {/* ── Reading paragraphs ── */}
      {READING_PARAGRAPHS.map((para, i) => (
        <View
          key={i}
          style={[
            styles.paraWrap,
            hlBg ? { backgroundColor: hlBg, borderRadius: radii.sm } : undefined
          ]}
        >
          <PText style={[styles.para, { fontSize, lineHeight: fontSize * 1.75, color: c.textPrimary }]}>
            {para}
          </PText>
        </View>
      ))}

      {/* ── Note ── */}
      <View style={[styles.noteSection, { borderColor: c.outlineVariant, backgroundColor: c.surfaceVariant }]}>
        <PText style={[styles.noteLabel, { color: c.textTertiary }]}>Notum</PText>
        <TextInput
          ref={noteRef}
          style={[styles.noteInput, { fontSize, color: c.textPrimary }]}
          multiline
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Bu bölüm hakkında notunuzu yazın..."
          placeholderTextColor={c.textDisabled}
          editable={!isOffline}
          accessibilityLabel="Not alanı"
        />
        <View style={styles.noteActions}>
          {noteSaved && <PText style={styles.savedText}>Kaydedildi</PText>}
          <PButton mode="text" compact disabled={isOffline || !noteText} onPress={handleSaveNote}>
            Kaydet
          </PButton>
        </View>
      </View>

      {/* ── Quick links ── */}
      <View style={[styles.quickLinks, { borderTopColor: c.outlineVariant }]}>
        <PButton
          mode="text"
          compact
          icon="format-list-bulleted"
          onPress={() => navigation.navigate('Content', { screen: 'ContentEbookToc', params: { id: ebookId ?? '' } })}
        >
          İçindekiler
        </PButton>
        <PButton
          mode="text"
          compact
          icon="marker"
          onPress={() => navigation.navigate('Content', { screen: 'ContentEbookHighlights', params: { id: ebookId ?? '' } })}
        >
          Vurgularım
        </PButton>
        <PButton
          mode="text"
          compact
          icon="cog-outline"
          onPress={() => navigation.navigate('Content', { screen: 'ContentEbookSettings', params: { id: ebookId ?? '' } })}
        >
          Ayarlar
        </PButton>
      </View>
    </PremiumReaderLayout>
  );
};

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export const ContentEbookReaderScreen = ({
  route
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;
  const chapterId = route?.params?.chapterId;

  if (state === 'loading') {
    return (
      <ScreenLayout title="e-Kitap" headerVariant="none">
        <SkeletonBlock height={20} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={80} />
      </ScreenLayout>
    );
  }
  if (state === 'empty') {
    return (
      <ScreenLayout title="e-Kitap" headerVariant="none">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Bu bölüm şu anda erişilebilir değil."
          actionLabel="İçindekiler"
          icon="book-open-variant"
        />
      </ScreenLayout>
    );
  }
  if (state === 'error') {
    return (
      <ScreenLayout title="e-Kitap" headerVariant="none">
        <StateMessage
          title="Okuyucu yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  return (
    <ContentEbookReaderContent
      ebookId={ebookId}
      chapterId={chapterId}
      isOffline={state === 'offline'}
    />
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

function makeStyles(_c: ColorTokens) {
  return StyleSheet.create({
    chapterMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing[2]
    },
    pageRange: { fontSize: fontSizes.sm },
    highlightCount: { fontSize: fontSizes.sm },
    highlightPicker: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: spacing[2],
      padding: spacing[1.5],
      borderRadius: radii.lg
    },
    pickerLabel: { fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold },
    swatchBtn: { borderWidth: 2 },
    paraWrap: { marginBottom: spacing[1] },
    para: {
      marginBottom: spacing[1.5],
      textAlign: 'justify'
    },
    noteSection: {
      borderWidth: 1,
      borderRadius: radii.xl,
      padding: spacing[1.5],
      marginTop: spacing[2.5]
    },
    noteLabel: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: 6
    },
    noteInput: {
      minHeight: 72,
      textAlignVertical: 'top',
      lineHeight: 22
    },
    noteActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 4
    },
    savedText: { fontSize: fontSizes.sm, color: '#15803D', marginRight: 8 },
    quickLinks: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderTopWidth: StyleSheet.hairlineWidth,
      marginTop: spacing[2.5],
      paddingTop: spacing[1]
    }
  });
}
