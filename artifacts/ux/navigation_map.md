# Mobile App — Navigation Map

> **Generated:** 2026-04-11  
> **Platform:** React Native · React Navigation v6  
> **Entry:** `apps/mobile/App.tsx`

---

## Hierarchy Overview

```
RootStack (NativeStack)
├── Onboarding          → OnboardingStack
├── MainTabs            → BottomTabNavigator
│   ├── Home            → HomeStack
│   ├── Discover        → DiscoverStack
│   ├── Library         → LibraryStack  [subscription gate]
│   ├── Progress        → ProgressStack [subscription gate]
│   └── Profile         → ProfileStack
├── Auth                → AuthStack
├── Content             → ContentStack
├── Coach               → CoachStack    [coach_role gate]
└── Notifications       → NotificationStack
```

---

## 1. Onboarding Stack

**File:** `navigation/OnboardingStack.tsx`  
**Initial:** `AuthSplash`

| Screen | File | Params |
|---|---|---|
| `AuthSplash` | `screens/auth/AuthSplashScreen.tsx` | `{ state? }` |
| `OnboardingCarousel` | `screens/onboarding/OnboardingCarouselScreen.tsx` | `{ state? }` |
| `OnboardingLanguageSelect` | `screens/onboarding/OnboardingLanguageSelectScreen.tsx` | `{ state? }` |
| `OnboardingWelcome` | `screens/onboarding/OnboardingWelcomeScreen.tsx` | `{ state? }` |

---

## 2. Auth Stack

**File:** `navigation/AuthStack.tsx`  
**Initial:** `AuthLogin`

| Screen | File | Params | Presentation |
|---|---|---|---|
| `AuthLogin` | `screens/auth/AuthLoginScreen.tsx` | `{ state? }` | default |
| `AuthRegister` | `screens/auth/AuthRegisterScreen.tsx` | `{ state? }` | default |
| `AuthForgotPassword` | `screens/auth/AuthForgotPasswordScreen.tsx` | `{ state? }` | default |
| `AuthOtpVerify` | `screens/auth/AuthOtpVerifyScreen.tsx` | `{ state?; source?: 'register' \| 'forgot-password' }` | default |
| `AuthPasswordReset` | `screens/auth/AuthPasswordResetScreen.tsx` | `{ state? }` | default |
| `AuthFaceIdSetup` | `screens/auth/AuthFaceIdSetupScreen.tsx` | `{ state? }` | default |
| `AuthDemographics` | `screens/auth/AuthDemographicsScreen.tsx` | `{ state? }` | default |
| `AuthGuestMode` | `screens/auth/AuthGuestModeScreen.tsx` | `{ state? }` | default |
| `AuthSessionTimeout` | `screens/auth/AuthSessionTimeoutScreen.tsx` | `{ state? }` | **modal** |
| `AuthLockout` | `screens/auth/AuthLockoutScreen.tsx` | `{ state? }` | **modal** |
| `AuthReauth` | `screens/auth/AuthReauthScreen.tsx` | `{ state? }` | **modal** |

---

## 3. Home Stack

**File:** `navigation/HomeStack.tsx`  
**Initial:** `HomeDashboard`

| Screen | File | Params |
|---|---|---|
| `HomeDashboard` | `screens/HomeDashboardScreen.tsx` | `{ state? }` |
| `HomeSearch` | `screens/home/HomeSearchScreen.tsx` | `{ state? }` |
| `HomeSearchResults` | `screens/home/HomeSearchResultsScreen.tsx` | `{ state?; query?; activeFilter? }` |
| `HomeVicdandanKaraktereDetail` | `screens/home/HomeVicdandanKaraktereDetailScreen.tsx` | `{ state? }` |
| `HomeActiveContentList` | `screens/home/HomeActiveContentListScreen.tsx` | `{ state? }` |
| `HomeSubscription` | `screens/home/HomeSubscriptionScreen.tsx` | `{ state? }` |
| `HomeContentNav` | `screens/home/HomeContentNavScreen.tsx` | `{ state? }` |
| `HomeReminderSetting` | `screens/home/HomeReminderSettingScreen.tsx` | `{ state? }` |

---

## 4. Discover Stack

**File:** `navigation/DiscoverStack.tsx`  
**Initial:** `DiscoverCatalog`

| Screen | File | Params | Notes |
|---|---|---|---|
| `DiscoverCatalog` | `screens/DiscoverCatalogScreen.tsx` | `{ state? }` | Main catalog hub |
| `DiscoverAssistantIntro` | `screens/discover/DiscoverAssistantIntroScreen.tsx` | `{ state? }` | FR-E4 quiz assistant |
| `DiscoverAssistantQuestions` | `screens/discover/DiscoverAssistantQuestionsScreen.tsx` | `{ state? }` | FR-E4 |
| `DiscoverAssistantResults` | `screens/discover/DiscoverAssistantResultsScreen.tsx` | `{ state? }` | FR-E4 |
| `DiscoverAIAssistantIntro` | `screens/discover/DiscoverAIAssistantIntroScreen.tsx` | `{ state? }` | FR-E16 AI assistant |
| `DiscoverAIAssistantQuestions` | `screens/discover/DiscoverAIAssistantQuestionsScreen.tsx` | `{ state?; question? }` | FR-E16 |
| `DiscoverAIAssistantResults` | `screens/discover/DiscoverAIAssistantResultsScreen.tsx` | `{ state?; question? }` | FR-E16 |
| `DiscoverAssistantInsights` | `screens/discover/DiscoverAssistantInsightsScreen.tsx` | `{ state?; question? }` | FR-E16 |
| `DiscoverJourneys` | `screens/discover/DiscoverJourneysScreen.tsx` | `{ state? }` | Browse journeys |
| `DiscoverWorkshops` | `screens/discover/DiscoverWorkshopsScreen.tsx` | `{ state? }` | Browse workshops |
| `DiscoverModules` | `screens/discover/DiscoverModulesScreen.tsx` | `{ state? }` | Browse modules |
| `DiscoverEbooks` | `screens/discover/DiscoverEbooksScreen.tsx` | `{ state? }` | Browse e-books |

---

## 5. Library Stack

**File:** `navigation/LibraryStack.tsx`  
**Initial:** `LibraryOverview`  
**Guard:** `withSubscriptionGate` — requires `trial | active`; fallback → `ContentPaywall`

| Screen | File | Params | Presentation |
|---|---|---|---|
| `LibraryOverview` | `screens/library/LibraryOverviewScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryJourneys` | `screens/library/LibraryJourneysScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryWorkshops` | `screens/library/LibraryWorkshopsScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryModules` | `screens/library/LibraryModulesScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryEbooks` | `screens/library/LibraryEbooksScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryFavorites` | `screens/library/LibraryFavoritesScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryFavoriteDetail` | `screens/library/LibraryFavoriteDetailScreen.tsx` | `{ id; state?; entitlement? }` | default |
| `LibraryCollections` | `screens/library/LibraryCollectionsScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryCollectionDetail` | `screens/library/LibraryCollectionDetailScreen.tsx` | `{ id; state?; entitlement? }` | default |
| `LibraryDownloads` | `screens/library/LibraryDownloadsScreen.tsx` | `{ state?; entitlement? }` | default |
| `LibraryShareExport` | `screens/library/LibraryShareExportScreen.tsx` | `{ id; state?; entitlement? }` | **modal** |
| `ContentPaywall` | `screens/content/ContentPaywallScreen.tsx` | `{ state?; entitlement? }` | **modal** |

---

## 6. Progress Stack

**File:** `navigation/ProgressStack.tsx`  
**Initial:** `ProgressDashboard`  
**Guard:** `withSubscriptionGate` — requires `trial | active`; fallback → `ContentPaywall`

| Screen | File | Params | Presentation |
|---|---|---|---|
| `ProgressDashboard` | `screens/progress/ProgressDashboardScreen.tsx` | `{ state?; entitlement? }` | default |
| `ProgressEmotionalMap` | `screens/progress/ProgressEmotionalMapScreen.tsx` | `{ state?; entitlement? }` | default |
| `ProgressWeeklySummary` | `screens/progress/ProgressWeeklySummaryScreen.tsx` | `{ state?; entitlement? }` | default |
| `ProgressStrengths` | `screens/progress/ProgressStrengthsScreen.tsx` | `{ state?; entitlement? }` | default |
| `ProgressReportExport` | `screens/progress/ProgressReportExportScreen.tsx` | `{ state?; entitlement? }` | **modal** |
| `ProgressCompletionReview` | `screens/progress/ProgressCompletionReviewScreen.tsx` | `{ contentType?; contentId?; state? }` | **modal** |
| `ContentPaywall` | `screens/content/ContentPaywallScreen.tsx` | `{ state?; entitlement? }` | **modal** |

---

## 7. Profile Stack

**File:** `navigation/ProfileStack.tsx`  
**Initial:** `ProfileOverview`

| Screen | File | Params | Presentation |
|---|---|---|---|
| `ProfileOverview` | `screens/ProfileOverviewScreen.tsx` | `{ state? }` | default |
| `ProfileSettings` | `screens/profile/ProfileSettingsScreen.tsx` | `{ state? }` | default |
| `ProfileLanguage` | `screens/profile/ProfileLanguageScreen.tsx` | `{ state? }` | default |
| `ProfileAccessibility` | `screens/profile/ProfileAccessibilityScreen.tsx` | `{ state? }` | default |
| `ProfileTextScale` | `screens/profile/ProfileTextScaleScreen.tsx` | `{ state? }` | default |
| `ProfileTheme` | `screens/profile/ProfileThemeScreen.tsx` | `{ state? }` | default |
| `ProfileScreenReader` | `screens/profile/ProfileScreenReaderScreen.tsx` | `{ state? }` | default |
| `ProfileReminders` | `screens/profile/ProfileRemindersScreen.tsx` | `{ state? }` | default |
| `ProfileAccount` | `screens/profile/ProfileAccountScreen.tsx` | `{ state? }` | default |
| `ProfileChangePassword` | `screens/profile/ProfileChangePasswordScreen.tsx` | `{ state? }` | default |
| `ProfileSubscription` | `screens/profile/ProfileSubscriptionScreen.tsx` | `{ state? }` | default |
| `ProfilePlanComparison` | `screens/profile/ProfilePlanComparisonScreen.tsx` | `{ state? }` | default |
| `ProfileCheckout` | `screens/profile/ProfileCheckoutScreen.tsx` | `{ state? }` | default |
| `ProfileAddons` | `screens/profile/ProfileAddonsScreen.tsx` | `{ state? }` | default |
| `ProfileSeatManagement` | `screens/profile/ProfileSeatManagementScreen.tsx` | `{ state? }` | default |
| `ProfilePaymentHistory` | `screens/profile/ProfilePaymentHistoryScreen.tsx` | `{ state? }` | default |
| `ProfileRestorePurchases` | `screens/profile/ProfileRestorePurchasesScreen.tsx` | `{ state? }` | default |
| `ProfileStudentDiscount` | `screens/profile/ProfileStudentDiscountScreen.tsx` | `{ state? }` | default |
| `ProfilePlanManagement` | `screens/profile/ProfilePlanManagementScreen.tsx` | `{ state? }` | default |
| `ProfileLogoutConfirm` | `screens/profile/ProfileLogoutConfirmScreen.tsx` | `{ state? }` | **modal** |

---

## 8. Content Stack

**File:** `navigation/ContentStack.tsx`  
**Initial:** `ContentEbookDetail`  
**Note:** Pushed from any tab via `navigation.navigate('Content', { screen, params })`

### Journey

| Screen | File | Params |
|---|---|---|
| `ContentJourneyDetail` | `screens/content/ContentJourneyDetailScreen.tsx` | `{ id; state? }` |
| `ContentJourneyHome` | `screens/content/ContentJourneyHomeScreen.tsx` | `{ id; state? }` |
| `ContentJourneyDay` | `screens/content/ContentJourneyDayScreen.tsx` | `{ id; day; state? }` |

### Workshop (EPIC-8)

| Screen | File | Params | Notes |
|---|---|---|---|
| `ContentWorkshopDetail` | `screens/content/ContentWorkshopDetailScreen.tsx` | `{ id?; state? }` | Landing / detail (FR-E8-01) |
| `ContentWorkshopHome` | `screens/content/ContentWorkshopHomeScreen.tsx` | `{ id?; state? }` | 11-stage plan (FR-E8-02) |
| `ContentWorkshopSection` | `screens/content/ContentWorkshopSectionScreen.tsx` | `{ id; sectionId; state? }` | Stage reader (FR-E8-03) |
| `ContentWorkshopCamp` | `screens/content/ContentWorkshopCampScreen.tsx` | `{ id?; state? }` | 3-Day Camp (FR-E8-04) |
| `ContentWorkshopGuide` | `screens/content/ContentWorkshopGuideScreen.tsx` | `{ id?; state? }` | Facilitator guide (FR-E8-05) |
| `ContentWorkshopWorkbook` | `screens/content/ContentWorkshopWorkbookScreen.tsx` | `{ id?; state? }` | Workbook / 10 worksheets (FR-E8-06) |
| `ContentWorkshopFollowUp` | `screens/content/ContentWorkshopFollowUpScreen.tsx` | `{ id?; state? }` | Follow-up (FR-E8-07) |
| `ContentWorkshopCompletion` | `screens/content/ContentWorkshopCompletionScreen.tsx` | `{ id?; state? }` | Completion + badges (FR-E8-08) |

### Module / Package

| Screen | File | Params |
|---|---|---|
| `ContentModuleHome` | `screens/content/ContentModuleHomeScreen.tsx` | `{ id; state? }` |
| `ContentPackageDetail` | `screens/content/ContentPackageDetailScreen.tsx` | `{ id?; state? }` |

### E-Book

| Screen | File | Params | Presentation |
|---|---|---|---|
| `ContentEbookDetail` | `screens/content/ContentEbookDetailScreen.tsx` | `{ id?; state? }` | default |
| `ContentEbookReader` | `screens/content/ContentEbookReaderScreen.tsx` | `{ id; state?; chapterId? }` | default |
| `ContentEbookToc` | `screens/content/ContentEbookTocScreen.tsx` | `{ id; state?; chapterId? }` | **modal** |
| `ContentEbookHighlights` | `screens/content/ContentEbookHighlightsScreen.tsx` | `{ id; state? }` | default |
| `ContentEbookSettings` | `screens/content/ContentEbookSettingsScreen.tsx` | `{ id?; state? }` | **modal** |

### General Content

| Screen | File | Params | Presentation |
|---|---|---|---|
| `ContentReading` | `screens/content/ContentReadingScreen.tsx` | `{ id?; state? }` | default |
| `ContentExercise` | `screens/content/ContentExerciseScreen.tsx` | `{ id?; state? }` | default |
| `ContentComment` | `screens/content/ContentCommentScreen.tsx` | `{ contentItemId; state? }` | default |
| `ContentCommentPreview` | `screens/content/ContentCommentPreviewScreen.tsx` | `{ contentItemId; state?; answer1?; answer2?; emotion? }` | default |
| `ContentAchievement` | `screens/content/ContentAchievementScreen.tsx` | `{ id; state? }` | default |
| `ContentReviewPrompt` | `screens/content/ContentReviewPromptScreen.tsx` | `{ targetType; id; state? }` | **modal** |
| `ContentPaywall` | `screens/content/ContentPaywallScreen.tsx` | `{ state? }` | **modal** |

---

## 9. Coach Stack

**File:** `navigation/CoachStack.tsx`  
**Initial:** `CoachDashboard`  
**Gate:** `coach_role` — FR-E12-01..04

| Screen | File | Params | Presentation |
|---|---|---|---|
| `CoachDashboard` | `screens/coach/CoachDashboardScreen.tsx` | `{ state? }` | default |
| `CoachClientProfile` | `screens/coach/CoachClientProfileScreen.tsx` | `{ clientId; state? }` | default |
| `CoachContentTracking` | `screens/coach/CoachContentTrackingScreen.tsx` | `{ clientId?; state? }` | default |
| `CoachFeedback` | `screens/coach/CoachFeedbackScreen.tsx` | `{ clientId?; state? }` | **modal** |

---

## 10. Notification Stack

**File:** `navigation/NotificationStack.tsx`  
**Initial:** `NotificationList`  
**Feature:** FR-E17-01..04

| Screen | File | Params |
|---|---|---|
| `NotificationList` | `screens/notifications/NotificationListScreen.tsx` | `{ state? }` |
| `NotificationDetail` | `screens/notifications/NotificationDetailScreen.tsx` | `{ notificationId?; state? }` |
| `NotificationSettings` | `screens/notifications/NotificationSettingsScreen.tsx` | `{ state? }` |
| `ReminderPlanner` | `screens/notifications/ReminderPlannerScreen.tsx` | `{ state? }` |

---

## Navigation Guards

**File:** `navigation/guards.tsx`

| Guard | HOC | Gate | Fallback | Applied To |
|---|---|---|---|---|
| Subscription | `withSubscriptionGate` | `subscription:trial_or_active` | `ContentPaywall` | LibraryStack, ProgressStack |
| Coach Role | Route-level check | `coach_role` | — | CoachStack |

---

## Common Param Patterns

```typescript
// Screen state for loading / error / empty / offline UI variants
state?: 'loading' | 'error' | 'empty' | 'offline'

// Subscription entitlement (gated screens)
entitlement?: 'trial' | 'active' | 'none' | 'expired'
```

---

## Stats

| | Count |
|---|---|
| Navigators | 10 |
| Total screens | 117 |
| Modal presentations | 25 |
| Subscription-gated screens | 17 |
| Coach-gated screens | 4 |
