/**
 * PST Coaching — Theme barrel
 *
 * Single import point for all design tokens.
 *
 * Usage:
 *   import { palette, light, spacing, radii, shadows, typography, paperTheme, shape } from '../theme';
 *   import { useAppTheme } from '../theme';  // for dynamic light/dark tokens
 */

export { ColorTokens, dark, light, palette } from './colors';
export { darkPaperTheme, paperTheme, PaperTheme, shape } from './paper';
export { radii, RadiusKey } from './radii';
export { shadows, themeShadow, ShadowKey } from './shadows';
export { BASE, MIN_TOUCH_TARGET, spacing, SpacingKey } from './spacing';
export { fontSizes, fontWeights, letterSpacings, lineHeights, typography, TypographyRole } from './typography';
export { useAppTheme, AppTheme } from './useAppTheme';
