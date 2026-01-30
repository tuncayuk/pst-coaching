import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PText, PTextInput } from "../../components";

const ForgotPasswordContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [email, setEmail] = React.useState("");
  const [hasSent, setHasSent] = React.useState(false);
  const navigation = useNavigation<any>();
  const isValid = email.length > 3;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          disabled={isOffline}
        >
          <PText style={styles.backButtonText}>←</PText>
        </TouchableOpacity>

        <View style={styles.iconContainer}>
          <PText style={styles.icon}>🔑</PText>
        </View>
        <PText style={styles.title}>Şifremi Unuttum</PText>
        <PText style={styles.description}>
          E-posta adresinizi veya telefon numaranızı girin, size doğrulama kodu gönderelim.
        </PText>
        <View style={styles.inputGroup}>
          <PText style={styles.label}>E-posta veya Telefon</PText>
          <PTextInput
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (hasSent) setHasSent(false);
            }}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            editable={!isOffline}
            placeholder="ornek@email.com veya +90 5XX XXX XX XX"
          />
        </View>
        <PButton
          mode="contained"
          disabled={isOffline || !isValid}
          buttonColor="#00B4D8"
          textColor="#FFFFFF"
          onPress={() => {
            setHasSent(true);
            setTimeout(() => {
              navigation.navigate("AuthOtpVerify", { source: "forgot-password" });
            }, 300);
          }}
          style={styles.button}
          contentStyle={styles.primaryButtonContent}
          labelStyle={styles.primaryButtonLabel}
        >
          Kod Gönder
        </PButton>
        {hasSent ? (
          <PText style={styles.successText}>
            Doğrulama kodu gönderildi. Yönlendiriliyorsunuz...
          </PText>
        ) : null}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <PText style={styles.backLinkText}>← Giriş Sayfasına Dön</PText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
      <>
        <OfflineNotice />
        <ForgotPasswordContent isOffline />
      </>
    );
  }

  return <ForgotPasswordContent />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: "#171717",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    color: "#525252",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#404040",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  inputContent: {
    paddingVertical: 16,
  },
  inputOutline: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#E5E5E5",
  },
  button: {
    marginBottom: 16,
    borderRadius: 12,
  },
  primaryButtonContent: {
    height: 56,
    justifyContent: "center",
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  successText: {
    textAlign: "center",
    color: "#10B981",
    fontSize: 13,
    marginBottom: 12,
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
