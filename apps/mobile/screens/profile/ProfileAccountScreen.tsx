import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Divider,
  List,
  Text,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";
import { getPrimaryUser } from "../../data/mockSelectors";

const ProfileAccountContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();

  return (
    <>
      <SectionCard title="Profil Bilgileri" actionLabel="Düzenle">
        <View style={styles.profileHeader}>
          <Avatar.Text size={64} label={(user?.email ?? "EA").slice(0, 2).toUpperCase()} />
          <View style={styles.profileInfo}>
            <Text variant="titleMedium">{user?.email ?? "Kullanıcı"}</Text>
            <Text variant="bodySmall">{user?.email ?? "demo@pstcoaching.app"}</Text>
            <Text variant="bodySmall">{user?.phone ?? "+90 555 123 45 67"}</Text>
          </View>
        </View>
        <Button mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Hesap Bilgilerini Güncelle
        </Button>
      </SectionCard>

      <SectionCard title="Güvenlik" actionLabel="">
        <List.Item
          title="Şifre Değiştir"
          description="Son güncelleme 2 ay önce"
          left={(props) => <List.Icon {...props} icon="lock-outline" />}
          onPress={() => navigation.navigate("ProfileChangePassword")}
        />
        <Divider />
        <List.Item
          title="Giriş Yapılan Cihazlar"
          description="2 aktif oturum"
          left={(props) => <List.Icon {...props} icon="cellphone" />}
        />
        <Button mode="contained-tonal" style={styles.actionButton} disabled={isOffline}>
          Güvenlik Ayarları
        </Button>
      </SectionCard>

      <SectionCard title="Hesap" actionLabel="">
        <List.Item
          title="Verilerimi İndir"
          description="CSV ve PDF"
          left={(props) => <List.Icon {...props} icon="download" />}
        />
        <Divider />
        <List.Item
          title="Çıkış Yap"
          description="Hesabından güvenli çıkış"
          left={(props) => <List.Icon {...props} icon="logout" />}
          onPress={() => navigation.navigate("ProfileLogoutConfirm")}
        />
      </SectionCard>
    </>
  );
};

export const ProfileAccountScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Hesap" subtitle="Hesap hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Bilgiler">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Hesap" subtitle="Bilgilerini tamamla">
        <StateMessage
          title="Hesap bilgileri yok"
          description="Hesabını kullanmak için temel bilgileri ekle."
          actionLabel="Bilgi Ekle"
          icon="account-plus-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Hesap" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Hesap yüklenemedi"
          description="Bilgileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Hesap" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileAccountContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hesap" subtitle="Hesabını düzenle">
      <ProfileAccountContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  actionButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
});
