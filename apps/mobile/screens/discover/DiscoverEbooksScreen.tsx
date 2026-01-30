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
import { getEbooks } from "../../data/mockSelectors";
import { PButton, PCard, PText } from "../../components";

const DiscoverEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const ebooks = getEbooks();

  return (
    <>
      <SectionCard title="Filtreler" actionLabel="Sıfırla">
        <View style={styles.chipRow}>
          {["Önerilen", "Yeni", "Kısa", "Sesli"].map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
        <PText variant="bodySmall">{ebooks.length} e-Kitap bulundu</PText>
      </SectionCard>

      <SectionCard title="e-Kitaplar" actionLabel="Sırala">
        {ebooks.map((item) => (
          <PCard key={item.id} style={styles.card}>
            <PCard.Title
              title={item.title}
              subtitle={`${item.total_pages ?? 0} sayfa · ${item.category ?? ""}`}
            />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentEbookDetail",
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

export const DiscoverEbooksScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="e-Kitaplar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="e-Kitaplar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Henüz e-Kitap yok">
        <StateMessage
          title="e-Kitap bulunamadı"
          description="Yakında yeni e-Kitaplar eklenecek."
          actionLabel="Bildirimleri Aç"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="e-Kitaplar yüklenemedi"
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
      <ScreenLayout title="e-Kitaplar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <DiscoverEbooksContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitaplar" subtitle="Rahatça okuyabileceğin seçkiler">
      <DiscoverEbooksContent />
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
