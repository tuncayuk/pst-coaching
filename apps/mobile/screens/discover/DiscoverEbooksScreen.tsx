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

const ebookItems = [
  {
    title: "Kendini Anlama",
    subtitle: "120 sayfa · 45 dk",
  },
  {
    title: "Duygularla Barış",
    subtitle: "98 sayfa · 40 dk",
  },
  {
    title: "İç Sesinle Dostluk",
    subtitle: "110 sayfa · 42 dk",
  },
];

const DiscoverEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sıfırla">
        <View style={styles.chipRow}>
          {["Önerilen", "Yeni", "Kısa", "Sesli"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <Text variant="bodySmall">6 e-Kitap bulundu</Text>
      </SectionCard>

      <SectionCard title="e-Kitaplar" actionLabel="Sırala">
        {ebookItems.map((item) => (
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

export const DiscoverEbooksScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="e-Kitaplar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="e-Kitaplar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Henüz e-Kitap yok">
        <StateMessage
          title="e-Kitap bulunamadı"
          description="Yakında yeni e-Kitaplar eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="e-Kitaplar yüklenemedi"
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
      <ScreenLayout title="e-Kitaplar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverEbooksContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitaplar" subtitle="Rahatça okuyabileceğin seçkiler">
      <DiscoverEbooksContent />
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
