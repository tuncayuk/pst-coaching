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
import { resolveScreenState } from "../components/ScreenState";

const moodTags = ["Sakin", "Odaklı", "Meraklı", "Düşük enerji"];

const moodSummary = [
  {
    title: "Sakin",
    value: "%42",
  },
  {
    title: "Duyarlı",
    value: "%28",
  },
];

const ProgressEmotionalMapContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="14 Günlük Özet" actionLabel="30 Gün">
        <View style={styles.row}>
          {moodSummary.map((item) => (
            <Card key={item.title} style={styles.metricCard}>
              <Card.Title title={item.title} subtitle={item.value} />
            </Card>
          ))}
        </View>
        <Text variant="bodySmall" style={styles.paragraph}>
          Son iki haftada duygusal denge puanın %68.
        </Text>
        <ProgressBar progress={0.68} />
      </SectionCard>

      <SectionCard title="Duygu Etiketleri" actionLabel="Filtre">
        <View style={styles.chipRow}>
          {moodTags.map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <Button mode="outlined" disabled={isOffline}>
          Haritayı Güncelle
        </Button>
      </SectionCard>
    </>
  );
};

export const ProgressEmotionalMapScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Duygusal Harita" subtitle="Harita hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Özet">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Duygusal Harita" subtitle="Duygu verisi oluşacak">
        <StateMessage
          title="Duygu verisi yok"
          description="Günlük pratik yaptıkça duygusal haritan oluşacak."
          actionLabel="Pratik Başlat"
          icon="emoticon-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Duygusal Harita" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Harita yüklenemedi"
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
      <ScreenLayout title="Duygusal Harita" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <ProgressEmotionalMapContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Duygusal Harita" subtitle="Duygusal durumunu izle">
      <ProgressEmotionalMapContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    marginRight: 8,
  },
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
});
