import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { spacing, useAppTheme } from '../theme';
import { PChip } from './PChip';

export type FilterChipBarProps = {
  options: readonly string[];
  /** The currently selected option. When undefined all chips render unselected. */
  activeOption?: string;
  onOptionPress: (option: string) => void;
  disabled?: boolean;
};

export const FilterChipBar = ({ options, activeOption, onOptionPress, disabled }: FilterChipBarProps) => {
  const styles = useMemo(() => makeStyles(), []);

  return (
    <View style={styles.row}>
      {options.map(label => (
        <TouchableOpacity
          key={label}
          onPress={disabled ? undefined : () => onOptionPress(label)}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={`${label} filtresi`}
          accessibilityState={{ selected: activeOption === label, disabled }}
        >
          <PChip
            selected={activeOption === label}
            style={styles.chip}
            disabled={disabled}
          >
            {label}
          </PChip>
        </TouchableOpacity>
      ))}
    </View>
  );
};

function makeStyles() {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1]
    },
    chip: {
      marginBottom: spacing[0.5]
    }
  });
}
