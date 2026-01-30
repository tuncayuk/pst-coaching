import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getModuleById, getModules, getPackagesForModule } from "../../data/mockSelectors";
import { PActivityIndicator, PCard, PIconButton, PProgressBar, PText } from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const packageMeta = [
  { status: "completed", icon: "✅", subtitle: "3 bölüm • Tamamlandı" },
  { status: "completed", icon: "✅", subtitle: "4 bölüm • Tamamlandı" },
  { status: "active", icon: "▶️", subtitle: "5 bölüm • Hazır" },
  { status: "locked", icon: "🔒", subtitle: "6 bölüm • Kilitli" },
];

const ContentModuleHomeContent = ({
  moduleId,
  isOffline,
}: {
  moduleId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const module = getModuleById(moduleId) ?? getModules()[0];
  const packages = module
    ? [...getPackagesForModule(module.id)].sort(
        (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
      )
    : [];
  const totalPackages = packages.length || 4;
  const completedPackages = Math.min(2, totalPackages);
  const progressPercent = totalPackages ? completedPackages / totalPackages : 0;

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>📦</PText>
        <PIconButton icon="arrow-left" style={styles.heroBack} onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.content}>
        <PText style={styles.title}>{module?.title ?? "Ozfarkindalik Modulu"}</PText>
        <View style={styles.tagRow}>
          <PText style={styles.tagChip}>📦 Modül</PText>
          <PText style={styles.tagChip}>
            {completedPackages}/{totalPackages} Paket
          </PText>
        </View>

        <PCard style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <PText style={styles.progressLabel}>İlerleme</PText>
            <PText style={styles.progressValue}>{Math.round(progressPercent * 100)}%</PText>
          </View>
          <PProgressBar progress={progressPercent} style={styles.progressBar} />
        </PCard>

        <PText style={styles.sectionTitle}>Paketler</PText>
        <View style={styles.packageList}>
          {packages.map((pkg, index) => {
            const meta = packageMeta[index] ?? packageMeta[packageMeta.length - 1];
            const isLocked = meta.status === "locked";
            const isActive = meta.status === "active";
            const cardStyle = [
              styles.packageCard,
              isLocked && styles.packageCardLocked,
              isActive && styles.packageCardActive,
              meta.status === "completed" && styles.packageCardCompleted,
            ];
            const titleStyle = [
              styles.packageTitle,
              isLocked && styles.packageTitleLocked,
              isActive && styles.packageTitleActive,
            ];
            const subtitleStyle = [
              styles.packageSubtitle,
              isLocked && styles.packageSubtitleLocked,
              isActive && styles.packageSubtitleActive,
            ];

            return (
              <PCard
                key={pkg.id}
                style={cardStyle}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentPackageDetail",
                    params: { id: pkg.id, locked: isLocked },
                  })
                }
              >
                <View style={styles.packageRow}>
                  <PText style={styles.packageIcon}>{meta.icon}</PText>
                  <View style={styles.packageInfo}>
                    <PText style={titleStyle}>{pkg.title}</PText>
                    <PText style={subtitleStyle}>{meta.subtitle}</PText>
                  </View>
                </View>
              </PCard>
            );
          })}
        </View>

        <PCard style={styles.tipCard}>
          <PText style={styles.tipText}>
            <PText style={styles.tipLabel}>💡 İpucu:</PText> Paketleri sırasıyla tamamlayın.
          </PText>
        </PCard>
      </View>
    </View>
  );
};

export const ContentModuleHomeScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const moduleId = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
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
            title="Modül bulunamadı"
            description="Bu modül şu anda erişilebilir değil."
            actionLabel="Kütüphaneye Dön"
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
            title="Modül yüklenemedi"
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
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  page: {
    paddingBottom: 32,
  },
  hero: {
    height: 180,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmoji: {
    fontSize: 64,
  },
  heroBack: {
    position: "absolute",
    top: 12,
    left: 12,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tagChip: {
    backgroundColor: "#DBEAFE",
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  progressCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#525252",
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 12,
  },
  packageList: {
    gap: 12,
    marginBottom: 16,
  },
  packageCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    borderLeftWidth: 4,
    borderLeftColor: "#9CA3AF",
  },
  packageCardCompleted: {
    backgroundColor: "#D1FAE5",
    borderLeftColor: "#16A34A",
  },
  packageCardActive: {
    backgroundColor: "#E0F7FA",
    borderLeftColor: "#00B4D8",
  },
  packageCardLocked: {
    backgroundColor: "#F5F5F5",
    borderLeftColor: "#A1A1AA",
  },
  packageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  packageIcon: {
    fontSize: 28,
  },
  packageInfo: {
    flex: 1,
  },
  packageTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 2,
  },
  packageTitleActive: {
    color: "#00758C",
  },
  packageTitleLocked: {
    color: "#525252",
  },
  packageSubtitle: {
    fontSize: 12,
    color: "#525252",
  },
  packageSubtitleActive: {
    color: "#00758C",
  },
  packageSubtitleLocked: {
    color: "#A1A1AA",
  },
  tipCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#EDE7F6",
  },
  tipText: {
    fontSize: 12,
    color: "#525252",
  },
  tipLabel: {
    fontWeight: "700",
    color: "#2B1B5D",
  },
});
