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
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const ebookTags = ["Duygu düzenleme", "Farkındalık", "Günlük pratik"];

const ContentEbookDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Kitap Özeti">
        <Text variant="bodyMedium" style={styles.paragraph}>
          Duygularını düzenlemek için kısa egzersizler, örnekler ve günlük yazım alanları sunan
          rehber bir okuma.
        </Text>
        <View style={styles.chipRow}>
          {ebookTags.map((tag) => (
            <Chip key={tag} style={styles.chip} disabled={isOffline}>
              {tag}
            </Chip>
          ))}
        </View>
        <Card style={styles.card}>
          <Card.Title title="İlerleme" subtitle="2/12 bölüm okundu" />
          <Card.Content>
            <ProgressBar progress={0.18} style={styles.progress} />
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Okumaya Başla
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Hızlı Erişim" actionLabel="İçindekiler">
        <Card style={styles.secondaryCard}>
          <Card.Title title="Son kaldığın yer" subtitle="Bölüm 3 · 4 dk kaldı" />
          <Card.Actions>
            <Button mode="outlined" disabled={isOffline}>
              Devam Et
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Okuyucu Ayarları">
        <Text variant="bodySmall">• Satır aralığı ve yazı boyutunu ayarla</Text>
        <Text variant="bodySmall">• Karanlık modda okumaya geç</Text>
        <Button mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Ayarları Aç
        </Button>
      </SectionCard>
    </>
  );
};

export const ContentEbookDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="e-Kitap yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Bölümler">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="İçerik bulunamadı">
        <StateMessage
          title="e-Kitap bulunamadı"
          description="Bu e-Kitap şu anda erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="book-open-page-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="e-Kitap yüklenemedi"
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
      <ScreenLayout title="e-Kitap Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentEbookDetailContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitap Detay" subtitle="e-Kitap hakkında">
      <ContentEbookDetailContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginTop: 4,
  },
  secondaryCard: {
    marginTop: 4,
  },
  progress: {
    marginTop: 8,
    marginBottom: 12,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
