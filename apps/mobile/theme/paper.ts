/**
 * PST Coaching — React Native Paper Theme
 *
 * Wires our design tokens into the Paper MD3 theme object.
 * Import `paperTheme` / `darkPaperTheme` in App.tsx and pass it to <PaperProvider>.
 *
 * By centralising this here, any colour or shape change automatically propagates
 * to every Paper component without touching individual screens.
 */
import { MD3LightTheme as DefaultTheme, MD3DarkTheme } from 'react-native-paper';

import { ColorTokens, dark, light } from './colors';
import { radii } from './radii';

function buildPaperColors(tokens: ColorTokens, base: typeof DefaultTheme.colors) {
  return {
    ...base,
    // Brand
    primary: tokens.primary,
    onPrimary: tokens.onPrimary,
    primaryContainer: tokens.primaryContainer,
    onPrimaryContainer: tokens.onPrimaryContainer,

    secondary: tokens.secondary,
    onSecondary: tokens.onSecondary,
    secondaryContainer: tokens.secondaryContainer,
    onSecondaryContainer: tokens.onSecondaryContainer,

    tertiary: tokens.tertiary,
    onTertiary: tokens.onTertiary,
    tertiaryContainer: tokens.tertiaryContainer,
    onTertiaryContainer: tokens.onTertiaryContainer,

    // Surfaces
    background: tokens.background,
    onBackground: tokens.onBackground,
    surface: tokens.surface,
    onSurface: tokens.onSurface,
    surfaceVariant: tokens.surfaceVariant,
    onSurfaceVariant: tokens.onSurfaceVariant,

    // Error
    error: tokens.error,
    onError: tokens.onError,
    errorContainer: tokens.errorContainer,
    onErrorContainer: tokens.onErrorContainer,

    // Borders
    outline: tokens.outline,
    outlineVariant: tokens.outlineVariant
  };
}

export const paperTheme = {
  ...DefaultTheme,
  // roundness is the Paper shape multiplier.
  // We set it to 4 so theme.roundness * 3 = radii.lg (12), * 4 = radii.xl (16), etc.
  roundness: 4,
  colors: buildPaperColors(light, DefaultTheme.colors)
} as const;

export const darkPaperTheme = {
  ...MD3DarkTheme,
  roundness: 4,
  dark: true,
  colors: buildPaperColors(dark, MD3DarkTheme.colors)
} as const;

export type PaperTheme = typeof paperTheme;

// ---------------------------------------------------------------------------
// Convenience: shape tokens derived from roundness
// (mirrors what ScreenLayout / SectionCard / PCard compute inline)
// ---------------------------------------------------------------------------
export const shape = {
  /** 4 * 1 = 4  — small components (chips, badges) */
  sm: paperTheme.roundness * 1,
  /** 4 * 2 = 8  — inputs, snackbars */
  md: paperTheme.roundness * 2,
  /** 4 * 3 = 12 — buttons */
  button: paperTheme.roundness * 3,
  /** 4 * 2.5 = 10 — cards */
  card: paperTheme.roundness * 2.5,
  /** 4 * 4 = 16 — dialogs, bottom sheets */
  lg: paperTheme.roundness * 4,
  /** 4 * 5 = 20 — large cards */
  xl: paperTheme.roundness * 5,
  /** Pill */
  full: radii.full
} as const;
