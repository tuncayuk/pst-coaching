import React from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Text,
  useTheme,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const highlights = [
  {
    quote: "Nazik bir iç ses, zor anlarda en büyük destekçindir.",
    note: "Bu cümleyi günlük notlarına ekle.",
  },
  {
    quote: "Nefes, bedeninle kurduğun en hızlı köprüdür.",
    note: "Egzersiz öncesi hatırla.",
  },
];

const ContentEbookHighlightsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      <SectionCard title="Vurgular">
        {highlights.map((item) => (
          <Card key={item.quote} style={styles.card}>
            <Card.Content>
              <Text variant="bodyMedium" style={styles.quote}>
                “{item.quote}”
              </Text>
              <Text
                variant="bodySmall"
                style={[styles.note, { color: theme.colors.onSurfaceVariant }]}
              >
                {item.note}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </SectionCard>

      <SectionCard title="Notlarım" actionLabel="Düzenle">
        <Text variant="bodySmall">
          Notlarını farklı cihazlarda görebilmek için senkronizasyonu açık tut.
        </Text>
        <Button mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Yeni Not Ekle
        </Button>
      </SectionCard>
    </>
  );
};

export const ContentEbookHighlightsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Vurgular ve Notlar" subtitle="Vurgular yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Vurgular">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Vurgular ve Notlar" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Vurgu bulunamadı"
          description="Henüz kaydettiğin vurgu yok."
          actionLabel="Okumaya Dön"
          icon="marker"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Vurgular ve Notlar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Vurgular yüklenemedi"
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
      <ScreenLayout title="Vurgular ve Notlar" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentEbookHighlightsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Vurgular ve Notlar" subtitle="Kaydettiğin vurgular">
      <ContentEbookHighlightsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  quote: {
    marginBottom: 8,
  },
  note: {},
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
