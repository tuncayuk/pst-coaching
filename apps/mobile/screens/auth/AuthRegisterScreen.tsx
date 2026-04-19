import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PIconButton, PText, PTextInput } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const RegisterContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [accepted, setAccepted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const navigation = useNavigation<any>();

  // Password strength: consistent 4-level algorithm (same as PasswordResetScreen)
  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { strength: 1, label: 'Zayif', color: '#EF4444' };
    if (score === 2) return { strength: 2, label: 'Orta', color: '#F59E0B' };
    if (score === 3) return { strength: 3, label: 'Iyi', color: '#10B981' };
    return { strength: 4, label: 'Guclu', color: '#10B981' };
  };

  const passwordStrength = getPasswordStrength();
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isFormValid =
    fullName.length > 0 && email.length > 0 && phone.length > 0 && password.length >= 8 && passwordsMatch && accepted;

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
              icon={showPassword ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            />
          </View>
          {password.length > 0 && (
            <View style={styles.strengthContainer}>
              <View style={styles.strengthBars}>
                {[1, 2, 3, 4].map(i => (
                  <View
                    key={i}
                    style={[
                      styles.strengthBar,
                      i <= passwordStrength.strength && { backgroundColor: passwordStrength.color }
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
              icon={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            />
          </View>
          {confirmPassword.length > 0 && !passwordsMatch && <PText style={styles.errorText}>Şifreler eşleşmiyor</PText>}
        </View>

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setAccepted(prev => !prev)}
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
          onPress={() => navigation.navigate('AuthOtpVerify', { source: 'register' })}
          style={styles.button}
        >
          Kaydol
        </PButton>

        <View style={styles.signupRow}>
          <PText style={styles.signupText}>Zaten hesabınız var mı? </PText>
          <TouchableOpacity onPress={() => navigation.navigate('AuthLogin')} disabled={isOffline}>
            <PText style={styles.signupLink}>Giriş Yap</PText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthRegisterScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
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

  if (state === 'empty') {
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

  if (state === 'error') {
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

  if (state === 'offline') {
    return (
      <>
        <OfflineNotice />
        <RegisterContent isOffline />
      </>
    );
  }

  return <RegisterContent />;
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background
    },
    scrollContent: {
      paddingHorizontal: spacing[3],
      paddingTop: spacing[3],
      paddingBottom: spacing[4]
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing[1]
    },
    backButtonText: {
      fontSize: fontSizes['6xl'],
      color: c.textPrimary
    },
    header: {
      alignItems: 'center',
      marginBottom: spacing[3]
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
      marginBottom: spacing[3],
      textAlign: 'center'
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
      backgroundColor: c.surface
    },
    inputContent: {
      paddingVertical: 14
    },
    inputOutline: {
      borderWidth: 2,
      borderRadius: radii.lg,
      borderColor: c.outline
    },
    phoneRow: {
      flexDirection: 'row',
      gap: spacing[1]
    },
    countryCode: {
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
      borderWidth: 2,
      borderColor: c.outlineVariant,
      borderRadius: radii.lg,
      paddingVertical: 14,
      paddingHorizontal: spacing[1.5],
      backgroundColor: c.surface
    },
    countryCodeText: {
      fontSize: fontSizes.lg,
      color: c.textTertiary
    },
    countryCodeChevron: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    },
    phoneInput: {
      flex: 1
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
      top: spacing[1]
    },
    strengthContainer: {
      marginTop: spacing[1]
    },
    strengthBars: {
      flexDirection: 'row',
      gap: 4,
      marginBottom: 4
    },
    strengthBar: {
      flex: 1,
      height: 4,
      borderRadius: radii.xs,
      backgroundColor: c.outlineVariant
    },
    strengthLabel: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold
    },
    errorText: {
      color: c.error,
      fontSize: fontSizes.base,
      marginTop: spacing[1]
    },
    checkboxRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing[1],
      marginBottom: spacing[2]
    },
    checkboxText: {
      flex: 1,
      fontSize: fontSizes.md,
      color: c.textTertiary,
      lineHeight: 18
    },
    linkText: {
      color: c.primary,
      fontSize: fontSizes.md
    },
    checkboxBox: {
      width: 24,
      height: 24,
      borderRadius: radii.sm,
      borderWidth: 2,
      borderColor: c.outline,
      backgroundColor: c.surface,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2
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
    button: {
      marginBottom: spacing[2],
      borderRadius: radii.lg
    },
    signupRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing[1]
    },
    signupText: {
      color: c.textSecondary,
      fontSize: fontSizes.xl
    },
    signupLink: {
      color: c.primary,
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.xl
    }
  });
}
