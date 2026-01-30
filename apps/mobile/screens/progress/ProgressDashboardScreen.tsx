import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, List, ProgressBar, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAchievements, getContentProgressForUser, getPrimaryUser } from "../../data/mockSelectors";
import { PButton, PCard, PText } from "../../components";

const ProgressReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const progressItems = getContentProgressForUser(user?.id);
  const achievements = getAchievements().filter((item) => item.user_id === user?.id);
  const weeklySummary = [
    { label: "Yolculuk", value: progressItems.filter((item) => item.content_type === "journey_day").length },
    { label: "Paket", value: progressItems.filter((item) => item.content_type === "package").length },
    { label: "Atölye", value: progressItems.filter((item) => item.content_type === "workshop").length },
  ];

  return (
    <>
      <SectionCard title="Haftalık Özet" actionLabel="Rapor">
        {weeklySummary.map((item) => (
          <View key={item.label} style={styles.summaryRow}>
            <PText variant="bodyMedium">{item.label}</PText>
            <Chip compact>{item.value} seans</Chip>
          </View>
        ))}
        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("ProgressWeeklySummary")}
        >
          Haftayı İncele
        </PButton>
      </SectionCard>

      <SectionCard title="İlerleme Haritası" actionLabel="Detay">
        <PText variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Bu ay içeriklerin %68'ini tamamladın. Odak alanın “Kendine Şefkat”.
        </PText>
        <ProgressBar progress={0.68} style={styles.progress} />
        <View style={styles.metricRow}>
          <PCard style={styles.metricCard}>
            <PCard.Title title="Toplam Süre" subtitle="5s 20d" />
          </PCard>
          <PCard style={styles.metricCard}>
            <PCard.Title title="Tamamlanan" subtitle="12 içerik" />
          </PCard>
        </View>
      </SectionCard>

      <SectionCard title="Başarılar" actionLabel="Tümü">
        {achievements.map((item) => (
          <List.Item
            key={item.id}
            title={item.type === "certificate" ? "Sertifika" : "Rozet"}
            description={item.source_type}
            left={(props) => <List.Icon {...props} icon="trophy-outline" />}
            onPress={() =>
              navigation.navigate("Content", {
                screen: "ContentAchievement",
                params: { id: item.id },
              })
            }
          />
        ))}
      </SectionCard>

      <SectionCard title="Geri Bildirim" actionLabel="Yaz">
        <PText variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
          Son atölyeni değerlendirerek önerilerimizi güçlendirebilirsin.
        </PText>
        <PButton
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          onPress={() =>
            navigation.navigate("Content", {
              screen: "ContentReviewPrompt",
              params: { targetType: "journey", id: "latest" },
            })
          }
        >
          Değerlendirme Yap
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProgressDashboardScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
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
