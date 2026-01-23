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

const moduleItems = [
  {
    title: "Stres Yönetimi",
    subtitle: "4 gün · 15 dk",
  },
  {
    title: "İlişki Dinamikleri",
    subtitle: "5 gün · 20 dk",
  },
  {
    title: "Öz Saygı",
    subtitle: "3 gün · 12 dk",
  },
];

const DiscoverModulesContent = ({ isOffline }: { isOffline?: boolean }) => {
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
        <Text variant="bodySmall">10 modül bulundu</Text>
      </SectionCard>

      <SectionCard title="Modüller" actionLabel="Sırala">
        {moduleItems.map((item) => (
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

export const DiscoverModulesScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Modüller" subtitle="Modüller hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Modüller">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Modüller" subtitle="Henüz modül yok">
        <StateMessage
          title="Modül bulunamadı"
          description="Yeni modüller kısa süre içinde eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Modüller" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Modüller yüklenemedi"
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
      <ScreenLayout title="Modüller" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverModulesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Modüller" subtitle="Kısa modüllerle ilerle">
      <DiscoverModulesContent />
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
