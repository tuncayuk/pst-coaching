import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PActivityIndicator, PButton, PCard, PIconButton, PText } from "../../components";
import { getJourneys, getPackages } from "../../data/mockSelectors";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenState, resolveScreenState } from "../components/ScreenState";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";

const SORT_OPTIONS = ["Tumu", "Onerilen", "Populer", "Yeni"];
const LEVEL_OPTIONS = [
  { key: "tumu", label: "Tumu" },
  { key: "baslangic", label: "Baslangic" },
  { key: "orta", label: "Orta" },
  { key: "ileri", label: "Ileri" },
];
const CARD_EMOJIS = ["🎯", "🙏", "🌿", "🧘"];
const CARD_COLORS = ["#FFDDC1", "#D1FAE5", "#E9D5FF", "#FDE68A"];
const LEVEL_LABELS: Record<string, string> = {
  baslangic: "Baslangic",
  beginner: "Baslangic",
  orta: "Orta",
  intermediate: "Orta",
  ileri: "Ileri",
  advanced: "Ileri",
};
const BEGINNER_KEYS = new Set(["baslangic", "beginner"]);
const ORTA_KEYS = new Set(["orta", "intermediate"]);
const ILERI_KEYS = new Set(["ileri", "advanced"]);

const DiscoverJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const allJourneys = getJourneys();
  const packages = getPackages();
  const [selectedSort, setSelectedSort] = React.useState("Tumu");
  const [selectedLevel, setSelectedLevel] = React.useState("tumu");
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const levelMatches = (journeyLevel: string) => {
    if (selectedLevel === "tumu") return true;
    if (selectedLevel === "baslangic") return BEGINNER_KEYS.has(journeyLevel);
    if (selectedLevel === "orta") return ORTA_KEYS.has(journeyLevel);
    if (selectedLevel === "ileri") return ILERI_KEYS.has(journeyLevel);
    return true;
  };

  const filtered = allJourneys.filter((j) => levelMatches(j.level));

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === "Populer") return (b.duration_days ?? 0) - (a.duration_days ?? 0);
    if (selectedSort === "Yeni") return b.id.localeCompare(a.id);
    if (selectedSort === "Onerilen") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <PIconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Geri"
          />
          <PText style={styles.title}>Yolculuklar</PText>
        </View>
        <View style={styles.countBadge}>
          <PText style={styles.countBadgeText}>{sorted.length}</PText>
        </View>
      </View>

      {/* Sort chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {SORT_OPTIONS.map((label) => (
          <PButton
            key={label}
            mode="contained"
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedSort === label ? "#2B1B5D" : "#F5F5F5"}
            textColor={selectedSort === label ? "#FFFFFF" : "#525252"}
            onPress={() => setSelectedSort(label)}
          >
            {label}
          </PButton>
        ))}
      </ScrollView>

      {/* Level filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {LEVEL_OPTIONS.map((lvl) => (
          <PButton
            key={lvl.key}
            mode={selectedLevel === lvl.key ? "contained" : "outlined"}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedLevel === lvl.key ? "#00B4D8" : "transparent"}
            textColor={selectedLevel === lvl.key ? "#FFFFFF" : "#2B1B5D"}
            onPress={() => setSelectedLevel(lvl.key)}
          >
            {lvl.label}
          </PButton>
        ))}
      </ScrollView>

      {sorted.length === 0 ? (
        <StateMessage
          title="Sonuc bulunamadi"
          description="Baska bir seviye filtresi deneyin."
          actionLabel="Tumu Goster"
          icon="filter-remove-outline"
        />
      ) : (
        sorted.map((item, index) => {
          const origIndex = allJourneys.findIndex((j) => j.id === item.id);
          const duration = item.duration_days ?? 40;
          const level = LEVEL_LABELS[item.level] ?? item.level;
          const pkgCount =
            packages.filter((p) =>
              item.featured_modules?.some((mid: string) => p.module_id === mid)
            ).length || 3 + (origIndex % 2);
          const workshopCount = item.featured_workshops?.length || 2 + (origIndex % 2);
          const ebookCount = item.featured_ebooks?.length || 1;
          const isFav = favorites.has(item.id);
          const color = CARD_COLORS[origIndex % CARD_COLORS.length];
          const emoji = CARD_EMOJIS[origIndex % CARD_EMOJIS.length];

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
              <View style={styles.cardInner}>
                <View style={styles.cardTop}>
                  <View style={[styles.cardIcon, { backgroundColor: color }]}>
                    <PText style={styles.cardEmoji}>{emoji}</PText>
                  </View>
                  <View style={styles.cardInfo}>
                    <PText style={styles.cardTitle}>{item.title}</PText>
                    <View style={styles.cardMetaRow}>
                      <PText style={styles.cardMeta}>⏱ {duration} gun</PText>
                      <PText style={styles.cardMetaSep}>·</PText>
                      <PText style={styles.cardMeta}>📊 {level}</PText>
                    </View>
                    <PText style={styles.cardTarget}>{item.daily_target ?? "10 dk/gun"}</PText>
                    <View style={styles.chipRow}>
                      <PText style={styles.chipPrimary}>📦 {pkgCount} Modul</PText>
                      <PText style={styles.chipSuccess}>🎨 {workshopCount} Atolye</PText>
                      <PText style={styles.chipSecondary}>📖 {ebookCount} Kitap</PText>
                    </View>
                  </View>
                  <PIconButton
                    icon={isFav ? "heart" : "heart-outline"}
                    size={20}
                    iconColor={isFav ? "#E11D48" : "#9CA3AF"}
                    onPress={() => !isOffline && toggleFavorite(item.id)}
                    style={styles.favButton}
                    accessibilityLabel={isFav ? "Favorilerden kaldir" : "Favorilere ekle"}
                  />
                </View>
                <View style={styles.cardFooter}>
                  <PButton
                    mode="contained"
                    compact
                    disabled={isOffline}
                    style={styles.startButton}
                    contentStyle={styles.startButtonContent}
                    labelStyle={styles.startButtonLabel}
                    buttonColor="#2B1B5D"
                    onPress={() =>
                      navigation.navigate("Content", {
                        screen: "ContentJourneyDetail",
                        params: { id: item.id },
                      })
                    }
                  >
                    Yolculugu Baslat
                  </PButton>
                </View>
              </View>
            </PCard>
          );
        })
      )}
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
          <SkeletonBlock height={36} />
          <SkeletonBlock height={120} />
          <SkeletonBlock height={120} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Yolculuk bulunamadi"
            description="Yeni icerikler kisa sure icinde eklenecek."
            actionLabel="Bildirimleri Ac"
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
            title="Yolculuklar yuklenemedi"
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
  root: { flex: 1, backgroundColor: "#FAFAFA" },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 96 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 4 },
  title: { fontSize: 26, fontWeight: "800", color: "#2B1B5D" },
  countBadge: {
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadgeText: { fontSize: 12, fontWeight: "700", color: "#00758C" },
  chipsRow: { gap: 8, paddingBottom: 4, marginBottom: 12 },
  chip: { borderRadius: 20, elevation: 0 },
  chipContent: { height: 34, paddingHorizontal: 4 },
  chipLabel: { fontSize: 12, fontWeight: "600" },
  card: { borderRadius: 16, marginBottom: 16 },
  cardInner: { borderRadius: 16, overflow: "hidden" },
  cardTop: { flexDirection: "row", gap: 12, padding: 16 },
  cardIcon: {
    width: 72,
    height: 72,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardEmoji: { fontSize: 30 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#171717", marginBottom: 4 },
  cardMetaRow: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 },
  cardMeta: { fontSize: 12, color: "#737373" },
  cardMetaSep: { fontSize: 12, color: "#D4D4D4" },
  cardTarget: { fontSize: 11, color: "#00758C", fontWeight: "600", marginBottom: 6 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
  chipPrimary: {
    backgroundColor: "#E0F7FA",
    color: "#00758C",
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  chipSuccess: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  chipSecondary: {
    backgroundColor: "#EDE7F6",
    color: "#2B1B5D",
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  favButton: { margin: 0, alignSelf: "flex-start" },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  startButton: { borderRadius: 8, elevation: 0 },
  startButtonContent: { height: 36, paddingHorizontal: 16 },
  startButtonLabel: { fontSize: 13, fontWeight: "700" },
  bottomSpacer: { height: 24 },
});
