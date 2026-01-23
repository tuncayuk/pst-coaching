import React from "react";
import { StyleSheet } from "react-native";
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

const RegisterContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [accepted, setAccepted] = React.useState(false);

  return (
    <>
      <SectionCard title="Yeni hesap oluştur">
        <TextInput
          label="Ad Soyad"
          mode="outlined"
          style={styles.input}
          editable={!isOffline}
        />
        <TextInput
          label="E-posta"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          editable={!isOffline}
        />
        <TextInput
          label="Telefon"
          mode="outlined"
          keyboardType="phone-pad"
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
          label="Kullanım koşullarını ve gizlilik politikasını kabul ediyorum"
          status={accepted ? "checked" : "unchecked"}
          onPress={() => setAccepted((prev) => !prev)}
          disabled={isOffline}
          position="leading"
          style={styles.checkbox}
        />
        <Button mode="contained" disabled={isOffline || !accepted}>
          Hesap Oluştur
        </Button>
      </SectionCard>
      <SectionCard title="Zaten hesabın var mı?">
        <Text variant="bodySmall" style={styles.helperText}>
          Giriş yaparak içeriklerine erişebilirsin.
        </Text>
        <Button mode="outlined" disabled={isOffline}>
          Giriş Yap
        </Button>
      </SectionCard>
    </>
  );
};

export const AuthRegisterScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Kayıt Ol" subtitle="Kayıt formu hazırlanıyor">
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
      <ScreenLayout title="Kayıt Ol" subtitle="Kayıt seçenekleri bulunamadı">
        <StateMessage
          title="Kayıt seçenekleri bulunamadı"
          description="Yeni hesap oluşturmak için tekrar dene."
          actionLabel="Tekrar Dene"
          icon="account-plus-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Kayıt Ol" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Kayıt yüklenemedi"
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
      <ScreenLayout title="Kayıt Ol" subtitle="Önbellekteki kayıt bilgileri">
        <OfflineNotice />
        <RegisterContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kayıt Ol" subtitle="Yeni hesap oluştur">
      <RegisterContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  checkbox: {
    paddingHorizontal: 0,
    marginBottom: 12,
  },
  helperText: {
    marginBottom: 12,
    lineHeight: 20,
  },
});
