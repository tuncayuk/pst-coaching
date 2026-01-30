import React from "react";
import { StyleSheet } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getSubscriptionPlans } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";


const ProfilePlanComparisonContent = ({ isOffline }: { isOffline?: boolean }) => {
  const plans = getSubscriptionPlans();

  return (
    <SectionCard title="Plan Karşılaştırma">
      {plans.map((plan) => (
        <PCard key={plan.id} style={styles.card}>
          <PCard.Title title={plan.name} subtitle={`Kişi limiti: ${plan.seat_limit}`} />
          <PCard.Content>
            <PChip style={styles.chip} disabled={isOffline}>
              {plan.plan_type}
            </PChip>
            <PText variant="bodySmall" style={styles.subtleText}>
              Tüm içerik türlerine erişim ve çevrimdışı kullanım dahil.
            </PText>
          </PCard.Content>
          <PCard.Actions>
            <PButton mode="outlined" disabled={isOffline}>
              Bu Planı Seç
            </PButton>
          </PCard.Actions>
        </PCard>
      ))}
      <PButton mode="contained" disabled={isOffline}>
        Devam Et
      </PButton>
    </SectionCard>
  );
};

export const ProfilePlanComparisonScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Plan Karşılaştırma" subtitle="Planlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Plan Karşılaştırma" subtitle="Plan bulunamadı">
        <StateMessage
          title="Plan bulunamadı"
          description="Plan listesi şu anda erişilebilir değil."
          actionLabel="Tekrar Dene"
          icon="clipboard-list-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Plan Karşılaştırma" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Planlar yüklenemedi"
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
      <ScreenLayout title="Plan Karşılaştırma" subtitle="Önbellekteki planlar">
        <OfflineNotice />
        <ProfilePlanComparisonContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Plan Karşılaştırma" subtitle="Planları karşılaştır">
      <ProfilePlanComparisonContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  chip: {
    marginTop: 4,
    alignSelf: "flex-start",
  },
  subtleText: {
    marginTop: 8,
    opacity: 0.7,
  },
});
