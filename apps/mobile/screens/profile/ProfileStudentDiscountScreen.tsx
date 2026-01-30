import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PCard, PText } from "../../components";

const steps = [
  "Okul e-postanı doğrula",
  "Öğrenci belgesi yükle",
  "Sonucu bekle",
];

const ProfileStudentDiscountContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Doğrulama Durumu" actionLabel="">
        <PCard style={styles.card}>
          <PCard.Content style={styles.cardRow}>
            <View>
              <PText variant="bodyMedium">Öğrenci indirimi</PText>
              <PText variant="bodySmall">Durum: İncelemede</PText>
            </View>
            <Chip compact>İşleniyor</Chip>
          </PCard.Content>
        </PCard>
        <PButton mode="contained" disabled={isOffline}>
          Doğrulamayı Başlat
        </PButton>
        <PButton mode="text" style={styles.secondaryButton} disabled={isOffline}>
          Durumu Kontrol Et
        </PButton>
      </SectionCard>

      <SectionCard title="Nasıl Çalışır?" actionLabel="">
        {steps.map((step) => (
          <PText key={step} variant="bodySmall" style={styles.stepText}>
            • {step}
          </PText>
        ))}
      </SectionCard>
    </>
  );
};

export const ProfileStudentDiscountScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Öğrenci İndirimi" subtitle="Doğrulama hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Adımlar">
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Öğrenci İndirimi" subtitle="Doğrulama">
        <StateMessage
          title="Doğrulama verisi yok"
          description="Henüz doğrulama başlatılmadı. Başlamak için bilgilerini paylaş."
          actionLabel="Doğrulamayı Başlat"
          icon="school-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Öğrenci İndirimi" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Öğrenci indirimi yüklenemedi"
          description="Doğrulama bilgilerini getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Öğrenci İndirimi" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileStudentDiscountContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Öğrenci İndirimi" subtitle="Öğrenci indirimini doğrula">
      <ProfileStudentDiscountContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  secondaryButton: {
    marginTop: 4,
  },
  stepText: {
    marginBottom: 6,
  },
});
