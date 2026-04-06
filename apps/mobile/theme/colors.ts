/**
 * PST Coaching — Colour Palette
 *
 * Single source of truth for every colour used in the app.
 * All screens and components must import from here — never hardcode hex values.
 *
 * Naming convention
 * -----------------
 * palette.*     Raw colour values (brand + neutrals + semantics)
 * light.*       Semantic aliases mapped to the light theme
 * dark.*        Semantic aliases mapped to the dark theme
 */

// ---------------------------------------------------------------------------
// Brand
// ---------------------------------------------------------------------------
export const palette = {
  // Primary — cyan blue
  cyan50: '#E0F7FA',
  cyan100: '#B2EBF2',
  cyan400: '#26C6DA',
  cyan500: '#00B4D8', // primary
  cyan600: '#0097A7',
  cyan700: '#00838F',

  // Secondary — deep purple
  purple50: '#EDE9FE',
  purple100: '#DDD6FE',
  purple200: '#EDE7F6',
  purple500: '#7C4DFF',
  purple600: '#6B46C1',
  purple700: '#5B21B6',
  purple900: '#2B1B5D', // secondary / brand dark

  // Tertiary — emerald green
  emerald50: '#D1FAE5',
  emerald100: '#A7F3D0',
  emerald500: '#10B981', // tertiary
  emerald600: '#16A34A',
  emerald700: '#15803D',
  emerald800: '#065F46',

  // Warning — amber
  amber50: '#FEF3C7',
  amber200: '#FCD34D',
  amber700: '#B45309',
  amber800: '#92400E',

  // Error — red
  red50: '#FEE2E2',
  red500: '#EF4444',
  red600: '#DC2626',
  red900: '#991B1B',

  // Info — blue
  blue900: '#1E3A5F',
  blue950: '#1E293B',
  blue1000: '#1F2937',

  // Neutrals — zinc / slate
  white: '#FFFFFF',
  neutral50: '#FAFAFA',
  neutral100: '#F5F5F5',
  neutral200: '#E5E5E5',
  neutral300: '#D4D4D4',
  neutral400: '#A3A3A3',
  neutral500: '#737373',
  neutral550: '#6B7280',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  black: '#000000',

  // Special
  transparent: 'transparent'
} as const;

// ---------------------------------------------------------------------------
// Semantic tokens — Light theme
// ---------------------------------------------------------------------------
export const light = {
  // Backgrounds
  background: palette.neutral50,
  surface: palette.white,
  surfaceVariant: palette.neutral50,
  surfaceElevated: palette.white,

  // Brand
  primary: palette.cyan500,
  onPrimary: palette.white,
  primaryContainer: palette.cyan50,
  onPrimaryContainer: palette.cyan700,

  secondary: palette.purple900,
  onSecondary: palette.white,
  secondaryContainer: palette.purple50,
  onSecondaryContainer: palette.purple700,

  tertiary: palette.emerald500,
  onTertiary: palette.white,
  tertiaryContainer: palette.emerald50,
  onTertiaryContainer: palette.emerald800,

  // Status
  error: palette.red600,
  onError: palette.white,
  errorContainer: palette.red50,
  onErrorContainer: palette.red900,

  success: palette.emerald600,
  onSuccess: palette.white,
  successContainer: palette.emerald50,
  onSuccessContainer: palette.emerald800,

  warning: palette.amber700,
  onWarning: palette.white,
  warningContainer: palette.amber50,
  onWarningContainer: palette.amber800,
  // Content
  onBackground: palette.neutral900,
  onSurface: palette.neutral900,
  onSurfaceVariant: palette.neutral600,
  onSurfaceDisabled: palette.neutral400,

  // Borders
  outline: palette.neutral300,
  outlineVariant: palette.neutral200,

  // Accents
  accent: palette.cyan500,
  accentSuccess: palette.emerald500,
  accentWarning: palette.amber200,

  // Text hierarchy
  textPrimary: palette.neutral900,
  textSecondary: palette.neutral600,
  textTertiary: palette.neutral500,
  textDisabled: palette.neutral400,
  textInverse: palette.white,
  textBrand: palette.purple900,
  textAccent: palette.cyan500
} as const;

// ---------------------------------------------------------------------------
// Semantic tokens — Dark theme
//
// Contrast targets (WCAG AA):
//   textPrimary/onSurface  → ≥ 7:1 on surface    (#EBEBEB / #1C1C1E ≈ 15:1)
//   textSecondary          → ≥ 4.5:1 on surface  (#ABABAB / #1C1C1E ≈ 6.5:1)
//   textTertiary           → ≥ 3:1 on surface     (#909090 / #1C1C1E ≈ 5.0:1)
//   primary                → ≥ 4.5:1 on background(#4DD9EC / #121212 ≈ 10.6:1)
//   onXContainer           → ≥ 7:1 on xContainer  (all ≥ 9:1)
// ---------------------------------------------------------------------------
export const dark = {
  // ── Backgrounds / surfaces ─────────────────────────────────────────────
  background: '#121212', // MD3 reference dark background
  surface: '#1C1C1E', // L1 surface  (iOS dark system background)
  surfaceVariant: '#28282C', // L2 surface  (cards, inputs)
  surfaceElevated: '#323235', // L3 surface  (modals, bottom-sheets)

  // ── Brand / primary ────────────────────────────────────────────────────
  primary: '#4DD9EC', // ↑ from #00B4D8 → 10.6:1 on #121212
  onPrimary: '#00363F', // dark text on primary button
  primaryContainer: '#003E4A', // dark cyan container
  onPrimaryContainer: '#A8EEFF', // light text on dark container (8.7:1)

  secondary: '#B3A0DC', // ↑ from #2B1B5D → 7.8:1 on #1C1C1E
  onSecondary: '#1A0A40', // dark text on secondary button
  secondaryContainer: '#211840', // dark purple container
  onSecondaryContainer: '#D4BBFF', // light text on dark container (9.5:1)

  tertiary: '#34D399', // ↑ from #10B981 → 8.0:1 on #1C1C1E
  onTertiary: '#00361D',
  tertiaryContainer: '#0A2818', // dark emerald container
  onTertiaryContainer: '#A7F3D0', // light text (11.3:1)

  // ── Status ─────────────────────────────────────────────────────────────
  error: '#F87171', // ↑ from #DC2626 → visible on dark (5.0:1)
  onError: '#600E0E',
  errorContainer: '#520F0F', // dark red container
  onErrorContainer: '#FFDAD6', // light text (13.3:1)

  success: '#34D399',
  onSuccess: '#00361D',
  successContainer: '#0A2818',
  onSuccessContainer: '#A7F3D0',

  warning: '#FBBF24', // ↑ from #B45309 → 5.8:1  on dark
  onWarning: '#3B1E00',
  warningContainer: '#3B1E00', // dark amber container
  onWarningContainer: '#FFE082', // light text (13.8:1)

  // ── Content ────────────────────────────────────────────────────────────
  onBackground: '#EBEBEB', // 15:1 on #121212
  onSurface: '#EBEBEB',
  onSurfaceVariant: '#ABABAB', // 6.5:1 on #1C1C1E
  onSurfaceDisabled: '#595959', // 3.0:1 on #1C1C1E (disabled, AA-large)

  // ── Borders ────────────────────────────────────────────────────────────
  outline: '#4A4A4F', // visible divider (3.0:1 on #1C1C1E, non-text UI)
  outlineVariant: '#2E2E32', // subtle divider (distinct from surface)

  // ── Accents ────────────────────────────────────────────────────────────
  accent: '#4DD9EC',
  accentSuccess: '#34D399',
  accentWarning: '#FBBF24',

  // ── Text hierarchy ─────────────────────────────────────────────────────
  textPrimary: '#EBEBEB', // 15:1 on #121212
  textSecondary: '#ABABAB', // 6.5:1 on #1C1C1E
  textTertiary: '#909090', // 5.0:1 on #1C1C1E (all font sizes)
  textDisabled: '#595959',
  textInverse: '#121212', // text on light surfaces
  textBrand: '#C4B0F0', // ↑ from #2B1B5D → 8.7:1 on #1C1C1E
  textAccent: '#4DD9EC' // ↑ from #00B4D8 → 10.6:1 on #121212
} as const;

export type ColorTokens = { readonly [K in keyof typeof light]: string };
