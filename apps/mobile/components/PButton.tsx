import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, type ButtonProps } from 'react-native-paper';

import { fontSizes, fontWeights, useAppTheme } from '../theme';

const styles = StyleSheet.create({
  content: {
    height: 56,
    justifyContent: 'center'
  },
  label: {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semiBold
  }
});

export const PButton = ({
  mode = 'contained',
  style,
  contentStyle,
  labelStyle,
  buttonColor,
  textColor,
  ...rest
}: ButtonProps) => {
  const { colors: c } = useAppTheme();
  const isPrimary = mode === 'contained';
  const isOutlined = mode === 'outlined';
  const shouldApplySizing = isPrimary || isOutlined;
  const resolvedButtonColor = buttonColor ?? (isPrimary ? c.primary : undefined);
  const resolvedTextColor = textColor ?? (isPrimary ? c.onPrimary : undefined);

  return (
    <Button
      {...rest}
      mode={mode}
      buttonColor={resolvedButtonColor}
      textColor={resolvedTextColor}
      style={[shouldApplySizing ? { borderRadius: 6 } : null, style]}
      contentStyle={[shouldApplySizing ? styles.content : null, contentStyle]}
      labelStyle={[shouldApplySizing ? styles.label : null, labelStyle]}
      accessibilityState={{ busy: !!rest.loading, ...rest.accessibilityState }}
    />
  );
};
