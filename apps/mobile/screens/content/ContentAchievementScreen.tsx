import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PAvatar, PButton, PCard, PDivider, PText } from '../../components';
import {
  getAchievements,
  getContentItemsForParent,
  getModules,
  getPackagesForModule,
  getPrimaryUser
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

const ContentAchievementContent = ({ achievementId, isOffline }: { achievementId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();

  // Find achievement by id or fall back to user's first achievement
  const achievement =
    getAchievements().find((a: any) => a.id === achievementId) ??
    getAchievements().find((a: any) => a.user_id === user?.id);

  // Resolve completed module info
  const completedModule = getModules().find(m => m.id === achievement?.source_id) ?? getModules()[0];

  // Derive stats from real data
  const modulePackages = completedModule ? getPackagesForModule(completedModule.id) : [];
  const totalSections = modulePackages.reduce((acc, pkg) => {
    return acc + getContentItemsForParent('package', pkg.id).length;
  }, 0);
  // Estimated reading time: 5 min per section
  const estMinutes = totalSections * 5;
  const estHours = Math.floor(estMinutes / 60);
  const timeLabel = estHours > 0 ? estHours + 's' : estMinutes + 'dk';

  // Next module recommendation
  const allModules = getModules();
  const currentIndex = allModules.findIndex(m => m.id === completedModule?.id);
  const nextModule = allModules[currentIndex + 1] ?? null;

  return (
    <View style={styles.body}>
      {/* AC-FR-E11-05-01/02: completion header + certificate */}
      <View
        style={styles.celebrationHeader}
        accessibilityRole="header"
        accessible
        accessibilityLabel={'Tebrikler! ' + (completedModule?.title ?? 'Modul') + ' tamamlandi.'}
      >
        {/* Certificate badge */}
        <PAvatar.Icon size={96} icon="medal" color="#FFFFFF" style={styles.medalIcon} accessible={false} />
        <PText style={styles.celebrationTitle}>Tebrikler!</PText>
        <PText style={styles.celebrationSubtitle}>{completedModule?.title ?? 'Modul'} tamamlandi</PText>
      </View>

      <View style={styles.content}>
        {/* AC-FR-E11-05-02: certificate/badge presentation */}
        <PCard
          style={styles.certCard}
          accessible
          accessibilityLabel={
            'Sertifika: ' +
            (completedModule?.title ?? 'Modul') +
            ' Uzmani.' +
            ' ' +
            modulePackages.length +
            ' paket, ' +
            totalSections +
            ' bolum, ' +
            timeLabel +
            ' egitim.'
          }
        >
          <View style={styles.certHeader}>
            <PAvatar.Icon size={36} icon="certificate" color="#F59E0B" style={styles.certIconBg} accessible={false} />
            <PText style={styles.certTitle}>{(completedModule?.title ?? 'Modul') + ' Uzmani'}</PText>
          </View>
          <PDivider style={styles.certDivider} />
          <View style={styles.statsRow} accessibilityRole="none">
            <View style={styles.statItem}>
              <PText style={styles.statValue}>{modulePackages.length}</PText>
              <PText style={styles.statLabel}>Paket</PText>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <PText style={styles.statValue}>{totalSections}</PText>
              <PText style={styles.statLabel}>Bolum</PText>
            </View>
            <View style={styles.statItem}>
              <PText style={styles.statValue}>{timeLabel}</PText>
              <PText style={styles.statLabel}>Sure</PText>
            </View>
          </View>
          <View style={styles.xpRow}>
            <View style={styles.xpBadge}>
              <PAvatar.Icon size={20} icon="star" color="#F59E0B" style={styles.xpIcon} accessible={false} />
              <PText style={styles.xpText}>+100 XP</PText>
            </View>
            <View style={styles.rozetBadge}>
              <PAvatar.Icon size={20} icon="shield-star" color="#7C4DFF" style={styles.rozetIcon} accessible={false} />
              <PText style={styles.rozetText}>Rozet Kazanildi</PText>
            </View>
          </View>
        </PCard>

        {/* AC-FR-E11-05-04: progress dashboard sync notice */}
        <PCard style={styles.dashboardCard}>
          <View style={styles.dashboardRow}>
            <PAvatar.Icon size={28} icon="chart-line" color="#0EA5E9" style={styles.dashIcon} accessible={false} />
            <View style={styles.dashInfo}>
              <PText style={styles.dashTitle}>Gelisim Panenize Yansidi</PText>
              <PText style={styles.dashDesc}>
                Bu basari gelisim panelinizde gosterilmekte ve ilerleme istatistiklerinize eklenmistir.
              </PText>
            </View>
          </View>
        </PCard>

        {/* AC-FR-E11-05-03: next module recommendation */}
        {nextModule && (
          <PCard style={styles.nextCard}>
            <View style={styles.nextHeader}>
              <PAvatar.Icon
                size={28}
                icon="layers-outline"
                color="#7C4DFF"
                style={styles.nextIcon}
                accessible={false}
              />
              <PText style={styles.nextTitle}>Onerilen Sonraki Modul</PText>
            </View>
            <PText style={styles.nextModuleName}>{nextModule.title}</PText>
            <PText style={styles.nextModuleDesc} numberOfLines={2}>
              {nextModule.description}
            </PText>
            <PButton
              mode="contained"
              compact
              disabled={isOffline}
              style={styles.goNextBtn}
              onPress={() => navigation.navigate('ContentModuleHome', { id: nextModule.id })}
              accessibilityLabel={'Bir sonraki module git: ' + nextModule.title}
            >
              Module Git
            </PButton>
          </PCard>
        )}

        {/* Actions */}
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.actionBtn}
          accessibilityLabel="Sertifikami paylas"
          onPress={() => {}}
        >
          Sertifikami Paylas
        </PButton>
        <PButton
          mode="text"
          style={styles.actionBtn}
          accessibilityLabel="Ana sayfaya don"
          onPress={() => navigation.getParent()?.navigate('MainTabs')}
        >
          Ana Sayfaya Don
        </PButton>
      </View>
    </View>
  );
};

export const ContentAchievementScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);
  const achievementId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Basari" headerVariant="none" contentStyle={styles.pageContent}>
        <PActivityIndicator animating accessibilityLabel="Basari yukleniyor" />
        <SkeletonBlock height={200} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Basari" headerVariant="none" contentStyle={styles.pageContent}>
        <StateMessage
          title="Basari bulunamadi"
          description="Bu tamamlama kaydina ulasilamadi."
          actionLabel="Kutuphaneye Don"
          icon="medal-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Basari" headerVariant="none" contentStyle={styles.pageContent}>
        <StateMessage
          title="Basari yuklenemedi"
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
      <ScreenLayout title="Basari" headerVariant="none" contentStyle={styles.pageContent}>
        <OfflineNotice />
        <ContentAchievementContent achievementId={achievementId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Basari" headerVariant="none" contentStyle={styles.pageContent}>
      <ContentAchievementContent achievementId={achievementId} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    pageContent: { paddingBottom: 40 },
    body: { flex: 1 },
    celebrationHeader: {
      backgroundColor: '#1E3A5F',
      paddingTop: 36,
      paddingBottom: 40,
      alignItems: 'center'
    },
    medalIcon: {
      backgroundColor: '#F59E0B',
      marginBottom: spacing[2],
      width: 96,
      height: 96,
      borderRadius: 48
    },
    celebrationTitle: {
      fontSize: fontSizes['8xl'],
      fontWeight: fontWeights.black,
      color: palette.white,
      marginBottom: 6
    },
    celebrationSubtitle: {
      fontSize: fontSizes.xl,
      color: 'rgba(255,255,255,0.8)',
      textAlign: 'center',
      paddingHorizontal: spacing[4]
    },
    content: { paddingHorizontal: spacing[2], paddingTop: 20 },
    certCard: {
      padding: spacing[2],
      borderRadius: radii.xl,
      marginBottom: spacing[1.5],
      backgroundColor: '#FFFBEB',
      borderWidth: 1,
      borderColor: '#FCD34D'
    },
    certHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
    certIconBg: { backgroundColor: c.warningContainer },
    certTitle: { fontSize: fontSizes['2xl'], fontWeight: fontWeights.extraBold, color: '#92400E' },
    certDivider: { marginBottom: spacing[1.5] },
    statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing[1.5] },
    statItem: { alignItems: 'center', flex: 1 },
    statBorder: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#FCD34D'
    },
    statValue: { fontSize: fontSizes['5xl'], fontWeight: fontWeights.extraBold, color: '#92400E' },
    statLabel: { fontSize: fontSizes.sm, color: '#B45309', marginTop: 2 },
    xpRow: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
    xpBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: c.warningContainer,
      borderRadius: radii.md,
      paddingHorizontal: 10,
      paddingVertical: 4
    },
    xpIcon: { backgroundColor: 'transparent' },
    xpText: { fontSize: fontSizes.base, fontWeight: fontWeights.bold, color: '#92400E' },
    rozetBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: c.secondaryContainer,
      borderRadius: radii.md,
      paddingHorizontal: 10,
      paddingVertical: 4
    },
    rozetIcon: { backgroundColor: 'transparent' },
    rozetText: { fontSize: fontSizes.base, fontWeight: fontWeights.bold, color: '#4C1D95' },
    dashboardCard: {
      padding: 14,
      borderRadius: radii.lg,
      marginBottom: spacing[1.5],
      backgroundColor: '#F0F9FF',
      borderLeftWidth: 3,
      borderLeftColor: '#0EA5E9'
    },
    dashboardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
    dashIcon: { backgroundColor: '#E0F2FE' },
    dashInfo: { flex: 1 },
    dashTitle: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: '#0369A1',
      marginBottom: 4
    },
    dashDesc: { fontSize: fontSizes.base, color: '#0C4A6E', lineHeight: 18 },
    nextCard: {
      padding: spacing[2],
      borderRadius: radii.lg,
      marginBottom: spacing[2],
      backgroundColor: '#F5F3FF',
      borderLeftWidth: 3,
      borderLeftColor: '#7C4DFF'
    },
    nextHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: spacing[1]
    },
    nextIcon: { backgroundColor: c.secondaryContainer },
    nextTitle: { fontSize: fontSizes.base, fontWeight: fontWeights.bold, color: '#6D28D9' },
    nextModuleName: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      color: '#1E3A5F',
      marginBottom: 4
    },
    nextModuleDesc: {
      fontSize: fontSizes.md,
      color: '#4C1D95',
      lineHeight: 18,
      marginBottom: spacing[1.5],
      opacity: 0.85
    },
    goNextBtn: { alignSelf: 'flex-start', borderRadius: radii.md },
    actionBtn: { marginBottom: spacing[1] }
  });
}
