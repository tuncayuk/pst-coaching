import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";

import { AuthStack, AuthStackParamList } from "../AuthStack";
import { OnboardingStack, OnboardingStackParamList } from "../OnboardingStack";

vi.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

const onboardingCases: { name: keyof OnboardingStackParamList; text: string }[] = [
  {
    name: "OnboardingLanguageSelect",
    text: "Dilini seç",
  },
  {
    name: "OnboardingWelcome",
    text: "Yeni bir yolculuğa hoş geldin",
  },
];

describe("Onboarding stack routes", () => {
  onboardingCases.forEach(({ name, text }) => {
    it(`renders ${name} route`, () => {
      const { getByText } = render(
        <NavigationContainer>
          <OnboardingStack initialRouteName={name} />
        </NavigationContainer>
      );

      expect(getByText(text)).toBeTruthy();
    });
  });
});

const cases: { name: keyof AuthStackParamList; text: string }[] = [
  {
    name: "AuthLogin",
    text: "Hesabına giriş yap",
  },
  {
    name: "AuthRegister",
    text: "Yeni hesap oluştur",
  },
  {
    name: "AuthOtpVerify",
    text: "Doğrulama kodunu gir",
  },
  {
    name: "AuthPasswordReset",
    text: "Şifre sıfırlama bağlantısı gönder",
  },
  {
    name: "AuthSessionTimeout",
    text: "Oturum süren doldu",
  },
  {
    name: "AuthLockout",
    text: "Geçici Kilit",
  },
  {
    name: "AuthReauth",
    text: "Yeniden Doğrulama",
  },
];

describe("Auth stack routes", () => {
  cases.forEach(({ name, text }) => {
    it(`renders ${name} route`, () => {
      const { getByText } = render(
        <NavigationContainer>
          <AuthStack initialRouteName={name} />
        </NavigationContainer>
      );

      expect(getByText(text)).toBeTruthy();
    });
  });
});
