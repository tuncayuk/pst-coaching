import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Chip,
  Text,
  TextInput,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const ratingLabels = ["Harika", "Faydalı", "Geliştirilebilir", "Zorlayıcı"];

const ContentReviewPromptContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Değerlendirme">
        <Text variant="bodySmall">Deneyimini seçerek değerlendir.</Text>
        <View style={styles.chipRow}>
          {ratingLabels.map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <TextInput
          mode="outlined"
          label="Geri bildirim"
          placeholder="Neleri sevdin, neler geliştirilebilir?"
          multiline
          numberOfLines={4}
          editable={!isOffline}
          style={styles.input}
        />
        <Button mode="contained" disabled={isOffline}>
          Değerlendirmeyi Gönder
        </Button>
      </SectionCard>

      <SectionCard title="Gizlilik">
        <Text variant="bodySmall">
          Geri bildirimin kimliğin paylaşılmadan ürün geliştirme için kullanılır.
        </Text>
      </SectionCard>
    </>
  );
};

export const ContentReviewPromptScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; targetType?: string; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Değerlendirme" subtitle="Değerlendirme hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Değerlendirme">
          <SkeletonBlock height={120} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Değerlendirme" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Değerlendirme bulunamadı"
          description="Bu içerik için değerlendirme yapılamıyor."
          actionLabel="Geri Dön"
          icon="star-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Değerlendirme" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Değerlendirme yüklenemedi"
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
      <ScreenLayout title="Değerlendirme" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentReviewPromptContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Değerlendirme" subtitle="Deneyimini değerlendir">
      <ContentReviewPromptContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  input: {
    marginBottom: 12,
  },
});
