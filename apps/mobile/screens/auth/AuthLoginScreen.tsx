import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PIconButton, PText, PTextInput } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LoginContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

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

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background
    },
    scrollContent: {
      paddingHorizontal: spacing[3],
      paddingTop: spacing[4],
      paddingBottom: spacing[4]
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing[5]
    },
    logoContainer: {
      marginBottom: spacing[3],
      alignItems: 'center'
    },
    logoImage: {
      width: 200,
      height: 60,
      resizeMode: 'contain'
    },
    title: {
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: spacing[1],
      textAlign: 'center'
    },
    subtitle: {
      fontSize: fontSizes.xl,
      color: c.textSecondary,
      textAlign: 'center'
    },
    form: {
      width: '100%'
    },
    inputGroup: {
      marginBottom: spacing[2]
    },
    label: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textTertiary,
      marginBottom: spacing[1]
    },
    input: {
      backgroundColor: palette.white
    },
    inputContent: {
      paddingVertical: spacing[2]
    },
    inputOutline: {
      borderWidth: 2,
      borderRadius: radii.lg,
      borderColor: c.outline
    },
    passwordContainer: {
      position: 'relative'
    },
    passwordInput: {
      paddingRight: 48
    },
    eyeIcon: {
      position: 'absolute',
      right: spacing[1],
      top: spacing[1],
      zIndex: 1
    },
    rememberRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[3]
    },
    rememberCheckbox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1]
    },
    checkboxLabel: {
      fontSize: fontSizes.lg,
      color: c.textTertiary
    },
    forgotLink: {
      color: c.primary,
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.lg
    },
    errorContainer: {
      backgroundColor: palette.red50,
      borderRadius: radii.md,
      padding: spacing[1.5],
      marginBottom: spacing[2],
      borderLeftWidth: 3,
      borderLeftColor: palette.red500
    },
    errorText: {
      color: palette.red600,
      fontSize: fontSizes.lg
    },
    attemptText: {
      color: palette.red600,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold,
      marginTop: 4
    },
    loginButton: {
      marginBottom: spacing[3],
      borderRadius: radii.lg
    },
    checkboxBox: {
      width: 24,
      height: 24,
      borderRadius: radii.sm,
      borderWidth: 2,
      borderColor: c.outline,
      backgroundColor: palette.white,
      alignItems: 'center',
      justifyContent: 'center'
    },
    checkboxBoxChecked: {
      borderColor: c.primary,
      backgroundColor: c.primary
    },
    checkboxCheck: {
      color: palette.white,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      lineHeight: 12
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing[3]
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: c.outlineVariant
    },
    dividerText: {
      marginHorizontal: spacing[2],
      color: c.textSecondary,
      fontSize: fontSizes.lg,
      backgroundColor: c.background,
      paddingHorizontal: spacing[1]
    },
    socialButtons: {
      flexDirection: 'row',
      gap: spacing[2],
      marginBottom: spacing[4]
    },
    socialButton: {
      flex: 1,
      borderWidth: 2,
      borderColor: c.outlineVariant
    },
    socialButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      paddingVertical: spacing[1.5]
    },
    socialButtonLabel: {
      fontSize: fontSizes['2xl']
    },
    socialIcon: {
      fontSize: fontSizes['4xl']
    },
    socialText: {
      fontSize: fontSizes['2xl']
    },
    signupRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    signupText: {
      color: c.textSecondary,
      fontSize: fontSizes.xl
    },
    signupLink: {
      color: c.primary,
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.xl
    },
    guestRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing[3],
      paddingTop: spacing[3],
      borderTopWidth: 1,
      borderTopColor: c.outlineVariant
    },
    guestText: {
      color: c.textSecondary,
      fontSize: fontSizes.xl
    },
    guestLink: {
      color: c.tertiary,
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.xl
    }
  });
}
