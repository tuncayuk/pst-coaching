import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { PButton, PCard, PChip, PDivider, PProgressBar, PText, PTextInput } from '../../components';
import {
  getInvitesForSubscription,
  getPlanForSubscription,
  getPrimaryUser,
  getSeatsForSubscription,
  getSubscriptionForUser,
  getUsers
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

/** Mock user role */
const MOCK_USER_ROLE: 'owner' | 'member' = 'owner';

const ProfileSeatManagementContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [inviteContact, setInviteContact] = useState('');
  const [inviteExpanded, setInviteExpanded] = useState(false);

  const user = getPrimaryUser();
  const subscription = getSubscriptionForUser(user?.id);
  const plan = getPlanForSubscription(subscription?.plan_id);
  const seats = getSeatsForSubscription(subscription?.id);
  const invites = getInvitesForSubscription(subscription?.id);
  const users = getUsers();
  const seatLimit = plan?.seat_limit ?? 1;

  const seatEntries = seats.map(seat => {
    const seatUser = users.find(u => u.id === seat.user_id);
    return {
      id: seat.id,
      userId: seat.user_id,
      displayName: seatUser?.email ?? (seat.status === 'available' ? 'Bos Koltuk' : 'Kullanici'),
      role: seatUser?.id === subscription?.owner_user_id ? 'Plan Sahibi' : 'Uye',
      status: seat.status === 'available' ? 'Bos' : 'Aktif'
    };
  });

  const activeCount = seatEntries.filter(s => s.status === 'Aktif').length;
  const isOwner = MOCK_USER_ROLE === 'owner';
  const isFull = activeCount >= seatLimit;

  // AC-FR-E3-06-04: member sees only own row
  const visibleSeats = isOwner ? seatEntries : seatEntries.filter(s => s.userId === user?.id);

  const handleRemove = (name: string) => {
    if (isOffline) return;
    Alert.alert('Uye Kaldir', `"${name}" plandan kaldirilacak. Devam etmek istiyor musunuz?`, [
      { text: 'Iptal', style: 'cancel' },
      {
        text: 'Kaldir',
        style: 'destructive',
        onPress: () => Alert.alert('Bilgi', 'Uye kaldirildi. (Sahte ortamda simule edildi)')
      }
    ]);
  };

  // AC-FR-E3-06-02: send invite by email/phone
  const handleSendInvite = () => {
    if (!inviteContact.trim() || isOffline) return;
    Alert.alert('Davet Gonderildi', `"${inviteContact}" adresine davet gonderildi. (Sahte ortamda simule edildi)`);
    setInviteContact('');
    setInviteExpanded(false);
  };

  return (
    <>
      {/* AC-FR-E3-06-01: occupancy gauge */}
      <SectionCard title="Koltuk Kullanimi">
        <View style={styles.gaugeRow}>
          <PText variant="bodyMedium" style={styles.gaugeLabel}>
            {activeCount} / {seatLimit} koltuk dolu
          </PText>
          <PChip compact style={isFull ? styles.chipFull : styles.chipOk}>
            {isFull ? 'Dolu' : 'Musait'}
          </PChip>
        </View>
        <PProgressBar
          progress={seatLimit > 0 ? activeCount / seatLimit : 0}
          style={styles.gaugeBar}
          accessibilityLabel={`${activeCount} / ${seatLimit} koltuk kullaniliyor`}
        />
        <View style={styles.metaRow}>
          <PText variant="bodySmall" style={styles.metaText}>
            Bekleyen Davet: {invites.length}
          </PText>
        </View>
      </SectionCard>

      {/* AC-FR-E3-06-03: if full, upsell Ek Kisi add-on */}
      {isFull && isOwner && (
        <SectionCard title="Limit Doldu">
          <View style={styles.upsellCard}>
            <PText variant="bodyMedium" style={styles.upsellTitle}>
              Koltuk limitiniz doldu
            </PText>
            <PText variant="bodySmall" style={styles.upsellDesc}>
              Ek Kisi add-onu ekleyerek daha fazla uye davet edebilirsiniz.
            </PText>
            <PButton
              mode="contained-tonal"
              disabled={isOffline}
              style={styles.upsellButton}
              onPress={() => Alert.alert('Bilgi', 'Add-on ekranina yonlendiriliyorsunuz.')}
              accessibilityLabel="Ek Kisi add-onu satin al"
              accessibilityRole="button"
            >
              Ek Kisi Add-onu Al
            </PButton>
          </View>
        </SectionCard>
      )}

      <SectionCard title="Kisiler">
        {visibleSeats.map((seat, idx) => (
          <View key={seat.id}>
            <PCard style={styles.card}>
              <PCard.Content style={styles.cardRow}>
                <View style={styles.seatInfo}>
                  <PText variant="bodyMedium" style={styles.seatName}>
                    {seat.displayName}
                  </PText>
                  <PText variant="bodySmall" style={styles.seatRole}>
                    {seat.role}
                  </PText>
                </View>
                <PChip compact style={seat.status === 'Aktif' ? styles.chipActive : styles.chipEmpty}>
                  {seat.status}
                </PChip>
              </PCard.Content>
              {/* AC-FR-E3-06-02: owner can remove active members (not self) */}
              {isOwner && seat.status === 'Aktif' && seat.role !== 'Plan Sahibi' && (
                <PCard.Actions>
                  <PButton
                    mode="outlined"
                    disabled={isOffline}
                    onPress={() => handleRemove(seat.displayName)}
                    accessibilityLabel={`${seat.displayName} adli uyeyi kaldir`}
                    accessibilityRole="button"
                  >
                    Kaldir
                  </PButton>
                </PCard.Actions>
              )}
            </PCard>
            {idx < visibleSeats.length - 1 && <PDivider style={styles.divider} />}
          </View>
        ))}

        {/* AC-FR-E3-06-02: invite by email/phone (owner only) */}
        {isOwner && !isFull && (
          <>
            {inviteExpanded ? (
              <View style={styles.inviteForm}>
                <PTextInput
                  label="E-posta veya Telefon"
                  value={inviteContact}
                  onChangeText={setInviteContact}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Davet edilecek kisi e-posta veya telefon"
                  editable={!isOffline}
                  style={styles.inviteInput}
                />
                <View style={styles.inviteActions}>
                  <PButton
                    mode="contained"
                    disabled={isOffline || !inviteContact.trim()}
                    onPress={handleSendInvite}
                    accessibilityLabel="Daveti gonder"
                    accessibilityRole="button"
                  >
                    Davet Gonder
                  </PButton>
                  <PButton
                    mode="text"
                    onPress={() => {
                      setInviteExpanded(false);
                      setInviteContact('');
                    }}
                    accessibilityLabel="Daveti iptal et"
                    accessibilityRole="button"
                  >
                    Iptal
                  </PButton>
                </View>
              </View>
            ) : (
              <PButton
                mode="contained"
                disabled={isOffline}
                onPress={() => setInviteExpanded(true)}
                style={styles.inviteButton}
                accessibilityLabel="Yeni kisi davet et"
                accessibilityRole="button"
              >
                Davet Gonder
              </PButton>
            )}
          </>
        )}
      </SectionCard>
    </>
  );
};

export const ProfileSeatManagementScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Kisi Yonetimi" subtitle="Kisiler hazirlaniyor">
        <SectionCard title="Kullanim">
          <SkeletonBlock height={48} />
        </SectionCard>
        <SectionCard title="Kisiler">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Kisi Yonetimi" subtitle="Koltuklarini yonet">
        <StateMessage
          title="Kisi bulunamadi"
          description="Henuz ekli kisi yok. Ilk davetini gonderebilirsin."
          actionLabel="Davet Gonder"
          icon="account-multiple-plus"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Kisi Yonetimi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Kisiler yuklenemedi"
          description="Koltuk bilgilerini getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Kisi Yonetimi" subtitle="Onbellekteki kisiler">
        <OfflineNotice />
        <ProfileSeatManagementContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Kisi Yonetimi" subtitle="Ekibini yonet">
      <ProfileSeatManagementContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    gaugeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[1]
    },
    gaugeLabel: {
      fontWeight: fontWeights.semiBold,
      color: '#1F2937'
    },
    chipFull: {
      backgroundColor: palette.red50
    },
    chipOk: {
      backgroundColor: palette.emerald50
    },
    gaugeBar: {
      height: 8,
      borderRadius: radii.sm,
      marginBottom: 4
    },
    metaRow: {
      marginTop: 4
    },
    metaText: {
      color: c.textTertiary
    },
    upsellCard: {
      backgroundColor: palette.purple50,
      borderRadius: radii.md,
      padding: 14
    },
    upsellTitle: {
      fontWeight: fontWeights.bold,
      color: '#4C1D95',
      marginBottom: 4
    },
    upsellDesc: {
      color: '#6D28D9',
      marginBottom: 10,
      lineHeight: 18
    },
    upsellButton: {
      alignSelf: 'flex-start',
      minHeight: 44
    },
    card: {
      marginBottom: 4
    },
    cardRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    seatInfo: {
      flex: 1
    },
    seatName: {
      fontWeight: fontWeights.semiBold,
      color: '#1F2937'
    },
    seatRole: {
      color: c.textTertiary,
      marginTop: 2
    },
    chipActive: {
      backgroundColor: palette.emerald50
    },
    chipEmpty: {
      backgroundColor: '#F3F4F6'
    },
    divider: {
      marginVertical: 4
    },
    inviteForm: {
      marginTop: spacing[1.5],
      gap: spacing[1]
    },
    inviteInput: {
      marginBottom: 4
    },
    inviteActions: {
      flexDirection: 'row',
      gap: spacing[1]
    },
    inviteButton: {
      marginTop: spacing[1.5],
      minHeight: 48
    }
  });
}
