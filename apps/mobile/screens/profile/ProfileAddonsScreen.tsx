import React, { useMemo } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { PButton, PCard, PChip, PText } from '../../components';
import {
  getAddOns,
  getAddOnsForSubscription,
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

/** Mock pricing per add-on code */
const ADDON_PRICING: Record<string, string> = {
  ai_package: '49,99 TL / ay',
  extra_seat: '29,99 TL / kisi'
};

/** Human-readable descriptions per code */
const ADDON_DESCRIPTIONS: Record<string, string> = {
  ai_package: 'Yapay zeka destekli icerik onerileri ve kisisel gelisim asistani',
  extra_seat: 'Aile veya grup planina ek kisi ekle'
};

/** AC-FR-E3-03-03: Ek Kisi only for family/group */
const EXTRA_SEAT_PLANS = ['family', 'group'];

/** Mock user role - owner vs member */
const MOCK_USER_ROLE: 'owner' | 'member' = 'owner';

const ProfileAddonsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const activeAddons = getAddOnsForSubscription(subscription?.id);

  // AC-FR-E3-03-03: filter extra_seat for non-Aile/Grup plans
  const visibleAddons = getAddOns().filter(addon => {
    if (addon.code === 'extra_seat' && !EXTRA_SEAT_PLANS.includes(plan?.plan_type ?? '')) {
      return false;
    }
    return true;
  });

  const addonItems = visibleAddons.map(addon => ({
    id: addon.id,
    name: addon.name,
    code: addon.code,
    description: ADDON_DESCRIPTIONS[addon.code] ?? addon.code,
    price: ADDON_PRICING[addon.code] ?? '-',
    isActive: activeAddons.some(a => a.id === addon.id)
  }));

  // AC-FR-E3-03-04: only owner can toggle add-ons
  const isOwner = MOCK_USER_ROLE === 'owner';

  const handleToggle = (name: string, isActive: boolean) => {
    if (!isOwner) {
      // analytics: addon_owner_gate_blocked (stub)
      Alert.alert('Yetki Gerekli', 'Add-on yonetimi yalnizca Plan Sahibi tarafindan yapilabilir.');
      return;
    }
    if (isOffline) return;
    Alert.alert(
      isActive ? 'Add-on Kapat' : 'Add-on Etkinlestir',
      `"${name}" ${isActive ? 'kapatilacak' : 'etkinlestirilecek'}. (Sahte ortamda simule edildi)`
    );
  };

  return (
    <>
      {/* AC-FR-E3-03-04: role banner for members */}
      {!isOwner && (
        <View style={styles.roleBanner}>
          <PText variant="bodySmall" style={styles.roleBannerText}>
            Add-on yonetimi yalnizca Plan Sahibi icin aktiftir. Siz sadece goruntuleme yapabilirsiniz.
          </PText>
        </View>
      )}

      <SectionCard title="Add-on Paketleri">
        {addonItems.map(addon => (
          <PCard key={addon.id} style={styles.card}>
            <PCard.Title title={addon.name} subtitle={addon.description} />
            <PCard.Content>
              <View style={styles.cardRow}>
                {/* AC-FR-E3-03-01: price shown */}
                <PText variant="bodySmall" style={styles.priceText}>
                  {addon.price}
                </PText>
                <PChip compact style={addon.isActive ? styles.chipActive : styles.chipPassive}>
                  {addon.isActive ? 'Aktif' : 'Pasif'}
                </PChip>
              </View>
            </PCard.Content>
            <PCard.Actions>
              {/* AC-FR-E3-03-02: activate/deactivate */}
              <PButton
                mode={addon.isActive ? 'outlined' : 'contained'}
                disabled={isOffline || !isOwner}
                onPress={() => handleToggle(addon.name, addon.isActive)}
                accessibilityLabel={addon.isActive ? `${addon.name} kapat` : `${addon.name} satin al ve etkinlestir`}
                accessibilityRole="button"
              >
                {addon.isActive ? 'Kapat' : 'Satin Al'}
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Paket Avantajlari">
        <PText variant="bodySmall" style={styles.benefit}>
          Ozel icerik paketlerine eris ve kisisel gelisimini hizlandir
        </PText>
        <PText variant="bodySmall" style={styles.benefit}>
          Takim uyeleri icin ekstra icerik ve raporlar
        </PText>
        <PText variant="bodySmall" style={styles.benefit}>
          Aylik bildirim raporlari ve ilerleme ozetleri
        </PText>
        <PButton
          mode="outlined"
          style={styles.exploreButton}
          disabled={isOffline}
          accessibilityLabel="Yeni paketleri incele"
          accessibilityRole="button"
        >
          Yeni Paketleri Incele
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileAddonsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Add-on Yonetimi" subtitle="Add-onlar hazirlaniyor">
        <SectionCard title="Paketler">
          <SkeletonBlock height={100} />
          <SkeletonBlock height={100} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Add-on Yonetimi" subtitle="Paketler">
        <StateMessage
          title="Add-on bulunamadi"
          description="Su anda aktif add-on paketin yok."
          actionLabel="Paketleri Gor"
          icon="puzzle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Add-on Yonetimi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Add-onlar yuklenemedi"
          description="Paketleri getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Add-on Yonetimi" subtitle="Onbellekteki paketler">
        <OfflineNotice />
        <ProfileAddonsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Add-on Yonetimi" subtitle="Eklentilerini yonet">
      <ProfileAddonsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    roleBanner: {
      backgroundColor: c.warningContainer,
      borderRadius: radii.md,
      padding: spacing[1.5],
      marginBottom: spacing[1]
    },
    roleBannerText: {
      color: '#92400E'
    },
    card: {
      marginBottom: spacing[1.5]
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    priceText: {
      color: c.textBrand,
      fontWeight: fontWeights.bold
    },
    chipActive: {
      backgroundColor: palette.emerald50
    },
    chipPassive: {
      backgroundColor: '#F3F4F6'
    },
    benefit: {
      color: '#374151',
      marginBottom: 6,
      lineHeight: 20
    },
    exploreButton: {
      marginTop: spacing[1],
      minHeight: 44
    }
  });
}
