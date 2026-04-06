import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { PActivityIndicator, PButton, PTextInput } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ProfileChangePasswordContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <SectionCard title="Şifreyi Güncelle">
      <PTextInput label="Mevcut Şifre" mode="outlined" secureTextEntry style={styles.input} editable={!isOffline} />
      <PTextInput label="Yeni Şifre" mode="outlined" secureTextEntry style={styles.input} editable={!isOffline} />
      <PTextInput
        label="Yeni Şifre (Tekrar)"
        mode="outlined"
        secureTextEntry
        style={styles.input}
        editable={!isOffline}
      />
      <PButton mode="contained" disabled={isOffline}>
        Şifreyi Güncelle
      </PButton>
    </SectionCard>
  );
};

export const ProfileChangePasswordScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Şifre Değiştir" subtitle="Şifre hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Şifre Değiştir" subtitle="Şifre bilgisi">
        <StateMessage
          title="Şifre bilgisi yok"
          description="Şifre değişikliği için bilgiler hazır değil."
          actionLabel="Tekrar Dene"
          icon="lock-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Şifre Değiştir" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Şifre değiştirilemedi"
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
      <ScreenLayout title="Şifre Değiştir" subtitle="Çevrimdışı">
        <OfflineNotice />
        <ProfileChangePasswordContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Şifre Değiştir" subtitle="Şifreni güncelle">
      <ProfileChangePasswordContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    input: {
      marginBottom: spacing[1.5]
    }
  });
}
