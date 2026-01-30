import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OnboardingLanguageSelectScreen } from "../screens/onboarding/OnboardingLanguageSelectScreen";
import { OnboardingWelcomeScreen } from "../screens/onboarding/OnboardingWelcomeScreen";
import { OnboardingCarouselScreen } from "../screens/onboarding/OnboardingCarouselScreen";
import { AuthSplashScreen } from "../screens/auth/AuthSplashScreen";
import { AuthLoginScreen } from "../screens/auth/AuthLoginScreen";
import { AuthRegisterScreen } from "../screens/auth/AuthRegisterScreen";
import { AuthForgotPasswordScreen } from "../screens/auth/AuthForgotPasswordScreen";
import { AuthOtpVerifyScreen } from "../screens/auth/AuthOtpVerifyScreen";
import { AuthPasswordResetScreen } from "../screens/auth/AuthPasswordResetScreen";
import { AuthFaceIdSetupScreen } from "../screens/auth/AuthFaceIdSetupScreen";
import { AuthDemographicsScreen } from "../screens/auth/AuthDemographicsScreen";
import { AuthGuestModeScreen } from "../screens/auth/AuthGuestModeScreen";
import { AuthSessionTimeoutScreen } from "../screens/auth/AuthSessionTimeoutScreen";
import { AuthLockoutScreen } from "../screens/auth/AuthLockoutScreen";
import { AuthReauthScreen } from "../screens/auth/AuthReauthScreen";
import { ScreenState } from "../screens/components/ScreenState";

type ScreenStateParam = { state?: ScreenState } | undefined;

export type AuthStackParamList = {
  AuthSplash: ScreenStateParam;
  OnboardingCarousel: ScreenStateParam;
  OnboardingLanguageSelect: ScreenStateParam;
  OnboardingWelcome: ScreenStateParam;
  AuthLogin: ScreenStateParam;
  AuthRegister: ScreenStateParam;
  AuthForgotPassword: ScreenStateParam;
  AuthOtpVerify: ScreenStateParam | { state?: ScreenState; source?: "register" | "forgot-password" };
  AuthPasswordReset: ScreenStateParam;
  AuthFaceIdSetup: ScreenStateParam;
  AuthDemographics: ScreenStateParam;
  AuthGuestMode: ScreenStateParam;
  AuthSessionTimeout: ScreenStateParam;
  AuthLockout: ScreenStateParam;
  AuthReauth: ScreenStateParam;
};

type AuthStackProps = {
  initialRouteName?: keyof AuthStackParamList;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStack = ({ initialRouteName = "AuthSplash" }: AuthStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
      <Stack.Screen name="AuthSplash" component={AuthSplashScreen} />
      <Stack.Screen name="OnboardingCarousel" component={OnboardingCarouselScreen} />
      <Stack.Screen name="OnboardingLanguageSelect" component={OnboardingLanguageSelectScreen} />
      <Stack.Screen name="OnboardingWelcome" component={OnboardingWelcomeScreen} />
      <Stack.Screen name="AuthLogin" component={AuthLoginScreen} />
      <Stack.Screen name="AuthRegister" component={AuthRegisterScreen} />
      <Stack.Screen name="AuthForgotPassword" component={AuthForgotPasswordScreen} />
      <Stack.Screen name="AuthOtpVerify" component={AuthOtpVerifyScreen} />
      <Stack.Screen name="AuthPasswordReset" component={AuthPasswordResetScreen} />
      <Stack.Screen name="AuthFaceIdSetup" component={AuthFaceIdSetupScreen} />
      <Stack.Screen name="AuthDemographics" component={AuthDemographicsScreen} />
      <Stack.Screen name="AuthGuestMode" component={AuthGuestModeScreen} />
      <Stack.Screen
        name="AuthSessionTimeout"
        component={AuthSessionTimeoutScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="AuthLockout"
        component={AuthLockoutScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="AuthReauth"
        component={AuthReauthScreen}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
};
