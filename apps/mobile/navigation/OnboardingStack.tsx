import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenState } from '../components/ScreenState';
import { AuthSplashScreen } from '../screens/auth/AuthSplashScreen';
import { OnboardingCarouselScreen } from '../screens/onboarding/OnboardingCarouselScreen';
import { OnboardingLanguageSelectScreen } from '../screens/onboarding/OnboardingLanguageSelectScreen';
import { OnboardingWelcomeScreen } from '../screens/onboarding/OnboardingWelcomeScreen';

type ScreenStateParam = { state?: ScreenState } | undefined;

export type OnboardingStackParamList = {
  AuthSplash: ScreenStateParam;
  OnboardingCarousel: ScreenStateParam;
  OnboardingLanguageSelect: ScreenStateParam;
  OnboardingWelcome: ScreenStateParam;
};

type OnboardingStackProps = {
  initialRouteName?: keyof OnboardingStackParamList;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingStack = ({ initialRouteName = 'AuthSplash' }: OnboardingStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="AuthSplash" component={AuthSplashScreen} />
      <Stack.Screen name="OnboardingCarousel" component={OnboardingCarouselScreen} />
      <Stack.Screen name="OnboardingLanguageSelect" component={OnboardingLanguageSelectScreen} />
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
    </Stack.Navigator>
  );
};
