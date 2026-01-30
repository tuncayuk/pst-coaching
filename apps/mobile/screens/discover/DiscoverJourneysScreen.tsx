import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getJourneys } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PText } from "../../components";

const sortOptions = ["Önerilen", "Popüler", "Yeni"];
const cardEmojis = ["🎯", "🙏", "🌿", "🧘‍♀️"];
const cardColors = ["#FFDDC1", "#D1FAE5", "#E9D5FF", "#FDE68A"];

const DiscoverJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journeys = getJourneys();

  return (
    <View>
      <View style={styles.headerRow}>
        <PText style={styles.title}>Yolculuklar</PText>
        <PButton
          mode="contained"
          disabled={isOffline}
          buttonColor="#F5F5F5"
          textColor="#525252"
          style={styles.filterButton}
          contentStyle={styles.filterButtonContent}
          labelStyle={styles.filterButtonLabel}
        >
          🔍 Filtrele
        </PButton>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sortRow}>
        {sortOptions.map((label, index) => (
          <PButton
            key={label}
            mode="contained"
            disabled={isOffline}
            style={styles.sortButton}
            contentStyle={styles.sortButtonContent}
            labelStyle={styles.sortButtonLabel}
            buttonColor={index === 0 ? "#00B4D8" : "#F5F5F5"}
            textColor={index === 0 ? "#FFFFFF" : "#525252"}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      {journeys.map((item, index) => {
        const duration = item.duration_days ?? 40;
        const level = item.level ?? "Başlangıç";
        const modules = 3 + (index % 2);
        const workshops = 2 + (index % 2);
        const ebooks = 1 + (index % 2);

        return (
          <PCard
            key={item.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Content", {
                screen: "ContentJourneyDetail",
                params: { id: item.id },
              })
            }
          >
            <View style={styles.cardRow}>
              <View style={[styles.cardIcon, { backgroundColor: cardColors[index % cardColors.length] }]}>
                <PText style={styles.cardEmoji}>{cardEmojis[index % cardEmojis.length]}</PText>
              </View>
              <View style={styles.cardInfo}>
                <PText style={styles.cardTitle}>{item.title}</PText>
                <View style={styles.cardMetaRow}>
                  <PText style={styles.cardMeta}>⏱️ {duration} gün</PText>
                  <PText style={styles.cardMeta}>📊 {level}</PText>
                </View>
                <View style={styles.cardChipRow}>
                  <PText style={styles.cardChipPrimary}>📦 {modules} Modül</PText>
                  <PText style={styles.cardChipSuccess}>🎨 {workshops} Atölye</PText>
                  <PText style={styles.cardChipSecondary}>📖 {ebooks} Kitap</PText>
                </View>
              </View>
            </View>
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 96,
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
    elevation: 0,
  },
  filterButtonContent: {
    height: 36,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonLabel: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 16,
  },
  sortRow: {
    gap: 8,
    paddingBottom: 8,
    marginBottom: 16,
  },
  sortButton: {
    borderRadius: 8,
  },
  sortButtonContent: {
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  sortButtonLabel: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
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
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardEmoji: {
    fontSize: 32,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 6,
  },
  cardMetaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 6,
  },
  cardMeta: {
    fontSize: 13,
    color: "#737373",
  },
  cardChipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  cardChipPrimary: {
    backgroundColor: "#E0F7FA",
    color: "#00758C",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cardChipSuccess: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cardChipSecondary: {
    backgroundColor: "#EDE7F6",
    color: "#2B1B5D",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  bottomSpacer: {
    height: 24,
  },
});
