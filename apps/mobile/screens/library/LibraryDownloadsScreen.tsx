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
import { getDownloadsForUser, getPrimaryUser } from "../../data/mockSelectors";

const LibraryDownloadsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const downloads = getDownloadsForUser(user?.id);

  return (
    <>
      <SectionCard title="İndirilenler" actionLabel="Temizle">
        {downloads.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={`İndirilen ${item.content_type}`}
              subtitle={`${(item.size_bytes / 1048576).toFixed(1)} MB`}
            />
            <Card.Content>
              <Text variant="bodySmall">Durum: {item.status}</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                Aç
              </Button>
              <Button mode="text" disabled={isOffline}>
                Sil
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryDownloadsScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="İndirilenler" subtitle="İndirilenler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Dosyalar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="İndirilenler" subtitle="Çevrimdışı erişim">
        <StateMessage
          title="İndirilen içerik yok"
          description="Çevrimdışı erişim için içerikleri indirip burada saklayabilirsin."
          actionLabel="İçerik İndir"
          icon="download-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="İndirilenler" subtitle="Bir sorun oluştu">
        <StateMessage
          title="İndirilenler yüklenemedi"
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
      <ScreenLayout title="İndirilenler" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryDownloadsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="İndirilenler" subtitle="Dosyalarını yönet">
      <LibraryDownloadsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
