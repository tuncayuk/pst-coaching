import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { PActivityIndicator, PButton, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const LOCKOUT_DURATION_MINUTES = 15;

const AuthLockoutContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const [remainingSeconds, setRemainingSeconds] = React.useState(LOCKOUT_DURATION_MINUTES * 60);

  React.useEffect(() => {
    if (remainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingSeconds]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <>
      <SectionCard title="Gecici Kilit">
        <PText variant="titleMedium" style={styles.title}>
          Guvenlik nedeniyle hesabin gecici olarak kilitlendi.
        </PText>
        <PText variant="bodySmall" style={styles.body}>
          {remainingSeconds > 0
            ? `Kalan sure: ${timeDisplay}. Bu sure sonunda tekrar giris yapabilirsin.`
            : 'Kilit suresi doldu. Tekrar giris yapabilirsin.'}
        </PText>
        <PButton
          mode="contained"
          disabled={isOffline || remainingSeconds > 0}
          onPress={() => navigation.navigate('AuthLogin')}
          accessibilityLabel="Giris sayfasina don"
        >
          Giris Sayfasina Don
        </PButton>
        <PButton
          mode="text"
          disabled={isOffline}
          onPress={() => navigation.navigate('AuthForgotPassword')}
          accessibilityLabel="Sifre sifirla"
        >
          Sifre Sifirla
        </PButton>
      </SectionCard>
    </>
  );
};

export const AuthLockoutScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Geçici Kilit" subtitle="Kilit bilgisi hazırlanıyor">
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
      <ScreenLayout title="Geçici Kilit" subtitle="Kilit bilgisi bulunamadı">
        <StateMessage
          title="Kilit bilgisi yok"
          description="Hesap kilidi görünmüyor. Giriş ekranına dönebilirsin."
          actionLabel="Girişe Dön"
          icon="lock-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Geçici Kilit" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Kilit bilgisi alınamadı"
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
      <ScreenLayout title="Geçici Kilit" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <AuthLockoutContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Geçici Kilit" subtitle="Güvenlik bilgilendirmesi">
      <AuthLockoutContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    title: {
      marginBottom: spacing[1]
    },
    body: {
      marginBottom: spacing[1.5]
    }
  });
}
