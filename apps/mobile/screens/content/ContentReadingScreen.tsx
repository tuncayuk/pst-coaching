import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { PButton, PCard, PText } from '../../components';
import { getReaderAudioSpeeds, getReaderHighlightColors } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { PremiumReaderLayout } from '../components/PremiumReaderLayout';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

// ─────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────

type RouteParams = { state?: ScreenState; id?: string };
type FontKey = 'small' | 'medium' | 'large';
const FONT_SIZES: Record<FontKey, number> = { small: 14, medium: 16, large: 19 };
const FONT_ORDER: FontKey[] = ['small', 'medium', 'large'];
const AUDIO_SPEEDS = getReaderAudioSpeeds();
const HIGHLIGHT_COLORS = getReaderHighlightColors();

// ─────────────────────────────────────────────
// Audio bar
// ─────────────────────────────────────────────

const AudioBar = ({
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
    <View style={[audioStyles.bar, { backgroundColor: '#F5F3FF', borderBottomColor: c.outlineVariant }]}>
      <PButton
        mode="text"
        compact
        icon={isPlaying ? 'pause-circle' : 'play-circle'}
        onPress={onToggle}
        disabled={disabled}
        style={audioStyles.playBtn}
      >
        {isPlaying ? 'Duraklat' : 'Dinle'}
      </PButton>
      <View style={audioStyles.speeds}>
        {AUDIO_SPEEDS.map((s, i) => (
          <PButton
            key={s}
            mode={speedIndex === i ? 'contained' : 'text'}
            compact
            disabled={disabled}
            onPress={() => onSpeed(i)}
            style={audioStyles.speedBtn}
            labelStyle={audioStyles.speedLabel}
          >
            {s}
          </PButton>
        ))}
      </View>
      {isPlaying && (
        <PText style={[audioStyles.hint, { color: '#6B46C1' }]}>Arka planda devam eder</PText>
      )}
    </View>
  );
};

const audioStyles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[1.5],
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: spacing[1]
  },
  playBtn: {},
  speeds: { flexDirection: 'row', gap: 2 },
  speedBtn: { minWidth: 42 },
  speedLabel: { fontSize: fontSizes.xs },
  hint: { fontSize: fontSizes.xs, fontStyle: 'italic', flex: 1, textAlign: 'right' }
});

// ─────────────────────────────────────────────
// Content body
// ─────────────────────────────────────────────

const ContentReadingContent = ({ isOffline, id }: { isOffline?: boolean; id?: string }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  // Font size
  const [fontKey, setFontKey] = useState<FontKey>('medium');
  const cycleFontSize = useCallback(() => {
    setFontKey(prev => FONT_ORDER[(FONT_ORDER.indexOf(prev) + 1) % FONT_ORDER.length]);
  }, []);
  const fontSize = FONT_SIZES[fontKey];

  // Audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(1);

  // Highlight
  const [highlightColor, setHighlightColor] = useState<string | null>(null);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  // Note
  const [noteText, setNoteText] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);
  const noteInputRef = useRef<TextInput>(null);
  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  // Bookmark
  const [bookmarked, setBookmarked] = useState(false);

  // Scroll progress
  const [scrollProgress, setScrollProgress] = useState(0);

  const hlBg = highlightColor
    ? HIGHLIGHT_COLORS.find(h => h.key === highlightColor)?.color
    : undefined;

  return (
    <PremiumReaderLayout
      title="Otomatik Düşünceler"
      subtitle="Gün 1 · Paket 3"
      progress={scrollProgress}
      pageLabel="Okuma"
      accentColor="#6B46C1"
      canGoPrev={false}
      canGoNext={true}
      onNext={() =>
        navigation.navigate('Content', {
          screen: 'ContentExercise',
          params: { id: id ?? 'c1c1c1c1-0000-0000-0000-000000000102' }
        })
      }
      isBookmarked={bookmarked}
      onBookmark={() => setBookmarked(v => !v)}
      onHighlight={() => setShowHighlightPicker(v => !v)}
      onNote={() => noteInputRef.current?.focus()}
      fontSize={fontSize}
      onFontSizeCycle={cycleFontSize}
      onScrollProgress={setScrollProgress}
      footerAction={{
        label: 'Uygulamaya Geç',
        disabled: isOffline,
        onPress: () =>
          navigation.navigate('Content', {
            screen: 'ContentExercise',
            params: { id: id ?? 'c1c1c1c1-0000-0000-0000-000000000102' }
          })
      }}
      audioBarSlot={
        <AudioBar
          isPlaying={isPlaying}
          speedIndex={speedIndex}
          onToggle={() => !isOffline && setIsPlaying(p => !p)}
          onSpeed={setSpeedIndex}
          disabled={isOffline}
        />
      }
      isOffline={isOffline}
    >
      {/* ── Highlight color picker ── */}
      {showHighlightPicker && (
        <View style={styles.highlightPicker}>
          <PText style={[styles.pickerLabel, { color: c.textTertiary }]}>Renk seç:</PText>
          {HIGHLIGHT_COLORS.map(h => (
            <PButton
              key={h.key}
              mode={highlightColor === h.key ? 'contained' : 'outlined'}
              compact
              onPress={() => { setHighlightColor(h.key); setShowHighlightPicker(false); }}
              style={[styles.swatchBtn, { borderColor: h.color }]}
              buttonColor={h.color}
              textColor={highlightColor === h.key ? '#111' : c.textSecondary}
            >
              {h.label}
            </PButton>
          ))}
        </View>
      )}

      {/* ── Body text ── */}
      <PText style={[styles.bodyTitle, { fontSize: fontSize + 7, color: c.textBrand }]}>
        Otomatik Düşünceler
      </PText>

      <View style={hlBg ? [styles.highlightBlock, { backgroundColor: hlBg }] : undefined}>
        <PText style={[styles.para, { fontSize, lineHeight: fontSize * 1.75, color: c.textPrimary }]}>
          Zihnimiz her gün binlerce düşünce üretir. Bunların çoğu otomatiktir ve farkında bile olmadığımız hızda akar
          gider. Bu{' '}
          <PText style={[styles.paraHighlight, { fontSize }]}>otomatik düşünceler</PText>, yaşadığımız deneyimleri
          yorumlamamızı sağlar.
        </PText>
        <PText style={[styles.para, { fontSize, lineHeight: fontSize * 1.75, color: c.textPrimary }]}>
          Ancak bu düşüncelerin hepsi gerçeği yansıtmaz. Bazen geçmiş deneyimlerimize, korkularımıza ya da çevremizden
          aldığımız mesajlara dayanır.
        </PText>
      </View>

      <PCard style={styles.callout}>
        <PText style={styles.calloutTitle}>Örnek Otomatik Düşünceler</PText>
        {['Başaramayacağım.', 'Herkes beni yargılıyor.', 'Ben yeterince iyi değilim.'].map(t => (
          <PText key={t} style={[styles.calloutItem, { fontSize }]}>· {t}</PText>
        ))}
      </PCard>

      <PText style={[styles.para, { fontSize, lineHeight: fontSize * 1.75, color: c.textPrimary }]}>
        Bu düşünceleri fark ettiğimizde, onları sorgulamaya ve daha gerçekçi alternatifler bulmaya başlayabiliriz.
      </PText>

      <PText style={[styles.para, { fontSize, lineHeight: fontSize * 1.75, color: c.textPrimary }]}>
        Düşünce kalıplarını tanımak, duygusal esnekliğin ilk adımıdır. Her gün birkaç dakika bu farkındalığa ayırmak,
        zamanla zihnin varsayılan tepkilerini dönüştürür.
      </PText>

      {/* ── Note section ── */}
      <View style={[styles.noteSection, { borderColor: c.outlineVariant, backgroundColor: c.surfaceVariant }]}>
        <PText style={[styles.noteLabel, { color: c.textTertiary }]}>Notum</PText>
        <TextInput
          ref={noteInputRef}
          style={[styles.noteInput, { fontSize, color: c.textPrimary }]}
          multiline
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Aklına gelenleri buraya yaz..."
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
    </PremiumReaderLayout>
  );
};

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export const ContentReadingScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const id = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Okuma" headerVariant="none">
        <SkeletonBlock height={20} />
        <SkeletonBlock height={20} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={80} />
      </ScreenLayout>
    );
  }
  if (state === 'empty') {
    return (
      <ScreenLayout title="Okuma" headerVariant="none">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Okuma içeriği şu anda erişilebilir değil."
          actionLabel="Geri Dön"
          icon="book-open-page-variant"
        />
      </ScreenLayout>
    );
  }
  if (state === 'error') {
    return (
      <ScreenLayout title="Okuma" headerVariant="none">
        <StateMessage
          title="Okuma yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  // online & offline both use the same immersive layout — isOffline controls toolbar/audio disable state
  return <ContentReadingContent id={id} isOffline={state === 'offline'} />;
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    highlightPicker: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: spacing[2],
      padding: spacing[1.5],
      backgroundColor: c.surfaceVariant,
      borderRadius: radii.lg
    },
    pickerLabel: { fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold },
    swatchBtn: { borderWidth: 2 },
    bodyTitle: {
      fontWeight: fontWeights.bold,
      marginBottom: spacing[2]
    },
    highlightBlock: {
      borderRadius: radii.md,
      paddingHorizontal: 4
    },
    para: {
      marginBottom: spacing[2],
      textAlign: 'justify'
    },
    paraHighlight: {
      backgroundColor: '#FDE68A',
      color: '#111827'
    },
    callout: {
      padding: spacing[2],
      borderRadius: radii.xl,
      backgroundColor: '#DBEAFE',
      borderLeftWidth: 4,
      borderLeftColor: '#1D4ED8',
      marginVertical: spacing[1.5]
    },
    calloutTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: '#1D4ED8',
      marginBottom: spacing[1]
    },
    calloutItem: {
      color: '#1F2937',
      marginBottom: 5,
      lineHeight: 22
    },
    noteSection: {
      borderWidth: 1,
      borderRadius: radii.xl,
      padding: spacing[1.5],
      marginTop: spacing[2]
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
    savedText: {
      fontSize: fontSizes.sm,
      color: '#15803D',
      marginRight: 8
    }
  });
}
