import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PText, PTextInput } from "../../components";


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
          <PText style={styles.icon}>📱</PText>
        </View>
        <PText style={styles.title}>Doğrulama Kodu</PText>
        <PText style={styles.description}>
          <PText style={styles.emailText}>ahmet@*****.com</PText> adresine gönderilen 6 haneli kodu girin.
        </PText>
        <View style={styles.codeContainer}>
          {codes.map((code, index) => (
            <PTextInput
              key={index}
              ref={(ref: any) => (inputRefs.current[index] = ref)}
              value={code}
              onChangeText={(value) => handleCodeChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              mode="outlined"
              style={styles.codeInput}
              outlineStyle={styles.codeInputOutline}
              editable={!isOffline}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>
        <PButton
          mode="contained"
          disabled={isOffline || !isCodeComplete}
          onPress={() => {
            if (source === "register") {
              navigation.navigate("AuthFaceIdSetup");
            } else {
              navigation.navigate("AuthPasswordReset");
            }
          }}
          style={styles.button}
        >
          Doğrula
        </PButton>
        <View style={styles.resendContainer}>
          <PText style={styles.resendText}>Kod gelmedi mi?</PText>
          <PButton mode="text" disabled={isOffline} style={styles.resendButton}>
            Tekrar Gönder (45s)
          </PButton>
        </View>
      </ScrollView>
    </SafeAreaView>
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
          <PActivityIndicator animating />
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
      <>
        <OfflineNotice />
        <OtpVerifyContent isOffline source={source} />
      </>
    );
  }

  return <OtpVerifyContent isOffline={false} source={source} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
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
    fontSize: 15,
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
    backgroundColor: "#FFFFFF",
  },
  codeInputOutline: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#D4D4D4",
  },
  button: {
    marginBottom: 16,
    borderRadius: 12,
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
