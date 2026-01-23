import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { HomeStack } from "./navigation/HomeStack";
import { DiscoverStack } from "./navigation/DiscoverStack";
import { LibraryOverviewScreen } from "./screens/LibraryOverviewScreen";
import { ProgressDashboardScreen } from "./screens/ProgressDashboardScreen";
import { ProfileOverviewScreen } from "./screens/ProfileOverviewScreen";

type RootTabParamList = {
  Home: undefined;
  Discover: undefined;
  Library: undefined;
  Progress: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

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

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
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
          <Tab.Screen
            name="Discover"
            component={DiscoverStack}
            options={{ tabBarLabel: "Keşfet" }}
          />
          <Tab.Screen
            name="Library"
            component={LibraryOverviewScreen}
            options={{ tabBarLabel: "Kütüphane" }}
          />
          <Tab.Screen
            name="Progress"
            component={ProgressDashboardScreen}
            options={{ tabBarLabel: "Gelişim" }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileOverviewScreen}
            options={{ tabBarLabel: "Profil" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
