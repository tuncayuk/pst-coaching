import { contentStackScreens, contentSheetScreenOptions, ContentStackParamList } from "../ContentStack";

describe("Content stack routes", () => {
  it("registers all content routes", () => {
    const expected: Array<keyof ContentStackParamList> = [
      "ContentJourneyDetail",
      "ContentWorkshopDetail",
      "ContentModuleDetail",
      "ContentPackageDetail",
      "ContentEbookDetail",
      "ContentEbookReader",
      "ContentEbookToc",
      "ContentEbookHighlights",
      "ContentComment",
      "ContentCommentPreview",
      "ContentReviewPrompt",
      "ContentPaywall",
    ];

    const names = contentStackScreens.map((screen) => screen.name);
    expect(names).toEqual(expected);
  });

  it("marks sheet routes as modal", () => {
    expect(contentSheetScreenOptions.ContentPaywall.presentation).toBe("modal");
    expect(contentSheetScreenOptions.ContentEbookToc.presentation).toBe("modal");
    expect(contentSheetScreenOptions.ContentReviewPrompt.presentation).toBe("modal");
  });
});
