import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getJourneys } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";

const sortOptions = ["Önerilen", "Popüler", "Yeni"];
const filterOptions = ["Hedef", "Süre", "Seviye"];

const DiscoverJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journeys = getJourneys();

  return (
    <View>
      <View style={styles.headerRow}>
        <PText style={styles.title}>Yolculuklar</PText>
        <PButton mode="outlined" compact disabled={isOffline} style={styles.filterButton}>
          🔍 Filtrele
        </PButton>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
        {sortOptions.map((label, index) => (
          <PButton
            key={label}
            mode={index === 0 ? "contained" : "outlined"}
            compact
            disabled={isOffline}
            style={styles.sortButton}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      <View style={styles.filterRow}>
        {filterOptions.map((label) => (
          <PChip key={label} style={styles.filterChip} disabled={isOffline}>
            {label}
          </PChip>
        ))}
      </View>

      {journeys.map((item) => {
        const duration = item.duration_days ?? 40;
        const level = item.level ?? "Başlangıç";
        const modules = 3;
        const workshops = 2;
        const ebooks = 1;

        return (
          <PCard key={item.id} style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardIcon}>
                <PText style={styles.cardEmoji}>🎯</PText>
              </View>
              <View style={styles.cardInfo}>
                <PText style={styles.cardTitle}>{item.title}</PText>
                <PText style={styles.cardMeta}>{duration} gün • {level}</PText>
                <PText style={styles.cardSubMeta}>
                  📦 {modules} Modül • 🎨 {workshops} Atölye • 📖 {ebooks} e-Kitap
                </PText>
              </View>
            </View>
            <PButton
              mode="outlined"
              disabled={isOffline}
              onPress={() =>
                navigation.navigate("Content", {
                  screen: "ContentJourneyDetail",
                  params: { id: item.id },
                })
              }
            >
              İncele
            </PButton>
          </PCard>
        );
      })}

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverJourneysScreen = ({
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
          <SkeletonBlock height={100} />
          <SkeletonBlock height={100} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Yolculuk bulunamadı"
            description="Yeni içerikler kısa süre içinde eklenecek."
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
            title="Yolculuklar yüklenemedi"
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
          <DiscoverJourneysContent isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <DiscoverJourneysContent />
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2B1B5D",
  },
  filterButton: {
    borderRadius: 8,
  },
  sortRow: {
    gap: 8,
    paddingBottom: 8,
    marginBottom: 12,
  },
  sortButton: {
    borderRadius: 10,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    backgroundColor: "#F5F5F5",
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  cardIcon: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#FFDDC1",
    alignItems: "center",
    justifyContent: "center",
  },
  cardEmoji: {
    fontSize: 26,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: "#525252",
    marginBottom: 6,
  },
  cardSubMeta: {
    fontSize: 12,
    color: "#525252",
  },
  bottomSpacer: {
    height: 24,
  },
});
