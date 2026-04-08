import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PText } from './PText';

export type MosaicTab = {
  key: string;
  label: string;
  emoji: string;
};

export type DiscoverContentMosaicGridProps = {
  tabs: readonly MosaicTab[];
  counts: number[];
  activeTab: string;
  onTabPress: (tab: MosaicTab) => void;
  disabled?: boolean;
};

const MOSAIC_COLORS = ['#E9D5FF', '#D1FAE5', '#FDE68A', '#B2EBF2'];

export const DiscoverContentMosaicGrid = ({
  tabs,
  counts,
  activeTab,
  onTabPress,
  disabled
}: DiscoverContentMosaicGridProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const rows = [tabs.slice(0, 2), tabs.slice(2, 4)];

  return (
    <View style={styles.grid}>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={styles.row}>
          {row.map((tab, colIdx) => {
            const idx = rowIdx * 2 + colIdx;
            const count = counts[idx] ?? 0;
            const isActive = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tile,
                  { backgroundColor: MOSAIC_COLORS[idx % MOSAIC_COLORS.length] },
                  isActive && styles.tileActive
                ]}
                onPress={disabled ? undefined : () => onTabPress(tab)}
                disabled={disabled}
                accessibilityLabel={`${tab.label}, ${count} icerik`}
                accessibilityRole="button"
                accessibilityState={{ selected: isActive, disabled }}
                activeOpacity={0.8}
              >
                <View style={styles.tileHeader}>
                  <PText style={styles.emoji}>{tab.emoji}</PText>
                  <View style={styles.countBadge}>
                    <PText style={styles.countText}>{count}</PText>
                  </View>
                </View>
                <PText style={styles.label}>{tab.label}</PText>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    grid: {
      gap: spacing[1.5],
      marginBottom: spacing[3]
    },
    row: {
      flexDirection: 'row',
      gap: spacing[1.5]
    },
    tile: {
      flex: 1,
      borderRadius: radii.xl,
      padding: spacing[2],
      minHeight: 120,
      justifyContent: 'space-between'
    },
    tileActive: {
      borderWidth: 2,
      borderColor: c.secondary,
      shadowColor: c.secondary,
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4
    },
    tileHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    emoji: {
      fontSize: fontSizes['9xl']
    },
    countBadge: {
      backgroundColor: 'rgba(0,0,0,0.12)',
      borderRadius: radii.lg,
      paddingHorizontal: spacing[1],
      paddingVertical: 3
    },
    countText: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.extraBold,
      color: c.textBrand
    },
    label: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: c.textBrand
    }
  });
}
