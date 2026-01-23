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

const collectionItems = [
  {
    title: "Sabah Meditasyonu",
    subtitle: "Atölye · 10 dk",
  },
  {
    title: "Günlük Niyet",
    subtitle: "Modül · 2 bölüm",
  },
];

const LibraryCollectionDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Koleksiyon Bilgisi">
        <Text variant="titleMedium" style={styles.title}>
          Sabah Rutini
        </Text>
        <Text variant="bodySmall" style={styles.paragraph}>
          Güne dengeli başlamak için seçtiğim içerikler.
        </Text>
        <Button mode="outlined" disabled={isOffline}>
          Koleksiyonu Düzenle
        </Button>
      </SectionCard>

      <SectionCard title="İçerikler" actionLabel="Tümü">
        {collectionItems.map((item) => (
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

export const LibraryCollectionDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Detaylar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="İçerikler">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Koleksiyon boş"
          description="Bu koleksiyona henüz içerik eklenmedi."
          actionLabel="İçerik Ekle"
          icon="folder-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Koleksiyon yüklenemedi"
          description="Detayları getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <LibraryCollectionDetailContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koleksiyon Detay" subtitle="Koleksiyonun">
      <LibraryCollectionDetailContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 6,
  },
  paragraph: {
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
  },
});
