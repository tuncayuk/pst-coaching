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
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const ContentCommentPreviewContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Önizleme">
        <Card style={styles.card}>
          <Card.Title title="Seçilen Duygu" subtitle="Huzurlu" />
          <Card.Content>
            <Text variant="bodyMedium" style={styles.paragraph}>
              Bu bölüm, gün içinde kendime daha nazik yaklaşmam gerektiğini hatırlattı. Küçük
              bir nefes molası bile fark yaratıyor.
            </Text>
            <Text variant="bodySmall">Günlük hayatımda bunu akşam rutinime ekleyeceğim.</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" disabled={isOffline}>
              Düzenle
            </Button>
            <Button mode="contained" disabled={isOffline}>
              Gönder
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <SectionCard title="Gönderim Bilgisi">
        <Text variant="bodySmall">
          Yorumun topluluk rehberine uygun şekilde paylaşılır. Dilersen daha sonra düzenleyebilir
          veya silebilirsin.
        </Text>
      </SectionCard>
    </>
  );
};

export const ContentCommentPreviewScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; contentItemId?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yorum Önizleme" subtitle="Önizleme hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Önizleme">
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yorum Önizleme" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Önizleme bulunamadı"
          description="Paylaşım için içerik hazırlanmadı."
          actionLabel="Yoruma Dön"
          icon="comment-text-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yorum Önizleme" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Önizleme yüklenemedi"
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
      <ScreenLayout title="Yorum Önizleme" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentCommentPreviewContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yorum Önizleme" subtitle="Gönderim öncesi kontrol">
      <ContentCommentPreviewContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 4,
  },
  paragraph: {
    marginBottom: 8,
  },
});
