import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider, List, Switch } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAccessibilitySettings, getPrimaryUser, getReminderSettings } from "../../data/mockSelectors";
import { PButton, PText } from "../../components";

const ProfileSettingsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const accessibility = getAccessibilitySettings().find((item) => item.user_id === user?.id);
  const reminders = getReminderSettings().find((item) => item.user_id === user?.id);

  return (
    <>
      <SectionCard title="Genel Ayarlar" actionLabel="">
        <List.Item
          title="Dil"
          description={user?.language?.toUpperCase() ?? "TR"}
          left={(props) => <List.Icon {...props} icon="translate" />}
          onPress={() => navigation.navigate("ProfileLanguage")}
        />
        <Divider />
        <List.Item
          title="Hatırlatmalar"
          description={reminders?.enabled ? "Açık" : "Kapalı"}
          left={(props) => <List.Icon {...props} icon="bell-outline" />}
          onPress={() => navigation.navigate("ProfileReminders")}
        />
        <Divider />
        <List.Item
          title="Erişilebilirlik"
          description={accessibility?.text_size ?? "medium"}
          left={(props) => <List.Icon {...props} icon="human-handsup" />}
          onPress={() => navigation.navigate("ProfileAccessibility")}
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
            <PText variant="bodyMedium">Sesli Okuma</PText>
            <PText variant="bodySmall">Yeni bölümlerde otomatik başlat</PText>
          </View>
          <Switch value disabled={isOffline} />
        </View>
      </SectionCard>

      <SectionCard title="Bildirimler" actionLabel="">
        <View style={styles.switchRow}>
          <View>
            <PText variant="bodyMedium">Günlük Hatırlatmalar</PText>
            <PText variant="bodySmall">08:30'da gönder</PText>
          </View>
          <Switch value disabled={isOffline} />
        </View>
        <Divider />
        <View style={styles.switchRow}>
          <View>
            <PText variant="bodyMedium">Yeni İçerik</PText>
            <PText variant="bodySmall">Haftalık özet</PText>
          </View>
          <Switch value={false} disabled={isOffline} />
        </View>
        <PButton mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Bildirim Zamanını Düzenle
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileSettingsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
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
