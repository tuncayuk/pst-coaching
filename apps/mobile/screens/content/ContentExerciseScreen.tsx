import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PIconButton, PText } from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const exerciseStepDefs = [
  {
    title: "Adim 1: Durumu Tanimlayin",
    description: "Hangi durum sizi rahatsiz etti? Ne oldu?",
  },
  {
    title: "Adim 2: Otomatik Dusunceyi Yazin",
    description: "O anda akliniza gelen ilk dusunce neydi?",
  },
  {
    title: "Adim 3: Kanitlari Degerlendirin",
    description: "Bu dusunceyi destekleyen ve curuten kanitlar neler?",
  },
  {
    title: "Adim 4: Alternatif Dusunce Olusturun",
    description: "Daha dengeli bir dusunce nasil olabilir?",
  },
];

const ContentExerciseContent = ({
  isOffline,
  id,
}: {
  isOffline?: boolean;
  id?: string;
}) => {
  const navigation = useNavigation<any>();
  // AC-FR-E5-06-02: Track completed step count
  const [completedCount, setCompletedCount] = useState(0);
  const allDone = completedCount >= exerciseStepDefs.length;

  // AC-FR-E5-06-01: Ordered step unlock
  const handleCompleteStep = () => {
    if (isOffline) return;
    setCompletedCount((prev) => Math.min(prev + 1, exerciseStepDefs.length));
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton icon="arrow-left" onPress={() => navigation.goBack()} />
          <View style={styles.headerCenter}>
            <PText style={styles.headerTitle}>Uygulama: Kaliplarimi Kesfetmek</PText>
            <PText style={styles.headerSubtitle}>Bolum 2 - Paket 3</PText>
          </View>
        </View>
        <View style={styles.progressRow}>
          <PText style={styles.progressLabel}>
            {completedCount}/{exerciseStepDefs.length} adim tamamlandi
          </PText>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${(completedCount / exerciseStepDefs.length) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <PCard style={styles.instructionCard}>
          <PText style={styles.instructionTitle}>Uygulama Talimatlari</PText>
          <PText style={styles.instructionText}>
            Son bir haftada yasadiginiz zorlayici bir durumu dusunun ve o andaki otomatik
            dusuncelerinizi belirleyin.
          </PText>
        </PCard>

        <View style={styles.steps}>
          {exerciseStepDefs.map((step, index) => {
            const isDone = index < completedCount;
            const isActive = index === completedCount;
            const isLocked = index > completedCount;

            return (
              <PCard
                key={step.title}
                style={[
                  styles.stepCard,
                  isDone && styles.stepCompleted,
                  isActive && styles.stepActive,
                  isLocked && styles.stepLocked,
                ]}
              >
                <View style={styles.stepRow}>
                  <View
                    style={[
                      styles.stepBadge,
                      isDone && styles.stepBadgeCompleted,
                      isActive && styles.stepBadgeActive,
                      isLocked && styles.stepBadgeLocked,
                    ]}
                  >
                    <PText
                      style={[
                        styles.stepBadgeText,
                        isDone && styles.stepBadgeTextCompleted,
                        isActive && styles.stepBadgeTextActive,
                        isLocked && styles.stepBadgeTextLocked,
                      ]}
                    >
                      {isDone ? "+" : index + 1}
                    </PText>
                  </View>
                  <View style={styles.stepInfo}>
                    <PText
                      style={[
                        styles.stepTitle,
                        isActive && styles.stepTitleActive,
                        isLocked && styles.stepTitleLocked,
                      ]}
                    >
                      {step.title}
                    </PText>
                    <PText
                      style={[
                        styles.stepDescription,
                        isActive && styles.stepDescriptionActive,
                        isLocked && styles.stepDescriptionLocked,
                      ]}
                    >
                      {step.description}
                    </PText>
                    {/* AC-FR-E5-06-01: "Complete step" button on active step */}
                    {isActive && (
                      <PButton
                        mode="contained"
                        compact
                        disabled={isOffline}
                        style={styles.completeBtn}
                        onPress={handleCompleteStep}
                      >
                        Bu Adimi Tamamla
                      </PButton>
                    )}
                  </View>
                </View>
              </PCard>
            );
          })}
        </View>

        {/* AC-FR-E5-06-03: All-done state saves progress + CTA to comment */}
        {allDone && (
          <PCard style={styles.celebrationCard}>
            <PText style={styles.celebrationTitle}>Tebrikler! Tum adimlar tamamlandi.</PText>
            <PText style={styles.celebrationSub}>
              Ilerlemeniz kaydedildi. Yorumunuzu yazabilirsiniz.
            </PText>
            <PButton
              mode="contained"
              style={styles.nextBtn}
              disabled={isOffline}
              onPress={() =>
                navigation.navigate("ContentComment", {
                  contentItemId: id ?? "c1c1c1c1-0000-0000-0000-000000000103",
                })
              }
            >
              Yoruma Gec
            </PButton>
          </PCard>
        )}

        <PCard style={styles.tipCard}>
          <PText style={styles.tipText}>
            <PText style={styles.tipLabel}>Ipucu:</PText> Dusuncelerinizi yargilamadan
            gozlemleyin.
          </PText>
        </PCard>
      </View>
    </View>
  );
};

export const ContentExerciseScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const id = route?.params?.id;

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
            title="Uygulama bulunamadi"
            description="Egzersiz adimlari su anda erisilebilir degil."
            actionLabel="Geri Don"
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
            title="Uygulama yuklenemedi"
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
        <ScrollView contentContainerStyle={styles.page}>
          <ContentExerciseContent isOffline id={id} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentExerciseContent id={id} />
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
  progressRow: {
    marginTop: 10,
    gap: 4,
  },
  progressLabel: {
    fontSize: 11,
    color: "#737373",
    marginBottom: 4,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#6B46C1",
    borderRadius: 2,
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
  completeBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
  },
  celebrationCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#D1FAE5",
    borderWidth: 2,
    borderColor: "#16A34A",
    marginBottom: 16,
    alignItems: "center",
  },
  celebrationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#15803D",
    marginBottom: 6,
    textAlign: "center",
  },
  celebrationSub: {
    fontSize: 13,
    color: "#166534",
    textAlign: "center",
    marginBottom: 12,
  },
  nextBtn: {
    width: "100%",
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

