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

const addons = [
  {
    name: "Odak Paket",
    description: "4 ek meditasyon",
    status: "Aktif",
  },
  {
    name: "Uyku Paketi",
    description: "Uyku rutinleri",
    status: "Deneme",
  },
  {
    name: "Aile Arşivi",
    description: "Ek 10 içerik",
    status: "Pasif",
  },
];

const ProfileAddonsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Add-on Paketleri" actionLabel="">
        {addons.map((addon) => (
          <Card key={addon.name} style={styles.card}>
            <Card.Title title={addon.name} subtitle={addon.description} />
            <Card.Content>
              <Chip compact>{addon.status}</Chip>
            </Card.Content>
            <Card.Actions>
              <Button mode="contained" disabled={isOffline}>
                {addon.status === "Pasif" ? "Satın Al" : "Yönet"}
              </Button>
              <Button mode="text" disabled={isOffline}>
                Detay
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>

      <SectionCard title="Paket Avantajları" actionLabel="">
        <Text variant="bodySmall">• Özel içerik paketlerine eriş</Text>
        <Text variant="bodySmall">• Takım üyeleri için ekstra içerik</Text>
        <Text variant="bodySmall">• Aylık bildirim raporları</Text>
        <Button mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Yeni Paketleri İncele
        </Button>
      </SectionCard>
    </>
  );
};

export const ProfileAddonsScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Add-on Yönetimi" subtitle="Add-on'lar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
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
