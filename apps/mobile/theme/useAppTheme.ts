/**
 * PST Coaching — useAppTheme hook
 *
 * Returns the correct colour tokens (light/dark) and paper theme
 * based on the system colour scheme. Components call this hook
 * and build their `StyleSheet` with the returned `colors` inside a `useMemo`.
 *
 * Usage:
 *   const { colors, isDark } = useAppTheme();
 *   const styles = useMemo(() => makeStyles(colors), [colors]);
 *
 * StyleSheet factory pattern:
 *   function makeStyles(c: ColorTokens) {
 *     return StyleSheet.create({ container: { backgroundColor: c.background } });
 *   }
 */
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { ColorTokens, dark, light } from './colors';
import { darkPaperTheme, paperTheme } from './paper';

export interface AppTheme {
  colors: ColorTokens;
  isDark: boolean;
  paperTheme: typeof paperTheme | typeof darkPaperTheme;
}

export function useAppTheme(): AppTheme {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  // console.log(`Current color scheme: ${scheme} (isDark: ${isDark})`); // Debug log to verify color scheme detection

  return useMemo(
    () => ({
      colors: isDark ? dark : light,
      isDark,
      paperTheme: isDark ? darkPaperTheme : paperTheme
    }),
    [isDark]
  );
}
