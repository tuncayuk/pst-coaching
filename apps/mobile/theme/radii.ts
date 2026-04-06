/**
 * PST Coaching — Border Radius Scale
 *
 * Aligned with Material 3 shape tokens.
 * paper.roundness is set to 4 so theme.roundness * N matches the token below.
 *
 * Usage:
 *   borderRadius: radii.md     → 12
 *   borderRadius: radii.full   → 999 (pill/circle)
 */

export const radii = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 999
} as const;

export type RadiusKey = keyof typeof radii;
