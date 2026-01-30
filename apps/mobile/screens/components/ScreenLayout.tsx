import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { PSurface, PText } from "../../components";


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
        <PSurface style={[styles.header, { backgroundColor: theme.colors.elevation.level1 }]}>
          <PText variant="headlineSmall" accessibilityRole="header">
            {title}
          </PText>
          {subtitle ? (
            <PText variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
              {subtitle}
            </PText>
          ) : null}
        </PSurface>
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
