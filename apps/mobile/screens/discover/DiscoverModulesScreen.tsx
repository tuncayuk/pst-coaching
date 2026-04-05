import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getModules, getPackagesForModule } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PIconButton, PText } from "../../components";

const SORT_OPTIONS = ["Tumu", "Onerilen", "Populer", "Yeni"];
const TOPIC_OPTIONS = [
  { key: "tumu", label: "Tumu" },
  { key: "gelisim", label: "Gelisim" },
  { key: "maneviyat", label: "Maneviyat" },
  { key: "denge", label: "Denge" },
];
const CARD_EMOJIS = ["📦", "🧩", "📘", "🧠"];
const CARD_COLORS = ["#E0F7FA", "#D1FAE5", "#E9D5FF", "#FDE68A"];
const TOPICS = ["gelisim", "maneviyat", "denge", "gelisim"];

const DiscoverModulesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const modules = getModules();
  const [selectedSort, setSelectedSort] = React.useState("Tumu");
  const [selectedTopic, setSelectedTopic] = React.useState("tumu");

  const moduleTopic = (index: number) => TOPICS[index % TOPICS.length];

  const filtered = modules.filter((_m, i) =>
    selectedTopic === "tumu" ? true : moduleTopic(i) === selectedTopic
  );

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === "Populer") return b.id.localeCompare(a.id);
    if (selectedSort === "Yeni") return a.id.localeCompare(b.id);
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
          <PText style={styles.title}>Moduller</PText>
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

      {/* Topic filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {TOPIC_OPTIONS.map((topic) => (
          <PButton
            key={topic.key}
            mode={selectedTopic === topic.key ? "contained" : "outlined"}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedTopic === topic.key ? "#00B4D8" : "transparent"}
            textColor={selectedTopic === topic.key ? "#FFFFFF" : "#2B1B5D"}
            onPress={() => setSelectedTopic(topic.key)}
          >
            {topic.label}
          </PButton>
        ))}
      </ScrollView>

      {sorted.length === 0 ? (
        <StateMessage
          title="Sonuc bulunamadi"
          description="Baska bir konu filtresi deneyin."
          actionLabel="Tumu Goster"
          icon="filter-remove-outline"
        />
      ) : (
        sorted.map((item) => {
          const origIndex = modules.findIndex((m) => m.id === item.id);
          const packages = getPackagesForModule(item.id);
          const pkgCount = packages.length || (3 + (origIndex % 2));
          const color = CARD_COLORS[origIndex % CARD_COLORS.length];
          const emoji = CARD_EMOJIS[origIndex % CARD_EMOJIS.length];
          const previewPkgs = packages.slice(0, 2);

          return (
            <PCard
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("Content", {
                  screen: "ContentModuleHome",
                  params: { id: item.id },
                })
              }
            >
              <View style={styles.cardTop}>
                <View style={[styles.cardIcon, { backgroundColor: color }]}>
                  <PText style={styles.cardEmoji}>{emoji}</PText>
                </View>
                <View style={styles.cardInfo}>
                  <PText style={styles.cardTitle}>{item.title}</PText>
                  <PText style={styles.cardDescription} numberOfLines={2}>
                    {item.description ?? "Bu modul icin icerik mevcut."}
                  </PText>
                  <View style={styles.pkgCountRow}>
                    <PText style={styles.pkgCountChip}>📦 {pkgCount} paket</PText>
                  </View>
                </View>
              </View>
              {previewPkgs.length > 0 && (
                <View style={styles.pkgPreview}>
                  {previewPkgs.map((pkg, pi) => (
                    <View key={pkg.id} style={styles.pkgRow}>
                      <PText style={styles.pkgIndex}>{pi + 1}</PText>
                      <View style={styles.pkgInfo}>
                        <PText style={styles.pkgTitle}>{pkg.title}</PText>
                        {pkg.description ? (
                          <PText style={styles.pkgDesc} numberOfLines={1}>
                            {pkg.description}
                          </PText>
                        ) : null}
                      </View>
                    </View>
                  ))}
                  {pkgCount > 2 && (
                    <PText style={styles.moreText}>+{pkgCount - 2} daha</PText>
                  )}
                </View>
              )}
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
                      screen: "ContentModuleHome",
                      params: { id: item.id },
                    })
                  }
                >
                  Modulu Baslat
                </PButton>
              </View>
            </PCard>
          );
        })
      )}
      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverModulesScreen = ({
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
            title="Modul bulunamadi"
            description="Yeni moduller kisa sure icinde eklenecek."
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
            title="Moduller yuklenemedi"
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
          <DiscoverModulesContent isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <DiscoverModulesContent />
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
  card: { borderRadius: 16, marginBottom: 16, overflow: "hidden" },
  cardTop: { flexDirection: "row", gap: 12, padding: 16 },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardEmoji: { fontSize: 28 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#171717", marginBottom: 4 },
  cardDescription: { fontSize: 12, color: "#737373", marginBottom: 6, lineHeight: 16 },
  pkgCountRow: { flexDirection: "row" },
  pkgCountChip: {
    backgroundColor: "#E0F7FA",
    color: "#00758C",
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  pkgPreview: {
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  pkgRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 },
  pkgIndex: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    backgroundColor: "#2B1B5D",
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: "center",
    lineHeight: 18,
    flexShrink: 0,
  },
  pkgInfo: { flex: 1 },
  pkgTitle: { fontSize: 13, fontWeight: "600", color: "#171717" },
  pkgDesc: { fontSize: 11, color: "#737373", marginTop: 1 },
  moreText: { fontSize: 11, color: "#9CA3AF", marginBottom: 4 },
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
