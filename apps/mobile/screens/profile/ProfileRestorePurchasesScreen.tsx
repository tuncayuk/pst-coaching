import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { PButton, PCard, PChip, PText } from '../../components';
import { getPaymentsForSubscription, getPrimaryUser, getSubscriptionForUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ProfileRestorePurchasesContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [restoring, setRestoring] = useState(false);

  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  // AC-FR-E3-07-02: recent transactions from real mock data
  const transactions = getPaymentsForSubscription(subscription?.id);

  // AC-FR-E3-07-02: trigger platform restore
  const handleRestore = () => {
    if (isOffline) return;
    setRestoring(true);
    // analytics: restore_purchases_tapped (stub)
    setTimeout(() => {
      setRestoring(false);
      Alert.alert(
        'Geri Yukleme Tamamlandi',
        'Satin alimlariniz dogrulandi ve aboneliginiz aktiflestirildi. (Sahte ortamda simule edildi)',
        [{ text: 'Tamam' }]
      );
    }, 1500);
  };

  return (
    <>
      <SectionCard title="Satin Alimlari Geri Yukle">
        <PText variant="bodySmall" style={styles.explainText}>
          Daha once satin aldiginiz planlari geri yukleyebiliriz. Bu islem magaza dogrulamasi gerektirir ve aboneliginiz
          otomatik aktiflesir.
        </PText>
        <PButton
          mode="contained"
          style={styles.restoreButton}
          disabled={isOffline || restoring}
          onPress={handleRestore}
          accessibilityLabel="Magaza uzerinden satin alimlari dogrula ve geri yukle"
          accessibilityRole="button"
        >
          {restoring ? 'Dogrulaniyor...' : 'Satin Alimlari Geri Yukle'}
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          onPress={() => Alert.alert('Destek', 'Destek ekibine baglaniyor. (Sahte ortamda simule edildi)')}
          accessibilityLabel="Destek ekibiyle iletisime gec"
          accessibilityRole="button"
        >
          Destekle Iletisime Gec
        </PButton>
      </SectionCard>

      {/* AC-FR-E3-07-01: real transaction data from mock selectors */}
      <SectionCard title="Son Islemler">
        {transactions.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            Kayitli islem bulunamadi.
          </PText>
        ) : (
          transactions.map(tx => (
            <PCard key={tx.id} style={styles.card}>
              <PCard.Content style={styles.cardRow}>
                <View>
                  <PText variant="bodyMedium" style={styles.txDate}>
                    {tx.purchased_at?.slice(0, 10) ?? '-'}
                  </PText>
                  <PText variant="bodySmall" style={styles.txAmount}>
                    {tx.amount} {tx.currency}
                  </PText>
                </View>
                <PChip compact style={styles.chipVerified}>
                  Dogrulandi
                </PChip>
              </PCard.Content>
            </PCard>
          ))
        )}
      </SectionCard>
    </>
  );
};

export const ProfileRestorePurchasesScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Satin Alimlari Geri Yukle" subtitle="Geri yukleme hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={48} />
        </SectionCard>
        <SectionCard title="Gecmis">
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Satin Alimlari Geri Yukle" subtitle="Islemler">
        <StateMessage
          title="Geri yuklenecek satin alim yok"
          description="Magazadan satin alma bulunamadi."
          actionLabel="Planlari Gor"
          icon="refresh"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Satin Alimlari Geri Yukle" subtitle="Bir sorun olustu">
        <StateMessage
          title="Geri yukleme basarisiz"
          description="Satin alimlar dogrulanamadi. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Satin Alimlari Geri Yukle" subtitle="Onbellekteki bilgiler">
        <OfflineNotice />
        <ProfileRestorePurchasesContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Satin Alimlari Geri Yukle" subtitle="Satin alimlarini dogrula">
      <ProfileRestorePurchasesContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    explainText: {
      color: '#374151',
      lineHeight: 20,
      marginBottom: 14
    },
    restoreButton: {
      marginBottom: spacing[1],
      minHeight: 52
    },
    card: {
      marginBottom: 10
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    txDate: {
      fontWeight: fontWeights.semiBold,
      color: '#1F2937'
    },
    txAmount: {
      color: c.textBrand,
      fontWeight: fontWeights.bold,
      marginTop: 2
    },
    chipVerified: {
      backgroundColor: c.tertiaryContainer
    },
    emptyText: {
      color: c.textTertiary,
      textAlign: 'center',
      paddingVertical: spacing[1.5]
    }
  });
}
