import React from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const chapters = [
  { title: "Giriş: Niyet", subtitle: "6 dk" },
  { title: "Duygu Haritası", subtitle: "12 dk" },
  { title: "Şefkatli Dil", subtitle: "10 dk" },
  { title: "Günlük Uygulama", subtitle: "15 dk" },
];

const ContentEbookTocContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Bölümler" actionLabel="Sırala">
        {chapters.map((chapter, index) => (
          <React.Fragment key={chapter.title}>
            <List.Item title={chapter.title} description={chapter.subtitle} />
            {index < chapters.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </SectionCard>

      <SectionCard title="Okuma Planı">
        <Text variant="bodySmall">
          Bölümleri haftaya yayarak okuma hedefi oluşturabilir ve hatırlatıcı kurabilirsin.
        </Text>
        <Button mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Okuma Planı Oluştur
        </Button>
      </SectionCard>
    </>
  );
};

export const ContentEbookTocScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap İçindekiler" subtitle="İçindekiler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Bölümler">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap İçindekiler" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Bölüm bulunamadı"
          description="Henüz listelenecek bölüm yok."
          actionLabel="Kütüphaneye Dön"
          icon="book-open-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap İçindekiler" subtitle="Bir sorun oluştu">
        <StateMessage
          title="İçindekiler yüklenemedi"
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
      <ScreenLayout title="e-Kitap İçindekiler" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentEbookTocContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="e-Kitap İçindekiler" subtitle="İçindekiler listesi">
      <ContentEbookTocContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
