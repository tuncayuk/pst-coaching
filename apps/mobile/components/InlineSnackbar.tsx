import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PButton } from './PButton';
import { PText } from './PText';

export type InlineSnackbarProps = {
  visible: boolean;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

/**
 * Non-modal feedback bar shown at the bottom of a scroll view.
 * Replaces hardcoded `#323232`/`#FFF` with semantic `inverseSurface`-style tokens.
 *
 * Usage: mount conditionally with `{visible && <InlineSnackbar ... />}`
 */
export const InlineSnackbar = ({ visible, message, actionLabel, onAction }: InlineSnackbarProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  if (!visible) return null;

  return (
    <View
      style={styles.container}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      <PText style={styles.message} numberOfLines={2}>
        {message}
      </PText>
      {actionLabel && onAction && (
        <PButton
          mode="text"
          compact
          style={styles.actionBtn}
          onPress={onAction}
          accessibilityLabel={actionLabel}
        >
          {actionLabel}
        </PButton>
      )}
    </View>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: c.onSurface,
      borderRadius: radii.lg,
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1.5],
      marginHorizontal: spacing[2],
      marginBottom: spacing[2],
      gap: spacing[1]
    },
    message: {
      flex: 1,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.medium,
      color: c.surface
    },
    actionBtn: {
      marginLeft: spacing[1]
    }
  });
}
