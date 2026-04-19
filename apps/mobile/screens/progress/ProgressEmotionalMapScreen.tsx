import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PProgressBar, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

type Period = '14' | '30';

// AC-FR-E6-02-02: Legend with Sakin/Netlik/Gergin + color AND pattern/icon for color blindness (AC-FR-E6-02-04)
const MOOD_LEGEND = [
  { key: 'sakin', label: 'Sakin', color: '#DCFCE7', textColor: '#15803D', icon: '●' },
  { key: 'netlik', label: 'Netlik', color: '#DBEAFE', textColor: '#1D4ED8', icon: '■' },
  { key: 'merakli', label: 'Merakli', color: '#FEF9C3', textColor: '#A16207', icon: '▲' },
  { key: 'gergin', label: 'Gergin', color: '#FEE2E2', textColor: '#B91C1C', icon: '✕' }
];

// Mock daily mood data (14 days)
const MOOD_GRID_14 = [
  'sakin',
  'sakin',
  'netlik',
  'merakli',
  'sakin',
  'gergin',
  'sakin',
  'netlik',
  'merakli',
  'sakin',
  'sakin',
  'netlik',
  'sakin',
  'sakin'
];
const MOOD_GRID_30 = [
  ...MOOD_GRID_14,
  'sakin',
  'gergin',
  'merakli',
  'netlik',
  'sakin',
  'sakin',
  'netlik',
  'merakli',
  'sakin',
  'netlik',
  'sakin',
  'gergin',
  'sakin',
  'sakin',
  'netlik',
  'sakin'
];

const moodSummary14 = [
  { key: 'sakin', label: 'Sakin', pct: 57 },
  { key: 'netlik', label: 'Netlik', pct: 22 },
  { key: 'merakli', label: 'Merakli', pct: 14 },
  { key: 'gergin', label: 'Gergin', pct: 7 }
];
const moodSummary30 = [
  { key: 'sakin', label: 'Sakin', pct: 50 },
  { key: 'netlik', label: 'Netlik', pct: 27 },
  { key: 'merakli', label: 'Merakli', pct: 13 },
  { key: 'gergin', label: 'Gergin', pct: 10 }
];

const ProgressEmotionalMapContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  // AC-FR-E6-02-01: period toggle
  const [period, setPeriod] = useState<Period>('14');
  const grid = period === '14' ? MOOD_GRID_14 : MOOD_GRID_30;
  const summary = period === '14' ? moodSummary14 : moodSummary30;

  return (
    <>
      {/* AC-FR-E6-02-01: 14 / 30-day selector */}
      <SectionCard title="Sure Secimi">
        <View style={styles.periodRow}>
          {(['14', '30'] as Period[]).map(p => (
            <PButton
              key={p}
              mode={period === p ? 'contained' : 'outlined'}
              compact
              disabled={isOffline}
              onPress={() => setPeriod(p)}
              style={styles.periodBtn}
            >
              {p} Gun
            </PButton>
          ))}
        </View>
      </SectionCard>

      {/* Mood grid: color + icon for color-blind support (AC-FR-E6-02-04) */}
      <SectionCard title={`Son ${period} Gun Duygusal Harita`}>
        <View style={styles.grid}>
          {grid.map((mood, i) => {
            const meta = MOOD_LEGEND.find(m => m.key === mood)!;
            return (
              <View
                key={i}
                style={[styles.gridCell, { backgroundColor: meta.color }]}
                accessibilityLabel={`Gun ${i + 1}: ${meta.label}`}
              >
                <PText style={[styles.gridIcon, { color: meta.textColor }]}>{meta.icon}</PText>
              </View>
            );
          })}
        </View>
      </SectionCard>

      {/* AC-FR-E6-02-02: Legend */}
      <SectionCard title="Aciklama">
        <View style={styles.legendRow}>
          {MOOD_LEGEND.map(m => (
            <View key={m.key} style={styles.legendItem}>
              <View style={[styles.legendSwatch, { backgroundColor: m.color }]}>
                <PText style={[styles.legendIcon, { color: m.textColor }]}>{m.icon}</PText>
              </View>
              <PText style={styles.legendLabel}>{m.label}</PText>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* Mood summary percentages */}
      <SectionCard title={`${period} Gunluk Ozet`}>
        {summary.map(item => {
          const meta = MOOD_LEGEND.find(m => m.key === item.key)!;
          return (
            <View key={item.key} style={styles.summaryRow}>
              <View style={styles.summaryLabelRow}>
                <PText style={[styles.summaryIcon, { color: meta.textColor }]}>{meta.icon}</PText>
                <PText style={styles.summaryLabel}>{item.label}</PText>
              </View>
              <PProgressBar
                progress={item.pct / 100}
                style={styles.summaryBar}
                accessibilityLabel={`${item.label}: yuzde ${item.pct}`}
              />
              <PText style={[styles.summaryPct, { color: meta.textColor }]}>{item.pct}%</PText>
            </View>
          );
        })}
      </SectionCard>

      {/* AC-FR-E6-02-03: Disclaimer — always visible */}
      <View style={styles.disclaimer}>
        <PText style={styles.disclaimerText}>
          Bu bir teshis degildir. Duygusal verilerin yalnizca kisisel farkindalik icin sunulmaktadir.
        </PText>
      </View>
    </>
  );
};

export const ProgressEmotionalMapScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Duygusal Harita" subtitle="Harita hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={40} />
        </SectionCard>
        <SectionCard title="Ozet">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Duygusal Harita" subtitle="Duygu verisi olusacak">
        <StateMessage
          title="Duygu verisi yok"
          description="Gunluk pratik yaptikca duygusal haritan olusacak."
          actionLabel="Pratik Baslat"
          icon="emoticon-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Duygusal Harita" subtitle="Bir sorun olustu">
        <StateMessage
          title="Harita yuklenemedi"
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
      <ScreenLayout title="Duygusal Harita" subtitle="Onbellekteki icerikler">
        <OfflineNotice />
        <ProgressEmotionalMapContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Duygusal Harita" subtitle="Duygusal durumunu izle">
      <ProgressEmotionalMapContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    periodRow: {
      flexDirection: 'row',
      gap: 10
    },
    periodBtn: { flex: 1 },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6
    },
    gridCell: {
      width: 36,
      height: 36,
      borderRadius: radii.md,
      alignItems: 'center',
      justifyContent: 'center'
    },
    gridIcon: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold
    },
    legendRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1.5]
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6
    },
    legendSwatch: {
      width: 26,
      height: 26,
      borderRadius: radii.sm,
      alignItems: 'center',
      justifyContent: 'center'
    },
    legendIcon: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold
    },
    legendLabel: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    },
    summaryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: 10
    },
    summaryLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      width: 70
    },
    summaryIcon: { fontSize: fontSizes.sm },
    summaryLabel: { fontSize: fontSizes.base, color: c.textSecondary },
    summaryBar: { flex: 1, height: 6, borderRadius: 3 },
    summaryPct: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      width: 34,
      textAlign: 'right'
    },
    disclaimer: {
      marginHorizontal: 16,
      marginBottom: spacing[3],
      padding: spacing[1.5],
      backgroundColor: c.warningContainer,
      borderRadius: radii.md,
      borderLeftWidth: 4,
      borderLeftColor: '#CA8A04'
    },
    disclaimerText: {
      fontSize: fontSizes.base,
      color: '#A16207',
      fontWeight: fontWeights.semiBold
    }
  });
}

const moodTags = ['Sakin', 'Odakli', 'Merakli', 'Dusuk enerji'];

const moodSummary = [
  {
    title: 'Sakin',
    value: '%42'
  },
  {
    title: 'Duyarli',
    value: '%28'
  }
];
