import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

import { PActivityIndicator, PButton, PCard, PChip } from "../../components";
import {
  getEbooks,
  getFavoritesForUser,
  getJourneys,
  getModules,
  getNotes,
  getPrimaryUser,
  getWorkshops,
} from "../../data/mockSelectors";


const filters = ["Tümü", "Yolculuk", "Atölye", "Modül", "e-Kitap"];

const LibraryFavoritesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const favorites = getFavoritesForUser(user?.id);
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const modules = getModules();
  const ebooks = getEbooks();
  const notes = getNotes();
  const favoriteItems = favorites.map((favorite) => {
    const contentItem =
      journeys.find((item) => item.id === favorite.item_id) ??
      workshops.find((item) => item.id === favorite.item_id) ??
      modules.find((item) => item.id === favorite.item_id) ??
      ebooks.find((item) => item.id === favorite.item_id);
    const noteItem = notes.find((item) => item.id === favorite.item_id);
    return {
      id: favorite.id,
      title: contentItem?.title ?? noteItem?.text ?? "Favori",
      subtitle: contentItem ? "İçerik" : "Not",
    };
  });

  return (
    <>
      <SectionCard title="Filtre" actionLabel="Sırala">
        <View style={styles.chipRow}>
          {filters.map((label) => (
            <PChip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </PChip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Favoriler" actionLabel="Tümü">
        {favoriteItems.map((item) => (
          <PCard key={item.id} style={styles.card}>
            <PCard.Title title={item.title} subtitle={item.subtitle} />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() => navigation.navigate("LibraryFavoriteDetail", { id: item.id })}
              >
                Aç
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryFavoritesScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Favoriler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Öğeler">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Kaydedilenler burada">
        <StateMessage
          title="Favori eklenmedi"
          description="Beğendiğin içerikleri favorilere ekleyerek burada görebilirsin."
          actionLabel="İçerik Keşfet"
          icon="heart-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Favoriler" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Favoriler yüklenemedi"
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
      <ScreenLayout title="Favoriler" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryFavoritesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Favoriler" subtitle="Kaydettiklerin">
      <LibraryFavoritesContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
});
