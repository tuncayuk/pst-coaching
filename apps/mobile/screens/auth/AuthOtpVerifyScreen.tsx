import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Chip,
  Text,
  TextInput,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const OtpVerifyContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Doğrulama kodunu gir">
        <Text variant="bodyMedium" style={styles.helperText}>
          Telefonuna gönderilen 6 haneli kodu girerek devam edebilirsin.
        </Text>
        <TextInput
          label="Doğrulama Kodu"
          mode="outlined"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          editable={!isOffline}
        />
        <View style={styles.timerRow}>
          <Chip icon="clock-outline" disabled={isOffline}>
            Kalan süre: 00:52
          </Chip>
          <Button mode="text" disabled={isOffline}>
            Tekrar Gönder
          </Button>
        </View>
        <Button mode="contained" disabled={isOffline}>
          Kodu Doğrula
        </Button>
      </SectionCard>
      <SectionCard title="Kod gelmedi mi?">
        <Text variant="bodySmall" style={styles.bodyText}>
          Numaranı kontrol et veya SMS yerine e-posta ile doğrulama iste.
        </Text>
        <Button mode="outlined" disabled={isOffline}>
          E-posta ile Gönder
        </Button>
      </SectionCard>
    </>
  );
};

export const AuthOtpVerifyScreen = ({ route }: { route?: { params?: { state?: string } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="OTP Doğrulama" subtitle="Doğrulama hazırlanıyor">
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
      <ScreenLayout title="OTP Doğrulama" subtitle="Doğrulama kodu yok">
        <StateMessage
          title="Doğrulama kodu yok"
          description="Yeni bir kod isteyerek devam edebilirsin."
          actionLabel="Kod Gönder"
          icon="message-processing-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="OTP Doğrulama" subtitle="Bir sorun oluştu">
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
      <ScreenLayout title="OTP Doğrulama" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <OtpVerifyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="OTP Doğrulama" subtitle="Doğrulama kodunu gir">
      <OtpVerifyContent />
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
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  bodyText: {
    marginBottom: 12,
    lineHeight: 20,
  },
});
