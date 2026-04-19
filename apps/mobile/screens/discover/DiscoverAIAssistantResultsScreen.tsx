// AC-FR-E16-03-01: source card — type badge, title, content path
// AC-FR-E16-03-02: deep-link to original content (44 pt minimum touch target)
// AC-FR-E16-03-03: context excerpt / italic quote with left accent border
// AC-FR-E16-03-04: relevance score as percentage + 8 px progress bar
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PDivider, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getEbooks, getJourneys, getModules, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type SourceCard = {
  id: string;
  contentType: 'journey' | 'workshop' | 'ebook' | 'module';
  typeLabel: string;
  typeIcon: string;
  title: string;
  contentPath: string;
  excerpt: string;
  relevanceScore: number; // 0-100
  navParams: { stack: string; screen: string; id: string };
};

// Theme-aware type colors — no hardcoded hex (safe in dark mode)
function getTypeColors(c: ColorTokens): Record<SourceCard['contentType'], { bg: string; on: string }> {
  return {
    journey: { bg: c.tertiaryContainer, on: c.onTertiaryContainer },
    workshop: { bg: c.primaryContainer, on: c.onPrimaryContainer },
    ebook: { bg: c.secondaryContainer, on: c.onSecondaryContainer },
    module: { bg: c.surfaceVariant, on: c.onSurfaceVariant }
  };
}

function buildSourceCards(): SourceCard[] {
  const journeys = getJourneys().slice(0, 2);
  const workshops = getWorkshops().slice(0, 1);
  const ebooks = getEbooks().slice(0, 1);
  const modules = getModules().slice(0, 1);

  const cards: SourceCard[] = [];

  journeys.forEach((j, i) => {
    cards.push({
      id: `j-${j.id}`,
      contentType: 'journey',
      typeLabel: 'Yolculuk',
      typeIcon: '🗺',
      title: j.title,
      contentPath: `Yolculuklar › ${j.title}`,
      excerpt:
        j.description ??
        'Bu yolculuk, gunluk adimlarla kisisel donusumu destekleyen yapilandirilmis bir program sunar.',
      relevanceScore: 94 - i * 8,
      navParams: { stack: 'Content', screen: 'ContentJourneyDetail', id: j.id }
    });
  });

  workshops.forEach(w => {
    cards.push({
      id: `w-${w.id}`,
      contentType: 'workshop',
      typeLabel: 'Atolye',
      typeIcon: '🎓',
      title: w.title,
      contentPath: `Atolyeler › ${w.title}`,
      excerpt:
        w.description ?? 'Bu atolye, odaklanmis pratik egzersizlerle konuya derinlemesine yaklasim imkani sunar.',
      relevanceScore: 81,
      navParams: { stack: 'Content', screen: 'ContentWorkshopDetail', id: w.id }
    });
  });

  ebooks.forEach(e => {
    cards.push({
      id: `e-${e.id}`,
      contentType: 'ebook',
      typeLabel: 'e-Kitap',
      typeIcon: '📖',
      title: e.title,
      contentPath: `e-Kitaplar › ${e.title}`,
      excerpt:
        e.description ?? 'Bu kitap, teorik altyapiyi guclenrdirmek icin kapsamli kaynaklar ve referanslar icerir.',
      relevanceScore: 73,
      navParams: { stack: 'Content', screen: 'ContentEbookDetail', id: e.id }
    });
  });

  modules.forEach(m => {
    cards.push({
      id: `m-${m.id}`,
      contentType: 'module',
      typeLabel: 'Modul',
      typeIcon: '📦',
      title: m.title,
      contentPath: `Moduller › ${m.title}`,
      excerpt: m.description ?? 'Bu modul, konuyu adim adim ele alan paket icerikler sunar.',
      relevanceScore: 68,
      navParams: { stack: 'Content', screen: 'ContentModuleHome', id: m.id }
    });
  });

  return cards.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// ---------------------------------------------------------------------------
// Relevance bar — 8 px for legibility (AC-FR-E16-03-04)
// ---------------------------------------------------------------------------
const RelevanceBar = ({ score, c }: { score: number; c: ColorTokens }) => {
  const barColor = score >= 80 ? c.tertiary : score >= 60 ? c.primary : c.textTertiary;
  return (
    <View
      style={{ flex: 1, height: 8, borderRadius: 4, backgroundColor: c.outlineVariant, overflow: 'hidden' }}
      accessibilityElementsHidden
    >
      <View style={{ width: `${score}%`, height: '100%', backgroundColor: barColor, borderRadius: 4 }} />
    </View>
  );
};

// ---------------------------------------------------------------------------
// Source card item (AC-FR-E16-03-01..04)
// ---------------------------------------------------------------------------
const SourceCardItem = ({
  source,
  isOffline,
  isLast
}: {
  source: SourceCard;
  isOffline?: boolean;
  isLast: boolean;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const typeColors = useMemo(() => getTypeColors(c), [c]);
  const navigation = useNavigation<any>();
  const palette = typeColors[source.contentType];

  const handleDeepLink = () => {
    if (isOffline) return;
    navigation.navigate(source.navParams.stack, {
      screen: source.navParams.screen,
      params: { id: source.navParams.id }
    });
  };

  return (
    <View>
      <View
        style={styles.sourceCard}
        accessible
        accessibilityRole="none"
        accessibilityLabel={`${source.typeLabel}: ${source.title}, ilgililik yuzde ${source.relevanceScore}`}
      >
        {/* AC-FR-E16-03-01: type badge + relevance score */}
        <View style={styles.sourceHeader}>
          <View style={[styles.typeBadge, { backgroundColor: palette.bg }]}>
            <PText style={[styles.typeBadgeText, { color: palette.on }]}>
              {source.typeIcon} {source.typeLabel}
            </PText>
          </View>
          {/* AC-FR-E16-03-04: relevance score bar */}
          <View style={styles.scoreRow}>
            <RelevanceBar score={source.relevanceScore} c={c} />
            <PText style={styles.scoreText} accessibilityLabel={`Ilgililik: yuzde ${source.relevanceScore}`}>
              %{source.relevanceScore}
            </PText>
          </View>
        </View>

        <PText style={styles.sourceTitle}>{source.title}</PText>

        {/* AC-FR-E16-03-01: content breadcrumb path */}
        <PText style={styles.sourcePath} numberOfLines={1}>
          {source.contentPath}
        </PText>

        {/* AC-FR-E16-03-03: italic excerpt with left accent border */}
        <View style={styles.excerptBox}>
          <PText style={styles.excerptText} numberOfLines={3}>
            "{source.excerpt}"
          </PText>
        </View>

        {/* AC-FR-E16-03-02: deep-link CTA — 44 pt minimum touch target */}
        <TouchableOpacity
          style={styles.deepLinkButton}
          onPress={handleDeepLink}
          disabled={isOffline}
          accessibilityRole="button"
          accessibilityLabel={`${source.title} icerigine git`}
          accessibilityHint="Orijinal icerik sayfasini acar"
          activeOpacity={0.7}
        >
          <PText style={styles.deepLinkText}>Icerige Git</PText>
          <PText style={styles.deepLinkArrow}>›</PText>
        </TouchableOpacity>
      </View>
      {!isLast && <PDivider />}
    </View>
  );
};

// ---------------------------------------------------------------------------
// Ready content
// ---------------------------------------------------------------------------
const DiscoverAIAssistantResultsContent = ({ isOffline, question }: { isOffline?: boolean; question: string }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();
  const sources = useMemo(() => buildSourceCards(), []);

  return (
    <View>
      {/* Page header */}
      <View style={styles.pageHeader}>
        <PText style={styles.pageTitle} accessibilityRole="header">
          Kullanilan Kaynaklar
        </PText>
        <PText style={styles.pageSubtitle}>
          "{question}" sorusu icin {sources.length} kaynak kullanildi
        </PText>
      </View>

      {/* Source card list */}
      <View style={styles.cardContainer}>
        {sources.map((source, idx) => (
          <SourceCardItem key={source.id} source={source} isOffline={isOffline} isLast={idx === sources.length - 1} />
        ))}
      </View>

      {/* Insights CTA */}
      <PButton
        mode="contained"
        disabled={isOffline}
        onPress={() => navigation.navigate('DiscoverAssistantInsights')}
        style={styles.insightsButton}
        accessibilityLabel="AI icgoruleri goruntule"
        accessibilityHint="Ilerlemenize dayali kisisel icgorüler ekranini acar"
      >
        AI Icgorulerimi Gor
      </PButton>

      <PButton
        mode="text"
        onPress={() => navigation.navigate('DiscoverAIAssistantIntro')}
        accessibilityLabel="Yeni soru sor"
      >
        Yeni Soru Sor
      </PButton>
    </View>
  );
};

// ---------------------------------------------------------------------------
// Screen shell — all states
// ---------------------------------------------------------------------------
type RouteParams = { state?: ScreenState; question?: string };

export const DiscoverAIAssistantResultsScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const question = route?.params?.question ?? 'Sorunuz';
  const navigation = useNavigation<any>();

  if (state === 'loading') {
    return (
      <ScreenLayout title="Kaynaklar">
        <SkeletonBlock height={40} />
        <SkeletonBlock height={128} />
        <SkeletonBlock height={128} />
        <SkeletonBlock height={128} />
        <PActivityIndicator animating style={{ marginTop: spacing[2] }} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Kaynaklar">
        <StateMessage
          title="Kaynak bulunamadi"
          description="Bu yanit icin kullanilan icerik kaynagi artik mevcut degil."
          actionLabel="Yeni Soru Sor"
          onAction={() => navigation.navigate('DiscoverAIAssistantIntro')}
          icon="bookshelf"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Kaynaklar">
        <StateMessage
          title="Kaynaklar yuklenemedi"
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
      <ScreenLayout title="Kaynaklar">
        <OfflineNotice />
        <DiscoverAIAssistantResultsContent isOffline question={question} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kaynaklar">
      <DiscoverAIAssistantResultsContent question={question} />
    </ScreenLayout>
  );
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    pageHeader: {
      marginBottom: spacing[2.5]
    },
    pageTitle: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 4
    },
    pageSubtitle: {
      fontSize: fontSizes.lg,
      color: c.textSecondary
    },
    cardContainer: {
      backgroundColor: c.surface,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: c.outlineVariant,
      overflow: 'hidden',
      marginBottom: spacing[2]
    },
    sourceCard: {
      padding: spacing[2]
    },
    sourceHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing[1],
      gap: spacing[1]
    },
    typeBadge: {
      borderRadius: radii.full,
      paddingHorizontal: spacing[1.5],
      paddingVertical: 4,
      flexShrink: 0
    },
    typeBadgeText: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold
    },
    scoreRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
      justifyContent: 'flex-end'
    },
    scoreText: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
      color: c.primary,
      minWidth: 36,
      textAlign: 'right'
    },
    sourceTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 4
    },
    sourcePath: {
      fontSize: fontSizes.md,
      color: c.textTertiary,
      marginBottom: spacing[1]
    },
    excerptBox: {
      backgroundColor: c.surfaceVariant,
      borderRadius: radii.lg,
      padding: spacing[1.5],
      marginBottom: spacing[1.5],
      borderLeftWidth: 3,
      borderLeftColor: c.primary
    },
    excerptText: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      lineHeight: 22,
      fontStyle: 'italic'
    },
    // 44 pt minimum touch target (AC-FR-E16-03-02)
    deepLinkButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 4,
      paddingVertical: 10,
      paddingHorizontal: 2,
      minHeight: 44
    },
    deepLinkText: {
      fontSize: fontSizes.lg,
      color: c.textAccent,
      fontWeight: fontWeights.semiBold
    },
    deepLinkArrow: {
      fontSize: fontSizes['2xl'],
      color: c.textAccent,
      fontWeight: fontWeights.bold,
      lineHeight: 22
    },
    insightsButton: {
      marginBottom: spacing[1]
    }
  });
}
