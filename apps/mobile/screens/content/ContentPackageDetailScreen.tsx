import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Divider, List } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const packageItems = [
  { title: "Öz Şefkat Yolculuğu", subtitle: "7 gün" },
  { title: "Stres Yönetimi Modülü", subtitle: "5 bölüm" },
  { title: "Nefes Atölyesi", subtitle: "Canlı · 60 dk" },
  { title: "Duygu Günlüğü e-Kitap", subtitle: "120 sayfa" },
];

const packageBenefits = [
  "Tüm içeriklerde sınırsız erişim",
  "Yeni eklenen içeriklere öncelik",
  "Sertifika ve rozetler",
];

const ContentPackageDetailContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Paket İçeriği" actionLabel="Tümü">
        {packageItems.map((item, index) => (
          <React.Fragment key={item.title}>
            <List.Item title={item.title} description={item.subtitle} />
            {index < packageItems.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </SectionCard>

      <SectionCard title="Plan ve Fiyat">
        <PCard style={styles.card}>
          <PCard.Title title="12 Aylık Paket" subtitle="Aylık 119 ₺" />
          <PCard.Content>
            {packageBenefits.map((benefit) => (
              <PText key={benefit} variant="bodySmall" style={styles.bullet}>
                • {benefit}
              </PText>
            ))}
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="contained" disabled={isOffline}>
              Paketi Başlat
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      <SectionCard title="Bilgilendirme">
        <PText variant="bodySmall">
          Pakete dahil tüm içerikler tek planla aktif olur ve ilerleme cihazlar arasında
          senkronize edilir.
        </PText>
        <PButton mode="outlined" style={styles.secondaryButton} disabled={isOffline}>
          Destek ile İletişim
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentPackageDetailScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Paket Detay" subtitle="Paket yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Paket İçeriği">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Paket Detay" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Paket bulunamadı"
          description="Bu paket şu anda erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="package-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Paket Detay" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Paket yüklenemedi"
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
      <ScreenLayout title="Paket Detay" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentPackageDetailContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Paket Detay" subtitle="Paket içeriği ve plan">
      <ContentPackageDetailContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 4,
  },
  bullet: {
    marginBottom: 6,
  },
  secondaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
