import React from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ScreenState } from "../screens/components/ScreenState";
import { ProgressDashboardScreen } from "../screens/progress/ProgressDashboardScreen";
import { ProgressEmotionalMapScreen } from "../screens/progress/ProgressEmotionalMapScreen";
import { ProgressWeeklySummaryScreen } from "../screens/progress/ProgressWeeklySummaryScreen";
import { ProgressStrengthsScreen } from "../screens/progress/ProgressStrengthsScreen";
import { ProgressReportExportScreen } from "../screens/progress/ProgressReportExportScreen";
import { ContentPaywallScreen } from "../screens/content/ContentPaywallScreen";
import { withSubscriptionGate } from "./guards";

type ScreenStateParam = { state?: ScreenState; entitlement?: "trial" | "active" | "none" | "expired" } | undefined;

export type ProgressStackParamList = {
  ProgressDashboard: ScreenStateParam;
  ProgressEmotionalMap: ScreenStateParam;
  ProgressWeeklySummary: ScreenStateParam;
  ProgressStrengths: ScreenStateParam;
  ProgressReportExport: ScreenStateParam;
  ContentPaywall: ScreenStateParam;
};

const modalOptions: NativeStackNavigationOptions = { presentation: "modal" };

type ProgressStackScreen = {
  name: keyof ProgressStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const progressStackScreens: ProgressStackScreen[] = [
  { name: "ProgressDashboard", component: withSubscriptionGate(ProgressDashboardScreen) },
  { name: "ProgressEmotionalMap", component: withSubscriptionGate(ProgressEmotionalMapScreen) },
  { name: "ProgressWeeklySummary", component: withSubscriptionGate(ProgressWeeklySummaryScreen) },
  { name: "ProgressStrengths", component: withSubscriptionGate(ProgressStrengthsScreen) },
  {
    name: "ProgressReportExport",
    component: withSubscriptionGate(ProgressReportExportScreen),
    options: modalOptions,
  },
  { name: "ContentPaywall", component: ContentPaywallScreen, options: modalOptions },
];

type ProgressStackProps = {
  initialRouteName?: keyof ProgressStackParamList;
};

const Stack = createNativeStackNavigator<ProgressStackParamList>();

export const ProgressStack = ({ initialRouteName = "ProgressDashboard" }: ProgressStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {progressStackScreens.map((screen) => (
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
