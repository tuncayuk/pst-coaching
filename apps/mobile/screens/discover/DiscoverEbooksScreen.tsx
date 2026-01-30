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

const DiscoverEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const ebooks = getEbooks();

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <PText style={styles.title}>e-Kitaplar</PText>
        </View>
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

      <View style={styles.grid}>
        {ebooks.map((item, index) => (
          <Pressable
            key={item.id}
            style={styles.gridItem}
            disabled={isOffline}
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
                index % 4 === 0 && styles.coverSuccess,
                index % 4 === 1 && styles.coverPrimary,
                index % 4 === 2 && styles.coverSecondary,
                index % 4 === 3 && styles.coverWarning,
              ]}
            >
              <PText style={styles.coverEmoji}>
                {index % 4 === 0 ? "📖" : index % 4 === 1 ? "📘" : index % 4 === 2 ? "📕" : "📗"}
              </PText>
            </View>
            <PText style={styles.bookTitle}>{item.title}</PText>
            <PText style={styles.bookAuthor}>PST Coaching</PText>
            <PText style={styles.bookMeta}>
              {item.total_pages ?? 184} sayfa • ~{Math.max(3, Math.round((item.total_pages ?? 180) / 60))}h
            </PText>
          </Pressable>
        ))}
      </View>

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
          <SkeletonBlock height={18} />
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
            title="e-Kitap bulunamadı"
            description="Yakında yeni e-Kitaplar eklenecek."
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
            title="e-Kitaplar yüklenemedi"
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  },
  filterButtonLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
  gridItem: {
    flexBasis: "48%",
  },
  cover: {
    height: 180,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    backgroundColor: "#D1FAE5",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  coverSuccess: {
    backgroundColor: "#D1FAE5",
  },
  coverPrimary: {
    backgroundColor: "#B2EBF2",
  },
  coverSecondary: {
    backgroundColor: "#E9D5FF",
  },
  coverWarning: {
    backgroundColor: "#FDE68A",
  },
  coverEmoji: {
    fontSize: 48,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 4,
    lineHeight: 18,
  },
  bookAuthor: {
    fontSize: 12,
    color: "#525252",
    marginBottom: 2,
  },
  bookMeta: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  bottomSpacer: {
    height: 24,
  },
});
