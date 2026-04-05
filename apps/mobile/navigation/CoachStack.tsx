import React from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { ScreenState } from "../screens/components/ScreenState";
import { CoachDashboardScreen } from "../screens/coach/CoachDashboardScreen";
import { CoachClientProfileScreen } from "../screens/coach/CoachClientProfileScreen";
import { CoachContentTrackingScreen } from "../screens/coach/CoachContentTrackingScreen";
import { CoachFeedbackScreen } from "../screens/coach/CoachFeedbackScreen";

type ScreenStateParam = { state?: ScreenState } | undefined;

export type CoachStackParamList = {
  /** FR-E12-01: Client list with risk indicators */
  CoachDashboard: ScreenStateParam;
  /** FR-E12-02: Client profile and metrics */
  CoachClientProfile: { clientId: string; state?: ScreenState };
  /** FR-E12-03: Content tracking for a client */
  CoachContentTracking: { clientId: string; state?: ScreenState };
  /** FR-E12-04: Coach feedback flow */
  CoachFeedback: { clientId: string; state?: ScreenState };
};

const sheetOptions: NativeStackNavigationOptions = { presentation: "modal" };

type CoachStackScreen = {
  name: keyof CoachStackParamList;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};

export const coachStackScreens: CoachStackScreen[] = [
  { name: "CoachDashboard", component: CoachDashboardScreen },
  { name: "CoachClientProfile", component: CoachClientProfileScreen },
  { name: "CoachContentTracking", component: CoachContentTrackingScreen },
  { name: "CoachFeedback", component: CoachFeedbackScreen, options: sheetOptions },
];

type CoachStackProps = {
  initialRouteName?: keyof CoachStackParamList;
};

const Stack = createNativeStackNavigator<CoachStackParamList>();

export const CoachStack = ({ initialRouteName = "CoachDashboard" }: CoachStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      {coachStackScreens.map((screen) => (
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
