import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  ProgressBar,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const activeJourneys = [
  {
    title: "Duygularla Barış",
    progress: 0.45,
    next: "2. Gün · Niyet belirleme",
  },
  {
    title: "Sınırlarını Güçlendir",
    progress: 0.2,
    next: "Başlangıç · Tanışma",
  },
];

const suggestedJourneys = [
  {
    title: "Kendine Şefkat",
    subtitle: "7 gün · 5 içerik",
  },
  {
    title: "İlişkilerde Denge",
    subtitle: "10 gün · 8 içerik",
  },
];

const LibraryJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Aktif Yolculuklar" actionLabel="Tümü">
        {activeJourneys.map((journey) => (
          <View key={journey.title} style={styles.progressBlock}>
            <View style={styles.progressHeader}>
              <Text variant="titleSmall">{journey.title}</Text>
              <Chip compact>{Math.round(journey.progress * 100)}%</Chip>
            </View>
            <Text variant="bodySmall" style={styles.subtitle}>
              {journey.next}
            </Text>
            <ProgressBar progress={journey.progress} />
          </View>
        ))}
        <Button mode="contained" disabled={isOffline} style={styles.primaryButton}>
          Bugünkü Adımı Aç
        </Button>
      </SectionCard>

      <SectionCard title="Önerilen Yolculuklar" actionLabel="Keşfet">
        {suggestedJourneys.map((journey) => (
          <Card key={journey.title} style={styles.card}>
            <Card.Title title={journey.title} subtitle={journey.subtitle} />
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                İncele
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryJourneysScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Yolculuklar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
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
      <ScreenLayout title="Yolculuklar" subtitle="Kişisel programın hazır">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Henüz başladığın bir yolculuk yok. Sana uygun bir program seçebilirsin."
          actionLabel="Yolculuk Seç"
          icon="map-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yolculuklar yüklenemedi"
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
      <ScreenLayout title="Yolculuklar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryJourneysContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuklar" subtitle="Programlarını yönet">
      <LibraryJourneysContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  progressBlock: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
});
