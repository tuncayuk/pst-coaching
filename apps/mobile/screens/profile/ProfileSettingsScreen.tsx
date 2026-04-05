import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PDivider, PListIcon, PListItem, PSwitch, PText } from '../../components';
import { getAccessibilitySettings, getPrimaryUser, getReminderSettings } from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ProfileSettingsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const accessibility = getAccessibilitySettings().find(item => item.user_id === user?.id);
  const reminders = getReminderSettings().find(item => item.user_id === user?.id);

  return (
    <>
      <SectionCard title="Genel Ayarlar" actionLabel="">
        <PListItem
          title="Dil"
          description={user?.language?.toUpperCase() ?? 'TR'}
          left={props => <PListIcon {...props} icon="translate" />}
          onPress={() => navigation.navigate('ProfileLanguage')}
        />
        <PDivider />
        <PListItem
          title="Hatırlatmalar"
          description={reminders?.enabled ? 'Açık' : 'Kapalı'}
          left={props => <PListIcon {...props} icon="bell-outline" />}
          onPress={() => navigation.navigate('ProfileReminders')}
        />
        <PDivider />
        <PListItem
          title="Erişilebilirlik"
          description={accessibility?.text_size ?? 'medium'}
          left={props => <PListIcon {...props} icon="human-handsup" />}
          onPress={() => navigation.navigate('ProfileAccessibility')}
        />
      </SectionCard>

      <SectionCard title="Okuma Deneyimi" actionLabel="">
        <PListItem
          title="Okuma Modu"
          description="Gündüz"
          left={props => <PListIcon {...props} icon="book-open-page-variant" />}
        />
        <PDivider />
        <View style={styles.switchRow}>
          <View>
            <PText variant="bodyMedium">Sesli Okuma</PText>
            <PText variant="bodySmall">Yeni bölümlerde otomatik başlat</PText>
          </View>
          <PSwitch value disabled={isOffline} />
        </View>
      </SectionCard>

      <SectionCard title="Bildirimler" actionLabel="">
        <View style={styles.switchRow}>
          <View>
            <PText variant="bodyMedium">Günlük Hatırlatmalar</PText>
            <PText variant="bodySmall">08:30'da gönder</PText>
          </View>
          <PSwitch value disabled={isOffline} />
        </View>
        <PDivider />
        <View style={styles.switchRow}>
          <View>
            <PText variant="bodyMedium">Yeni İçerik</PText>
            <PText variant="bodySmall">Haftalık özet</PText>
          </View>
          <PSwitch value={false} disabled={isOffline} />
        </View>
        <PButton mode="outlined" style={styles.actionButton} disabled={isOffline}>
          Bildirim Zamanını Düzenle
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileSettingsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Ayarlar hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Tercihler">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Tercihlerin">
        <StateMessage
          title="Ayar bulunamadı"
          description="Henüz ayar yapılandırması yok. Varsayılanları kullanıyoruz."
          actionLabel="Ayarları Oluştur"
          icon="tune-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Ayarlar yüklenemedi"
          description="Ayarları getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Ayarlar" subtitle="Önbellekteki ayarlar">
        <OfflineNotice />
        <ProfileSettingsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ayarlar" subtitle="Tercihlerini düzenle">
      <ProfileSettingsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  actionButton: {
    marginTop: 12,
    alignSelf: 'flex-start'
  }
});
