import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PAvatar, PButton, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const SessionTimeoutContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  return (
    <SectionCard title="Oturum süren doldu">
      <View style={styles.iconWrap}>
        <PAvatar.Icon size={56} icon="timer-off-outline" />
      </View>
      <PText variant="bodyMedium" style={styles.bodyText}>
        Güvenliğin için oturumun sonlandırıldı. Tekrar giriş yaparak kaldığın yerden devam edebilirsin.
      </PText>
      <PButton
        mode="contained"
        disabled={isOffline}
        style={styles.primaryButton}
        onPress={() => navigation.navigate('AuthReauth')}
      >
        Tekrar Giriş Yap
      </PButton>
      <PButton mode="text" disabled={isOffline} onPress={() => navigation.navigate('AuthLogin')}>
        Daha Sonra
      </PButton>
    </SectionCard>
  );
};

export const AuthSessionTimeoutScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Oturum kontrol ediliyor">
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
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Oturum durumu yok">
        <StateMessage
          title="Oturum durumu yok"
          description="Tekrar giriş yapmayı deneyebilirsin."
          actionLabel="Giriş Yap"
          icon="timer-sand"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Oturum bilgisi alınamadı"
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
      <ScreenLayout title="Oturum Süresi Doldu" subtitle="Çevrimdışı durum">
        <OfflineNotice />
        <SessionTimeoutContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Oturum Süresi Doldu" subtitle="Oturum süren doldu">
      <SessionTimeoutContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    iconWrap: {
      alignItems: 'center',
      marginBottom: spacing[1.5]
    },
    bodyText: {
      lineHeight: 20,
      marginBottom: spacing[2]
    },
    primaryButton: {
      marginBottom: spacing[1]
    }
  });
}
