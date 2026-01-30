import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getEbooks,
  getJourneyById,
  getModules,
  getWorkshops,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PCard,
  PChip,
  PIconButton,
  PText,
} from "../../components";

const ContentJourneyDetailContent = ({ journeyId, isOffline }: { journeyId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journey = getJourneyById(journeyId);
  const modules = getModules().slice(0, 2);
  const workshops = getWorkshops().slice(0, 1);
  const ebooks = getEbooks().slice(0, 1);
  const duration = journey?.duration_days ?? 40;
  const level = journey?.level ?? "Başlangıç";
  const dailyGoal = journey?.daily_target ?? "10-20 dk/gün";

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>🎯</PText>
        <PIconButton icon="arrow-left" style={styles.heroBack} onPress={() => navigation.goBack()} />
        <PIconButton icon="heart-outline" style={styles.heroFav} />
      </View>

      <View style={styles.content}>
        <PText style={styles.title}>{journey?.title ?? "Sıdk ve Integrity Yolculuğu"}</PText>
        <View style={styles.tagRow}>
          <PText style={styles.tagPrimary}>⏱️ {duration} gün</PText>
          <PText style={styles.tagSuccess}>📊 {level}</PText>
          <PText style={styles.tagSecondary}>📅 {dailyGoal}</PText>
        </View>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Yolculuk Hakkında</PText>
          <PText style={styles.paragraph}>
            Sıdk ve doğruluk üzerine derinlemesine bir keşif yolculuğu. Kendi gerçekliğinizle yüzleşin, içsel bütünlüğünüzü güçlendirin.
          </PText>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>İçerik</PText>
          <View style={styles.contentList}>
            {modules.map((item) => (
              <View key={item.id} style={styles.contentRow}>
                <PText style={styles.contentEmoji}>📦</PText>
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle}>{item.title}</PText>
                  <PText style={styles.contentMeta}>5 paket</PText>
                </View>
              </View>
            ))}
            {workshops.map((item) => (
              <View key={item.id} style={styles.contentRow}>
                <PText style={styles.contentEmoji}>🎨</PText>
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle}>{item.title}</PText>
                  <PText style={styles.contentMeta}>8 okuma • 4 uygulama</PText>
                </View>
              </View>
            ))}
            {ebooks.map((item) => (
              <View key={item.id} style={styles.contentRow}>
                <PText style={styles.contentEmoji}>📖</PText>
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle}>{item.title}</PText>
                  <PText style={styles.contentMeta}>{item.total_pages ?? 256} sayfa</PText>
                </View>
              </View>
            ))}
          </View>
        </PCard>

        <PButton mode="contained" disabled={isOffline}>
          Yolculuğu Başlat
        </PButton>
      </View>
    </View>
  );
};

export const ContentJourneyDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const journeyId = route?.params?.id;

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
            title="Yolculuk bulunamadı"
            description="Bu yolculuk şu anda erişilebilir değil."
            actionLabel="Keşfe Dön"
            icon="map-outline"
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
            title="Yolculuk yüklenemedi"
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
        <ScrollView contentContainerStyle={styles.page}>
          <OfflineNotice />
          <ContentJourneyDetailContent journeyId={journeyId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentJourneyDetailContent journeyId={journeyId} />
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
    paddingBottom: 24,
  },
  hero: {
    height: 200,
    backgroundColor: "#FFDDC1",
    alignItems: "center",
    justifyContent: "center",
  },
  heroEmoji: {
    fontSize: 64,
  },
  heroBack: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  heroFav: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  content: {
    padding: 16,
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
  tagPrimary: {
    backgroundColor: "#E0F7FA",
    color: "#0096B8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  tagSuccess: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  tagSecondary: {
    backgroundColor: "#EDE7F6",
    color: "#2B1B5D",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  sectionCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: "#525252",
    lineHeight: 20,
  },
  contentList: {
    gap: 12,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
  },
  contentEmoji: {
    fontSize: 20,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 4,
  },
  contentMeta: {
    fontSize: 12,
    color: "#525252",
  },
});
