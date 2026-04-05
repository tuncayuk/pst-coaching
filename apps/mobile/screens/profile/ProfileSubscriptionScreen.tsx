import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PButton, PCard, PChip, PDivider, PListIcon, PListItem, PProgressBar, PText } from '../../components';
import {
  getAddOnsForSubscription,
  getPlanForSubscription,
  getPrimaryUser,
  getSeatsForSubscription,
  getSubscriptionForUser
} from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const STATUS_CONFIG = {
  active: { label: 'Aktif', bg: '#D1FAE5', text: '#065F46' },
  trial: { label: 'Deneme', bg: '#FEF3C7', text: '#92400E' },
  cancelled: { label: 'Iptal Edilmis', bg: '#FEE2E2', text: '#991B1B' }
};

const BENEFITS = ['Sinirsiz icerik erisimi', 'Offline indirme', 'Aile paylasimi'];

const ProfileSubscriptionContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const addOns = getAddOnsForSubscription(subscription?.id);
  const seats = getSeatsForSubscription(subscription?.id);
  const activeSeats = seats.filter(s => s.status === 'active').length;
  const seatLimit = plan?.seat_limit ?? 1;
  const seatFill = seatLimit > 0 ? activeSeats / seatLimit : 0;
  const statusKey = (subscription?.status as keyof typeof STATUS_CONFIG) ?? 'active';
  const statusCfg = STATUS_CONFIG[statusKey] ?? STATUS_CONFIG.active;

  return (
    <>
      {/* Plan summary card - FR-E3-05 AC-FR-E3-05-01 entry point */}
      <SectionCard title="Abonelik Plani">
        <PCard style={styles.card}>
          <PCard.Title
            title={plan?.name ?? 'Plan'}
            subtitle={`Yenileme: ${subscription?.renewal_at?.slice(0, 10) ?? '-'}`}
          />
          <PCard.Content>
            <View style={styles.row}>
              <View
                style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}
                accessibilityLabel={`Plan durumu: ${statusCfg.label}`}
                accessibilityRole="text"
              >
                <PText style={[styles.statusText, { color: statusCfg.text }]}>{statusCfg.label}</PText>
              </View>
              <PText variant="bodySmall" style={styles.seatCount}>
                {activeSeats} / {seatLimit} koltuk
              </PText>
            </View>
            <PProgressBar
              progress={seatFill}
              style={styles.seatBar}
              accessibilityLabel={`${activeSeats} / ${seatLimit} koltuk doldu`}
            />
            <View style={styles.benefitList}>
              {BENEFITS.map(b => (
                <PText key={b} variant="bodySmall" style={styles.benefit}>
                  {b}
                </PText>
              ))}
            </View>
          </PCard.Content>
          <PCard.Actions>
            {/* Navigates to FR-E3-05 Plan Management (not comparison) */}
            <PButton
              mode="contained"
              disabled={isOffline}
              onPress={() => navigation.navigate('ProfilePlanManagement')}
              accessibilityLabel="Planini yonet, degistir veya iptal et"
              accessibilityRole="button"
            >
              Plani Yonet
            </PButton>
            <PButton
              mode="outlined"
              disabled={isOffline}
              onPress={() => navigation.navigate('ProfilePlanComparison')}
              accessibilityLabel="Planlari karsilastir"
              accessibilityRole="button"
            >
              Planlari Karsilastir
            </PButton>
          </PCard.Actions>
        </PCard>
      </SectionCard>

      {/* Subscription features hub - FR-E3-03, FR-E3-06, FR-E3-04 */}
      <SectionCard title="Ozellikler ve Yonetim">
        <PListItem
          title="Add-on Yonetimi"
          description={`${addOns.length} aktif eklenti`}
          left={props => <PListIcon {...props} icon="puzzle" />}
          onPress={() => !isOffline && navigation.navigate('ProfileAddons')}
          accessibilityLabel="Add-on paketlerini yonet"
          accessibilityRole="button"
        />
        <PDivider />
        <PListItem
          title="Kisi Yonetimi"
          description={`${activeSeats} / ${seatLimit} koltuk dolu`}
          left={props => <PListIcon {...props} icon="account-multiple" />}
          onPress={() => !isOffline && navigation.navigate('ProfileSeatManagement')}
          accessibilityLabel="Plandaki kisileri yonet"
          accessibilityRole="button"
        />
        <PDivider />
        <PListItem
          title="Ogrenci Indirimi"
          description="Uygunluk kontrolu ve dogrulama"
          left={props => <PListIcon {...props} icon="school-outline" />}
          onPress={() => !isOffline && navigation.navigate('ProfileStudentDiscount')}
          accessibilityLabel="Ogrenci indirim dogrulamasina git"
          accessibilityRole="button"
        />
      </SectionCard>

      {/* Purchase actions - FR-E3-02, FR-E3-07 */}
      <SectionCard title="Satin Alma ve Gecmis">
        <PButton
          mode="contained-tonal"
          disabled={isOffline}
          onPress={() => navigation.navigate('ProfilePlanComparison')}
          style={styles.actionButton}
          accessibilityLabel="Yeni plan secip satin al"
          accessibilityRole="button"
        >
          Yeni Plan Satin Al
        </PButton>
        <PButton
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          onPress={() => navigation.navigate('ProfileRestorePurchases')}
          accessibilityLabel="Onceki satin alimlari geri yukle"
          accessibilityRole="button"
        >
          Satin Alimlari Geri Yukle
        </PButton>
        <PButton
          mode="text"
          disabled={isOffline}
          onPress={() => navigation.navigate('ProfilePaymentHistory')}
          accessibilityLabel="Odeme gecmisini goruntule"
          accessibilityRole="button"
        >
          Odeme Gecmisi
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileSubscriptionScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Plan bilgileri hazirlaniyor">
        <SectionCard title="Plan">
          <SkeletonBlock height={140} />
        </SectionCard>
        <SectionCard title="Ozellikler">
          <SkeletonBlock height={56} />
          <SkeletonBlock height={56} />
          <SkeletonBlock height={56} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Plan bilgileri">
        <StateMessage
          title="Aktif abonelik bulunamadi"
          description="Henuz aktif bir planin yok. Planlari inceleyebilirsin."
          actionLabel="Planlari Gor"
          icon="calendar-plus"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Bir sorun olustu">
        <StateMessage
          title="Abonelik yuklenemedi"
          description="Plan bilgilerini getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Onbellekteki plan">
        <OfflineNotice />
        <ProfileSubscriptionContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Abonelik" subtitle="Planini yonet">
      <ProfileSubscriptionContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 8
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700'
  },
  seatCount: {
    color: '#6B7280'
  },
  seatBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 12
  },
  benefitList: {
    gap: 4
  },
  benefit: {
    color: '#374151'
  },
  actionButton: {
    marginBottom: 8,
    minHeight: 48
  }
});
