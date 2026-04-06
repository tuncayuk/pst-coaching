/**
 * PST Coaching — React Native Paper Theme
 *
 * Wires our design tokens into the Paper MD3 theme object.
 * Import `paperTheme` in App.tsx and pass it to <PaperProvider theme={paperTheme}>.
 *
 * By centralising this here, any colour or shape change automatically propagates
 * to every Paper component without touching individual screens.
 */
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

import { light } from './colors';
import { radii } from './radii';

export const paperTheme = {
  ...DefaultTheme,
  // roundness is the Paper shape multiplier.
  // We set it to 4 so theme.roundness * 3 = radii.lg (12), * 4 = radii.xl (16), etc.
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    // Brand
    primary: light.primary,
    onPrimary: light.onPrimary,
    primaryContainer: light.primaryContainer,
    onPrimaryContainer: light.onPrimaryContainer,

    secondary: light.secondary,
    onSecondary: light.onSecondary,
    secondaryContainer: light.secondaryContainer,
    onSecondaryContainer: light.onSecondaryContainer,

    tertiary: light.tertiary,
    onTertiary: light.onTertiary,
    tertiaryContainer: light.tertiaryContainer,
    onTertiaryContainer: light.onTertiaryContainer,

    // Surfaces
    background: light.background,
    onBackground: light.onBackground,
    surface: light.surface,
    onSurface: light.onSurface,
    surfaceVariant: light.surfaceVariant,
    onSurfaceVariant: light.onSurfaceVariant,

    // Error
    error: light.error,
    onError: light.onError,
    errorContainer: light.errorContainer,
    onErrorContainer: light.onErrorContainer,

    // Borders
    outline: light.outline,
    outlineVariant: light.outlineVariant
  }
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
