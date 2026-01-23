import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, Switch, Text } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";
import { getPrimaryUser, getReminderSettings } from "../../data/mockSelectors";

const ProfileRemindersContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const reminder = getReminderSettings().find((item) => item.user_id === user?.id);

  return (
    <>
      <SectionCard title="Günlük Hatırlatıcı">
        <Card style={styles.card}>
          <Card.Content style={styles.row}>
            <View style={styles.rowText}>
              <Text variant="bodyMedium">Hatırlatıcıyı Aç</Text>
              <Text variant="bodySmall" style={styles.subtleText}>
                Varsayılan saat: {reminder?.time_local ?? "20:00"}
              </Text>
            </View>
            <Switch value={reminder?.enabled ?? false} disabled={isOffline} />
          </Card.Content>
        </Card>
        <Button mode="outlined" disabled={isOffline}>
          Saat Seç
        </Button>
      </SectionCard>

      <SectionCard title="Bildirim Politikası">
        <Text variant="bodySmall" style={styles.subtleText}>
          Bildirim izni alınmadan önce açıklama gösterilir. Yorum gönderildiğinde tekrar
          hatırlatma yapılmaz.
        </Text>
      </SectionCard>
    </>
  );
};

export const ProfileRemindersScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Hatırlatmalar" subtitle="Ayarlar hazırlanıyor">
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
      <ScreenLayout title="Hatırlatmalar" subtitle="Ayar bulunamadı">
        <StateMessage
          title="Hatırlatıcı bulunamadı"
          description="Henüz bir hatırlatıcı ayarın yok."
          actionLabel="Hatırlatıcı Kur"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Hatırlatmalar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Hatırlatıcı yüklenemedi"
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
      <ScreenLayout title="Hatırlatmalar" subtitle="Önbellekteki ayarlar">
        <OfflineNotice />
        <ProfileRemindersContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hatırlatmalar" subtitle="Günlük hatırlatıcı">
      <ProfileRemindersContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowText: {
    flex: 1,
    marginRight: 12,
  },
  subtleText: {
    opacity: 0.7,
  },
});
