import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PCard } from './PCard';
import { PText } from './PText';

export type DiscoverAssistantPairProps = {
  onContentPress: () => void;
  onAIPress: () => void;
  disabled?: boolean;
};

export const DiscoverAssistantPair = ({ onContentPress, onAIPress, disabled }: DiscoverAssistantPairProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  return (
    <View style={styles.pair}>
      {/* FR-E4: quiz-based content assistant */}
      <PCard
        style={[styles.tile, styles.tileContent]}
        onPress={disabled ? undefined : onContentPress}
        accessibilityLabel="Icerik Asistani"
        accessibilityHint="Kisa test ile kisisel icerik onerisi al"
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <PText style={styles.emoji}>🤖</PText>
        <PText style={styles.title}>Icerik{'\n'}Asistani</PText>
        <PText style={styles.desc}>Test ile oneri al</PText>
      </PCard>

      {/* FR-E16: AI free-text assistant */}
      <PCard
        style={[styles.tile, styles.tileAI]}
        onPress={disabled ? undefined : onAIPress}
        accessibilityLabel="AI Asistani"
        accessibilityHint="Dogal dil ile soru sor, kaynaklardan cevap al"
        accessibilityRole="button"
        accessibilityState={{ disabled }}
      >
        <PText style={styles.emoji}>✦</PText>
        <PText style={[styles.title, styles.titleAI]}>AI{'\n'}Asistani</PText>
        <PText style={[styles.desc, styles.descAI]}>Serbest soru sor</PText>
      </PCard>
    </View>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    pair: {
      flexDirection: 'row',
      gap: spacing[1.5],
      marginBottom: spacing[2.5]
    },
    tile: {
      flex: 1,
      borderRadius: radii.xl,
      padding: spacing[2],
      minHeight: 130,
      justifyContent: 'space-between'
    },
    tileContent: {
      backgroundColor: c.secondary
    },
    tileAI: {
      backgroundColor: c.primary
    },
    emoji: {
      fontSize: fontSizes['6xl'],
      marginBottom: spacing[1]
    },
    title: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.onSecondary,
      marginBottom: 4,
      lineHeight: 24
    },
    titleAI: {
      color: c.onPrimary
    },
    desc: {
      fontSize: fontSizes.base,
      color: c.onSecondary,
      opacity: 0.75
    },
    descAI: {
      color: c.onPrimary
    }
  });
}
