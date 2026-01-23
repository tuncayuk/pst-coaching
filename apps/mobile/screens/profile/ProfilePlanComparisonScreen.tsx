import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Button, Card, Chip, Text } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";
import { getSubscriptionPlans } from "../../data/mockSelectors";

const ProfilePlanComparisonContent = ({ isOffline }: { isOffline?: boolean }) => {
  const plans = getSubscriptionPlans();

  return (
    <SectionCard title="Plan Karşılaştırma">
      {plans.map((plan) => (
        <Card key={plan.id} style={styles.card}>
          <Card.Title title={plan.name} subtitle={`Kişi limiti: ${plan.seat_limit}`} />
          <Card.Content>
            <Chip style={styles.chip} disabled={isOffline}>
              {plan.plan_type}
            </Chip>
            <Text variant="bodySmall" style={styles.subtleText}>
              Tüm içerik türlerine erişim ve çevrimdışı kullanım dahil.
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" disabled={isOffline}>
              Bu Planı Seç
            </Button>
          </Card.Actions>
        </Card>
      ))}
      <Button mode="contained" disabled={isOffline}>
        Devam Et
      </Button>
    </SectionCard>
  );
};

export const ProfilePlanComparisonScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Plan Karşılaştırma" subtitle="Planlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
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
