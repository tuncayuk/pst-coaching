import React from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ScreenState } from "../screens/components/ScreenState";
import { ProfileOverviewScreen } from "../screens/ProfileOverviewScreen";
import { ProfileSettingsScreen } from "../screens/profile/ProfileSettingsScreen";
import { ProfileLanguageScreen } from "../screens/profile/ProfileLanguageScreen";
import { ProfileAccessibilityScreen } from "../screens/profile/ProfileAccessibilityScreen";
import { ProfileTextScaleScreen } from "../screens/profile/ProfileTextScaleScreen";
import { ProfileThemeScreen } from "../screens/profile/ProfileThemeScreen";
import { ProfileScreenReaderScreen } from "../screens/profile/ProfileScreenReaderScreen";
import { ProfileRemindersScreen } from "../screens/profile/ProfileRemindersScreen";
import { ProfileAccountScreen } from "../screens/profile/ProfileAccountScreen";
import { ProfileChangePasswordScreen } from "../screens/profile/ProfileChangePasswordScreen";
import { ProfileSubscriptionScreen } from "../screens/profile/ProfileSubscriptionScreen";
import { ProfilePlanComparisonScreen } from "../screens/profile/ProfilePlanComparisonScreen";
import { ProfileCheckoutScreen } from "../screens/profile/ProfileCheckoutScreen";
import { ProfileAddonsScreen } from "../screens/profile/ProfileAddonsScreen";
import { ProfileSeatManagementScreen } from "../screens/profile/ProfileSeatManagementScreen";
import { ProfilePaymentHistoryScreen } from "../screens/profile/ProfilePaymentHistoryScreen";
import { ProfileRestorePurchasesScreen } from "../screens/profile/ProfileRestorePurchasesScreen";
import { ProfileStudentDiscountScreen } from "../screens/profile/ProfileStudentDiscountScreen";
import { ProfilePlanManagementScreen } from "../screens/profile/ProfilePlanManagementScreen";
import { ProfileLogoutConfirmScreen } from "../screens/profile/ProfileLogoutConfirmScreen";

type ScreenStateParam = { state?: ScreenState } | undefined;

export type ProfileStackParamList = {
  ProfileOverview: ScreenStateParam;
  ProfileSettings: ScreenStateParam;
  ProfileLanguage: ScreenStateParam;
  ProfileAccessibility: ScreenStateParam;
  /** FR-E10-02: Text scale screen */
  ProfileTextScale: ScreenStateParam;
  /** FR-E10-03: Theme and high contrast screen */
  ProfileTheme: ScreenStateParam;
  /** FR-E10-04: Screen reader compatibility screen */
  ProfileScreenReader: ScreenStateParam;
  ProfileReminders: ScreenStateParam;
  ProfileAccount: ScreenStateParam;
  ProfileChangePassword: ScreenStateParam;
  ProfileSubscription: ScreenStateParam;
  ProfilePlanComparison: ScreenStateParam;
  ProfileCheckout: ScreenStateParam;
  ProfileAddons: ScreenStateParam;
  ProfileSeatManagement: ScreenStateParam;
  ProfilePaymentHistory: ScreenStateParam;
  ProfileRestorePurchases: ScreenStateParam;
  ProfileStudentDiscount: ScreenStateParam;
  /** FR-E3-05: Plan management (change/cancel) */
  ProfilePlanManagement: ScreenStateParam;
  ProfileLogoutConfirm: ScreenStateParam;
};

const sheetOptions: NativeStackNavigationOptions = { presentation: "modal" };

type ProfileStackScreen = {
  name: keyof ProfileStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const profileStackScreens: ProfileStackScreen[] = [
  { name: "ProfileOverview", component: ProfileOverviewScreen },
  { name: "ProfileSettings", component: ProfileSettingsScreen },
  { name: "ProfileLanguage", component: ProfileLanguageScreen },
  { name: "ProfileAccessibility", component: ProfileAccessibilityScreen },
  { name: "ProfileTextScale", component: ProfileTextScaleScreen },
  { name: "ProfileTheme", component: ProfileThemeScreen },
  { name: "ProfileScreenReader", component: ProfileScreenReaderScreen },
  { name: "ProfileReminders", component: ProfileRemindersScreen },
  { name: "ProfileAccount", component: ProfileAccountScreen },
  { name: "ProfileChangePassword", component: ProfileChangePasswordScreen },
  { name: "ProfileSubscription", component: ProfileSubscriptionScreen },
  { name: "ProfilePlanComparison", component: ProfilePlanComparisonScreen },
  { name: "ProfileCheckout", component: ProfileCheckoutScreen },
  { name: "ProfileAddons", component: ProfileAddonsScreen },
  { name: "ProfileSeatManagement", component: ProfileSeatManagementScreen },
  { name: "ProfilePaymentHistory", component: ProfilePaymentHistoryScreen },
  { name: "ProfileRestorePurchases", component: ProfileRestorePurchasesScreen },
  { name: "ProfileStudentDiscount", component: ProfileStudentDiscountScreen },
  { name: "ProfilePlanManagement", component: ProfilePlanManagementScreen },
  { name: "ProfileLogoutConfirm", component: ProfileLogoutConfirmScreen, options: sheetOptions },
];

type ProfileStackProps = {
  initialRouteName?: keyof ProfileStackParamList;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStack = ({ initialRouteName = "ProfileOverview" }: ProfileStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {profileStackScreens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  );
};
