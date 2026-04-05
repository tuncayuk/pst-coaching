import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PIconButton, PText } from "../../components";

const assistantBenefits = [
  "Hedefine uygun icerik onerileri",
  "Sure ve yogunluga gore plan",
  "Kutuphanenden devam onerileri",
];

const assistantSteps = [
  { title: "Hedefini sec", subtitle: "Orn: sinir koyma" },
  { title: "Sureni belirle", subtitle: "10-20 dk, 30-45 dk" },
  { title: "Onerilerini al", subtitle: "1 ana + 2 alternatif" },
];

const DiscoverAssistantIntroContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <PText style={styles.headerTitle}>Icerik Asistani</PText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <PText style={styles.heroEmoji}>🤖</PText>
          <PText style={styles.heroTitle}>Kisa bir testle oneri al</PText>
          <PText style={styles.heroSubtitle}>
            Hedeflerine uygun yolculuk, atolye ve modul onerileri hazirlayalim.
          </PText>
        </View>

        <PCard style={styles.card}>
          <PText style={styles.cardLabel}>Neler yapar?</PText>
          {assistantBenefits.map((benefit) => (
            <PText key={benefit} style={styles.listItem}>
              • {benefit}
            </PText>
          ))}
        </PCard>

        <PCard style={styles.card}>
          <PText style={styles.cardLabel}>Nasil calisir?</PText>
          {assistantSteps.map((step) => (
            <View key={step.title} style={styles.stepRow}>
              <PText style={styles.stepTitle}>{step.title}</PText>
              <PText style={styles.stepSubtitle}>{step.subtitle}</PText>
            </View>
          ))}
        </PCard>

        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={() => navigation.navigate("DiscoverAssistantQuestions")}
          style={styles.primaryButton}
        >
          Asistani Baslat
        </PButton>
        <PButton
          mode="text"
          disabled={isOffline}
          onPress={() => navigation.navigate("DiscoverCatalog")}
        >
          Kataloga Don
        </PButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export const DiscoverAssistantIntroScreen = ({
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
          <SkeletonBlock height={90} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.content}>
          <StateMessage
            title="Oneri yok"
            description="Yeni icerikler icin daha sonra tekrar deneyebilirsin."
            actionLabel="Kataloga Don"
            icon="lightbulb-outline"
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
            title="Asistan yuklenemedi"
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
        <DiscoverAssistantIntroContent isOffline />
      </SafeAreaView>
    );
  }

  return <DiscoverAssistantIntroContent />;
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
    fontSize: 52,
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
    fontWeight: "700",
    color: "#171717",
    marginBottom: 12,
  },
  listItem: {
    fontSize: 14,
    color: "#525252",
    marginBottom: 6,
  },
  stepRow: {
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#171717",
    marginBottom: 2,
  },
  stepSubtitle: {
    fontSize: 13,
    color: "#737373",
  },
  primaryButton: {
    marginBottom: 8,
  },
});
