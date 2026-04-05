/**
 * FR-E17-01: Bildirim listesi ve okunma yonetimi
 * AC-FR-E17-01-01: Notifications listed as cards grouped by type
 * AC-FR-E17-01-02: Unread count shown as badge
 * AC-FR-E17-01-03: Single notification mark-as-read
 * AC-FR-E17-01-04: Bulk mark-all-read / clear all
 */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PDivider, PIconButton, PText } from '../../components';
import { MockNotification, getNotificationsForUser, getPrimaryUser } from '../../data/mockSelectors';
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

const NotificationCard = ({
  notification,
  onRead,
  isOffline
}: {
  notification: MockNotification;
  onRead: (id: string) => void;
  isOffline?: boolean;
}) => (
  <PCard
    style={[styles.notifCard, notification.is_read && styles.notifCardRead]}
    accessibilityLabel={`${notification.title}, ${notification.is_read ? 'okundu' : 'okunmadi'}`}
  >
    <View style={styles.notifRow}>
      <View style={styles.notifBody}>
        <View style={styles.notifTitleRow}>
          <PText style={styles.notifTitle}>{notification.title}</PText>
          {!notification.is_read && <View style={styles.unreadDot} accessibilityLabel="Okunmamis bildirim" />}
        </View>
        <PText style={styles.notifDesc}>{notification.description}</PText>
        <PText style={styles.notifTime}>
          {notification.created_at ? new Date(notification.created_at).toLocaleDateString('tr-TR') : ''}
        </PText>
      </View>
      {!notification.is_read && (
        <PIconButton
          icon="check-circle-outline"
          size={20}
          onPress={() => !isOffline && onRead(notification.id)}
          disabled={isOffline}
          accessibilityLabel="Okundu olarak isaretle"
        />
      )}
    </View>
  </PCard>
);

const groupByType = (notifications: MockNotification[]): Record<string, MockNotification[]> => {
  return notifications.reduce(
    (acc, n) => {
      if (!acc[n.type]) acc[n.type] = [];
      acc[n.type].push(n);
      return acc;
    },
    {} as Record<string, MockNotification[]>
  );
};

const NotificationListContent = ({ isOffline }: { isOffline?: boolean }) => {
  const user = getPrimaryUser();
  const rawNotifs = getNotificationsForUser(user?.id);
  const [notifications, setNotifications] = useState<MockNotification[]>(rawNotifs);

  const unreadCount = notifications.filter(n => !n.is_read).length;
  const grouped = groupByType(notifications);

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, is_read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      {/* AC-FR-E17-01-02: Unread badge + bulk actions */}
      <SectionCard title="Bildirimler">
        <View style={styles.headerRow}>
          {unreadCount > 0 ? (
            <PChip compact style={styles.badgeChip} accessibilityLabel={`${unreadCount} okunmamis bildirim`}>
              {`${unreadCount} Okunmamis`}
            </PChip>
          ) : (
            <PText style={styles.allReadText}>Tumu okundu</PText>
          )}
          <View style={styles.bulkActions}>
            {/* AC-FR-E17-01-04: Mark all read */}
            {unreadCount > 0 && (
              <PButton
                mode="text"
                compact
                onPress={handleMarkAllRead}
                disabled={isOffline}
                accessibilityLabel="Tumunu okundu isaretle"
              >
                Tumunu Oku
              </PButton>
            )}
            {/* AC-FR-E17-01-04: Clear all */}
            <PButton
              mode="text"
              compact
              onPress={handleClearAll}
              disabled={isOffline}
              accessibilityLabel="Tum bildirimleri temizle"
            >
              Temizle
            </PButton>
          </View>
        </View>
      </SectionCard>

      {/* AC-FR-E17-01-01: Grouped by type */}
      {Object.entries(grouped).map(([type, notifs]) => (
        <SectionCard key={type} title={TYPE_LABELS[type as MockNotification['type']] ?? type}>
          {notifs.map((n, idx) => (
            <View key={n.id}>
              {/* AC-FR-E17-01-03: Per-item mark-read */}
              <NotificationCard notification={n} onRead={handleMarkRead} isOffline={isOffline} />
              {idx < notifs.length - 1 && <PDivider style={styles.divider} />}
            </View>
          ))}
        </SectionCard>
      ))}
    </ScrollView>
  );
};

type NotificationListScreenProps = {
  route?: { params?: { state?: ScreenState } };
};

export const NotificationListScreen = ({ route }: NotificationListScreenProps) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Bildirimler">
        <PActivityIndicator />
        <SkeletonBlock height={64} />
        <SkeletonBlock height={64} />
        <SkeletonBlock height={64} />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Bildirimler">
        <StateMessage
          tone="error"
          title="Bildirimler yuklenemedi"
          description="Bir sorun olustu. Lutfen tekrar deneyin."
          actionLabel="Tekrar Dene"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Bildirimler">
        <OfflineNotice />
        <NotificationListContent isOffline />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Bildirimler">
        <StateMessage
          title="Bildirim yok"
          description="Henuz hic bildiriminiz yok. Iceriklerinize devam ederek yeni bildirimler alin."
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Bildirimler">
      <NotificationListContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  skeleton: { marginHorizontal: 16, marginBottom: 12 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4
  },
  badgeChip: { backgroundColor: '#00B4D8' },
  allReadText: { fontSize: 13, color: '#737373' },
  bulkActions: { flexDirection: 'row', gap: 4 },
  notifCard: { marginBottom: 4 },
  notifCardRead: { opacity: 0.55 },
  notifRow: { flexDirection: 'row', alignItems: 'flex-start', padding: 12 },
  notifBody: { flex: 1 },
  notifTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  notifTitle: { fontWeight: '700', fontSize: 14, flex: 1 },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00B4D8'
  },
  notifDesc: { fontSize: 13, color: '#525252', marginTop: 2 },
  notifTime: { fontSize: 11, color: '#A3A3A3', marginTop: 4 },
  divider: { marginVertical: 2 }
});
