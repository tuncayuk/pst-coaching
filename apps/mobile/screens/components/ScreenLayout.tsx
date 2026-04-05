import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { PIconButton, PSurface, PText } from "../../components";


type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export const ScreenLayout = ({ title, subtitle, children }: ScreenLayoutProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <PSurface style={[styles.header, { backgroundColor: theme.colors.elevation.level1 }]}>
          <View style={styles.titleRow}>
            {canGoBack ? (
              <PIconButton
                icon="arrow-left"
                size={24}
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                accessibilityLabel="Geri"
                accessibilityRole="button"
              />
            ) : null}
            <View style={styles.titleText}>
              <PText variant="headlineSmall" accessibilityRole="header">
                {title}
              </PText>
              {subtitle ? (
                <PText variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
                  {subtitle}
                </PText>
              ) : null}
            </View>
          </View>
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
    paddingVertical: 12,
    paddingRight: 16,
    paddingLeft: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    margin: 0,
    marginRight: 4,
  },
  titleText: {
    flex: 1,
  },
  body: {},
});
