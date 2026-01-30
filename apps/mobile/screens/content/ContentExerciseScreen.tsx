import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PIconButton, PText, PCard } from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const exerciseSteps = [
  {
    status: "completed",
    title: "Adım 1: Durumu Tanimlayin",
    description: "Hangi durum sizi rahatsiz etti? Ne oldu?",
  },
  {
    status: "active",
    title: "Adım 2: Otomatik Dusunceyi Yazin",
    description: "O anda akliniza gelen ilk dusunce neydi?",
  },
  {
    status: "locked",
    title: "Adım 3: Kanitlari Degerlendirin",
    description: "Bu dusunceyi destekleyen ve curuten kanitlar neler?",
  },
  {
    status: "locked",
    title: "Adım 4: Alternatif Dusunce Olusturun",
    description: "Daha dengeli bir dusunce nasil olabilir?",
  },
];

const ContentExerciseContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <View style={styles.headerCenter}>
            <PText style={styles.headerTitle}>Uygulama: Kaliplarimi Kesfetmek</PText>
            <PText style={styles.headerSubtitle}>Bölüm 2 • Paket 3</PText>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <PCard style={styles.instructionCard}>
          <PText style={styles.instructionTitle}>📝 Uygulama Talimatlari</PText>
          <PText style={styles.instructionText}>
            Son bir haftada yasadiginiz zorlayici bir durumu dusunun ve o andaki otomatik
            dusuncelerinizi belirleyin.
          </PText>
        </PCard>

        <View style={styles.steps}>
          {exerciseSteps.map((step, index) => (
            <PCard
              key={step.title}
              style={[
                styles.stepCard,
                step.status === "completed" && styles.stepCompleted,
                step.status === "active" && styles.stepActive,
                step.status === "locked" && styles.stepLocked,
              ]}
            >
              <View style={styles.stepRow}>
                <View
                  style={[
                    styles.stepBadge,
                    step.status === "completed" && styles.stepBadgeCompleted,
                    step.status === "active" && styles.stepBadgeActive,
                    step.status === "locked" && styles.stepBadgeLocked,
                  ]}
                >
                  <PText
                    style={[
                      styles.stepBadgeText,
                      step.status === "completed" && styles.stepBadgeTextCompleted,
                      step.status === "active" && styles.stepBadgeTextActive,
                      step.status === "locked" && styles.stepBadgeTextLocked,
                    ]}
                  >
                    {step.status === "completed" ? "✓" : index + 1}
                  </PText>
                </View>
                <View style={styles.stepInfo}>
                  <PText
                    style={[
                      styles.stepTitle,
                      step.status === "active" && styles.stepTitleActive,
                      step.status === "locked" && styles.stepTitleLocked,
                    ]}
                  >
                    {step.title}
                  </PText>
                  <PText
                    style={[
                      styles.stepDescription,
                      step.status === "active" && styles.stepDescriptionActive,
                      step.status === "locked" && styles.stepDescriptionLocked,
                    ]}
                  >
                    {step.description}
                  </PText>
                </View>
              </View>
            </PCard>
          ))}
        </View>

        <PCard style={styles.tipCard}>
          <PText style={styles.tipText}>
            <PText style={styles.tipLabel}>💡 İpucu:</PText> Dusuncelerinizi yargilamadan
            gozlemleyin.
          </PText>
        </PCard>
      </View>
    </View>
  );
};

export const ContentExerciseScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={120} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "empty") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Uygulama bulunamadı"
            description="Egzersiz adımları şu anda erişilebilir değil."
            actionLabel="Geri Dön"
            icon="arm-flex-outline"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === "error") {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Uygulama yüklenemedi"
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
        <ScrollView contentContainerStyle={styles.page}>
          <ContentExerciseContent isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentExerciseContent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  page: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2B1B5D",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#737373",
    marginTop: 2,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  instructionCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    borderLeftWidth: 4,
    borderLeftColor: "#1D4ED8",
    marginBottom: 16,
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1D4ED8",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: "#1F2937",
    lineHeight: 20,
  },
  steps: {
    gap: 12,
    marginBottom: 16,
  },
  stepCard: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F5F5F5",
  },
  stepCompleted: {
    backgroundColor: "#D1FAE5",
    borderWidth: 2,
    borderColor: "#16A34A",
  },
  stepActive: {
    backgroundColor: "#E0F7FA",
    borderWidth: 2,
    borderColor: "#00B4D8",
  },
  stepLocked: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#D4D4D4",
    borderStyle: "dashed",
  },
  stepRow: {
    flexDirection: "row",
    gap: 12,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#D4D4D4",
    backgroundColor: "#FFFFFF",
  },
  stepBadgeCompleted: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },
  stepBadgeActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#00B4D8",
  },
  stepBadgeLocked: {
    borderColor: "#A1A1AA",
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#525252",
  },
  stepBadgeTextCompleted: {
    color: "#FFFFFF",
  },
  stepBadgeTextActive: {
    color: "#00B4D8",
  },
  stepBadgeTextLocked: {
    color: "#A1A1AA",
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#525252",
    marginBottom: 4,
  },
  stepTitleActive: {
    color: "#00758C",
  },
  stepTitleLocked: {
    color: "#737373",
  },
  stepDescription: {
    fontSize: 13,
    color: "#525252",
    lineHeight: 18,
  },
  stepDescriptionActive: {
    color: "#1F2937",
  },
  stepDescriptionLocked: {
    color: "#737373",
  },
  tipCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#EDE7F6",
  },
  tipText: {
    fontSize: 12,
    color: "#525252",
  },
  tipLabel: {
    fontWeight: "700",
    color: "#2B1B5D",
  },
});
