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
  PRadioButtonGroup,
  PRadioButtonItem,
  PText,
} from "../../components";

const goalOptions = [
  { label: "Kişisel gelişim", value: "personal" },
  { label: "Maneviyat", value: "spiritual" },
  { label: "Duygusal denge", value: "balance" },
];

const durationOptions = [
  { label: "10 dk", value: "10" },
  { label: "20 dk", value: "20" },
  { label: "30+ dk", value: "30" },
];

const DiscoverAssistantQuestionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const [goal, setGoal] = React.useState("personal");
  const [duration, setDuration] = React.useState("20");

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
          <PText style={styles.heroEmoji}>🤖</PText>
          <PText style={styles.heroTitle}>Size En Uygun İçeriği Bulalım</PText>
          <PText style={styles.heroSubtitle}>Birkaç soruyla başlayalım</PText>
        </View>

        <PCard style={styles.card}>
          <PText style={styles.cardLabel}>1️⃣ Ana hedefiniz nedir?</PText>
          <PRadioButtonGroup value={goal} onValueChange={setGoal}>
            {goalOptions.map((option) => (
              <PRadioButtonItem
                key={option.value}
                label={option.label}
                value={option.value}
                disabled={isOffline}
                style={[
                  styles.radioItem,
                  goal === option.value ? styles.radioItemActive : styles.radioItemIdle,
                ]}
              />
            ))}
          </PRadioButtonGroup>
        </PCard>

        <PCard style={styles.card}>
          <PText style={styles.cardLabel}>2️⃣ Ne kadar zaman ayırabilirsiniz?</PText>
          <View style={styles.durationGrid}>
            {durationOptions.map((option) => (
              <PButton
                key={option.value}
                mode={duration === option.value ? "contained" : "outlined"}
                disabled={isOffline}
                onPress={() => setDuration(option.value)}
                style={styles.durationButton}
              >
                {option.label}
              </PButton>
            ))}
          </View>
        </PCard>

        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("DiscoverAssistantResults")}
        >
          Öneri Al
        </PButton>

        <PButton mode="text" disabled={isOffline} onPress={() => navigation.navigate("DiscoverCatalog")}>
          Atla, Kataloğa Git
        </PButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export const DiscoverAssistantQuestionsScreen = ({
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
          <SkeletonBlock height={80} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Sorular bulunamadı"
            description="Şu anda soru listesi yüklenemiyor."
            actionLabel="Tekrar Dene"
            icon="help-circle-outline"
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
            title="Sorular yüklenemedi"
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
        <DiscoverAssistantQuestionsContent isOffline />
      </SafeAreaView>
    );
  }

  return <DiscoverAssistantQuestionsContent />;
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
    fontSize: 48,
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
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#171717",
    marginBottom: 12,
  },
  radioItem: {
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 12,
  },
  radioItemActive: {
    borderColor: "#00B4D8",
    backgroundColor: "#E0F7FA",
  },
  radioItemIdle: {
    borderColor: "#D4D4D4",
    backgroundColor: "#FFFFFF",
  },
  durationGrid: {
    flexDirection: "row",
    gap: 8,
  },
  durationButton: {
    flex: 1,
  },
  primaryButton: {
    marginBottom: 8,
  },
});
