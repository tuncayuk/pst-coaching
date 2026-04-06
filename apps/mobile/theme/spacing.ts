/**
 * PST Coaching — Spacing Scale
 *
 * 8dp grid. Use multiples of the base unit (8) for all margin, padding, gap values.
 * Never use raw numbers in StyleSheet — import from here instead.
 *
 * Usage:
 *   padding: spacing[4]        → 16
 *   gap: spacing[2]            → 8
 *   marginBottom: spacing[6]   → 24
 */

export const BASE = 8;

export const spacing = {
  0: 0,
  0.5: BASE * 0.5, //  4
  1: BASE * 1, //  8
  1.5: BASE * 1.5, // 12
  2: BASE * 2, // 16
  2.5: BASE * 2.5, // 20
  3: BASE * 3, // 24
  4: BASE * 4, // 32
  5: BASE * 5, // 40
  6: BASE * 6, // 48
  7: BASE * 7, // 56
  8: BASE * 8, // 64
  10: BASE * 10, // 80
  12: BASE * 12, // 96
  16: BASE * 16 // 128
} as const;

/** Minimum tappable touch target per WCAG / Material 3 guidelines */
export const MIN_TOUCH_TARGET = 48;

export type SpacingKey = keyof typeof spacing;
