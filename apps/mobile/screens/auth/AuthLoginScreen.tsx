import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PIconButton, PText, PTextInput } from '../../components';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LoginContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [rememberMe, setRememberMe] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('tuncay@bu.edu');
  const [password, setPassword] = React.useState('12345678');
  const [loginError, setLoginError] = React.useState('');
  const [attemptCount, setAttemptCount] = React.useState(0);
  const navigation = useNavigation<any>();

  const MAX_ATTEMPTS = 5;
  const isFormValid = email.length > 0 && password.length >= 8;
  const remainingAttempts = MAX_ATTEMPTS - attemptCount;

  const handleLogin = () => {
    if (attemptCount >= MAX_ATTEMPTS) {
      navigation.navigate('AuthLockout');
      return;
    }
    // Simulate login — safe error message (no account enumeration per AC-FR-E1-03-02)
    setAttemptCount(prev => prev + 1);
    setLoginError('E-posta veya sifre hatali. Tekrar deneyin.');
    if (attemptCount + 1 >= MAX_ATTEMPTS) {
      navigation.navigate('AuthLockout');
      return;
    }
    // On success:
    navigation.navigate('AuthFaceIdSetup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/logo/pst_logo_128w.png')} style={styles.logoImage} />
          </View>
          <PText style={styles.title}>Hoş Geldiniz</PText>
          <PText style={styles.subtitle}>Hesabınıza giriş yapın</PText>
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <PText style={styles.label}>E-posta veya Telefon</PText>
            <PTextInput
              mode="outlined"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={v => {
                setEmail(v);
                setLoginError('');
              }}
              style={styles.input}
              contentStyle={styles.inputContent}
              outlineStyle={styles.inputOutline}
              editable={!isOffline}
              placeholder="ornek@email.com"
              accessibilityLabel="E-posta veya telefon numarasi"
            />
          </View>

          <View style={styles.inputGroup}>
            <PText style={styles.label}>Şifre</PText>
            <View style={styles.passwordContainer}>
              <PTextInput
                mode="outlined"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={v => {
                  setPassword(v);
                  setLoginError('');
                }}
                style={[styles.input, styles.passwordInput]}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                editable={!isOffline}
                placeholder="Min. 8 karakter"
                accessibilityLabel="Sifre"
              />
              <PIconButton
                icon={showPassword ? 'eye-off' : 'eye'}
                size={20}
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                containerColor="transparent"
                iconColor="#404040"
                accessibilityLabel={showPassword ? 'Sifreyi gizle' : 'Sifreyi goster'}
              />
            </View>
          </View>

          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={styles.rememberCheckbox}
              onPress={() => setRememberMe(prev => !prev)}
              disabled={isOffline}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: rememberMe }}
              accessibilityLabel="Beni hatirla"
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <View style={[styles.checkboxBox, rememberMe && styles.checkboxBoxChecked]}>
                {rememberMe ? <PText style={styles.checkboxCheck}>✓</PText> : null}
              </View>
              <PText style={styles.checkboxLabel}>Beni Hatirla</PText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AuthForgotPassword')}
              disabled={isOffline}
              accessibilityRole="link"
              accessibilityLabel="Sifremi unuttum"
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <PText style={styles.forgotLink}>Sifremi Unuttum?</PText>
            </TouchableOpacity>
          </View>

          {loginError ? (
            <View style={styles.errorContainer}>
              <PText style={styles.errorText}>{loginError}</PText>
              {remainingAttempts > 0 && remainingAttempts < MAX_ATTEMPTS && (
                <PText style={styles.attemptText}>Kalan deneme: {remainingAttempts}</PText>
              )}
            </View>
          ) : null}

          <PButton
            mode="contained"
            disabled={isOffline || !isFormValid}
            onPress={handleLogin}
            style={styles.loginButton}
            accessibilityLabel="Giris yap"
          >
            Giriş Yap
          </PButton>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <PText style={styles.dividerText}>veya</PText>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtons}>
            <PButton
              mode="outlined"
              style={styles.socialButton}
              disabled={isOffline}
              onPress={() => {}}
              accessibilityLabel="Google ile giris yap"
              icon="google"
            >
              Google
            </PButton>
            <PButton
              mode="outlined"
              style={styles.socialButton}
              disabled={isOffline}
              onPress={() => {}}
              accessibilityLabel="Apple ile giris yap"
              icon="apple"
            >
              Apple
            </PButton>
          </View>

          <View style={styles.signupRow}>
            <PText style={styles.signupText}>Hesabiniz yok mu? </PText>
            <TouchableOpacity
              onPress={() => navigation.navigate('AuthRegister')}
              disabled={isOffline}
              accessibilityRole="link"
              accessibilityLabel="Kayit ol"
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <PText style={styles.signupLink}>Kaydol</PText>
            </TouchableOpacity>
          </View>

          <View style={styles.guestRow}>
            <PText style={styles.guestText}>veya </PText>
            <TouchableOpacity
              onPress={() => navigation.navigate('AuthGuestMode')}
              disabled={isOffline}
              accessibilityRole="link"
              accessibilityLabel="Misafir olarak devam et"
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <PText style={styles.guestLink}>Misafir Olarak Devam Et</PText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthLoginScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Giriş" subtitle="Giriş formu hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
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

  if (state === 'error') {
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

  if (state === 'offline') {
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
    backgroundColor: '#FAFAFA'
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32
  },
  header: {
    alignItems: 'center',
    marginBottom: 40
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: 'center'
  },
  logoImage: {
    width: 200,
    height: 60,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B1B5D',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 15,
    color: '#525252',
    textAlign: 'center'
  },
  form: {
    width: '100%'
  },
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#404040',
    marginBottom: 8
  },
  input: {
    backgroundColor: '#FFFFFF'
  },
  inputContent: {
    paddingVertical: 16
  },
  inputOutline: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: '#D4D4D4'
  },
  passwordContainer: {
    position: 'relative'
  },
  passwordInput: {
    paddingRight: 48
  },
  eyeIcon: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 1
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  rememberCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#404040'
  },
  forgotLink: {
    color: '#00B4D8',
    fontWeight: '600',
    fontSize: 14
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444'
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14
  },
  attemptText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4
  },
  loginButton: {
    marginBottom: 24,
    borderRadius: 12
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D4D4D4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxBoxChecked: {
    borderColor: '#00B4D8',
    backgroundColor: '#00B4D8'
  },
  checkboxCheck: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 12
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5'
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#525252',
    fontSize: 14,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 8
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32
  },
  socialButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#E5E5E5'
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12
  },
  socialButtonLabel: {
    fontSize: 16
  },
  socialIcon: {
    fontSize: 20
  },
  socialText: {
    fontSize: 16
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signupText: {
    color: '#525252',
    fontSize: 15
  },
  signupLink: {
    color: '#00B4D8',
    fontWeight: '600',
    fontSize: 15
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5'
  },
  guestText: {
    color: '#525252',
    fontSize: 15
  },
  guestLink: {
    color: '#10B981',
    fontWeight: '600',
    fontSize: 15
  }
});
