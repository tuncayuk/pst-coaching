import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { CONTENT_TYPE_LABELS, type ContentItemType } from '../data/constants/contentTypes';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../theme';
import { PChip } from './PChip';
import { PText } from './PText';

export type { ContentItemType };
export { CONTENT_TYPE_LABELS };

export type ContentTypeRowProps = {
  title: string;
  type: ContentItemType;
  description?: string;
  /** Action buttons rendered in the footer row. */
  actions?: React.ReactNode;
};

/**
 * A list row with a left-side type-color accent bar, title + type chip header,
 * optional description, and an optional footer for action buttons.
 *
 * Used in: LibraryFavoritesScreen, LibraryCollectionDetailScreen
 */
export const ContentTypeRow = ({ title, type, description, actions }: ContentTypeRowProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  // Map content type to semantic token colors — dark-mode safe.
  const accentColor = getAccentColor(c, type);

  return (
    <View
      style={styles.container}
      accessibilityLabel={`${title}, ${CONTENT_TYPE_LABELS[type]}`}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} accessibilityElementsHidden />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <PText style={styles.title} numberOfLines={2}>
            {title}
          </PText>
          <PChip compact style={[styles.typeChip, { borderColor: accentColor }]}>
            {CONTENT_TYPE_LABELS[type]}
          </PChip>
        </View>
        {!!description && (
          <PText style={styles.description} numberOfLines={2}>
            {description}
          </PText>
        )}
        {actions ? <View style={styles.actions}>{actions}</View> : null}
      </View>
    </View>
  );
};

function getAccentColor(c: ColorTokens, type: ContentItemType): string {
  switch (type) {
    case 'journey':   return c.secondary;
    case 'workshop':  return c.error;
    case 'module':    return c.tertiary;
    case 'ebook':     return c.primary;
    default:          return c.outline;
  }
}

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: spacing[1.5],
      gap: spacing[1]
    },
    accentBar: {
      width: 4,
      borderRadius: radii.xs,
      minHeight: 48
    },
    body: {
      flex: 1
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginBottom: spacing[0.5]
    },
    title: {
      flex: 1,
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary
    },
    typeChip: {
      height: 24
    },
    description: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      marginBottom: spacing[0.5],
      lineHeight: 18
    },
    actions: {
      flexDirection: 'row',
      marginTop: spacing[1],
      gap: spacing[1]
    }
  });
}
