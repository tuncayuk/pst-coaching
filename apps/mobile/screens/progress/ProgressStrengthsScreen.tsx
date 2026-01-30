import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const strengths = [
  {
    title: "Empati",
    score: 0.82,
  },
  {
    title: "Öz Düzenleme",
    score: 0.64,
  },
  {
    title: "Kararlılık",
    score: 0.5,
  },
];

const ProgressStrengthsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Güçlü Alanlar" actionLabel="Detay">
        {strengths.map((item) => (
          <PCard key={item.title} style={styles.card}>
            <PCard.Title title={item.title} subtitle={`${Math.round(item.score * 100)}%`} />
            <PCard.Content>
              <ProgressBar progress={item.score} />
            </PCard.Content>
          </PCard>
        ))}
        <PButton mode="outlined" disabled={isOffline}>
          Kişisel Plan Oluştur
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProgressStrengthsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Güçlü Alanlar" subtitle="Analiz hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Analiz">
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Güçlü Alanlar" subtitle="Analiz oluşacak">
        <StateMessage
          title="Veri yok"
          description="Daha fazla içerik tamamladıkça güçlü alanların ortaya çıkacak."
          actionLabel="İçerik Tamamla"
          icon="star-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Güçlü Alanlar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Analiz yüklenemedi"
          description="Verileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Güçlü Alanlar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <ProgressStrengthsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Güçlü Alanlar" subtitle="Güçlü yanlarını keşfet">
      <ProgressStrengthsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
