import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { OfflineBanner } from "./components/OfflineBanner";
import { QueryProvider } from "./data/QueryProvider";
import { HomeStack } from "./navigation/HomeStack";
import { DiscoverStack } from "./navigation/DiscoverStack";
import { LibraryStack } from "./navigation/LibraryStack";
import { ProgressStack } from "./navigation/ProgressStack";
import { ProfileStack } from "./navigation/ProfileStack";
import { AuthStack } from "./navigation/AuthStack";
import { ContentStack } from "./navigation/ContentStack";
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
  MainTabs: undefined;
  Auth: undefined;
  Content: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0E6B5B",
    secondary: "#5D5F7C",
    tertiary: "#D17D2F",
    background: "#F6F4F0",
    surface: "#FFFFFF",
  },
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      tabBarStyle: {
        borderTopColor: theme.colors.outlineVariant,
        backgroundColor: theme.colors.surface,
        paddingBottom: 6,
        paddingTop: 6,
        height: 60,
      },
    }}
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
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="MainTabs" component={MainTabs} />
              <RootStack.Screen name="Auth" component={AuthStack} />
              <RootStack.Screen name="Content" component={ContentStack} />
            </RootStack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </QueryProvider>
    </StoreProvider>
  );
}
