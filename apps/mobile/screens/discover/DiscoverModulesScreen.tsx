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
import { getModules } from "../../data/mockSelectors";
import { PButton, PCard, PText } from "../../components";

const DiscoverModulesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const modules = getModules();

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
        <PText variant="bodySmall">{modules.length} modül bulundu</PText>
      </SectionCard>

      <SectionCard title="Modüller" actionLabel="Sırala">
        {modules.map((item) => (
          <PCard key={item.id} style={styles.card}>
            <PCard.Title title={item.title} subtitle={item.description} />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentModuleDetail",
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

export const DiscoverModulesScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Modüller" subtitle="Modüller hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Modüller">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Modüller" subtitle="Henüz modül yok">
        <StateMessage
          title="Modül bulunamadı"
          description="Yeni modüller kısa süre içinde eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Modüller" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Modüller yüklenemedi"
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
      <ScreenLayout title="Modüller" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverModulesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Modüller" subtitle="Kısa modüllerle ilerle">
      <DiscoverModulesContent />
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
