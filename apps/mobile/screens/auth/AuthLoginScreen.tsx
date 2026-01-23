import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Text,
  TextInput,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const LoginContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [rememberMe, setRememberMe] = React.useState(true);

  return (
    <>
      <SectionCard title="Hesabına giriş yap">
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
        <Checkbox.Item
          label="Beni hatırla"
          status={rememberMe ? "checked" : "unchecked"}
          onPress={() => setRememberMe((prev) => !prev)}
          disabled={isOffline}
          position="leading"
          style={styles.checkbox}
        />
        <Button mode="contained" disabled={isOffline}>
          Giriş Yap
        </Button>
        <Button mode="text" style={styles.linkButton} disabled={isOffline}>
          Şifremi Unuttum
        </Button>
      </SectionCard>
      <SectionCard title="Yeni misin?">
        <Text variant="bodySmall" style={styles.helperText}>
          Kayıt olarak kişisel gelişim yolculuğunu başlatabilirsin.
        </Text>
        <Button mode="outlined" disabled={isOffline}>
          Kayıt Ol
        </Button>
      </SectionCard>
    </>
  );
};

export const AuthLoginScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Giriş" subtitle="Giriş formu hazırlanıyor">
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
      <ScreenLayout title="Giriş" subtitle="Giriş bilgisi bulunamadı">
        <StateMessage
          title="Giriş bilgisi bulunamadı"
          description="Oturumunu başlatmak için yeniden dene."
          actionLabel="Tekrar Dene"
          icon="account-circle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Giriş" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Giriş yüklenemedi"
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
      <ScreenLayout title="Giriş" subtitle="Önbellekteki giriş bilgileri">
        <OfflineNotice />
        <LoginContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Giriş" subtitle="Hesabına giriş yap">
      <LoginContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  checkbox: {
    paddingHorizontal: 0,
    marginBottom: 8,
  },
  helperText: {
    marginBottom: 12,
    lineHeight: 20,
  },
  linkButton: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
});
