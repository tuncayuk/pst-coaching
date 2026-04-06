import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import { PText } from './PText';

const SPACING = 16;
const ACTION_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export type PCardProps = React.ComponentProps<typeof Card> & {
  /** When provided, renders a section-container layout with a title row */
  sectionTitle?: string;
  sectionActionLabel?: string;
  onSectionAction?: () => void;
  /** Draws a 4dp left accent border in the given colour — useful for category or status cards. Defaults to "#00B4D8" */
  accentColor?: string;
};

type PCardComponent = ((props: PCardProps) => JSX.Element) & {
  Title: typeof Card.Title;
  Content: typeof Card.Content;
  Actions: typeof Card.Actions;
  Cover: typeof Card.Cover;
};

const BasePCard = ({
  sectionTitle,
  sectionActionLabel,
  onSectionAction,
  accentColor,
  children,
  style,
  ...rest
}: PCardProps) => {
  const theme = useTheme();
  const accentStyle = accentColor ? { borderLeftWidth: 4, borderLeftColor: accentColor } : undefined;

  if (sectionTitle) {
    return (
      <Card
        {...rest}
        style={[{ borderRadius: theme.roundness * 2.5, padding: SPACING, marginBottom: SPACING }, accentStyle, style]}
      >
        <View style={styles.headerRow}>
          <PText variant="titleMedium" accessibilityRole="header">
            {sectionTitle}
          </PText>
          {sectionActionLabel ? (
            <TouchableOpacity
              onPress={onSectionAction}
              disabled={!onSectionAction}
              hitSlop={ACTION_HIT_SLOP}
              accessibilityRole="button"
              accessibilityLabel={sectionActionLabel}
              accessibilityState={{ disabled: !onSectionAction }}
            >
              <PText
                variant="labelLarge"
                style={{
                  color: onSectionAction ? theme.colors.primary : theme.colors.onSurfaceVariant
                }}
              >
                {sectionActionLabel}
              </PText>
            </TouchableOpacity>
          ) : null}
        </View>
        {children}
      </Card>
    );
  }

  return (
    <Card style={[accentStyle, style]} {...rest}>
      {children}
    </Card>
  );
};

export const PCard = Object.assign(BasePCard, {
  Title: Card.Title,
  Content: Card.Content,
  Actions: Card.Actions,
  Cover: Card.Cover
}) as PCardComponent;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  }
});
