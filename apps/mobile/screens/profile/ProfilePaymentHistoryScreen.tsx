import React from "react";
import { StyleSheet } from "react-native";
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

const transactions = [
  { date: "12 Ocak 2025", amount: "₺899,00", status: "Başarılı" },
  { date: "12 Ocak 2024", amount: "₺699,00", status: "Başarılı" },
  { date: "12 Ocak 2023", amount: "₺599,00", status: "Başarılı" },
];

const ProfilePaymentHistoryContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Ödemeler" actionLabel="">
        {transactions.map((transaction) => (
          <Card key={transaction.date} style={styles.card}>
            <Card.Content style={styles.cardRow}>
              <Text variant="bodyMedium">{transaction.date}</Text>
              <Text variant="bodyMedium">{transaction.amount}</Text>
              <Chip compact>{transaction.status}</Chip>
            </Card.Content>
            <Card.Actions>
              <Button mode="text" disabled={isOffline}>
                Makbuz
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>

      <SectionCard title="Fatura" actionLabel="">
        <Text variant="bodySmall">Fatura bilgileri kişisel olarak kayıtlı.</Text>
        <Button mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Fatura Bilgilerini Güncelle
        </Button>
      </SectionCard>
    </>
  );
};

export const ProfilePaymentHistoryScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Ödeme Geçmişi" subtitle="Ödeme geçmişi hazırlanıyor">
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
      <ScreenLayout title="Ödeme Geçmişi" subtitle="İşlem bilgileri">
        <StateMessage
          title="Ödeme geçmişi yok"
          description="Henüz kayıtlı bir ödeme bulunmuyor."
          actionLabel="Planları Gör"
          icon="credit-card-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Ödeme Geçmişi" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Ödemeler yüklenemedi"
          description="Ödeme geçmişini getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Ödeme Geçmişi" subtitle="Önbellekteki ödemeler">
        <OfflineNotice />
        <ProfilePaymentHistoryContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ödeme Geçmişi" subtitle="İşlemlerini incele">
      <ProfilePaymentHistoryContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
