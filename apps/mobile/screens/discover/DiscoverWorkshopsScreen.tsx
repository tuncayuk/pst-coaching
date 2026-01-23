import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const workshopItems = [
  {
    title: "Zor Konuşmalar",
    subtitle: "3 bölüm · 40 dk",
  },
  {
    title: "Nefes ve Odak",
    subtitle: "2 bölüm · 25 dk",
  },
  {
    title: "Kendine Güven",
    subtitle: "4 bölüm · 50 dk",
  },
];

const DiscoverWorkshopsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sıfırla">
        <View style={styles.chipRow}>
          {["Önerilen", "Yeni", "Canlı", "Kayıt"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <Text variant="bodySmall">8 atölye bulundu</Text>
      </SectionCard>

      <SectionCard title="Atölyeler" actionLabel="Sırala">
        {workshopItems.map((item) => (
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
    </>
  );
};

export const DiscoverWorkshopsScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Atölyeler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Atölyeler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Henüz atölye yok">
        <StateMessage
          title="Atölye bulunamadı"
          description="Yeni atölyeler kısa süre içinde eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Atölyeler" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Atölyeler yüklenemedi"
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
      <ScreenLayout title="Atölyeler" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverWorkshopsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölyeler" subtitle="Canlı ve kayıtlı atölyeler">
      <DiscoverWorkshopsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
});
