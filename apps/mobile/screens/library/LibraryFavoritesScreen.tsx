import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const favoriteItems = [
  {
    title: "Nefes Egzersizi",
    subtitle: "Atölye · 15 dk",
  },
  {
    title: "Kendine Şefkat",
    subtitle: "Yolculuk · 7 gün",
  },
];

const filters = ["Tümü", "Yolculuk", "Atölye", "Modül", "e-Kitap"];

const LibraryFavoritesContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Filtre" actionLabel="Sırala">
        <View style={styles.chipRow}>
          {filters.map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Favoriler" actionLabel="Tümü">
        {favoriteItems.map((item) => (
          <Card key={item.title} style={styles.card}>
            <Card.Title title={item.title} subtitle={item.subtitle} />
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                Aç
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryFavoritesScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Favoriler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Öğeler">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Kaydedilenler burada">
        <StateMessage
          title="Favori eklenmedi"
          description="Beğendiğin içerikleri favorilere ekleyerek burada görebilirsin."
          actionLabel="İçerik Keşfet"
          icon="heart-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Favoriler yüklenemedi"
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
      <ScreenLayout title="Favoriler" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryFavoritesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Favoriler" subtitle="Kaydettiklerin">
      <LibraryFavoritesContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
});
