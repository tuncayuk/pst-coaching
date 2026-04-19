import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { PButton, PDivider, PText } from '../../components';
import { READER_FONT_ORDER, READER_FONT_SIZES, type ReaderFontKey } from '../../data/constants/reader';
import {
  getContentItems,
  getContentItemsForParent,
  getFavoritesForUser,
  getHighlightsForUser,
  getNotesForUser,
  getPrimaryUser,
  getWorkshopById,
  getWorkshopSectionBlocks
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

type RouteParams = { state?: ScreenState; id?: string; sectionId?: string };

// ─────────────────────────────────────────────
// Block type helpers
// ─────────────────────────────────────────────

type Block = {
  type: string;
  label: string;
  text: string;
  arabic?: string;
  transliteration?: string;
};
const BLOCK_ACCENT: Record<string, string> = {
  intro:          '#F3F4F6',
  verse:          '#EEF2FF',
  'word-analysis':'#FFFBEB',
  bridge:         '#F0FDF4',
  practice:       '#FEF3C7',
  output:         '#F0FDFB'
};
const BLOCK_LEFT: Record<string, string> = {
  intro:          '#6B7280',
  verse:          '#4338CA',
  'word-analysis':'#B45309',
  bridge:         '#059669',
  practice:       '#D97706',
  output:         '#0891B2'
};

// ─────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────

const ContentWorkshopSectionContent = ({
  workshopId,
  sectionId,
  isOffline
}: {
  workshopId?: string;
  sectionId?: string;
  isOffline?: boolean;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  const user = getPrimaryUser();
  const workshop = getWorkshopById(workshopId);
  const section = getContentItems().find(item => item.id === sectionId);
  const highlights = getHighlightsForUser(user?.id).filter((h: any) => h.source_id === sectionId);
  const notes = getNotesForUser(user?.id).filter((n: any) => n.source_id === sectionId);
  const isFav = getFavoritesForUser(user?.id).some((f: any) => f.content_id === sectionId);
  const contentBlocks = getWorkshopSectionBlocks();

  // All sections for prev/next
  const allSections = getContentItemsForParent('workshop', workshopId);
  const currentIdx = allSections.findIndex((s: any) => s.id === sectionId);
  const prevSection = allSections[currentIdx - 1] ?? null;
  const nextSection = allSections[currentIdx + 1] ?? null;
  const progress = allSections.length > 0 ? (currentIdx + 1) / allSections.length : 0;

  // Font size
  const [fontKey, setFontKey] = useState<ReaderFontKey>('medium');
  const cycleFontSize = () =>
    setFontKey(prev => READER_FONT_ORDER[(READER_FONT_ORDER.indexOf(prev) + 1) % READER_FONT_ORDER.length]);
  const fontSize = READER_FONT_SIZES[fontKey];

  // Annotation state
  const [favActive, setFavActive] = useState(isFav);
  const [noteText, setNoteText] = useState(notes[0]?.text ?? '');
  const [noteSaved, setNoteSaved] = useState(false);
  const noteRef = useRef<TextInput>(null);
  const [sectionDone, setSectionDone] = useState(false);

  const handleSaveNote = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const stageLabel =
    allSections.length > 0
      ? `Aşama ${currentIdx + 1} / ${allSections.length}`
      : 'Aşama';

  return (
    <PremiumReaderLayout
      title={section?.title ?? workshop?.title ?? 'Aşama'}
      subtitle={`${workshop?.title ?? 'Atölye'} · Aşama ${currentIdx + 1}`}
      progress={progress}
      pageLabel={stageLabel}
      accentColor="#7C3AED"
      canGoPrev={!!prevSection}
      canGoNext={!!nextSection}
      onPrev={() =>
        prevSection &&
        navigation.navigate('Content', {
          screen: 'ContentWorkshopSection',
          params: { id: workshopId, sectionId: prevSection.id }
        })
      }
      onNext={() =>
        nextSection &&
        navigation.navigate('Content', {
          screen: 'ContentWorkshopSection',
          params: { id: workshopId, sectionId: nextSection.id }
        })
      }
      isBookmarked={favActive}
      onBookmark={() => !isOffline && setFavActive(v => !v)}
      onNote={() => noteRef.current?.focus()}
      fontSize={fontSize}
      onFontSizeCycle={cycleFontSize}
      footerAction={
        sectionDone
          ? nextSection
            ? {
                label: 'Sonraki Aşama',
                disabled: isOffline,
                mode: 'contained',
                onPress: () =>
                  navigation.navigate('Content', {
                    screen: 'ContentWorkshopSection',
                    params: { id: workshopId, sectionId: nextSection.id }
                  })
              }
            : {
                label: 'Çalışma Kitabına Geç',
                disabled: isOffline,
                mode: 'outlined',
                onPress: () =>
                  navigation.navigate('Content', {
                    screen: 'ContentWorkshopWorkbook',
                    params: { id: workshopId }
                  })
              }
          : {
              label: 'Bölümü Tamamla',
              disabled: isOffline,
              mode: 'contained',
              onPress: () => setSectionDone(true)
            }
      }
      isOffline={isOffline}
    >
      {/* ── Highlight count strip ── */}
      {highlights.length > 0 && (
        <View style={[styles.metaStrip, { backgroundColor: c.surfaceVariant }]}>
          <PText style={[styles.metaStripText, { color: c.textTertiary }]}>
            {highlights.length} vurgulama · {notes.length} not
          </PText>
        </View>
      )}

      {/* ── Content blocks ── */}
      {contentBlocks.map((block: Block, idx: number) => {
        const accentBg = BLOCK_ACCENT[block.type] ?? '#F9FAFB';
        const leftColor = BLOCK_LEFT[block.type] ?? '#6B7280';
        return (
          <View key={block.type} style={[styles.block, { backgroundColor: accentBg, borderLeftColor: leftColor }]}>
            {/* Block label */}
            <PText style={[styles.blockLabel, { color: leftColor }]}>{block.label}</PText>

            {/* Arabic verse */}
            {'arabic' in block && (
              <PText style={styles.arabicText}>{block.arabic}</PText>
            )}

            {/* Body text */}
            <PText
              style={[
                styles.blockText,
                { fontSize, lineHeight: fontSize * 1.7, color: c.textPrimary },
                block.type === 'verse' && styles.verseText,
                block.type === 'word-analysis' && styles.analysisText,
                block.type === 'output' && styles.outputText
              ]}
            >
              {block.text}
            </PText>

            {/* Transliteration */}
            {'transliteration' in block && (
              <PText style={[styles.translitText, { color: c.textDisabled }]}>
                {block.transliteration}
              </PText>
            )}

            {/* Practice — open workbook link */}
            {block.type === 'practice' && (
              <PButton
                mode="outlined"
                compact
                style={styles.practiceBtn}
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'ContentWorkshopWorkbook',
                    params: { id: workshopId }
                  })
                }
              >
                Çalışma Kitabını Aç
              </PButton>
            )}

            {/* Divider between blocks */}
            {idx < contentBlocks.length - 1 && (
              <PDivider style={styles.blockDivider} />
            )}
          </View>
        );
      })}

      {/* ── Note section ── */}
      <View style={[styles.noteSection, { borderColor: c.outlineVariant, backgroundColor: c.surfaceVariant }]}>
        <PText style={[styles.noteLabel, { color: c.textTertiary }]}>Notum</PText>
        <TextInput
          ref={noteRef}
          style={[styles.noteInput, { fontSize, color: c.textPrimary }]}
          multiline
          value={noteText}
          onChangeText={setNoteText}
          placeholder="Aşama hakkında notunuzu buraya yazın..."
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

      {/* ── Completion banner ── */}
      {sectionDone && (
        <View style={[styles.completedBanner, { backgroundColor: '#DCFCE7', borderColor: '#16A34A' }]}>
          <PText style={styles.completedText}>Aşama tamamlandı!</PText>
        </View>
      )}
    </PremiumReaderLayout>
  );
};

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export const ContentWorkshopSectionScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;
  const sectionId = route?.params?.sectionId;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Aşama İçeriği" headerVariant="none">
        <SkeletonBlock height={20} />
        {[1, 2, 3].map(i => <SkeletonBlock key={i} height={80} />)}
      </ScreenLayout>
    );
  }
  if (state === 'empty') {
    return (
      <ScreenLayout title="Aşama İçeriği" headerVariant="none">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Bu bölüm şu anda erişilebilir değil."
          actionLabel="Atölyeye Dön"
          icon="file-document-outline"
        />
      </ScreenLayout>
    );
  }
  if (state === 'error') {
    return (
      <ScreenLayout title="Aşama İçeriği" headerVariant="none">
        <StateMessage
          title="Bölüm yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  return (
    <ContentWorkshopSectionContent
      workshopId={workshopId}
      sectionId={sectionId}
      isOffline={state === 'offline'}
    />
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    metaStrip: {
      borderRadius: radii.md,
      paddingHorizontal: spacing[1.5],
      paddingVertical: 5,
      marginBottom: spacing[1.5]
    },
    metaStripText: { fontSize: fontSizes.xs },
    block: {
      borderLeftWidth: 3,
      borderRadius: radii.lg,
      paddingHorizontal: spacing[1.5],
      paddingTop: spacing[1.5],
      paddingBottom: spacing[1],
      marginBottom: spacing[1.5]
    },
    blockLabel: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
      marginBottom: 8
    },
    arabicText: {
      fontSize: fontSizes['3xl'],
      textAlign: 'right',
      lineHeight: 44,
      marginBottom: 8,
      writingDirection: 'rtl',
      color: '#1e293b'
    },
    blockText: {
      marginBottom: 4
    },
    verseText: {
      fontStyle: 'italic',
      color: '#3730A3'
    },
    analysisText: {
      fontStyle: 'italic'
    },
    outputText: {
      fontWeight: fontWeights.semiBold
    },
    translitText: {
      fontSize: fontSizes.sm,
      fontStyle: 'italic',
      marginTop: 4,
      marginBottom: 4
    },
    practiceBtn: {
      marginTop: 10,
      alignSelf: 'flex-start'
    },
    blockDivider: {
      marginTop: spacing[1.5]
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
      minHeight: 80,
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
    completedBanner: {
      borderWidth: 1,
      borderRadius: radii.lg,
      paddingVertical: spacing[1.5],
      alignItems: 'center',
      marginTop: spacing[2]
    },
    completedText: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: '#15803D'
    }
  });
}

// silence unused
void ((_c: ColorTokens) => {});
