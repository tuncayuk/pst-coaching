import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PButton, PCard, PChip, PDivider, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getPrimaryUser, getSubscriptionForUser, getSubscriptionPlans } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

/** Mock plan pricing - in real app from subscription plan entity */
const PLAN_PRICES: Record<string, { monthly: string; yearly: string }> = {
  individual: { monthly: '19,99 TL / ay', yearly: '199,99 TL / yil' },
  family: { monthly: '29,99 TL / ay', yearly: '249,99 TL / yil' },
  group: { monthly: '39,99 TL / ay', yearly: '449,99 TL / yil' }
};

/** AC-FR-E3-01-02: feature comparison for each plan */
const PLAN_FEATURES: Record<string, string[]> = {
  individual: ['Tum iceriklere erisim', 'Offline indirme', 'Kisisel ilerleme takibi'],
  family: ['Tum iceriklere erisim', 'Offline indirme', '5 kullanici hesabi', 'Aile paylasim ekrani'],
  group: ['Tum iceriklere erisim', 'Offline indirme', '10 kullanici hesabi', 'Takim raporu', 'Koc paneli']
};

const PLAN_TYPE_LABELS: Record<string, string> = {
  individual: 'Bireysel',
  family: 'Aile',
  group: 'Grup'
};

const ProfilePlanComparisonContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const plans = getSubscriptionPlans();
  const user = getPrimaryUser();
  const currentSubscription = getSubscriptionForUser(user?.id);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    currentSubscription?.plan_id ?? plans[0]?.id ?? null
  );

  const handleSelectPlan = (planId: string) => {
    if (isOffline) return;
    setSelectedPlanId(planId);
    // analytics: plan_card_selected
  };

  const handleContinue = () => {
    if (!selectedPlanId || isOffline) return;
    // analytics: plan_comparison_continue_tapped
    navigation.navigate('ProfileCheckout');
  };

  return (
    <>
      <SectionCard title="Planlari Karsilastir">
        {/* AC-FR-E3-01-01: Bireysel/Aile/Grup with seat limits */}
        {plans.map(plan => {
          const isSelected = plan.id === selectedPlanId;
          const isCurrent = plan.id === currentSubscription?.plan_id;
          const prices = PLAN_PRICES[plan.plan_type] ?? { monthly: '-', yearly: '-' };
          const features = PLAN_FEATURES[plan.plan_type] ?? [];

          return (
            <TouchableOpacity
              key={plan.id}
              onPress={() => handleSelectPlan(plan.id)}
              activeOpacity={0.85}
              accessibilityLabel={`${plan.name} planini sec, ${plan.seat_limit} kisi, ${prices.monthly}`}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              style={[styles.planCard, isSelected && styles.planCardSelected]}
            >
              {/* AC-FR-E3-01-03: selected plan visually highlighted */}
              <View style={styles.planHeader}>
                <View>
                  <PText variant="titleMedium" style={styles.planName}>
                    {plan.name}
                  </PText>
                  <PText variant="bodySmall" style={styles.planType}>
                    {PLAN_TYPE_LABELS[plan.plan_type] ?? plan.plan_type} - {plan.seat_limit} kisi
                  </PText>
                </View>
                <View style={styles.planBadges}>
                  {isCurrent && (
                    <PChip compact style={styles.currentChip}>
                      Mevcut Plan
                    </PChip>
                  )}
                  {isSelected && (
                    <View style={styles.checkBadge}>
                      <PText style={styles.checkText}>OK</PText>
                    </View>
                  )}
                </View>
              </View>

              {/* AC-FR-E3-01-02: feature differences */}
              <PDivider style={styles.planDivider} />
              <PText variant="bodyMedium" style={styles.priceText}>
                {prices.monthly}
              </PText>
              <PText variant="bodySmall" style={styles.priceAlt}>
                {prices.yearly}
              </PText>
              <View style={styles.featureList}>
                {features.map(f => (
                  <PText key={f} variant="bodySmall" style={styles.featureItem}>
                    {f}
                  </PText>
                ))}
              </View>

              <PButton
                mode={isSelected ? 'contained' : 'outlined'}
                disabled={isOffline}
                onPress={() => handleSelectPlan(plan.id)}
                style={styles.selectButton}
                accessibilityLabel={isSelected ? `${plan.name} secildi` : `${plan.name} planini sec`}
                accessibilityRole="button"
              >
                {isSelected ? 'Secildi' : 'Bu Plani Sec'}
              </PButton>
            </TouchableOpacity>
          );
        })}
      </SectionCard>

      <SectionCard title="">
        <PButton
          mode="contained"
          disabled={isOffline || !selectedPlanId}
          onPress={handleContinue}
          style={styles.continueButton}
          accessibilityLabel="Secilen planla devam et"
          accessibilityRole="button"
        >
          Devam Et
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfilePlanComparisonScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Plan Karsilastirma" subtitle="Planlar hazirlaniyor">
        <SectionCard title="Planlar">
          <SkeletonBlock height={160} />
          <SkeletonBlock height={160} />
          <SkeletonBlock height={160} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Plan Karsilastirma" subtitle="Plan bulunamadi">
        <StateMessage
          title="Plan bulunamadi"
          description="Plan listesi su anda eriselebilir degil."
          actionLabel="Tekrar Dene"
          icon="clipboard-list-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Plan Karsilastirma" subtitle="Bir sorun olustu">
        <StateMessage
          title="Planlar yuklenemedi"
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
      <ScreenLayout title="Plan Karsilastirma" subtitle="Onbellekteki planlar">
        <OfflineNotice />
        <ProfilePlanComparisonContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Plan Karsilastirma" subtitle="Planlari karsilastir ve sec">
      <ProfilePlanComparisonContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    planCard: {
      borderWidth: 2,
      borderColor: c.outline,
      borderRadius: radii.lg,
      padding: spacing[2],
      marginBottom: spacing[1.5],
      backgroundColor: c.surface
    },
    planCardSelected: {
      borderColor: '#7C3AED',
      backgroundColor: '#FAF5FF'
    },
    planHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4
    },
    planName: {
      fontWeight: fontWeights.bold,
      color: '#1F2937'
    },
    planType: {
      color: c.textTertiary,
      marginTop: 2
    },
    planBadges: {
      alignItems: 'flex-end',
      gap: 4
    },
    currentChip: {
      backgroundColor: c.secondaryContainer
    },
    checkBadge: {
      backgroundColor: '#7C3AED',
      borderRadius: radii.md,
      paddingHorizontal: spacing[1],
      paddingVertical: 2
    },
    checkText: {
      color: palette.white,
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold
    },
    planDivider: {
      marginVertical: 8
    },
    priceText: {
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: 2
    },
    priceAlt: {
      color: c.textTertiary,
      marginBottom: spacing[1]
    },
    featureList: {
      gap: 4,
      marginBottom: spacing[1.5]
    },
    featureItem: {
      color: '#374151'
    },
    selectButton: {
      minHeight: 44
    },
    continueButton: {
      minHeight: 48
    }
  });
}
