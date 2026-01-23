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

const assistantBenefits = [
  "Hedefine uygun içerik önerileri",
  "Süre ve yoğunluğa göre plan",
  "Kütüphanenden devam önerileri",
];

const DiscoverAssistantIntroContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="İçerik Asistanı">
        <Text variant="bodyMedium" style={styles.paragraph}>
          Kısa bir testle hedeflerine uygun yolculuk, atölye ve modül önerileri al.
        </Text>
        {assistantBenefits.map((benefit) => (
          <Text key={benefit} variant="bodySmall" style={styles.listItem}>
            • {benefit}
          </Text>
        ))}
        <Button mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Asistanı Başlat
        </Button>
      </SectionCard>

      <SectionCard title="Nasıl Çalışır" actionLabel="Örnekler">
        <Card style={styles.card}>
          <Card.Title title="Hedefini seç" subtitle="Örn: sınır koyma" />
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Süreni belirle" subtitle="10-20 dk, 30-45 dk" />
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Önerilerini al" subtitle="1 ana + 2 alternatif" />
        </Card>
      </SectionCard>
    </>
  );
};

export const DiscoverAssistantIntroScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="İçerik Asistanı" subtitle="Asistan hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Adımlar">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="İçerik Asistanı" subtitle="Öneri bulunamadı">
        <StateMessage
          title="Öneri yok"
          description="Yeni içerikler için daha sonra tekrar deneyebilirsin."
          actionLabel="Kataloğa Dön"
          icon="lightbulb-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="İçerik Asistanı" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Asistan yüklenemedi"
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
      <ScreenLayout title="İçerik Asistanı" subtitle="Önbellekteki öneriler">
        <OfflineNotice />
        <DiscoverAssistantIntroContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="İçerik Asistanı" subtitle="Sana uygun öneriler">
      <DiscoverAssistantIntroContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 4,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
});
