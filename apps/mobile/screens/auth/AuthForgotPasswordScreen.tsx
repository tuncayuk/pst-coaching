import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PText, PTextInput } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ForgotPasswordContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [email, setEmail] = React.useState('');
  const [hasSent, setHasSent] = React.useState(false);
  const navigation = useNavigation<any>();
  const isValid = email.length > 3;

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
          <PText style={styles.icon}>🔑</PText>
        </View>
        <PText style={styles.title}>Şifremi Unuttum</PText>
        <PText style={styles.description}>
          E-posta adresinizi veya telefon numaranızı girin, size doğrulama kodu gönderelim.
        </PText>
        <View style={styles.inputGroup}>
          <PText style={styles.label}>E-posta veya Telefon</PText>
          <PTextInput
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={value => {
              setEmail(value);
              if (hasSent) setHasSent(false);
            }}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            editable={!isOffline}
            placeholder="ornek@email.com veya +90 5XX XXX XX XX"
          />
        </View>
        <PButton
          mode="contained"
          disabled={isOffline || !isValid}
          onPress={() => {
            setHasSent(true);
            setTimeout(() => {
              navigation.navigate('AuthOtpVerify', { source: 'forgot-password' });
            }, 300);
          }}
          style={styles.button}
        >
          Kod Gönder
        </PButton>
        {hasSent ? <PText style={styles.successText}>Doğrulama kodu gönderildi. Yönlendiriliyorsunuz...</PText> : null}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <PText style={styles.backLinkText}>← Giriş Sayfasına Dön</PText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthForgotPasswordScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Şifremi Unuttum" subtitle="Yükleniyor">
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
      <ScreenLayout title="Şifremi Unuttum" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="lock-reset"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Şifremi Unuttum" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yüklenemedi"
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
        <ForgotPasswordContent isOffline />
      </>
    );
  }

  return <ForgotPasswordContent />;
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background
    },
    scrollContent: {
      paddingHorizontal: spacing[3],
      paddingTop: 24,
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
      color: c.textSecondary,
      marginBottom: spacing[4],
      textAlign: 'center',
      lineHeight: 24
    },
    inputGroup: {
      marginBottom: spacing[3]
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
      paddingVertical: spacing[2]
    },
    inputOutline: {
      borderWidth: 2,
      borderRadius: radii.lg,
      borderColor: c.outline
    },
    button: {
      marginBottom: spacing[2],
      borderRadius: radii.lg
    },
    successText: {
      textAlign: 'center',
      color: c.tertiary,
      fontSize: fontSizes.md,
      marginBottom: spacing[1.5]
    },
    backLink: {
      alignItems: 'center',
      marginTop: spacing[1]
    },
    backLinkText: {
      color: c.primary,
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.xl
    }
  });
}
