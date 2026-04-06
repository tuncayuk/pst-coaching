import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PAvatar, PButton, PChip, PDivider, PProgressBar, PText } from '../../components';
import {
  getClientsForCoach,
  getContentProgressForUser,
  getPrimaryUser,
  getSessionsForUser
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState };

type RiskLevel = 'high' | 'medium' | 'low';

const RISK_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string; icon: string }> = {
  high: { label: 'Yuksek Risk', color: '#DC2626', bg: '#FEF2F2', icon: 'alert-circle' },
  medium: { label: 'Orta Risk', color: '#D97706', bg: '#FFFBEB', icon: 'alert' },
  low: { label: 'Dusuk Risk', color: '#16A34A', bg: '#F0FDF4', icon: 'check-circle' }
};

const RISK_FILTERS: Array<{ key: RiskLevel | 'all'; label: string }> = [
  { key: 'all', label: 'Tumu' },
  { key: 'high', label: 'Yuksek' },
  { key: 'medium', label: 'Orta' },
  { key: 'low', label: 'Dusuk' }
];

function computeRiskLevel(userId?: string): RiskLevel {
  const progress = getContentProgressForUser(userId);
  if (progress.length === 0) return 'high';
  const lastActive = progress.map(p => new Date(p.started_at ?? 0).getTime()).reduce((max, t) => Math.max(max, t), 0);
  const daysSince = (Date.now() - lastActive) / 86400000;
  if (daysSince > 7) return 'high';
  if (daysSince > 3) return 'medium';
  return 'low';
}

function getLastActivityLabel(userId?: string): string {
  const progress = getContentProgressForUser(userId);
  const sessions = getSessionsForUser(userId);
  const all = [
    ...progress.map(p => new Date(p.started_at ?? 0).getTime()),
    ...sessions.map((s: any) => new Date(s.last_active_at ?? 0).getTime())
  ];
  if (all.length === 0) return 'Aktivite yok';
  const lastMs = all.reduce((max, t) => Math.max(max, t), 0);
  const daysSince = Math.floor((Date.now() - lastMs) / 86400000);
  if (daysSince === 0) return 'Bugun';
  if (daysSince === 1) return 'Dun';
  return daysSince + ' gun once';
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

function getDisplayName(email?: string): string {
  if (!email) return 'Bilinmiyor';
  return email
    .split('@')[0]
    .replace(/[._]/g, ' ')
    .replace(/w/g, c => c.toUpperCase());
}

const CoachDashboardContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const coach = getPrimaryUser();
  const [activeFilter, setActiveFilter] = useState<RiskLevel | 'all'>('all');

  const clients = getClientsForCoach(coach?.id);

  // Compute derived data per client
  const clientData = clients.map(client => {
    const risk = computeRiskLevel(client?.id);
    const lastActivity = getLastActivityLabel(client?.id);
    const progress = getContentProgressForUser(client?.id);
    const completed = progress.filter(p => p.status === 'completed').length;
    const total = Math.max(progress.length, 1);
    const progressFraction = completed / total;
    return { client, risk, lastActivity, progressFraction, completed, total };
  });

  const filtered = activeFilter === 'all' ? clientData : clientData.filter(d => d.risk === activeFilter);

  const riskCounts = {
    high: clientData.filter(d => d.risk === 'high').length,
    medium: clientData.filter(d => d.risk === 'medium').length,
    low: clientData.filter(d => d.risk === 'low').length
  };

  return (
    <>
      {/* AC-FR-E12-01-01 + overview stats */}
      <SectionCard title="Ozet">
        <View style={styles.statsRow}>
          <View
            style={styles.statItem}
            accessible
            accessibilityRole="text"
            accessibilityLabel={clients.length + ' toplam danisan'}
          >
            <PText style={styles.statValue}>{clients.length}</PText>
            <PText style={styles.statLabel}>Danisan</PText>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <PText style={[styles.statValue, riskCounts.high > 0 && styles.statValueRed]}>{riskCounts.high}</PText>
            <PText style={styles.statLabel}>Yuksek Risk</PText>
          </View>
          <View style={styles.statItem}>
            <PText style={[styles.statValue, riskCounts.medium > 0 && styles.statValueAmber]}>
              {riskCounts.medium}
            </PText>
            <PText style={styles.statLabel}>Orta Risk</PText>
          </View>
          <View style={styles.statItem}>
            <PText style={[styles.statValue, styles.statValueGreen]}>{riskCounts.low}</PText>
            <PText style={styles.statLabel}>Dusuk Risk</PText>
          </View>
        </View>
      </SectionCard>

      {/* AC-FR-E12-01-04: risk filter */}
      <SectionCard title="Danisanlar">
        <View style={styles.filterRow} accessible accessibilityRole="none" accessibilityLabel="Risk filtresi">
          {RISK_FILTERS.map(f => (
            <PChip
              key={f.key}
              selected={activeFilter === f.key}
              onPress={() => setActiveFilter(f.key)}
              style={[styles.filterChip, activeFilter === f.key && styles.filterChipActive]}
              compact
              accessibilityLabel={f.label + ' filtresi' + (activeFilter === f.key ? ', secili' : '')}
              accessibilityRole="button"
              accessibilityState={{ selected: activeFilter === f.key }}
            >
              {f.label}
            </PChip>
          ))}
        </View>

        {/* AC-FR-E12-01-01/02/03: client cards */}
        {filtered.length === 0 && (
          <View style={styles.emptyFilter}>
            <PText style={styles.emptyFilterText}>Bu risk seviyesinde danisan bulunamadi.</PText>
          </View>
        )}

        {filtered.map((item, idx) => {
          const { client, risk, lastActivity, progressFraction, completed, total } = item;
          const cfg = RISK_CONFIG[risk];
          const initials = getInitials(client?.email);
          const displayName = getDisplayName(client?.email);

          return (
            <View key={client?.id ?? idx}>
              <TouchableOpacity
                style={[styles.clientCard, { backgroundColor: cfg.bg, borderLeftColor: cfg.color }]}
                onPress={() => !isOffline && navigation.navigate('CoachClientProfile', { clientId: client?.id })}
                accessibilityRole="button"
                accessibilityLabel={
                  displayName +
                  '. Risk: ' +
                  cfg.label +
                  '. Son aktivite: ' +
                  lastActivity +
                  '. Ilerleme: %d tamamlandi.'.replace('%d', String(Math.round(progressFraction * 100)))
                }
                disabled={isOffline}
              >
                <View style={styles.clientTop}>
                  {/* Avatar with initials */}
                  <View style={[styles.avatarCircle, { backgroundColor: cfg.color }]} accessible={false}>
                    <PText style={styles.avatarInitials}>{initials}</PText>
                  </View>

                  <View style={styles.clientInfo}>
                    <View style={styles.clientNameRow}>
                      <PText style={styles.clientName} numberOfLines={1}>
                        {displayName}
                      </PText>
                      {/* AC-FR-E12-01-02: risk badge */}
                      <View style={[styles.riskBadge, { backgroundColor: cfg.color + '22' }]}>
                        <PAvatar.Icon
                          size={14}
                          icon={cfg.icon}
                          color={cfg.color}
                          style={styles.riskBadgeIcon}
                          accessible={false}
                        />
                        <PText style={[styles.riskBadgeText, { color: cfg.color }]}>{cfg.label}</PText>
                      </View>
                    </View>
                    {/* AC-FR-E12-01-03: last activity */}
                    <PText style={styles.lastActivity}>Son aktivite: {lastActivity}</PText>
                  </View>
                </View>

                {/* Progress */}
                <View style={styles.progressSection}>
                  <View style={styles.progressLabelRow}>
                    <PText style={styles.progressLabel}>Ilerleme</PText>
                    <PText style={[styles.progressValue, { color: cfg.color }]}>
                      {Math.round(progressFraction * 100)}%
                    </PText>
                  </View>
                  <PProgressBar
                    progress={progressFraction}
                    color={cfg.color}
                    style={styles.progressBar}
                    accessible={false}
                  />
                  <PText style={styles.progressMeta}>
                    {completed}/{total} icerik tamamlandi
                  </PText>
                </View>

                <View style={styles.clientActions}>
                  <PButton
                    mode="outlined"
                    compact
                    disabled={isOffline}
                    style={[styles.clientActionBtn, { borderColor: cfg.color }]}
                    labelStyle={{ color: cfg.color, fontSize: 12 }}
                    onPress={() => !isOffline && navigation.navigate('CoachClientProfile', { clientId: client?.id })}
                    accessibilityLabel={displayName + ' profilini gor'}
                  >
                    Profil Gor
                  </PButton>
                  <PButton
                    mode="text"
                    compact
                    disabled={isOffline}
                    labelStyle={{ color: cfg.color, fontSize: 12 }}
                    onPress={() => !isOffline && navigation.navigate('CoachFeedback', { clientId: client?.id })}
                    accessibilityLabel={displayName + ' icin geri bildirim yaz'}
                  >
                    Geri Bildirim
                  </PButton>
                </View>
              </TouchableOpacity>

              {idx < filtered.length - 1 && <PDivider style={styles.cardDivider} />}
            </View>
          );
        })}

        {clients.length === 0 && activeFilter === 'all' && (
          <View style={styles.emptyAll}>
            <PAvatar.Icon
              size={48}
              icon="account-group-outline"
              color="#94A3B8"
              style={styles.emptyIcon}
              accessible={false}
            />
            <PText style={styles.emptyTitle}>Danisan bulunamadi</PText>
            <PText style={styles.emptyDesc}>Henuz size atanmis bir danisan yok.</PText>
          </View>
        )}
      </SectionCard>
    </>
  );
};

export const CoachDashboardScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
        <PActivityIndicator animating accessibilityLabel="Yukleniyor" />
        <SkeletonBlock height={80} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
        <StateMessage
          title="Danisan bulunamadi"
          description="Henuz size atanmis bir danisan yok."
          icon="account-group-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
        <StateMessage
          title="Veriler yuklenemedi"
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
      <ScreenLayout title="Koc Paneli" subtitle="Cevrimdisi mod">
        <OfflineNotice />
        <CoachDashboardContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
      <CoachDashboardContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: spacing[1]
    },
    statItem: { alignItems: 'center', flex: 1 },
    statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#E5E7EB' },
    statValue: { fontSize: fontSizes['5xl'], fontWeight: fontWeights.extraBold, color: '#1E3A5F' },
    statValueRed: { color: c.error },
    statValueAmber: { color: '#D97706' },
    statValueGreen: { color: c.success },
    statLabel: { fontSize: fontSizes.sm, color: c.textTertiary, marginTop: 2 },
    filterRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginBottom: spacing[2]
    },
    filterChip: { borderRadius: radii['2xl'] },
    filterChipActive: { backgroundColor: '#EFF6FF' },
    clientCard: {
      borderRadius: radii.lg,
      borderLeftWidth: 4,
      padding: 14,
      backgroundColor: c.surface,
      marginBottom: 2
    },
    clientTop: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacing[1.5],
      marginBottom: 10
    },
    avatarCircle: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center'
    },
    avatarInitials: {
      color: palette.white,
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold
    },
    clientInfo: { flex: 1 },
    clientNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing[1],
      marginBottom: 4
    },
    clientName: { flex: 1, fontSize: fontSizes.xl, fontWeight: fontWeights.bold, color: '#1E293B' },
    riskBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radii.md,
      paddingHorizontal: 6,
      paddingVertical: 2,
      gap: 3
    },
    riskBadgeIcon: { backgroundColor: 'transparent' },
    riskBadgeText: { fontSize: 10, fontWeight: fontWeights.bold },
    lastActivity: { fontSize: fontSizes.base, color: c.textTertiary },
    progressSection: { marginBottom: 10 },
    progressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    progressLabel: { fontSize: fontSizes.base, color: c.textSecondary },
    progressValue: { fontSize: fontSizes.base, fontWeight: fontWeights.bold },
    progressBar: { height: 6, borderRadius: radii.sm, marginBottom: 4 },
    progressMeta: { fontSize: fontSizes.sm, color: '#9CA3AF' },
    clientActions: { flexDirection: 'row', gap: spacing[1] },
    clientActionBtn: { borderRadius: radii.md },
    cardDivider: { marginVertical: 8 },
    emptyFilter: { paddingVertical: spacing[3], alignItems: 'center' },
    emptyFilterText: { color: '#9CA3AF', fontSize: fontSizes.lg },
    emptyAll: { alignItems: 'center', paddingVertical: 32 },
    emptyIcon: { backgroundColor: '#F1F5F9', marginBottom: spacing[1.5] },
    emptyTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: '#374151',
      marginBottom: 4
    },
    emptyDesc: { fontSize: fontSizes.md, color: c.textTertiary, textAlign: 'center' }
  });
}
