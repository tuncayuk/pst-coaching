import { ContentStackParamList, contentSheetScreenOptions, contentStackScreens } from '../ContentStack';

describe('Content stack routes', () => {
  it('registers all content routes', () => {
    const expected: (keyof ContentStackParamList)[] = [
      'ContentJourneyHome',
      'ContentJourneyDay',
      'ContentJourneyDetail',
      'ContentWorkshopHome',
      'ContentWorkshopSection',
      'ContentWorkshopDetail',
      'ContentModuleHome',
      'ContentPackageDetail',
      'ContentEbookDetail',
      'ContentEbookReader',
      'ContentEbookToc',
      'ContentEbookHighlights',
      'ContentReading',
      'ContentExercise',
      'ContentComment',
      'ContentCommentPreview',
      'ContentAchievement',
      'ContentReviewPrompt',
      'ContentPaywall'
    ];

    const names = contentStackScreens.map(screen => screen.name);
    expect(names).toEqual(expected);
  });

  it('marks sheet routes as modal', () => {
    expect(contentSheetScreenOptions.ContentPaywall.presentation).toBe('modal');
    expect(contentSheetScreenOptions.ContentEbookToc.presentation).toBe('modal');
    expect(contentSheetScreenOptions.ContentReviewPrompt.presentation).toBe('modal');
  });
});
