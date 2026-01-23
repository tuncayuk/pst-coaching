import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const focusTags = ["Şefkat", "Nefes", "Uyku"];

const LibraryFavoriteDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Favori Detay">
        <Text variant="titleMedium" style={styles.title}>
          Kendine Nazik Olma
        </Text>
        <Text variant="bodyMedium" style={styles.paragraph}>
          Bu atölye, günlük yaşamda kendine daha şefkatli yaklaşman için pratikler sunar.
        </Text>
        <View style={styles.tagRow}>
          {focusTags.map((tag) => (
            <Chip key={tag} style={styles.chip} disabled={isOffline}>
              {tag}
            </Chip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Durum">
        <Card style={styles.card}>
          <Card.Title title="İlerleme" subtitle="3/5 bölüm" />
          <Card.Content>
            <Text variant="bodySmall">Son erişim: 2 gün önce</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Devam Et
            </Button>
            <Button mode="outlined" disabled={isOffline}>
              Kaldır
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <Divider style={styles.divider} />

      <SectionCard title="Notlar">
        <Text variant="bodySmall" style={styles.paragraph}>
          En sevdiğin alıntıları ve notları burada tutabilirsin.
        </Text>
        <Button mode="outlined" disabled={isOffline}>
          Not Ekle
        </Button>
      </SectionCard>
    </>
  );
};

export const LibraryFavoriteDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Favori Detay" subtitle="Detaylar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Bilgiler">
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Favori Detay" subtitle="Detaylar bulunamadı">
        <StateMessage
          title="Favori bulunamadı"
          description="Bu favori artık listende olmayabilir."
          actionLabel="Favorilere Dön"
          icon="bookmark-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Favori Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Favori yüklenemedi"
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
      <ScreenLayout title="Favori Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <LibraryFavoriteDetailContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Favori Detay" subtitle="Favori içeriğin">
      <LibraryFavoriteDetailContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  paragraph: {
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 8,
  },
  divider: {
    marginVertical: 12,
  },
});
