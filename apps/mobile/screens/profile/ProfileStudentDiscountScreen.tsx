import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const steps = [
  "Okul e-postanı doğrula",
  "Öğrenci belgesi yükle",
  "Sonucu bekle",
];

const ProfileStudentDiscountContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Doğrulama Durumu" actionLabel="">
        <Card style={styles.card}>
          <Card.Content style={styles.cardRow}>
            <View>
              <Text variant="bodyMedium">Öğrenci indirimi</Text>
              <Text variant="bodySmall">Durum: İncelemede</Text>
            </View>
            <Chip compact>İşleniyor</Chip>
          </Card.Content>
        </Card>
        <Button mode="contained" disabled={isOffline}>
          Doğrulamayı Başlat
        </Button>
        <Button mode="text" style={styles.secondaryButton} disabled={isOffline}>
          Durumu Kontrol Et
        </Button>
      </SectionCard>

      <SectionCard title="Nasıl Çalışır?" actionLabel="">
        {steps.map((step) => (
          <Text key={step} variant="bodySmall" style={styles.stepText}>
            • {step}
          </Text>
        ))}
      </SectionCard>
    </>
  );
};

export const ProfileStudentDiscountScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
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
