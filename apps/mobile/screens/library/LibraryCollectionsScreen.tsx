import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

import { PActivityIndicator, PButton, PCard } from "../../components";
import {
  getCollectionItems,
  getCollectionsForUser,
  getPrimaryUser,
} from "../../data/mockSelectors";


const LibraryCollectionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const collections = getCollectionsForUser(user?.id);

  return (
    <>
      <SectionCard title="Koleksiyonlar" actionLabel="Yeni">
        {collections.map((collection) => (
          <PCard key={collection.id} style={styles.card}>
            <PCard.Title
              title={collection.name}
              subtitle={`${getCollectionItems().filter((item) => item.collection_id === collection.id).length} içerik`}
            />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() => navigation.navigate("LibraryCollectionDetail", { id: collection.id })}
              >
                Aç
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
        <PButton mode="contained" disabled={isOffline}>
          Koleksiyon Oluştur
        </PButton>
      </SectionCard>
    </>
  );
};

export const LibraryCollectionsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="Koleksiyonlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Koleksiyonlar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="İçeriklerini düzenle">
        <StateMessage
          title="Koleksiyon yok"
          description="Favori içeriklerini bir araya getirerek koleksiyon oluşturabilirsin."
          actionLabel="Koleksiyon Oluştur"
          icon="folder-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Koleksiyonlar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Koleksiyonlar yüklenemedi"
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
      <ScreenLayout title="Koleksiyonlar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryCollectionsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koleksiyonlar" subtitle="Arşivini düzenle">
      <LibraryCollectionsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
