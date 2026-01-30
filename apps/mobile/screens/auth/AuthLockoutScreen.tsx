import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PText } from "../../components";


const AuthLockoutContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <SectionCard title="Geçici Kilit">
        <PText variant="titleMedium" style={styles.title}>
          Güvenlik nedeniyle hesabın geçici olarak kilitlendi.
        </PText>
        <PText variant="bodySmall" style={styles.body}>
          Kalan süre: 10 dakika. Bu süre sonunda tekrar giriş yapabilirsin.
        </PText>
        <PButton mode="contained" disabled={isOffline} onPress={() => navigation.navigate("AuthLogin")}>
          Giriş Sayfasına Dön
        </PButton>
        <PButton mode="text" disabled={isOffline} onPress={() => navigation.navigate("AuthPasswordReset")}>
          Şifre Sıfırla
        </PButton>
      </SectionCard>
    </>
  );
};

export const AuthLockoutScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Geçici Kilit" subtitle="Kilit bilgisi hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Geçici Kilit" subtitle="Kilit bilgisi bulunamadı">
        <StateMessage
          title="Kilit bilgisi yok"
          description="Hesap kilidi görünmüyor. Giriş ekranına dönebilirsin."
          actionLabel="Girişe Dön"
          icon="lock-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Geçici Kilit" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Kilit bilgisi alınamadı"
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
      <ScreenLayout title="Geçici Kilit" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <AuthLockoutContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Geçici Kilit" subtitle="Güvenlik bilgilendirmesi">
      <AuthLockoutContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
  },
  body: {
    marginBottom: 12,
  },
});
