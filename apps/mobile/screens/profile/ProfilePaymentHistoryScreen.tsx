import React from "react";
import { StyleSheet } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";
import {
  getPaymentTransactions,
  getPrimaryUser,
  getSubscriptionForUser,
} from "../../data/mockSelectors";


const ProfilePaymentHistoryContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const transactions = getPaymentTransactions().filter(
    (item) => item.subscription_id === subscription?.id
  );

  return (
    <>
      <SectionCard title="Ödemeler" actionLabel="">
        {transactions.map((transaction) => (
          <PCard key={transaction.id} style={styles.card}>
            <PCard.Content style={styles.cardRow}>
              <PText variant="bodyMedium">{transaction.purchased_at.slice(0, 10)}</PText>
              <PText variant="bodyMedium">
                {transaction.amount} {transaction.currency}
              </PText>
              <PChip compact>Başarılı</PChip>
            </PCard.Content>
            <PCard.Actions>
              <PButton mode="text" disabled={isOffline}>
                Makbuz
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Fatura" actionLabel="">
        <PText variant="bodySmall">Fatura bilgileri kişisel olarak kayıtlı.</PText>
        <PButton mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Fatura Bilgilerini Güncelle
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfilePaymentHistoryScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Ödeme Geçmişi" subtitle="Ödeme geçmişi hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
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
