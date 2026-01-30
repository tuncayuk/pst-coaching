import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";
import {
  getCollectionItems,
  getCollectionsForUser,
  getFavoritesForUser,
  getJourneys,
  getModules,
  getPrimaryUser,
  getWorkshops,
} from "../../data/mockSelectors";

const LibraryCollectionDetailContent = ({
  collectionId,
  isOffline,
}: {
  collectionId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const collection = getCollectionsForUser(user?.id).find((item) => item.id === collectionId);
  const favorites = getFavoritesForUser(user?.id);
  const collectionItems = getCollectionItems()
    .filter((item) => item.collection_id === collection?.id)
    .map((item) => favorites.find((favorite) => favorite.id === item.favorite_id))
    .filter(Boolean)
    .map((favorite) => {
      const contentItem =
        getJourneys().find((entry) => entry.id === favorite?.item_id) ??
        getWorkshops().find((entry) => entry.id === favorite?.item_id) ??
        getModules().find((entry) => entry.id === favorite?.item_id);
      return {
        id: favorite?.id ?? "",
        title: contentItem?.title ?? "Favori",
        subtitle: contentItem ? "İçerik" : "Not",
      };
    });

  return (
    <>
      <SectionCard title="Koleksiyon Bilgisi">
        <PText variant="titleMedium" style={styles.title}>
          {collection?.name ?? "Koleksiyon"}
        </PText>
        <PText variant="bodySmall" style={styles.paragraph}>
          Kişisel koleksiyon içeriğini burada yönetebilirsin.
        </PText>
        <PButton mode="outlined" disabled={isOffline}>
          Koleksiyonu Düzenle
        </PButton>
      </SectionCard>

      <SectionCard title="İçerikler" actionLabel="Tümü">
        {collectionItems.map((item) => (
          <PCard key={item.title} style={styles.card}>
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

export const LibraryCollectionDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const collectionId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Detaylar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="İçerikler">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Koleksiyon boş"
          description="Bu koleksiyona henüz içerik eklenmedi."
          actionLabel="İçerik Ekle"
          icon="folder-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Koleksiyon yüklenemedi"
          description="Detayları getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Koleksiyon Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <LibraryCollectionDetailContent collectionId={collectionId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koleksiyon Detay" subtitle="Koleksiyonun">
      <LibraryCollectionDetailContent collectionId={collectionId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 6,
  },
  paragraph: {
    marginBottom: 12,
  },
  card: {
    marginBottom: 12,
  },
});
