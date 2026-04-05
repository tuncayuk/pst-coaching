import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import { trackCtaTap } from '../../analytics';
import { PActivityIndicator, PButton, PCard, PDivider, PText } from '../../components';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const planBenefits = ['Sınırsız içerik erişimi', 'Yeni içerik bildirimleri', 'Çevrimdışı indirme'];

const ContentPaywallContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  return (
    <>
      <SectionCard title="Abonelik Gerekli">
        <PText variant="bodyMedium" style={styles.paragraph}>
          Bu içeriği görüntülemek için aktif bir abonelik gerekiyor. Sana uygun planı seçerek hemen devam edebilirsin.
        </PText>
      </SectionCard>

      <SectionCard title="Planlar">
        <PCard style={styles.card}>
          <PCard.Title title="Aylık Plan" subtitle="149 ₺ / ay" />
          <PCard.Content>
            {planBenefits.map(benefit => (
              <PText key={benefit} variant="bodySmall" style={styles.bullet}>
                • {benefit}
              </PText>
            ))}
          </PCard.Content>
          <PCard.Actions>
            <PButton
              mode="contained"
              disabled={isOffline}
              onPress={() => {
                trackCtaTap('content.paywall', 'monthly_plan_tapped');
                navigation.getParent()?.navigate('MainTabs', {
                  screen: 'Profile',
                  params: { screen: 'ProfileSubscription' }
                });
              }}
            >
              Aboneliği Başlat
            </PButton>
          </PCard.Actions>
        </PCard>
        <PDivider style={styles.divider} />
        <PCard style={styles.card}>
          <PCard.Title title="Yıllık Plan" subtitle="99 ₺ / ay" />
          <PCard.Content>
            <PText variant="bodySmall">12 ay peşin ödeme ile daha avantajlı.</PText>
          </PCard.Content>
          <PCard.Actions>
            <PButton
              mode="outlined"
              disabled={isOffline}
              onPress={() => {
                trackCtaTap('content.paywall', 'annual_plan_tapped');
                navigation.getParent()?.navigate('MainTabs', {
                  screen: 'Profile',
                  params: { screen: 'ProfileSubscription' }
                });
              }}
            >
              Yıllık Planı Seç
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>
    </>
  );
};

export const ContentPaywallScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Abonelik Gerekli" subtitle="Abonelik seçenekleri hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Planlar">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Abonelik Gerekli" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Plan bulunamadı"
          description="Şu anda listelenecek plan yok."
          actionLabel="Destek ile İletişim"
          icon="credit-card-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Abonelik Gerekli" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Planlar yüklenemedi"
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
      <ScreenLayout title="Abonelik Gerekli" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentPaywallContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Abonelik Gerekli" subtitle="Abonelik planını seç">
      <ContentPaywallContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 8
  },
  card: {
    marginTop: 4
  },
  bullet: {
    marginBottom: 6
  },
  divider: {
    marginVertical: 12
  }
});
