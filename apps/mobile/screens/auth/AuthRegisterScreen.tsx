import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
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
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const RegisterContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [accepted, setAccepted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const navigation = useNavigation<any>();

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6) return { strength: 1, label: "Zayıf", color: "#EF4444" };
    if (password.length < 10) return { strength: 2, label: "Orta Güçlü", color: "#10B981" };
    return { strength: 4, label: "Güçlü", color: "#10B981" };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = fullName.length > 0 && email.length > 0 && phone.length > 0 && 
                      password.length >= 8 && passwordsMatch && accepted;

  return (
    <>
      <SectionCard title="">
        <Text variant="headlineMedium" style={styles.title}>
          Hesap Oluştur
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Coaching yolculuğunuza başlayın
        </Text>
        <TextInput
          label="Ad Soyad"
          mode="outlined"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          editable={!isOffline}
          placeholder="Ahmet Yılmaz"
        />
        <TextInput
          label="E-posta"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          editable={!isOffline}
          placeholder="ornek@email.com"
        />
        <View style={styles.phoneRow}>
          <View style={styles.countryCode}>
            <Text>🇹🇷 +90</Text>
          </View>
          <TextInput
            label="Telefon"
            mode="outlined"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={[styles.input, styles.phoneInput]}
            editable={!isOffline}
            placeholder="5XX XXX XX XX"
          />
        </View>
        <View style={styles.passwordContainer}>
          <TextInput
            label="Şifre"
            mode="outlined"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, styles.passwordInput]}
            editable={!isOffline}
            placeholder="Min. 8 karakter"
          />
          <IconButton
            icon={showPassword ? "eye-off" : "eye"}
            size={20}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          />
        </View>
        {password.length > 0 && (
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
            label="Şifre Tekrar"
            mode="outlined"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[styles.input, styles.passwordInput]}
            editable={!isOffline}
            placeholder="Şifrenizi tekrar girin"
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
        <View style={styles.checkboxContainer}>
          <Checkbox.Item
            label="Kullanım Koşullarını ve Gizlilik Politikasını okudum, kabul ediyorum"
            status={accepted ? "checked" : "unchecked"}
            onPress={() => setAccepted((prev) => !prev)}
            disabled={isOffline}
            position="leading"
            style={styles.checkbox}
          />
          <TouchableOpacity onPress={() => {}} style={styles.termsLink}>
            <Text style={styles.linkText}>Kullanım Koşulları</Text>
          </TouchableOpacity>
          <Text style={styles.linkText}> ve </Text>
          <TouchableOpacity onPress={() => {}} style={styles.termsLink}>
            <Text style={styles.linkText}>Gizlilik Politikası</Text>
          </TouchableOpacity>
        </View>
        <Button
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => navigation.navigate("AuthOtpVerify", { source: "register" })}
          style={styles.button}
        >
          Kaydol
        </Button>
        <View style={styles.signupRow}>
          <Text variant="bodyMedium" style={styles.signupText}>
            Zaten hesabınız var mı?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("AuthLogin")}
            disabled={isOffline}
          >
            <Text style={styles.signupLink}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </SectionCard>
    </>
  );
};

export const AuthRegisterScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
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
  title: {
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#525252",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  phoneRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  countryCode: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
  },
  phoneInput: {
    flex: 1,
  },
  passwordContainer: {
    position: "relative",
    marginBottom: 8,
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
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    paddingHorizontal: 0,
    margin: 0,
    flex: 1,
    minWidth: "100%",
  },
  termsLink: {
    marginLeft: 4,
  },
  linkText: {
    color: "#00B4D8",
    fontSize: 13,
  },
  button: {
    marginBottom: 16,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  signupText: {
    color: "#525252",
  },
  signupLink: {
    color: "#00B4D8",
    fontWeight: "600",
  },
});
