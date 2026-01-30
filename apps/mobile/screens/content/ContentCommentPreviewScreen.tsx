import React from "react";
import { StyleSheet } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PText } from "../../components";


const ContentCommentPreviewContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Önizleme">
        <PCard style={styles.card}>
          <PCard.Title title="Seçilen Duygu" subtitle="Huzurlu" />
          <PCard.Content>
            <PText variant="bodyMedium" style={styles.paragraph}>
              Bu bölüm, gün içinde kendime daha nazik yaklaşmam gerektiğini hatırlattı. Küçük
              bir nefes molası bile fark yaratıyor.
            </PText>
            <PText variant="bodySmall">Günlük hayatımda bunu akşam rutinime ekleyeceğim.</PText>
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="outlined" disabled={isOffline}>
              Düzenle
            </PButton>
            <PButton mode="contained" disabled={isOffline}>
              Gönder
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Gönderim Bilgisi">
        <PText variant="bodySmall">
          Yorumun topluluk rehberine uygun şekilde paylaşılır. Dilersen daha sonra düzenleyebilir
          veya silebilirsin.
        </PText>
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
          <PActivityIndicator animating />
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
