import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAchievements, getPrimaryUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PText } from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const ContentAchievementContent = ({
  achievementId,
  isOffline,
}: {
  achievementId?: string;
  isOffline?: boolean;
}) => {
  const user = getPrimaryUser();
  const achievement =
    getAchievements().find((item) => item.id === achievementId) ??
    getAchievements().find((item) => item.user_id === user?.id);

  return (
    <View style={styles.body}>
      <PText style={styles.emoji}>🎓</PText>
      <PText style={styles.title}>Tebrikler!</PText>
      <PText style={styles.subtitle}>
        <PText style={styles.subtitleStrong}>Ozfarkindalik Modulu</PText>'nu basariyla tamamladiniz.
      </PText>

      <PCard style={styles.summaryCard}>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <PText style={styles.summaryValue}>4</PText>
            <PText style={styles.summaryLabel}>Paket</PText>
          </View>
          <View style={styles.summaryItem}>
            <PText style={styles.summaryValue}>18</PText>
            <PText style={styles.summaryLabel}>Bolum</PText>
          </View>
          <View style={styles.summaryItem}>
            <PText style={styles.summaryValue}>3h</PText>
            <PText style={styles.summaryLabel}>Sure</PText>
          </View>
        </View>
        <PText style={styles.trophy}>🏆</PText>
        <PText style={styles.summaryTitle}>Ozfarkindalik Uzmani</PText>
        <PText style={styles.summarySubtitle}>Modul sertifikasini kazandiniz!</PText>
      </PCard>

      <PCard style={styles.successCard}>
        <PText style={styles.successTitle}>📊 Gelisim Panelinize Yansidi</PText>
        <PText style={styles.successText}>
          Bu basari, gelisim panelinizde gorunur ve ilerleme istatistiklerinize eklenmistir.
        </PText>
        <View style={styles.badgeRow}>
          <PText style={styles.badge}>+100 XP</PText>
          <PText style={styles.badge}>🏅 Rozet Kazanildi</PText>
        </View>
      </PCard>

      <PCard style={styles.nextCard}>
        <PText style={styles.nextTitle}>📦 Sonraki Onerimiz</PText>
        <PText style={styles.nextText}>
          <PText style={styles.nextStrong}>Duygusal Zeka Modulu</PText> ozfarkindalik becerilerinizi
          bir ust seviyeye tasiyacak.
        </PText>
        <PText style={styles.nextLink}>Kesfet →</PText>
      </PCard>

      <PButton mode="contained" disabled={isOffline} style={styles.primaryButton}>
        Ana Sayfaya Don
      </PButton>
      <PButton mode="outlined" disabled={isOffline}>
        Sertifikami Paylas
      </PButton>
    </View>
  );
};

export const ContentAchievementScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const achievementId = route?.params?.id;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
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
            title="Basarim bulunamadi"
            description="Henuz bir sertifika veya rozetin yok."
            actionLabel="Iceriklere Git"
            icon="trophy-outline"
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
            title="Basarim yuklenemedi"
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
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  page: {
    paddingBottom: 32,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: "center",
  },
  emoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#525252",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitleStrong: {
    fontWeight: "700",
    color: "#2B1B5D",
  },
  summaryCard: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    borderWidth: 2,
    borderColor: "#00B4D8",
    marginBottom: 16,
    alignItems: "center",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1D4ED8",
  },
  summaryLabel: {
    fontSize: 11,
    color: "#525252",
  },
  trophy: {
    fontSize: 40,
    marginBottom: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  summarySubtitle: {
    fontSize: 12,
    color: "#1F2937",
  },
  successCard: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#D1FAE5",
    borderLeftWidth: 4,
    borderLeftColor: "#16A34A",
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#166534",
    marginBottom: 8,
  },
  successText: {
    fontSize: 12,
    color: "#1F2937",
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  badge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: "600",
    color: "#166534",
  },
  nextCard: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#EDE7F6",
    borderLeftWidth: 4,
    borderLeftColor: "#2B1B5D",
    marginBottom: 16,
  },
  nextTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2B1B5D",
    marginBottom: 8,
  },
  nextText: {
    fontSize: 12,
    color: "#1F2937",
    marginBottom: 8,
  },
  nextStrong: {
    fontWeight: "700",
    color: "#2B1B5D",
  },
  nextLink: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2B1B5D",
  },
  primaryButton: {
    width: "100%",
    marginBottom: 10,
  },
});
