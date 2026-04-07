// AC-FR-E16-04-01: progress-based AI insight cards
// AC-FR-E16-04-02: sentiment analysis bars from comments/journals
// AC-FR-E16-04-03: repeated behaviour patterns — pill list
// AC-FR-E16-04-04: personalised next-step recommendation list

import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PDivider, PText } from '../../components';
import {
  getAchievements,
  getComments,
  getContentProgressForUser,
  getJourneys,
  getPrimaryUser,
  getWorkshops,
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Insight = {
  id: string;
  icon: string;
  title: string;
  body: string;
  tone: 'positive' | 'neutral' | 'action';
};

type SentimentResult = {
  positive: number;
  neutral: number;
  developing: number;
  summary: string;
};

type Pattern = {
  id: string;
  label: string;
  count: number;
  icon: string;
};

type Recommendation = {
  id: string;
  title: string;
  reason: string;
  cta: string;
  navKey: string;
  navParams: Record<string, string>;
};

// ---------------------------------------------------------------------------
// Mock data builders (AC-FR-E16-04-01..04)
// ---------------------------------------------------------------------------
function buildInsights(userId?: string): Insight[] {
  const progress = getContentProgressForUser(userId);
  const completed = progress.filter(p => p.status === 'completed').length;
  const inProgress = progress.filter(p => p.status === 'in_progress').length;
  const achievements = getAchievements().filter(a => a.user_id === userId);

  return [
    {
      id: 'ins-1',
      icon: '📈',
      title: 'Ilerleme Hizin Artiyor',
      body: `Son 7 gunde ${completed > 0 ? completed : 3} icerik tamamlandi — bu haftalik ortalamanin uzerinde.`,
      tone: 'positive',
    },
    {
      id: 'ins-2',
      icon: '🎯',
      title: 'Aktif Odak Alani',
      body:
        inProgress > 0
          ? `Su an ${inProgress} icerik uzerinde aktif calisiyorsun. Surekillik en guclu degisim motorudur.`
          : 'Henuz aktif icerik yok. Duruma uygun bir yolculuk baslatmani oneririz.',
      tone: inProgress > 0 ? 'neutral' : 'action',
    },
    {
      id: 'ins-3',
      icon: '🏅',
      title: 'Rozet Kazanimlari',
      body:
        achievements.length > 0
          ? `${achievements.length} rozet kazandin. Yolculuk tamamlamalari rozet sayini arttirir.`
          : 'Henuz rozet kazanilmadi. Ilk yolculugunu tamamladiginda ilk rozetini alacaksin.',
      tone: achievements.length > 0 ? 'positive' : 'action',
    },
  ];
}

function buildSentiment(userId?: string): SentimentResult {
  const comments = getComments().filter((c: any) => c.user_id === userId);
  if (comments.length === 0) {
    return {
      positive: 58,
      neutral: 32,
      developing: 10,
      summary:
        'Gunluk girislerindeki ton genel olarak olumlu. Oz-farkindalik gozlemlenebilir duzyde artti.',
    };
  }
  const avgWords =
    comments.reduce((s: number, c: any) => s + (c.word_count ?? 0), 0) / comments.length;
  const positive = Math.min(90, Math.round(40 + avgWords * 5));
  const neutral = Math.round((100 - positive) * 0.7);
  const developing = 100 - positive - neutral;
  return {
    positive,
    neutral,
    developing,
    summary: `${comments.length} gunluk girisi analiz edildi. Ortalama kelime sayisi ${Math.round(avgWords)} — derinlemesine yansitma gozlemleniyor.`,
  };
}

function buildPatterns(): Pattern[] {
  return [
    { id: 'p1', label: 'Sabah seansları', count: 7, icon: '🌅' },
    { id: 'p2', label: 'Duygusal denge odagi', count: 5, icon: '🧘' },
    { id: 'p3', label: 'Okuma tercihi', count: 4, icon: '📖' },
    { id: 'p4', label: 'Kisa seans (20 dk)', count: 8, icon: '⏱' },
  ];
}

function buildRecommendations(): Recommendation[] {
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const recs: Recommendation[] = [];

  if (journeys[0]) {
    recs.push({
      id: 'r1',
      title: journeys[0].title,
      reason: 'Ilerleme verilerin bu yolculukla yuksek uyum gosteriyor.',
      cta: 'Yolculuga Basla',
      navKey: 'Content',
      navParams: { screen: 'ContentJourneyDetail', id: journeys[0].id },
    });
  }

  if (workshops[0]) {
    recs.push({
      id: 'r2',
      title: workshops[0].title,
      reason: 'Sabah rutini desenin bu atolye icerigiyle ortusuyor.',
      cta: 'Atolyeyi Incele',
      navKey: 'Content',
      navParams: { screen: 'ContentWorkshopDetail', id: workshops[0].id },
    });
  }

  recs.push({
    id: 'r3',
    title: 'Haftalik Ilerleme Raporu',
    reason: 'Tamamlama istatistiklerini ve egilimlerini gormek icin raporu incele.',
    cta: 'Raporu Gor',
    navKey: 'Progress',
    navParams: { screen: 'ProgressWeeklySummary' },
  });

  return recs;
}

// ---------------------------------------------------------------------------
// SentimentBar — named styles to avoid re-creating objects on every render
// ---------------------------------------------------------------------------
const SentimentBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeSentimentBarStyles(c), [c]);

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <PText style={styles.label}>{label}</PText>
        <PText style={styles.value}>%{value}</PText>
      </View>
      <View
        style={styles.track}
        accessibilityLabel={`${label}: yuzde ${value}`}
        accessibilityRole="progressbar"
      >
        <View style={[styles.fill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

function makeSentimentBarStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: { marginBottom: spacing[1] },
    labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    label: { fontSize: fontSizes.md, color: c.textSecondary },
    value: { fontSize: fontSizes.md, fontWeight: fontWeights.bold, color: c.textPrimary },
    track: {
      height: 8,
      borderRadius: radii.full,
      backgroundColor: c.outlineVariant,
      overflow: 'hidden',
    },
    fill: { height: '100%', borderRadius: radii.full },
  });
}

// ---------------------------------------------------------------------------
// Ready content
// ---------------------------------------------------------------------------
const DiscoverAssistantInsightsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();

  const user = getPrimaryUser();
  const insights = useMemo(() => buildInsights(user?.id), [user?.id]);
  const sentiment = useMemo(() => buildSentiment(user?.id), [user?.id]);
  const patterns = useMemo(() => buildPatterns(), []);
  const recommendations = useMemo(() => buildRecommendations(), []);

  const toneColors: Record<Insight['tone'], string> = {
    positive: c.tertiaryContainer,
    neutral: c.primaryContainer,
    action: c.secondaryContainer,
  };
  const toneOnColors: Record<Insight['tone'], string> = {
    positive: c.onTertiaryContainer,
    neutral: c.onPrimaryContainer,
    action: c.onSecondaryContainer,
  };

  return (
    <View>
      {/* Page header */}
      <View style={styles.pageHeader}>
        <PText style={styles.pageTitle} accessibilityRole="header">
          AI Icgoruler
        </PText>
        <PText style={styles.pageSubtitle}>Ilerleme verilerine dayali kisisel analiz</PText>
      </View>

      {/* AC-FR-E16-04-01: progress-based insight cards */}
      <PText style={styles.sectionLabel}>Ilerleme Icgoruler</PText>
      {insights.map(ins => (
        <View
          key={ins.id}
          style={[styles.insightCard, { backgroundColor: toneColors[ins.tone] }]}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`${ins.title}: ${ins.body}`}
        >
          <View style={styles.insightRow}>
            <PText style={styles.insightIcon} accessibilityElementsHidden>
              {ins.icon}
            </PText>
            <View style={styles.insightBody}>
              <PText style={[styles.insightTitle, { color: toneOnColors[ins.tone] }]}>
                {ins.title}
              </PText>
              <PText style={[styles.insightText, { color: toneOnColors[ins.tone] }]}>
                {ins.body}
              </PText>
            </View>
          </View>
        </View>
      ))}

      <PDivider style={styles.sectionDivider} />

      {/* AC-FR-E16-04-02: sentiment analysis */}
      <PCard style={styles.card}>
        <PText style={styles.cardTitle}>Duygu Analizi</PText>
        <PText style={styles.cardSubtitle}>{sentiment.summary}</PText>
        <PDivider style={styles.divider} />
        <SentimentBar label="Olumlu" value={sentiment.positive} color={c.tertiary} />
        <SentimentBar label="Notr" value={sentiment.neutral} color={c.primary} />
        <SentimentBar label="Gelisim Alani" value={sentiment.developing} color={c.secondary} />
      </PCard>

      {/* AC-FR-E16-04-03: behaviour patterns */}
      <PCard style={styles.card}>
        <PText style={styles.cardTitle}>Davranis Desenleri</PText>
        <PText style={styles.cardSubtitle}>AI tarafindan tespit edilen tekrarlayan odak alanlari</PText>
        <PDivider style={styles.divider} />
        <View style={styles.patternsGrid}>
          {patterns.map(p => (
            <View
              key={p.id}
              style={styles.patternPill}
              accessible
              accessibilityRole="text"
              accessibilityLabel={`${p.label}, ${p.count} kez`}
            >
              <PText style={styles.patternIcon} accessibilityElementsHidden>
                {p.icon}
              </PText>
              <PText style={styles.patternLabel}>{p.label}</PText>
              <View style={styles.patternCountBadge}>
                <PText style={styles.patternCount}>{p.count}x</PText>
              </View>
            </View>
          ))}
        </View>
      </PCard>

      <PDivider style={styles.sectionDivider} />

      {/* AC-FR-E16-04-04: next-step recommendations */}
      <PText style={styles.sectionLabel}>Kisisel Oneriler</PText>
      {recommendations.map((rec, idx) => (
        <View key={rec.id}>
          <View style={styles.recRow} accessible accessibilityRole="none">
            <View style={styles.recInfo}>
              <PText style={styles.recTitle}>{rec.title}</PText>
              <PText style={styles.recReason}>{rec.reason}</PText>
            </View>
            <PButton
              mode="outlined"
              compact
              disabled={isOffline}
              onPress={() => {
                // AC-FR-E16-04-04: assistant_recommendation_tapped
                if (rec.navParams.screen) {
                  navigation.navigate(rec.navKey, rec.navParams);
                } else {
                  navigation.navigate(rec.navKey);
                }
              }}
              accessibilityLabel={rec.cta}
              accessibilityHint={`${rec.title} icin ${rec.cta.toLowerCase()}`}
            >
              {rec.cta}
            </PButton>
          </View>
          {idx < recommendations.length - 1 && <PDivider />}
        </View>
      ))}

      {/* Bottom spacer — clears tab bar */}
      <View style={styles.bottomSpacer} />
    </View>
  );
};

// ---------------------------------------------------------------------------
// Screen shell — all states
// ---------------------------------------------------------------------------
export const DiscoverAssistantInsightsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);
  const navigation = useNavigation<any>();

  if (state === 'loading') {
    return (
      <ScreenLayout title="AI Icgoruleri">
        <SkeletonBlock height={64} />
        <SkeletonBlock height={72} />
        <SkeletonBlock height={72} />
        <SkeletonBlock height={140} />
        <SkeletonBlock height={120} />
        <PActivityIndicator animating style={{ marginTop: spacing[2] }} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="AI Icgoruleri">
        <StateMessage
          title="Henuz icgoru yok"
          description="Icerik tamamladikca AI icgorulerin burada goruntulenecek."
          actionLabel="Icerik Katalogu"
          onAction={() => navigation.navigate('DiscoverCatalog')}
          icon="lightbulb-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="AI Icgoruleri">
        <StateMessage
          title="Icgorüler yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
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
      <ScreenLayout title="AI Icgoruleri">
        <OfflineNotice />
        <DiscoverAssistantInsightsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="AI Icgoruleri">
      <DiscoverAssistantInsightsContent />
    </ScreenLayout>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    pageHeader: { marginBottom: spacing[2.5] },
    pageTitle: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 4,
    },
    pageSubtitle: {
      fontSize: fontSizes.xl,
      color: c.textSecondary,
    },
    sectionLabel: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.textTertiary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: spacing[1.5],
    },
    sectionDivider: { marginVertical: spacing[2] },
    insightCard: {
      borderRadius: radii.xl,
      padding: spacing[2],
      marginBottom: spacing[1.5],
    },
    insightRow: {
      flexDirection: 'row',
      gap: spacing[1.5],
      alignItems: 'flex-start',
    },
    insightIcon: {
      fontSize: fontSizes['4xl'],
      lineHeight: 28,
      marginTop: 2,
    },
    insightBody: { flex: 1 },
    insightTitle: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      marginBottom: 4,
    },
    insightText: {
      fontSize: fontSizes.lg,
      lineHeight: 22,
    },
    card: {
      padding: spacing[2],
      marginBottom: spacing[2.5],
    },
    cardTitle: {
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 6,
    },
    cardSubtitle: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      marginBottom: spacing[1],
    },
    divider: { marginBottom: spacing[1.5] },
    patternsGrid: { gap: spacing[1] },
    patternPill: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.surfaceVariant,
      borderRadius: radii.lg,
      paddingHorizontal: spacing[1.5],
      paddingVertical: 10,
      gap: spacing[1],
      minHeight: 44,
    },
    patternIcon: { fontSize: fontSizes.xl },
    patternLabel: {
      flex: 1,
      fontSize: fontSizes.lg,
      color: c.textPrimary,
      fontWeight: fontWeights.medium,
    },
    patternCountBadge: {
      backgroundColor: c.primaryContainer,
      borderRadius: radii.full,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    patternCount: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
      color: c.onPrimaryContainer,
    },
    recRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing[1.5],
      gap: spacing[1.5],
      minHeight: 56,
    },
    recInfo: { flex: 1 },
    recTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginBottom: 2,
    },
    recReason: {
      fontSize: fontSizes.md,
      color: c.textSecondary,
      lineHeight: 18,
    },
    // Enough clearance for bottom tab bar
    bottomSpacer: { height: spacing[4] },
  });
}
