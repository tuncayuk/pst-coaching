import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const dailyStats = [
  { label: "Pzt", value: 2 },
  { label: "Sal", value: 1 },
  { label: "Çar", value: 3 },
  { label: "Per", value: 0 },
  { label: "Cum", value: 2 },
];

const highlights = [
  { title: "Odak", subtitle: "3 pratik" },
  { title: "Uyku", subtitle: "2 pratik" },
];

const ProgressWeeklySummaryContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Haftalık Aktivite" actionLabel="Takvim">
        <View style={styles.row}>
          {dailyStats.map((day) => (
            <View key={day.label} style={styles.dayCard}>
              <PText variant="labelLarge">{day.label}</PText>
              <Chip compact>{day.value}</Chip>
            </View>
          ))}
        </View>
        <PButton mode="contained" disabled={isOffline}>
          Haftayı İncele
        </PButton>
      </SectionCard>

      <SectionCard title="Öne Çıkan Alanlar" actionLabel="Detay">
        {highlights.map((item) => (
          <PCard key={item.title} style={styles.card}>
            <PCard.Title title={item.title} subtitle={item.subtitle} />
            <PCard.Actions>
              <PButton mode="outlined" disabled={isOffline}>
                Gör
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const ProgressWeeklySummaryScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Haftalık Özet" subtitle="Özet hazırlanıyor">
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
      <ScreenLayout title="Haftalık Özet" subtitle="Aktivite oluşacak">
        <StateMessage
          title="Haftalık veri yok"
          description="Bu hafta henüz içerik tamamlamadın."
          actionLabel="İçerik Bul"
          icon="calendar-week"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Haftalık Özet" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Özet yüklenemedi"
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
      <ScreenLayout title="Haftalık Özet" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <ProgressWeeklySummaryContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Haftalık Özet" subtitle="Haftanı gözden geçir">
      <ProgressWeeklySummaryContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  dayCard: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.04)",
    marginRight: 8,
    marginBottom: 8,
    width: 54,
  },
  card: {
    marginBottom: 12,
  },
});
