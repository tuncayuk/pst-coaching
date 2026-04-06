/**
 * PST Coaching — Typography Scale
 *
 * Maps to Material 3 type roles.
 * Use the named roles rather than raw fontSize values everywhere in the app.
 *
 * Usage:
 *   <PText variant="headlineSmall">…</PText>          ← prefer Paper variants
 *   style={{ ...typography.titleMedium }}              ← for StyleSheet usage
 *   style={{ fontSize: fontSizes.md, fontWeight: fontWeights.semiBold }}
 */

// ---------------------------------------------------------------------------
// Primitive scale
// ---------------------------------------------------------------------------
export const fontSizes = {
  xs: 9,
  sm: 11,
  base: 12,
  md: 13,
  lg: 14,
  xl: 15,
  '2xl': 16,
  '3xl': 18,
  '4xl': 20,
  '5xl': 22,
  '6xl': 24,
  '7xl': 26,
  '8xl': 28,
  '9xl': 32,
  '10xl': 36,
  '11xl': 48,
  '12xl': 64
} as const;

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
  black: '900' as const
};

export const lineHeights = {
  tight: 16,
  snug: 18,
  normal: 20,
  relaxed: 22,
  loose: 28
} as const;

export const letterSpacings = {
  tight: -0.5,
  normal: 0,
  wide: 0.25,
  wider: 0.5,
  widest: 1.5
} as const;

// ---------------------------------------------------------------------------
// Semantic type roles (mirrors Material 3)
// ---------------------------------------------------------------------------
export const typography = {
  // Display
  displayLarge: { fontSize: fontSizes['12xl'], fontWeight: fontWeights.bold, lineHeight: 68 },
  displayMedium: { fontSize: fontSizes['11xl'], fontWeight: fontWeights.bold, lineHeight: 52 },
  displaySmall: { fontSize: fontSizes['10xl'], fontWeight: fontWeights.bold, lineHeight: 40 },

  // Headline
  headlineLarge: { fontSize: fontSizes['9xl'], fontWeight: fontWeights.bold, lineHeight: 40 },
  headlineMedium: { fontSize: fontSizes['8xl'], fontWeight: fontWeights.bold, lineHeight: 36 },
  headlineSmall: { fontSize: fontSizes['7xl'], fontWeight: fontWeights.bold, lineHeight: 32 },

  // Title
  titleLarge: { fontSize: fontSizes['4xl'], fontWeight: fontWeights.bold, lineHeight: 28 },
  titleMedium: { fontSize: fontSizes['2xl'], fontWeight: fontWeights.semiBold, lineHeight: 24 },
  titleSmall: { fontSize: fontSizes.lg, fontWeight: fontWeights.semiBold, lineHeight: 20 },

  // Body
  bodyLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.relaxed
  },
  bodyMedium: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.normal
  },
  bodySmall: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.regular,
    lineHeight: lineHeights.tight
  },

  // Label
  labelLarge: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.snug
  },
  labelMedium: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.tight
  },
  labelSmall: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.tight
  }
} as const;

export type TypographyRole = keyof typeof typography;
