import {
  type NavigationState,
  type PartialState,
  createNavigationContainerRef,
} from "@react-navigation/native";
import { trackScreenView } from "../analytics";

export const navigationRef = createNavigationContainerRef();

type RouteState = NavigationState | PartialState<NavigationState> | undefined;

const routeNameToScreenId: Record<string, string> = {
  HomeDashboard: "home.dashboard",
  HomeSearch: "home.search",
  HomeSearchResults: "home.search_results",
  HomeVicdandanKaraktereDetail: "home.vicdandan_karaktere_detail",
  HomeActiveContentList: "home.active_content_list",
  DiscoverCatalog: "discover.catalog",
  DiscoverAssistantIntro: "discover.assistant_intro",
  DiscoverAssistantQuestions: "discover.assistant_questions",
  DiscoverAssistantResults: "discover.assistant_results",
  DiscoverJourneys: "discover.journeys",
  DiscoverWorkshops: "discover.workshops",
  DiscoverModules: "discover.modules",
  DiscoverEbooks: "discover.ebooks",
  LibraryOverview: "library.overview",
  LibraryJourneys: "library.journeys",
  LibraryWorkshops: "library.workshops",
  LibraryModules: "library.modules",
  LibraryEbooks: "library.ebooks",
  LibraryFavorites: "library.favorites",
  LibraryFavoriteDetail: "library.favorite_detail",
  LibraryCollections: "library.collections",
  LibraryCollectionDetail: "library.collection_detail",
  LibraryDownloads: "library.downloads",
  ProgressDashboard: "progress.dashboard",
  ProgressEmotionalMap: "progress.emotional_map",
  ProgressWeeklySummary: "progress.weekly_summary",
  ProgressStrengths: "progress.strengths",
  ProgressReportExport: "progress.report_export",
  ProfileOverview: "profile.overview",
  ProfileSettings: "profile.settings",
  ProfileLanguage: "profile.language",
  ProfileAccessibility: "profile.accessibility",
  ProfileReminders: "profile.reminders",
  ProfileAccount: "profile.account",
  ProfileChangePassword: "profile.change_password",
  ProfileSubscription: "profile.subscription",
  ProfilePlanComparison: "profile.plan_comparison",
  ProfileCheckout: "profile.checkout",
  ProfileAddons: "profile.addons",
  ProfileSeatManagement: "profile.seat_management",
  ProfilePaymentHistory: "profile.payment_history",
  ProfileRestorePurchases: "profile.restore_purchases",
  ProfileStudentDiscount: "profile.student_discount",
  ProfileLogoutConfirm: "profile.logout_confirm",
  OnboardingLanguageSelect: "onboarding.language_select",
  OnboardingWelcome: "onboarding.welcome",
  AuthLogin: "auth.login",
  AuthRegister: "auth.register",
  AuthOtpVerify: "auth.otp_verify",
  AuthPasswordReset: "auth.password_reset",
  AuthSessionTimeout: "auth.session_timeout",
  AuthLockout: "auth.lockout",
  AuthReauth: "auth.reauth",
  ContentJourneyDetail: "content.journey_detail",
  ContentJourneyHome: "content.journey_home",
  ContentJourneyDay: "content.journey_day",
  ContentWorkshopDetail: "content.workshop_detail",
  ContentWorkshopHome: "content.workshop_home",
  ContentWorkshopSection: "content.workshop_section",
  ContentModuleDetail: "content.module_detail",
  ContentModuleHome: "content.module_home",
  ContentPackageDetail: "content.package_detail",
  ContentEbookDetail: "content.ebook_detail",
  ContentEbookReader: "content.ebook_reader",
  ContentEbookToc: "content.ebook_toc",
  ContentEbookHighlights: "content.ebook_highlights",
  ContentReading: "content.reading",
  ContentExercise: "content.exercise",
  ContentComment: "content.comment",
  ContentCommentPreview: "content.comment_preview",
  ContentAchievement: "content.achievement",
  ContentReviewPrompt: "content.review_prompt",
  ContentPaywall: "content.paywall",
};

const getActiveRoute = (state: RouteState) => {
  if (!state || !state.routes || state.routes.length === 0) {
    return undefined;
  }

  const index = typeof state.index === "number" ? state.index : 0;
  let route = state.routes[index];

  while (route.state && (route.state as NavigationState).routes) {
    const nestedState = route.state as NavigationState;
    const nestedIndex = typeof nestedState.index === "number" ? nestedState.index : 0;
    route = nestedState.routes[nestedIndex];
  }

  return route;
};

const createNavigationAnalytics = () => {
  let lastRouteKey: string | undefined;

  const handleStateChange = (state?: RouteState) => {
    const route = getActiveRoute(state);
    if (!route) {
      return;
    }

    const routeKey = route.key ?? route.name;

    if (routeKey === lastRouteKey) {
      return;
    }

    lastRouteKey = routeKey;

    const screenId = routeNameToScreenId[route.name];
    if (!screenId) {
      return;
    }

    trackScreenView(screenId);
  };

  return {
    onStateChange: handleStateChange,
    onReady: () => {
      if (navigationRef.isReady()) {
        handleStateChange(navigationRef.getRootState());
      }
    },
  };
};

export const navigationAnalytics = createNavigationAnalytics();
