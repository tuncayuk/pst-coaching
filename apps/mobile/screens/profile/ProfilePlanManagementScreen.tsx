import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { PButton, PCard, PChip, PDivider, PProgressBar, PText } from '../../components';
import {
  getPlanForSubscription,
  getPrimaryUser,
  getSeatsForSubscription,
  getSubscriptionForUser
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

/** AC-FR-E3-05-03: cancellation effects listed clearly */
const CANCELLATION_EFFECTS = [
  'Tum icerikler ve kisisel ilerleme kaydi korunur',
  'Donem sonuna kadar erisim devam eder',
  'Yenileme tarihi gecince erisim sonlanir',
  'Iptal sonrasi veriler 90 gun saklanir'
];

const PLAN_PRICES: Record<string, string> = {
  individual: '19,99 TL / ay',
  family: '29,99 TL / ay',
  group: '39,99 TL / ay'
};

const ProfilePlanManagementContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const [cancelExpanded, setCancelExpanded] = useState(false);

  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const seats = getSeatsForSubscription(subscription?.id);
  const activeSeats = seats.filter(s => s.status === 'active').length;
  const seatLimit = plan?.seat_limit ?? 1;
  // AC-FR-E3-05-01: show renewal date and seat usage
  const renewalDate = subscription?.renewal_at?.slice(0, 10) ?? '-';
  const seatFill = seatLimit > 0 ? activeSeats / seatLimit : 0;

  // AC-FR-E3-05-05: redirect to platform cancel flow
  const handleCancelPlan = () => {
    if (isOffline) return;
    // AC-FR-E3-05-03: show effects before confirming
    Alert.alert(
      'Plani Iptal Et',
      'Iptal ederseniz donem sonuna kadar erisim devam eder. Devam etmek istiyor musunuz?',
      [
        { text: 'Vazgec', style: 'cancel' },
        {
          text: 'Magaza Iptal Ekranina Git',
          style: 'destructive',
          onPress: () => {
            // AC-FR-E3-05-05: in real app open platform cancel URL (App Store / Play Store)
            Alert.alert('Bilgi', 'Magaza iptal akisina yonlendiriliyorsunuz. (Sahte ortamda simule edildi)');
          }
        }
      ]
    );
  };

  const handleChangePlan = () => {
    if (isOffline) return;
    // AC-FR-E3-05-02: navigate to plan comparison; downgrade check happens there
    navigation.navigate('ProfilePlanComparison');
  };

  return (
    <>
      {/* AC-FR-E3-05-01: current plan summary */}
      <SectionCard title="Mevcut Plan">
        <PCard style={styles.card}>
          <PCard.Title title={plan?.name ?? 'Plan'} subtitle={`Yenileme: ${renewalDate}`} />
          <PCard.Content>
            <View style={styles.row}>
              <PChip
                compact
                style={[
                  styles.statusChip,
                  subscription?.status === 'active' && styles.chipActive,
                  subscription?.status === 'trial' && styles.chipTrial,
                  subscription?.status === 'cancelled' && styles.chipCancelled
                ]}
              >
                {subscription?.status === 'active'
                  ? 'Aktif'
                  : subscription?.status === 'trial'
                    ? 'Deneme'
                    : 'Iptal Edilmis'}
              </PChip>
              <PText variant="bodySmall" style={styles.priceLabel}>
                {PLAN_PRICES[plan?.plan_type ?? 'individual']}
              </PText>
            </View>
            {/* AC-FR-E3-05-01: seat usage */}
            <View style={styles.seatRow}>
              <PText variant="bodySmall">
                Koltuk: {activeSeats} / {seatLimit}
              </PText>
            </View>
            <PProgressBar
              progress={seatFill}
              style={styles.seatBar}
              accessibilityLabel={`${activeSeats} / ${seatLimit} koltuk kullaniliyor`}
            />
          </PCard.Content>
        </PCard>
      </SectionCard>

      {/* AC-FR-E3-05-02: change plan CTA */}
      <SectionCard title="Plan Degistir">
        <PText variant="bodySmall" style={styles.infoText}>
          Mevcut planini yukseltebilir veya dusuk bir plana gecebilirsin. Plan dusururken kisi limiti kontrolu yapilir.
        </PText>
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={handleChangePlan}
          style={styles.actionButton}
          accessibilityLabel="Farkli bir plana gec"
          accessibilityRole="button"
        >
          Plan Degistir
        </PButton>
      </SectionCard>

      {/* AC-FR-E3-05-03/04/05: cancellation section */}
      <SectionCard title="Aboneligi Iptal Et">
        <PButton
          mode="text"
          onPress={() => setCancelExpanded(v => !v)}
          style={styles.expandButton}
          accessibilityLabel="Iptal etkilerini goster"
          accessibilityRole="button"
        >
          {cancelExpanded ? 'Etkileri Gizle' : 'Iptal Etkilerini Goster'}
        </PButton>
        {cancelExpanded && (
          <View style={styles.effectsList}>
            {CANCELLATION_EFFECTS.map((effect, idx) => (
              <View key={idx} style={styles.effectRow}>
                <PText variant="bodySmall" style={styles.effectBullet}>
                  {idx + 1}.
                </PText>
                <PText variant="bodySmall" style={styles.effectText}>
                  {effect}
                </PText>
              </View>
            ))}
            {/* AC-FR-E3-05-04: access continues until period end */}
            <View style={styles.accessNote}>
              <PText variant="bodySmall" style={styles.accessNoteText}>
                Erisim {renewalDate} tarihine kadar devam eder.
              </PText>
            </View>
          </View>
        )}
        <PDivider style={styles.divider} />
        <PButton
          mode="outlined"
          disabled={isOffline || subscription?.status === 'cancelled'}
          onPress={handleCancelPlan}
          style={styles.cancelButton}
          accessibilityLabel="Aboneligi iptal et ve magaza iptal ekranina git"
          accessibilityRole="button"
        >
          {subscription?.status === 'cancelled' ? 'Zaten Iptal Edildi' : 'Aboneligi Iptal Et'}
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfilePlanManagementScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Plan Yonetimi" subtitle="Plan detaylari hazirlaniyor">
        <SectionCard title="Yuklenyor">
          <SkeletonBlock height={120} />
        </SectionCard>
        <SectionCard title="Islemler">
          <SkeletonBlock height={48} />
          <SkeletonBlock height={48} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Plan Yonetimi" subtitle="Aktif plan yok">
        <StateMessage
          title="Aktif abonelik bulunamadi"
          description="Bir plan secip abone olabilirsin."
          actionLabel="Planlari Gor"
          icon="credit-card-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Plan Yonetimi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Plan detaylari yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Plan Yonetimi" subtitle="Onbellekteki plan">
        <OfflineNotice />
        <ProfilePlanManagementContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Plan Yonetimi" subtitle="Planini degistir veya iptal et">
      <ProfilePlanManagementContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      marginBottom: spacing[1]
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[1]
    },
    statusChip: {
      alignSelf: 'flex-start'
    },
    chipActive: {
      backgroundColor: palette.emerald50
    },
    chipTrial: {
      backgroundColor: c.warningContainer
    },
    chipCancelled: {
      backgroundColor: palette.red50
    },
    priceLabel: {
      color: c.textTertiary
    },
    seatRow: {
      marginBottom: 4
    },
    seatBar: {
      height: 6,
      borderRadius: 3
    },
    infoText: {
      color: c.textTertiary,
      marginBottom: spacing[1.5],
      lineHeight: 20
    },
    actionButton: {
      marginBottom: 4,
      minHeight: 48
    },
    expandButton: {
      alignSelf: 'flex-start',
      marginBottom: 4
    },
    effectsList: {
      marginTop: spacing[1],
      marginBottom: spacing[1],
      paddingHorizontal: 4
    },
    effectRow: {
      flexDirection: 'row',
      marginBottom: 6,
      gap: 6
    },
    effectBullet: {
      color: '#7C3AED',
      fontWeight: fontWeights.bold,
      minWidth: 16
    },
    effectText: {
      flex: 1,
      color: '#374151',
      lineHeight: 18
    },
    accessNote: {
      marginTop: spacing[1],
      backgroundColor: palette.purple50,
      borderRadius: radii.md,
      padding: 10
    },
    accessNoteText: {
      color: '#4C1D95'
    },
    divider: {
      marginVertical: 12
    },
    cancelButton: {
      minHeight: 48
    }
  });
}
