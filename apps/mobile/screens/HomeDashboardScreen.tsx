import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { trackCtaTap } from '../analytics';
import {
  ActivityItem,
  HomeActivityFeed,
  HomeContentNavCard,
  HomeReminderNudge,
  HomeStatCard,
  PButton,
  PCard,
  PChip,
  PIconButton,
  PProgressBar,
  PText,
  PTextInput,
  PTextInputIcon
} from '../components';
import {
  getContentProgressForUser,
  getEbooks,
  getJourneyById,
  getJourneys,
  getModules,
  getNotificationsForUser,
  getPrimaryUser,
  getWorkshops
} from '../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { OfflineNotice } from './components/OfflineNotice';
import { ScreenLayout } from './components/ScreenLayout';
import { ScreenState, resolveScreenState } from './components/ScreenState';
import { SkeletonBlock } from './components/SkeletonBlock';
import { StateMessage } from './components/StateMessage';

/** Returns seconds remaining until 23:59:59 of today (local time). */
function secondsUntilMidnight(): number {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 0);
  return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
}

/** Formats seconds as "HH:mm" countdown string. */
function formatCountdown(secs: number): string {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/** Returns a contextual greeting based on the local hour. */
function getGreetingText(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Gunaydin,';
  if (hour < 18) return 'Iyi gunler,';
  return 'Iyi aksamlar,';
}

const CONTENT_AREAS = [
  { label: 'Yolculuklar', icon: 'map-marker-path', route: 'DiscoverJourneys', suffix: 'program' },
  { label: 'Atolyeler', icon: 'school-outline', route: 'DiscoverWorkshops', suffix: 'atolye' },
  { label: 'e-Kitaplar', icon: 'book-open-variant', route: 'DiscoverEbooks', suffix: 'kitap' },
  { label: 'Moduller', icon: 'human-male-board', route: 'DiscoverModules', suffix: 'modul' }
] as const;

/** Returns subscription badge colors from semantic tokens — dark-mode safe. */
function getSubscriptionBadgeConfig(c: ColorTokens) {
  return {
    active: { label: 'Aktif', bg: c.tertiaryContainer, text: c.onTertiaryContainer },
    trial: { label: 'Deneme', bg: c.warningContainer, text: c.onWarningContainer },
    cancelled: { label: 'Iptal', bg: c.errorContainer, text: c.onErrorContainer }
  } as const;
}

const ACTIVITIES: ActivityItem[] = [
  { title: 'Modul 3 tamamlandi', time: '2 saat once', icon: 'check-circle-outline', tone: 'success' },
  { title: 'Yeni rozet kazandiniz!', time: '1 gun once', icon: 'trophy-outline', tone: 'warning' }
];

const HomeReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const displayName = user?.email ? user.email.split('@')[0] : 'Ahmet';
  const contentAreaCounts = [
    getJourneys().length,
    getWorkshops().length,
    getEbooks().length,
    getModules().length
  ];
  const progressItems = getContentProgressForUser(user?.id);
  const unreadCount = getNotificationsForUser(user?.id).filter(n => !n.is_read).length;
  const nextStep = progressItems.find(item => item.status === 'in_progress') ?? progressItems[0];
  // Derive next journey directly from content_progress (journey_days removed from schema)
  const nextJourney =
    nextStep?.content_type === 'journey'
      ? getJourneyById(nextStep.content_item_id)
      : getJourneyById(progressItems.find(p => p.content_type === 'journey')?.content_item_id);

  // AC-FR-E2-01-01: countdown timer to 23:59
  const [countdown, setCountdown] = useState(secondsUntilMidnight);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown(secondsUntilMidnight());
    }, 60_000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // AC-FR-E2-08-01: dismissible reminder nudge
  const [reminderDismissed, setReminderDismissed] = useState(false);

  const subscriptionStatus: keyof ReturnType<typeof getSubscriptionBadgeConfig> = 'active';
  const badge = getSubscriptionBadgeConfig(c)[subscriptionStatus];

  // Dynamic progress from real data.
  const completedItems = progressItems.filter(i => i.status === 'completed');
  const progressFraction = progressItems.length > 0 ? completedItems.length / progressItems.length : 0;
  const progressPct = Math.round(progressFraction * 100);

  const handleContinue = () => {
    if (!nextStep) {
      trackCtaTap('home.dashboard', 'continue_cta_tapped', { hasProgress: false });
      navigation.navigate('Discover');
      return;
    }
    trackCtaTap('home.dashboard', 'continue_cta_tapped', { hasProgress: true });
    if (nextStep.content_type === 'journey') {
      navigation.navigate('Content', {
        screen: 'ContentJourneyHome',
        params: { id: nextJourney?.id ?? nextStep.content_item_id }
      });
      return;
    }
    navigation.navigate('Content', {
      screen: 'ContentWorkshopHome',
      params: { id: nextStep.content_item_id }
    });
  };

  return (
    <View>
      {/* Header row: greeting + subscription badge + notification bell */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <PText style={styles.greeting}>{getGreetingText()}</PText>
          <View style={styles.nameRow}>
            <PText style={styles.nameText}>{displayName}</PText>
            {/* AC-FR-E2-02-01: subscription status badge */}
            <View
              style={[styles.subscriptionBadge, { backgroundColor: badge.bg }]}
              accessibilityLabel={`Abonelik durumu: ${badge.label}`}
              accessibilityRole="text"
            >
              <PText style={[styles.subscriptionBadgeText, { color: badge.text }]}>{badge.label}</PText>
            </View>
          </View>
        </View>
        <View style={styles.notificationWrapper}>
          <PIconButton
            icon="bell-outline"
            size={22}
            style={styles.notificationButton}
            accessibilityLabel="Bildirimler"
            accessibilityRole="button"
            accessibilityHint="Bildirimlerinizi goruntuler"
            onPress={() => {
              trackCtaTap('home.dashboard', 'bell_tapped');
              navigation.navigate('Notifications');
            }}
          />
          {unreadCount > 0 && (
            <View
              style={styles.notificationDot}
              accessibilityLabel={`${unreadCount} okunmamis bildirim`}
              accessibilityRole="image"
            >
              <PText style={styles.notificationDotText}>{unreadCount > 9 ? '9+' : String(unreadCount)}</PText>
            </View>
          )}
        </View>
      </View>

      {/* Search bar - AC-FR-E2-05-01 */}
      <TouchableOpacity
        onPress={() => {
          if (!isOffline) {
            trackCtaTap('home.dashboard', 'search_bar_tapped');
            navigation.navigate('HomeSearch');
          }
        }}
        activeOpacity={isOffline ? 1 : 0.7}
        accessibilityLabel={isOffline ? 'Arama cevrimdisi modda kullanamaz' : 'Icerik ara'}
        accessibilityRole="search"
        accessibilityHint={isOffline ? undefined : 'Arama ekranini acar'}
        style={[styles.searchWrapper, isOffline && styles.searchWrapperDisabled]}
      >
        <PTextInput
          mode="outlined"
          placeholder={isOffline ? 'Arama cevrimdisi devre disi' : 'Ne aramak istersiniz?'}
          left={<PTextInputIcon icon="magnify" />}
          style={styles.searchInput}
          outlineStyle={styles.searchOutline}
          contentStyle={styles.searchContent}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>

      {/* Stats row — AC-FR-E2-02-01 */}
      <View style={styles.statsRow}>
        <HomeStatCard
          label="Gun Serisi"
          value={12}
          icon="fire"
          tone="primary"
          onPress={() => trackCtaTap('home.dashboard', 'stat_tapped', { stat: 'Gun Serisi' })}
        />
        <HomeStatCard
          label="Tamamlanan"
          value={completedItems.length}
          icon="check-circle"
          tone="success"
          onPress={() => trackCtaTap('home.dashboard', 'stat_tapped', { stat: 'Tamamlanan' })}
        />
        <HomeStatCard
          label="Rozetler"
          value={8}
          icon="trophy"
          tone="warning"
          onPress={() => trackCtaTap('home.dashboard', 'stat_tapped', { stat: 'Rozetler' })}
        />
      </View>

      {/* AC-FR-E2-01-01/02: Today's CTA with countdown */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <PText style={styles.sectionTitle}>Bugun Devam Et</PText>
          <View
            style={styles.countdownBadge}
            accessibilityLabel={`Kalan sure: ${formatCountdown(countdown)}`}
            accessibilityLiveRegion="polite"
          >
            <View accessibilityElementsHidden>
              <Icon source="clock-outline" size={12} color={c.onWarningContainer} />
            </View>
            <PText style={styles.countdownText}>{formatCountdown(countdown)}</PText>
          </View>
        </View>
        {nextStep ? (
          <PCard accentColor={c.primary} style={styles.continueCard}>
            <View style={styles.continueRow}>
              <View style={styles.continueIcon} accessibilityElementsHidden>
                <PText style={styles.continueIconText}>
                  {(nextJourney?.title ?? 'H')[0].toUpperCase()}
                </PText>
              </View>
              <View style={styles.continueInfo}>
                <PText style={styles.continueTitle} numberOfLines={1}>
                  {nextJourney?.title ?? 'Hedef Belirleme'}
                </PText>
                <PText style={styles.continueSubtitle}>Coaching Programi · Modul 3/8</PText>
              </View>
            </View>
            <View style={styles.progressRow}>
              <View style={styles.progressHeader}>
                <PText style={styles.progressLabel}>Ilerleme</PText>
                <PText style={styles.progressValue}>{progressPct}%</PText>
              </View>
              <PProgressBar progress={progressFraction} style={styles.progressBar} />
            </View>
            <PButton
              mode="contained"
              disabled={isOffline}
              onPress={handleContinue}
              accessibilityLabel="Kaldim yerden devam et"
              accessibilityHint="Aktif icerigi acar"
            >
              Devam Et
            </PButton>
          </PCard>
        ) : (
          <PCard style={styles.continueCardEmpty}>
            <View accessibilityElementsHidden>
              <Icon source="compass-outline" size={40} color={c.textTertiary} />
            </View>
            <PText style={styles.continueEmptyTitle}>Bugunku hedefini henuz secmedin</PText>
            <PText style={styles.continueEmptyDesc}>
              Icerikleri kesfedin ve baslamak istediginizi secin.
            </PText>
            <PButton
              mode="contained"
              onPress={() => navigation.navigate('Discover')}
              accessibilityLabel="Kesfe cik ve icerik sec"
            >
              Kesfe Cik
            </PButton>
          </PCard>
        )}
      </View>

      {/* AC-FR-E2-03-01/02: Content area navigation grid */}
      <View style={styles.section}>
        <PText style={[styles.sectionTitle, styles.sectionTitleBlock]}>Icerik Alanlari</PText>
        <View style={styles.contentNavGrid}>
          {[CONTENT_AREAS.slice(0, 2), CONTENT_AREAS.slice(2, 4)].map((row, rowIdx) => (
            <View key={rowIdx} style={styles.contentNavRow}>
              {row.map((area, colIdx) => {
                const idx = rowIdx * 2 + colIdx;
                return (
                  <HomeContentNavCard
                    key={area.label}
                    label={area.label}
                    icon={area.icon}
                    count={`${contentAreaCounts[idx]} ${area.suffix}`}
                    disabled={isOffline}
                    onPress={() => {
                      trackCtaTap('home.dashboard', 'content_area_tapped', { route: area.route });
                      navigation.navigate('Discover', { screen: area.route });
                    }}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>

      {/* AC-FR-E2-04-01: Program summary card */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <PText style={styles.sectionTitle}>Vicdandan Karaktere</PText>
          <PButton
            mode="text"
            onPress={() => navigation.navigate('HomeVicdandanKaraktereDetail')}
            accessibilityLabel="Vicdandan Karaktere programi detaylari"
          >
            Detaylar
          </PButton>
        </View>
        <PCard accentColor={c.tertiary} style={styles.programCard}>
          <PText style={styles.programDescription} numberOfLines={2}>
            Ic sesini guclendir ve degerlerinle uyumlu kararlar al.
          </PText>
          <View style={styles.progressRow}>
            <View style={styles.progressHeader}>
              <PText style={styles.progressLabel}>3/8 bolum</PText>
              <PText style={styles.progressValue}>38%</PText>
            </View>
            <PProgressBar progress={0.38} style={styles.progressBar} />
          </View>
        </PCard>
      </View>

      {/* AC-FR-E2-06-01: Active content list */}
      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <PText style={styles.sectionTitle}>Aktif Iceriklerim</PText>
          <PButton
            mode="text"
            onPress={() => navigation.navigate('HomeActiveContentList')}
            accessibilityLabel="Tum aktif icerikleri gor"
          >
            Tumunu Gor
          </PButton>
        </View>
        <PCard style={styles.activeContentCard}>
          <View style={styles.activeContentRow}>
            <PChip compact accessibilityLabel="Icerik turu: Yolculuk">
              Yolculuk
            </PChip>
            <View style={styles.activeContentInfo}>
              <PText style={styles.activeContentTitle} numberOfLines={1}>
                Hedef Belirleme
              </PText>
              <PText style={styles.activeContentMeta}>Gun 3 · 12 dk</PText>
            </View>
            <PText style={styles.activeContentPct}>42%</PText>
          </View>
          <PProgressBar progress={0.42} style={styles.progressBar} />
        </PCard>
      </View>

      {/* Son Aktiviteler */}
      <View style={styles.section}>
        <PText style={[styles.sectionTitle, styles.sectionTitleBlock]}>Son Aktiviteler</PText>
        <HomeActivityFeed activities={ACTIVITIES} />
      </View>

      {/* AC-FR-E2-08-01: Dismissible reminder nudge */}
      {!reminderDismissed && (
        <HomeReminderNudge
          label="Gunluk hatirlaticini ayarla · 20:00 onerilen"
          disabled={isOffline}
          onPress={() => {
            trackCtaTap('home.dashboard', 'reminder_nudge_tapped');
            navigation.navigate('HomeReminderSetting');
          }}
          onDismiss={() => setReminderDismissed(true)}
        />
      )}

      <View style={styles.bottomSpacer} />
    </View>
  );
};

export const HomeDashboardScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);
  const navigation = useNavigation<any>();

  if (state === 'loading') {
    return (
      <ScreenLayout title="Ana Sayfa" headerVariant="none">
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <SkeletonBlock height={16} />
            <SkeletonBlock height={36} />
          </View>
          <SkeletonBlock height={48} />
        </View>
        <SkeletonBlock height={48} />
        <View style={styles.statsRow}>
          <View style={{ flex: 1 }}><SkeletonBlock height={88} /></View>
          <View style={{ flex: 1 }}><SkeletonBlock height={88} /></View>
          <View style={{ flex: 1 }}><SkeletonBlock height={88} /></View>
        </View>
        <View style={styles.section}>
          <SkeletonBlock height={24} />
          <SkeletonBlock height={160} />
        </View>
        <View style={styles.section}>
          <SkeletonBlock height={24} />
          <View style={styles.contentNavRow}>
            <View style={{ flex: 1 }}><SkeletonBlock height={88} /></View>
            <View style={{ flex: 1 }}><SkeletonBlock height={88} /></View>
          </View>
          <View style={styles.contentNavRow}>
            <View style={{ flex: 1 }}><SkeletonBlock height={88} /></View>
            <View style={{ flex: 1 }}><SkeletonBlock height={88} /></View>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Ana Sayfa" headerVariant="none">
        <StateMessage
          title="Henuz icerik yok"
          description="Ilk yolculugunu secerek kisisel gelisim planini olusturabilirsin."
          actionLabel="Kesfe Cik"
          onAction={() => navigation.navigate('Discover')}
          icon="compass-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Ana Sayfa" headerVariant="none">
        <StateMessage
          title="Ana sayfa yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          onAction={() => navigation.setParams({ state: undefined })}
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Ana Sayfa" headerVariant="none">
        <OfflineNotice />
        <HomeReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ana Sayfa" headerVariant="none">
      <HomeReadyContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: spacing[2.5]
    },
    headerLeft: {
      flex: 1
    },
    greeting: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      marginBottom: 2
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      flexWrap: 'wrap'
    },
    nameText: {
      fontSize: fontSizes['7xl'],
      fontWeight: fontWeights.extraBold,
      color: c.textBrand
    },
    subscriptionBadge: {
      paddingHorizontal: spacing[1],
      paddingVertical: spacing[0.5],
      borderRadius: radii.full,
      alignSelf: 'center'
    },
    subscriptionBadgeText: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold
    },
    notificationWrapper: {
      position: 'relative',
      marginTop: spacing[0.5]
    },
    notificationButton: {
      backgroundColor: c.surfaceVariant,
      minWidth: 48,
      minHeight: 48
    },
    notificationDot: {
      position: 'absolute',
      top: spacing[1],
      right: spacing[1],
      minWidth: 16,
      height: 16,
      borderRadius: radii.full,
      borderWidth: 2,
      borderColor: c.surface,
      backgroundColor: c.error,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 2,
      pointerEvents: 'none'
    },
    notificationDotText: {
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.extraBold,
      color: c.onError,
      lineHeight: 12
    },
    searchWrapper: {
      marginBottom: spacing[2.5],
      minHeight: 48
    },
    searchWrapperDisabled: {
      opacity: 0.45
    },
    searchInput: {
      backgroundColor: c.surface
    },
    searchOutline: {
      borderWidth: 2,
      borderRadius: radii.xl,
      borderColor: c.outline
    },
    searchContent: {
      paddingVertical: spacing[1]
    },
    statsRow: {
      flexDirection: 'row',
      gap: spacing[1],
      marginBottom: spacing[3]
    },
    section: {
      marginBottom: spacing[3]
    },
    sectionHeaderRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing[1]
    },
    sectionTitle: {
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary
    },
    sectionTitleBlock: {
      marginBottom: spacing[1]
    },
    countdownBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[0.5],
      backgroundColor: c.warningContainer,
      paddingHorizontal: spacing[1],
      paddingVertical: spacing[0.5],
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: c.accentWarning
    },
    countdownText: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.onWarningContainer
    },
    continueCard: {
      padding: spacing[2]
    },
    continueCardEmpty: {
      padding: spacing[2.5],
      alignItems: 'center',
      gap: spacing[1.5]
    },
    continueEmptyTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      textAlign: 'center'
    },
    continueEmptyDesc: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      textAlign: 'center',
      lineHeight: 20
    },
    continueRow: {
      flexDirection: 'row',
      gap: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    continueIcon: {
      width: 56,
      height: 56,
      borderRadius: radii.lg,
      backgroundColor: c.primaryContainer,
      alignItems: 'center',
      justifyContent: 'center'
    },
    continueIconText: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.extraBold,
      color: c.primary
    },
    continueInfo: {
      flex: 1,
      justifyContent: 'center'
    },
    continueTitle: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: spacing[0.5]
    },
    continueSubtitle: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    },
    progressRow: {
      marginBottom: spacing[1.5]
    },
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing[1]
    },
    progressLabel: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.semiBold,
      color: c.textTertiary
    },
    progressValue: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.primary
    },
    progressBar: {
      height: spacing[1],
      borderRadius: radii.full
    },
    contentNavGrid: {
      gap: spacing[1]
    },
    contentNavRow: {
      flexDirection: 'row',
      gap: spacing[1]
    },
    programCard: {
      padding: spacing[1.5]
    },
    programDescription: {
      fontSize: fontSizes.md,
      color: c.textTertiary,
      marginBottom: spacing[1.5],
      lineHeight: 20
    },
    activeContentCard: {
      padding: spacing[1.5],
      marginBottom: 0
    },
    activeContentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    activeContentInfo: {
      flex: 1
    },
    activeContentTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: c.textPrimary
    },
    activeContentMeta: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    },
    activeContentPct: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.primary
    },
    bottomSpacer: {
      height: spacing[3]
    }
  });
}
