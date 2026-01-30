import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PText, PTextInput } from "../../components";

const emotionTags = ["Sakin", "Meraklı", "Huzurlu", "Zorlanmış"];

const ContentCommentContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Yansıtma Soruları">
        <PText variant="bodySmall">Bu bölüm seni nasıl etkiledi?</PText>
        <PTextInput
          mode="outlined"
          placeholder="Düşüncelerini yaz"
          style={styles.input}
          editable={!isOffline}
        />
        <PText variant="bodySmall">Günlük hayatına nasıl taşıyabilirsin?</PText>
        <PTextInput
          mode="outlined"
          placeholder="Örnekler paylaş"
          style={styles.input}
          editable={!isOffline}
        />
      </SectionCard>

      <SectionCard title="Duygu Seç">
        <View style={styles.chipRow}>
          {emotionTags.map((tag) => (
            <Chip key={tag} style={styles.chip} disabled={isOffline}>
              {tag}
            </Chip>
          ))}
        </View>
        <PButton mode="contained" disabled={isOffline}>
          Önizlemeye Geç
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentCommentScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; contentItemId?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yorum" subtitle="Yorum hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Sorular">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yorum" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Yorum şablonu yok"
          description="Henüz yorum için soru hazırlanmadı."
          actionLabel="İçeriğe Dön"
          icon="comment-text-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yorum" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yorum alanı yüklenemedi"
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
      <ScreenLayout title="Yorum" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentCommentContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yorum" subtitle="Yorumunu paylaş">
      <ContentCommentContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
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
});
