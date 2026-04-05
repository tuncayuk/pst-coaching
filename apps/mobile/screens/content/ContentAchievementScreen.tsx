import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getAchievements,
  getModules,
  getPackagesForModule,
  getContentItemsForParent,
  getPrimaryUser,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PDivider,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const ContentAchievementContent = ({
  achievementId,
  isOffline,
}: {
  achievementId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();

  // Find achievement by id or fall back to user's first achievement
  const achievement =
    getAchievements().find((a: any) => a.id === achievementId) ??
    getAchievements().find((a: any) => a.user_id === user?.id);

  // Resolve completed module info
  const completedModule =
    getModules().find((m) => m.id === achievement?.source_id) ?? getModules()[0];

  // Derive stats from real data
  const modulePackages = completedModule
    ? getPackagesForModule(completedModule.id)
    : [];
  const totalSections = modulePackages.reduce((acc, pkg) => {
    return acc + getContentItemsForParent("package", pkg.id).length;
  }, 0);
  // Estimated reading time: 5 min per section
  const estMinutes = totalSections * 5;
  const estHours = Math.floor(estMinutes / 60);
  const timeLabel = estHours > 0 ? estHours + "s" : estMinutes + "dk";

  // Next module recommendation
  const allModules = getModules();
  const currentIndex = allModules.findIndex((m) => m.id === completedModule?.id);
  const nextModule = allModules[currentIndex + 1] ?? null;

  return (
    <View style={styles.body}>
      {/* AC-FR-E11-05-01/02: completion header + certificate */}
      <View
        style={styles.celebrationHeader}
        accessibilityRole="header"
        accessible
        accessibilityLabel={
          "Tebrikler! " + (completedModule?.title ?? "Modul") + " tamamlandi."
        }
      >
        {/* Certificate badge */}
        <PAvatar.Icon size={96} icon="medal" color="#FFFFFF" style={styles.medalIcon} accessible={false} />
        <PText style={styles.celebrationTitle}>Tebrikler!</PText>
        <PText style={styles.celebrationSubtitle}>
          {completedModule?.title ?? "Modul"} tamamlandi
        </PText>
      </View>

      <View style={styles.content}>
        {/* AC-FR-E11-05-02: certificate/badge presentation */}
        <PCard
          style={styles.certCard}
          accessible
          accessibilityLabel={
            "Sertifika: " + (completedModule?.title ?? "Modul") + " Uzmani." +
            " " + modulePackages.length + " paket, " + totalSections + " bolum, " + timeLabel + " egitim."
          }
        >
          <View style={styles.certHeader}>
            <PAvatar.Icon size={36} icon="certificate" color="#F59E0B" style={styles.certIconBg} accessible={false} />
            <PText style={styles.certTitle}>
              {(completedModule?.title ?? "Modul") + " Uzmani"}
            </PText>
          </View>
          <PDivider style={styles.certDivider} />
          <View style={styles.statsRow} accessibilityRole="none">
            <View style={styles.statItem}>
              <PText style={styles.statValue}>{modulePackages.length}</PText>
              <PText style={styles.statLabel}>Paket</PText>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <PText style={styles.statValue}>{totalSections}</PText>
              <PText style={styles.statLabel}>Bolum</PText>
            </View>
            <View style={styles.statItem}>
              <PText style={styles.statValue}>{timeLabel}</PText>
              <PText style={styles.statLabel}>Sure</PText>
            </View>
          </View>
          <View style={styles.xpRow}>
            <View style={styles.xpBadge}>
              <PAvatar.Icon size={20} icon="star" color="#F59E0B" style={styles.xpIcon} accessible={false} />
              <PText style={styles.xpText}>+100 XP</PText>
            </View>
            <View style={styles.rozetBadge}>
              <PAvatar.Icon size={20} icon="shield-star" color="#7C4DFF" style={styles.rozetIcon} accessible={false} />
              <PText style={styles.rozetText}>Rozet Kazanildi</PText>
            </View>
          </View>
        </PCard>

        {/* AC-FR-E11-05-04: progress dashboard sync notice */}
        <PCard style={styles.dashboardCard}>
          <View style={styles.dashboardRow}>
            <PAvatar.Icon size={28} icon="chart-line" color="#0EA5E9" style={styles.dashIcon} accessible={false} />
            <View style={styles.dashInfo}>
              <PText style={styles.dashTitle}>Gelisim Panenize Yansidi</PText>
              <PText style={styles.dashDesc}>
                Bu basari gelisim panelinizde gosterilmekte ve ilerleme istatistiklerinize eklenmistir.
              </PText>
            </View>
          </View>
        </PCard>

        {/* AC-FR-E11-05-03: next module recommendation */}
        {nextModule && (
          <PCard style={styles.nextCard}>
            <View style={styles.nextHeader}>
              <PAvatar.Icon size={28} icon="layers-outline" color="#7C4DFF" style={styles.nextIcon} accessible={false} />
              <PText style={styles.nextTitle}>Onerilen Sonraki Modul</PText>
            </View>
            <PText style={styles.nextModuleName}>{nextModule.title}</PText>
            <PText style={styles.nextModuleDesc} numberOfLines={2}>
              {nextModule.description}
            </PText>
            <PButton
              mode="contained"
              compact
              disabled={isOffline}
              style={styles.goNextBtn}
              onPress={() =>
                navigation.navigate("ContentModuleHome", { id: nextModule.id })
              }
              accessibilityLabel={"Bir sonraki module git: " + nextModule.title}
            >
              Module Git
            </PButton>
          </PCard>
        )}

        {/* Actions */}
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.actionBtn}
          accessibilityLabel="Sertifikami paylas"
          onPress={() => {}}
        >
          Sertifikami Paylas
        </PButton>
        <PButton
          mode="text"
          style={styles.actionBtn}
          accessibilityLabel="Ana sayfaya don"
          onPress={() => navigation.getParent()?.navigate("MainTabs")}
        >
          Ana Sayfaya Don
        </PButton>
      </View>
    </View>
  );
};

export const ContentAchievementScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const achievementId = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating accessibilityLabel="Basari yukleniyor" />
          <SkeletonBlock height={200} />
          <SkeletonBlock height={120} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Basari bulunamadi"
            description="Bu tamamlama kaydina ulasilamadi."
            actionLabel="Kutuphaneye Don"
            icon="medal-outline"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "error") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Basari yuklenemedi"
            description="Baglantini kontrol edip tekrar dene."
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
        <OfflineNotice />
        <ScrollView contentContainerStyle={styles.page}>
          <ContentAchievementContent achievementId={achievementId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentAchievementContent achievementId={achievementId} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  page: { paddingBottom: 40 },
  body: { flex: 1 },
  celebrationHeader: {
    backgroundColor: "#1E3A5F",
    paddingTop: 36,
    paddingBottom: 40,
    alignItems: "center",
  },
  medalIcon: {
    backgroundColor: "#F59E0B",
    marginBottom: 16,
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  celebrationTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  celebrationSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    paddingHorizontal: 32,
  },
  content: { paddingHorizontal: 16, paddingTop: 20 },
  certCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FCD34D",
  },
  certHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 },
  certIconBg: { backgroundColor: "#FEF3C7" },
  certTitle: { fontSize: 16, fontWeight: "800", color: "#92400E" },
  certDivider: { marginBottom: 12 },
  statsRow: { flexDirection: "row", justifyContent: "space-around", marginBottom: 12 },
  statItem: { alignItems: "center", flex: 1 },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#FCD34D",
  },
  statValue: { fontSize: 22, fontWeight: "800", color: "#92400E" },
  statLabel: { fontSize: 11, color: "#B45309", marginTop: 2 },
  xpRow: { flexDirection: "row", gap: 10, justifyContent: "center" },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#FEF9C3",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  xpIcon: { backgroundColor: "transparent" },
  xpText: { fontSize: 12, fontWeight: "700", color: "#92400E" },
  rozetBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EDE9FE",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rozetIcon: { backgroundColor: "transparent" },
  rozetText: { fontSize: 12, fontWeight: "700", color: "#4C1D95" },
  dashboardCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#F0F9FF",
    borderLeftWidth: 3,
    borderLeftColor: "#0EA5E9",
  },
  dashboardRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  dashIcon: { backgroundColor: "#E0F2FE" },
  dashInfo: { flex: 1 },
  dashTitle: { fontSize: 13, fontWeight: "700", color: "#0369A1", marginBottom: 4 },
  dashDesc: { fontSize: 12, color: "#0C4A6E", lineHeight: 18 },
  nextCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#F5F3FF",
    borderLeftWidth: 3,
    borderLeftColor: "#7C4DFF",
  },
  nextHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  nextIcon: { backgroundColor: "#EDE9FE" },
  nextTitle: { fontSize: 12, fontWeight: "700", color: "#6D28D9" },
  nextModuleName: { fontSize: 15, fontWeight: "700", color: "#1E3A5F", marginBottom: 4 },
  nextModuleDesc: { fontSize: 13, color: "#4C1D95", lineHeight: 18, marginBottom: 12, opacity: 0.85 },
  goNextBtn: { alignSelf: "flex-start", borderRadius: 10 },
  actionBtn: { marginBottom: 8 },
});
