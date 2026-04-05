import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PAvatar, PButton, PDivider, PProgressBar, PText } from '../../components';
import {
  getAchievements,
  getContentProgressForUser,
  getJourneys,
  getSessionsForUser,
  getUsers
} from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { clientId?: string; state?: ScreenState };

function getDisplayName(email?: string): string {
  if (!email) return 'Danisan';
  return email
    .split('@')[0]
    .replace(/[._]/g, ' ')
    .replace(/w/g, c => c.toUpperCase());
}

function getInitials(email?: string): string {
  if (!email) return '?';
  const name = email
    .split('@')[0]
    .replace(/[^a-zA-Z]/g, ' ')
    .trim();
  const parts = name.split(' ').filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0] ?? '?').substring(0, 2).toUpperCase();
}

function computeTrend(userId?: string): { label: string; icon: string; color: string } {
  const progress = getContentProgressForUser(userId);
  const sessions = getSessionsForUser(userId);
  const recent = progress.filter(p => {
    const ms = new Date(p.started_at ?? 0).getTime();
    return Date.now() - ms < 14 * 86400000;
  }).length;
  if (sessions.length === 0 && recent === 0) {
    return { label: 'Aktivite tespit edilmedi', icon: 'trending-down', color: '#DC2626' };
  }
  if (recent >= 3) {
    return { label: 'Ilerleme artis egilimiyle', icon: 'trending-up', color: '#16A34A' };
  }
  return { label: 'Ilerleme stabil', icon: 'trending-neutral', color: '#D97706' };
}

const CoachClientProfileContent = ({ clientId, isOffline }: { clientId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const client = getUsers().find(u => u.id === clientId) ?? getUsers()[1];

  const progress = getContentProgressForUser(client?.id);
  const sessions = getSessionsForUser(client?.id);
  const achievements = getAchievements().filter((a: any) => a.user_id === client?.id);

  // Status breakdown
  const completedItems = progress.filter(p => p.status === 'completed').length;
  const inProgressItems = progress.filter(p => p.status === 'in_progress').length;
  const notStarted = Math.max(0, 5 - completedItems - inProgressItems); // estimate

  // AC-FR-E12-02-01: active goal - derive from in-progress content
  const activeGoal = progress.find(p => p.status === 'in_progress');
  const activeGoalLabel = activeGoal
    ? (activeGoal.content_type === 'journey_day' ? 'Yolculuk gunu' : 'Icerik') + ' devam ediyor'
    : 'Hedef belirlenmemis';

  // AC-FR-E12-02-03: session count + 7-day activity
  const last7DayActivity = progress.filter(p => {
    const ms = new Date(p.started_at ?? 0).getTime();
    return Date.now() - ms < 7 * 86400000;
  }).length;

  // AC-FR-E12-02-04: trend
  const trend = computeTrend(client?.id);
  const progressFraction = progress.length > 0 ? completedItems / progress.length : 0;

  const initials = getInitials(client?.email);
  const displayName = getDisplayName(client?.email);

  return (
    <>
      {/* Client header */}
      <View
        style={styles.profileHeader}
        accessible
        accessibilityRole="header"
        accessibilityLabel={'Danisan profili: ' + displayName + ', Durum: ' + (client?.status ?? 'active')}
      >
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <PText style={styles.avatarInitials}>{initials}</PText>
          </View>
        </View>
        <PText style={styles.clientName}>{displayName}</PText>
        <PText style={styles.clientEmail}>{client?.email ?? ''}</PText>
        <View style={[styles.statusBadge, { backgroundColor: client?.status === 'active' ? '#D1FAE5' : '#FEE2E2' }]}>
          <PText style={[styles.statusBadgeText, { color: client?.status === 'active' ? '#065F46' : '#991B1B' }]}>
            {client?.status === 'active' ? 'Aktif' : 'Pasif'}
          </PText>
        </View>
      </View>

      {/* AC-FR-E12-02-01: active goal */}
      <SectionCard title="Aktif Hedef">
        <View style={styles.goalRow} accessible accessibilityLabel={'Aktif hedef: ' + activeGoalLabel}>
          <PAvatar.Icon
            size={36}
            icon={activeGoal ? 'bullseye-arrow' : 'target'}
            color={activeGoal ? '#7C4DFF' : '#9CA3AF'}
            style={[styles.goalIcon, { backgroundColor: activeGoal ? '#F5F3FF' : '#F4F4F5' }]}
            accessible={false}
          />
          <View style={styles.goalInfo}>
            <PText style={styles.goalLabel}>{activeGoalLabel}</PText>
            {activeGoal && (
              <PText style={styles.goalMeta}>{activeGoal.content_type.replace('_', ' ')} - devam ediyor</PText>
            )}
          </View>
        </View>
        {progressFraction > 0 && (
          <View style={styles.goalProgress}>
            <PProgressBar
              progress={progressFraction}
              color="#7C4DFF"
              style={styles.goalProgressBar}
              accessible
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: Math.round(progressFraction * 100) }}
              accessibilityLabel={'Genel ilerleme: yuzde ' + Math.round(progressFraction * 100)}
            />
            <PText style={styles.goalProgressLabel}>Genel ilerleme: {Math.round(progressFraction * 100)}%</PText>
          </View>
        )}
      </SectionCard>

      {/* AC-FR-E12-02-02: content status summary */}
      <SectionCard title="Icerik Durumu">
        <View style={styles.statusRow}>
          {[
            { label: 'Baslamadi', count: notStarted, color: '#9CA3AF', bg: '#F4F4F5' },
            { label: 'Devam', count: inProgressItems, color: '#0EA5E9', bg: '#E0F2FE' },
            { label: 'Tamamlandi', count: completedItems, color: '#16A34A', bg: '#D1FAE5' }
          ].map(s => (
            <View
              key={s.label}
              style={[styles.statusItem, { backgroundColor: s.bg }]}
              accessible
              accessibilityRole="text"
              accessibilityLabel={s.label + ': ' + s.count + ' icerik'}
            >
              <PText style={[styles.statusCount, { color: s.color }]}>{s.count}</PText>
              <PText style={styles.statusLabel}>{s.label}</PText>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E12-02-03: engagement metrics */}
      <SectionCard title="Etkilesim Metrikleri">
        <View style={styles.metricsGrid}>
          {[
            {
              icon: 'calendar-check',
              label: 'Toplam Oturum',
              value: String(sessions.length),
              color: '#1E3A5F'
            },
            {
              icon: 'lightning-bolt',
              label: 'Son 7 Gun',
              value: String(last7DayActivity) + ' aktivite',
              color: '#0EA5E9'
            },
            {
              icon: 'trophy',
              label: 'Basarilar',
              value: String(achievements.length),
              color: '#F59E0B'
            },
            {
              icon: 'check-all',
              label: 'Tamamlanan',
              value: String(completedItems),
              color: '#16A34A'
            }
          ].map(m => (
            <View
              key={m.label}
              style={styles.metricItem}
              accessible
              accessibilityRole="text"
              accessibilityLabel={m.label + ': ' + m.value}
            >
              <PAvatar.Icon
                size={28}
                icon={m.icon}
                color={m.color}
                style={[styles.metricIcon, { backgroundColor: m.color + '18' }]}
                accessible={false}
              />
              <PText style={[styles.metricValue, { color: m.color }]}>{m.value}</PText>
              <PText style={styles.metricLabel}>{m.label}</PText>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E12-02-04: progress trend */}
      <SectionCard title="Ilerleme Trendi">
        <View
          style={[styles.trendRow, { backgroundColor: trend.color + '12' }]}
          accessible
          accessibilityLabel={'Ilerleme trendi: ' + trend.label}
        >
          <PAvatar.Icon
            size={36}
            icon={trend.icon}
            color={trend.color}
            style={[styles.trendIcon, { backgroundColor: trend.color + '22' }]}
            accessible={false}
          />
          <View style={styles.trendInfo}>
            <PText style={[styles.trendLabel, { color: trend.color }]}>{trend.label}</PText>
            <PText style={styles.trendDesc}>
              Son 14 gunde{' '}
              {
                progress.filter(p => {
                  const ms = new Date(p.started_at ?? 0).getTime();
                  return Date.now() - ms < 14 * 86400000;
                }).length
              }{' '}
              icerik etklesimi
            </PText>
          </View>
        </View>
      </SectionCard>

      <PDivider style={styles.actionDivider} />
      <View style={styles.actions}>
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.actionBtn}
          onPress={() => navigation.navigate('CoachContentTracking', { clientId: client?.id })}
          accessibilityLabel="Icerik takibini ac"
        >
          Icerik Takibi
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.actionBtn}
          onPress={() => navigation.navigate('CoachFeedback', { clientId: client?.id })}
          accessibilityLabel="Geri bildirim yaz"
        >
          Geri Bildirim Yaz
        </PButton>
      </View>
    </>
  );
};

export const CoachClientProfileScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const clientId = route?.params?.clientId;
  const client = getUsers().find(u => u.id === clientId);
  const title = client ? getDisplayName(client.email) : 'Danisan Profili';

  if (state === 'loading') {
    return (
      <ScreenLayout title={title} subtitle="Danisan profili">
        <PActivityIndicator animating accessibilityLabel="Profil yukleniyor" />
        <SkeletonBlock height={80} />
        <SkeletonBlock height={100} />
        <SkeletonBlock height={100} />
      </ScreenLayout>
    );
  }

  if (state === 'empty' || !clientId) {
    return (
      <ScreenLayout title="Danisan Profili" subtitle="">
        <StateMessage title="Profil bulunamadi" description="Bu danisana ait veri bulunamadi." icon="account-outline" />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title={title} subtitle="">
        <StateMessage
          title="Profil yuklenemedi"
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
      <ScreenLayout title={title} subtitle="Cevrimdisi mod">
        <OfflineNotice />
        <CoachClientProfileContent clientId={clientId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={title} subtitle="Danisan profili ve metrikleri">
      <CoachClientProfileContent clientId={clientId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 8
  },
  avatarWrap: { marginBottom: 12 },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1E3A5F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarInitials: { color: '#FFFFFF', fontSize: 26, fontWeight: '700' },
  clientName: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 2 },
  clientEmail: { fontSize: 13, color: '#6B7280', marginBottom: 8 },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  statusBadgeText: { fontSize: 12, fontWeight: '700' },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  goalIcon: { borderRadius: 18 },
  goalInfo: { flex: 1 },
  goalLabel: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  goalMeta: { fontSize: 12, color: '#6B7280' },
  goalProgress: { marginTop: 4 },
  goalProgressBar: { height: 6, borderRadius: 6, marginBottom: 4 },
  goalProgressLabel: { fontSize: 12, color: '#7C4DFF', textAlign: 'right' },
  statusRow: { flexDirection: 'row', gap: 8 },
  statusItem: { flex: 1, borderRadius: 10, padding: 10, alignItems: 'center' },
  statusCount: { fontSize: 20, fontWeight: '800' },
  statusLabel: { fontSize: 11, color: '#525252', marginTop: 2 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metricItem: {
    width: '47%',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingVertical: 14
  },
  metricIcon: { borderRadius: 14, marginBottom: 6 },
  metricValue: { fontSize: 16, fontWeight: '800', marginBottom: 2 },
  metricLabel: { fontSize: 11, color: '#6B7280', textAlign: 'center' },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 10
  },
  trendIcon: { borderRadius: 18 },
  trendInfo: { flex: 1 },
  trendLabel: { fontSize: 14, fontWeight: '700' },
  trendDesc: { fontSize: 12, color: '#525252', marginTop: 2 },
  actionDivider: { marginVertical: 8 },
  actions: { gap: 10 },
  actionBtn: { borderRadius: 12 }
});
