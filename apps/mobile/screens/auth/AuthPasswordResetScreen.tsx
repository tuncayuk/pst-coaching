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
import { PActivityIndicator, PButton, PIconButton, PText, PTextInput } from "../../components";


const PasswordResetContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigation = useNavigation<any>();

  const getPasswordStrength = () => {
    if (newPassword.length === 0) return { strength: 0, label: "", color: "" };
    if (newPassword.length < 6) return { strength: 1, label: "Zayıf", color: "#EF4444" };
    if (newPassword.length < 10) return { strength: 2, label: "Orta", color: "#F59E0B" };
    return { strength: 4, label: "Güçlü Şifre", color: "#10B981" };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const isFormValid = newPassword.length >= 8 && passwordsMatch;

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
          <PText style={styles.icon}>🔒</PText>
        </View>
        <PText style={styles.title}>Yeni Şifre Oluştur</PText>
        <PText style={styles.description}>Yeni şifreniz en az 8 karakter olmalıdır.</PText>

        <View style={styles.inputGroup}>
          <PText style={styles.label}>Yeni Şifre</PText>
          <View style={styles.passwordContainer}>
            <PTextInput
              mode="outlined"
              secureTextEntry={!showPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              style={[styles.input, styles.passwordInput]}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              editable={!isOffline}
              placeholder="••••••••"
            />
            <PIconButton
              icon={showPassword ? "eye-off" : "eye"}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            />
          </View>
          {newPassword.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBars}>
                {[1, 2, 3, 4].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.strengthBar,
                      i <= passwordStrength.strength && { backgroundColor: passwordStrength.color },
                    ]}
                  />
                ))}
              </View>
              {passwordStrength.label && (
                <PText style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </PText>
              )}
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <PText style={styles.label}>Yeni Şifre Tekrar</PText>
          <View style={styles.passwordContainer}>
            <PTextInput
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={[styles.input, styles.passwordInput]}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              editable={!isOffline}
              placeholder="••••••••"
            />
            <PIconButton
              icon={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            />
          </View>
          {confirmPassword.length > 0 && !passwordsMatch && (
            <PText style={styles.errorText}>Şifreler eşleşmiyor</PText>
          )}
        </View>

        <PButton
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => {
            navigation.navigate("AuthLogin");
          }}
          style={styles.button}
        >
          Şifremi Sıfırla
        </PButton>
        <View style={styles.hintCard}>
          <PText style={styles.hintText}>
            <PText style={styles.hintBold}>💡 İpucu:</PText> Güçlü bir şifre için büyük/küçük harf, rakam ve özel karakter kullanın.
          </PText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthPasswordResetScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Şifre Sıfırlama" subtitle="Sıfırlama hazırlanıyor">
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
      <>
        <OfflineNotice />
        <PasswordResetContent isOffline />
      </>
    );
  }

  return <PasswordResetContent />;
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
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#404040",
    marginBottom: 8,
  },
  passwordContainer: {
    position: "relative",
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  inputContent: {
    paddingVertical: 14,
  },
  inputOutline: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#E5E5E5",
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  strengthContainer: {
    marginTop: 8,
  },
  strengthBars: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 4,
  },
  strengthBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E5E5",
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 8,
  },
  button: {
    marginBottom: 16,
    borderRadius: 12,
  },
  hintCard: {
    backgroundColor: "#EDE7F6",
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#2B1B5D",
  },
  hintText: {
    color: "#404040",
    lineHeight: 20,
  },
  hintBold: {
    fontWeight: "700",
    color: "#2B1B5D",
  },
});
