import React from "react";
import { StyleSheet } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";
import { useAppSelector } from "../state/hooks";
import { selectIsOnline } from "../state/selectors";

export const OfflineBanner = () => {
  const theme = useTheme();
  const isOnline = useAppSelector(selectIsOnline);

  if (isOnline) {
    return null;
  }

  return (
    <Surface style={[styles.banner, { backgroundColor: theme.colors.errorContainer }]}>
      <Text variant="labelLarge" style={{ color: theme.colors.onErrorContainer }}>
        Çevrimdışısınız
      </Text>
      <Text variant="bodySmall" style={{ color: theme.colors.onErrorContainer }}>
        İnternet bağlantısı yok. Önbellekteki içerikler gösteriliyor.
      </Text>
    </Surface>
  );
};

const styles = StyleSheet.create({
  banner: {
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});
