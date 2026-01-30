import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getContentItems, getExerciseSteps } from "../../data/mockSelectors";
import { PButton, PCard, PCheckbox, PText } from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

const ContentExerciseContent = ({ contentId, isOffline }: { contentId?: string; isOffline?: boolean }) => {
  const contentItem = getContentItems().find((item) => item.id === contentId);
  const steps = getExerciseSteps().filter((step) => step.content_item_id === contentId);

  return (
    <>
      <SectionCard title="Uygulama">
        <PText variant="titleMedium">{contentItem?.title ?? "Uygulama"}</PText>
        <PText variant="bodySmall" style={styles.subtleText}>
          {contentItem?.body ?? "Bu bölümde pratik egzersiz adımlarını tamamlayacaksın."}
        </PText>
      </SectionCard>

      <SectionCard title="Adımlar" actionLabel={`${steps.length} adım`}>
        {steps.map((step) => (
          <PCard key={step.id} style={styles.card}>
            <PCard.Content style={styles.stepRow}>
              <PCheckbox status="unchecked" disabled={isOffline} />
              <View style={styles.stepText}>
                <PText variant="bodyMedium">Adım {step.step_number}</PText>
                <PText variant="bodySmall" style={styles.subtleText}>
                  {step.text}
                </PText>
              </View>
            </PCard.Content>
          </PCard>
        ))}
        <PButton mode="contained" disabled={isOffline}>
          Tamamlandı
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentExerciseScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const contentId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Uygulama" subtitle="Uygulama hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Adımlar">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Uygulama" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Uygulama bulunamadı"
          description="Egzersiz adımları şu anda erişilebilir değil."
          actionLabel="Geri Dön"
          icon="arm-flex-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Uygulama" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Uygulama yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Uygulama" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentExerciseContent contentId={contentId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Uygulama" subtitle="Adımları tamamla">
      <ContentExerciseContent contentId={contentId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  subtleText: {
    marginTop: 4,
    opacity: 0.7,
  },
  card: {
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepText: {
    flex: 1,
    marginLeft: 8,
  },
});
