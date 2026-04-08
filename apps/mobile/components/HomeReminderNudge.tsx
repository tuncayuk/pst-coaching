import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PIconButton } from './PIconButton';
import { PText } from './PText';

export type HomeReminderNudgeProps = {
  label: string;
  disabled?: boolean;
  onPress: () => void;
  onDismiss: () => void;
};

export const HomeReminderNudge = ({ label, disabled, onPress, onDismiss }: HomeReminderNudgeProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.body}
        onPress={disabled ? undefined : onPress}
        activeOpacity={disabled ? 1 : 0.75}
        accessibilityLabel={label}
        accessibilityRole="button"
        accessibilityHint="Hatirlatici ayarlari ekranini acar"
        accessibilityState={{ disabled }}
      >
        <View accessibilityElementsHidden>
          <Icon source="bell-outline" size={18} color={c.onSecondaryContainer} />
        </View>
        <PText style={styles.text}>{label}</PText>
      </TouchableOpacity>
      <PIconButton
        icon="close"
        size={16}
        style={styles.dismissBtn}
        accessibilityLabel="Hatirlatici nudge kapatildi"
        onPress={onDismiss}
      />
    </View>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.secondaryContainer,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: c.outlineVariant,
      minHeight: 48,
      marginBottom: spacing[2],
      overflow: 'hidden'
    },
    body: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      paddingVertical: spacing[1.5],
      paddingLeft: spacing[2]
    },
    text: {
      flex: 1,
      fontSize: fontSizes.md,
      color: c.onSecondaryContainer,
      fontWeight: fontWeights.semiBold
    },
    dismissBtn: {
      margin: 0,
      marginRight: spacing[0.5]
    }
  });
}
