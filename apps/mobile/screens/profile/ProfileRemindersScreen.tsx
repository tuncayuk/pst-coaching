/**
 * ProfileRemindersScreen: Hub screen for EPIC-17 notification + reminder settings.
 * Navigates to NotificationStack screens (FR-E17-01..04).
 */
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PDivider, PListIcon, PListItem, PText } from '../../components';
import { getPrimaryUser, getReminderSettingsForUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ProfileRemindersContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const reminder = getReminderSettingsForUser(user?.id);

  const goToNotificationList = () => {
    if (isOffline) return;
    navigation.navigate('Notifications');
  };

  const goToNotificationSettings = () => {
    if (isOffline) return;
    navigation.navigate('Notifications', { screen: 'NotificationSettings' });
  };

  const goToReminderPlanner = () => {
    if (isOffline) return;
    navigation.navigate('Notifications', { screen: 'ReminderPlanner' });
  };

  return (
    <>
      <SectionCard title="Bildirimler">
        <PListItem
          title="Bildirim Listesi"
          description="Gecmis ve yeni bildirimler"
          left={() => <PListIcon icon="bell-outline" />}
          right={() => <PListIcon icon="chevron-right" />}
          onPress={goToNotificationList}
          disabled={isOffline}
          accessibilityLabel="Bildirim listesine git"
          accessibilityRole="button"
        />
        <PDivider />
        <PListItem
          title="Bildirim Ayarlari"
          description="Tur, sessiz saatler, siklik, ses"
          left={() => <PListIcon icon="bell-cog-outline" />}
          right={() => <PListIcon icon="chevron-right" />}
          onPress={goToNotificationSettings}
          disabled={isOffline}
          accessibilityLabel="Bildirim ayarlarina git"
          accessibilityRole="button"
        />
      </SectionCard>

      <SectionCard title="Hatirlaticilar">
        <PListItem
          title="Hatirlatici Planlayici"
          description={reminder?.enabled ? `Aktif -- ${reminder.time_local}` : 'Kapali'}
          left={() => <PListIcon icon="clock-outline" />}
          right={() => <PListIcon icon="chevron-right" />}
          onPress={goToReminderPlanner}
          disabled={isOffline}
          accessibilityLabel="Hatirlatici planlayiciya git"
          accessibilityRole="button"
        />
      </SectionCard>

      {isOffline && (
        <View style={styles.offlineNote}>
          <PText style={styles.offlineText}>Cevrimdisi modda ayarlar degistirilemez.</PText>
        </View>
      )}
    </>
  );
};

export const ProfileRemindersScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Hatirlatmalar">
        <PActivityIndicator />
        <SkeletonBlock height={56} />
        <SkeletonBlock height={56} />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Hatirlatmalar">
        <StateMessage
          tone="error"
          title="Ayarlar yuklenemedi"
          description="Bir sorun olustu. Lutfen tekrar deneyin."
          actionLabel="Tekrar Dene"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Hatirlatmalar">
        <OfflineNotice />
        <ProfileRemindersContent isOffline />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Hatirlatmalar">
        <StateMessage title="Ayar bulunamadi" description="Henuz hatirlatici ayari olusturulmamis." />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hatirlatmalar">
      <ProfileRemindersContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    skeleton: { marginHorizontal: 16, marginBottom: spacing[1.5] },
    offlineNote: { paddingHorizontal: spacing[2], paddingTop: 8 },
    offlineText: { fontSize: fontSizes.base, color: '#A3A3A3', fontStyle: 'italic' }
  });
}
