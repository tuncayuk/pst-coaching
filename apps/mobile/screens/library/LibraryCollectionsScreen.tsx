import React from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const collections = [
  {
    title: "Sabah Rutini",
    subtitle: "5 içerik",
  },
  {
    title: "Duygu Günlüğü",
    subtitle: "3 içerik",
  },
];

const LibraryCollectionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Koleksiyonlar" actionLabel="Yeni">
        {collections.map((collection) => (
          <Card key={collection.title} style={styles.card}>
            <Card.Title title={collection.title} subtitle={collection.subtitle} />
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                Aç
              </Button>
            </Card.Actions>
          </Card>
        ))}
        <Button mode="contained" disabled={isOffline}>
          Koleksiyon Oluştur
        </Button>
      </SectionCard>
    </>
  );
};

export const LibraryCollectionsScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="Koleksiyonlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Koleksiyonlar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="İçeriklerini düzenle">
        <StateMessage
          title="Koleksiyon yok"
          description="Favori içeriklerini bir araya getirerek koleksiyon oluşturabilirsin."
          actionLabel="Koleksiyon Oluştur"
          icon="folder-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Koleksiyonlar yüklenemedi"
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
      <ScreenLayout title="Koleksiyonlar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryCollectionsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koleksiyonlar" subtitle="Arşivini düzenle">
      <LibraryCollectionsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
