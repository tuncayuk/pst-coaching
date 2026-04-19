import { getReaderAudioSpeeds, getReaderHighlightColors } from '../mockSelectors';

export type ReaderFontKey = 'small' | 'medium' | 'large';

export const READER_FONT_SIZES: Record<ReaderFontKey, number> = {
  small: 14,
  medium: 16,
  large: 19
};

export const READER_FONT_ORDER: ReaderFontKey[] = ['small', 'medium', 'large'];

export const READER_AUDIO_SPEEDS = getReaderAudioSpeeds();
export const READER_HIGHLIGHT_COLORS = getReaderHighlightColors();
