import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, type ButtonProps, useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  base: {
    borderRadius: 12
  },
  content: {
    height: 56,
    justifyContent: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: '600'
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
  const theme = useTheme();
  const isPrimary = mode === 'contained';
  const isOutlined = mode === 'outlined';
  const shouldApplySizing = isPrimary || isOutlined;
  const resolvedButtonColor = buttonColor ?? (isPrimary ? theme.colors.primary : undefined);
  const resolvedTextColor = textColor ?? (isPrimary ? theme.colors.onPrimary : undefined);

  return (
    <Button
      {...rest}
      mode={mode}
      buttonColor={resolvedButtonColor}
      textColor={resolvedTextColor}
      style={[shouldApplySizing ? styles.base : null, style]}
      contentStyle={[shouldApplySizing ? styles.content : null, contentStyle]}
      labelStyle={[shouldApplySizing ? styles.label : null, labelStyle]}
    />
  );
};
