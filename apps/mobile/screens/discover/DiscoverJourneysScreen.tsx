import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getJourneys } from "../../data/mockSelectors";
import { PButton, PCard, PText } from "../../components";

const DiscoverJourneysContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const journeys = getJourneys();

  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sıfırla">
        <View style={styles.chipRow}>
          {["Önerilen", "Yeni", "Kısa", "Derin"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <PText variant="bodySmall">{journeys.length} yolculuk bulundu</PText>
      </SectionCard>

      <SectionCard title="Yolculuklar" actionLabel="Sırala">
        {journeys.map((item) => (
          <PCard key={item.id} style={styles.card}>
            <PCard.Title
              title={item.title}
              subtitle={`${item.duration_days ?? 0} gün · ${item.daily_target ?? "10 dk"}`}
            />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentJourneyDetail",
                    params: { id: item.id },
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

export const DiscoverJourneysScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Yolculuklar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Yolculuklar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Henüz yolculuk yok">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Yeni içerikler kısa süre içinde eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yolculuklar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yolculuklar yüklenemedi"
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
      <ScreenLayout title="Yolculuklar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverJourneysContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuklar" subtitle="Kendine uygun yolculuklar">
      <DiscoverJourneysContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
});
