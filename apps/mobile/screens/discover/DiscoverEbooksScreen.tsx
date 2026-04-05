import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbooks } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PIconButton, PText } from "../../components";

const SORT_OPTIONS = ["Tumu", "Onerilen", "Populer", "Yeni"];
const COVER_COLORS = ["#B2EBF2", "#D1FAE5", "#E9D5FF", "#FDE68A"];
const COVER_EMOJIS = ["📖", "📘", "📕", "📗"];

const DiscoverEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const ebooks = getEbooks();
  const [selectedSort, setSelectedSort] = React.useState("Tumu");
  const [selectedCategory, setSelectedCategory] = React.useState("Tumu");

  const categories = [
    "Tumu",
    ...Array.from(new Set(ebooks.map((e) => e.category ?? "Diger"))),
  ];

  const filtered = ebooks.filter((e) =>
    selectedCategory === "Tumu" ? true : (e.category ?? "Diger") === selectedCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === "Populer") return (b.total_pages ?? 0) - (a.total_pages ?? 0);
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
          <PText style={styles.title}>e-Kitaplar</PText>
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

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsRow}
      >
        {categories.map((cat) => (
          <PButton
            key={cat}
            mode={selectedCategory === cat ? "contained" : "outlined"}
            compact
            disabled={isOffline}
            style={styles.chip}
            contentStyle={styles.chipContent}
            labelStyle={styles.chipLabel}
            buttonColor={selectedCategory === cat ? "#00B4D8" : "transparent"}
            textColor={selectedCategory === cat ? "#FFFFFF" : "#2B1B5D"}
            onPress={() => setSelectedCategory(cat)}
          >
            {cat}
          </PButton>
        ))}
      </ScrollView>

      {sorted.length === 0 ? (
        <StateMessage
          title="Sonuc bulunamadi"
          description="Baska bir kategori filtresi deneyin."
          actionLabel="Tumu Goster"
          icon="filter-remove-outline"
        />
      ) : (
        <View style={styles.grid}>
          {sorted.map((item) => {
            const origIndex = ebooks.findIndex((e) => e.id === item.id);
            const pages = item.total_pages ?? 180;
            const readHours = Math.max(1, Math.round(pages / 60));
            return (
              <Pressable
                key={item.id}
                style={styles.gridItem}
                disabled={isOffline}
                accessibilityRole="button"
                accessibilityLabel={item.title}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentEbookDetail",
                    params: { id: item.id },
                  })
                }
              >
                <View
                  style={[
                    styles.cover,
                    { backgroundColor: COVER_COLORS[origIndex % COVER_COLORS.length] },
                  ]}
                >
                  <PText style={styles.coverEmoji}>
                    {COVER_EMOJIS[origIndex % COVER_EMOJIS.length]}
                  </PText>
                  {item.featured && (
                    <View style={styles.featuredBadge}>
                      <PText style={styles.featuredBadgeText}>One Cikan</PText>
                    </View>
                  )}
                </View>
                <PText style={styles.bookTitle} numberOfLines={2}>{item.title}</PText>
                <PText style={styles.bookCategory}>{item.category ?? "Genel"}</PText>
                <PText style={styles.bookMeta}>{pages} s. · ~{readHours}s</PText>
              </Pressable>
            );
          })}
        </View>
      )}
      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const DiscoverEbooksScreen = ({
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
          <SkeletonBlock height={200} />
          <SkeletonBlock height={200} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="e-Kitap bulunamadi"
            description="Yakinda yeni e-Kitaplar eklenecek."
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
            title="e-Kitaplar yuklenemedi"
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
          <DiscoverEbooksContent isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.content}>
        <DiscoverEbooksContent />
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
    backgroundColor: "#EDE7F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadgeText: { fontSize: 12, fontWeight: "700", color: "#4C1D95" },
  chipsRow: { gap: 8, paddingBottom: 4, marginBottom: 12 },
  chip: { borderRadius: 20, elevation: 0 },
  chipContent: { height: 34, paddingHorizontal: 4 },
  chipLabel: { fontSize: 12, fontWeight: "600" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
  gridItem: { flexBasis: "48%" },
  cover: {
    height: 180,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  coverEmoji: { fontSize: 48 },
  featuredBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#2B1B5D",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  featuredBadgeText: { fontSize: 9, fontWeight: "700", color: "#FFFFFF" },
  bookTitle: { fontSize: 13, fontWeight: "700", color: "#171717", lineHeight: 17, marginBottom: 3 },
  bookCategory: { fontSize: 11, color: "#00758C", fontWeight: "600", marginBottom: 2 },
  bookMeta: { fontSize: 11, color: "#9CA3AF", marginBottom: 4 },
  bottomSpacer: { height: 24 },
});
