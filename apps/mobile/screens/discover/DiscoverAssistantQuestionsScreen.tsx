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

const GOAL_OPTIONS = [
  { label: "Kisisel gelisim", value: "personal" },
  { label: "Maneviyat", value: "spiritual" },
  { label: "Duygusal denge", value: "balance" },
];

const DURATION_OPTIONS = [
  { label: "10 dk", value: "10" },
  { label: "20 dk", value: "20" },
  { label: "30+ dk", value: "30" },
];

const PREFERENCE_OPTIONS = [
  { label: "Okuma", value: "reading", emoji: "📖" },
  { label: "Uygulama / Egzersiz", value: "exercise", emoji: "🧘" },
  { label: "Video / Ses", value: "media", emoji: "🎧" },
];

const DiscoverAssistantQuestionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const [goal, setGoal] = React.useState("personal");
  const [duration, setDuration] = React.useState("20");
  const [preference, setPreference] = React.useState("reading");

  const completedSteps = (goal ? 1 : 0) + (duration ? 1 : 0) + (preference ? 1 : 0);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Geri"
          />
          <PText style={styles.headerTitle}>Icerik Asistani</PText>
          <View style={styles.progressPill}>
            <PText style={styles.progressPillText}>{completedSteps}/3</PText>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <PText style={styles.heroEmoji}>🤖</PText>
          <PText style={styles.heroTitle}>Size En Uygun Icerigi Bulalim</PText>
          <PText style={styles.heroSubtitle}>Birkas soruyla baslayalim</PText>
        </View>

        {/* Q1: Goal */}
        <PCard style={styles.card}>
          <PText style={styles.cardLabel}>1️⃣ Ana hedefiniz nedir?</PText>
          <PRadioButtonGroup value={goal} onValueChange={setGoal}>
            {GOAL_OPTIONS.map((option) => (
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

        {/* Q2: Duration */}
        <PCard style={styles.card}>
          <PText style={styles.cardLabel}>2️⃣ Ne kadar zaman ayirabilirsiniz?</PText>
          <View style={styles.durationGrid}>
            {DURATION_OPTIONS.map((option) => (
              <PButton
                key={option.value}
                mode={duration === option.value ? "contained" : "outlined"}
                disabled={isOffline}
                onPress={() => setDuration(option.value)}
                style={styles.durationButton}
                buttonColor={duration === option.value ? "#2B1B5D" : "transparent"}
              >
                {option.label}
              </PButton>
            ))}
          </View>
        </PCard>

        {/* Q3: Content preference */}
        <PCard style={styles.card}>
          <PText style={styles.cardLabel}>3️⃣ Hangi tur icerigi tercih edersiniz?</PText>
          <View style={styles.prefGrid}>
            {PREFERENCE_OPTIONS.map((option) => {
              const isActive = preference === option.value;
              return (
                <PButton
                  key={option.value}
                  mode={isActive ? "contained" : "outlined"}
                  disabled={isOffline}
                  onPress={() => setPreference(option.value)}
                  style={styles.prefButton}
                  contentStyle={styles.prefButtonContent}
                  buttonColor={isActive ? "#2B1B5D" : "transparent"}
                >
                  {option.emoji} {option.label}
                </PButton>
              );
            })}
          </View>
        </PCard>

        <PButton
          mode="contained"
          style={styles.primaryButton}
          buttonColor="#2B1B5D"
          disabled={isOffline}
          onPress={() => navigation.navigate("DiscoverAssistantResults")}
        >
          Oneri Al
        </PButton>

        <PButton
          mode="text"
          disabled={isOffline}
          onPress={() => navigation.navigate("DiscoverCatalog")}
        >
          Atla, Kataloga Git
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
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
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
            title="Sorular bulunamadi"
            description="Su anda soru listesi yuklenemiyor."
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
            title="Sorular yuklenemedi"
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
        <DiscoverAssistantQuestionsContent isOffline />
      </SafeAreaView>
    );
  }

  return <DiscoverAssistantQuestionsContent />;
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FAFAFA" },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { fontSize: 18, fontWeight: "800", color: "#2B1B5D", flex: 1 },
  progressPill: {
    backgroundColor: "#E0F7FA",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  progressPillText: { fontSize: 12, fontWeight: "700", color: "#00758C" },
  content: { padding: 16 },
  hero: { alignItems: "center", marginBottom: 20 },
  heroEmoji: { fontSize: 48, marginBottom: 10 },
  heroTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B1B5D",
    textAlign: "center",
    marginBottom: 4,
  },
  heroSubtitle: { fontSize: 14, color: "#525252", textAlign: "center" },
  card: { padding: 16, borderRadius: 16, marginBottom: 16 },
  cardLabel: { fontSize: 15, fontWeight: "600", color: "#171717", marginBottom: 12 },
  radioItem: { borderWidth: 2, borderRadius: 12, marginBottom: 8 },
  radioItemActive: { borderColor: "#2B1B5D", backgroundColor: "#EDE7F6" },
  radioItemIdle: { borderColor: "#E5E5E5", backgroundColor: "#FFFFFF" },
  durationGrid: { flexDirection: "row", gap: 8 },
  durationButton: { flex: 1 },
  prefGrid: { gap: 8 },
  prefButton: { borderRadius: 12 },
  prefButtonContent: { height: 40 },
  primaryButton: { marginBottom: 8, borderRadius: 12 },
});
