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
import { getEbooks, getJourneys, getModules, getWorkshops } from "../../data/mockSelectors";
import { PButton, PCard, PText } from "../../components";

const HomeSearchResultsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const resultGroups = [
    {
      title: "Yolculuklar",
      items: getJourneys().map((item) => ({ id: item.id, title: item.title, route: "ContentJourneyDetail" })),
    },
    {
      title: "Atölyeler",
      items: getWorkshops().map((item) => ({ id: item.id, title: item.title, route: "ContentWorkshopDetail" })),
    },
    {
      title: "Modüller",
      items: getModules().map((item) => ({ id: item.id, title: item.title, route: "ContentModuleDetail" })),
    },
    {
      title: "e-Kitaplar",
      items: getEbooks().map((item) => ({ id: item.id, title: item.title, route: "ContentEbookDetail" })),
    },
  ];
  const totalCount = resultGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sıfırla">
        <View style={styles.filterRow}>
          {["Tümü", "Yeni", "Kısa", "Sesli"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <PText variant="bodySmall">{totalCount} sonuç bulundu</PText>
      </SectionCard>

      {resultGroups.map((group) => (
        <SectionCard key={group.title} title={group.title} actionLabel="Tümü">
          {group.items.map((item) => (
            <PCard key={item.id} style={styles.card}>
              <PCard.Title title={item.title} subtitle="30-45 dk · 4 içerik" />
              <PCard.Actions>
                <PButton
                  mode="outlined"
                  disabled={isOffline}
                  onPress={() =>
                    navigation.navigate("Content", {
                      screen: item.route,
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
      ))}
    </>
  );
};

export const HomeSearchResultsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Arama Sonuçları" subtitle="Sonuçlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Sonuçlar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Arama Sonuçları" subtitle="Sonuç bulunamadı">
        <StateMessage
          title="Sonuç bulunamadı"
          description="Aramanı genişletmeyi veya filtreleri temizlemeyi deneyebilirsin."
          actionLabel="Filtreleri Temizle"
          icon="magnify"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Arama Sonuçları" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Arama sonuçları yüklenemedi"
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
      <ScreenLayout title="Arama Sonuçları" subtitle="Önbellekteki sonuçlar">
        <OfflineNotice />
        <HomeSearchResultsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Arama Sonuçları" subtitle="Araman için öneriler">
      <HomeSearchResultsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  filterRow: {
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
