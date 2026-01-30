import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "./components/OfflineNotice";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState, ScreenState } from "./components/ScreenState";
import {
  getEbooks,
  getJourneyById,
  getJourneyDays,
  getJourneys,
  getPrimaryUser,
  getSubscriptionForUser,
  getWorkshops,
} from "../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PText } from "../components";

const contentTabs = [
  { key: "journeys", label: "🎯 Yolculuklar", screen: "DiscoverJourneys" },
  { key: "workshops", label: "🎨 Atölyeler", screen: "DiscoverWorkshops" },
  { key: "modules", label: "📦 Modüller", screen: "DiscoverModules" },
  { key: "ebooks", label: "📖 e-Kitaplar", screen: "DiscoverEbooks" },
];

const DiscoverReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const requiresSubscription = subscription?.status !== "active" && subscription?.status !== "trial";
  const journeys = getJourneys();
  const journeyDays = getJourneyDays();
  const workshops = getWorkshops();
  const ebooks = getEbooks();
  const featuredJourney = journeys[0];
  const featuredDayCount = journeyDays.filter((day) => day.journey_id === featuredJourney?.id).length || 40;
  const featuredWorkshopCount = workshops.slice(0, 2).length || 2;
  const featuredModuleCount = 3;
  const featuredEbook = ebooks[0];

  const handlePaywall = () => navigation.navigate("Content", { screen: "ContentPaywall" });

  const handleDiscoverRoute = (screen: string) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    navigation.navigate("Discover", { screen });
  };

  const handleDetailRoute = (screen: string, id?: string) => {
    if (requiresSubscription) {
      handlePaywall();
      return;
    }
    navigation.navigate("Content", { screen, params: { id } });
  };

  return (
    <View>
      <PText style={styles.title}>Keşfet</PText>

      <PCard style={styles.assistantCard}>
        <View style={styles.assistantRow}>
          <PText style={styles.assistantEmoji}>🤖</PText>
          <View style={styles.assistantInfo}>
            <PText style={styles.assistantTitle}>İçerik Asistanı</PText>
            <PText style={styles.assistantSubtitle}>Size özel içerik önerisi alalım</PText>
          </View>
          <PText style={styles.assistantArrow}>→</PText>
        </View>
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={() => handleDiscoverRoute("DiscoverAssistantQuestions")}
        >
          Asistana Başla
        </PButton>
      </PCard>

      {requiresSubscription ? (
        <PCard style={styles.paywallCard}>
          <PText style={styles.paywallTitle}>Premium içeriklere erişim</PText>
          <PText style={styles.paywallSubtitle}>
            Yolculuklar ve e-kitaplar için aboneliğini etkinleştir.
          </PText>
          <PButton mode="contained" onPress={handlePaywall} disabled={isOffline}>
            Aboneliği Gör
          </PButton>
        </PCard>
      ) : null}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
        {contentTabs.map((tab, index) => (
          <PButton
            key={tab.key}
            mode={index === 0 ? "contained" : "outlined"}
            compact
            onPress={() => handleDiscoverRoute(tab.screen)}
            disabled={isOffline}
            style={styles.tabButton}
            labelStyle={styles.tabLabel}
            contentStyle={styles.tabContent}
          >
            {tab.label}
          </PButton>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <PText style={styles.sectionTitle}>Öne Çıkanlar</PText>

        <PCard style={styles.featureCard}>
          <View style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <PText style={styles.featureEmoji}>🎯</PText>
            </View>
            <View style={styles.featureInfo}>
              <PText style={styles.featureTitle}>
                {featuredJourney?.title ?? "Sıdk ve Integrity Yolculuğu"}
              </PText>
              <PText style={styles.featureMeta}>
                {featuredDayCount} gün • Başlangıç
              </PText>
              <PText style={styles.featureSubMeta}>
                📦 {featuredModuleCount} Modül • 🎨 {featuredWorkshopCount} Atölye
              </PText>
            </View>
          </View>
          <PButton
            mode="outlined"
            disabled={isOffline}
            onPress={() => handleDetailRoute("ContentJourneyDetail", featuredJourney?.id)}
          >
            Yolculuğa Git
          </PButton>
        </PCard>

        <PCard style={styles.featureCard}>
          <View style={styles.featureRow}>
            <View style={styles.ebookCover}>
              <PText style={styles.featureEmoji}>📖</PText>
            </View>
            <View style={styles.featureInfo}>
              <PText style={styles.featureTitle}>{featuredEbook?.title ?? "Şükür Şifresi"}</PText>
              <PText style={styles.featureMeta}>PST Coaching • Şükür</PText>
              <PText style={styles.featureSubMeta}>184 sayfa • ~3 saat okuma</PText>
            </View>
          </View>
          <PButton
            mode="outlined"
            disabled={isOffline}
            onPress={() => handleDetailRoute("ContentEbookDetail", featuredEbook?.id)}
          >
            Kitabı İncele
          </PButton>
        </PCard>
      </View>

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverCatalogScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={120} />
          <SkeletonBlock height={120} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Henüz içerik yok"
            description="Yakında yeni yolculuklar ve atölyeler eklenecek."
            actionLabel="Bildirimleri Aç"
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
            title="Keşfet yüklenemedi"
            description="Sunucuya bağlanamadık. Lütfen tekrar dene."
            actionLabel="Tekrar Dene"
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
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 24,
  },
  assistantCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#00B4D8",
    backgroundColor: "#E0F7FA",
    marginBottom: 20,
  },
  assistantRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  assistantEmoji: {
    fontSize: 32,
  },
  assistantInfo: {
    flex: 1,
  },
  assistantTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B1B5D",
    marginBottom: 4,
  },
  assistantSubtitle: {
    fontSize: 14,
    color: "#404040",
  },
  assistantArrow: {
    fontSize: 20,
    color: "#00B4D8",
  },
  paywallCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  paywallTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B1B5D",
    marginBottom: 6,
  },
  paywallSubtitle: {
    fontSize: 13,
    color: "#525252",
    marginBottom: 12,
  },
  tabsRow: {
    gap: 8,
    paddingBottom: 8,
    marginBottom: 16,
  },
  tabButton: {
    borderRadius: 10,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  tabContent: {
    height: 42,
    paddingHorizontal: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 12,
  },
  featureCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  featureIcon: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#FFDDC1",
    alignItems: "center",
    justifyContent: "center",
  },
  ebookCover: {
    width: 60,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#D1FAE5",
    alignItems: "center",
    justifyContent: "center",
  },
  featureEmoji: {
    fontSize: 28,
  },
  featureInfo: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
  },
  featureMeta: {
    fontSize: 13,
    color: "#525252",
    marginBottom: 6,
  },
  featureSubMeta: {
    fontSize: 12,
    color: "#525252",
  },
  bottomSpacer: {
    height: 24,
  },
});
