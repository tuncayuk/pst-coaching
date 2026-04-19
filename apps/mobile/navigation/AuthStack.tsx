import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenState } from '../components/ScreenState';
import { AuthDemographicsScreen } from '../screens/auth/AuthDemographicsScreen';
import { AuthFaceIdSetupScreen } from '../screens/auth/AuthFaceIdSetupScreen';
import { AuthForgotPasswordScreen } from '../screens/auth/AuthForgotPasswordScreen';
import { AuthGuestModeScreen } from '../screens/auth/AuthGuestModeScreen';
import { AuthLockoutScreen } from '../screens/auth/AuthLockoutScreen';
import { AuthLoginScreen } from '../screens/auth/AuthLoginScreen';
import { AuthOtpVerifyScreen } from '../screens/auth/AuthOtpVerifyScreen';
import { AuthPasswordResetScreen } from '../screens/auth/AuthPasswordResetScreen';
import { AuthReauthScreen } from '../screens/auth/AuthReauthScreen';
import { AuthRegisterScreen } from '../screens/auth/AuthRegisterScreen';
import { AuthSessionTimeoutScreen } from '../screens/auth/AuthSessionTimeoutScreen';

type ScreenStateParam = { state?: ScreenState } | undefined;

export type AuthStackParamList = {
  AuthLogin: ScreenStateParam;
  AuthRegister: ScreenStateParam;
  AuthForgotPassword: ScreenStateParam;
  AuthOtpVerify: ScreenStateParam | { state?: ScreenState; source?: 'register' | 'forgot-password' };
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

export const AuthStack = ({ initialRouteName = 'AuthLogin' }: AuthStackProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
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
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen name="AuthLockout" component={AuthLockoutScreen} options={{ presentation: 'modal' }} />
      <Stack.Screen name="AuthReauth" component={AuthReauthScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
};
