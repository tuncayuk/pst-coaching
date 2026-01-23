import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  List,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const libraryHighlights = [
  {
    title: "Favoriler",
    subtitle: "12 içerik",
  },
  {
    title: "Koleksiyonlar",
    subtitle: "3 koleksiyon",
  },
];

const readingProgress = [
  {
    title: "Duygularla Barış",
    progress: 0.4,
  },
  {
    title: "Günlük Notlar",
    progress: 0.7,
  },
];

const LibraryReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      <SectionCard title="Kütüphane Özeti" actionLabel="Yönet">
        {libraryHighlights.map((item) => (
          <List.Item
            key={item.title}
            title={item.title}
            description={item.subtitle}
            left={(props) => <List.Icon {...props} icon="bookmark-outline" />}
          />
        ))}
        <Button mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Koleksiyon Oluştur
        </Button>
      </SectionCard>

      <SectionCard title="Devam Edenler" actionLabel="Tümü">
        {readingProgress.map((item) => (
          <View key={item.title} style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <Text variant="titleSmall">{item.title}</Text>
              <Chip compact>{Math.round(item.progress * 100)}%</Chip>
            </View>
            <ProgressBar progress={item.progress} />
          </View>
        ))}
      </SectionCard>

      <SectionCard title="İndirilenler" actionLabel="Yönet">
        <Card style={styles.card}>
          <Card.Title title="Atölye Notları" subtitle="2 dosya · 35 MB" />
          <Card.Actions>
            <Button mode="outlined" disabled={isOffline}>
              Aç
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="e-Kitap: Öz Şefkat" subtitle="PDF · 18 MB" />
          <Card.Actions>
            <Button mode="outlined" disabled={isOffline}>
              Oku
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Vurgular & Notlar" actionLabel="Tümü">
        <View style={styles.noteBox}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            “Kendine karşı nazik olmak, dönüşümün ilk adımıdır.”
          </Text>
          <Text variant="labelSmall" style={{ color: theme.colors.primary }}>
            Duygularla Barış · Sayfa 12
          </Text>
        </View>
      </SectionCard>
    </>
  );
};

export const LibraryOverviewScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Kütüphane" subtitle="İçerikler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Öğeler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Kütüphane" subtitle="Kişisel arşivin hazır">
        <StateMessage
          title="Kütüphanen boş"
          description="Favorilerine eklediğin içerikler burada görünecek. Şimdi bir içerik keşfet."
          actionLabel="Keşfet"
          icon="bookmark-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Kütüphane" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Kütüphane yüklenemedi"
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
      <ScreenLayout title="Kütüphane" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kütüphane" subtitle="Kaydedilen içerikler">
      <LibraryReadyContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  progressRow: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
  noteBox: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
});
