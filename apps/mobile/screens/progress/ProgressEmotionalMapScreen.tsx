import React from "react";
import { StyleSheet, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PChip, PProgressBar, PText } from "../../components";


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
            <PCard key={item.title} style={styles.metricCard}>
              <PCard.Title title={item.title} subtitle={item.value} />
            </PCard>
          ))}
        </View>
        <PText variant="bodySmall" style={styles.paragraph}>
          Son iki haftada duygusal denge puanın %68.
        </PText>
        <PProgressBar progress={0.68} />
      </SectionCard>

      <SectionCard title="Duygu Etiketleri" actionLabel="Filtre">
        <View style={styles.chipRow}>
          {moodTags.map((label) => (
            <PChip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </PChip>
          ))}
        </View>
        <PButton mode="outlined" disabled={isOffline}>
          Haritayı Güncelle
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProgressEmotionalMapScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Duygusal Harita" subtitle="Harita hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
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
