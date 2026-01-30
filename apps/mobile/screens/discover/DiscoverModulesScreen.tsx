import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getModules, getPackages } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PIconButton, PText } from "../../components";

const sortOptions = ["Önerilen", "Popüler", "Yeni"];
const cardEmojis = ["📦", "🧩", "📘", "🧠"];
const cardColors = ["#E0F7FA", "#D1FAE5", "#E9D5FF", "#FDE68A"];

const DiscoverModulesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const modules = getModules();
  const packages = getPackages();

  return (
    <View>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <PText style={styles.title}>Modüller</PText>
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

      {modules.map((item, index) => {
        const packageCount = packages.filter((pkg) => pkg.module_id === item.id).length || 3;
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
            <View style={styles.cardRow}>
              <View style={[styles.cardIcon, { backgroundColor: cardColors[index % cardColors.length] }]}>
                <PText style={styles.cardEmoji}>{cardEmojis[index % cardEmojis.length]}</PText>
              </View>
              <View style={styles.cardInfo}>
                <PText style={styles.cardTitle}>{item.title}</PText>
                <PText style={styles.cardMeta}>{packageCount} paket</PText>
              </View>
            </View>
          </PCard>
        );
      })}

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
            title="Modül bulunamadı"
            description="Yeni modüller kısa süre içinde eklenecek."
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
            title="Modüller yüklenemedi"
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
  },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardEmoji: {
    fontSize: 28,
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
  cardMeta: {
    fontSize: 13,
    color: "#737373",
  },
  bottomSpacer: {
    height: 24,
  },
});
