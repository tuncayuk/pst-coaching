import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const ProfileLogoutConfirmContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Çıkış Yap" actionLabel="">
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Çıkış yapmak üzeresin</Text>
            <Text variant="bodySmall">
              Hesabından çıkış yaptığında içerik indirmeleri durdurulur ve tekrar giriş
              yapman gerekir.
            </Text>
          </Card.Content>
        </Card>
        <View style={styles.buttonRow}>
          <Button mode="contained" style={styles.primaryButton} disabled={isOffline}>
            Çıkış Yap
          </Button>
          <Button mode="outlined" disabled={isOffline}>
            Vazgeç
          </Button>
        </View>
      </SectionCard>
    </>
  );
};

export const ProfileLogoutConfirmScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Çıkış Yap" subtitle="Çıkış hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Çıkış Yap" subtitle="Çıkış işlemi">
        <StateMessage
          title="Çıkış bilgisi yok"
          description="Çıkış işlemi başlatılamadı."
          actionLabel="Geri Dön"
          icon="logout"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Çıkış Yap" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Çıkış yapılamadı"
          description="Çıkış işlemini tamamlayamadık. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Çıkış Yap" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileLogoutConfirmContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Çıkış Yap" subtitle="Hesabından çıkış yap">
      <ProfileLogoutConfirmContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    marginRight: 12,
  },
});
