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

const ebooks = [
  {
    title: "Öz Şefkat Rehberi",
    subtitle: "120 sayfa",
    progress: 0.3,
  },
  {
    title: "Zor Konuşmalar",
    subtitle: "80 sayfa",
    progress: 0.75,
  },
];

const filters = ["Yeni", "Devam Eden", "Tamamlanan", "İndirilen"];

const LibraryEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
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

      <SectionCard title="e-Kitaplar" actionLabel="Tümü">
        {ebooks.map((book) => (
          <Card key={book.title} style={styles.card}>
            <Card.Title title={book.title} subtitle={book.subtitle} />
            <Card.Content>
              <Text variant="bodySmall" style={styles.progressLabel}>
                {Math.round(book.progress * 100)}% tamamlandı
              </Text>
              <ProgressBar progress={book.progress} />
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                Oku
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryEbooksScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="e-Kitaplar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Kitaplar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Kütüphane gelişiyor">
        <StateMessage
          title="e-Kitap bulunamadı"
          description="Henüz kitap eklenmedi. Keşfet bölümünden yeni e-kitaplar bulabilirsin."
          actionLabel="Keşfe Git"
          icon="book-open-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="e-Kitaplar yüklenemedi"
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
      <ScreenLayout title="e-Kitaplar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryEbooksContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitaplar" subtitle="Okumalarına devam et">
      <LibraryEbooksContent />
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
  progressLabel: {
    marginBottom: 8,
  },
});
