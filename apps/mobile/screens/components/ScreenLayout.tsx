import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PIconButton, PSurface, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

const SPACING = 16;

export type ScreenLayoutProps = {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  children: React.ReactNode;
  headerVariant?: 'default' | 'transparent' | 'none';
  scrollEnabled?: boolean;
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
  contentStyle?: ViewStyle;
};

export const ScreenLayout = ({
  title,
  subtitle,
  rightAction,
  children,
  headerVariant = 'default',
  scrollEnabled = true,
  edges = ['top', 'left', 'right'],
  contentStyle
}: ScreenLayoutProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const theme = useTheme();
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const header =
    headerVariant !== 'none' ? (
      <PSurface
        elevation={0}
        style={[
          styles.header,
          {
            borderRadius: theme.roundness * 2.5,
            borderBottomColor: `${theme.colors.outlineVariant}66`,
            backgroundColor: headerVariant === 'transparent' ? 'transparent' : theme.colors.background
          }
        ]}
        accessibilityLabel={title}
      >
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
          {rightAction ? <View style={styles.rightAction}>{rightAction}</View> : null}
        </View>
      </PSurface>
    ) : null;

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={edges}
      accessibilityViewIsModal={false}
    >
      <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={[styles.content, contentStyle]}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnabled}
        >
          {header}
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    root: { flex: 1 },
    content: { padding: SPACING, paddingBottom: SPACING * 3 },
    header: {
      paddingVertical: spacing[1.5],
      paddingRight: SPACING,
      paddingLeft: 8,
      marginBottom: SPACING,
      borderBottomWidth: 1
    },
    titleRow: { flexDirection: 'row', alignItems: 'center' },
    backButton: { margin: 0, marginRight: 4 },
    titleText: { flex: 1 },
    rightAction: { marginLeft: 8 }
  });
}
