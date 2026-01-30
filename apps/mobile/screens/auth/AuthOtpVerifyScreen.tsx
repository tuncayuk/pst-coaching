import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Chip,
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

const OtpVerifyContent = ({ 
  isOffline,
  source,
}: { 
  isOffline?: boolean;
  source?: "register" | "forgot-password";
}) => {
  const navigation = useNavigation<any>();
  const [codes, setCodes] = React.useState(["", "", "", "", "", ""]);
  const inputRefs = React.useRef<(any)[]>([]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCodes = value.slice(0, 6).split("");
      const newCodes = [...codes];
      pastedCodes.forEach((code, i) => {
        if (index + i < 6) {
          newCodes[index + i] = code;
        }
      });
      setCodes(newCodes);
      // Focus last filled input
      const lastFilledIndex = Math.min(index + pastedCodes.length - 1, 5);
      if (lastFilledIndex < 5 && inputRefs.current[lastFilledIndex + 1]) {
        inputRefs.current[lastFilledIndex + 1].focus();
      }
    } else {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);
      // Auto-focus next field
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = codes.every((code) => code.length === 1);

  return (
    <>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📱</Text>
      </View>
      <SectionCard title="">
        <Text variant="headlineMedium" style={styles.title}>
          Doğrulama Kodu
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          <Text style={styles.emailText}>ahmet@*****.com</Text> adresine gönderilen 6 haneli kodu girin.
        </Text>
        <View style={styles.codeContainer}>
          {codes.map((code, index) => (
            <TextInput
              key={index}
              ref={(ref: any) => (inputRefs.current[index] = ref)}
              value={code}
              onChangeText={(value) => handleCodeChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              mode="outlined"
              style={styles.codeInput}
              editable={!isOffline}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>
        <Button
          mode="contained"
          disabled={isOffline || !isCodeComplete}
          onPress={() => {
            // After verification, route based on source
            if (source === "register") {
              // From Register: go to FaceID Setup (user is now authenticated)
              navigation.navigate("AuthFaceIdSetup");
            } else {
              // From Forgot Password: go to Reset Password
              navigation.navigate("AuthPasswordReset");
            }
          }}
          style={styles.button}
        >
          Doğrula
        </Button>
        <View style={styles.resendContainer}>
          <Text variant="bodySmall" style={styles.resendText}>
            Kod gelmedi mi?
          </Text>
          <Button mode="text" disabled={isOffline} style={styles.resendButton}>
            Tekrar Gönder (45s)
          </Button>
        </View>
      </SectionCard>
    </>
  );
};

export const AuthOtpVerifyScreen = ({ 
  route,
}: { 
  route?: { params?: { state?: ScreenState; source?: "register" | "forgot-password" } };
}) => {
  const state = resolveScreenState(route);
  const source = route?.params?.source;

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
        <OtpVerifyContent isOffline source={source} />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="OTP Doğrulama" subtitle="Doğrulama kodunu gir">
      <OtpVerifyContent isOffline={false} source={source} />
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
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  emailText: {
    fontWeight: "700",
  },
  codeContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
    justifyContent: "center",
  },
  codeInput: {
    width: 48,
    height: 56,
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "monospace",
  },
  button: {
    marginBottom: 16,
  },
  resendContainer: {
    alignItems: "center",
  },
  resendText: {
    color: "#525252",
    marginBottom: 8,
  },
  resendButton: {
    marginTop: 0,
  },
});
