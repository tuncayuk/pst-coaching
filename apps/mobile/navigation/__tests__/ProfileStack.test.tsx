import { profileStackScreens, ProfileStackParamList } from "../ProfileStack";

describe("Profile stack routes", () => {
  it("registers all profile routes", () => {
    const expected: Array<keyof ProfileStackParamList> = [
      "ProfileOverview",
      "ProfileSettings",
      "ProfileLanguage",
      "ProfileAccessibility",
      "ProfileReminders",
      "ProfileAccount",
      "ProfileChangePassword",
      "ProfileSubscription",
      "ProfilePlanComparison",
      "ProfileCheckout",
      "ProfileAddons",
      "ProfileSeatManagement",
      "ProfilePaymentHistory",
      "ProfileRestorePurchases",
      "ProfileStudentDiscount",
      "ProfileLogoutConfirm",
    ];

    const names = profileStackScreens.map((screen) => screen.name);
    expect(names).toEqual(expected);
  });

  it("marks logout confirm as modal", () => {
    const logout = profileStackScreens.find((screen) => screen.name === "ProfileLogoutConfirm");
    expect(logout?.options?.presentation).toBe("modal");
  });
});
