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

const journeyItems = [
  {
    title: "Duygusal Dayanıklılık",
    subtitle: "7 gün · 20 dk",
  },
  {
    title: "Öz Şefkat",
    subtitle: "6 gün · 15 dk",
  },
  {
    title: "İlişkilerde Sınırlar",
    subtitle: "5 gün · 18 dk",
  },
];

const DiscoverJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sıfırla">
        <View style={styles.chipRow}>
          {["Önerilen", "Yeni", "Kısa", "Derin"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <Text variant="bodySmall">12 yolculuk bulundu</Text>
      </SectionCard>

      <SectionCard title="Yolculuklar" actionLabel="Sırala">
        {journeyItems.map((item) => (
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

export const DiscoverJourneysScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Yolculuklar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Yolculuklar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Henüz yolculuk yok">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Yeni içerikler kısa süre içinde eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yolculuklar yüklenemedi"
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
      <ScreenLayout title="Yolculuklar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverJourneysContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuklar" subtitle="Kendine uygun yolculuklar">
      <DiscoverJourneysContent />
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
