import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Button, TextInput, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const AuthReauthContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <SectionCard title="Yeniden Doğrulama">
        <Text variant="bodySmall" style={styles.body}>
          Güvenliğin için bu işlemi tamamlamadan önce tekrar doğrulama istiyoruz.
        </Text>
        <TextInput
          label="E-posta veya telefon"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          editable={!isOffline}
        />
        <TextInput
          label="Şifre"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          editable={!isOffline}
        />
        <Button mode="contained" disabled={isOffline} onPress={() => navigation.getParent()?.navigate("MainTabs")}>
          Doğrula ve Devam Et
        </Button>
        <Button mode="text" disabled={isOffline} onPress={() => navigation.navigate("AuthPasswordReset")}>
          Şifremi Unuttum
        </Button>
      </SectionCard>
    </>
  );
};

export const AuthReauthScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Doğrulama hazırlanıyor">
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
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Doğrulama bilgisi yok">
        <StateMessage
          title="Doğrulama bilgisi yok"
          description="Tekrar giriş yapmayı deneyebilirsin."
          actionLabel="Girişe Dön"
          icon="account-circle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Doğrulama yüklenemedi"
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
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <AuthReauthContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yeniden Doğrulama" subtitle="Devam etmek için doğrula">
      <AuthReauthContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    marginBottom: 12,
  },
  input: {
    marginBottom: 12,
  },
});
