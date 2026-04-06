import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  getModuleById,
  getModules,
  getPackagesForModule,
  getPrimaryUser
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

// Derive package status from real content progress data
function derivePackageStatus(
  pkgId: string,
  allPackages: Array<{ id: string; order_index?: number }>,
  userProgress: Array<{ content_type: string; content_id: string; status: string }>,
  contentItems: Array<{ parent_type: string; parent_id: string; id: string }>
): 'completed' | 'active' | 'locked' {
  const items = contentItems.filter(ci => ci.parent_type === 'package' && ci.parent_id === pkgId);
  if (items.length === 0) return 'active';

  const completedIds = new Set(userProgress.filter(p => p.status === 'completed').map(p => p.content_id));
  const allCompleted = items.every(ci => completedIds.has(ci.id));
  if (allCompleted) return 'completed';

  const anyStarted = items.some(ci => userProgress.some(p => p.content_id === ci.id));
  if (anyStarted) return 'active';

  // Check if previous package is completed
  const sorted = [...allPackages].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0));
  const myIndex = sorted.findIndex(p => p.id === pkgId);
  if (myIndex <= 0) return 'active'; // first package always active

  const prevPkg = sorted[myIndex - 1];
  const prevItems = contentItems.filter(ci => ci.parent_type === 'package' && ci.parent_id === prevPkg.id);
  const prevDone = prevItems.length > 0 && prevItems.every(ci => completedIds.has(ci.id));
  return prevDone ? 'active' : 'locked';
}

const STATUS_CONFIG: Record<
  'completed' | 'active' | 'locked',
  { icon: string; borderColor: string; bg: string; iconColor: string }
> = {
  completed: { icon: 'check-circle', borderColor: '#16A34A', bg: '#D1FAE5', iconColor: '#16A34A' },
  active: { icon: 'play-circle', borderColor: '#0EA5E9', bg: '#E0F2FE', iconColor: '#0EA5E9' },
  locked: { icon: 'lock', borderColor: '#9CA3AF', bg: '#F4F4F5', iconColor: '#9CA3AF' }
};

const ContentModuleHomeContent = ({ moduleId, isOffline }: { moduleId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const progress = getContentProgressForUser(user?.id);
  const allContentItems = getContentItemsForParent('package', '').concat(
    // Flatten across all packages - use broad fetch
    Array.from({ length: 0 })
  );

  const module = getModuleById(moduleId) ?? getModules()[0];
  const packages = module
    ? [...getPackagesForModule(module.id)].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
    : [];

  // Build per-package content items efficiently
  const packageItems = packages.flatMap(pkg =>
    getContentItemsForParent('package', pkg.id).map(ci => ({
      ...ci,
      parent_id: pkg.id
    }))
  );

  const completedIds = new Set(progress.filter(p => p.status === 'completed').map(p => p.content_id));
  const totalItems = packageItems.length;
  const completedItems = packageItems.filter(ci => completedIds.has(ci.id)).length;
  const progressPercent = totalItems > 0 ? completedItems / totalItems : 0;

  // AC-FR-E11-01-03: find first non-completed (active) package
  const nextPackage = packages.find(pkg => {
    const items = packageItems.filter(ci => ci.parent_id === pkg.id);
    if (items.length === 0) return false;
    return !items.every(ci => completedIds.has(ci.id));
  });

  const completedPackageCount = packages.filter(pkg => {
    const items = packageItems.filter(ci => ci.parent_id === pkg.id);
    return items.length > 0 && items.every(ci => completedIds.has(ci.id));
  }).length;

  const handleContinue = () => {
    if (nextPackage) {
      navigation.navigate('ContentPackageDetail', { id: nextPackage.id });
    }
  };

  return (
    <View>
      {/* Hero header */}
      <View
        style={styles.hero}
        accessibilityRole="header"
        accessible
        accessibilityLabel={'Modul: ' + (module?.title ?? 'Modul')}
      >
        <PIconButton
          icon="arrow-left"
          iconColor="#1E3A5F"
          style={styles.heroBack}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Geri don"
          accessibilityRole="button"
        />
        <PAvatar.Icon size={72} icon="layers" style={styles.heroIcon} color="#FFFFFF" accessible={false} />
        <PText style={styles.heroTitle} accessibilityRole="header">
          {module?.title ?? 'Modul'}
        </PText>
        <PText style={styles.heroDesc}>{module?.description ?? 'Becerilerinizi guclendirin.'}</PText>
      </View>

      <View style={styles.content}>
        {/* AC-FR-E11-01-01: module name + progress % */}
        <PCard style={styles.progressCard}>
          <View
            style={styles.progressHeader}
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: 100, now: Math.round(progressPercent * 100) }}
            accessibilityLabel={
              'Ilerleme: yuzde ' +
              Math.round(progressPercent * 100) +
              ', ' +
              completedPackageCount +
              ' / ' +
              packages.length +
              ' paket tamamlandi'
            }
          >
            <PText style={styles.progressLabel}>Ilerleme</PText>
            <PText style={styles.progressValue}>{Math.round(progressPercent * 100)}%</PText>
          </View>
          <PProgressBar progress={progressPercent} style={styles.progressBar} color="#0EA5E9" accessible={false} />
          <PText style={styles.progressMeta} accessible={false}>
            {completedPackageCount}/{packages.length} paket tamamlandi
          </PText>
        </PCard>

        {/* AC-FR-E11-01-03: "Devam Et" CTA */}
        {nextPackage && (
          <PButton
            mode="contained"
            style={styles.continueBtn}
            disabled={isOffline}
            onPress={handleContinue}
            accessibilityLabel={'Devam et: ' + nextPackage.title}
            accessibilityRole="button"
          >
            Devam Et
          </PButton>
        )}

        {/* AC-FR-E11-01-02: sorted packages with status */}
        <PText style={styles.sectionTitle}>Paketler</PText>
        <View style={styles.packageList}>
          {packages.map((pkg, idx) => {
            const pkgItems = packageItems.filter(ci => ci.parent_id === pkg.id);
            const pkgCompleted = pkgItems.length > 0 && pkgItems.every(ci => completedIds.has(ci.id));
            const pkgStarted = pkgItems.some(ci => progress.some(p => p.content_id === ci.id));
            const status: 'completed' | 'active' | 'locked' = pkgCompleted
              ? 'completed'
              : pkgStarted
                ? 'active'
                : idx === 0
                  ? 'active'
                  : (() => {
                      const prev = packages[idx - 1];
                      const prevItems = packageItems.filter(ci => ci.parent_id === prev?.id);
                      return prevItems.length > 0 && prevItems.every(ci => completedIds.has(ci.id))
                        ? 'active'
                        : 'locked';
                    })();
            const cfg = STATUS_CONFIG[status];
            const isLocked = status === 'locked';
            const sectionCount = pkgItems.length;
            const completedSections = pkgItems.filter(ci => completedIds.has(ci.id)).length;

            const statusLabel =
              status === 'completed' ? 'Tamamlandi' : status === 'active' ? 'Devam Ediyor' : 'Kilitli';

            return (
              <TouchableOpacity
                key={pkg.id}
                style={[styles.packageCard, { borderLeftColor: cfg.borderColor, backgroundColor: cfg.bg }]}
                disabled={isLocked || isOffline}
                onPress={() => navigation.navigate('ContentPackageDetail', { id: pkg.id })}
                accessibilityRole="button"
                accessibilityLabel={
                  'Paket ' +
                  (idx + 1) +
                  ': ' +
                  pkg.title +
                  '. Durum: ' +
                  statusLabel +
                  '. ' +
                  completedSections +
                  '/' +
                  sectionCount +
                  ' bolum tamamlandi.'
                }
                accessibilityState={{ disabled: isLocked }}
              >
                <View style={styles.packageRow}>
                  <PAvatar.Icon
                    size={36}
                    icon={cfg.icon}
                    color={cfg.iconColor}
                    style={[styles.pkgIconBg, { backgroundColor: cfg.borderColor + '22' }]}
                    accessible={false}
                  />
                  <View style={styles.packageInfo}>
                    <View style={styles.pkgTitleRow}>
                      <PText style={[styles.packageTitle, isLocked && styles.packageTitleLocked]} numberOfLines={1}>
                        {pkg.title}
                      </PText>
                      <View style={[styles.statusBadge, { backgroundColor: cfg.borderColor + '22' }]}>
                        <PText style={[styles.statusBadgeText, { color: cfg.borderColor }]}>{statusLabel}</PText>
                      </View>
                    </View>
                    <PText style={styles.packageMeta}>
                      {isLocked
                        ? 'Onceki paketi tamamlayin'
                        : completedSections + '/' + sectionCount + ' bolum tamamlandi'}
                    </PText>
                    {!isLocked && sectionCount > 0 && (
                      <PProgressBar
                        progress={sectionCount > 0 ? completedSections / sectionCount : 0}
                        style={styles.pkgProgressBar}
                        color={cfg.borderColor}
                        accessible={false}
                      />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {packages.length === 0 && <PText style={styles.emptyHint}>Bu modul icin paket bulunamadi.</PText>}

        {isOffline && (
          <View style={styles.offlineNote}>
            <PText variant="bodySmall" style={styles.offlineNoteText}>
              Cevrimdisi mod: Son guncelleme cahleye aktarilmistir.
            </PText>
          </View>
        )}
      </View>
    </View>
  );
};

export const ContentModuleHomeScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);
  const moduleId = route?.params?.id;

  if (state === 'loading') {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <PActivityIndicator animating accessibilityLabel="Modul yukleniyor" />
          <SkeletonBlock height={72} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === 'empty') {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Modul bulunamadi"
            description="Bu modul su anda erisebilir degil."
            actionLabel="Kutuphaneye Don"
            icon="layers-outline"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === 'error') {
    return (
      <SafeAreaView style={styles.root}>
        <ScrollView contentContainerStyle={styles.page}>
          <StateMessage
            title="Modul yuklenemedi"
            description="Baglantini kontrol edip tekrar dene."
            actionLabel="Tekrar Dene"
            icon="alert-circle-outline"
            tone="error"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (state === 'offline') {
    return (
      <SafeAreaView style={styles.root}>
        <OfflineNotice />
        <ScrollView contentContainerStyle={styles.page}>
          <ContentModuleHomeContent moduleId={moduleId} isOffline />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView contentContainerStyle={styles.page}>
        <ContentModuleHomeContent moduleId={moduleId} />
      </ScrollView>
    </SafeAreaView>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    root: { flex: 1, backgroundColor: '#F8FAFC' },
    page: { paddingBottom: 40 },
    hero: {
      backgroundColor: '#1E3A5F',
      paddingTop: 16,
      paddingBottom: 32,
      paddingHorizontal: spacing[3],
      alignItems: 'center',
      position: 'relative'
    },
    heroBack: {
      position: 'absolute',
      top: 8,
      left: 8,
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderRadius: radii['2xl']
    },
    heroIcon: {
      backgroundColor: '#0EA5E9',
      marginBottom: spacing[1.5],
      marginTop: spacing[1]
    },
    heroTitle: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.extraBold,
      color: palette.white,
      textAlign: 'center',
      marginBottom: 6
    },
    heroDesc: {
      fontSize: fontSizes.lg,
      color: 'rgba(255,255,255,0.75)',
      textAlign: 'center',
      lineHeight: 20
    },
    content: { paddingHorizontal: spacing[2], paddingTop: 20 },
    progressCard: {
      padding: spacing[2],
      borderRadius: radii.xl,
      marginBottom: spacing[2],
      backgroundColor: palette.white,
      elevation: 1
    },
    progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing[1] },
    progressLabel: { fontSize: fontSizes.lg, fontWeight: fontWeights.semiBold, color: c.textSecondary },
    progressValue: { fontSize: fontSizes.xl, fontWeight: fontWeights.bold, color: '#0EA5E9' },
    progressBar: { height: 8, borderRadius: radii.md, marginBottom: 6 },
    progressMeta: { fontSize: fontSizes.base, color: c.textTertiary, textAlign: 'right' },
    continueBtn: { marginBottom: spacing[2.5], borderRadius: radii.lg },
    sectionTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: '#1E3A5F',
      marginBottom: spacing[1.5]
    },
    packageList: { gap: 10, marginBottom: spacing[3] },
    packageCard: {
      borderRadius: radii.lg,
      borderLeftWidth: 4,
      padding: spacing[1.5],
      backgroundColor: palette.white
    },
    packageRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1.5] },
    pkgIconBg: { borderRadius: 18 },
    packageInfo: { flex: 1 },
    pkgTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 3,
      gap: 6
    },
    packageTitle: { flex: 1, fontSize: fontSizes.lg, fontWeight: fontWeights.semiBold, color: '#1E293B' },
    packageTitleLocked: { color: '#9CA3AF' },
    statusBadge: {
      borderRadius: radii.md,
      paddingHorizontal: 7,
      paddingVertical: 2
    },
    statusBadgeText: { fontSize: 10, fontWeight: fontWeights.bold },
    packageMeta: { fontSize: fontSizes.base, color: c.textTertiary, marginTop: 2, marginBottom: 4 },
    pkgProgressBar: { height: 4, borderRadius: radii.sm },
    emptyHint: { opacity: 0.6, textAlign: 'center', paddingVertical: spacing[1.5] },
    offlineNote: {
      backgroundColor: '#FFF7ED',
      borderRadius: radii.md,
      padding: spacing[1.5],
      borderLeftWidth: 3,
      borderLeftColor: '#F59E0B',
      marginBottom: spacing[2]
    },
    offlineNoteText: { color: '#92400E' }
  });
}
