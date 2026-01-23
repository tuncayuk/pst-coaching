import React from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

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
        <Card style={styles.card}>
          <Card.Title title={primaryRecommendation.title} subtitle={primaryRecommendation.subtitle} />
          <Card.Content>
            <Text variant="bodySmall">{primaryRecommendation.detail}</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Hemen Başla
            </Button>
            <Button mode="outlined" disabled={isOffline}>
              Detayları Gör
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Alternatifler" actionLabel="Tümü">
        {alternativeRecommendations.map((item) => (
          <Card key={item.title} style={styles.card}>
            <Card.Title title={item.title} subtitle={item.subtitle} />
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                İncele
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>

      <SectionCard title="Kataloğa Dön">
        <Text variant="bodySmall">
          Daha fazla öneri görmek için keşfet sayfasına dönebilirsin.
        </Text>
        <Button mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Kataloğa Git
        </Button>
      </SectionCard>
    </>
  );
};

export const DiscoverAssistantResultsScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
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
