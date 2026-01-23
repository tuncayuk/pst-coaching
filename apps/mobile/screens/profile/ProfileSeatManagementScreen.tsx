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

const seats = [
  { name: "Elif Aksoy", role: "Plan sahibi", status: "Aktif" },
  { name: "Deniz A.", role: "Üye", status: "Aktif" },
  { name: "Davet Bekliyor", role: "Üye", status: "Beklemede" },
];

const ProfileSeatManagementContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Kişiler" actionLabel="">
        {seats.map((seat) => (
          <Card key={seat.name} style={styles.card}>
            <Card.Content style={styles.cardRow}>
              <View>
                <Text variant="bodyMedium">{seat.name}</Text>
                <Text variant="bodySmall">{seat.role}</Text>
              </View>
              <Chip compact>{seat.status}</Chip>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined" disabled={isOffline}>
                Detay
              </Button>
            </Card.Actions>
          </Card>
        ))}
        <Button mode="contained" disabled={isOffline}>
          Davet Gönder
        </Button>
      </SectionCard>

      <SectionCard title="Koltuk Kullanımı" actionLabel="">
        <View style={styles.row}>
          <Text variant="bodyMedium">Kullanılan</Text>
          <Text variant="bodyMedium">2 / 4</Text>
        </View>
        <View style={styles.row}>
          <Text variant="bodyMedium">Bekleyen Davet</Text>
          <Text variant="bodyMedium">1</Text>
        </View>
      </SectionCard>
    </>
  );
};

export const ProfileSeatManagementScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Kişi Yönetimi" subtitle="Kişiler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Koltuklar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Kişi Yönetimi" subtitle="Koltuklarını yönet">
        <StateMessage
          title="Kişi bulunamadı"
          description="Henüz ekli kişi yok. İlk davetini gönderebilirsin."
          actionLabel="Davet Gönder"
          icon="account-multiple-plus"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Kişi Yönetimi" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Kişiler yüklenemedi"
          description="Koltuk bilgilerini getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Kişi Yönetimi" subtitle="Önbellekteki kişiler">
        <OfflineNotice />
        <ProfileSeatManagementContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kişi Yönetimi" subtitle="Ekibini yönet">
      <ProfileSeatManagementContent />
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});
