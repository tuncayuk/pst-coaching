import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const ForgotPasswordContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [email, setEmail] = React.useState("");
  const navigation = useNavigation<any>();

  return (
    <>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔑</Text>
      </View>
      <SectionCard title="">
        <Text variant="headlineMedium" style={styles.title}>
          Şifremi Unuttum
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          E-posta adresinizi veya telefon numaranızı girin, size doğrulama kodu gönderelim.
        </Text>
        <TextInput
          label="E-posta veya Telefon"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          editable={!isOffline}
          placeholder="ornek@email.com veya +90 5XX XXX XX XX"
        />
        <Button
          mode="contained"
          disabled={isOffline || !email}
          onPress={() => navigation.navigate("AuthOtpVerify", { source: "forgot-password" })}
          style={styles.button}
        >
          Kod Gönder
        </Button>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backLink}
        >
          <Text style={styles.backLinkText}>← Giriş Sayfasına Dön</Text>
        </TouchableOpacity>
      </SectionCard>
    </>
  );
};

export const AuthForgotPasswordScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Şifremi Unuttum" subtitle="Yükleniyor">
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
      <ScreenLayout title="Şifremi Unuttum" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="lock-reset"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Şifremi Unuttum" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yüklenemedi"
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
      <ScreenLayout title="Şifremi Unuttum" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ForgotPasswordContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Şifremi Unuttum" subtitle="Şifre sıfırlama">
      <ForgotPasswordContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    color: "#525252",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  backLink: {
    alignItems: "center",
    marginTop: 8,
  },
  backLinkText: {
    color: "#00B4D8",
    fontWeight: "600",
    fontSize: 15,
  },
});
