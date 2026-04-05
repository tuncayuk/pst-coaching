import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Linking, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PActivityIndicator, PCard, PText } from "../components";
import { trackCtaTap } from "../analytics";
import {
  getEbooks,
  getJourneys,
  getModules,
  getPrimaryUser,
  getSubscriptionForUser,
  getWorkshops,
} from "../data/mockSelectors";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenState, resolveScreenState } from "./components/ScreenState";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";

const CONTENT_TABS = [
  { key: "journeys", label: "Yolculuklar", emoji: "🎯", screen: "DiscoverJourneys" },
  { key: "workshops", label: "Atolyeler", emoji: "🎨", screen: "DiscoverWorkshops" },
  { key: "modules", label: "Moduller", emoji: "📦", screen: "DiscoverModules" },
  { key: "ebooks", label: "e-Kitaplar", emoji: "📖", screen: "DiscoverEbooks" },
];

const LEVEL_LABELS: Record<string, string> = {
  baslangic: "Baslangic",
  beginner: "Baslangic",
  orta: "Orta",
  intermediate: "Orta",
  ileri: "Ileri",
  advanced: "Ileri",
};

const JOURNEY_COLORS = ["#FFDDC1", "#D1FAE5", "#E9D5FF", "#FDE68A"];
const JOURNEY_EMOJIS = ["🎯", "🙏", "🌿", "🧘"];
const EBOOK_COLORS = ["#B2EBF2", "#D1FAE5", "#E9D5FF", "#FDE68A"];
const EBOOK_EMOJIS = ["📖", "📘", "📕", "📗"];
const MOSAIC_COLORS = ["#E9D5FF", "#D1FAE5", "#FDE68A", "#B2EBF2"];

const DiscoverReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = React.useState<string>("journeys");
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const isGuest = !user;
  const requiresSubscription =
    !isGuest && subscription?.status !== "active" && subscription?.status !== "trial";
  const journeys = getJourneys();
  const ebooks = getEbooks();
  const workshops = getWorkshops();
  const modules = getModules();
  const featuredJourneys = journeys.filter((j) => j.featured).slice(0, 3);
  const featuredEbooks = ebooks.filter((e) => e.featured).slice(0, 4);

  const handlePaywall = () => {
    trackCtaTap("discover.catalog", "paywall_trigger");
    navigation.navigate("Content", { screen: "ContentPaywall" });
  };

  const handleTabPress = (tab: (typeof CONTENT_TABS)[number]) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    setActiveTab(tab.key);
    trackCtaTap("discover.catalog", "tab_tapped", { tab: tab.key });
    navigation.navigate(tab.screen);
  };

  const handleJourneyPress = (id: string) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    trackCtaTap("discover.catalog", "journey_card_tapped", { id });
    navigation.navigate("Content", { screen: "ContentJourneyDetail", params: { id } });
  };

  const handleEbookPress = (id: string) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    trackCtaTap("discover.catalog", "ebook_card_tapped", { id });
    navigation.navigate("Content", { screen: "ContentEbookDetail", params: { id } });
  };

  const handleAssistantPress = () => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    trackCtaTap("discover.catalog", "assistant_tapped");
    navigation.navigate("DiscoverAssistantIntro");
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

      {/* Assistant CTA */}
      <PCard style={styles.assistantCard} onPress={handleAssistantPress}>
        <View style={styles.assistantRow}>
          <View style={styles.assistantIconWrap}>
            <PText style={styles.assistantEmoji}>🤖</PText>
          </View>
          <View style={styles.assistantInfo}>
            <PText style={styles.assistantTitle}>Icerik Asistani</PText>
            <PText style={styles.assistantSubtitle}>Size ozel oneri alalim</PText>
          </View>
          <View style={styles.assistantArrowWrap}>
            <PText style={styles.assistantArrow}>›</PText>
          </View>
        </View>
      </PCard>

      {/* Content Mosaic */}
      <PText style={styles.sectionTitle}>Icerik Turleri</PText>
      <View style={styles.mosaicGrid}>
        {[0, 1].map((row) => (
          <View key={row} style={styles.mosaicRow}>
            {CONTENT_TABS.slice(row * 2, row * 2 + 2).map((tab, col) => {
              const idx = row * 2 + col;
              const count = [journeys.length, workshops.length, modules.length, ebooks.length][idx];
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.mosaicTile,
                    { backgroundColor: MOSAIC_COLORS[idx] },
                    isActive && styles.mosaicTileActive,
                  ]}
                  onPress={() => handleTabPress(tab)}
                  disabled={isOffline}
                  accessibilityLabel={`${tab.label}, ${count} icerik`}
                  accessibilityRole="button"
                  activeOpacity={0.8}
                >
                  <View style={styles.mosaicTileHeader}>
                    <PText style={styles.mosaicEmoji}>{tab.emoji}</PText>
                    <View style={styles.mosaicCountBadge}>
                      <PText style={styles.mosaicCountText}>{count}</PText>
                    </View>
                  </View>
                  <PText style={styles.mosaicTileLabel}>{tab.label}</PText>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Featured Journeys */}
      {featuredJourneys.length > 0 && (
        <View style={styles.section}>
          <PText style={styles.sectionTitle}>One Cikan Yolculuklar</PText>
          {featuredJourneys.map((journey, index) => (
            <PCard
              key={journey.id}
              style={styles.journeyCard}
              onPress={() => handleJourneyPress(journey.id)}
            >
              <View style={styles.journeyCardRow}>
                <View
                  style={[
                    styles.journeyIcon,
                    { backgroundColor: JOURNEY_COLORS[index % JOURNEY_COLORS.length] },
                  ]}
                >
                  <PText style={styles.journeyEmoji}>
                    {JOURNEY_EMOJIS[index % JOURNEY_EMOJIS.length]}
                  </PText>
                </View>
                <View style={styles.journeyInfo}>
                  <View style={styles.journeyTitleRow}>
                    <PText style={styles.journeyTitle} numberOfLines={2}>
                      {journey.title}
                    </PText>
                    {!requiresSubscription && (
                      <View style={styles.freeBadge}>
                        <PText style={styles.freeBadgeText}>Ucretsiz</PText>
                      </View>
                    )}
                  </View>
                  <View style={styles.journeyMetaRow}>
                    <PText style={styles.journeyMetaText}>⏱ {journey.duration_days} gun</PText>
                    <PText style={styles.journeyMetaDot}>·</PText>
                    <PText style={styles.journeyMetaText}>
                      📊 {LEVEL_LABELS[journey.level] ?? journey.level}
                    </PText>
                  </View>
                  <PText style={styles.journeyDailyTarget}>
                    {journey.daily_target ?? "10 dk/gun"}
                  </PText>
                </View>
              </View>
            </PCard>
          ))}
        </View>
      )}

      {/* Featured eBooks */}
      {featuredEbooks.length > 0 && (
        <View style={styles.section}>
          <PText style={styles.sectionTitle}>Populer e-Kitaplar</PText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ebookRow}
          >
            {featuredEbooks.map((ebook, index) => (
              <PCard
                key={ebook.id}
                style={styles.ebookCard}
                onPress={() => handleEbookPress(ebook.id)}
              >
                <View
                  style={[
                    styles.ebookCover,
                    { backgroundColor: EBOOK_COLORS[index % EBOOK_COLORS.length] },
                  ]}
                >
                  <PText style={styles.ebookEmoji}>
                    {EBOOK_EMOJIS[index % EBOOK_EMOJIS.length]}
                  </PText>
                </View>
                <PText style={styles.ebookTitle} numberOfLines={2}>
                  {ebook.title}
                </PText>
                <PText style={styles.ebookMeta}>{ebook.total_pages ?? 180} s.</PText>
              </PCard>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverCatalogScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);
  const navigation = useNavigation<any>();

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <SkeletonBlock height={24} />
          <SkeletonBlock height={72} />
          <SkeletonBlock height={40} />
          <SkeletonBlock height={100} />
          <SkeletonBlock height={100} />
          <PActivityIndicator animating />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Henuz icerik yok"
            description="Yakinda yeni yolculuklar ve atolyeler eklenecek."
            actionLabel="Bildirimleri Ac"
            onAction={() => Linking.openSettings()}
            icon="bell-outline"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "error") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Icerik yuklenemedi"
            description="Baglantini kontrol edip tekrar dene."
            actionLabel="Tekrar Dene"
            onAction={() => navigation.setParams({ state: undefined })}
            icon="alert-circle-outline"
            tone="error"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "offline") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <OfflineNotice />
          <DiscoverReadyContent isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <DiscoverReadyContent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FAFAFA" },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 96 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  greeting: { fontSize: 14, color: "#737373", fontWeight: "500", marginBottom: 2 },
  title: { fontSize: 32, fontWeight: "800", color: "#2B1B5D", letterSpacing: -0.5 },
  guestBadge: {
    backgroundColor: "#FDE68A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  guestBadgeText: { fontSize: 12, fontWeight: "700", color: "#92400E" },
  assistantCard: { marginBottom: 20, borderRadius: 16, backgroundColor: "#2B1B5D" },
  assistantRow: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16 },
  assistantIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  assistantEmoji: { fontSize: 24 },
  assistantInfo: { flex: 1 },
  assistantTitle: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", marginBottom: 2 },
  assistantSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.7)" },
  assistantArrowWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  assistantArrow: { fontSize: 18, color: "#FFFFFF", lineHeight: 22 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  mosaicGrid: { gap: 12, marginBottom: 24 },
  mosaicRow: { flexDirection: "row", gap: 12 },
  mosaicTile: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    justifyContent: "space-between",
  },
  mosaicTileActive: {
    borderWidth: 2,
    borderColor: "#2B1B5D",
    shadowColor: "#2B1B5D",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  mosaicTileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  mosaicEmoji: { fontSize: 32 },
  mosaicCountBadge: {
    backgroundColor: "rgba(0,0,0,0.12)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  mosaicCountText: { fontSize: 13, fontWeight: "800", color: "#2B1B5D" },
  mosaicTileLabel: { fontSize: 14, fontWeight: "700", color: "#2B1B5D" },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "700", color: "#171717", marginBottom: 12 },
  journeyCard: { borderRadius: 16, marginBottom: 12 },
  journeyCardRow: { flexDirection: "row", gap: 12, padding: 12 },
  journeyIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  journeyEmoji: { fontSize: 28 },
  journeyInfo: { flex: 1 },
  journeyTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },
  journeyTitle: { fontSize: 15, fontWeight: "700", color: "#171717", flex: 1 },
  freeBadge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  freeBadgeText: { fontSize: 10, fontWeight: "700", color: "#065F46" },
  journeyMetaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  journeyMetaText: { fontSize: 12, color: "#737373" },
  journeyMetaDot: { fontSize: 12, color: "#D4D4D4" },
  journeyDailyTarget: { fontSize: 11, color: "#00758C", fontWeight: "600" },
  ebookRow: { gap: 12, paddingBottom: 4 },
  ebookCard: { width: 130, borderRadius: 12 },
  ebookCover: {
    height: 160,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  ebookEmoji: { fontSize: 40 },
  ebookTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#171717",
    lineHeight: 16,
    paddingHorizontal: 4,
    marginBottom: 2,
  },
  ebookMeta: { fontSize: 11, color: "#9CA3AF", paddingHorizontal: 4, marginBottom: 4 },
  bottomSpacer: { height: 24 },
});
