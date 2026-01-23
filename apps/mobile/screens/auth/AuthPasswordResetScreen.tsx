import React from "react";
import { StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const PasswordResetContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Şifre sıfırlama bağlantısı gönder">
        <Text variant="bodyMedium" style={styles.helperText}>
          E-posta adresini gir, şifre sıfırlama bağlantısını gönderelim.
        </Text>
        <TextInput
          label="E-posta"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          editable={!isOffline}
        />
        <Button mode="contained" disabled={isOffline}>
          Bağlantı Gönder
        </Button>
      </SectionCard>
      <SectionCard title="Başka bir yöntem">
        <Text variant="bodySmall" style={styles.bodyText}>
          E-posta erişimin yoksa SMS ile doğrulama isteyebilirsin.
        </Text>
        <Button mode="outlined" disabled={isOffline}>
          SMS ile Gönder
        </Button>
      </SectionCard>
    </>
  );
};

export const AuthPasswordResetScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Şifre Sıfırlama" subtitle="Sıfırlama hazırlanıyor">
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
      <ScreenLayout title="Şifre Sıfırlama" subtitle="Sıfırlama bilgisi yok">
        <StateMessage
          title="Sıfırlama bilgisi yok"
          description="Yeni bir sıfırlama isteği oluşturabilirsin."
          actionLabel="Bağlantı Gönder"
          icon="lock-reset"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Şifre Sıfırlama" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Şifre sıfırlama yüklenemedi"
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
      <ScreenLayout title="Şifre Sıfırlama" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <PasswordResetContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Şifre Sıfırlama" subtitle="Şifre sıfırlama bağlantısı gönder">
      <PasswordResetContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  helperText: {
    marginBottom: 12,
    lineHeight: 20,
  },
  input: {
    marginBottom: 12,
  },
  bodyText: {
    marginBottom: 12,
    lineHeight: 20,
  },
});
