import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';

import { HomeStack, HomeStackParamList } from '../HomeStack';

vi.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children
}));

const cases: { name: keyof HomeStackParamList; text: string }[] = [
  {
    name: 'HomeDashboard',
    text: 'Bugün için öneriler'
  },
  {
    name: 'HomeSearch',
    text: 'İçeriklerde ara'
  },
  {
    name: 'HomeSearchResults',
    text: 'Araman için öneriler'
  },
  {
    name: 'HomeVicdandanKaraktereDetail',
    text: 'Değer odaklı bir yolculuk'
  },
  {
    name: 'HomeActiveContentList',
    text: 'Devam ettiğin içerikler'
  }
];

describe('Home stack routes', () => {
  cases.forEach(({ name, text }) => {
    it(`renders ${name} route`, () => {
      const { getByText } = render(
        <NavigationContainer>
          <HomeStack initialRouteName={name} />
        </NavigationContainer>
      );

      expect(getByText(text)).toBeTruthy();
    });
  });
});
