import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PAvatar, PButton, PDivider, PListIcon, PListItem, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const ProfileAccountContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();

  return (
    <>
      <SectionCard title="Profil Bilgileri" actionLabel="Düzenle">
        <View style={styles.profileHeader}>
          <PAvatar.Text size={64} label={(user?.email ?? 'EA').slice(0, 2).toUpperCase()} />
          <View style={styles.profileInfo}>
            <PText variant="titleMedium">{user?.email ?? 'Kullanıcı'}</PText>
            <PText variant="bodySmall">{user?.email ?? 'demo@pstcoaching.app'}</PText>
            <PText variant="bodySmall">{user?.phone ?? '+90 555 123 45 67'}</PText>
          </View>
        </View>
        <PButton mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Hesap Bilgilerini Güncelle
        </PButton>
      </SectionCard>

      <SectionCard title="Güvenlik" actionLabel="">
        <PListItem
          title="Şifre Değiştir"
          description="Son güncelleme 2 ay önce"
          left={props => <PListIcon {...props} icon="lock-outline" />}
          onPress={() => navigation.navigate('ProfileChangePassword')}
        />
        <PDivider />
        <PListItem
          title="Giriş Yapılan Cihazlar"
          description="2 aktif oturum"
          left={props => <PListIcon {...props} icon="cellphone" />}
        />
        <PButton mode="contained-tonal" style={styles.actionButton} disabled={isOffline}>
          Güvenlik Ayarları
        </PButton>
      </SectionCard>

      <SectionCard title="Hesap" actionLabel="">
        <PListItem
          title="Verilerimi İndir"
          description="CSV ve PDF"
          left={props => <PListIcon {...props} icon="download" />}
        />
        <PDivider />
        <PListItem
          title="Çıkış Yap"
          description="Hesabından güvenli çıkış"
          left={props => <PListIcon {...props} icon="logout" />}
          onPress={() => navigation.navigate('ProfileLogoutConfirm')}
        />
      </SectionCard>
    </>
  );
};

export const ProfileAccountScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Hesap" subtitle="Hesap hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Bilgiler">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Hesap" subtitle="Bilgilerini tamamla">
        <StateMessage
          title="Hesap bilgileri yok"
          description="Hesabını kullanmak için temel bilgileri ekle."
          actionLabel="Bilgi Ekle"
          icon="account-plus-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Hesap" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Hesap yüklenemedi"
          description="Bilgileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Hesap" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileAccountContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hesap" subtitle="Hesabını düzenle">
      <ProfileAccountContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    profileHeader: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    profileInfo: {
      marginLeft: 12,
      flex: 1
    },
    actionButton: {
      marginTop: spacing[1.5],
      alignSelf: 'flex-start'
    }
  });
}
