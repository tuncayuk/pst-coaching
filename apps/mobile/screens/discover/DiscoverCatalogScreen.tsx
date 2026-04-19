import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';

import { trackCtaTap } from '../../analytics';
import {
  DiscoverAssistantPair,
  DiscoverContentMosaicGrid,
  DiscoverEbookCard,
  DiscoverJourneyCard,
  MosaicTab,
  PActivityIndicator,
  PText
} from '../../components';
import {
  getEbooks,
  getJourneys,
  getModules,
  getPrimaryUser,
  getSubscriptionForUser,
  getWorkshops
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const CONTENT_TABS: readonly MosaicTab[] = [
  { key: 'journeys', label: 'Yolculuklar', emoji: '🎯' },
  { key: 'workshops', label: 'Atolyeler', emoji: '🎨' },
  { key: 'modules', label: 'Moduller', emoji: '📦' },
  { key: 'ebooks', label: 'e-Kitaplar', emoji: '📖' }
];

const TAB_ROUTES: Record<string, string> = {
  journeys: 'DiscoverJourneys',
  workshops: 'DiscoverWorkshops',
  modules: 'DiscoverModules',
  ebooks: 'DiscoverEbooks'
};

const DiscoverReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = React.useState<string>('journeys');

  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const isGuest = !user;
  const requiresSubscription = !isGuest && subscription?.status !== 'active' && subscription?.status !== 'trial';

  const journeys = getJourneys();
  const ebooks = getEbooks();
  const workshops = getWorkshops();
  const modules = getModules();

  const featuredJourneys = journeys.filter(j => j.featured).slice(0, 3);
  const featuredEbooks = ebooks.filter(e => e.featured).slice(0, 4);

  const tabCounts = [journeys.length, workshops.length, modules.length, ebooks.length];

  const handlePaywall = () => {
    trackCtaTap('discover.catalog', 'paywall_trigger');
    navigation.navigate('Content', { screen: 'ContentPaywall' });
  };

  const handleTabPress = (tab: MosaicTab) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    setActiveTab(tab.key);
    trackCtaTap('discover.catalog', 'tab_tapped', { tab: tab.key });
    navigation.navigate(TAB_ROUTES[tab.key]);
  };

  const handleJourneyPress = (id: string) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    trackCtaTap('discover.catalog', 'journey_card_tapped', { id });
    navigation.navigate('Content', { screen: 'ContentJourneyDetail', params: { id } });
  };

  const handleEbookPress = (id: string) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    trackCtaTap('discover.catalog', 'ebook_card_tapped', { id });
    navigation.navigate('Content', { screen: 'ContentEbookDetail', params: { id } });
  };

  const handleAssistantPress = () => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    trackCtaTap('discover.catalog', 'assistant_tapped');
    navigation.navigate('DiscoverAssistantIntro');
  };

  const handleAIAssistantPress = () => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    trackCtaTap('discover.catalog', 'ai_assistant_tapped');
    navigation.navigate('DiscoverAIAssistantIntro');
  };

  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <PText style={styles.greeting}>Merhaba 👋</PText>
          <PText style={styles.title}>Kesfedin</PText>
        </View>
        {isGuest && (
          <View style={styles.guestBadge}>
            <PText style={styles.guestBadgeText}>Misafir</PText>
          </View>
        )}
      </View>

      {/* Asistanlar — dual entry: quiz-based + AI free-text */}
      <PText style={styles.sectionTitle}>Asistanlar</PText>
      <DiscoverAssistantPair
        onContentPress={handleAssistantPress}
        onAIPress={handleAIAssistantPress}
        disabled={isOffline}
      />

      {/* Content type mosaic */}
      <PText style={styles.sectionTitle}>Icerik Turleri</PText>
      <DiscoverContentMosaicGrid
        tabs={CONTENT_TABS}
        counts={tabCounts}
        activeTab={activeTab}
        onTabPress={handleTabPress}
        disabled={isOffline}
      />

      {/* Featured Journeys */}
      {featuredJourneys.length > 0 && (
        <View style={styles.section}>
          <PText style={styles.sectionTitle}>One Cikan Yolculuklar</PText>
          {featuredJourneys.map((journey, index) => (
            <DiscoverJourneyCard
              key={journey.id}
              journey={journey}
              index={index}
              showFreeBadge={!requiresSubscription}
              onPress={() => handleJourneyPress(journey.id)}
            />
          ))}
        </View>
      )}

      {/* Featured eBooks */}
      {featuredEbooks.length > 0 && (
        <View style={styles.section}>
          <PText style={styles.sectionTitle}>Populer e-Kitaplar</PText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ebookRow}>
            {featuredEbooks.map((ebook, index) => (
              <DiscoverEbookCard
                key={ebook.id}
                ebook={ebook}
                index={index}
                onPress={() => handleEbookPress(ebook.id)}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverCatalogScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);
  const navigation = useNavigation<any>();

  if (state === 'loading') {
    return (
      <ScreenLayout title="Kesfedin" headerVariant="none" contentStyle={styles.catalogContent}>
        <SkeletonBlock height={24} />
        <SkeletonBlock height={72} />
        <SkeletonBlock height={40} />
        <SkeletonBlock height={100} />
        <SkeletonBlock height={100} />
        <PActivityIndicator animating />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Kesfedin" headerVariant="none" contentStyle={styles.catalogContent}>
        <StateMessage
          title="Henuz icerik yok"
          description="Yakinda yeni yolculuklar ve atolyeler eklenecek."
          actionLabel="Bildirimleri Ac"
          onAction={() => Linking.openSettings()}
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Kesfedin" headerVariant="none" contentStyle={styles.catalogContent}>
        <StateMessage
          title="Icerik yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          onAction={() => navigation.setParams({ state: undefined })}
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Kesfedin" headerVariant="none" contentStyle={styles.catalogContent}>
        <OfflineNotice />
        <DiscoverReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kesfedin" headerVariant="none" contentStyle={styles.catalogContent}>
      <DiscoverReadyContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    catalogContent: {
      paddingHorizontal: spacing[2.5],
      paddingTop: spacing[2.5],
      paddingBottom: 96
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing[2.5]
    },
    greeting: {
      fontSize: fontSizes.lg,
      color: c.textTertiary,
      fontWeight: fontWeights.medium,
      marginBottom: 2
    },
    title: {
      fontSize: fontSizes['9xl'],
      fontWeight: fontWeights.extraBold,
      color: c.textBrand,
      letterSpacing: -0.5
    },
    guestBadge: {
      backgroundColor: c.warningContainer,
      paddingHorizontal: spacing[1],
      paddingVertical: spacing[0.5],
      borderRadius: radii.lg,
      alignSelf: 'flex-start',
      marginTop: spacing[0.5]
    },
    guestBadgeText: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      color: c.onWarningContainer
    },
    sectionTitle: {
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: spacing[1.5]
    },
    section: {
      marginBottom: spacing[3]
    },
    ebookRow: {
      gap: spacing[1.5],
      paddingBottom: 4
    },
    bottomSpacer: {
      height: spacing[3]
    }
  });
}
