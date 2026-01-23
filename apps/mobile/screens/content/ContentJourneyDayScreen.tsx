import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, Chip, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getContentItemsForParent,
  getJourneyDaysForJourney,
  getJourneyById,
  getJourneys,
} from "../../data/mockSelectors";

type RouteParams = { state?: ScreenState; id?: string; day?: string };

const ContentJourneyDayContent = ({
  journeyId,
  dayNumber,
  isOffline,
}: {
  journeyId?: string;
  dayNumber?: number;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const journey = getJourneyById(journeyId);
  const days = getJourneyDaysForJourney(journey?.id);
  const day = days.find((item) => item.day_number === dayNumber) ?? days[0];
  const contentItems = day
    ? getContentItemsForParent("journey_day", day.id)
    : [];

  return (
    <>
      <SectionCard title="Günün Planı" actionLabel="Takvim">
        <Text variant="titleMedium">{journey?.title ?? "Yolculuk"}</Text>
        <Text variant="bodySmall" style={styles.subtleText}>
          {day ? `Gün ${day.day_number} · ${day.title}` : "Gün içeriği"}
        </Text>
        <View style={styles.chipRow}>
          <Chip style={styles.chip} disabled={isOffline}>
            08:00 kuralı
          </Chip>
          <Chip style={styles.chip} disabled={isOffline}>
            Yorum teslimi 23:59
          </Chip>
        </View>
      </SectionCard>

      <SectionCard title="İçerikler" actionLabel="Sırala">
        {contentItems.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title title={item.title} subtitle={item.content_type} />
            <Card.Content>
              <Text variant="bodySmall" style={styles.subtleText}>
                {item.body}
              </Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                disabled={isOffline}
                onPress={() => {
                  if (item.content_type === "reading") {
                    navigation.navigate("Content", {
                      screen: "ContentReading",
                      params: { id: item.id },
                    });
                    return;
                  }
                  if (item.content_type === "exercise") {
                    navigation.navigate("Content", {
                      screen: "ContentExercise",
                      params: { id: item.id },
                    });
                    return;
                  }
                  navigation.navigate("Content", {
                    screen: "ContentComment",
                    params: { contentItemId: item.id },
                  });
                }}
              >
                Başla
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>
    </>
  );
};

export const ContentJourneyDayScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const dayNumber = route?.params?.day ? Number(route.params.day) : undefined;
  const journeyId = route?.params?.id ?? getJourneys()[0]?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Gün İçeriği" subtitle="Gün İçeriği yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={16} />
        </SectionCard>
        <SectionCard title="İçerikler">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Gün İçeriği" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Gün içeriği yok"
          description="Bu güne ait içerik henüz eklenmemiş."
          actionLabel="Yolculuğa Dön"
          icon="calendar-blank-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Gün İçeriği" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Gün içeriği yüklenemedi"
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
      <ScreenLayout title="Gün İçeriği" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentJourneyDayContent journeyId={journeyId} dayNumber={dayNumber} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Gün İçeriği" subtitle="Gün planı">
      <ContentJourneyDayContent journeyId={journeyId} dayNumber={dayNumber} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  subtleText: {
    opacity: 0.7,
    marginTop: 4,
  },
  card: {
    marginBottom: 12,
  },
});
