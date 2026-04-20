import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenState } from '../components/ScreenState';
import { HomeActiveContentListScreen } from '../screens/home/HomeActiveContentListScreen';
import { HomeContentNavScreen } from '../screens/home/HomeContentNavScreen';
import { HomeContentSourceDetailScreen } from '../screens/home/HomeContentSourceDetailScreen';
import { HomeDashboardScreen } from '../screens/home/HomeDashboardScreen';
import { HomeReminderSettingScreen } from '../screens/home/HomeReminderSettingScreen';
import { HomeSearchResultsScreen } from '../screens/home/HomeSearchResultsScreen';
import { HomeSearchScreen } from '../screens/home/HomeSearchScreen';
import { HomeSubscriptionScreen } from '../screens/home/HomeSubscriptionScreen';
import { HomeVicdandanKaraktereDetailScreen } from '../screens/home/HomeVicdandanKaraktereDetailScreen';

type ScreenStateParam = { state?: ScreenState } | undefined;

export type HomeStackParamList = {
  HomeDashboard: ScreenStateParam;
  HomeSearch: ScreenStateParam;
  /** query: search term; activeFilter: optional content-type filter */
  HomeSearchResults: (ScreenStateParam & { query?: string; activeFilter?: string }) | undefined;
  HomeVicdandanKaraktereDetail: ScreenStateParam;
  HomeActiveContentList: ScreenStateParam;
  /** FR-E2-02: subscription status badges + paywall explanation */
  HomeSubscription: ScreenStateParam;
  /** FR-E2-03: content area navigation grid */
  HomeContentNav: ScreenStateParam;
  /** FR-E2-08: daily reminder configuration */
  HomeReminderSetting: ScreenStateParam;
  /** Content source detail — sourceId identifies one of the 4 content sources */
  HomeContentSourceDetail: { sourceId: string };
};

type HomeStackProps = {
  initialRouteName?: keyof HomeStackParamList;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = ({ initialRouteName = 'HomeDashboard' }: HomeStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="HomeDashboard" component={HomeDashboardScreen} />
      <Stack.Screen name="HomeSearch" component={HomeSearchScreen} />
      <Stack.Screen name="HomeSearchResults" component={HomeSearchResultsScreen} />
      <Stack.Screen name="HomeVicdandanKaraktereDetail" component={HomeVicdandanKaraktereDetailScreen} />
      <Stack.Screen name="HomeActiveContentList" component={HomeActiveContentListScreen} />
      <Stack.Screen name="HomeSubscription" component={HomeSubscriptionScreen} />
      <Stack.Screen name="HomeContentNav" component={HomeContentNavScreen} />
      <Stack.Screen name="HomeReminderSetting" component={HomeReminderSettingScreen} />
      <Stack.Screen name="HomeContentSourceDetail" component={HomeContentSourceDetailScreen} />
    </Stack.Navigator>
  );
};
