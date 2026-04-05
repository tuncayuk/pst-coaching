import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { DiscoverCatalogScreen } from '../screens/DiscoverCatalogScreen';
import { ScreenState } from '../screens/components/ScreenState';
import { DiscoverAssistantIntroScreen } from '../screens/discover/DiscoverAssistantIntroScreen';
import { DiscoverAssistantQuestionsScreen } from '../screens/discover/DiscoverAssistantQuestionsScreen';
import { DiscoverAssistantResultsScreen } from '../screens/discover/DiscoverAssistantResultsScreen';
import { DiscoverEbooksScreen } from '../screens/discover/DiscoverEbooksScreen';
import { DiscoverJourneysScreen } from '../screens/discover/DiscoverJourneysScreen';
import { DiscoverModulesScreen } from '../screens/discover/DiscoverModulesScreen';
import { DiscoverWorkshopsScreen } from '../screens/discover/DiscoverWorkshopsScreen';

type ScreenStateParam = { state?: ScreenState } | undefined;

export type DiscoverStackParamList = {
  DiscoverCatalog: ScreenStateParam;
  DiscoverAssistantIntro: ScreenStateParam;
  DiscoverAssistantQuestions: ScreenStateParam;
  DiscoverAssistantResults: ScreenStateParam;
  DiscoverJourneys: ScreenStateParam;
  DiscoverWorkshops: ScreenStateParam;
  DiscoverModules: ScreenStateParam;
  DiscoverEbooks: ScreenStateParam;
};

type DiscoverStackProps = {
  initialRouteName?: keyof DiscoverStackParamList;
};

const Stack = createNativeStackNavigator<DiscoverStackParamList>();

export const DiscoverStack = ({ initialRouteName = 'DiscoverCatalog' }: DiscoverStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="DiscoverCatalog" component={DiscoverCatalogScreen} />
      <Stack.Screen name="DiscoverAssistantIntro" component={DiscoverAssistantIntroScreen} />
      <Stack.Screen name="DiscoverAssistantQuestions" component={DiscoverAssistantQuestionsScreen} />
      <Stack.Screen name="DiscoverAssistantResults" component={DiscoverAssistantResultsScreen} />
      <Stack.Screen name="DiscoverJourneys" component={DiscoverJourneysScreen} />
      <Stack.Screen name="DiscoverWorkshops" component={DiscoverWorkshopsScreen} />
      <Stack.Screen name="DiscoverModules" component={DiscoverModulesScreen} />
      <Stack.Screen name="DiscoverEbooks" component={DiscoverEbooksScreen} />
    </Stack.Navigator>
  );
};
