import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { PSurface, PText } from "../../components";


type SectionCardProps = {
  title: string;
  actionLabel?: string;
  children: React.ReactNode;
};

export const SectionCard = ({ title, actionLabel, children }: SectionCardProps) => {
  const theme = useTheme();

  return (
    <PSurface style={[styles.card, { backgroundColor: theme.colors.elevation.level1 }]}>
      <View style={styles.headerRow}>
        <PText variant="titleMedium">{title}</PText>
        {actionLabel ? (
          <PText variant="labelLarge" style={{ color: theme.colors.primary }}>
            {actionLabel}
          </PText>
        ) : null}
      </View>
      {children}
    </PSurface>
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
