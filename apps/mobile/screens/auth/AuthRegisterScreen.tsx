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

  // Password strength: consistent 4-level algorithm (same as PasswordResetScreen)
  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { strength: 1, label: "Zayif", color: "#EF4444" };
    if (score === 2) return { strength: 2, label: "Orta", color: "#F59E0B" };
    if (score === 3) return { strength: 3, label: "Iyi", color: "#10B981" };
    return { strength: 4, label: "Guclu", color: "#10B981" };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid = fullName.length > 0 && email.length > 0 && phone.length > 0 && 
                      password.length >= 8 && passwordsMatch && accepted;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          disabled={isOffline}
          accessibilityRole="button"
          accessibilityLabel="Geri don"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <PText style={styles.backButtonText}>←</PText>
        </TouchableOpacity>

        <View style={styles.header}>
          <PText style={styles.title}>Hesap Oluştur</PText>
          <PText style={styles.subtitle}>Coaching yolculuğunuza başlayın</PText>
        </View>

        <View style={styles.inputGroup}>
          <PText style={styles.label}>Ad Soyad</PText>
          <PTextInput
            mode="outlined"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            editable={!isOffline}
            placeholder="Ahmet Yılmaz"
          />
        </View>

        <View style={styles.inputGroup}>
          <PText style={styles.label}>E-posta</PText>
          <PTextInput
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            editable={!isOffline}
            placeholder="ornek@email.com"
          />
        </View>

        <View style={styles.inputGroup}>
          <PText style={styles.label}>Telefon</PText>
          <View style={styles.phoneRow}>
            <View style={styles.countryCode}>
              <PText style={styles.countryCodeText}>🇹🇷 +90</PText>
              <PText style={styles.countryCodeChevron}>▾</PText>
            </View>
            <PTextInput
              mode="outlined"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              style={[styles.input, styles.phoneInput]}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              editable={!isOffline}
              placeholder="5XX XXX XX XX"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <PText style={styles.label}>Şifre</PText>
          <View style={styles.passwordContainer}>
            <PTextInput
              mode="outlined"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={[styles.input, styles.passwordInput]}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              editable={!isOffline}
              placeholder="Min. 8 karakter"
            />
            <PIconButton
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
                <PText style={[styles.strengthLabel, { color: passwordStrength.color }]}>
                  {passwordStrength.label}
                </PText>
              )}
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <PText style={styles.label}>Şifre Tekrar</PText>
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
              placeholder="Şifrenizi tekrar girin"
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

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAccepted((prev) => !prev)}
          disabled={isOffline}
          accessibilityRole="checkbox"
          accessibilityState={{ checked: accepted }}
          accessibilityLabel="Kullanim kosullarini ve gizlilik politikasini kabul ediyorum"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={[styles.checkboxBox, accepted && styles.checkboxBoxChecked]}>
            {accepted ? <PText style={styles.checkboxCheck}>✓</PText> : null}
          </View>
          <PText style={styles.checkboxText}>
            <PText style={styles.linkText} onPress={() => {}}>
              Kullanım Koşullarını
            </PText>
            <PText> ve </PText>
            <PText style={styles.linkText} onPress={() => {}}>
              Gizlilik Politikasını
            </PText>
            <PText> okudum, kabul ediyorum</PText>
          </PText>
        </TouchableOpacity>

        <PButton
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => navigation.navigate("AuthOtpVerify", { source: "register" })}
          style={styles.button}
        >
          Kaydol
        </PButton>

        <View style={styles.signupRow}>
          <PText style={styles.signupText}>Zaten hesabınız var mı? </PText>
          <TouchableOpacity onPress={() => navigation.navigate("AuthLogin")} disabled={isOffline}>
            <PText style={styles.signupLink}>Giriş Yap</PText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthRegisterScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Kayıt Ol" subtitle="Kayıt formu hazırlanıyor">
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
      <>
        <OfflineNotice />
        <RegisterContent isOffline />
      </>
    );
  }

  return <RegisterContent />;
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
    marginBottom: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: "#171717",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
    marginBottom: 24,
    textAlign: "center",
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
  input: {
    backgroundColor: "#FFFFFF",
  },
  inputContent: {
    paddingVertical: 14,
  },
  inputOutline: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#D4D4D4",
  },
  phoneRow: {
    flexDirection: "row",
    gap: 8,
  },
  countryCode: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
  },
  countryCodeText: {
    fontSize: 14,
    color: "#404040",
  },
  countryCodeChevron: {
    fontSize: 12,
    color: "#525252",
  },
  phoneInput: {
    flex: 1,
  },
  passwordContainer: {
    position: "relative",
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    color: "#404040",
    lineHeight: 18,
  },
  linkText: {
    color: "#00B4D8",
    fontSize: 13,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D4D4D4",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxBoxChecked: {
    borderColor: "#00B4D8",
    backgroundColor: "#00B4D8",
  },
  checkboxCheck: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 12,
  },
  button: {
    marginBottom: 16,
    borderRadius: 12,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  signupText: {
    color: "#525252",
    fontSize: 15,
  },
  signupLink: {
    color: "#00B4D8",
    fontWeight: "600",
    fontSize: 15,
  },
});
