import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { PButton, PText } from '../../components';
import {
  getContentItemsForParent,
  getJourneyById,
  getJourneyDaysForJourney,
  getJourneys
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

type RouteParams = { state?: ScreenState; id?: string; day?: string };
type FontKey = 'small' | 'medium' | 'large';
const FONT_SIZES: Record<FontKey, number> = { small: 14, medium: 16, large: 19 };
const FONT_ORDER: FontKey[] = ['small', 'medium', 'large'];

const CONTENT_TYPE_CONFIG: Record<string, { emoji: string; label: string; accent: string; bg: string }> = {
  reading:  { emoji: '📖', label: 'Okuma',    accent: '#1D4ED8', bg: '#DBEAFE' },
  exercise: { emoji: '✏️', label: 'Alıştırma', accent: '#059669', bg: '#D1FAE5' },
  comment:  { emoji: '💬', label: 'Paylaşım', accent: '#7C3AED', bg: '#EDE9FE' }
};
const DEFAULT_TYPE = { emoji: '📄', label: 'İçerik', accent: '#6B7280', bg: '#F3F4F6' };

// ─────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────

const ContentJourneyDayContent = ({
  journeyId,
  dayNumber,
  isOffline
}: {
  journeyId?: string;
  dayNumber?: number;
  isOffline?: boolean;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  const journey = getJourneyById(journeyId);
  const days = getJourneyDaysForJourney(journey?.id);
  const day = days.find(d => d.day_number === dayNumber) ?? days[0];
  const contentItems = day ? getContentItemsForParent('journey_day', day.id) : [];

  const prevDay = days.find(d => d.day_number === (day?.day_number ?? 1) - 1);
  const nextDay = days.find(d => d.day_number === (day?.day_number ?? 1) + 1);
  const progress = days.length > 0 ? (day?.day_number ?? 1) / days.length : 0;

  // Lock — content unlocks at 08:00
  const now = new Date();
  const isLocked = now.getHours() < 8;
  const countdownH = isLocked ? 8 - now.getHours() - 1 : 0;
  const countdownM = isLocked ? 60 - now.getMinutes() : 0;

  // Font
  const [fontKey, setFontKey] = useState<FontKey>('medium');
  const cycleFontSize = () =>
    setFontKey(prev => FONT_ORDER[(FONT_ORDER.indexOf(prev) + 1) % FONT_ORDER.length]);
  const fontSize = FONT_SIZES[fontKey];

  // Completion
  const [isTodayCompleted, setIsTodayCompleted] = useState(false);

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

  const pageLabel = days.length > 0 ? `Gün ${day?.day_number ?? 1} / ${days.length}` : 'Gün';
  const deadlineWarning = now.getHours() >= 23;

  return (
    <PremiumReaderLayout
      title={journey?.title ?? 'Yolculuk'}
      subtitle={day ? `Gün ${day.day_number} · ${day.title}` : 'Gün İçeriği'}
      progress={progress}
      pageLabel={pageLabel}
      accentColor="#0891B2"
      canGoPrev={!!prevDay}
      canGoNext={!!nextDay}
      onPrev={() =>
        prevDay &&
        navigation.navigate('Content', {
          screen: 'ContentJourneyDay',
          params: { id: journeyId, day: String(prevDay.day_number) }
        })
      }
      onNext={() =>
        nextDay &&
        navigation.navigate('Content', {
          screen: 'ContentJourneyDay',
          params: { id: journeyId, day: String(nextDay.day_number) }
        })
      }
      isBookmarked={bookmarked}
      onBookmark={() => !isOffline && setBookmarked(v => !v)}
      onNote={() => noteRef.current?.focus()}
      fontSize={fontSize}
      onFontSizeCycle={cycleFontSize}
      footerAction={
        isLocked
          ? undefined
          : {
              label: isTodayCompleted ? 'Tamamlandı Olarak İşaretlendi' : 'Bugunu Tamamla',
              disabled: isOffline || isTodayCompleted,
              mode: isTodayCompleted ? 'outlined' : 'contained',
              onPress: () => setIsTodayCompleted(true)
            }
      }
      isOffline={isOffline}
    >
      {/* ── Deadline chips ── */}
      <View style={styles.metaRow}>
        <View style={styles.chip}>
          <PText style={[styles.chipText, { color: '#1D4ED8' }]}>08:00 kuralı</PText>
        </View>
        <View style={[styles.chip, deadlineWarning ? styles.chipWarn : styles.chipOk]}>
          <PText style={[styles.chipText, { color: deadlineWarning ? '#92400E' : '#15803D' }]}>
            {deadlineWarning ? '⚠️ Son teslim: 23:59' : 'Teslim: 23:59'}
          </PText>
        </View>
        {journey?.daily_target && (
          <View style={[styles.chip, { backgroundColor: '#EDE9FE' }]}>
            <PText style={[styles.chipText, { color: '#5B21B6' }]}>{journey.daily_target}</PText>
          </View>
        )}
      </View>

      {/* ── Completed banner ── */}
      {isTodayCompleted && (
        <View style={[styles.completedBanner, { backgroundColor: '#DCFCE7', borderColor: '#16A34A' }]}>
          <PText style={styles.completedText}>Bugün tamamlandı!</PText>
        </View>
      )}

      {/* ── Locked state ── */}
      {isLocked ? (
        <View style={[styles.lockedCard, { backgroundColor: '#F5F3FF', borderColor: '#8B5CF6' }]}>
          <PText style={[styles.lockedTitle, { color: '#5B21B6' }]}>
            Yeni içerik 08:00'de açılacak
          </PText>
          <PText style={[styles.lockedCountdown, { color: '#7C3AED' }]}>
            {countdownH}s {countdownM}d
          </PText>
          <PText style={[styles.lockedHint, { color: c.textTertiary }]}>
            Günlük içerik her sabah saat 08:00'de kilitler açılır.
          </PText>
        </View>
      ) : (
        <>
          {/* ── Content items ── */}
          {contentItems.map((item, idx) => {
            const typeCfg = CONTENT_TYPE_CONFIG[item.content_type] ?? DEFAULT_TYPE;
            return (
              <View
                key={item.id}
                style={[styles.itemCard, { backgroundColor: typeCfg.bg, borderLeftColor: typeCfg.accent }]}
              >
                {/* Item header */}
                <View style={styles.itemHeader}>
                  <PText style={styles.itemEmoji}>{typeCfg.emoji}</PText>
                  <View style={styles.itemHeaderText}>
                    <PText style={[styles.itemTitle, { fontSize: fontSize + 1, color: c.textPrimary }]}>
                      {item.title}
                    </PText>
                    <PText style={[styles.itemType, { color: typeCfg.accent }]}>{typeCfg.label}</PText>
                  </View>
                  <PText style={[styles.itemIdx, { color: c.textDisabled }]}>
                    {idx + 1}/{contentItems.length}
                  </PText>
                </View>

                {/* Body preview */}
                {!!item.body && (
                  <PText
                    style={[styles.itemBody, { fontSize, lineHeight: fontSize * 1.65, color: c.textSecondary }]}
                    numberOfLines={3}
                  >
                    {item.body}
                  </PText>
                )}

                {/* CTA */}
                <PButton
                  mode="contained"
                  compact
                  disabled={isOffline}
                  style={[styles.itemBtn, { alignSelf: 'flex-start' }]}
                  buttonColor={typeCfg.accent}
                  onPress={() => {
                    if (item.content_type === 'reading') {
                      navigation.navigate('Content', { screen: 'ContentReading', params: { id: item.id } });
                    } else if (item.content_type === 'exercise') {
                      navigation.navigate('Content', { screen: 'ContentExercise', params: { id: item.id } });
                    } else {
                      navigation.navigate('Content', { screen: 'ContentComment', params: { contentItemId: item.id } });
                    }
                  }}
                >
                  Başla
                </PButton>
              </View>
            );
          })}

          {/* ── Note section ── */}
          <View style={[styles.noteSection, { borderColor: c.outlineVariant, backgroundColor: c.surfaceVariant }]}>
            <PText style={[styles.noteLabel, { color: c.textTertiary }]}>Gün Notu</PText>
            <TextInput
              ref={noteRef}
              style={[styles.noteInput, { fontSize, color: c.textPrimary }]}
              multiline
              value={noteText}
              onChangeText={setNoteText}
              placeholder="Bu gün hakkında düşüncelerini yazabilirsin..."
              placeholderTextColor={c.textDisabled}
              editable={!isOffline}
              accessibilityLabel="Gün notu alanı"
            />
            <View style={styles.noteActions}>
              {noteSaved && <PText style={styles.savedText}>Kaydedildi</PText>}
              <PButton mode="text" compact disabled={isOffline || !noteText} onPress={handleSaveNote}>
                Kaydet
              </PButton>
            </View>
          </View>
        </>
      )}
    </PremiumReaderLayout>
  );
};

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export const ContentJourneyDayScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const dayNumber = route?.params?.day ? Number(route.params.day) : undefined;
  const journeyId = route?.params?.id ?? getJourneys()[0]?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Gün İçeriği" headerVariant="none">
        <SkeletonBlock height={20} />
        <SkeletonBlock height={80} />
        <SkeletonBlock height={80} />
      </ScreenLayout>
    );
  }
  if (state === 'empty') {
    return (
      <ScreenLayout title="Gün İçeriği" headerVariant="none">
        <StateMessage
          title="Gün içeriği yok"
          description="Bu güne ait içerik henüz eklenmemiş."
          actionLabel="Yolculuğa Dön"
          icon="calendar-blank-outline"
        />
      </ScreenLayout>
    );
  }
  if (state === 'error') {
    return (
      <ScreenLayout title="Gün İçeriği" headerVariant="none">
        <StateMessage
          title="Gün içeriği yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  return (
    <ContentJourneyDayContent
      journeyId={journeyId}
      dayNumber={dayNumber}
      isOffline={state === 'offline'}
    />
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    metaRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: spacing[2]
    },
    chip: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: radii.full,
      backgroundColor: '#DBEAFE'
    },
    chipOk: { backgroundColor: '#DCFCE7' },
    chipWarn: { backgroundColor: '#FEF3C7' },
    chipText: { fontSize: fontSizes.xs, fontWeight: fontWeights.semiBold },
    completedBanner: {
      borderWidth: 1,
      borderRadius: radii.lg,
      paddingVertical: spacing[1.5],
      alignItems: 'center',
      marginBottom: spacing[2]
    },
    completedText: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: '#15803D'
    },
    lockedCard: {
      borderWidth: 2,
      borderRadius: radii.xl,
      padding: spacing[2.5],
      alignItems: 'center',
      gap: 8
    },
    lockedTitle: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      textAlign: 'center'
    },
    lockedCountdown: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.extraBold
    },
    lockedHint: {
      fontSize: fontSizes.sm,
      textAlign: 'center'
    },
    itemCard: {
      borderLeftWidth: 3,
      borderRadius: radii.xl,
      padding: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    itemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: 8
    },
    itemEmoji: { fontSize: fontSizes['3xl'] },
    itemHeaderText: { flex: 1 },
    itemTitle: { fontWeight: fontWeights.bold, marginBottom: 2 },
    itemType: { fontSize: fontSizes.xs, fontWeight: fontWeights.semiBold, textTransform: 'uppercase', letterSpacing: 0.5 },
    itemIdx: { fontSize: fontSizes.xs },
    itemBody: { marginBottom: spacing[1.5] },
    itemBtn: {},
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
    savedText: { fontSize: fontSizes.sm, color: '#15803D', marginRight: 8 }
  });
}

// silence unused param
void ((_c: ColorTokens) => {});
