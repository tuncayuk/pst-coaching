import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
            <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Auth">
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
