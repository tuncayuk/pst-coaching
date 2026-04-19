import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { trackCtaTap } from '../../analytics';
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PChip,
  PDivider,
  PListIcon,
  PListItem,
  PText
} from '../../components';
import {
  getPaymentTransactions,
  getPlanForSubscription,
  getPrimaryUser,
  getSubscriptionForUser
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ProfileReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const payments = getPaymentTransactions()
    .filter(item => item.subscription_id === subscription?.id)
    .slice(0, 2);

  return (
    <>
      <SectionCard title="Hesap" actionLabel="Düzenle">
        <View style={styles.profileHeader}>
          <PAvatar.Text size={56} label={(user?.email ?? 'EA').slice(0, 2).toUpperCase()} />
          <View style={styles.profileInfo}>
            <PText variant="titleMedium">{user?.email ?? 'Kullanıcı'}</PText>
            <PText variant="bodySmall" style={{ color: c.onSurfaceVariant }}>
              {user?.email ?? 'demo@pstcoaching.app'}
            </PText>
          </View>
          <PChip compact>{subscription?.status ?? 'aktif'}</PChip>
        </View>
        <PButton
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          accessibilityLabel="Hesap bilgilerini düzenle"
          onPress={() => navigation.navigate('ProfileAccount')}
        >
          Hesap Bilgileri
        </PButton>
      </SectionCard>

      <SectionCard title="Abonelik" actionLabel="Planlar">
        {subscription && (subscription.status === 'active' || subscription.status === 'trial') ? (
          <PCard style={styles.card}>
            <PCard.Title title={plan?.name ?? 'Plan'} subtitle={subscription?.renewal_at?.slice(0, 10)} />
            <PCard.Content>
              <PText variant="bodySmall" style={{ color: c.onSurfaceVariant }}>
                {plan?.seat_limit ?? 1} koltuk · Premium içerikler açık
              </PText>
            </PCard.Content>
            <PCard.Actions>
              <PButton
                mode="contained"
                disabled={isOffline}
                accessibilityLabel="Abonelik planını yönet"
                onPress={() => {
                  trackCtaTap('profile.overview', 'manage_plan_tapped');
                  navigation.navigate('ProfileSubscription');
                }}
              >
                Planı Yönet
              </PButton>
            </PCard.Actions>
          </PCard>
        ) : (
          <PCard style={[styles.card, styles.upgradeCard]}>
            <PCard.Title title="Premium'a Yükselt" subtitle="İçeriklerin tümüne erişim sağla" />
            <PCard.Content>
              <PText variant="bodySmall" style={{ color: c.onSurfaceVariant }}>
                Koçluk seansları, e-kitaplar ve video içeriklerin tamamına anında eriş.
              </PText>
            </PCard.Content>
            <PCard.Actions>
              <PButton
                mode="contained"
                disabled={isOffline}
                accessibilityLabel="Premium abonelik planı seç"
                accessibilityHint="Abonelik planlarını görüntüler"
                onPress={() => {
                  trackCtaTap('profile.overview', 'upgrade_cta_tapped');
                  navigation.navigate('ProfileSubscription');
                }}
              >
                Plan Seç
              </PButton>
            </PCard.Actions>
          </PCard>
        )}
      </SectionCard>

      <SectionCard title="Hızlı Ayarlar" actionLabel="">
        <PListItem
          title="Dil"
          description={user?.language?.toUpperCase() ?? 'TR'}
          left={props => <PListIcon {...props} icon="translate" />}
          accessibilityLabel={`Dil: ${user?.language?.toUpperCase() ?? 'TR'}`}
          accessibilityHint="Uygulama dilini değiştirir"
          onPress={() => navigation.navigate('ProfileLanguage')}
        />
        <PDivider />
        <PListItem
          title="Hatırlatmalar"
          description="Haftada 3 gün"
          left={props => <PListIcon {...props} icon="bell-outline" />}
          accessibilityLabel="Hatırlatmalar: Haftada 3 gün"
          accessibilityHint="Hatırlatma zamanlarını ayarlar"
          onPress={() => navigation.navigate('ProfileReminders')}
        />
        <PDivider />
        <PListItem
          title="Erişilebilirlik"
          description="Dinamik yazı tipi"
          left={props => <PListIcon {...props} icon="human-handsup" />}
          accessibilityLabel="Erişilebilirlik: Dinamik yazı tipi"
          accessibilityHint="Erişilebilirlik ayarlarını düzenler"
          onPress={() => navigation.navigate('ProfileAccessibility')}
        />
      </SectionCard>

      <SectionCard title="Ödeme Geçmişi" actionLabel="Tümü">
        {payments.map(payment => (
          <View key={payment.id} style={styles.paymentRow}>
            <PText variant="bodyMedium">{payment.purchased_at.slice(0, 10)}</PText>
            <PText variant="bodyMedium" style={{ color: c.onSurfaceVariant }}>
              {payment.amount} {payment.currency}
            </PText>
          </View>
        ))}
        <PButton
          mode="text"
          disabled={isOffline}
          accessibilityLabel="Tüm ödeme geçmişini görüntüle"
          onPress={() => navigation.navigate('ProfilePaymentHistory')}
        >
          Tümünü Gör
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileOverviewScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);
  const navigation = useNavigation<any>();

  if (state === 'loading') {
    return (
      <ScreenLayout title="Profil" subtitle="Bilgiler hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Ayarlar">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Profil" subtitle="Kişisel bilgilerin">
        <StateMessage
          title="Profil bilgileri eksik"
          description="Hesabını tamamlamak için bilgilerini ekleyebilirsin."
          actionLabel="Profilini Tamamla"
          onAction={() => navigation.navigate('ProfileAccount')}
          icon="account-edit-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Profil" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Profil yüklenemedi"
          description="Bilgileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          onAction={() => navigation.setParams({ state: undefined })}
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Profil" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <ProfileReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Profil" subtitle="Hesabını yönet">
      <ProfileReadyContent />
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
      flex: 1,
      marginLeft: 12
    },
    actionButton: {
      marginTop: spacing[1.5],
      alignSelf: 'flex-start'
    },
    card: {
      marginBottom: spacing[1]
    },
    upgradeCard: {
      borderWidth: 1.5,
      borderColor: c.primary
    },
    paymentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing[1]
    }
  });
}
