import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  PActivityIndicator,
  PButton,
  PCard,
  PChip,
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
  getNotificationsForUser,
  getPrimaryUser,
} from "../data/mockSelectors";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenState, resolveScreenState } from "./components/ScreenState";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";

/** Returns seconds remaining until 23:59:59 of today (local time). */
function secondsUntilMidnight(): number {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 0);
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
}

/** Formats seconds as "HH:mm" countdown string. */
function formatCountdown(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const CONTENT_AREAS = [
  { label: "Yolculuklar", icon: "map-marker-path", route: "DiscoverJourneys", count: "12 program" },
  { label: "Atolyeler", icon: "school-outline", route: "DiscoverWorkshops", count: "8 atolye" },
  { label: "e-Kitaplar", icon: "book-open-variant", route: "DiscoverEbooks", count: "24 kitap" },
  { label: "Kocluk Okulu", icon: "account-school", route: "DiscoverCatalog", count: "5 kurs" },
] as const;

const SUBSCRIPTION_BADGE_CONFIG = {
  active: { label: "Aktif", bg: "#D1FAE5", text: "#065F46" },
  trial: { label: "Deneme", bg: "#FEF3C7", text: "#92400E" },
  cancelled: { label: "Iptal", bg: "#FEE2E2", text: "#991B1B" },
} as const;

const HomeReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const displayName = user?.email ? user.email.split("@")[0] : "Ahmet";
  const journeyDays = getJourneyDays();
  const progressItems = getContentProgressForUser(user?.id);
  const unreadCount = getNotificationsForUser(user?.id).filter((n) => !n.is_read).length;
  const nextStep = progressItems.find((item) => item.status === "in_progress") ?? progressItems[0];
  const nextJourneyDay = journeyDays.find((day) => day.id === nextStep?.content_id);
  const nextJourney = getJourneyById(nextJourneyDay?.journey_id);

  // AC-FR-E2-01-01: countdown timer to 23:59
  const [countdown, setCountdown] = useState(secondsUntilMidnight);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown(secondsUntilMidnight());
    }, 60_000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const subscriptionStatus: keyof typeof SUBSCRIPTION_BADGE_CONFIG = "active";
  const badge = SUBSCRIPTION_BADGE_CONFIG[subscriptionStatus];

  const stats = [
    { label: "Gun Serisi", value: 12, icon: "fire", tone: "primary" as const },
    { label: "Tamamlanan", value: 28, icon: "check-circle", tone: "success" as const },
    { label: "Rozetler", value: 8, icon: "trophy", tone: "warning" as const },
  ];

  const activities = [
    { title: "Modul 3 tamamlandi", time: "2 saat once", icon: "check-circle-outline" },
    { title: "Yeni rozet kazandiniz!", time: "1 gun once", icon: "trophy-outline" },
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
      {/* Header row: greeting + subscription badge + notification bell */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <PText style={styles.greeting}>Merhaba,</PText>
          <View style={styles.nameRow}>
            <PText style={styles.nameText}>{displayName}</PText>
            {/* AC-FR-E2-02-01: subscription status badge */}
            <View
              style={[styles.subscriptionBadge, { backgroundColor: badge.bg }]}
              accessibilityLabel={`Abonelik durumu: ${badge.label}`}
              accessibilityRole="text"
            >
              <PText style={[styles.subscriptionBadgeText, { color: badge.text }]}>
                {badge.label}
              </PText>
            </View>
          </View>
        </View>
        <View style={styles.notificationWrapper}>
          <PIconButton
            icon="bell-outline"
            size={22}
            style={styles.notificationButton}
            accessibilityLabel="Bildirimler"
            accessibilityRole="button"
            accessibilityHint="Bildirimlerinizi goruntuler"
            onPress={() => navigation.navigate("Notifications")}
          />
          {unreadCount > 0 && (
            <View
              style={styles.notificationDot}
              accessibilityLabel={`${unreadCount} okunmamis bildirim`}
              accessibilityRole="image"
            >
              <PText style={styles.notificationDotText}>
                {unreadCount > 9 ? "9+" : String(unreadCount)}
              </PText>
            </View>
          )}
        </View>
      </View>

      {/* Search bar - AC-FR-E2-05-01: tap opens search screen */}
      <TouchableOpacity
        onPress={() => !isOffline && navigation.navigate("HomeSearch")}
        activeOpacity={0.7}
        accessibilityLabel="Icerik ara"
        accessibilityRole="search"
        accessibilityHint="Arama ekranini acar"
        style={styles.searchWrapper}
      >
        <PTextInput
          mode="outlined"
          placeholder="Ne aramak istersiniz?"
          left={<PTextInputIcon icon="magnify" />}
          style={styles.searchInput}
          outlineStyle={styles.searchOutline}
          contentStyle={styles.searchContent}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {/* Stats row */}
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
            accessibilityLabel={`${stat.label}: ${stat.value}`}
            accessibilityRole="text"
          >
            <PText style={styles.statValue}>{stat.value}</PText>
            <PText style={styles.statLabel}>{stat.label}</PText>
          </View>
        ))}
      </View>

      {/* AC-FR-E2-01-01/02: Today's CTA with countdown */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <PText style={styles.sectionTitle}>Bugun Devam Et</PText>
          <View
            style={styles.countdownBadge}
            accessibilityLabel={`Kalan sure: ${formatCountdown(countdown)}`}
          >
            <PText style={styles.countdownText}>{formatCountdown(countdown)}</PText>
          </View>
        </View>
        {nextStep ? (
          <PCard style={styles.continueCard}>
            <View style={styles.continueRow}>
              <View style={styles.continueIcon} accessibilityElementsHidden>
                <PText style={styles.continueIconText}>H</PText>
              </View>
              <View style={styles.continueInfo}>
                <PText style={styles.continueTitle}>
                  {nextJourney?.title ?? "Hedef Belirleme"}
                </PText>
                <PText style={styles.continueSubtitle}>Coaching Programi -- Modul 3/8</PText>
              </View>
            </View>
            <View style={styles.progressRow}>
              <View style={styles.progressHeader}>
                <PText style={styles.progressLabel}>Ilerleme</PText>
                <PText style={styles.progressValue}>37%</PText>
              </View>
              <PProgressBar progress={0.37} style={styles.progressBar} />
            </View>
            <PButton
              mode="contained"
              disabled={isOffline}
              onPress={handleContinue}
              accessibilityLabel="Kaldim yerden devam et"
              accessibilityHint="Aktif icerigi acar"
            >
              Devam Et
            </PButton>
          </PCard>
        ) : (
          <PCard style={styles.continueCardEmpty}>
            <PText style={styles.continueEmptyText}>Bugunki hedefini secmedin.</PText>
            <PButton
              mode="outlined"
              onPress={() => navigation.navigate("Discover")}
              accessibilityLabel="Kesfe cik ve icerik sec"
            >
              Kesfe Cik
            </PButton>
          </PCard>
        )}
      </View>

      {/* AC-FR-E2-03-01/02: Content area navigation grid */}
      <View style={styles.section}>
        <PText style={styles.sectionTitle}>Icerik Alanlari</PText>
        <View style={styles.contentNavGrid}>
          {CONTENT_AREAS.map((area) => (
            <TouchableOpacity
              key={area.label}
              style={styles.contentNavCard}
              onPress={() => !isOffline && navigation.navigate(area.route as any)}
              accessibilityLabel={`${area.label}, ${area.count}`}
              accessibilityRole="button"
              accessibilityHint={`${area.label} katalna gider`}
              activeOpacity={0.75}
            >
              <PText style={styles.contentNavLabel}>{area.label}</PText>
              <PText style={styles.contentNavCount}>{area.count}</PText>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* AC-FR-E2-04-01: Program summary card */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <PText style={styles.sectionTitle}>Vicdandan Karaktere</PText>
          <PButton
            mode="text"
            onPress={() => navigation.navigate("HomeVicdandanKaraktereDetail")}
            accessibilityLabel="Vicdandan Karaktere programi detaylari"
          >
            Detaylar
          </PButton>
        </View>
        <PCard style={styles.programCard}>
          <PText style={styles.programDescription}>
            Ic sesini guclendir ve degerlerinle uyumlu kararlar al.
          </PText>
          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <PText style={styles.progressLabel}>3/8 bolum</PText>
              <PText style={styles.progressValue}>38%</PText>
            </View>
            <PProgressBar progress={0.38} style={styles.progressBar} />
          </View>
        </PCard>
      </View>

      {/* AC-FR-E2-06-01: Active content list (max 3) */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <PText style={styles.sectionTitle}>Aktif Iceriklerim</PText>
          <PButton
            mode="text"
            onPress={() => navigation.navigate("HomeActiveContentList")}
            accessibilityLabel="Tum aktif icerikleri gor"
          >
            Tumunu Gor
          </PButton>
        </View>
        <PCard style={styles.activeContentCard}>
          <View style={styles.activeContentRow}>
            <PChip compact accessibilityLabel="Icerik turu: Yolculuk">
              Yolculuk
            </PChip>
            <View style={styles.activeContentInfo}>
              <PText style={styles.activeContentTitle}>Hedef Belirleme</PText>
              <PText style={styles.activeContentMeta}>Gun 3 -- 12 dk</PText>
            </View>
            <PText style={styles.activeContentPct}>42%</PText>
          </View>
          <PProgressBar progress={0.42} style={styles.progressBar} />
        </PCard>
      </View>

      {/* Son Aktiviteler */}
      <View style={styles.section}>
        <PText style={styles.sectionTitle}>Son Aktiviteler</PText>
        {activities.map((activity) => (
          <PCard key={activity.title} style={styles.activityCard}>
            <View style={styles.activityRow}>
              <View style={styles.activityInfo}>
                <PText style={styles.activityTitle}>{activity.title}</PText>
                <PText style={styles.activityTime}>{activity.time}</PText>
              </View>
            </View>
          </PCard>
        ))}
      </View>

      {/* Reminder nudge - AC-FR-E2-08-01 */}
      <TouchableOpacity
        style={styles.reminderNudge}
        onPress={() => !isOffline && navigation.navigate("HomeReminderSetting")}
        accessibilityLabel="Gunluk hatirlatici ayarla"
        accessibilityRole="button"
        accessibilityHint="Hatirlatici ayarlari ekranini acar"
        activeOpacity={0.75}
      >
        <PText style={styles.reminderNudgeText}>
          Gunluk hatirlaticini ayarla -- 20:00 onerilen
        </PText>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const HomeDashboardScreen = ({
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
            title="Henuz icerik yok"
            description="Ilk yolculugunu secerek kisisel gelisim planini olusturabilirsin."
            actionLabel="Kesfe Cik"
            onAction={() => navigation.navigate("Discover")}
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
            title="Ana sayfa yuklenemedi"
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
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  nameText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2B1B5D",
  },
  subscriptionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: "center",
  },
  subscriptionBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  notificationWrapper: {
    position: "relative",
    marginTop: 4,
  },
  notificationButton: {
    backgroundColor: "#F5F5F5",
    minWidth: 48,
    minHeight: 48,
  },
  notificationDot: {
    position: "absolute",
    top: 8,
    right: 8,
    minWidth: 16,
    height: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
    pointerEvents: "none",
  },
  notificationDotText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 12,
  },
  searchWrapper: {
    marginBottom: 20,
    minHeight: 48,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
  },
  searchOutline: {
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#D4D4D4",
  },
  searchContent: {
    paddingVertical: 10,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    minHeight: 80,
    justifyContent: "center",
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
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 10,
  },
  countdownBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  countdownText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#92400E",
  },
  continueCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#00B4D8",
    padding: 16,
  },
  continueCardEmpty: {
    padding: 16,
    alignItems: "center",
    gap: 12,
  },
  continueEmptyText: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 8,
  },
  continueRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  continueIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#E0F7FA",
    alignItems: "center",
    justifyContent: "center",
  },
  continueIconText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#00B4D8",
  },
  continueInfo: {
    flex: 1,
    justifyContent: "center",
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
    fontSize: 13,
    fontWeight: "600",
    color: "#404040",
  },
  progressValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00B4D8",
  },
  progressBar: {
    height: 8,
    borderRadius: 999,
  },
  contentNavGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contentNavCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#E5E5E5",
    minHeight: 72,
    justifyContent: "center",
  },
  contentNavLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2B1B5D",
    marginBottom: 4,
  },
  contentNavCount: {
    fontSize: 12,
    color: "#525252",
  },
  programCard: {
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  programDescription: {
    fontSize: 13,
    color: "#404040",
    marginBottom: 12,
    lineHeight: 20,
  },
  activeContentCard: {
    padding: 14,
    marginBottom: 0,
  },
  activeContentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  activeContentInfo: {
    flex: 1,
  },
  activeContentTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#171717",
  },
  activeContentMeta: {
    fontSize: 12,
    color: "#525252",
  },
  activeContentPct: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00B4D8",
  },
  activityCard: {
    marginBottom: 10,
    padding: 12,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#525252",
  },
  reminderNudge: {
    backgroundColor: "#EDE9FE",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DDD6FE",
    minHeight: 48,
    justifyContent: "center",
  },
  reminderNudgeText: {
    fontSize: 13,
    color: "#5B21B6",
    fontWeight: "600",
  },
  bottomSpacer: {
    height: 24,
  },
});
