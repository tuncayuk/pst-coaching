export type ContentItemType = 'journey' | 'workshop' | 'module' | 'ebook' | 'content';

type LibraryContentType = Exclude<ContentItemType, 'content'>;

export const CONTENT_TYPE_LABELS: Record<ContentItemType, string> = {
  journey: 'Yolculuk',
  workshop: 'Atolye',
  module: 'Modul',
  ebook: 'e-Kitap',
  content: 'Icerik'
};

export const LIBRARY_CONTENT_TYPE_COLORS: Record<LibraryContentType, string> = {
  journey: '#7C4DFF',
  workshop: '#C62828',
  module: '#2E7D32',
  ebook: '#00897B'
};

export const LIBRARY_CONTENT_FILTER_ALL = 'Tumu';

export const LIBRARY_CONTENT_FILTER_OPTIONS = [
  LIBRARY_CONTENT_FILTER_ALL,
  'Yolculuk',
  'Atolye',
  'Modul',
  'e-Kitap'
] as const;

export const CONTENT_TYPE_SCREEN_MAP: Record<LibraryContentType, string> = {
  journey: 'ContentJourneyDetail',
  workshop: 'ContentWorkshopDetail',
  module: 'ContentModuleHome',
  ebook: 'ContentEbookDetail'
};

export const getContentTypeLabel = (type: string): string =>
  CONTENT_TYPE_LABELS[type as ContentItemType] ?? CONTENT_TYPE_LABELS.content;

export const getLibraryContentTypeColor = (type: string): string =>
  LIBRARY_CONTENT_TYPE_COLORS[type as LibraryContentType] ?? '#9E9E9E';
