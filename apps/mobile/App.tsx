import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";

import { PText } from "./components";
import { OfflineBanner } from "./components/OfflineBanner";
import { QueryProvider } from "./data/QueryProvider";
import { AuthStack } from "./navigation/AuthStack";
import { CoachStack } from "./navigation/CoachStack";
import { OnboardingStack } from "./navigation/OnboardingStack";
import { ContentStack } from "./navigation/ContentStack";
import { DiscoverStack } from "./navigation/DiscoverStack";
import { HomeStack } from "./navigation/HomeStack";
import { LibraryStack } from "./navigation/LibraryStack";
import { NotificationStack } from "./navigation/NotificationStack";
import { ProfileStack } from "./navigation/ProfileStack";
import { ProgressStack } from "./navigation/ProgressStack";
import { navigationAnalytics, navigationRef } from "./navigation/analytics";
import { appStore } from "./state/store";

type RootTabParamList = {
  Home: undefined;
  Discover: undefined;
  Library: undefined;
  Progress: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  Auth: undefined;
  Content: undefined;
  /** FR-E12-01..04: Coach dashboard stack (coach_role gate) */
  Coach: undefined;
  /** FR-E17-01..04: Notification and reminder stack */
  Notifications: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00B4D8",
    secondary: "#2B1B5D",
    tertiary: "#10B981",
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceVariant: "#FAFAFA",
    outline: "#D4D4D4",
    outlineVariant: "#E5E5E5",
    onSurfaceVariant: "#525252",
  },
};

const tabIcons: Record<keyof RootTabParamList, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Home: "home-variant",
  Discover: "magnify",
  Library: "book-open-page-variant",
  Progress: "chart-line",
  Profile: "account-circle",
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      tabBarStyle: {
        borderTopColor: theme.colors.outlineVariant,
        backgroundColor: theme.colors.surface,
        paddingBottom: 20,
        paddingTop: 10,
        height: 84,
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: "600",
      },
      tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name={tabIcons[route.name]} size={22} color={color} />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: "Ana Sayfa" }} />
    <Tab.Screen name="Discover" component={DiscoverStack} options={{ tabBarLabel: "Keşfet" }} />
    <Tab.Screen name="Library" component={LibraryStack} options={{ tabBarLabel: "Kütüphane" }} />
    <Tab.Screen name="Progress" component={ProgressStack} options={{ tabBarLabel: "Gelişim" }} />
    <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: "Profil" }} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <StoreProvider store={appStore}>
      <QueryProvider>
        <PaperProvider theme={theme}>
          <OfflineBanner />
          <NavigationContainer
            ref={navigationRef}
            onReady={navigationAnalytics.onReady}
            onStateChange={navigationAnalytics.onStateChange}
          >
            <RootStack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Onboarding"
            >
              <RootStack.Screen name="Onboarding" component={OnboardingStack} />
              <RootStack.Screen name="MainTabs" component={MainTabs} />
              <RootStack.Screen name="Auth" component={AuthStack} />
              <RootStack.Screen name="Content" component={ContentStack} />
              <RootStack.Screen name="Coach" component={CoachStack} />
              <RootStack.Screen name="Notifications" component={NotificationStack} />
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </QueryProvider>
    </StoreProvider>
  );
}
