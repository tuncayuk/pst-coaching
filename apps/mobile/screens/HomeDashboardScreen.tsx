import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "./components/OfflineNotice";
import { ScreenLayout } from "./components/ScreenLayout";
import { SectionCard } from "./components/SectionCard";
import { SkeletonBlock } from "./components/SkeletonBlock";
import { StateMessage } from "./components/StateMessage";
import { resolveScreenState } from "./components/ScreenState";
import { getEbooks, getJourneys, getWorkshops } from "../data/mockSelectors";

const HomeReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const ebooks = getEbooks();
  const highlightItems = [
    {
      title: journeys[0]?.title ?? "Vicdandan Karaktere",
      subtitle: `${journeys[0]?.duration_days ?? 3} gün · ${journeys[0]?.daily_target ?? "12 dk"}`,
      progress: 0.6,
      journeyId: journeys[0]?.id,
    },
    {
      title: workshops[0]?.title ?? "Duygu Günlüğü",
      subtitle: "1. bölüm · 8 dk",
      progress: 0.3,
      journeyId: journeys[0]?.id,
    },
  ];

  const recommendations = [
    {
      title: workshops[0]?.title ?? "Sınır Koyma Atölyesi",
      subtitle: "45 dk · 4 bölüm",
      target: "ContentWorkshopDetail",
      id: workshops[0]?.id,
    },
    {
      title: ebooks[0]?.title ?? "Kendine Şefkat e-Kitap",
      subtitle: `${ebooks[0]?.total_pages ?? 120} sayfa`,
      target: "ContentEbookDetail",
      id: ebooks[0]?.id,
    },
  ];

  return (
    <>
      <SectionCard title="Bugün" actionLabel="Tümü">
        {highlightItems.map((item, index) => (
          <View key={item.title} style={styles.rowItem}>
            <View style={styles.rowHeader}>
              <Text variant="titleSmall">{item.title}</Text>
              <Chip compact>{Math.round(item.progress * 100)}%</Chip>
            </View>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              {item.subtitle}
            </Text>
            <ProgressBar progress={item.progress} style={styles.progress} />
            {index < highlightItems.length - 1 ? <Divider style={styles.divider} /> : null}
          </View>
        ))}
        <Button
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() =>
            navigation.navigate("Content", {
              screen: "ContentJourneyHome",
              params: { id: highlightItems[0]?.journeyId ?? journeys[0]?.id },
            })
          }
        >
          Devam Et
        </Button>
      </SectionCard>

      <SectionCard title="Önerilenler" actionLabel="Keşfet">
        {recommendations.map((item) => (
          <Card key={item.title} style={styles.card}>
            <Card.Title title={item.title} subtitle={item.subtitle} />
            <Card.Actions>
              <Button
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: item.target,
                    params: { id: item.id },
                  })
                }
              >
                İncele
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>

      <SectionCard title="Hızlı Başla" actionLabel="Rehber">
        <View style={styles.chipRow}>
          {[
            "Nefes Egzersizi",
            "Günlük Hedef",
            "Kısa Okuma",
          ].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
      </SectionCard>
    </>
  );
};

export const HomeDashboardScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Ana Sayfa" subtitle="İçerikler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
          <SkeletonBlock height={14} />
        </SectionCard>
        <SectionCard title="Yakında">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Ana Sayfa" subtitle="Yeni bir başlangıç yapalım">
        <StateMessage
          title="Henüz içerik yok"
          description="İlk yolculuğunu seçerek kişisel gelişim planını oluşturabilirsin."
          actionLabel="Keşfe Çık"
          icon="compass-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Ana Sayfa" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Ana sayfa yüklenemedi"
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
      <ScreenLayout title="Ana Sayfa" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <HomeReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ana Sayfa" subtitle="Bugün için öneriler">
      <HomeReadyContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  rowItem: {
    marginBottom: 12,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progress: {
    marginTop: 8,
  },
  divider: {
    marginTop: 12,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
});
