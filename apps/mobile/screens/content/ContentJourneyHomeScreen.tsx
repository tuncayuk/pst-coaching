import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

import { PActivityIndicator, PButton, PCard, PChip, PDivider, PProgressBar, PText } from "../../components";
import {
  getContentProgressForUser,
  getJourneyById,
  getJourneyDaysForJourney,
  getPrimaryUser,
  getJourneys,
} from "../../data/mockSelectors";


type RouteParams = { state?: ScreenState; id?: string };

const ContentJourneyHomeContent = ({
  journeyId,
  isOffline,
}: {
  journeyId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const journey = getJourneyById(journeyId) ?? getJourneys()[0];
  const days = getJourneyDaysForJourney(journey?.id);
  const progressItems = getContentProgressForUser(user?.id).filter(
    (item) => item.content_type === "journey_day"
  );
  const completedCount = days.filter((day) =>
    progressItems.some((item) => item.content_id === day.id)
  ).length;
  const progress = days.length > 0 ? completedCount / days.length : 0;

  return (
    <>
      <SectionCard title="Yolculuk Özeti" actionLabel="Paylaş">
        <PText variant="titleMedium">{journey?.title ?? "Yolculuk"}</PText>
        <PText variant="bodySmall" style={styles.subtleText}>
          {journey?.description ?? "Yolculuğun kısa açıklaması burada yer alır."}
        </PText>
        <View style={styles.chipRow}>
          <PChip style={styles.chip} disabled={isOffline}>
            {journey?.level ?? "başlangıç"}
          </PChip>
          <PChip style={styles.chip} disabled={isOffline}>
            {journey?.duration_days ?? 0} gün
          </PChip>
          <PChip style={styles.chip} disabled={isOffline}>
            {journey?.daily_target ?? "10 dk"}
          </PChip>
        </View>
        <PProgressBar progress={progress} style={styles.progress} />
        <PText variant="bodySmall" style={styles.subtleText}>
          {completedCount}/{days.length} gün tamamlandı
        </PText>
        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline || days.length === 0}
          onPress={() => {
            if (days[0]) {
              navigation.navigate("Content", {
                screen: "ContentJourneyDay",
                params: { id: journey?.id, day: String(days[0].day_number) },
              });
            }
          }}
        >
          Devam Et
        </PButton>
      </SectionCard>

      <SectionCard title="Günler" actionLabel="Takvim">
        {days.map((day, index) => (
          <PCard key={day.id} style={styles.card}>
            <PCard.Title title={`Gün ${day.day_number}`} subtitle={day.title} />
            <PCard.Content>
              <PText variant="bodySmall" style={styles.subtleText}>
                Açılış: {day.unlock_time_local}
              </PText>
            </PCard.Content>
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentJourneyDay",
                    params: { id: journey?.id, day: String(day.day_number) },
                  })
                }
              >
                Gün İçeriği
              </PButton>
            </PCard.Actions>
            {index < days.length - 1 ? <PDivider style={styles.divider} /> : null}
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const ContentJourneyHomeScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const journeyId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Yolculuk" subtitle="Yolculuk yükleniyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
        </SectionCard>
        <SectionCard title="Günler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yolculuk" subtitle="Yolculuk bulunamadı">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Yolculuk verisi şimdilik erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="map-marker-path"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yolculuk" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yolculuk yüklenemedi"
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
      <ScreenLayout title="Yolculuk" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <ContentJourneyHomeContent journeyId={journeyId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuk" subtitle="Yolculuk akışı">
      <ContentJourneyHomeContent journeyId={journeyId} />
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
  progress: {
    marginTop: 12,
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
  divider: {
    marginTop: 8,
  },
});
