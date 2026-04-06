/**
 * PST Coaching — Shadow / Elevation Presets
 *
 * iOS uses shadow* props. Android uses elevation.
 * Each preset includes both so Platform-specific code is not needed at callsites.
 *
 * Usage:
 *   style={[styles.card, shadows.md]}
 */
import { Platform } from 'react-native';

type ShadowStyle = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};

const makeShadow = (height: number, radius: number, opacity: number, elevation: number): ShadowStyle => ({
  shadowColor: '#000000',
  shadowOffset: { width: 0, height },
  shadowOpacity: Platform.OS === 'ios' ? opacity : 0,
  shadowRadius: radius,
  elevation
});

export const shadows = {
  none: makeShadow(0, 0, 0, 0),
  xs: makeShadow(1, 2, 0.04, 1),
  sm: makeShadow(2, 4, 0.06, 2),
  md: makeShadow(4, 8, 0.08, 4),
  lg: makeShadow(8, 16, 0.1, 8),
  xl: makeShadow(12, 24, 0.12, 12),
  '2xl': makeShadow(16, 32, 0.15, 16)
} as const;

export type ShadowKey = keyof typeof shadows;
