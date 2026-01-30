import React from "react";
import { StyleSheet } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getDownloadsForUser, getPrimaryUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PText } from "../../components";


const LibraryDownloadsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const downloads = getDownloadsForUser(user?.id);

  return (
    <>
      <SectionCard title="İndirilenler" actionLabel="Temizle">
        {downloads.map((item) => (
          <PCard key={item.id} style={styles.card}>
            <PCard.Title
              title={`İndirilen ${item.content_type}`}
              subtitle={`${(item.size_bytes / 1048576).toFixed(1)} MB`}
            />
            <PCard.Content>
              <PText variant="bodySmall">Durum: {item.status}</PText>
            </PCard.Content>
            <PCard.Actions>
              <PButton mode="outlined" disabled={isOffline}>
                Aç
              </PButton>
              <PButton mode="text" disabled={isOffline}>
                Sil
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryDownloadsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="İndirilenler" subtitle="İndirilenler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Dosyalar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="İndirilenler" subtitle="Çevrimdışı erişim">
        <StateMessage
          title="İndirilen içerik yok"
          description="Çevrimdışı erişim için içerikleri indirip burada saklayabilirsin."
          actionLabel="İçerik İndir"
          icon="download-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="İndirilenler" subtitle="Bir sorun oluştu">
        <StateMessage
          title="İndirilenler yüklenemedi"
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
      <ScreenLayout title="İndirilenler" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryDownloadsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="İndirilenler" subtitle="Dosyalarını yönet">
      <LibraryDownloadsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
});
