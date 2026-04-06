import React, { useMemo } from 'react';
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

const TX_STATUS_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  completed: { label: 'Basarili', bg: '#D1FAE5', text: '#065F46' },
  pending: { label: 'Bekliyor', bg: '#FEF3C7', text: '#92400E' },
  failed: { label: 'Basarisiz', bg: '#FEE2E2', text: '#991B1B' },
  refunded: { label: 'Iade', bg: '#EDE9FE', text: '#4C1D95' }
};

const ProfilePaymentHistoryContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  // AC-FR-E3-07-01: payments with date and amount
  const transactions = getPaymentsForSubscription(subscription?.id);

  // AC-FR-E3-07-03: view receipt detail
  const handleReceipt = (id: string, amount: number, currency: string, date: string) => {
    Alert.alert(
      'Makbuz Detayi',
      `Islem No: ${id.slice(0, 8)}\nTutar: ${amount} ${currency}\nTarih: ${date}\nDurum: Tamamlandi`,
      [{ text: 'Kapat' }]
    );
  };

  return (
    <>
      <SectionCard title="Odeme Gecmisi">
        {transactions.length === 0 ? (
          <PText variant="bodySmall" style={styles.emptyText}>
            Henuz kayitli bir odeme bulunamadi.
          </PText>
        ) : (
          transactions.map(tx => {
            const statusKey = (tx as any).status ?? 'completed';
            const statusCfg = TX_STATUS_CONFIG[statusKey] ?? TX_STATUS_CONFIG.completed;
            const dateStr = tx.purchased_at?.slice(0, 10) ?? '-';

            return (
              <PCard key={tx.id} style={styles.card}>
                <PCard.Content style={styles.cardRow}>
                  <View style={styles.txInfo}>
                    <PText variant="bodyMedium" style={styles.txDate}>
                      {dateStr}
                    </PText>
                    <PText variant="bodySmall" style={styles.txAmount}>
                      {tx.amount} {tx.currency}
                    </PText>
                  </View>
                  <PChip compact style={{ backgroundColor: statusCfg.bg }}>
                    <PText style={{ color: statusCfg.text, fontSize: 12 }}>{statusCfg.label}</PText>
                  </PChip>
                </PCard.Content>
                <PCard.Actions>
                  {/* AC-FR-E3-07-03: receipt detail */}
                  <PButton
                    mode="text"
                    disabled={isOffline}
                    onPress={() => handleReceipt(tx.id, tx.amount, tx.currency, dateStr)}
                    accessibilityLabel={`${dateStr} tarihli makbuzu goruntule`}
                    accessibilityRole="button"
                  >
                    Makbuz
                  </PButton>
                </PCard.Actions>
              </PCard>
            );
          })
        )}
      </SectionCard>

      <SectionCard title="Fatura">
        <PText variant="bodySmall" style={styles.infoText}>
          Fatura bilgileri kisisel olarak kayitli.
        </PText>
        <PButton
          mode="outlined"
          style={styles.actionButton}
          disabled={isOffline}
          onPress={() => Alert.alert('Fatura', 'Fatura bilgileri guncelleme akisi. (Sahte ortamda simule edildi)')}
          accessibilityLabel="Fatura bilgilerini guncelle"
          accessibilityRole="button"
        >
          Fatura Bilgilerini Guncelle
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfilePaymentHistoryScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Odeme Gecmisi" subtitle="Odeme gecmisi hazirlaniyor">
        <SectionCard title="Gecmis">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Odeme Gecmisi" subtitle="Islem bilgileri">
        <StateMessage
          title="Odeme gecmisi yok"
          description="Henuz kayitli bir odeme bulunmuyor."
          actionLabel="Planlari Gor"
          icon="credit-card-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Odeme Gecmisi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Odemeler yuklenemedi"
          description="Odeme gecmisini getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Odeme Gecmisi" subtitle="Onbellekteki odemeler">
        <OfflineNotice />
        <ProfilePaymentHistoryContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Odeme Gecmisi" subtitle="Islemlerini incele">
      <ProfilePaymentHistoryContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      marginBottom: 10
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    txInfo: {
      flex: 1
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
    emptyText: {
      color: c.textTertiary,
      textAlign: 'center',
      paddingVertical: spacing[2]
    },
    infoText: {
      color: c.textTertiary,
      marginBottom: spacing[1]
    },
    actionButton: {
      minHeight: 44
    }
  });
}
