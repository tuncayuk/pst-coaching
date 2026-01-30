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
  getAddOns,
  getAddOnsForSubscription,
  getPrimaryUser,
  getSubscriptionForUser,
} from "../../data/mockSelectors";


const ProfileAddonsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const activeAddons = getAddOnsForSubscription(subscription?.id);
  const addons = getAddOns().map((addon) => ({
    id: addon.id,
    name: addon.name,
    description: addon.code,
    status: activeAddons.some((item) => item.id === addon.id) ? "Aktif" : "Pasif",
  }));

  return (
    <>
      <SectionCard title="Add-on Paketleri" actionLabel="">
        {addons.map((addon) => (
          <PCard key={addon.id} style={styles.card}>
            <PCard.Title title={addon.name} subtitle={addon.description} />
            <PCard.Content>
              <PChip compact>{addon.status}</PChip>
            </PCard.Content>
            <PCard.Actions>
              <PButton mode="contained" disabled={isOffline}>
                {addon.status === "Pasif" ? "Satın Al" : "Yönet"}
              </PButton>
              <PButton mode="text" disabled={isOffline}>
                Detay
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Paket Avantajları" actionLabel="">
        <PText variant="bodySmall">• Özel içerik paketlerine eriş</PText>
        <PText variant="bodySmall">• Takım üyeleri için ekstra içerik</PText>
        <PText variant="bodySmall">• Aylık bildirim raporları</PText>
        <PButton mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Yeni Paketleri İncele
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileAddonsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Add-on Yönetimi" subtitle="Add-on'lar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Paketler">
          <SkeletonBlock height={96} />
          <SkeletonBlock height={96} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Add-on Yönetimi" subtitle="Paketler">
        <StateMessage
          title="Add-on bulunamadı"
          description="Şu anda aktif add-on paketin yok."
          actionLabel="Paketleri Gör"
          icon="puzzle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Add-on Yönetimi" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Add-on'lar yüklenemedi"
          description="Paketleri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Add-on Yönetimi" subtitle="Önbellekteki paketler">
        <OfflineNotice />
        <ProfileAddonsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Add-on Yönetimi" subtitle="Eklentilerini yönet">
      <ProfileAddonsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  actionButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
