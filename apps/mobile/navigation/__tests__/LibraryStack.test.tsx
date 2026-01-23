import { libraryStackScreens, LibraryStackParamList } from "../LibraryStack";

describe("Library stack routes", () => {
  it("registers all library routes", () => {
    const expected: Array<keyof LibraryStackParamList> = [
      "LibraryOverview",
      "LibraryJourneys",
      "LibraryWorkshops",
      "LibraryModules",
      "LibraryEbooks",
      "LibraryFavorites",
      "LibraryFavoriteDetail",
      "LibraryCollections",
      "LibraryCollectionDetail",
      "LibraryDownloads",
      "ContentPaywall",
    ];

    const names = libraryStackScreens.map((screen) => screen.name);
    expect(names).toEqual(expected);
  });

  it("marks paywall as modal", () => {
    const paywall = libraryStackScreens.find((screen) => screen.name === "ContentPaywall");
    expect(paywall?.options?.presentation).toBe("modal");
  });
});
