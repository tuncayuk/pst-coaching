import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { PAvatar, PButton, PText } from '../../components';

type StateMessageProps = {
  title: string;
  description: string;
  actionLabel?: string;
  icon?: string;
  tone?: 'neutral' | 'error' | 'success' | 'offline';
};

export const StateMessage = ({
  title,
  description,
  actionLabel,
  icon = 'information-outline',
  tone = 'neutral'
}: StateMessageProps) => {
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
        <PButton mode="contained" style={styles.button} onPress={() => {}}>
          {actionLabel}
        </PButton>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 24,
    alignItems: 'center'
  },
  avatar: {
    marginBottom: 12
  },
  button: {
    marginTop: 16
  }
});
