import React from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

type SectionCardProps = {
  title: string;
  actionLabel?: string;
  children: React.ReactNode;
};

export const SectionCard = ({ title, actionLabel, children }: SectionCardProps) => {
  const theme = useTheme();

  return (
    <Surface style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
      <View style={styles.headerRow}>
        <Text variant="titleMedium">{title}</Text>
        {actionLabel ? (
          <Text variant="labelLarge" style={{ color: theme.colors.primary }}>
            {actionLabel}
          </Text>
        ) : null}
      </View>
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
});
