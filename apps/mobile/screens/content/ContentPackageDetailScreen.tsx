import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PDivider,
  PIconButton,
  PProgressBar,
  PText
} from '../../components';
import {
  getContentItemsForParent,
  getContentProgressForUser,
  getModules,
  getPackages,
  getPackagesForModule,
  getPrimaryUser
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = {
  state?: ScreenState;
  id?: string;
};

// BR-01: hours until next 08:00 (simulate with fixed value for mock)
function hoursUntil8am(): string {
  const now = new Date();
  const next8 = new Date(now);
  next8.setHours(8, 0, 0, 0);
  if (now.getHours() >= 8) next8.setDate(next8.getDate() + 1);
  const diffMs = next8.getTime() - now.getTime();
  const diffH = Math.floor(diffMs / 3600000);
  const diffM = Math.floor((diffMs % 3600000) / 60000);
  return diffH + 's ' + diffM + 'dk';
}

const SECTION_TYPE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  reading: { icon: 'book-open-outline', label: 'Okuma', color: '#7C4DFF' },
  exercise: { icon: 'pencil-outline', label: 'Uygulama', color: '#0EA5E9' },
  question: { icon: 'help-circle-outline', label: 'Soru', color: '#10B981' }
};

// AC-FR-E11-04: Locked state sub-component
const LockedPackageView = ({
  pkg,
  prevPkg,
  navigation
}: {
  pkg: { id: string; title: string };
  prevPkg: { id: string; title: string } | null;
  navigation: any;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const countdown = hoursUntil8am();

  return (
    <View style={styles.content}>
      {/* AC-FR-E11-04-01: locked indicator */}
      <View style={styles.lockedHeader} accessibilityRole="header">
        <PAvatar.Icon size={80} icon="lock" color="#9CA3AF" style={styles.lockIcon} accessible={false} />
        <PText style={styles.lockedTitle} accessibilityRole="header">
          Paket Kilitli
        </PText>
        <PText style={styles.lockedSubtitle}>{pkg.title}</PText>
      </View>

      {/* AC-FR-E11-04-02: lock reason (BR-04) */}
      <PCard
        style={styles.lockReasonCard}
        accessible
        accessibilityRole="none"
        accessibilityLabel={
          'Kilit nedeni: ' +
          (prevPkg ? prevPkg.title + ' paketini tamamlamaniz gerekiyor.' : 'Onceki paketi tamamlayin.')
        }
      >
        <View style={styles.lockReasonHeader}>
          <PAvatar.Icon
            size={28}
            icon="information-outline"
            color="#1D4ED8"
            style={styles.infoIcon}
            accessible={false}
          />
          <PText style={styles.lockReasonTitle}>Kilit Nedeni (BR-04)</PText>
        </View>
        <PText style={styles.lockReasonText}>
          Her paket, bir oncekinin ustune insaa edilir. Etkili ogrenme icin sirali ilerleme gereklidir.
        </PText>
        {prevPkg && (
          <View style={styles.prereqBox}>
            <PText style={styles.prereqLabel}>Tamamlanmasi gereken:</PText>
            <View style={styles.prereqRow}>
              <PAvatar.Icon size={24} icon="play-circle" color="#0EA5E9" style={styles.prereqIcon} accessible={false} />
              <PText style={styles.prereqTitle}>{prevPkg.title}</PText>
            </View>
          </View>
        )}
      </PCard>

      {/* AC-FR-E11-04-03: 08:00 countdown (BR-01) */}
      <PCard
        style={styles.countdownCard}
        accessible
        accessibilityLabel={'08:00 Kurali: Bir sonraki paket ' + countdown + ' icinde actilacak.'}
      >
        <View style={styles.countdownHeader}>
          <PAvatar.Icon size={28} icon="clock-outline" color="#F59E0B" style={styles.clockIcon} accessible={false} />
          <PText style={styles.countdownTitle}>08:00 Kurali (BR-01)</PText>
        </View>
        <PText style={styles.countdownText}>
          Bir onceki paketi tamamladiktan sonra yeni pakete ertesi gun saat 08:00'den itibaren erisebilirsiniz.
        </PText>
        <View style={styles.countdownRow}>
          <PText style={styles.countdownLabel}>Kalan sure:</PText>
          <PText
            style={styles.countdownValue}
            accessibilityLiveRegion="polite"
            accessibilityLabel={'Kalan sure: ' + countdown}
          >
            {countdown}
          </PText>
        </View>
      </PCard>

      {prevPkg && (
        <PButton
          mode="contained"
          style={styles.goToPrereqBtn}
          onPress={() => navigation.navigate('ContentPackageDetail', { id: prevPkg.id })}
          accessibilityLabel={'Onceki pakete git: ' + prevPkg.title}
        >
          Onceki Pakete Git
        </PButton>
      )}
      <PButton mode="outlined" style={styles.backBtn} onPress={() => navigation.goBack()} accessibilityLabel="Geri don">
        Geri Don
      </PButton>
    </View>
  );
};

// AC-FR-E11-02: Active/ready package detail
const PackageDetailView = ({
  pkg,
  isOffline,
  navigation
}: {
  pkg: { id: string; title: string; description?: string };
  isOffline?: boolean;
  navigation: any;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const user = getPrimaryUser();
  const progress = getContentProgressForUser(user?.id);
  const items = [...getContentItemsForParent('package', pkg.id)].sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  const completedIds = new Set(progress.filter(p => p.status === 'completed').map(p => p.content_id));
  const firstUnstarted = items.find(ci => !completedIds.has(ci.id));
  const progressFraction = items.length > 0 ? items.filter(ci => completedIds.has(ci.id)).length / items.length : 0;

  const navToSection = (item: { id: string; content_type: string }) => {
    if (item.content_type === 'exercise') {
      navigation.navigate('ContentExercise', { id: item.id });
    } else {
      navigation.navigate('ContentReading', { id: item.id });
    }
  };

  const handleStart = () => {
    if (firstUnstarted) {
      navToSection(firstUnstarted);
    } else if (items[0]) {
      navToSection(items[0]);
    }
  };

  // Simulated objectives from description
  const objectives = pkg.description
    ? [pkg.description]
    : ['Temel kavramlari anlamak', 'Uygulama adimlarini tamamlamak', 'Bir sonraki pakete gecis saglamak'];

  return (
    <View style={styles.content}>
      {/* AC-FR-E11-02-01: package description and objectives */}
      <PText style={styles.packageTitle}>{pkg.title}</PText>
      {progressFraction > 0 && (
        <View style={styles.pkgProgressRow}>
          <PProgressBar progress={progressFraction} style={styles.pkgProgressBar} color="#0EA5E9" accessible={false} />
          <PText style={styles.pkgProgressLabel}>{Math.round(progressFraction * 100)}% tamamlandi</PText>
        </View>
      )}

      <PCard style={styles.objectivesCard}>
        <View style={styles.objectivesHeader}>
          <PAvatar.Icon size={28} icon="target" color="#7C4DFF" style={styles.targetIcon} accessible={false} />
          <PText style={styles.objectivesTitle}>Paket Amaclari</PText>
        </View>
        {objectives.map((obj, i) => (
          <View
            key={i}
            style={styles.objRow}
            accessibilityRole="none"
            accessibilityLabel={'Amac ' + (i + 1) + ': ' + obj}
          >
            <PText style={styles.objBullet} accessibilityElementsHidden>
              -
            </PText>
            <PText style={styles.objText}>{obj}</PText>
          </View>
        ))}
      </PCard>

      {/* AC-FR-E11-02-02: sections list (reading + exercise) */}
      <PCard style={styles.sectionsCard}>
        <PText style={styles.sectionsTitle}>Icindekiler ({items.length} bolum)</PText>
        {items.map((item, idx) => {
          const typeCfg = SECTION_TYPE_CONFIG[item.content_type] ?? SECTION_TYPE_CONFIG.reading;
          const isDone = completedIds.has(item.id);
          const isNext = item.id === firstUnstarted?.id;

          return (
            <View key={item.id}>
              <View
                style={[styles.sectionRow, isNext && styles.sectionRowNext]}
                accessible
                accessibilityRole="button"
                accessibilityLabel={
                  idx +
                  1 +
                  '. ' +
                  item.title +
                  '. Tur: ' +
                  typeCfg.label +
                  (isDone ? '. Tamamlandi.' : isNext ? '. Siradaki bolum.' : '')
                }
              >
                <PAvatar.Icon
                  size={28}
                  icon={isDone ? 'check-circle' : typeCfg.icon}
                  color={isDone ? '#16A34A' : typeCfg.color}
                  style={[styles.sectionIcon, { backgroundColor: isDone ? '#D1FAE5' : typeCfg.color + '22' }]}
                  accessible={false}
                />
                <View style={styles.sectionInfo}>
                  <PText style={[styles.sectionTitle, isDone && styles.sectionTitleDone]}>{item.title}</PText>
                  <PText style={styles.sectionMeta}>{typeCfg.label}</PText>
                </View>
                {isNext && (
                  <View style={styles.nextBadge}>
                    <PText style={styles.nextBadgeText}>Siradaki</PText>
                  </View>
                )}
                {isDone && (
                  <PText style={styles.doneCheck} accessibilityElementsHidden>
                    +
                  </PText>
                )}
              </View>
              {idx < items.length - 1 && <PDivider style={styles.sectionDivider} />}
            </View>
          );
        })}
      </PCard>

      {/* AC-FR-E11-02-03: "Paketi Basla" CTA */}
      <PButton
        mode="contained"
        disabled={isOffline}
        style={styles.startBtn}
        onPress={handleStart}
        accessibilityLabel={progressFraction > 0 ? 'Pakete devam et' : 'Paketi basla'}
      >
        {progressFraction > 0 ? 'Devam Et' : 'Paketi Basla'}
      </PButton>
      <PButton mode="outlined" style={styles.backBtn} onPress={() => navigation.goBack()} accessibilityLabel="Geri don">
        Geri Don
      </PButton>
    </View>
  );
};

const ContentPackageDetailContent = ({ packageId, isOffline }: { packageId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const progress = getContentProgressForUser(user?.id);

  const allPackages = getPackages();
  const pkg = allPackages.find(p => p.id === packageId) ?? allPackages[0];
  if (!pkg) return null;

  // Find the module this package belongs to and sibling packages
  const modulePackages = getPackagesForModule(pkg.module_content_item_id).sort(
    (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
  );
  const myIndex = modulePackages.findIndex(p => p.id === pkg.id);
  const prevPkg = myIndex > 0 ? modulePackages[myIndex - 1] : null;

  // AC-FR-E11-02-04 / AC-FR-E11-04: compute locked state from real data
  let isLocked = false;
  if (prevPkg) {
    const prevItems = getContentItemsForParent('package', prevPkg.id);
    const completedIds = new Set(progress.filter(p => p.status === 'completed').map(p => p.content_id));
    isLocked = prevItems.length > 0 && !prevItems.every(ci => completedIds.has(ci.id));
  }

  return (
    <View>
      <View
        style={[styles.hero, isLocked && styles.heroLocked]}
        accessibilityRole="header"
        accessible
        accessibilityLabel={(isLocked ? 'Kilitli paket: ' : 'Paket: ') + pkg.title}
      >
        <PIconButton
          icon="arrow-left"
          iconColor="#FFFFFF"
          style={styles.heroBack}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Geri don"
          accessibilityRole="button"
        />
        <PAvatar.Icon
          size={64}
          icon={isLocked ? 'lock' : 'package-variant'}
          color="#FFFFFF"
          style={styles.heroAvatar}
          accessible={false}
        />
      </View>

      {isLocked ? (
        <LockedPackageView pkg={pkg} prevPkg={prevPkg} navigation={navigation} />
      ) : (
        <PackageDetailView pkg={pkg} isOffline={isOffline} navigation={navigation} />
      )}
    </View>
  );
};

export const ContentPackageDetailScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);
  const packageId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Paket" headerVariant="none" contentStyle={styles.pageContent}>
        <PActivityIndicator animating accessibilityLabel="Paket yukleniyor" />
        <SkeletonBlock height={64} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={80} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Paket" headerVariant="none" contentStyle={styles.pageContent}>
        <StateMessage
          title="Paket bulunamadi"
          description="Bu paket su anda erisebilir degil."
          actionLabel="Module Don"
          icon="package-variant"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Paket" headerVariant="none" contentStyle={styles.pageContent}>
        <StateMessage
          title="Paket yuklenemedi"
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
      <ScreenLayout title="Paket" headerVariant="none" contentStyle={styles.pageContent}>
        <OfflineNotice />
        <ContentPackageDetailContent packageId={packageId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Paket" headerVariant="none" contentStyle={styles.pageContent}>
      <ContentPackageDetailContent packageId={packageId} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    pageContent: { paddingBottom: 40 },
    hero: {
      height: 140,
      backgroundColor: '#1E3A5F',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    heroLocked: { backgroundColor: '#4B5563' },
    heroBack: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: 'rgba(255,255,255,0.15)',
      borderRadius: radii['2xl']
    },
    heroAvatar: { backgroundColor: 'rgba(255,255,255,0.15)' },
    content: { paddingHorizontal: spacing[2], paddingTop: 20 },
    // locked styles
    lockedHeader: { alignItems: 'center', marginBottom: spacing[3] },
    lockIcon: { backgroundColor: '#F4F4F5', marginBottom: spacing[1.5] },
    lockedTitle: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.extraBold,
      color: '#374151',
      marginBottom: 4
    },
    lockedSubtitle: { fontSize: fontSizes.lg, color: c.textTertiary, textAlign: 'center' },
    lockReasonCard: {
      padding: spacing[2],
      borderRadius: radii.lg,
      marginBottom: spacing[1.5],
      backgroundColor: '#EFF6FF',
      borderLeftWidth: 4,
      borderLeftColor: '#1D4ED8'
    },
    lockReasonHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    infoIcon: { backgroundColor: '#DBEAFE' },
    lockReasonTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: '#1E40AF' },
    lockReasonText: {
      fontSize: fontSizes.md,
      color: '#1E3A5F',
      lineHeight: 20,
      marginBottom: spacing[1.5]
    },
    prereqBox: { backgroundColor: c.surface, borderRadius: radii.md, padding: 10 },
    prereqLabel: { fontSize: fontSizes.sm, color: c.textTertiary, marginBottom: 6 },
    prereqRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
    prereqIcon: { backgroundColor: '#E0F2FE' },
    prereqTitle: { fontSize: fontSizes.md, fontWeight: fontWeights.semiBold, color: '#1E293B' },
    countdownCard: {
      padding: spacing[2],
      borderRadius: radii.lg,
      marginBottom: spacing[2],
      backgroundColor: '#FFFBEB',
      borderLeftWidth: 4,
      borderLeftColor: '#F59E0B'
    },
    countdownHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    clockIcon: { backgroundColor: c.warningContainer },
    countdownTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: '#92400E' },
    countdownText: { fontSize: fontSizes.md, color: '#78350F', lineHeight: 20, marginBottom: 10 },
    countdownRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
    countdownLabel: { fontSize: fontSizes.md, color: '#92400E' },
    countdownValue: {
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.extraBold,
      color: '#D97706'
    },
    goToPrereqBtn: { marginBottom: 10 },
    // active/detail styles
    packageTitle: {
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.extraBold,
      color: '#1E3A5F',
      marginBottom: 10
    },
    pkgProgressRow: { marginBottom: spacing[1.5] },
    pkgProgressBar: { height: 6, borderRadius: radii.sm, marginBottom: 4 },
    pkgProgressLabel: {
      fontSize: fontSizes.base,
      color: '#0EA5E9',
      textAlign: 'right',
      fontWeight: fontWeights.semiBold
    },
    objectivesCard: {
      padding: 14,
      borderRadius: radii.lg,
      marginBottom: spacing[1.5],
      backgroundColor: '#F5F3FF',
      borderLeftWidth: 3,
      borderLeftColor: '#7C4DFF'
    },
    objectivesHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    targetIcon: { backgroundColor: c.secondaryContainer },
    objectivesTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: '#4C1D95' },
    objRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 4 },
    objBullet: { fontSize: fontSizes['2xl'], color: '#7C4DFF', lineHeight: 20, marginTop: 1 },
    objText: { flex: 1, fontSize: fontSizes.md, color: '#4C1D95', lineHeight: 20 },
    sectionsCard: {
      padding: 14,
      borderRadius: radii.lg,
      marginBottom: spacing[2],
      backgroundColor: c.surface
    },
    sectionsTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: '#1E293B',
      marginBottom: spacing[1.5]
    },
    sectionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing[1],
      gap: 10
    },
    sectionRowNext: {
      backgroundColor: '#F0F9FF',
      borderRadius: radii.md,
      paddingHorizontal: spacing[1],
      marginHorizontal: -8
    },
    sectionIcon: { borderRadius: radii.xl },
    sectionInfo: { flex: 1 },
    sectionTitle: { fontSize: fontSizes.md, fontWeight: fontWeights.semiBold, color: '#1E293B' },
    sectionTitleDone: { color: c.textTertiary },
    sectionMeta: { fontSize: fontSizes.sm, color: '#9CA3AF', marginTop: 2 },
    nextBadge: {
      backgroundColor: '#0EA5E9',
      borderRadius: radii.sm,
      paddingHorizontal: 6,
      paddingVertical: 2
    },
    nextBadgeText: { fontSize: 10, fontWeight: fontWeights.bold, color: palette.white },
    doneCheck: { fontSize: fontSizes['3xl'], color: c.success, fontWeight: fontWeights.bold },
    sectionDivider: { marginVertical: 2 },
    startBtn: { marginBottom: 10, borderRadius: radii.lg },
    backBtn: { borderRadius: radii.lg }
  });
}
