import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const ProfileRestorePurchasesContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Satın Alımları Geri Yükle" actionLabel="">
        <PText variant="bodySmall">
          Daha önce satın aldığın planları geri yükleyebiliriz. Bu işlem mağaza
          doğrulaması gerektirir.
        </PText>
        <PButton mode="contained" style={styles.actionButton} disabled={isOffline}>
          Satın Alımları Geri Yükle
        </PButton>
        <PButton mode="outlined" disabled={isOffline}>
          Destekle İletişime Geç
        </PButton>
      </SectionCard>

      <SectionCard title="Son İşlemler" actionLabel="">
        <PCard style={styles.card}>
          <PCard.Title title="12 Ocak 2025" subtitle="Premium Yıllık Plan" />
          <PCard.Content>
            <PText variant="bodySmall">Doğrulandı</PText>
          </PCard.Content>
        </PCard>
        <PCard style={styles.card}>
          <PCard.Title title="12 Ocak 2024" subtitle="Premium Yıllık Plan" />
          <PCard.Content>
            <PText variant="bodySmall">Doğrulandı</PText>
          </PCard.Content>
        </PCard>
      </SectionCard>
    </>
  );
};

export const ProfileRestorePurchasesScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Satın Alımları Geri Yükle" subtitle="Geri yükleme hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Geçmiş">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Satın Alımları Geri Yükle" subtitle="İşlemler">
        <StateMessage
          title="Geri yüklenecek satın alım yok"
          description="Mağazadan satın alma bulunamadı."
          actionLabel="Planları Gör"
          icon="refresh"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Satın Alımları Geri Yükle" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Geri yükleme başarısız"
          description="Satın alımlar doğrulanamadı. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Satın Alımları Geri Yükle" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileRestorePurchasesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Satın Alımları Geri Yükle" subtitle="Satın alımlarını doğrula">
      <ProfileRestorePurchasesContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    marginTop: 12,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
});
