import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

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
    <>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔒</Text>
      </View>
      <SectionCard title="">
        <Text variant="headlineMedium" style={styles.title}>
          Yeni Şifre Oluştur
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Yeni şifreniz en az 8 karakter olmalıdır.
        </Text>
        <View style={styles.passwordContainer}>
          <TextInput
            label="Yeni Şifre"
            mode="outlined"
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            style={[styles.input, styles.passwordInput]}
            editable={!isOffline}
            placeholder="••••••••"
          />
          <IconButton
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
              <Text style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                {passwordStrength.label}
              </Text>
            )}
          </View>
        )}
        <View style={styles.passwordContainer}>
          <TextInput
            label="Yeni Şifre Tekrar"
            mode="outlined"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[styles.input, styles.passwordInput]}
            editable={!isOffline}
            placeholder="••••••••"
          />
          <IconButton
            icon={showConfirmPassword ? "eye-off" : "eye"}
            size={20}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          />
        </View>
        {confirmPassword.length > 0 && !passwordsMatch && (
          <Text style={styles.errorText}>Şifreler eşleşmiyor</Text>
        )}
        <Button
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => {
            // After password reset, go back to Login
            // TODO: Save new password
            navigation.navigate("AuthLogin");
          }}
          style={styles.button}
        >
          Şifremi Sıfırla
        </Button>
        <View style={styles.hintCard}>
          <Text variant="bodySmall" style={styles.hintText}>
            <Text style={styles.hintBold}>💡 İpucu:</Text> Güçlü bir şifre için büyük/küçük harf, rakam ve özel karakter kullanın.
          </Text>
        </View>
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
  passwordContainer: {
    position: "relative",
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
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
    marginBottom: 16,
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
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
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
