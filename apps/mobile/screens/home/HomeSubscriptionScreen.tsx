import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PDivider, PText } from '../../components';
import {
  getAddOnCatalogWithStatusForSubscription,
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

/** AC-FR-E2-02-01: Subscription status types */
type SubscriptionStatus = 'active' | 'trial' | 'cancelled';

const STATUS_CONFIG: Record<SubscriptionStatus, { label: string; bg: string; text: string; borderColor: string }> = {
  active: { label: 'Aktif', bg: '#D1FAE5', text: '#065F46', borderColor: '#34D399' },
  trial: { label: 'Deneme', bg: '#FEF3C7', text: '#92400E', borderColor: '#FCD34D' },
  cancelled: { label: 'Iptal', bg: '#FEE2E2', text: '#991B1B', borderColor: '#FCA5A5' }
};

const TR_MONTHS = ['Ocak','Subat','Mart','Nisan','Mayis','Haziran','Temmuz','Agustos','Eylul','Ekim','Kasim','Aralik'];
function formatRenewalDate(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getDate()} ${TR_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

const HomeSubscriptionContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const rawStatus = subscription?.status ?? 'active';
  const status: SubscriptionStatus = (rawStatus === 'canceled' ? 'cancelled' : rawStatus) as SubscriptionStatus;
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.active;
  const renewalDate = formatRenewalDate(subscription?.renewal_at);
  const planName = (plan as any)?.name ?? (plan as any)?.plan_type ?? 'PST Premium';
  const addons = getAddOnCatalogWithStatusForSubscription(subscription?.id);

  return (
    <>
      {/* AC-FR-E2-02-01: Plan status badge + details */}
      <SectionCard title="Plan Bilgisi">
        <View style={styles.planHeader}>
          <View
            style={[styles.statusBadge, { backgroundColor: config.bg, borderColor: config.borderColor }]}
            accessibilityLabel={`Plan durumu: ${config.label}`}
            accessibilityRole="text"
          >
            <PText style={[styles.statusBadgeText, { color: config.text }]}>{config.label}</PText>
          </View>
          <View style={styles.planInfo}>
            <PText style={styles.planName}>{planName}</PText>
            <PText style={styles.planRenewal}>Yenileme: {renewalDate}</PText>
          </View>
        </View>
        <PDivider style={styles.divider} />
        <PButton
          mode="outlined"
          style={styles.manageButton}
          disabled={isOffline}
          onPress={() => navigation.navigate('Subscription', { screen: 'SubscriptionPlanSelect' })}
          accessibilityLabel="Plani yonet veya yukselt"
          accessibilityHint="Abonelik ekranina gider"
        >
          Plani Yonet
        </PButton>
      </SectionCard>

      {/* AC-FR-E2-02-02: Active add-ons list */}
      <SectionCard title="Aktif Ek Paketler">
        {addons.map(addon => (
          <PCard key={addon.id} style={styles.addonCard}>
            <View style={styles.addonRow}>
              <PText style={styles.addonName}>{addon.name}</PText>
              <PChip
                compact
                style={addon.active ? styles.addonActiveChip : styles.addonInactiveChip}
                accessibilityLabel={`${addon.name}: ${addon.active ? 'aktif' : 'pasif'}`}
              >
                {addon.active ? 'Aktif' : 'Pasif'}
              </PChip>
            </View>
          </PCard>
        ))}
        {!isOffline && (
          <PButton
            mode="text"
            style={styles.upgradeButton}
            onPress={() => navigation.navigate('Subscription', { screen: 'SubscriptionPlanSelect' })}
            accessibilityLabel="Yeni paket ekle"
          >
            + Paket Ekle
          </PButton>
        )}
      </SectionCard>

      {/* AC-FR-E2-02-03: Paywall explanation hint */}
      <SectionCard title="Kisitli Icerik Hakkinda">
        <PCard style={styles.paywallInfoCard}>
          <PText style={styles.paywallInfoText}>
            Kilitli iceriklere tikladiginizda neden erisemediginiz ve nasil erisebileceginiz aciklanir. Hicbir icerik
            gizlice kilitlenmez.
          </PText>
        </PCard>
      </SectionCard>
    </>
  );
};

export const HomeSubscriptionScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Plan bilgisi yukleniyor">
        <SectionCard title="Plan">
          <PActivityIndicator animating />
          <SkeletonBlock height={56} />
        </SectionCard>
        <SectionCard title="Ek Paketler">
          <SkeletonBlock height={48} />
          <SkeletonBlock height={48} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Plan bulunamadi">
        <StateMessage
          title="Aktif abonelik yok"
          description="Hemen bir plana katilarak tum iceriklere erisebilirsin."
          actionLabel="Planlara Bak"
          icon="crown-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Bir sorun olustu">
        <StateMessage
          title="Abonelik bilgisi yuklenemedi"
          description="Baglantiyi kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Abonelik" subtitle="Onbellekteki plan bilgisi">
        <OfflineNotice />
        <HomeSubscriptionContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Abonelik" subtitle="Plan ve ek paketlerin">
      <HomeSubscriptionContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    planHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    statusBadge: {
      paddingHorizontal: spacing[1.5],
      paddingVertical: 6,
      borderRadius: radii.full,
      borderWidth: 1.5,
      alignSelf: 'flex-start'
    },
    statusBadgeText: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold
    },
    planInfo: {
      flex: 1
    },
    planName: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 2
    },
    planRenewal: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    },
    divider: {
      marginBottom: spacing[1.5]
    },
    manageButton: {
      alignSelf: 'flex-start',
      minHeight: 48
    },
    addonCard: {
      marginBottom: spacing[1],
      padding: spacing[1.5]
    },
    addonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    addonName: {
      fontSize: fontSizes.lg,
      color: c.textPrimary,
      flex: 1,
      marginRight: 8
    },
    addonActiveChip: {
      backgroundColor: c.tertiaryContainer
    },
    addonInactiveChip: {
      backgroundColor: c.surfaceVariant
    },
    upgradeButton: {
      marginTop: 4,
      alignSelf: 'flex-start',
      minHeight: 48
    },
    paywallInfoCard: {
      backgroundColor: '#F0F9FF',
      borderLeftWidth: 4,
      borderLeftColor: c.primary,
      padding: 14
    },
    paywallInfoText: {
      fontSize: fontSizes.md,
      color: '#0C4A6E',
      lineHeight: 20
    }
  });
}
