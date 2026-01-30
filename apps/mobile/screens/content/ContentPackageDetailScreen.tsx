import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getContentItemsForParent, getPackages } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PIconButton, PText } from "../../components";

const packageGoals = [
  "Otomatik dusunce kaliplarini fark etmek",
  "Olumsuz dusunceleri yeniden cercevelemek",
  "Bilissel carpitmalari tanimak",
];

const ContentPackageDetailContent = ({
  packageId,
  isOffline,
}: {
  packageId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const packages = getPackages();
  const pkg = packages.find((item) => item.id === packageId) ?? packages[2] ?? packages[0];
  const items = getContentItemsForParent("package", pkg?.id).sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  const contents = items.length
    ? items
    : [
        { title: "Otomatik Dusunceler", content_type: "reading" },
        { title: "Kaliplarimi Kesfetmek", content_type: "exercise" },
        { title: "Bilissel Carpitmalar", content_type: "reading" },
      ];
  const durations = ["12 dk", "15 dk", "10 dk"];

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>📋</PText>
        <PIconButton icon="arrow-left" style={styles.heroBack} onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.content}>
        <PText style={styles.title}>{pkg?.title ?? "Paket 3: Dusunce Kaliplari"}</PText>
        <View style={styles.tagRow}>
          <PText style={styles.tagChip}>📦 Paket 3/4</PText>
          <PText style={styles.tagChip}>5 bölüm</PText>
        </View>

        <PCard style={styles.goalCard}>
          <PText style={styles.goalTitle}>🎯 Paket Amaçları</PText>
          {packageGoals.map((goal) => (
            <PText key={goal} style={styles.goalItem}>
              • {goal}
            </PText>
          ))}
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>📚 Açıklama</PText>
          <PText style={styles.paragraph}>
            Bu pakette, zihnimizde otomatik olarak oluşan düşünce kalıplarını keşfedeceksiniz.
            Olumsuz inanç sistemlerini tanımayı ve bunları daha faydalı düşüncelerle
            değiştirmeyi öğreneceksiniz.
          </PText>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>İçindekiler</PText>
          <View style={styles.contentList}>
            {contents.map((item, index) => {
              const typeLabel = item.content_type === "exercise" ? "Uygulama" : "Okuma";
              return (
                <View key={`${item.title}-${index}`} style={styles.contentItem}>
                  <View style={styles.contentIndex}>
                    <PText style={styles.contentIndexText}>{index + 1}</PText>
                  </View>
                  <View style={styles.contentInfo}>
                    <PText style={styles.contentTitle}>{item.title}</PText>
                    <PText style={styles.contentMeta}>
                      {typeLabel} • {durations[index] ?? "10 dk"}
                    </PText>
                  </View>
                </View>
              );
            })}
          </View>
        </PCard>

        <PButton mode="contained" disabled={isOffline} style={styles.primaryButton}>
          Paketi Başlat
        </PButton>
      </View>
    </View>
  );
};

const LockedPackageContent = ({ packageId }: { packageId?: string }) => {
  const navigation = useNavigation<any>();
  const packages = getPackages();
  const lockedPackage = packages.find((item) => item.id === packageId) ?? packages[3];
  const previousPackage = packages[2] ?? packages[0];

  return (
    <View>
      <View style={styles.heroLocked}>
        <PText style={styles.heroEmoji}>🔒</PText>
        <PIconButton icon="arrow-left" style={styles.heroBack} onPress={() => navigation.goBack()} />
      </View>

      <View style={styles.lockedContent}>
        <PText style={styles.lockedTitle}>Paket Kilitli</PText>
        <PText style={styles.lockedSubtitle}>
          Bu pakete erişmek için önce <PText style={styles.lockedHighlight}>Paket 3</PText>'ü
          tamamlamanız gerekiyor.
        </PText>

        <PCard style={styles.warningCard}>
          <PText style={styles.warningTitle}>⚠️ Kilit Nedeni</PText>
          <PText style={styles.warningText}>
            Her paket, bir önceki paketin üzerine inşa edilir. Etkili öğrenme için sıralı
            ilerleme önemlidir.
          </PText>
          <View style={styles.requirementBox}>
            <PText style={styles.requirementLabel}>Tamamlanması gereken:</PText>
            <View style={styles.requirementRow}>
              <PText style={styles.requirementIcon}>▶️</PText>
              <View style={styles.requirementInfo}>
                <PText style={styles.requirementTitle}>{previousPackage?.title}</PText>
                <PText style={styles.requirementMeta}>0/5 bölüm tamamlandı</PText>
              </View>
            </View>
          </View>
        </PCard>

        <PCard style={styles.infoCard}>
          <PText style={styles.infoTitle}>⏰ 08:00 Kuralı</PText>
          <PText style={styles.infoText}>
            Paket 3'ü tamamladıktan sonra, ertesi gün <PText style={styles.infoHighlight}>saat 08:00</PText>'dan
            önce bir sonraki pakete geçemezsiniz.
          </PText>
        </PCard>

        <PButton
          mode="contained"
          onPress={() =>
            navigation.navigate("Content", {
              screen: "ContentPackageDetail",
              params: { id: previousPackage?.id },
            })
          }
        >
          Paket 3'e Dön
        </PButton>
      </View>
    </View>
  );
};

export const ContentPackageDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string; locked?: boolean } };
}) => {
  const state = resolveScreenState(route);
  const packageId = route?.params?.id;
  const isLocked = Boolean(route?.params?.locked);

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
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
            title="Paket bulunamadı"
            description="Bu paket şu anda erişilebilir değil."
            actionLabel="Keşfe Dön"
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
            title="Paket yüklenemedi"
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
          {isLocked ? <LockedPackageContent packageId={packageId} /> : null}
          {!isLocked ? <ContentPackageDetailContent packageId={packageId} isOffline /> : null}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        {isLocked ? <LockedPackageContent packageId={packageId} /> : null}
        {!isLocked ? <ContentPackageDetailContent packageId={packageId} /> : null}
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
    height: 160,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },
  heroLocked: {
    height: 160,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmoji: {
    fontSize: 56,
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
    fontSize: 22,
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
  goalCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#E0F7FA",
    borderLeftWidth: 4,
    borderLeftColor: "#00B4D8",
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#00758C",
    marginBottom: 8,
  },
  goalItem: {
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 4,
  },
  sectionCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 20,
    color: "#1F2937",
  },
  contentList: {
    gap: 12,
  },
  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  contentIndex: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#00B4D8",
    alignItems: "center",
    justifyContent: "center",
  },
  contentIndexText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  contentMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  primaryButton: {
    marginTop: 4,
  },
  lockedContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
  },
  lockedTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#6B7280",
    marginBottom: 8,
  },
  lockedSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  lockedHighlight: {
    fontWeight: "700",
    color: "#111827",
  },
  warningCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FEF3C7",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
    marginBottom: 16,
    width: "100%",
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#B45309",
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 12,
  },
  requirementBox: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 12,
  },
  requirementLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  requirementIcon: {
    fontSize: 20,
  },
  requirementInfo: {
    flex: 1,
  },
  requirementTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  requirementMeta: {
    fontSize: 12,
    color: "#6B7280",
  },
  infoCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    borderLeftWidth: 4,
    borderLeftColor: "#1D4ED8",
    marginBottom: 20,
    width: "100%",
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#1F2937",
  },
  infoHighlight: {
    fontWeight: "700",
  },
});
