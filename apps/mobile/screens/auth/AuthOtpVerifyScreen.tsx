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

const OtpVerifyContent = ({ isOffline, source }: { isOffline?: boolean; source?: 'register' | 'forgot-password' }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const [codes, setCodes] = React.useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = React.useState('');
  const [attemptCount, setAttemptCount] = React.useState(0);
  const inputRefs = React.useRef<any[]>([]);

  const MAX_OTP_ATTEMPTS = 5;
  const remainingAttempts = MAX_OTP_ATTEMPTS - attemptCount;

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCodes = value.slice(0, 6).split('');
      const newCodes = [...codes];
      pastedCodes.forEach((code, i) => {
        if (index + i < 6) {
          newCodes[index + i] = code;
        }
      });
      setCodes(newCodes);
      // Focus last filled input
      const lastFilledIndex = Math.min(index + pastedCodes.length - 1, 5);
      if (lastFilledIndex < 5 && inputRefs.current[lastFilledIndex + 1]) {
        inputRefs.current[lastFilledIndex + 1].focus();
      }
    } else {
      const newCodes = [...codes];
      newCodes[index] = value;
      setCodes(newCodes);
      // Auto-focus next field
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = codes.every(code => code.length === 1);

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
          <PText style={styles.icon}>📱</PText>
        </View>
        <PText style={styles.title}>Dogrulama Kodu</PText>
        <PText style={styles.description}>
          <PText style={styles.emailText}>ahmet@*****.com</PText> adresine gonderilen 6 haneli kodu girin.
        </PText>
        <View style={styles.codeContainer}>
          {codes.map((code, index) => (
            <PTextInput
              key={index}
              ref={(ref: any) => (inputRefs.current[index] = ref)}
              value={code}
              onChangeText={value => handleCodeChange(index, value)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
              keyboardType="number-pad"
              maxLength={1}
              mode="outlined"
              style={styles.codeInput}
              outlineStyle={styles.codeInputOutline}
              editable={!isOffline}
              textAlign="center"
              selectTextOnFocus
              accessibilityLabel={`Dogrulama kodu hane ${index + 1}`}
            />
          ))}
        </View>
        {otpError ? (
          <View style={styles.errorContainer}>
            <PText style={styles.errorText}>{otpError}</PText>
            {remainingAttempts > 0 && <PText style={styles.attemptText}>Kalan deneme: {remainingAttempts}</PText>}
          </View>
        ) : null}
        <PButton
          mode="contained"
          disabled={isOffline || !isCodeComplete}
          onPress={() => {
            if (attemptCount >= MAX_OTP_ATTEMPTS) {
              navigation.navigate('AuthLockout');
              return;
            }
            // Simulate OTP verification — on error show remaining attempts (AC-FR-E1-02-03)
            setAttemptCount(prev => prev + 1);
            setOtpError('Girilen kod hatali. Lutfen tekrar deneyin.');
            if (attemptCount + 1 >= MAX_OTP_ATTEMPTS) {
              navigation.navigate('AuthLockout');
              return;
            }
            // On success:
            // if (source === "register") navigation.navigate("AuthFaceIdSetup");
            // else navigation.navigate("AuthPasswordReset");
          }}
          style={styles.button}
          accessibilityLabel="Dogrula"
        >
          Doğrula
        </PButton>
        <View style={styles.resendContainer}>
          <PText style={styles.resendText}>Kod gelmedi mi?</PText>
          <PButton mode="text" disabled={isOffline} style={styles.resendButton}>
            Tekrar Gönder (45s)
          </PButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthOtpVerifyScreen = ({
  route
}: {
  route?: { params?: { state?: ScreenState; source?: 'register' | 'forgot-password' } };
}) => {
  const state = resolveScreenState(route);
  const source = route?.params?.source;

  if (state === 'loading') {
    return (
      <ScreenLayout title="OTP Doğrulama" subtitle="Doğrulama hazırlanıyor">
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
      <ScreenLayout title="OTP Doğrulama" subtitle="Doğrulama kodu yok">
        <StateMessage
          title="Doğrulama kodu yok"
          description="Yeni bir kod isteyerek devam edebilirsin."
          actionLabel="Kod Gönder"
          icon="message-processing-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="OTP Doğrulama" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Doğrulama yüklenemedi"
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
        <OtpVerifyContent isOffline source={source} />
      </>
    );
  }

  return <OtpVerifyContent isOffline={false} source={source} />;
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
      marginBottom: spacing[4],
      textAlign: 'center',
      lineHeight: 24
    },
    emailText: {
      fontWeight: fontWeights.bold
    },
    codeContainer: {
      flexDirection: 'row',
      gap: spacing[1.5],
      marginBottom: spacing[3],
      justifyContent: 'center'
    },
    codeInput: {
      width: 48,
      height: 56,
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.bold,
      backgroundColor: c.surface
    },
    codeInputOutline: {
      borderWidth: 2,
      borderRadius: radii.lg,
      borderColor: c.outline
    },
    button: {
      marginBottom: spacing[2],
      borderRadius: radii.lg
    },
    errorContainer: {
      backgroundColor: c.errorContainer,
      borderRadius: radii.md,
      padding: spacing[1.5],
      marginBottom: spacing[2],
      borderLeftWidth: 3,
      borderLeftColor: c.error
    },
    errorText: {
      color: c.error,
      fontSize: fontSizes.lg
    },
    attemptText: {
      color: c.error,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold,
      marginTop: 4
    },
    resendContainer: {
      alignItems: 'center'
    },
    resendText: {
      color: c.textSecondary,
      marginBottom: spacing[1]
    },
    resendButton: {
      marginTop: 0
    }
  });
}
