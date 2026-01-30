import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  Text,
  TextInput,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const LoginContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation<any>();

  const isFormValid = email.length > 0 && password.length >= 8;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          {/* Logo - using text for now, can be replaced with Image component */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>PST Coaching</Text>
          </View>
          <Text style={styles.title}>Hoş Geldiniz</Text>
          <Text style={styles.subtitle}>Hesabınıza giriş yapın</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-posta veya Telefon</Text>
            <TextInput
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              editable={!isOffline}
              placeholder="ornek@email.com"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Şifre</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                mode="outlined"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
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
          </View>

          <View style={styles.rememberRow}>
            <View style={styles.checkboxContainer}>
              <Checkbox.Item
                label="Beni Hatırla"
                status={rememberMe ? "checked" : "unchecked"}
                onPress={() => setRememberMe((prev) => !prev)}
                disabled={isOffline}
                position="leading"
                style={styles.checkbox}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AuthForgotPassword")}
              disabled={isOffline}
            >
              <Text style={styles.forgotLink}>Şifremi Unuttum?</Text>
            </TouchableOpacity>
          </View>

          <Button
            mode="contained"
            disabled={isOffline || !isFormValid}
            onPress={() => {
              // After successful login, check if FaceID setup is needed
              // TODO: Check if user has completed FaceID setup
              navigation.navigate("AuthFaceIdSetup");
            }}
            style={styles.loginButton}
            contentStyle={styles.loginButtonContent}
          >
            Giriş Yap
          </Button>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>veya</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <Button
              mode="outlined"
              style={styles.socialButton}
              disabled={isOffline}
              onPress={() => {}}
              contentStyle={styles.socialButtonContent}
            >
              <Text style={styles.socialIcon}>🔵</Text>
              <Text style={styles.socialText}>Google</Text>
            </Button>
            <Button
              mode="outlined"
              style={styles.socialButton}
              disabled={isOffline}
              onPress={() => {}}
              contentStyle={styles.socialButtonContent}
            >
              <Text style={styles.socialIcon}>🍎</Text>
              <Text style={styles.socialText}>Apple</Text>
            </Button>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Hesabınız yok mu? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AuthRegister")}
              disabled={isOffline}
            >
              <Text style={styles.signupLink}>Kaydol</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.guestRow}>
            <Text style={styles.guestText}>veya </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("AuthGuestMode")}
              disabled={isOffline}
            >
              <Text style={styles.guestLink}>👻 Misafir Olarak Devam Et</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthLoginScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Giriş" subtitle="Giriş formu hazırlanıyor">
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
      <ScreenLayout title="Giriş" subtitle="Giriş bilgisi bulunamadı">
        <StateMessage
          title="Giriş bilgisi bulunamadı"
          description="Oturumunu başlatmak için yeniden dene."
          actionLabel="Tekrar Dene"
          icon="account-circle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Giriş" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Giriş yüklenemedi"
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
        <LoginContent isOffline />
      </>
    );
  }

  return <LoginContent />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  logoText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2B1B5D",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
    textAlign: "center",
  },
  form: {
    width: "100%",
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
    zIndex: 1,
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxContainer: {
    flex: 1,
  },
  checkbox: {
    paddingHorizontal: 0,
    margin: 0,
  },
  forgotLink: {
    color: "#00B4D8",
    fontWeight: "600",
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 24,
  },
  loginButtonContent: {
    paddingVertical: 12,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E5E5",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#525252",
    fontSize: 14,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 8,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  socialIcon: {
    fontSize: 20,
  },
  socialText: {
    fontSize: 16,
  },
  signupRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  guestRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  guestText: {
    color: "#525252",
    fontSize: 15,
  },
  guestLink: {
    color: "#10B981",
    fontWeight: "600",
    fontSize: 15,
  },
});
