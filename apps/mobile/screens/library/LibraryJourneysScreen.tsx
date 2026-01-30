import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getJourneys } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PProgressBar, PText } from "../../components";


const LibraryJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journeys = getJourneys();
  const activeJourneys = journeys.slice(0, 2).map((journey, index) => ({
    id: journey.id,
    title: journey.title,
    progress: 0.2 + index * 0.2,
    next: `Gün ${index + 1} · ${journey.daily_target ?? "10 dk"}`,
  }));
  const suggestedJourneys = journeys.slice(2, 4).map((journey) => ({
    id: journey.id,
    title: journey.title,
    subtitle: `${journey.duration_days ?? 0} gün · ${journey.daily_target ?? "10 dk"}`,
  }));

  return (
    <>
      <SectionCard title="Aktif Yolculuklar" actionLabel="Tümü">
        {activeJourneys.map((journey) => (
          <View key={journey.title} style={styles.progressBlock}>
            <View style={styles.progressHeader}>
              <PText variant="titleSmall">{journey.title}</PText>
              <PChip compact>{Math.round(journey.progress * 100)}%</PChip>
            </View>
            <PText variant="bodySmall" style={styles.subtitle}>
              {journey.next}
            </PText>
            <PProgressBar progress={journey.progress} />
          </View>
        ))}
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.primaryButton}
          onPress={() =>
            navigation.navigate("Content", {
              screen: "ContentJourneyDay",
              params: { id: activeJourneys[0]?.id, day: "1" },
            })
          }
        >
          Bugünkü Adımı Aç
        </PButton>
      </SectionCard>

      <SectionCard title="Önerilen Yolculuklar" actionLabel="Keşfet">
        {suggestedJourneys.map((journey) => (
          <PCard key={journey.title} style={styles.card}>
            <PCard.Title title={journey.title} subtitle={journey.subtitle} />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentJourneyDetail",
                    params: { id: journey.id },
                  })
                }
              >
                İncele
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryJourneysScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Yolculuklar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Öneriler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Kişisel programın hazır">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Henüz başladığın bir yolculuk yok. Sana uygun bir program seçebilirsin."
          actionLabel="Yolculuk Seç"
          icon="map-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yolculuklar yüklenemedi"
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
      <ScreenLayout title="Yolculuklar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryJourneysContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuklar" subtitle="Programlarını yönet">
      <LibraryJourneysContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  progressBlock: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
});
