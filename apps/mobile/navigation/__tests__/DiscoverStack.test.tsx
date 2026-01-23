import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import { DiscoverStack, DiscoverStackParamList } from "../DiscoverStack";

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
}));

const cases: Array<{ name: keyof DiscoverStackParamList; text: string }> = [
  {
    name: "DiscoverCatalog",
    text: "Yeni içerikleri keşfet",
  },
  {
    name: "DiscoverAssistantIntro",
    text: "Sana uygun öneriler",
  },
  {
    name: "DiscoverAssistantQuestions",
    text: "Soruları yanıtla",
  },
  {
    name: "DiscoverAssistantResults",
    text: "Sana uygun içerikler",
  },
  {
    name: "DiscoverJourneys",
    text: "Kendine uygun yolculuklar",
  },
  {
    name: "DiscoverWorkshops",
    text: "Canlı ve kayıtlı atölyeler",
  },
  {
    name: "DiscoverModules",
    text: "Kısa modüllerle ilerle",
  },
  {
    name: "DiscoverEbooks",
    text: "Rahatça okuyabileceğin seçkiler",
  },
];

describe("Discover stack routes", () => {
  cases.forEach(({ name, text }) => {
    it(`renders ${name} route`, () => {
      const { getByText } = render(
        <NavigationContainer>
          <DiscoverStack initialRouteName={name} />
        </NavigationContainer>
      );

      expect(getByText(text)).toBeTruthy();
    });
  });
});
