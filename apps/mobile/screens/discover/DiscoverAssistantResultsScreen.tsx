import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  PActivityIndicator,
  PButton,
  PCard,
  PIconButton,
  PText,
} from "../../components";
import { getEbooks, getJourneys, getModules, getWorkshops } from "../../data/mockSelectors";

const levelLabels: Record<string, string> = {
  baslangic: "Başlangıç",
  beginner: "Başlangıç",
  orta: "Orta",
  intermediate: "Orta",
  ileri: "İleri",
  advanced: "İleri",
};

const DiscoverAssistantResultsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journey = getJourneys()[0];
  const workshop = getWorkshops()[0];
  const module = getModules()[0];
  const ebook = getEbooks()[0];

  const primaryTitle = journey?.title ?? "Önerilen Yolculuk";
  const primaryMeta = journey
    ? `${journey.duration_days} gün • ${levelLabels[journey.level] ?? journey.level}`
    : "6 gün • 20 dk";
  const primaryDetail = journey?.description ?? "Sana uygun içeriklerle hazırlanan yolculuk.";

  const alternatives = [
    workshop && {
      id: workshop.id,
      title: workshop.title,
      subtitle: "Atölye • 3 bölüm",
      type: "workshop",
    },
    module && {
      id: module.id,
      title: module.title,
      subtitle: "Modül • 4 gün",
      type: "module",
    },
    ebook && {
      id: ebook.id,
      title: ebook.title,
      subtitle: `e-Kitap • ${ebook.total_pages} sayfa`,
      type: "ebook",
    },
  ].filter(Boolean) as { id: string; title: string; subtitle: string; type: string }[];

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <PText style={styles.headerTitle}>İçerik Asistanı</PText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <PText style={styles.heroEmoji}>✨</PText>
          <PText style={styles.heroTitle}>Önerilerin hazır</PText>
          <PText style={styles.heroSubtitle}>Sana uygun içerikleri listeledik.</PText>
        </View>

        <PCard style={styles.primaryCard}>
          <PText style={styles.cardLabel}>Önerilen Yolculuk</PText>
          <PText style={styles.cardTitle}>{primaryTitle}</PText>
          <PText style={styles.cardMeta}>{primaryMeta}</PText>
          <PText style={styles.cardDetail}>{primaryDetail}</PText>
          <View style={styles.primaryActions}>
            <PButton
              mode="contained"
              disabled={isOffline}
              onPress={() =>
                journey &&
                navigation.navigate("Content", {
                  screen: "ContentJourneyDetail",
                  params: { id: journey.id },
                })
              }
              style={styles.primaryAction}
            >
              Hemen Başla
            </PButton>
            <PButton
              mode="outlined"
              disabled={isOffline}
              onPress={() =>
                journey &&
                navigation.navigate("Content", {
                  screen: "ContentJourneyDetail",
                  params: { id: journey.id },
                })
              }
            >
              Detayları Gör
            </PButton>
          </View>
        </PCard>

        <PText style={styles.sectionTitle}>Alternatifler</PText>
        {alternatives.slice(0, 2).map((item) => (
          <PCard key={item.id} style={styles.altCard}>
            <PText style={styles.altTitle}>{item.title}</PText>
            <PText style={styles.altMeta}>{item.subtitle}</PText>
            <PButton
              mode="outlined"
              disabled={isOffline}
              onPress={() => {
                if (item.type === "workshop") {
                  navigation.navigate("Content", {
                    screen: "ContentWorkshopDetail",
                    params: { id: item.id },
                  });
                }
                if (item.type === "module") {
                  navigation.navigate("Content", {
                    screen: "ContentModuleDetail",
                    params: { id: item.id },
                  });
                }
                if (item.type === "ebook") {
                  navigation.navigate("Content", {
                    screen: "ContentEbookDetail",
                    params: { id: item.id },
                  });
                }
              }}
            >
              İncele
            </PButton>
          </PCard>
        ))}

        <PCard style={styles.ctaCard}>
          <PText style={styles.ctaTitle}>Kataloğa Dön</PText>
          <PText style={styles.ctaText}>
            Daha fazla içerik görmek için keşfet sayfasına dönebilirsin.
          </PText>
          <PButton
            mode="contained"
            disabled={isOffline}
            onPress={() => navigation.navigate("DiscoverCatalog")}
          >
            Kataloğa Git
          </PButton>
        </PCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export const DiscoverAssistantResultsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={96} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Öneri bulunamadı"
            description="Seçimlerini güncelleyerek yeniden deneyebilirsin."
            actionLabel="Soruları Güncelle"
            icon="playlist-edit"
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
            title="Öneriler yüklenemedi"
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
        <DiscoverAssistantResultsContent isOffline />
      </SafeAreaView>
    );
  }

  return <DiscoverAssistantResultsContent />;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2B1B5D",
  },
  content: {
    padding: 16,
  },
  hero: {
    alignItems: "center",
    marginBottom: 24,
  },
  heroEmoji: {
    fontSize: 46,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B1B5D",
    textAlign: "center",
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "#525252",
    textAlign: "center",
  },
  primaryCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00B4D8",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: "#737373",
    marginBottom: 10,
  },
  cardDetail: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 12,
  },
  primaryActions: {
    gap: 8,
  },
  primaryAction: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 10,
  },
  altCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  altTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
  },
  altMeta: {
    fontSize: 13,
    color: "#737373",
    marginBottom: 12,
  },
  ctaCard: {
    padding: 16,
    borderRadius: 16,
    marginTop: 8,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 6,
  },
  ctaText: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 12,
  },
});
