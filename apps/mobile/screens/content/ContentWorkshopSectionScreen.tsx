import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getContentItems, getWorkshopById } from "../../data/mockSelectors";

type RouteParams = { state?: ScreenState; id?: string; sectionId?: string };

const ContentWorkshopSectionContent = ({
  workshopId,
  sectionId,
  isOffline,
}: {
  workshopId?: string;
  sectionId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const workshop = getWorkshopById(workshopId);
  const section = getContentItems().find((item) => item.id === sectionId);

  return (
    <>
      <SectionCard title="Atölye Bölümü">
        <Text variant="titleMedium">{section?.title ?? "Bölüm"}</Text>
        <Text variant="bodySmall" style={styles.subtleText}>
          {workshop?.title ?? "Atölye"}
        </Text>
        <Text variant="bodyMedium" style={styles.paragraph}>
          {section?.body ??
            "Bu bölümde okuma ve uygulama adımlarını tamamlayarak ilerleyebilirsin."}
        </Text>
      </SectionCard>

      <SectionCard title="Eylemler">
        <Card style={styles.card}>
          <Card.Title title="Okuma" subtitle="Bölüm içeriğini oku" />
          <Card.Actions>
            <Button
              mode="outlined"
              disabled={isOffline}
              onPress={() =>
                navigation.navigate("Content", {
                  screen: "ContentReading",
                  params: { id: section?.id },
                })
              }
            >
              Okumaya Git
            </Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Uygulama" subtitle="Egzersizleri tamamla" />
          <Card.Actions>
            <Button
              mode="outlined"
              disabled={isOffline}
              onPress={() =>
                navigation.navigate("Content", {
                  screen: "ContentExercise",
                  params: { id: section?.id },
                })
              }
            >
              Uygulamaya Git
            </Button>
          </Card.Actions>
        </Card>
        <Button mode="contained" disabled={isOffline}>
          Bölümü Tamamla
        </Button>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopSectionScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;
  const sectionId = route?.params?.sectionId;

  if (state === "loading") {
    return (
      <ScreenLayout title="Atölye Bölümü" subtitle="Bölüm hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Eylemler">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Atölye Bölümü" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Bu bölüm şu anda erişilebilir değil."
          actionLabel="Atölyeye Dön"
          icon="file-document-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Atölye Bölümü" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Bölüm yüklenemedi"
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
      <ScreenLayout title="Atölye Bölümü" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentWorkshopSectionContent workshopId={workshopId} sectionId={sectionId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölye Bölümü" subtitle="Bölüm akışı">
      <ContentWorkshopSectionContent workshopId={workshopId} sectionId={sectionId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  subtleText: {
    opacity: 0.7,
    marginTop: 4,
  },
  paragraph: {
    marginTop: 8,
  },
  card: {
    marginBottom: 12,
  },
});
