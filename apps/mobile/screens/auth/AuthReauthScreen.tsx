import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { PActivityIndicator, PButton, PText, PTextInput } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const AuthReauthContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  return (
    <>
      <SectionCard title="Yeniden Doğrulama">
        <PText variant="bodySmall" style={styles.body}>
          Güvenliğin için bu işlemi tamamlamadan önce tekrar doğrulama istiyoruz.
        </PText>
        <PTextInput
          label="E-posta veya telefon"
          mode="outlined"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          editable={!isOffline}
          accessibilityLabel="E-posta veya telefon numarasi"
        />
        <PTextInput
          label="Sifre"
          mode="outlined"
          secureTextEntry
          style={styles.input}
          editable={!isOffline}
          accessibilityLabel="Sifre"
        />
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={() => navigation.getParent()?.navigate('MainTabs')}
          accessibilityLabel="Dogrula ve devam et"
        >
          Dogrula ve Devam Et
        </PButton>
        <PButton
          mode="text"
          disabled={isOffline}
          onPress={() => navigation.navigate('AuthForgotPassword')}
          accessibilityLabel="Sifremi unuttum"
        >
          Sifremi Unuttum
        </PButton>
      </SectionCard>
    </>
  );
};

export const AuthReauthScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Doğrulama hazırlanıyor">
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
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Doğrulama bilgisi yok">
        <StateMessage
          title="Doğrulama bilgisi yok"
          description="Tekrar giriş yapmayı deneyebilirsin."
          actionLabel="Girişe Dön"
          icon="account-circle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Bir sorun oluştu">
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
      <ScreenLayout title="Yeniden Doğrulama" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <AuthReauthContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yeniden Doğrulama" subtitle="Devam etmek için doğrula">
      <AuthReauthContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    body: {
      marginBottom: spacing[1.5]
    },
    input: {
      marginBottom: spacing[1.5]
    }
  });
}
