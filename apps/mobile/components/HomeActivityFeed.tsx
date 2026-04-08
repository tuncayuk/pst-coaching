import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PCard } from './PCard';
import { PDivider } from './PDivider';
import { PText } from './PText';

export type ActivityTone = 'success' | 'warning' | 'error' | 'primary';

export type ActivityItem = {
  title: string;
  time: string;
  icon: string;
  tone: ActivityTone;
};

export type HomeActivityFeedProps = {
  activities: ActivityItem[];
};

export const HomeActivityFeed = ({ activities }: HomeActivityFeedProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const iconColor: Record<ActivityTone, string> = {
    success: c.tertiary,
    warning: c.warning,
    error: c.error,
    primary: c.primary
  };

  const iconBg: Record<ActivityTone, string> = {
    success: c.tertiaryContainer,
    warning: c.warningContainer,
    error: c.errorContainer,
    primary: c.primaryContainer
  };

  if (activities.length === 0) return null;

  return (
    <PCard style={styles.card}>
      {activities.map((activity, idx) => (
        <React.Fragment key={activity.title}>
          <View style={styles.row}>
            <View
              style={[styles.iconWrap, { backgroundColor: iconBg[activity.tone] }]}
              accessibilityElementsHidden
            >
              <Icon source={activity.icon} size={18} color={iconColor[activity.tone]} />
            </View>
            <View style={styles.info}>
              <PText style={styles.title} numberOfLines={1}>
                {activity.title}
              </PText>
              <PText style={styles.time}>{activity.time}</PText>
            </View>
          </View>
          {idx < activities.length - 1 && <PDivider style={styles.divider} />}
        </React.Fragment>
      ))}
    </PCard>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    card: {
      padding: spacing[1.5]
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1.5],
      paddingVertical: spacing[0.5]
    },
    divider: {
      marginVertical: spacing[0.5]
    },
    iconWrap: {
      width: 36,
      height: 36,
      borderRadius: radii.lg,
      alignItems: 'center',
      justifyContent: 'center'
    },
    info: {
      flex: 1
    },
    title: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginBottom: 2
    },
    time: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    }
  });
}
