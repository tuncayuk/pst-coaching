import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Switch,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const ProfileSettingsContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Genel Ayarlar" actionLabel="">
        <List.Item
          title="Dil"
          description="Türkçe"
          left={(props) => <List.Icon {...props} icon="translate" />}
        />
        <Divider />
        <List.Item
          title="Hatırlatmalar"
          description="Haftada 3 gün"
          left={(props) => <List.Icon {...props} icon="bell-outline" />}
        />
        <Divider />
        <List.Item
          title="Erişilebilirlik"
          description="Dinamik yazı tipi"
          left={(props) => <List.Icon {...props} icon="human-handsup" />}
        />
      </SectionCard>

      <SectionCard title="Okuma Deneyimi" actionLabel="">
        <List.Item
          title="Okuma Modu"
          description="Gündüz"
          left={(props) => <List.Icon {...props} icon="book-open-page-variant" />}
        />
        <Divider />
        <View style={styles.switchRow}>
          <View>
            <Text variant="bodyMedium">Sesli Okuma</Text>
            <Text variant="bodySmall">Yeni bölümlerde otomatik başlat</Text>
          </View>
          <Switch value disabled={isOffline} />
        </View>
      </SectionCard>

      <SectionCard title="Bildirimler" actionLabel="">
        <View style={styles.switchRow}>
          <View>
            <Text variant="bodyMedium">Günlük Hatırlatmalar</Text>
            <Text variant="bodySmall">08:30'da gönder</Text>
          </View>
          <Switch value disabled={isOffline} />
        </View>
        <Divider />
        <View style={styles.switchRow}>
          <View>
            <Text variant="bodyMedium">Yeni İçerik</Text>
            <Text variant="bodySmall">Haftalık özet</Text>
          </View>
          <Switch value={false} disabled={isOffline} />
        </View>
        <Button mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Bildirim Zamanını Düzenle
        </Button>
      </SectionCard>
    </>
  );
};

export const ProfileSettingsScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Ayarlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Tercihler">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Tercihlerin">
        <StateMessage
          title="Ayar bulunamadı"
          description="Henüz ayar yapılandırması yok. Varsayılanları kullanıyoruz."
          actionLabel="Ayarları Oluştur"
          icon="tune-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Ayarlar yüklenemedi"
          description="Ayarları getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Önbellekteki ayarlar">
        <OfflineNotice />
        <ProfileSettingsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ayarlar" subtitle="Tercihlerini düzenle">
      <ProfileSettingsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  actionButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
