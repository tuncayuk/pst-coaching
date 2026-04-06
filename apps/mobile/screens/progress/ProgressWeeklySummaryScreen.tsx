import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PText } from '../../components';
import { getContentProgressForUser, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const dailyStats = [
  { label: 'Pzt', value: 2 },
  { label: 'Sal', value: 1 },
  { label: 'Car', value: 3 },
  { label: 'Per', value: 0 },
  { label: 'Cum', value: 2 },
  { label: 'Cmt', value: 1 },
  { label: 'Paz', value: 2 }
];
const MAX_DAILY = Math.max(...dailyStats.map(d => d.value), 1);

const TYPE_BADGE: Record<string, string> = {
  journey_day: 'Yolculuk',
  package: 'Paket',
  workshop: 'Atolye',
  ebook: 'e-Kitap'
};

const ProgressWeeklySummaryContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const progressItems = getContentProgressForUser(user?.id);
  // AC-FR-E6-04-02: completed content list
  const completed = progressItems.filter(p => p.status === 'completed');

  return (
    <>
      {/* Weekly bar chart */}
      <SectionCard title="Haftalik Aktivite">
        <View style={styles.barChart}>
          {dailyStats.map(day => (
            <View key={day.label} style={styles.barCol}>
              <PText style={styles.barValue}>{day.value}</PText>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { height: `${(day.value / MAX_DAILY) * 100}%` as any },
                    day.value === 0 && styles.barEmpty
                  ]}
                />
              </View>
              <PText style={styles.barLabel}>{day.label}</PText>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E6-04-01: positive trend, challenge area, suggestion */}
      <SectionCard title="Haftalik Analiz">
        <View style={styles.trendCard}>
          <PText style={styles.trendIcon}>+</PText>
          <View style={styles.trendInfo}>
            <PText style={styles.trendTitle}>Olumlu Trend</PText>
            <PText style={styles.trendBody}>
              Carsamba gunu 3 seans ile en verimli gunun. Oglen saatlerinde odagin yuuksek.
            </PText>
          </View>
        </View>
        <View style={[styles.trendCard, styles.trendChallenge]}>
          <PText style={styles.trendIconChallenge}>!</PText>
          <View style={styles.trendInfo}>
            <PText style={[styles.trendTitle, styles.trendTitleChallenge]}>Zorlanan Alan</PText>
            <PText style={styles.trendBody}>
              Persembe gunleri eksik kaliyor. Kisa bir hatirlatici planlamayi dene.
            </PText>
          </View>
        </View>
        <View style={styles.suggestionBox}>
          <PText style={styles.suggestionLabel}>Oneri</PText>
          <PText style={styles.suggestionText}>
            Pazartesi sabahi 10 dakikalik bir okuma hedefi belirle ve haftalik serisini kir.
          </PText>
        </View>
      </SectionCard>

      {/* AC-FR-E6-04-02: completed content list */}
      <SectionCard title="Tamamlanan Icerikler">
        {completed.length === 0 ? (
          <PText style={styles.emptyHint}>Bu hafta tamamlanan icerik yok.</PText>
        ) : (
          completed.map(item => (
            <PCard key={item.id} style={styles.completedCard}>
              <PCard.Title
                title={TYPE_BADGE[item.content_type] ?? item.content_type}
                subtitle={item.completed_at ? new Date(item.completed_at).toLocaleDateString('tr-TR') : ''}
                right={() => (
                  <PChip compact style={styles.doneBadge}>
                    Tamamlandi
                  </PChip>
                )}
              />
            </PCard>
          ))
        )}
      </SectionCard>

      <SectionCard title="Rapor">
        <PButton mode="contained" disabled={isOffline} onPress={() => navigation.navigate('ProgressReportExport')}>
          Tam Raporu Gor
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProgressWeeklySummaryScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Haftalik Ozet" subtitle="Ozet hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={80} />
        </SectionCard>
        <SectionCard title="Ozet">
          <SkeletonBlock height={72} />
          <SkeletonBlock height={72} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  // AC-FR-E6-04-03: empty state when no data
  if (state === 'empty') {
    return (
      <ScreenLayout title="Haftalik Ozet" subtitle="Aktivite olusacak">
        <StateMessage
          title="Haftalik veri yok"
          description="Bu hafta henuz icerik tamamlamadiniz. Ilerlemeye baslayarak haftalik ozet olusturun."
          actionLabel="Icerik Bul"
          icon="calendar-week"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Haftalik Ozet" subtitle="Bir sorun olustu">
        <StateMessage
          title="Ozet yuklenemedi"
          description="Verileri getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Haftalik Ozet" subtitle="Onbellekteki icerikler">
        <OfflineNotice />
        <ProgressWeeklySummaryContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Haftalik Ozet" subtitle="Haftani gozden gecir">
      <ProgressWeeklySummaryContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    barChart: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      height: 100,
      marginBottom: spacing[1]
    },
    barCol: {
      flex: 1,
      alignItems: 'center',
      gap: 4
    },
    barValue: { fontSize: 10, color: c.textTertiary },
    barTrack: {
      flex: 1,
      width: 20,
      backgroundColor: c.outlineVariant,
      borderRadius: radii.sm,
      overflow: 'hidden',
      justifyContent: 'flex-end'
    },
    barFill: {
      width: '100%',
      backgroundColor: '#6B46C1',
      borderRadius: radii.sm
    },
    barEmpty: { backgroundColor: c.outline },
    barLabel: { fontSize: 10, color: c.textTertiary },
    trendCard: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      padding: spacing[1.5],
      backgroundColor: '#DCFCE7',
      borderRadius: radii.md,
      marginBottom: 10,
      borderLeftWidth: 4,
      borderLeftColor: c.success
    },
    trendChallenge: {
      backgroundColor: c.warningContainer,
      borderLeftColor: '#CA8A04'
    },
    trendIcon: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.black,
      color: '#15803D'
    },
    trendIconChallenge: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.black,
      color: '#A16207'
    },
    trendInfo: { flex: 1 },
    trendTitle: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: '#15803D',
      marginBottom: 2
    },
    trendTitleChallenge: { color: '#A16207' },
    trendBody: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      lineHeight: 18
    },
    suggestionBox: {
      padding: spacing[1.5],
      backgroundColor: palette.purple50,
      borderRadius: radii.md,
      borderLeftWidth: 4,
      borderLeftColor: '#6B46C1'
    },
    suggestionLabel: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
      color: '#6B46C1',
      marginBottom: 4
    },
    suggestionText: {
      fontSize: fontSizes.md,
      color: '#1F2937',
      lineHeight: 18
    },
    completedCard: { marginBottom: spacing[1] },
    doneBadge: {
      backgroundColor: '#DCFCE7',
      marginRight: 8
    },
    emptyHint: { fontSize: fontSizes.md, color: c.textTertiary }
  });
}
