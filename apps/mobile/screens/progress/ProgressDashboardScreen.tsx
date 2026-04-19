import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { trackCtaTap } from '../../analytics';
import { PActivityIndicator, PButton, PCard, PChip, PListIcon, PListItem, PProgressBar, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getAchievements, getContentProgressForUser, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const TYPE_META: Record<string, { label: string; icon: string; color: string }> = {
  journey: { label: 'Yolculuk', icon: 'map-marker-path', color: '#6B46C1' },
  module: { label: 'Modul', icon: 'cube-outline', color: '#0096B8' },
  workshop: { label: 'Atolye', icon: 'account-group-outline', color: '#D97706' },
  ebook: { label: 'e-Kitap', icon: 'book-open-variant', color: '#16A34A' }
};

// AC-FR-E6-01-02: streak computed from completed days
const computeStreak = (items: ReturnType<typeof getContentProgressForUser>) => {
  const completed = items.filter(p => p.status === 'completed' && p.completed_at);
  return completed.length; // simplified streak count
};

const ProgressReadyContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const progressItems = getContentProgressForUser(user?.id);
  const achievements = getAchievements().filter(a => a.user_id === user?.id);
  const streak = computeStreak(progressItems);
  const totalCompleted = progressItems.filter(p => p.status === 'completed').length;

  // AC-FR-E6-01-01: per-type breakdown
  const typeBreakdown = Object.entries(TYPE_META).map(([type, meta]) => {
    const typeItems = progressItems.filter(p => p.content_type === type);
    const done = typeItems.filter(p => p.status === 'completed').length;
    const total = typeItems.length || 1;
    return { ...meta, type, done, total, ratio: done / total };
  });

  // AC-FR-E6-01-02: submission (teslim) rate
  const submissionRate = progressItems.length
    ? progressItems.filter(p => p.status === 'completed').length / progressItems.length
    : 0;

  return (
    <>
      {/* Hero / summary header */}
      <View style={styles.hero}>
        <View style={styles.heroLeft}>
          <PText style={styles.heroGreeting}>Merhaba,</PText>
          <PText style={styles.heroName}>{user?.email?.split('@')[0] ?? 'Kullanici'}</PText>
        </View>
        <View style={styles.heroRight}>
          {/* AC-FR-E6-01-02: streak chip */}
          <View style={styles.streakBadge}>
            <PText style={styles.streakNum}>{streak}</PText>
            <PText style={styles.streakLabel}>Gun serisi</PText>
          </View>
        </View>
      </View>

      {/* AC-FR-E6-01-01: per-type progress cards */}
      <SectionCard title="Icerik Turune Gore Ilerleme">
        {typeBreakdown.map(t => (
          <View key={t.type} style={styles.typeRow}>
            <View style={[styles.typeIcon, { backgroundColor: t.color + '22' }]}>
              <PText style={[styles.typeIconText, { color: t.color }]}>
                {t.done}/{t.total}
              </PText>
            </View>
            <View style={styles.typeInfo}>
              <PText style={styles.typeLabel}>{t.label}</PText>
              {/* AC-FR-E6-01-03: accessibilityLabel for screen reader */}
              <PProgressBar
                progress={t.ratio}
                style={styles.typeBar}
                accessibilityLabel={`${t.label}: ${t.done} / ${t.total} tamamlandi`}
              />
            </View>
            <PChip compact style={{ backgroundColor: t.color + '22' }}>
              {Math.round(t.ratio * 100)}%
            </PChip>
          </View>
        ))}
        {/* AC-FR-E6-01-02: submission rate */}
        <View style={styles.submissionRow}>
          <PText style={styles.submissionLabel}>Teslim Orani:</PText>
          <PProgressBar
            progress={submissionRate}
            style={styles.submissionBar}
            accessibilityLabel={`Teslim orani: ${Math.round(submissionRate * 100)} yuzde`}
          />
          <PText style={styles.submissionPct}>{Math.round(submissionRate * 100)}%</PText>
        </View>
        <PText style={styles.completedCount}>Toplam: {totalCompleted} icerik tamamlandi</PText>
      </SectionCard>

      {/* Quick-nav row to sub-screens */}
      <SectionCard title="Detayli Raporlar">
        <View style={styles.navGrid}>
          <PButton
            mode="outlined"
            compact
            style={styles.navBtn}
            disabled={isOffline}
            onPress={() => {
              trackCtaTap('progress.dashboard', 'emotional_map_tapped');
              navigation.navigate('ProgressEmotionalMap');
            }}
          >
            Duygusal Harita
          </PButton>
          <PButton
            mode="outlined"
            compact
            style={styles.navBtn}
            disabled={isOffline}
            onPress={() => {
              trackCtaTap('progress.dashboard', 'strengths_tapped');
              navigation.navigate('ProgressStrengths');
            }}
          >
            Guclu Alanlar
          </PButton>
          <PButton
            mode="outlined"
            compact
            style={styles.navBtn}
            disabled={isOffline}
            onPress={() => {
              trackCtaTap('progress.dashboard', 'weekly_summary_tapped');
              navigation.navigate('ProgressWeeklySummary');
            }}
          >
            Haftalik Ozet
          </PButton>
          <PButton
            mode="outlined"
            compact
            style={styles.navBtn}
            disabled={isOffline}
            onPress={() => {
              trackCtaTap('progress.dashboard', 'report_export_tapped');
              navigation.navigate('ProgressReportExport');
            }}
          >
            Rapor Indir
          </PButton>
        </View>
      </SectionCard>

      {/* Achievements */}
      <SectionCard title="Basarilar">
        {achievements.length === 0 ? (
          <PText style={styles.emptyHint}>Henuz basari yok. Icerik tamamladikca rozetler kazanirsin.</PText>
        ) : (
          achievements.map(item => (
            <PListItem
              key={item.id}
              title={item.type === 'certificate' ? 'Sertifika' : 'Rozet'}
              description={item.source_type}
              left={props => <PListIcon {...props} icon="trophy-outline" />}
              onPress={() =>
                navigation.navigate('Content', {
                  screen: 'ContentAchievement',
                  params: { id: item.id }
                })
              }
            />
          ))
        )}
      </SectionCard>

      {/* Review CTA */}
      <SectionCard title="Degerlendirme">
        <PText style={styles.reviewHint}>Son tamamladigin icerigi degerlendirerek onerilerin kalitesini artir.</PText>
        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() =>
            navigation.navigate('ProgressCompletionReview', {
              contentType: 'journey',
              contentId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
            })
          }
        >
          Degerlendirme Yap
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProgressDashboardScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Gelisim" subtitle="Veriler hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
        <SectionCard title="Ozet">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Gelisim" subtitle="Ilerleme burada gorunecek">
        <StateMessage
          title="Henuz veri yok"
          description="Bir icerik tamamladiginda ilerleme raporun olusur."
          actionLabel="Icerik Bul"
          icon="chart-line"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Gelisim" subtitle="Bir sorun olustu">
        <StateMessage
          title="Gelisim yuklenemedi"
          description="Verileri getiremedik. Tekrar deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Gelisim" subtitle="Onbellekteki icerikler">
        <OfflineNotice />
        <ProgressReadyContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Gelisim" subtitle="Ilerlemeni takip et">
      <ProgressReadyContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    hero: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: c.textBrand,
      paddingHorizontal: spacing[2.5],
      paddingVertical: spacing[2.5],
      marginBottom: 0
    },
    heroLeft: { flex: 1 },
    heroGreeting: { fontSize: fontSizes.md, color: '#C4B5FD' },
    heroName: { fontSize: fontSizes['4xl'], fontWeight: fontWeights.extraBold, color: palette.white, marginTop: 2 },
    heroRight: {},
    streakBadge: {
      backgroundColor: '#6B46C1',
      borderRadius: radii.lg,
      paddingHorizontal: 14,
      paddingVertical: spacing[1],
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#C4B5FD'
    },
    streakNum: { fontSize: fontSizes['5xl'], fontWeight: fontWeights.extraBold, color: palette.white },
    streakLabel: { fontSize: 10, color: '#C4B5FD', marginTop: 2 },
    typeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      gap: 10
    },
    typeIcon: {
      width: 40,
      height: 40,
      borderRadius: radii.md,
      alignItems: 'center',
      justifyContent: 'center'
    },
    typeIconText: { fontSize: fontSizes.sm, fontWeight: fontWeights.bold },
    typeInfo: { flex: 1 },
    typeLabel: { fontSize: fontSizes.md, fontWeight: fontWeights.semiBold, color: c.textPrimary, marginBottom: 4 },
    typeBar: { height: 6, borderRadius: 3 },
    submissionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginTop: spacing[1.5],
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: c.outlineVariant
    },
    submissionLabel: { fontSize: fontSizes.base, color: c.textSecondary, flexShrink: 0 },
    submissionBar: { flex: 1, height: 6, borderRadius: 3 },
    submissionPct: { fontSize: fontSizes.base, fontWeight: fontWeights.bold, color: c.textBrand, flexShrink: 0 },
    completedCount: { fontSize: fontSizes.sm, color: c.textTertiary, marginTop: spacing[1] },
    navGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1]
    },
    navBtn: { flexShrink: 0 },
    primaryButton: { marginTop: spacing[1], alignSelf: 'flex-start' },
    reviewHint: { fontSize: fontSizes.md, color: c.textSecondary, marginBottom: spacing[1] },
    emptyHint: { fontSize: fontSizes.md, color: c.textTertiary }
  });
}
