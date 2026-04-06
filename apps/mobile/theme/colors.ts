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
// Semantic tokens — Dark theme (extend as needed)
// ---------------------------------------------------------------------------
export const dark = {
  ...light,
  background: palette.neutral900,
  surface: palette.neutral800,
  surfaceVariant: palette.neutral800,
  surfaceElevated: palette.neutral700,

  onBackground: palette.white,
  onSurface: palette.white,
  onSurfaceVariant: palette.neutral300,

  textPrimary: palette.white,
  textSecondary: palette.neutral300,
  textTertiary: palette.neutral500,
  textBrand: palette.purple100,

  outline: palette.neutral700,
  outlineVariant: palette.neutral800
} as const;

export type ColorTokens = typeof light;
