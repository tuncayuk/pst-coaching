import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const ScreenLayout = ({ title, subtitle, children }: ScreenLayoutProps) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Surface style={[styles.header, { backgroundColor: theme.colors.elevation.level1 }]}>
          <Text variant="headlineSmall" accessibilityRole="header">
            {title}
          </Text>
          {subtitle ? (
            <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {subtitle}
            </Text>
          ) : null}
        </Surface>
        <View style={styles.body}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  body: {},
});
