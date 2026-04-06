import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PIconButton, PText, PTextInput } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const PasswordResetContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const navigation = useNavigation<any>();

  // Password strength: consistent 4-level algorithm (same as RegisterScreen)
  const getPasswordStrength = () => {
    if (newPassword.length === 0) return { strength: 0, label: '', color: '' };
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) score++;
    if (/\d/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;
    if (score <= 1) return { strength: 1, label: 'Zayif', color: '#EF4444' };
    if (score === 2) return { strength: 2, label: 'Orta', color: '#F59E0B' };
    if (score === 3) return { strength: 3, label: 'Iyi', color: '#10B981' };
    return { strength: 4, label: 'Guclu', color: '#10B981' };
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
          accessibilityRole="button"
          accessibilityLabel="Geri don"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
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
              icon={showPassword ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            />
          </View>
          {newPassword.length > 0 && (
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
              icon={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            />
          </View>
          {confirmPassword.length > 0 && !passwordsMatch && <PText style={styles.errorText}>Şifreler eşleşmiyor</PText>}
        </View>

        <PButton
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => {
            setShowSuccess(true);
            setTimeout(() => {
              navigation.navigate('AuthLogin');
            }, 1500);
          }}
          style={styles.button}
          accessibilityLabel="Sifremi sifirla"
        >
          Sifremi Sifirla
        </PButton>
        {showSuccess ? (
          <View style={styles.successContainer}>
            <PText style={styles.successText}>
              Sifreniz basariyla degistirildi! Giris sayfasina yonlendiriliyorsunuz...
            </PText>
          </View>
        ) : null}
        <View style={styles.hintCard}>
          <PText style={styles.hintText}>
            <PText style={styles.hintBold}>💡 İpucu:</PText> Güçlü bir şifre için büyük/küçük harf, rakam ve özel
            karakter kullanın.
          </PText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthPasswordResetScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
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

  if (state === 'empty') {
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

  if (state === 'error') {
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

  if (state === 'offline') {
    return (
      <>
        <OfflineNotice />
        <PasswordResetContent isOffline />
      </>
    );
  }

  return <PasswordResetContent />;
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background
    },
    scrollContent: {
      paddingHorizontal: spacing[3],
      paddingTop: 16,
      paddingBottom: 32
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing[2]
    },
    backButtonText: {
      fontSize: fontSizes['6xl'],
      color: c.textPrimary
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: spacing[2]
    },
    icon: {
      fontSize: fontSizes['12xl']
    },
    title: {
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: spacing[1],
      textAlign: 'center'
    },
    description: {
      fontSize: fontSizes.xl,
      color: c.textSecondary,
      marginBottom: spacing[3],
      textAlign: 'center',
      lineHeight: 24
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
    passwordContainer: {
      position: 'relative'
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
      borderColor: c.outlineVariant
    },
    passwordInput: {
      paddingRight: 48
    },
    eyeIcon: {
      position: 'absolute',
      right: 8,
      top: 8
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
    button: {
      marginBottom: spacing[2],
      borderRadius: radii.lg
    },
    successContainer: {
      backgroundColor: '#F0FDF4',
      borderRadius: radii.md,
      padding: spacing[1.5],
      marginBottom: spacing[2],
      borderLeftWidth: 3,
      borderLeftColor: c.tertiary
    },
    successText: {
      color: '#065F46',
      fontSize: fontSizes.lg
    },
    hintCard: {
      backgroundColor: c.secondaryContainer,
      padding: spacing[2],
      borderRadius: radii.lg,
      borderLeftWidth: 4,
      borderLeftColor: c.textBrand
    },
    hintText: {
      color: c.textTertiary,
      lineHeight: 20
    },
    hintBold: {
      fontWeight: fontWeights.bold,
      color: c.textBrand
    }
  });
}
