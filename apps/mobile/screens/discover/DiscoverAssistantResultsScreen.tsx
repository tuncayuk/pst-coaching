import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const primaryRecommendation = {
  title: "Öz Şefkat Yolculuğu",
  subtitle: "6 gün · 20 dk",
  detail: "Kısa egzersizlerle öz şefkati güçlendiren seçki.",
};

const alternativeRecommendations = [
  {
    title: "Sınır Koyma Atölyesi",
    subtitle: "3 bölüm · 45 dk",
  },
  {
    title: "Stres Yönetimi Modülü",
    subtitle: "4 gün · 15 dk",
  },
];

const DiscoverAssistantResultsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Önerilen Yolculuk">
        <PCard style={styles.card}>
          <PCard.Title title={primaryRecommendation.title} subtitle={primaryRecommendation.subtitle} />
          <PCard.Content>
            <PText variant="bodySmall">{primaryRecommendation.detail}</PText>
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="contained" disabled={isOffline}>
              Hemen Başla
            </PButton>
            <PButton mode="outlined" disabled={isOffline}>
              Detayları Gör
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Alternatifler" actionLabel="Tümü">
        {alternativeRecommendations.map((item) => (
          <PCard key={item.title} style={styles.card}>
            <PCard.Title title={item.title} subtitle={item.subtitle} />
            <PCard.Actions>
              <PButton mode="outlined" disabled={isOffline}>
                İncele
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Kataloğa Dön">
        <PText variant="bodySmall">
          Daha fazla öneri görmek için keşfet sayfasına dönebilirsin.
        </PText>
        <PButton mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Kataloğa Git
        </PButton>
      </SectionCard>
    </>
  );
};

export const DiscoverAssistantResultsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="İçerik Asistanı Sonuçları" subtitle="Öneriler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Öneriler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="İçerik Asistanı Sonuçları" subtitle="Öneri bulunamadı">
        <StateMessage
          title="Öneri bulunamadı"
          description="Seçimlerini güncelleyerek yeniden deneyebilirsin."
          actionLabel="Soruları Güncelle"
          icon="playlist-edit"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="İçerik Asistanı Sonuçları" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Öneriler yüklenemedi"
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
      <ScreenLayout title="İçerik Asistanı Sonuçları" subtitle="Önbellekteki öneriler">
        <OfflineNotice />
        <DiscoverAssistantResultsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="İçerik Asistanı Sonuçları" subtitle="Sana uygun içerikler">
      <DiscoverAssistantResultsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
