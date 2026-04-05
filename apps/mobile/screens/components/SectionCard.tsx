import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PSurface, PText } from '../../components';

const SPACING = 16;
const ACTION_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export type SectionCardProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

export const SectionCard = ({ title, actionLabel, onAction, children, style }: SectionCardProps) => {
  const theme = useTheme();

  return (
    <PSurface elevation={1} style={[styles.card, { borderRadius: theme.roundness * 2.5 }, style]}>
      <View style={styles.headerRow}>
        <PText variant="titleMedium" accessibilityRole="header">
          {title}
        </PText>
        {actionLabel ? (
          <TouchableOpacity
            onPress={onAction}
            disabled={!onAction}
            hitSlop={ACTION_HIT_SLOP}
            accessibilityRole="button"
            accessibilityLabel={actionLabel}
            accessibilityState={{ disabled: !onAction }}
          >
            <PText
              variant="labelLarge"
              style={{ color: onAction ? theme.colors.primary : theme.colors.onSurfaceVariant }}
            >
              {actionLabel}
            </PText>
          </TouchableOpacity>
        ) : null}
      </View>
      {children}
    </PSurface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING,
    marginBottom: SPACING
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  }
});
