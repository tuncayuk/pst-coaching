import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PAvatar, PButton, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

type StateMessageProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
  tone?: 'neutral' | 'error' | 'success' | 'offline';
};

export const StateMessage = ({
  title,
  description,
  actionLabel,
  onAction,
  icon = 'information-outline',
  tone = 'neutral'
}: StateMessageProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const theme = useTheme();
  const background = tone === 'error' ? theme.colors.errorContainer : theme.colors.elevation.level1;
  const onBackground = tone === 'error' ? theme.colors.onErrorContainer : theme.colors.onSurface;

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <PAvatar.Icon size={56} icon={icon} style={styles.avatar} />
      <PText variant="titleLarge" style={{ color: onBackground, marginBottom: 4 }}>
        {title}
      </PText>
      <PText variant="bodyMedium" style={{ color: onBackground, textAlign: 'center' }}>
        {description}
      </PText>
      {actionLabel ? (
        <PButton mode="contained" style={styles.button} onPress={onAction}>
          {actionLabel}
        </PButton>
      ) : null}
    </View>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      padding: spacing[2.5],
      borderRadius: radii['3xl'],
      alignItems: 'center'
    },
    avatar: {
      marginBottom: spacing[1.5]
    },
    button: {
      marginTop: spacing[2]
    }
  });
}
