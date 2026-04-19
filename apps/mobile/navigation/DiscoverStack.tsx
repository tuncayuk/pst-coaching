import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenState } from '../screens/components/ScreenState';
// FR-E16: AI free-text assistant (new)
import { DiscoverAIAssistantIntroScreen } from '../screens/discover/DiscoverAIAssistantIntroScreen';
import { DiscoverAIAssistantQuestionsScreen } from '../screens/discover/DiscoverAIAssistantQuestionsScreen';
import { DiscoverAIAssistantResultsScreen } from '../screens/discover/DiscoverAIAssistantResultsScreen';
import { DiscoverAssistantInsightsScreen } from '../screens/discover/DiscoverAssistantInsightsScreen';
// FR-E4: quiz-based content assistant (preserved)
import { DiscoverAssistantIntroScreen } from '../screens/discover/DiscoverAssistantIntroScreen';
import { DiscoverAssistantQuestionsScreen } from '../screens/discover/DiscoverAssistantQuestionsScreen';
import { DiscoverAssistantResultsScreen } from '../screens/discover/DiscoverAssistantResultsScreen';
import { DiscoverCatalogScreen } from '../screens/discover/DiscoverCatalogScreen';
// Content browsing
import { DiscoverEbooksScreen } from '../screens/discover/DiscoverEbooksScreen';
import { DiscoverJourneysScreen } from '../screens/discover/DiscoverJourneysScreen';
import { DiscoverModulesScreen } from '../screens/discover/DiscoverModulesScreen';
import { DiscoverWorkshopsScreen } from '../screens/discover/DiscoverWorkshopsScreen';

type ScreenStateParam = { state?: ScreenState } | undefined;
type AIQuestionsParam = { state?: ScreenState; question?: string } | undefined;
type AIResultsParam = { state?: ScreenState; question?: string } | undefined;
type AIInsightsParam = { state?: ScreenState; question?: string } | undefined;

export type DiscoverStackParamList = {
  // Catalog
  DiscoverCatalog: ScreenStateParam;
  // FR-E4: quiz-based assistant
  DiscoverAssistantIntro: ScreenStateParam;
  DiscoverAssistantQuestions: ScreenStateParam;
  DiscoverAssistantResults: ScreenStateParam;
  // FR-E16: AI free-text assistant
  DiscoverAIAssistantIntro: ScreenStateParam;
  DiscoverAIAssistantQuestions: AIQuestionsParam;
  DiscoverAIAssistantResults: AIResultsParam;
  DiscoverAssistantInsights: AIInsightsParam;
  // Content browsing
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
      {/* Catalog */}
      <Stack.Screen name="DiscoverCatalog" component={DiscoverCatalogScreen} />

      {/* FR-E4: quiz-based content assistant */}
      <Stack.Screen name="DiscoverAssistantIntro" component={DiscoverAssistantIntroScreen} />
      <Stack.Screen name="DiscoverAssistantQuestions" component={DiscoverAssistantQuestionsScreen} />
      <Stack.Screen name="DiscoverAssistantResults" component={DiscoverAssistantResultsScreen} />

      {/* FR-E16: AI free-text assistant */}
      <Stack.Screen name="DiscoverAIAssistantIntro" component={DiscoverAIAssistantIntroScreen} />
      <Stack.Screen name="DiscoverAIAssistantQuestions" component={DiscoverAIAssistantQuestionsScreen} />
      <Stack.Screen name="DiscoverAIAssistantResults" component={DiscoverAIAssistantResultsScreen} />
      <Stack.Screen name="DiscoverAssistantInsights" component={DiscoverAssistantInsightsScreen} />

      {/* Content browsing */}
      <Stack.Screen name="DiscoverJourneys" component={DiscoverJourneysScreen} />
      <Stack.Screen name="DiscoverWorkshops" component={DiscoverWorkshopsScreen} />
      <Stack.Screen name="DiscoverModules" component={DiscoverModulesScreen} />
      <Stack.Screen name="DiscoverEbooks" component={DiscoverEbooksScreen} />
    </Stack.Navigator>
  );
};
