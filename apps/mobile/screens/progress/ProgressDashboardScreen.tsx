import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  List,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const achievements = [
  {
    title: "7 Günlük Seri",
    subtitle: "Aralıksız pratik",
  },
  {
    title: "3 Atölye Tamamlandı",
    subtitle: "Yeni beceriler",
  },
];

const weeklySummary = [
  {
    label: "Duygu Günlüğü",
    value: 4,
  },
  {
    label: "Okuma",
    value: 2,
  },
  {
    label: "Nefes",
    value: 3,
  },
];

const ProgressReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();

  return (
    <>
      <SectionCard title="Haftalık Özet" actionLabel="Rapor">
        {weeklySummary.map((item) => (
          <View key={item.label} style={styles.summaryRow}>
            <Text variant="bodyMedium">{item.label}</Text>
            <Chip compact>{item.value} seans</Chip>
          </View>
        ))}
        <Button mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Haftayı İncele
        </Button>
      </SectionCard>

      <SectionCard title="İlerleme Haritası" actionLabel="Detay">
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Bu ay içeriklerin %68'ini tamamladın. Odak alanın “Kendine Şefkat”.
        </Text>
        <ProgressBar progress={0.68} style={styles.progress} />
        <View style={styles.metricRow}>
          <Card style={styles.metricCard}>
            <Card.Title title="Toplam Süre" subtitle="5s 20d" />
          </Card>
          <Card style={styles.metricCard}>
            <Card.Title title="Tamamlanan" subtitle="12 içerik" />
          </Card>
        </View>
      </SectionCard>

      <SectionCard title="Başarılar" actionLabel="Tümü">
        {achievements.map((item) => (
          <List.Item
            key={item.title}
            title={item.title}
            description={item.subtitle}
            left={(props) => <List.Icon {...props} icon="trophy-outline" />}
          />
        ))}
      </SectionCard>

      <SectionCard title="Geri Bildirim" actionLabel="Yaz">
        <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Son atölyeni değerlendirerek önerilerimizi güçlendirebilirsin.
        </Text>
        <Button mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Değerlendirme Yap
        </Button>
      </SectionCard>
    </>
  );
};

export const ProgressDashboardScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Gelişim" subtitle="Veriler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
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
      <ScreenLayout title="Gelişim" subtitle="İlerleme burada görünecek">
        <StateMessage
          title="Henüz veri yok"
          description="Bir içerik tamamladığında ilerleme raporun oluşur."
          actionLabel="İçerik Bul"
          icon="chart-line"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Gelişim" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Gelişim yüklenemedi"
          description="Verileri getiremedik. Tekrar deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Gelişim" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <ProgressReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Gelişim" subtitle="İlerlemeni takip et">
      <ProgressReadyContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  progress: {
    marginTop: 12,
  },
  metricRow: {
    flexDirection: "row",
    marginTop: 12,
  },
  metricCard: {
    flex: 1,
    marginRight: 8,
  },
  actionButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
});
