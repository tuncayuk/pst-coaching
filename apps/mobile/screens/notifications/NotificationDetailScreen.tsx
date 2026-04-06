/**
 * FR-E17-02: Bildirim detayi ve hedefe gecis
 * AC-FR-E17-02-01: Detail shows title, description, content summary
 * AC-FR-E17-02-02: Context-appropriate primary action button (CTA)
 * AC-FR-E17-02-03: Deep link to target content from card
 * AC-FR-E17-02-04: Timestamp shown in detail
 */
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PDivider, PText } from '../../components';
import { MockNotification, getNotificationsForUser, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const TYPE_LABELS: Record<MockNotification['type'], string> = {
  journey: 'Yolculuk',
  workshop: 'Atolye',
  reading: 'Okuma',
  social: 'Sosyal',
  achievement: 'Basari'
};

const CTA_LABELS: Record<MockNotification['type'], string> = {
  journey: 'Yolculuga Git',
  workshop: 'Atolyeye Git',
  reading: 'Okumaya Devam Et',
  social: 'Yorumu Goruntule',
  achievement: 'Rozetleri Goruntule'
};

const formatTimestamp = (iso?: string | null): string => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const NotificationDetailContent = ({
  notification,
  isOffline
}: {
  notification: MockNotification;
  isOffline?: boolean;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  const handleCTA = () => {
    if (isOffline) return;
    // AC-FR-E17-02-03: Deep link to target content
    if (notification.content_type === 'journey_day') {
      navigation.navigate('Content');
    } else if (notification.content_type === 'journey') {
      navigation.navigate('Content');
    } else {
      navigation.navigate('MainTabs');
    }
  };

  return (
    <>
      {/* AC-FR-E17-02-01: Title + description + type chip */}
      <SectionCard title={TYPE_LABELS[notification.type] ?? notification.type}>
        <View style={styles.titleRow}>
          <PText style={styles.title}>{notification.title}</PText>
          <PChip compact style={styles.typeChip}>
            {TYPE_LABELS[notification.type]}
          </PChip>
        </View>
        <PText style={styles.description}>{notification.description}</PText>

        {/* AC-FR-E17-02-04: Timestamp */}
        <PDivider style={styles.divider} />
        <View style={styles.metaRow}>
          <PText style={styles.metaLabel}>Tarih</PText>
          <PText style={styles.metaValue}>{formatTimestamp(notification.created_at)}</PText>
        </View>

        {notification.content_id && (
          <View style={styles.metaRow}>
            <PText style={styles.metaLabel}>Icerik ID</PText>
            <PText style={styles.metaValue} numberOfLines={1}>
              {notification.content_id}
            </PText>
          </View>
        )}
      </SectionCard>

      {/* AC-FR-E17-02-02: Context CTA */}
      <SectionCard title="Islem">
        <PButton
          mode="contained"
          onPress={handleCTA}
          disabled={isOffline}
          style={styles.ctaButton}
          accessibilityLabel={CTA_LABELS[notification.type]}
        >
          {CTA_LABELS[notification.type]}
        </PButton>
      </SectionCard>

      {/* AC-FR-E17-02-01: Content summary card */}
      {notification.content_id && (
        <SectionCard title="Icerik Ozeti">
          <PCard style={styles.summaryCard}>
            <PText style={styles.summaryType}>Tur: {notification.content_type ?? 'Bilinmiyor'}</PText>
            <PText style={styles.summaryId} numberOfLines={1}>
              Kaynak: {notification.content_id}
            </PText>
          </PCard>
        </SectionCard>
      )}
    </>
  );
};

type NotificationDetailScreenProps = {
  route?: {
    params?: {
      notificationId?: string;
      state?: ScreenState;
    };
  };
};

export const NotificationDetailScreen = ({ route }: NotificationDetailScreenProps) => {
  const state = resolveScreenState(route);
  const notificationId = route?.params?.notificationId;

  const user = getPrimaryUser();
  const notifications = getNotificationsForUser(user?.id);
  const notification = notificationId ? notifications.find(n => n.id === notificationId) : notifications[0];

  if (state === 'loading') {
    return (
      <ScreenLayout title="Bildirim Detayi">
        <PActivityIndicator />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={56} />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Bildirim Detayi">
        <StateMessage
          tone="error"
          title="Bildirim yuklenemedi"
          description="Bildirim detayi yuklenirken bir sorun olustu."
          actionLabel="Geri Don"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Bildirim Detayi">
        <OfflineNotice />
        {notification && <NotificationDetailContent notification={notification} isOffline />}
      </ScreenLayout>
    );
  }

  if (state === 'empty' || !notification) {
    return (
      <ScreenLayout title="Bildirim Detayi">
        <StateMessage
          title="Bildirim bulunamadi"
          description="Secilen bildirim artik mevcut degil."
          actionLabel="Listeye Don"
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Bildirim Detayi">
      <NotificationDetailContent notification={notification} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    skeleton: { marginHorizontal: 16, marginBottom: spacing[1.5] },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    title: { fontWeight: fontWeights.bold, fontSize: fontSizes['2xl'], flex: 1 },
    typeChip: { backgroundColor: c.primaryContainer },
    description: { fontSize: fontSizes.lg, color: c.textTertiary, lineHeight: 20 },
    divider: { marginVertical: 12 },
    metaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6
    },
    metaLabel: { fontSize: fontSizes.base, color: c.textTertiary, fontWeight: fontWeights.semiBold },
    metaValue: { fontSize: fontSizes.base, color: c.textTertiary, flex: 1, textAlign: 'right' },
    ctaButton: { marginTop: 4 },
    summaryCard: { padding: spacing[1.5] },
    summaryType: { fontSize: fontSizes.md, color: c.textSecondary, marginBottom: 4 },
    summaryId: { fontSize: fontSizes.sm, color: '#A3A3A3' }
  });
}
