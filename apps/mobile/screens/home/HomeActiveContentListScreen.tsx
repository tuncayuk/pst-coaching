import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  ProgressBar,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";
import { getEbooks, getJourneys, getWorkshops } from "../../data/mockSelectors";

const HomeActiveContentListContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const ebooks = getEbooks();
  const activeItems = [
    {
      id: journeys[0]?.id,
      title: journeys[0]?.title ?? "Yolculuk",
      subtitle: "Gün 1 · 12 dk",
      progress: 0.42,
      target: "ContentJourneyHome",
    },
    {
      id: ebooks[0]?.id,
      title: ebooks[0]?.title ?? "e-Kitap",
      subtitle: "Bölüm 1 · 8 dk",
      progress: 0.18,
      target: "ContentEbookReader",
    },
    {
      id: workshops[0]?.id,
      title: workshops[0]?.title ?? "Atölye",
      subtitle: "Bölüm 2 · 14 dk",
      progress: 0.6,
      target: "ContentWorkshopHome",
    },
  ];

  return (
    <>
      <SectionCard title="Aktif İçeriklerin">
        {activeItems.map((item) => (
          <Card key={item.title} style={styles.card}>
            <Card.Title title={item.title} subtitle={item.subtitle} />
            <Card.Content>
              <View style={styles.progressRow}>
                <ProgressBar progress={item.progress} style={styles.progress} />
                <Text variant="labelSmall">{Math.round(item.progress * 100)}%</Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: item.target,
                    params: { id: item.id },
                  })
                }
              >
                Devam Et
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>

      <SectionCard title="Planlama" actionLabel="Hatırlat">
        <Text variant="bodySmall">
          Haftalık hedefini belirle ve içeriklerini düzenli takip et.
        </Text>
        <Button mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Hedef Belirle
        </Button>
      </SectionCard>
    </>
  );
};

export const HomeActiveContentListScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Aktif İçerikler" subtitle="İçerikler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="İçerikler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Aktif İçerikler" subtitle="Henüz aktif içerik yok">
        <StateMessage
          title="Aktif içerik yok"
          description="Keşfe çıkarak yeni bir yolculuk seçebilirsin."
          actionLabel="Keşfe Git"
          icon="compass-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Aktif İçerikler" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Aktif içerikler yüklenemedi"
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
      <ScreenLayout title="Aktif İçerikler" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <HomeActiveContentListContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Aktif İçerikler" subtitle="Devam ettiğin içerikler">
      <HomeActiveContentListContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  progress: {
    flex: 1,
    marginRight: 8,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
