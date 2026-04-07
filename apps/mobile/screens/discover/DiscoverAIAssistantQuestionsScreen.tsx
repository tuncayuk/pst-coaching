// AC-FR-E16-02-01: context from Journey, Workshop, eBook sources
// AC-FR-E16-02-02: source type + count visible in response header
// AC-FR-E16-02-03: structured response — main summary + supporting bullets
// AC-FR-E16-02-04: follow-up question chips (horizontal wrap)

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  PActivityIndicator,
  PButton,
  PCard,
  PChip,
  PDivider,
  PProgressBar,
  PText,
} from '../../components';
import { getEbooks, getJourneys, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

// ---------------------------------------------------------------------------
// Mock RAG response  (AC-FR-E16-02-01/02/03)
// ---------------------------------------------------------------------------
const FOLLOW_UP_SUGGESTIONS = [
  'Bu konuyu daha derinlemesine acikla',
  'Baska kaynak var mi?',
  'Gunluk pratik onerisi ne olur?',
  'Baslangic seviyesi icin neyi onerirsin?',
];

type RagResponse = {
  summary: string;
  bullets: string[];
  sourceTypes: Array<{ type: string; count: number }>;
  totalSources: number;
};

function buildMockRagResponse(question: string): RagResponse {
  const journeys = getJourneys().slice(0, 2);
  const workshops = getWorkshops().slice(0, 1);
  const ebooks = getEbooks().slice(0, 1);

  return {
    summary: `"${question}" sorunuza gore icerik kutuphanemizden derlenen yanit: ${
      journeys[0]?.description ??
      'Kisisel gelisim yolculugunda bilincli adimlar atmak, uzun vadeli degisimin temelidir.'
    }`,
    bullets: [
      journeys[0]
        ? `${journeys[0].title} yolculugu bu konuda yapilandirilmis bir program sunar`
        : 'Gunluk 15 dk. pratik onerilir',
      workshops[0]
        ? `${workshops[0].title} atolyesi pratik egzersizler icerir`
        : 'Duygusal farkindalik egzersizleri hizlandirici etki gosterir',
      ebooks[0]
        ? `${ebooks[0].title} kitabi teorik altyapi saglar`
        : 'Teorik altyapi icin e-Kitap kaynaklari mevcuttur',
    ],
    sourceTypes: [
      { type: 'Yolculuk', count: journeys.length },
      { type: 'Atolye', count: workshops.length },
      { type: 'e-Kitap', count: ebooks.length },
    ].filter(s => s.count > 0),
    totalSources: journeys.length + workshops.length + ebooks.length,
  };
}

// ---------------------------------------------------------------------------
// Thinking → Ready phase transition
// ---------------------------------------------------------------------------
type Phase = 'thinking' | 'ready';

const DiscoverAIAssistantQuestionsContent = ({
  isOffline,
  question,
}: {
  isOffline?: boolean;
  question: string;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  const [phase, setPhase] = useState<Phase>('thinking');
  const [progress, setProgress] = useState(0);
  const [rag] = useState(() => buildMockRagResponse(question));

  // Simulate AI RAG loading (AC-FR-E16-02-01)
  useEffect(() => {
    if (isOffline) {
      setPhase('ready');
      setProgress(1);
      return;
    }
    let p = 0;
    const interval = setInterval(() => {
      p += 0.12;
      setProgress(Math.min(p, 0.95));
      if (p >= 0.95) {
        clearInterval(interval);
        setTimeout(() => {
          setProgress(1);
          setPhase('ready');
        }, 400);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [isOffline]);

  // ----- Thinking state -----
  if (phase === 'thinking') {
    return (
      <View style={styles.thinkingContainer}>
        <View style={styles.thinkingIconWrap}>
          <PActivityIndicator animating size="large" />
        </View>
        <PText
          style={styles.thinkingTitle}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          Kaynaklar taranıyor...
        </PText>
        <PText style={styles.thinkingSubtitle}>
          Yolculuk, Atolye ve e-Kitap kaynaklarindan baglamsal yanitin derleniyor
        </PText>
        <PProgressBar
          progress={progress}
          style={styles.thinkingBar}
          accessibilityLabel={`Yanit hazirlaniyor, yuzde ${Math.round(progress * 100)}`}
        />
        {/* AC-FR-E16-02-01: source types being searched */}
        <View style={styles.sourceTypePills}>
          {[
            { icon: '🗺', label: 'Yolculuklar' },
            { icon: '🎓', label: 'Atolyeler' },
            { icon: '📖', label: 'e-Kitaplar' },
          ].map(item => (
            <View key={item.label} style={styles.sourceTypePill}>
              <PText style={styles.sourceTypePillText}>
                {item.icon} {item.label}
              </PText>
            </View>
          ))}
        </View>
      </View>
    );
  }

  // ----- Ready state -----
  return (
    <View>
      {/* Question echo bubble */}
      <View style={styles.questionBubble} accessibilityRole="text">
        <PText style={styles.questionLabel}>Sorunuz</PText>
        <PText style={styles.questionText}>{question}</PText>
      </View>

      {/* AC-FR-E16-02-02: source count + type badges */}
      <View style={styles.sourceCountRow}>
        <PText
          style={styles.sourceCountText}
          accessibilityLabel={`${rag.totalSources} kaynaktan derlenen yanit`}
        >
          {rag.totalSources} kaynaktan derlendi
        </PText>
        <View style={styles.sourceTypeBadges}>
          {rag.sourceTypes.map(s => (
            <View key={s.type} style={styles.sourceTypeBadge}>
              <PText style={styles.sourceTypeBadgeText}>
                {s.type} x{s.count}
              </PText>
            </View>
          ))}
        </View>
      </View>

      {/* AC-FR-E16-02-03: structured response — summary + bullets */}
      <PCard style={styles.responseCard} accessibilityLabel="AI yaniti">
        <PText style={styles.responseSummary}>{rag.summary}</PText>
        <PDivider style={styles.divider} />
        <PText style={styles.bulletHeading}>Temel Noktalar</PText>
        {rag.bullets.map((bullet, i) => (
          <View key={i} style={styles.bulletRow} accessibilityRole="text">
            <View style={styles.bulletDot} accessibilityElementsHidden />
            <PText style={styles.bulletText}>{bullet}</PText>
          </View>
        ))}
      </PCard>

      {/* Source traceability CTA */}
      <PButton
        mode="outlined"
        disabled={isOffline}
        onPress={() => navigation.navigate('DiscoverAIAssistantResults', { question })}
        style={styles.sourcesButton}
        accessibilityLabel="Kullanilan kaynaklari goruntule"
        accessibilityHint="Yaniti olusturan icerik kaynaklarinin listesini acar"
      >
        Kaynaklari Gor ({rag.totalSources})
      </PButton>

      {/* AC-FR-E16-02-04: follow-up chips — horizontal wrap */}
      <View style={styles.followUpSection}>
        <PText style={styles.followUpLabel}>Takip sorulari</PText>
        <View style={styles.followUpGrid}>
          {FOLLOW_UP_SUGGESTIONS.map(s => (
            <PChip
              key={s}
              onPress={() =>
                !isOffline && navigation.navigate('DiscoverAIAssistantQuestions', { question: s })
              }
              disabled={isOffline}
              compact
              accessibilityRole="button"
              accessibilityLabel={`Takip sorusu: ${s}`}
              style={styles.followUpChip}
            >
              {s}
            </PChip>
          ))}
        </View>
      </View>
    </View>
  );
};

// ---------------------------------------------------------------------------
// Screen shell — all states
// ---------------------------------------------------------------------------
type RouteParams = { state?: ScreenState; question?: string };

export const DiscoverAIAssistantQuestionsScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const question = route?.params?.question ?? 'Kisisel gelisim icin ne onerirsin?';
  const navigation = useNavigation<any>();

  if (state === 'loading') {
    return (
      <ScreenLayout title="AI Yaniti">
        <SkeletonBlock height={48} />
        <SkeletonBlock height={24} />
        <SkeletonBlock height={160} />
        <SkeletonBlock height={40} />
        <PActivityIndicator animating style={{ marginTop: spacing[2] }} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="AI Yaniti">
        <StateMessage
          title="Yanit bulunamadi"
          description="Bu soruya uygun kaynak bulunamadi. Farkli bir soru dene."
          actionLabel="Geri Don"
          onAction={() => navigation.goBack()}
          icon="chat-question-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="AI Yaniti">
        <StateMessage
          title="Yanit olusturulamadi"
          description="AI servisi su an yanit veremiyor. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          onAction={() => navigation.goBack()}
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="AI Yaniti">
        <OfflineNotice />
        <DiscoverAIAssistantQuestionsContent isOffline question={question} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="AI Yaniti">
      <DiscoverAIAssistantQuestionsContent question={question} />
    </ScreenLayout>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    // Thinking state
    thinkingContainer: {
      alignItems: 'center',
      paddingVertical: spacing[4],
    },
    thinkingIconWrap: {
      marginBottom: spacing[2],
    },
    thinkingTitle: {
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: spacing[1],
      textAlign: 'center',
    },
    thinkingSubtitle: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      textAlign: 'center',
      marginBottom: spacing[2],
      maxWidth: 260,
    },
    thinkingBar: {
      width: '80%',
      height: 6,
      borderRadius: radii.full,
      marginBottom: spacing[2.5],
    },
    sourceTypePills: {
      flexDirection: 'row',
      gap: spacing[1],
    },
    sourceTypePill: {
      backgroundColor: c.surfaceVariant,
      borderRadius: radii.full,
      paddingHorizontal: spacing[1.5],
      paddingVertical: 4,
    },
    sourceTypePillText: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
    },
    // Ready state
    questionBubble: {
      backgroundColor: c.secondaryContainer,
      borderRadius: radii.xl,
      padding: spacing[2],
      marginBottom: spacing[2],
    },
    questionLabel: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.semiBold,
      color: c.onSecondaryContainer,
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    questionText: {
      fontSize: fontSizes.xl,
      color: c.onSecondaryContainer,
      fontWeight: fontWeights.semiBold,
    },
    sourceCountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing[1.5],
      flexWrap: 'wrap',
      gap: spacing[1],
    },
    sourceCountText: {
      fontSize: fontSizes.md,
      color: c.textTertiary,
      fontWeight: fontWeights.semiBold,
    },
    sourceTypeBadges: {
      flexDirection: 'row',
      gap: 6,
    },
    sourceTypeBadge: {
      backgroundColor: c.primaryContainer,
      borderRadius: radii.full,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    sourceTypeBadgeText: {
      fontSize: fontSizes.sm,
      color: c.onPrimaryContainer,
      fontWeight: fontWeights.semiBold,
    },
    responseCard: {
      padding: spacing[2],
      marginBottom: spacing[2],
    },
    responseSummary: {
      fontSize: fontSizes.xl,
      color: c.textPrimary,
      lineHeight: 24,
      marginBottom: spacing[1.5],
    },
    divider: {
      marginBottom: spacing[1.5],
    },
    bulletHeading: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.textTertiary,
      marginBottom: spacing[1],
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    bulletRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 8,
      marginBottom: 8,
    },
    bulletDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: c.primary,
      marginTop: 7,
      flexShrink: 0,
    },
    bulletText: {
      flex: 1,
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      lineHeight: 22,
    },
    sourcesButton: {
      marginBottom: spacing[3],
    },
    // Follow-up chips — horizontal wrap (AC-FR-E16-02-04)
    followUpSection: {
      marginBottom: spacing[2],
    },
    followUpLabel: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.semiBold,
      color: c.textTertiary,
      marginBottom: spacing[1],
    },
    followUpGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1],
    },
    followUpChip: {
      backgroundColor: c.surfaceVariant,
    },
  });
}
