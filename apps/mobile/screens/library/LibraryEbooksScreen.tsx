import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbookProgressForUser, getEbooks, getPrimaryUser } from "../../data/mockSelectors";
import { PButton, PCard, PText } from "../../components";

const filters = ["Yeni", "Devam Eden", "Tamamlanan", "İndirilen"];

const LibraryEbooksContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const ebooks = getEbooks();
  const progress = getEbookProgressForUser(user?.id);
  const ebooksWithProgress = ebooks.map((book) => {
    const found = progress.find((item) => item.ebook_id === book.id);
    return {
      ...book,
      progress: (found?.progress_percent ?? 0) / 100,
    };
  });

  return (
    <>
      <SectionCard title="Filtre" actionLabel="Sırala">
        <View style={styles.chipRow}>
          {filters.map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="e-Kitaplar" actionLabel="Tümü">
        {ebooksWithProgress.map((book) => (
          <PCard key={book.id} style={styles.card}>
            <PCard.Title title={book.title} subtitle={`${book.total_pages ?? 0} sayfa`} />
            <PCard.Content>
              <PText variant="bodySmall" style={styles.progressLabel}>
                {Math.round(book.progress * 100)}% tamamlandı
              </PText>
              <ProgressBar progress={book.progress} />
            </PCard.Content>
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentEbookReader",
                    params: { id: book.id },
                  })
                }
              >
                Oku
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const LibraryEbooksScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="e-Kitaplar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Kitaplar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Kütüphane gelişiyor">
        <StateMessage
          title="e-Kitap bulunamadı"
          description="Henüz kitap eklenmedi. Keşfet bölümünden yeni e-kitaplar bulabilirsin."
          actionLabel="Keşfe Git"
          icon="book-open-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitaplar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="e-Kitaplar yüklenemedi"
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
      <ScreenLayout title="e-Kitaplar" subtitle="Önbellekteki içerikler">
        <OfflineNotice />
        <LibraryEbooksContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitaplar" subtitle="Okumalarına devam et">
      <LibraryEbooksContent />
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
  progressLabel: {
    marginBottom: 8,
  },
});
