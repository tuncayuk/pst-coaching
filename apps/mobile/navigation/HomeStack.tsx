import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeDashboardScreen } from "../screens/HomeDashboardScreen";
import { HomeSearchScreen } from "../screens/home/HomeSearchScreen";
import { HomeSearchResultsScreen } from "../screens/home/HomeSearchResultsScreen";
import { HomeVicdandanKaraktereDetailScreen } from "../screens/home/HomeVicdandanKaraktereDetailScreen";
import { HomeActiveContentListScreen } from "../screens/home/HomeActiveContentListScreen";
import { ScreenState } from "../screens/components/ScreenState";

type ScreenStateParam = { state?: ScreenState } | undefined;

export type HomeStackParamList = {
  HomeDashboard: ScreenStateParam;
  HomeSearch: ScreenStateParam;
  HomeSearchResults: ScreenStateParam;
  HomeVicdandanKaraktereDetail: ScreenStateParam;
  HomeActiveContentList: ScreenStateParam;
};

type HomeStackProps = {
  initialRouteName?: keyof HomeStackParamList;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = ({ initialRouteName = "HomeDashboard" }: HomeStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="HomeDashboard" component={HomeDashboardScreen} />
      <Stack.Screen name="HomeSearch" component={HomeSearchScreen} />
      <Stack.Screen name="HomeSearchResults" component={HomeSearchResultsScreen} />
      <Stack.Screen
        name="HomeVicdandanKaraktereDetail"
        component={HomeVicdandanKaraktereDetailScreen}
      />
      <Stack.Screen name="HomeActiveContentList" component={HomeActiveContentListScreen} />
    </Stack.Navigator>
  );
};
