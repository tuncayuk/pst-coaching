import React from "react";
import { StyleSheet } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

export const OfflineNotice = () => {
  const theme = useTheme();

  return (
    <Surface style={[styles.notice, { backgroundColor: theme.colors.secondaryContainer }]}>
      <Text variant="labelLarge" style={{ color: theme.colors.onSecondaryContainer }}>
        Çevrimdışısınız
      </Text>
      <Text variant="bodySmall" style={{ color: theme.colors.onSecondaryContainer }}>
        Önbellekteki içerikler gösteriliyor. Bağlantı geldiğinde senkronize edeceğiz.
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  notice: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 16,
  },
});
