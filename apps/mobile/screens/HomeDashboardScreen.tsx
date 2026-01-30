import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "./components/OfflineNotice";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState, ScreenState } from "./components/ScreenState";
import {
  PActivityIndicator,
  PButton,
  PCard,
  PIconButton,
  PProgressBar,
  PText,
  PTextInput,
  PTextInputIcon,
} from "../components";
import {
  getContentProgressForUser,
  getJourneyById,
  getJourneyDays,
  getPrimaryUser,
} from "../data/mockSelectors";

const HomeReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const displayName = user?.email ? user.email.split("@")[0] : "Ahmet Yılmaz";
  const journeyDays = getJourneyDays();
  const progressItems = getContentProgressForUser(user?.id);
  const nextStep = progressItems.find((item) => item.status === "in_progress") ?? progressItems[0];
  const nextJourneyDay = journeyDays.find((day) => day.id === nextStep?.content_id);
  const nextJourney = getJourneyById(nextJourneyDay?.journey_id);

  const stats = [
    { label: "Gün Streak", value: 12, emoji: "🔥", tone: "primary" },
    { label: "Tamamlanan", value: 28, emoji: "✅", tone: "success" },
    { label: "Rozetler", value: 8, emoji: "🏆", tone: "warning" },
  ];

  const recommendations = [
    {
      title: "Liderlik",
      subtitle: "8 modül",
      emoji: "💼",
      target: "DiscoverModules",
    },
    {
      title: "Mindfulness",
      subtitle: "12 aşama",
      emoji: "🧘",
      target: "DiscoverJourneys",
    },
  ];

  const activities = [
    { title: "Modül 3 tamamlandı", time: "2 saat önce", emoji: "✅" },
    { title: "Yeni rozet kazandınız!", time: "1 gün önce", emoji: "🏆" },
  ];

  const handleContinue = () => {
    if (!nextStep) {
      navigation.navigate("Discover");
      return;
    }
    if (nextStep.content_type === "journey_day") {
      navigation.navigate("Content", {
        screen: "ContentJourneyDay",
        params: {
          id: nextJourney?.id,
          day: String(nextJourneyDay?.day_number ?? 1),
        },
      });
      return;
    }
    navigation.navigate("Content", {
      screen: "ContentWorkshopHome",
      params: { id: nextStep.content_id },
    });
  };

  return (
    <View>
      <View style={styles.headerRow}>
        <View>
          <PText style={styles.greeting}>Merhaba,</PText>
          <PText style={styles.nameText}>{displayName}</PText>
        </View>
        <View style={styles.notificationWrapper}>
          <PIconButton icon="bell" size={20} style={styles.notificationButton} />
          <View style={styles.notificationDot} />
        </View>
      </View>

      <View style={styles.searchWrapper}>
        <PTextInput
          mode="outlined"
          placeholder="Ne aramak istersiniz?"
          left={<PTextInputIcon icon="magnify" />}
          style={styles.searchInput}
          outlineStyle={styles.searchOutline}
          contentStyle={styles.searchContent}
        />
      </View>

      <View style={styles.statsRow}>
        {stats.map((stat) => (
          <View
            key={stat.label}
            style={[
              styles.statCard,
              stat.tone === "primary" && styles.statPrimary,
              stat.tone === "success" && styles.statSuccess,
              stat.tone === "warning" && styles.statWarning,
            ]}
          >
            <PText style={styles.statEmoji}>{stat.emoji}</PText>
            <PText style={[styles.statValue, stat.tone === "warning" && styles.statValueWarning]}>
              {stat.value}
            </PText>
            <PText style={styles.statLabel}>{stat.label}</PText>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <PText style={styles.sectionTitle}>Öğrenmeye Devam Et</PText>
        <PCard style={styles.continueCard}>
          <View style={styles.continueRow}>
            <View style={styles.continueIcon}>
              <PText style={styles.continueEmoji}>🎯</PText>
            </View>
            <View style={styles.continueInfo}>
              <PText style={styles.continueTitle}>{nextJourney?.title ?? "Hedef Belirleme"}</PText>
              <PText style={styles.continueSubtitle}>Coaching Programı • Modül 3/8</PText>
            </View>
          </View>
          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <PText style={styles.progressLabel}>İlerleme</PText>
              <PText style={styles.progressValue}>37%</PText>
            </View>
            <PProgressBar progress={0.37} style={styles.progressBar} />
          </View>
          <PButton mode="contained" disabled={isOffline} onPress={handleContinue}>
            Devam Et
          </PButton>
        </PCard>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <PText style={styles.sectionTitle}>Sizin İçin Önerilen</PText>
          <PButton mode="text" onPress={() => navigation.navigate("Discover")}>
            Tümü →
          </PButton>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recommendationsRow}>
          {recommendations.map((item) => (
            <PCard key={item.title} style={styles.recommendationCard}>
              <View style={styles.recommendationHero}>
                <PText style={styles.recommendationEmoji}>{item.emoji}</PText>
              </View>
              <View style={styles.recommendationBody}>
                <PText style={styles.recommendationTitle}>{item.title}</PText>
                <PText style={styles.recommendationSubtitle}>{item.subtitle}</PText>
              </View>
            </PCard>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <PText style={styles.sectionTitle}>Son Aktiviteler</PText>
        {activities.map((activity) => (
          <PCard key={activity.title} style={styles.activityCard}>
            <View style={styles.activityRow}>
              <PText style={styles.activityEmoji}>{activity.emoji}</PText>
              <View style={styles.activityInfo}>
                <PText style={styles.activityTitle}>{activity.title}</PText>
                <PText style={styles.activityTime}>{activity.time}</PText>
              </View>
            </View>
          </PCard>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const HomeDashboardScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <PActivityIndicator animating />
            <SkeletonBlock height={20} />
            <SkeletonBlock height={20} />
          </View>
          <View style={styles.section}>
            <SkeletonBlock height={120} />
          </View>
          <View style={styles.section}>
            <SkeletonBlock height={120} />
          </View>
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
            description="İlk yolculuğunu seçerek kişisel gelişim planını oluşturabilirsin."
            actionLabel="Keşfe Çık"
            icon="compass-outline"
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
            title="Ana sayfa yüklenemedi"
            description="Bağlantını kontrol edip tekrar dene."
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
          <HomeReadyContent isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <HomeReadyContent />
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
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2B1B5D",
  },
  notificationWrapper: {
    position: "relative",
  },
  notificationButton: {
    backgroundColor: "#F5F5F5",
  },
  notificationDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 10,
    height: 10,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#EF4444",
  },
  searchWrapper: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
  },
  searchOutline: {
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#E5E5E5",
  },
  searchContent: {
    paddingVertical: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
  },
  statPrimary: {
    backgroundColor: "#E0F7FA",
  },
  statSuccess: {
    backgroundColor: "#D1FAE5",
  },
  statWarning: {
    backgroundColor: "#FEF3C7",
  },
  statEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#00B4D8",
    marginBottom: 4,
  },
  statValueWarning: {
    color: "#F59E0B",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#525252",
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 12,
  },
  continueCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#00B4D8",
    padding: 16,
  },
  continueRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  continueIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  continueEmoji: {
    fontSize: 28,
  },
  continueInfo: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
  },
  continueSubtitle: {
    fontSize: 12,
    color: "#525252",
  },
  progressRow: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#404040",
  },
  progressValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#00B4D8",
  },
  progressBar: {
    height: 8,
    borderRadius: 999,
  },
  recommendationsRow: {
    gap: 16,
    paddingBottom: 8,
  },
  recommendationCard: {
    width: 160,
    borderRadius: 16,
    overflow: "hidden",
  },
  recommendationHero: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDE7F6",
  },
  recommendationEmoji: {
    fontSize: 32,
  },
  recommendationBody: {
    padding: 12,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: "#525252",
  },
  activityCard: {
    marginBottom: 12,
    padding: 12,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#525252",
  },
  bottomSpacer: {
    height: 24,
  },
});
