import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

import { PActivityIndicator, PButton, PCard, PChip, PListIcon, PListItem, PProgressBar, PText } from "../../components";
import {
  getCollectionsForUser,
  getDownloadsForUser,
  getEbookById,
  getEbookProgressForUser,
  getFavoritesForUser,
  getHighlightsForUser,
  getPrimaryUser,
} from "../../data/mockSelectors";


const LibraryReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const favorites = getFavoritesForUser(user?.id);
  const collections = getCollectionsForUser(user?.id);
  const ebookProgress = getEbookProgressForUser(user?.id);
  const downloads = getDownloadsForUser(user?.id);
  const highlights = getHighlightsForUser(user?.id);
  const readingProgress = ebookProgress.slice(0, 2).map((item) => ({
    title: getEbookById(item.ebook_id)?.title ?? "e-Kitap",
    progress: (item.progress_percent ?? 0) / 100,
  }));

  return (
    <>
      <SectionCard title="Kütüphane Özeti" actionLabel="Yönet">
        <PListItem
          title="Favoriler"
          description={`${favorites.length} içerik`}
          left={(props) => <PListIcon {...props} icon="bookmark-outline" />}
          onPress={() => navigation.navigate("LibraryFavorites")}
        />
        <PListItem
          title="Koleksiyonlar"
          description={`${collections.length} koleksiyon`}
          left={(props) => <PListIcon {...props} icon="folder-outline" />}
          onPress={() => navigation.navigate("LibraryCollections")}
        />
        <PButton mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Koleksiyon Oluştur
        </PButton>
      </SectionCard>

      <SectionCard title="Devam Edenler" actionLabel="Tümü">
        {readingProgress.map((item) => (
          <View key={item.title} style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <PText variant="titleSmall">{item.title}</PText>
              <PChip compact>{Math.round(item.progress * 100)}%</PChip>
            </View>
            <PProgressBar progress={item.progress} />
          </View>
        ))}
      </SectionCard>

      <SectionCard title="İndirilenler" actionLabel="Yönet">
        {downloads.slice(0, 2).map((download) => (
          <PCard key={download.id} style={styles.card}>
            <PCard.Title
              title={`İndirilen ${download.content_type}`}
              subtitle={`${download.status} · ${(download.size_bytes / 1048576).toFixed(1)} MB`}
            />
            <PCard.Actions>
              <PButton mode="outlined" disabled={isOffline}>
                Aç
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Vurgular & Notlar" actionLabel="Tümü">
        <View style={styles.noteBox}>
          <PText variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            “{highlights[0]?.quote ?? "Kendine karşı nazik olmak, dönüşümün ilk adımıdır."}”
          </PText>
          <PText variant="labelSmall" style={{ color: theme.colors.primary }}>
            {getEbookById(highlights[0]?.source_id)?.title ?? "Kişisel Notlar"}
          </PText>
        </View>
      </SectionCard>
    </>
  );
};

export const LibraryOverviewScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Kütüphane" subtitle="İçerikler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Öğeler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Kütüphane" subtitle="Kişisel arşivin hazır">
        <StateMessage
          title="Kütüphanen boş"
          description="Favorilerine eklediğin içerikler burada görünecek. Şimdi bir içerik keşfet."
          actionLabel="Keşfet"
          icon="bookmark-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Kütüphane" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Kütüphane yüklenemedi"
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
      <ScreenLayout title="Kütüphane" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kütüphane" subtitle="Kaydedilen içerikler">
      <LibraryReadyContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  progressRow: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  card: {
    marginBottom: 12,
  },
  noteBox: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
});
