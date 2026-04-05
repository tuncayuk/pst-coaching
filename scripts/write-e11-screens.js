#!/usr/bin/env node
// write-e11-screens.js — Writes all 4 EPIC-11 content screen files
const fs = require("fs");
const path = require("path");

const CONTENT_DIR = path.join(__dirname, "../apps/mobile/screens/content");
const files = {};

// ─────────────────────────────────────────────────────────────────────────
// ContentModuleHomeScreen  (FR-E11-01)
// ─────────────────────────────────────────────────────────────────────────
files["ContentModuleHomeScreen.tsx"] = `import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getContentProgressForUser,
  getContentItemsForParent,
  getModuleById,
  getModules,
  getPackagesForModule,
  getPrimaryUser,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PDivider,
  PIconButton,
  PProgressBar,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// Derive package status from real content progress data
function derivePackageStatus(
  pkgId: string,
  allPackages: Array<{ id: string; order_index?: number }>,
  userProgress: Array<{ content_type: string; content_id: string; status: string }>,
  contentItems: Array<{ parent_type: string; parent_id: string; id: string }>
): "completed" | "active" | "locked" {
  const items = contentItems.filter(
    (ci) => ci.parent_type === "package" && ci.parent_id === pkgId
  );
  if (items.length === 0) return "active";

  const completedIds = new Set(
    userProgress
      .filter((p) => p.status === "completed")
      .map((p) => p.content_id)
  );
  const allCompleted = items.every((ci) => completedIds.has(ci.id));
  if (allCompleted) return "completed";

  const anyStarted = items.some((ci) =>
    userProgress.some((p) => p.content_id === ci.id)
  );
  if (anyStarted) return "active";

  // Check if previous package is completed
  const sorted = [...allPackages].sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  const myIndex = sorted.findIndex((p) => p.id === pkgId);
  if (myIndex <= 0) return "active"; // first package always active

  const prevPkg = sorted[myIndex - 1];
  const prevItems = contentItems.filter(
    (ci) => ci.parent_type === "package" && ci.parent_id === prevPkg.id
  );
  const prevDone = prevItems.length > 0 && prevItems.every((ci) => completedIds.has(ci.id));
  return prevDone ? "active" : "locked";
}

const STATUS_CONFIG: Record<
  "completed" | "active" | "locked",
  { icon: string; borderColor: string; bg: string; iconColor: string }
> = {
  completed: { icon: "check-circle",    borderColor: "#16A34A", bg: "#D1FAE5", iconColor: "#16A34A" },
  active:    { icon: "play-circle",     borderColor: "#0EA5E9", bg: "#E0F2FE", iconColor: "#0EA5E9" },
  locked:    { icon: "lock",            borderColor: "#9CA3AF", bg: "#F4F4F5", iconColor: "#9CA3AF" },
};

const ContentModuleHomeContent = ({
  moduleId,
  isOffline,
}: {
  moduleId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const progress = getContentProgressForUser(user?.id);
  const allContentItems = getContentItemsForParent("package", "").concat(
    // Flatten across all packages - use broad fetch
    Array.from({ length: 0 })
  );

  const module = getModuleById(moduleId) ?? getModules()[0];
  const packages = module
    ? [...getPackagesForModule(module.id)].sort(
        (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
      )
    : [];

  // Build per-package content items efficiently
  const packageItems = packages.flatMap((pkg) =>
    getContentItemsForParent("package", pkg.id).map((ci) => ({
      ...ci,
      parent_id: pkg.id,
    }))
  );

  const completedIds = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.content_id)
  );
  const totalItems = packageItems.length;
  const completedItems = packageItems.filter((ci) => completedIds.has(ci.id)).length;
  const progressPercent = totalItems > 0 ? completedItems / totalItems : 0;

  // AC-FR-E11-01-03: find first non-completed (active) package
  const nextPackage = packages.find((pkg) => {
    const items = packageItems.filter((ci) => ci.parent_id === pkg.id);
    if (items.length === 0) return false;
    return !items.every((ci) => completedIds.has(ci.id));
  });

  const completedPackageCount = packages.filter((pkg) => {
    const items = packageItems.filter((ci) => ci.parent_id === pkg.id);
    return items.length > 0 && items.every((ci) => completedIds.has(ci.id));
  }).length;

  const handleContinue = () => {
    if (nextPackage) {
      navigation.navigate("ContentPackageDetail", { id: nextPackage.id });
    }
  };

  return (
    <View>
      {/* Hero header */}
      <View
        style={styles.hero}
        accessibilityRole="header"
        accessible
        accessibilityLabel={"Modul: " + (module?.title ?? "Modul")}
      >
        <PIconButton
          icon="arrow-left"
          iconColor="#1E3A5F"
          style={styles.heroBack}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Geri don"
          accessibilityRole="button"
        />
        <PAvatar.Icon
          size={72}
          icon="layers"
          style={styles.heroIcon}
          color="#FFFFFF"
          accessible={false}
        />
        <PText style={styles.heroTitle} accessibilityRole="header">
          {module?.title ?? "Modul"}
        </PText>
        <PText style={styles.heroDesc}>
          {module?.description ?? "Becerilerinizi guclendirin."}
        </PText>
      </View>

      <View style={styles.content}>
        {/* AC-FR-E11-01-01: module name + progress % */}
        <PCard style={styles.progressCard}>
          <View
            style={styles.progressHeader}
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: 100, now: Math.round(progressPercent * 100) }}
            accessibilityLabel={
              "Ilerleme: yuzde " + Math.round(progressPercent * 100) +
              ", " + completedPackageCount + " / " + packages.length + " paket tamamlandi"
            }
          >
            <PText style={styles.progressLabel}>Ilerleme</PText>
            <PText style={styles.progressValue}>
              {Math.round(progressPercent * 100)}%
            </PText>
          </View>
          <PProgressBar
            progress={progressPercent}
            style={styles.progressBar}
            color="#0EA5E9"
            accessible={false}
          />
          <PText style={styles.progressMeta} accessible={false}>
            {completedPackageCount}/{packages.length} paket tamamlandi
          </PText>
        </PCard>

        {/* AC-FR-E11-01-03: "Devam Et" CTA */}
        {nextPackage && (
          <PButton
            mode="contained"
            style={styles.continueBtn}
            disabled={isOffline}
            onPress={handleContinue}
            accessibilityLabel={"Devam et: " + nextPackage.title}
            accessibilityRole="button"
          >
            Devam Et
          </PButton>
        )}

        {/* AC-FR-E11-01-02: sorted packages with status */}
        <PText style={styles.sectionTitle}>Paketler</PText>
        <View style={styles.packageList}>
          {packages.map((pkg, idx) => {
            const pkgItems = packageItems.filter((ci) => ci.parent_id === pkg.id);
            const pkgCompleted = pkgItems.length > 0 && pkgItems.every((ci) => completedIds.has(ci.id));
            const pkgStarted = pkgItems.some((ci) =>
              progress.some((p) => p.content_id === ci.id)
            );
            const status: "completed" | "active" | "locked" = pkgCompleted
              ? "completed"
              : pkgStarted
              ? "active"
              : idx === 0
              ? "active"
              : (() => {
                  const prev = packages[idx - 1];
                  const prevItems = packageItems.filter((ci) => ci.parent_id === prev?.id);
                  return prevItems.length > 0 && prevItems.every((ci) => completedIds.has(ci.id))
                    ? "active"
                    : "locked";
                })();
            const cfg = STATUS_CONFIG[status];
            const isLocked = status === "locked";
            const sectionCount = pkgItems.length;
            const completedSections = pkgItems.filter((ci) => completedIds.has(ci.id)).length;

            const statusLabel =
              status === "completed"
                ? "Tamamlandi"
                : status === "active"
                ? "Devam Ediyor"
                : "Kilitli";

            return (
              <TouchableOpacity
                key={pkg.id}
                style={[styles.packageCard, { borderLeftColor: cfg.borderColor, backgroundColor: cfg.bg }]}
                disabled={isLocked || isOffline}
                onPress={() =>
                  navigation.navigate("ContentPackageDetail", { id: pkg.id })
                }
                accessibilityRole="button"
                accessibilityLabel={
                  "Paket " + (idx + 1) + ": " + pkg.title +
                  ". Durum: " + statusLabel +
                  ". " + completedSections + "/" + sectionCount + " bolum tamamlandi."
                }
                accessibilityState={{ disabled: isLocked }}
              >
                <View style={styles.packageRow}>
                  <PAvatar.Icon
                    size={36}
                    icon={cfg.icon}
                    color={cfg.iconColor}
                    style={[styles.pkgIconBg, { backgroundColor: cfg.borderColor + "22" }]}
                    accessible={false}
                  />
                  <View style={styles.packageInfo}>
                    <View style={styles.pkgTitleRow}>
                      <PText
                        style={[styles.packageTitle, isLocked && styles.packageTitleLocked]}
                        numberOfLines={1}
                      >
                        {pkg.title}
                      </PText>
                      <View style={[styles.statusBadge, { backgroundColor: cfg.borderColor + "22" }]}>
                        <PText style={[styles.statusBadgeText, { color: cfg.borderColor }]}>
                          {statusLabel}
                        </PText>
                      </View>
                    </View>
                    <PText style={styles.packageMeta}>
                      {isLocked
                        ? "Onceki paketi tamamlayin"
                        : completedSections + "/" + sectionCount + " bolum tamamlandi"}
                    </PText>
                    {!isLocked && sectionCount > 0 && (
                      <PProgressBar
                        progress={sectionCount > 0 ? completedSections / sectionCount : 0}
                        style={styles.pkgProgressBar}
                        color={cfg.borderColor}
                        accessible={false}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {packages.length === 0 && (
          <PText style={styles.emptyHint}>
            Bu modul icin paket bulunamadi.
          </PText>
        )}

        {isOffline && (
          <View style={styles.offlineNote}>
            <PText variant="bodySmall" style={styles.offlineNoteText}>
              Cevrimdisi mod: Son guncelleme cahleye aktarilmistir.
            </PText>
          </View>
        )}
      </View>
    </View>
  );
};

export const ContentModuleHomeScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const moduleId = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating accessibilityLabel="Modul yukleniyor" />
          <SkeletonBlock height={72} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Modul bulunamadi"
            description="Bu modul su anda erisebilir degil."
            actionLabel="Kutuphaneyе Don"
            icon="layers-outline"
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
            title="Modul yuklenemedi"
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
          <ContentModuleHomeContent moduleId={moduleId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentModuleHomeContent moduleId={moduleId} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  page: { paddingBottom: 40 },
  hero: {
    backgroundColor: "#1E3A5F",
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    position: "relative",
  },
  heroBack: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
  },
  heroIcon: {
    backgroundColor: "#0EA5E9",
    marginBottom: 12,
    marginTop: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 6,
  },
  heroDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    lineHeight: 20,
  },
  content: { paddingHorizontal: 16, paddingTop: 20 },
  progressCard: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
    elevation: 1,
  },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  progressLabel: { fontSize: 14, fontWeight: "600", color: "#525252" },
  progressValue: { fontSize: 15, fontWeight: "700", color: "#0EA5E9" },
  progressBar: { height: 8, borderRadius: 8, marginBottom: 6 },
  progressMeta: { fontSize: 12, color: "#737373", textAlign: "right" },
  continueBtn: { marginBottom: 20, borderRadius: 12 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A5F",
    marginBottom: 12,
  },
  packageList: { gap: 10, marginBottom: 24 },
  packageCard: {
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  packageRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  pkgIconBg: { borderRadius: 18 },
  packageInfo: { flex: 1 },
  pkgTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
    gap: 6,
  },
  packageTitle: { flex: 1, fontSize: 14, fontWeight: "600", color: "#1E293B" },
  packageTitleLocked: { color: "#9CA3AF" },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  statusBadgeText: { fontSize: 10, fontWeight: "700" },
  packageMeta: { fontSize: 12, color: "#737373", marginTop: 2, marginBottom: 4 },
  pkgProgressBar: { height: 4, borderRadius: 4 },
  emptyHint: { opacity: 0.6, textAlign: "center", paddingVertical: 12 },
  offlineNote: {
    backgroundColor: "#FFF7ED",
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#F59E0B",
    marginBottom: 16,
  },
  offlineNoteText: { color: "#92400E" },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentPackageDetailScreen  (FR-E11-02 + FR-E11-04)
// ─────────────────────────────────────────────────────────────────────────
files["ContentPackageDetailScreen.tsx"] = `import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getContentItemsForParent,
  getContentProgressForUser,
  getModules,
  getPackages,
  getPackagesForModule,
  getPrimaryUser,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PDivider,
  PIconButton,
  PProgressBar,
  PText,
} from "../../components";

type RouteParams = {
  state?: ScreenState;
  id?: string;
};

// BR-01: hours until next 08:00 (simulate with fixed value for mock)
function hoursUntil8am(): string {
  const now = new Date();
  const next8 = new Date(now);
  next8.setHours(8, 0, 0, 0);
  if (now.getHours() >= 8) next8.setDate(next8.getDate() + 1);
  const diffMs = next8.getTime() - now.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  const diffM = Math.floor((diffMs % 3600000) / 60000);
  return diffH + "s " + diffM + "dk";
}

const SECTION_TYPE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  reading:  { icon: "book-open-outline",  label: "Okuma",     color: "#7C4DFF" },
  exercise: { icon: "pencil-outline",     label: "Uygulama",  color: "#0EA5E9" },
  question: { icon: "help-circle-outline",label: "Soru",      color: "#10B981" },
};

// AC-FR-E11-04: Locked state sub-component
const LockedPackageView = ({
  pkg,
  prevPkg,
  navigation,
}: {
  pkg: { id: string; title: string };
  prevPkg: { id: string; title: string } | null;
  navigation: any;
}) => {
  const countdown = hoursUntil8am();

  return (
    <View style={styles.content}>
      {/* AC-FR-E11-04-01: locked indicator */}
      <View style={styles.lockedHeader} accessibilityRole="header">
        <PAvatar.Icon size={80} icon="lock" color="#9CA3AF" style={styles.lockIcon} accessible={false} />
        <PText style={styles.lockedTitle} accessibilityRole="header">
          Paket Kilitli
        </PText>
        <PText style={styles.lockedSubtitle}>
          {pkg.title}
        </PText>
      </View>

      {/* AC-FR-E11-04-02: lock reason (BR-04) */}
      <PCard
        style={styles.lockReasonCard}
        accessible
        accessibilityRole="none"
        accessibilityLabel={
          "Kilit nedeni: " +
          (prevPkg ? prevPkg.title + " paketini tamamlamaniz gerekiyor." : "Onceki paketi tamamlayin.")
        }
      >
        <View style={styles.lockReasonHeader}>
          <PAvatar.Icon size={28} icon="information-outline" color="#1D4ED8" style={styles.infoIcon} accessible={false} />
          <PText style={styles.lockReasonTitle}>Kilit Nedeni (BR-04)</PText>
        </View>
        <PText style={styles.lockReasonText}>
          Her paket, bir oncekinin ustune insaa edilir. Etkili ogrenme icin sirali ilerleme gereklidir.
        </PText>
        {prevPkg && (
          <View style={styles.prereqBox}>
            <PText style={styles.prereqLabel}>Tamamlanmasi gereken:</PText>
            <View style={styles.prereqRow}>
              <PAvatar.Icon size={24} icon="play-circle" color="#0EA5E9" style={styles.prereqIcon} accessible={false} />
              <PText style={styles.prereqTitle}>{prevPkg.title}</PText>
            </View>
          </View>
        )}
      </PCard>

      {/* AC-FR-E11-04-03: 08:00 countdown (BR-01) */}
      <PCard
        style={styles.countdownCard}
        accessible
        accessibilityLabel={"08:00 Kurali: Bir sonraki paket " + countdown + " icinde actilacak."}
      >
        <View style={styles.countdownHeader}>
          <PAvatar.Icon size={28} icon="clock-outline" color="#F59E0B" style={styles.clockIcon} accessible={false} />
          <PText style={styles.countdownTitle}>08:00 Kurali (BR-01)</PText>
        </View>
        <PText style={styles.countdownText}>
          Bir onceki paketi tamamladiktan sonra yeni pakete ertesi gun saat 08:00'den itibaren erisebilirsiniz.
        </PText>
        <View style={styles.countdownRow}>
          <PText style={styles.countdownLabel}>Kalan sure:</PText>
          <PText
            style={styles.countdownValue}
            accessibilityLiveRegion="polite"
            accessibilityLabel={"Kalan sure: " + countdown}
          >
            {countdown}
          </PText>
        </View>
      </PCard>

      {prevPkg && (
        <PButton
          mode="contained"
          style={styles.goToPrereqBtn}
          onPress={() =>
            navigation.navigate("ContentPackageDetail", { id: prevPkg.id })
          }
          accessibilityLabel={"Onceki pakete git: " + prevPkg.title}
        >
          Onceki Pakete Git
        </PButton>
      )}
      <PButton
        mode="outlined"
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Geri don"
      >
        Geri Don
      </PButton>
    </View>
  );
};

// AC-FR-E11-02: Active/ready package detail
const PackageDetailView = ({
  pkg,
  isOffline,
  navigation,
}: {
  pkg: { id: string; title: string; description?: string };
  isOffline?: boolean;
  navigation: any;
}) => {
  const user = getPrimaryUser();
  const progress = getContentProgressForUser(user?.id);
  const items = [...getContentItemsForParent("package", pkg.id)].sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  const completedIds = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.content_id)
  );
  const firstUnstarted = items.find((ci) => !completedIds.has(ci.id));
  const progressFraction = items.length > 0
    ? items.filter((ci) => completedIds.has(ci.id)).length / items.length
    : 0;

  const navToSection = (item: { id: string; content_type: string }) => {
    if (item.content_type === "exercise") {
      navigation.navigate("ContentExercise", { id: item.id });
    } else {
      navigation.navigate("ContentReading", { id: item.id });
    }
  };

  const handleStart = () => {
    if (firstUnstarted) {
      navToSection(firstUnstarted);
    } else if (items[0]) {
      navToSection(items[0]);
    }
  };

  // Simulated objectives from description
  const objectives = pkg.description
    ? [pkg.description]
    : [
        "Temel kavramlari anlamak",
        "Uygulama adimlarini tamamlamak",
        "Bir sonraki pakete gecis saglamak",
      ];

  return (
    <View style={styles.content}>
      {/* AC-FR-E11-02-01: package description and objectives */}
      <PText style={styles.packageTitle}>{pkg.title}</PText>
      {progressFraction > 0 && (
        <View style={styles.pkgProgressRow}>
          <PProgressBar progress={progressFraction} style={styles.pkgProgressBar} color="#0EA5E9" accessible={false} />
          <PText style={styles.pkgProgressLabel}>
            {Math.round(progressFraction * 100)}% tamamlandi
          </PText>
        </View>
      )}

      <PCard style={styles.objectivesCard}>
        <View style={styles.objectivesHeader}>
          <PAvatar.Icon size={28} icon="target" color="#7C4DFF" style={styles.targetIcon} accessible={false} />
          <PText style={styles.objectivesTitle}>Paket Amaclari</PText>
        </View>
        {objectives.map((obj, i) => (
          <View key={i} style={styles.objRow} accessibilityRole="none" accessibilityLabel={"Amac " + (i + 1) + ": " + obj}>
            <PText style={styles.objBullet} accessibilityElementsHidden>•</PText>
            <PText style={styles.objText}>{obj}</PText>
          </View>
        ))}
      </PCard>

      {/* AC-FR-E11-02-02: sections list (reading + exercise) */}
      <PCard style={styles.sectionsCard}>
        <PText style={styles.sectionsTitle}>
          Icindekiler ({items.length} bolum)
        </PText>
        {items.map((item, idx) => {
          const typeCfg = SECTION_TYPE_CONFIG[item.content_type] ?? SECTION_TYPE_CONFIG.reading;
          const isDone = completedIds.has(item.id);
          const isNext = item.id === firstUnstarted?.id;

          return (
            <View key={item.id}>
              <View
                style={[styles.sectionRow, isNext && styles.sectionRowNext]}
                accessible
                accessibilityRole="button"
                accessibilityLabel={
                  (idx + 1) + ". " + item.title +
                  ". Tur: " + typeCfg.label +
                  (isDone ? ". Tamamlandi." : isNext ? ". Siradaki bolum." : "")
                }
              >
                <PAvatar.Icon
                  size={28}
                  icon={isDone ? "check-circle" : typeCfg.icon}
                  color={isDone ? "#16A34A" : typeCfg.color}
                  style={[styles.sectionIcon, { backgroundColor: isDone ? "#D1FAE5" : typeCfg.color + "22" }]}
                  accessible={false}
                />
                <View style={styles.sectionInfo}>
                  <PText style={[styles.sectionTitle, isDone && styles.sectionTitleDone]}>
                    {item.title}
                  </PText>
                  <PText style={styles.sectionMeta}>{typeCfg.label}</PText>
                </View>
                {isNext && (
                  <View style={styles.nextBadge}>
                    <PText style={styles.nextBadgeText}>Siradaki</PText>
                  </View>
                )}
                {isDone && <PText style={styles.doneCheck} accessibilityElementsHidden>+</PText>}
              </View>
              {idx < items.length - 1 && <PDivider style={styles.sectionDivider} />}
            </View>
          );
        })}
      </PCard>

      {/* AC-FR-E11-02-03: "Paketi Basla" CTA */}
      <PButton
        mode="contained"
        disabled={isOffline}
        style={styles.startBtn}
        onPress={handleStart}
        accessibilityLabel={progressFraction > 0 ? "Pakete devam et" : "Paketi basla"}
      >
        {progressFraction > 0 ? "Devam Et" : "Paketi Basla"}
      </PButton>
      <PButton
        mode="outlined"
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Geri don"
      >
        Geri Don
      </PButton>
    </View>
  );
};

const ContentPackageDetailContent = ({
  packageId,
  isOffline,
}: {
  packageId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const progress = getContentProgressForUser(user?.id);

  const allPackages = getPackages();
  const pkg = allPackages.find((p) => p.id === packageId) ?? allPackages[0];
  if (!pkg) return null;

  // Find the module this package belongs to and sibling packages
  const modulePackages = getPackagesForModule(pkg.module_id).sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  const myIndex = modulePackages.findIndex((p) => p.id === pkg.id);
  const prevPkg = myIndex > 0 ? modulePackages[myIndex - 1] : null;

  // AC-FR-E11-02-04 / AC-FR-E11-04: compute locked state from real data
  let isLocked = false;
  if (prevPkg) {
    const prevItems = getContentItemsForParent("package", prevPkg.id);
    const completedIds = new Set(
      progress.filter((p) => p.status === "completed").map((p) => p.content_id)
    );
    isLocked = prevItems.length > 0 && !prevItems.every((ci) => completedIds.has(ci.id));
  }

  return (
    <View>
      <View
        style={[styles.hero, isLocked && styles.heroLocked]}
        accessibilityRole="header"
        accessible
        accessibilityLabel={(isLocked ? "Kilitli paket: " : "Paket: ") + pkg.title}
      >
        <PIconButton
          icon="arrow-left"
          iconColor="#FFFFFF"
          style={styles.heroBack}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Geri don"
          accessibilityRole="button"
        />
        <PAvatar.Icon
          size={64}
          icon={isLocked ? "lock" : "package-variant"}
          color="#FFFFFF"
          style={styles.heroAvatar}
          accessible={false}
        />
      </View>

      {isLocked ? (
        <LockedPackageView
          pkg={pkg}
          prevPkg={prevPkg}
          navigation={navigation}
        />
      ) : (
        <PackageDetailView
          pkg={pkg}
          isOffline={isOffline}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export const ContentPackageDetailScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const packageId = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating accessibilityLabel="Paket yukleniyor" />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={120} />
          <SkeletonBlock height={80} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Paket bulunamadi"
            description="Bu paket su anda erisebilir degil."
            actionLabel="Module Don"
            icon="package-variant"
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
            title="Paket yuklenemedi"
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
          <ContentPackageDetailContent packageId={packageId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentPackageDetailContent packageId={packageId} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  page: { paddingBottom: 40 },
  hero: {
    height: 140,
    backgroundColor: "#1E3A5F",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  heroLocked: { backgroundColor: "#4B5563" },
  heroBack: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
  },
  heroAvatar: { backgroundColor: "rgba(255,255,255,0.15)" },
  content: { paddingHorizontal: 16, paddingTop: 20 },
  // locked styles
  lockedHeader: { alignItems: "center", marginBottom: 24 },
  lockIcon: { backgroundColor: "#F4F4F5", marginBottom: 12 },
  lockedTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#374151",
    marginBottom: 4,
  },
  lockedSubtitle: { fontSize: 14, color: "#6B7280", textAlign: "center" },
  lockReasonCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#EFF6FF",
    borderLeftWidth: 4,
    borderLeftColor: "#1D4ED8",
  },
  lockReasonHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  infoIcon: { backgroundColor: "#DBEAFE" },
  lockReasonTitle: { fontSize: 14, fontWeight: "700", color: "#1E40AF" },
  lockReasonText: { fontSize: 13, color: "#1E3A5F", lineHeight: 20, marginBottom: 12 },
  prereqBox: { backgroundColor: "#FFFFFF", borderRadius: 8, padding: 10 },
  prereqLabel: { fontSize: 11, color: "#6B7280", marginBottom: 6 },
  prereqRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  prereqIcon: { backgroundColor: "#E0F2FE" },
  prereqTitle: { fontSize: 13, fontWeight: "600", color: "#1E293B" },
  countdownCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#FFFBEB",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },
  countdownHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  clockIcon: { backgroundColor: "#FEF3C7" },
  countdownTitle: { fontSize: 14, fontWeight: "700", color: "#92400E" },
  countdownText: { fontSize: 13, color: "#78350F", lineHeight: 20, marginBottom: 10 },
  countdownRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  countdownLabel: { fontSize: 13, color: "#92400E" },
  countdownValue: { fontSize: 18, fontWeight: "800", color: "#D97706" },
  goToPrereqBtn: { marginBottom: 10 },
  // active/detail styles
  packageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E3A5F",
    marginBottom: 10,
  },
  pkgProgressRow: { marginBottom: 12 },
  pkgProgressBar: { height: 6, borderRadius: 6, marginBottom: 4 },
  pkgProgressLabel: { fontSize: 12, color: "#0EA5E9", textAlign: "right", fontWeight: "600" },
  objectivesCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#F5F3FF",
    borderLeftWidth: 3,
    borderLeftColor: "#7C4DFF",
  },
  objectivesHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 },
  targetIcon: { backgroundColor: "#EDE9FE" },
  objectivesTitle: { fontSize: 14, fontWeight: "700", color: "#4C1D95" },
  objRow: { flexDirection: "row", alignItems: "flex-start", gap: 6, marginBottom: 4 },
  objBullet: { fontSize: 16, color: "#7C4DFF", lineHeight: 20, marginTop: 1 },
  objText: { flex: 1, fontSize: 13, color: "#4C1D95", lineHeight: 20 },
  sectionsCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  sectionsTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B", marginBottom: 12 },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 10,
  },
  sectionRowNext: {
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginHorizontal: -8,
  },
  sectionIcon: { borderRadius: 14 },
  sectionInfo: { flex: 1 },
  sectionTitle: { fontSize: 13, fontWeight: "600", color: "#1E293B" },
  sectionTitleDone: { color: "#6B7280" },
  sectionMeta: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  nextBadge: {
    backgroundColor: "#0EA5E9",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  nextBadgeText: { fontSize: 10, fontWeight: "700", color: "#FFFFFF" },
  doneCheck: { fontSize: 18, color: "#16A34A", fontWeight: "700" },
  sectionDivider: { marginVertical: 2 },
  startBtn: { marginBottom: 10, borderRadius: 12 },
  backBtn: { borderRadius: 12 },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentExerciseScreen  (FR-E11-03)
// ─────────────────────────────────────────────────────────────────────────
files["ContentExerciseScreen.tsx"] = `import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getContentItemsForParent, getExerciseSteps, getPrimaryUser } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PDivider,
  PIconButton,
  PProgressBar,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// Fallback exercise steps when no real data
const FALLBACK_STEPS = [
  {
    id: "s1",
    title: "Adim 1: Durumu Tanimlayin",
    description: "Hangi durum sizi etkiledi? Ne oldu? Kisa ve net sekilde yazin.",
  },
  {
    id: "s2",
    title: "Adim 2: Duygu ve Dusunceler",
    description: "O anda ne hissettiniz? Akliniza gelen ilk dusunce neydi?",
  },
  {
    id: "s3",
    title: "Adim 3: Kanitlari Degerlendirin",
    description: "Bu dusunceyi destekleyen ve curutenler neler? Her ikisini de listeleyin.",
  },
  {
    id: "s4",
    title: "Adim 4: Denge Kurumun",
    description: "Daha dengeli, gercekci bir bakis acisi nasil olabilir?",
  },
];

type StepStatus = "done" | "active" | "locked";

const ContentExerciseContent = ({
  contentItemId,
  isOffline,
}: {
  contentItemId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();

  // Load steps: prefer ExerciseStep records; fallback to static list
  const rawSteps = getExerciseSteps().filter(
    (s: any) => s.content_item_id === contentItemId
  );
  const steps =
    rawSteps.length > 0
      ? rawSteps.map((s: any) => ({
          id: s.id,
          title: s.title ?? "Adim",
          description: s.instruction ?? s.description ?? "",
        }))
      : FALLBACK_STEPS;

  // AC-FR-E11-03-02: step completion state
  const [completedCount, setCompletedCount] = useState(0);
  // AC-FR-E11-03-01: per-step notes
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savedSteps, setSavedSteps] = useState<Set<string>>(new Set());

  const allDone = completedCount >= steps.length;

  const handleComplete = () => {
    if (isOffline) return;
    setCompletedCount((prev) => Math.min(prev + 1, steps.length));
  };

  const handleSaveNote = (stepId: string) => {
    setSavedSteps((prev) => new Set(prev).add(stepId));
    setTimeout(
      () => setSavedSteps((prev) => { const s = new Set(prev); s.delete(stepId); return s; }),
      2000
    );
  };

  // AC-FR-E11-03-03: next section navigation
  const handleNextSection = () => {
    navigation.goBack();
  };

  const progressFraction = steps.length > 0 ? completedCount / steps.length : 0;

  return (
    <View style={styles.wrapper}>
      {/* Sticky progress header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Geri don"
            accessibilityRole="button"
          />
          <View style={styles.headerCenter}>
            <PText style={styles.headerTitle} numberOfLines={1}>
              Uygulama Alıştırması
            </PText>
            <PText style={styles.headerSubtitle}>
              {completedCount}/{steps.length} adim tamamlandi
            </PText>
          </View>
        </View>
        <PProgressBar
          progress={progressFraction}
          style={styles.progressBar}
          color="#0EA5E9"
          accessible
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(progressFraction * 100) }}
          accessibilityLabel={"Ilerleme: yuzde " + Math.round(progressFraction * 100)}
        />
      </View>

      {isOffline && <OfflineNotice />}

      <ScrollView contentContainerStyle={styles.body}>
        {/* AC-FR-E11-03-01: Instructions (reading text full screen context) */}
        <PCard style={styles.instructionCard}>
          <View style={styles.instructionHeader}>
            <PAvatar.Icon size={28} icon="lightbulb-outline" color="#7C4DFF" style={styles.lightbulb} accessible={false} />
            <PText style={styles.instructionTitle}>Talimatlar</PText>
          </View>
          <PText style={styles.instructionText}>
            Son bir haftanızda yaşadığınız zorlayici bir durumu düşünün. Aşağıdaki adımları
            sırasıyla tamamlayın ve her bölüme notlarınızı ekleyin.
          </PText>
        </PCard>

        {/* AC-FR-E11-03-02: sequential steps */}
        <View style={styles.stepList}>
          {steps.map((step, index) => {
            const isDone = index < completedCount;
            const isActive = index === completedCount;
            const isLocked = index > completedCount;
            const statusColor = isDone ? "#16A34A" : isActive ? "#0EA5E9" : "#9CA3AF";
            const noteText = notes[step.id] ?? "";
            const noteSaved = savedSteps.has(step.id);

            return (
              <PCard
                key={step.id}
                style={[
                  styles.stepCard,
                  isDone && styles.stepCardDone,
                  isActive && styles.stepCardActive,
                  isLocked && styles.stepCardLocked,
                ]}
              >
                <View style={styles.stepHeader}>
                  <View
                    style={[styles.stepBadge, { backgroundColor: statusColor + "22" }]}
                    accessibilityRole="none"
                    accessible={false}
                  >
                    <PText style={[styles.stepBadgeText, { color: statusColor }]}>
                      {isDone ? "+" : index + 1}
                    </PText>
                  </View>
                  <View style={styles.stepInfo}>
                    <PText
                      style={[styles.stepTitle, isLocked && styles.stepTitleLocked]}
                      accessibilityRole="header"
                    >
                      {step.title}
                    </PText>
                    {!isLocked && (
                      <PText style={styles.stepDesc}>{step.description}</PText>
                    )}
                    {isLocked && (
                      <PText style={styles.stepLockedHint}>
                        Onceki adimi tamamlayin
                      </PText>
                    )}
                  </View>
                </View>

                {/* AC-FR-E11-03-01: per-step note input */}
                {(isDone || isActive) && !isOffline && (
                  <View style={styles.noteArea}>
                    <PDivider style={styles.noteDivider} />
                    <PText style={styles.noteLabel}>Notunuz</PText>
                    <TextInput
                      style={styles.noteInput}
                      multiline
                      value={noteText}
                      onChangeText={(t) => setNotes((prev) => ({ ...prev, [step.id]: t }))}
                      placeholder="Dusuncelerinizi buraya yazin..."
                      editable={!isOffline}
                      accessibilityLabel={"Adim " + (index + 1) + " notu"}
                      accessibilityHint="Bu adim icin dusuncelerinizi yazin"
                    />
                    {noteSaved && (
                      <PText
                        style={styles.noteSavedText}
                        accessibilityLiveRegion="polite"
                        accessibilityLabel="Not kaydedildi"
                      >
                        Kaydedildi
                      </PText>
                    )}
                    <View style={styles.stepActions}>
                      <PButton
                        mode="text"
                        compact
                        onPress={() => handleSaveNote(step.id)}
                        disabled={!noteText}
                        accessibilityLabel={"Adim " + (index + 1) + " notunu kaydet"}
                      >
                        Notu Kaydet
                      </PButton>
                      {isActive && (
                        <PButton
                          mode="contained"
                          compact
                          disabled={isOffline}
                          onPress={handleComplete}
                          accessibilityLabel={"Adim " + (index + 1) + " tamamla"}
                        >
                          Adimi Tamamla
                        </PButton>
                      )}
                    </View>
                  </View>
                )}
              </PCard>
            );
          })}
        </View>

        {/* AC-FR-E11-03-03: next section CTA on completion */}
        {allDone && (
          <PCard style={styles.completionCard}>
            <PAvatar.Icon
              size={56}
              icon="check-circle"
              color="#16A34A"
              style={styles.completionIcon}
              accessible={false}
            />
            <PText
              style={styles.completionTitle}
              accessibilityLiveRegion="polite"
              accessibilityLabel="Tebrikler! Alıstirmayi tamamladiniz."
            >
              Tebrikler!
            </PText>
            <PText style={styles.completionDesc}>
              Bu alıstirmayi basariyla tamamladiniz. Bir sonraki bolume gecebilirsiniz.
            </PText>
            <PButton
              mode="contained"
              style={styles.nextSectionBtn}
              onPress={handleNextSection}
              accessibilityLabel="Sonraki bolume gec"
            >
              Sonraki Bolum
            </PButton>
          </PCard>
        )}
      </ScrollView>
    </View>
  );
};

export const ContentExerciseScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const id = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <PActivityIndicator animating accessibilityLabel="Aliştirma yukleniyor" />
        <SkeletonBlock height={72} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <StateMessage
          title="Aliştirma bulunamadi"
          description="Bu aliştirma icin icerik bulunamadi."
          actionLabel="Pakete Don"
          icon="pencil-outline"
        />
      </SafeAreaView>
    );
  }

  if (state === "error") {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <StateMessage
          title="Aliştirma yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </SafeAreaView>
    );
  }

  if (state === "offline") {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <ContentExerciseContent contentItemId={id} isOffline />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.rootSafe}>
      <ContentExerciseContent contentItemId={id} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rootSafe: { flex: 1, backgroundColor: "#F8FAFC" },
  wrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 8,
  },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerCenter: { flex: 1, paddingRight: 8 },
  headerTitle: { fontSize: 14, fontWeight: "700", color: "#1E3A5F" },
  headerSubtitle: { fontSize: 11, color: "#64748B", marginTop: 1 },
  progressBar: { height: 4, borderRadius: 0, marginTop: 6, marginHorizontal: 16 },
  body: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  instructionCard: {
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#F5F3FF",
    borderLeftWidth: 3,
    borderLeftColor: "#7C4DFF",
  },
  instructionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  lightbulb: { backgroundColor: "#EDE9FE" },
  instructionTitle: { fontSize: 13, fontWeight: "700", color: "#4C1D95" },
  instructionText: { fontSize: 13, color: "#4C1D95", lineHeight: 20 },
  stepList: { gap: 10 },
  stepCard: {
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  stepCardDone: {
    backgroundColor: "#F0FDF4",
    borderColor: "#86EFAC",
  },
  stepCardActive: {
    backgroundColor: "#F0F9FF",
    borderColor: "#7DD3FC",
    shadowColor: "#0EA5E9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  stepCardLocked: {
    backgroundColor: "#FAFAFA",
    borderColor: "#E5E7EB",
    opacity: 0.7,
  },
  stepHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBadgeText: { fontSize: 14, fontWeight: "700" },
  stepInfo: { flex: 1 },
  stepTitle: { fontSize: 14, fontWeight: "700", color: "#1E293B", marginBottom: 4 },
  stepTitleLocked: { color: "#9CA3AF" },
  stepDesc: { fontSize: 13, color: "#475569", lineHeight: 20 },
  stepLockedHint: { fontSize: 12, color: "#9CA3AF", fontStyle: "italic" },
  noteDivider: { marginVertical: 10 },
  noteLabel: { fontSize: 11, color: "#94A3B8", marginBottom: 4, fontWeight: "600" },
  noteInput: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 8,
    padding: 10,
    minHeight: 72,
    fontSize: 13,
    textAlignVertical: "top",
    color: "#1E293B",
    marginBottom: 6,
  },
  noteSavedText: { fontSize: 11, color: "#16A34A", marginBottom: 4 },
  stepActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  completionCard: {
    padding: 24,
    borderRadius: 16,
    marginTop: 16,
    backgroundColor: "#F0FDF4",
    alignItems: "center",
    borderColor: "#86EFAC",
    borderWidth: 1.5,
  },
  completionIcon: { backgroundColor: "#D1FAE5", marginBottom: 12 },
  completionTitle: { fontSize: 20, fontWeight: "800", color: "#15803D", marginBottom: 6 },
  completionDesc: { fontSize: 14, color: "#166534", lineHeight: 20, textAlign: "center", marginBottom: 16 },
  nextSectionBtn: { alignSelf: "stretch", borderRadius: 12 },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ContentAchievementScreen  (FR-E11-05)
// ─────────────────────────────────────────────────────────────────────────
files["ContentAchievementScreen.tsx"] = `import React from "react";
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
            actionLabel="Kutuphaneyе Don"
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
`;

// ─────────────────────────────────────────────────────────────────────────
// Write all files
// ─────────────────────────────────────────────────────────────────────────
let written = 0;
for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, content, "utf8");
  written++;
  console.log("Wrote " + filename);
}
console.log("\nScreens written: " + written + "/" + Object.keys(files).length);
