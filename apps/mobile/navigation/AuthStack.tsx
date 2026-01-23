import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingLanguageSelectScreen } from "../screens/onboarding/OnboardingLanguageSelectScreen";
import { OnboardingWelcomeScreen } from "../screens/onboarding/OnboardingWelcomeScreen";
import { AuthLoginScreen } from "../screens/auth/AuthLoginScreen";
import { AuthRegisterScreen } from "../screens/auth/AuthRegisterScreen";
import { AuthOtpVerifyScreen } from "../screens/auth/AuthOtpVerifyScreen";
import { AuthPasswordResetScreen } from "../screens/auth/AuthPasswordResetScreen";
import { AuthSessionTimeoutScreen } from "../screens/auth/AuthSessionTimeoutScreen";
import { ScreenState } from "../screens/components/ScreenState";

type ScreenStateParam = { state?: ScreenState } | undefined;

export type AuthStackParamList = {
  OnboardingLanguageSelect: ScreenStateParam;
  OnboardingWelcome: ScreenStateParam;
  AuthLogin: ScreenStateParam;
  AuthRegister: ScreenStateParam;
  AuthOtpVerify: ScreenStateParam;
  AuthPasswordReset: ScreenStateParam;
  AuthSessionTimeout: ScreenStateParam;
};

type AuthStackProps = {
  initialRouteName?: keyof AuthStackParamList;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = ({ initialRouteName = "OnboardingWelcome" }: AuthStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="OnboardingLanguageSelect" component={OnboardingLanguageSelectScreen} />
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="AuthLogin" component={AuthLoginScreen} />
      <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} />
      <Stack.Screen name="AuthOtpVerify" component={AuthOtpVerifyScreen} />
      <Stack.Screen name="AuthPasswordReset" component={AuthPasswordResetScreen} />
      <Stack.Screen
        name="AuthSessionTimeout"
        component={AuthSessionTimeoutScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
