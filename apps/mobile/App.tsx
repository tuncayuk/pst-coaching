import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { HomeStack } from "./navigation/HomeStack";
import { DiscoverStack } from "./navigation/DiscoverStack";
import { LibraryStack } from "./navigation/LibraryStack";
import { ProgressStack } from "./navigation/ProgressStack";
import { ProfileStack } from "./navigation/ProfileStack";

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
          <Tab.Screen name="Library" component={LibraryStack} options={{ tabBarLabel: "Kütüphane" }} />
          <Tab.Screen
            name="Progress"
            component={ProgressStack}
            options={{ tabBarLabel: "Gelişim" }}
          />
          <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: "Profil" }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
