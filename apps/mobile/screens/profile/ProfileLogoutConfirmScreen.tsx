import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ProfileLogoutConfirmContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <>
      <SectionCard title="Çıkış Yap" actionLabel="">
        <PCard style={styles.card}>
          <PCard.Content>
            <PText variant="titleMedium">Çıkış yapmak üzeresin</PText>
            <PText variant="bodySmall">
              Hesabından çıkış yaptığında içerik indirmeleri durdurulur ve tekrar giriş yapman gerekir.
            </PText>
          </PCard.Content>
        </PCard>
        <View style={styles.buttonRow}>
          <PButton mode="contained" style={styles.primaryButton} disabled={isOffline}>
            Çıkış Yap
          </PButton>
          <PButton mode="outlined" disabled={isOffline}>
            Vazgeç
          </PButton>
        </View>
      </SectionCard>
    </>
  );
};

export const ProfileLogoutConfirmScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Çıkış Yap" subtitle="Çıkış hazırlanıyor">
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
      <ScreenLayout title="Çıkış Yap" subtitle="Çıkış işlemi">
        <StateMessage
          title="Çıkış bilgisi yok"
          description="Çıkış işlemi başlatılamadı."
          actionLabel="Geri Dön"
          icon="logout"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Çıkış Yap" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Çıkış yapılamadı"
          description="Çıkış işlemini tamamlayamadık. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Çıkış Yap" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileLogoutConfirmContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Çıkış Yap" subtitle="Hesabından çıkış yap">
      <ProfileLogoutConfirmContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      marginBottom: spacing[1.5]
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    primaryButton: {
      marginRight: 12
    }
  });
}
