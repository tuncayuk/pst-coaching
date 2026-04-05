import { render } from '@testing-library/react-native';
import React from 'react';

import { DiscoverAssistantIntroScreen } from '../discover/DiscoverAssistantIntroScreen';
import { DiscoverAssistantQuestionsScreen } from '../discover/DiscoverAssistantQuestionsScreen';
import { DiscoverAssistantResultsScreen } from '../discover/DiscoverAssistantResultsScreen';
import { DiscoverEbooksScreen } from '../discover/DiscoverEbooksScreen';
import { DiscoverJourneysScreen } from '../discover/DiscoverJourneysScreen';
import { DiscoverModulesScreen } from '../discover/DiscoverModulesScreen';
import { DiscoverWorkshopsScreen } from '../discover/DiscoverWorkshopsScreen';
import { HomeActiveContentListScreen } from '../home/HomeActiveContentListScreen';
import { HomeSearchResultsScreen } from '../home/HomeSearchResultsScreen';
import { HomeSearchScreen } from '../home/HomeSearchScreen';
import { HomeVicdandanKaraktereDetailScreen } from '../home/HomeVicdandanKaraktereDetailScreen';

const cases = [
  {
    name: 'home.search',
    Screen: HomeSearchScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'İçeriklerde ara',
      empty: 'Henüz arama yok',
      error: 'Arama yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'home.search_results',
    Screen: HomeSearchResultsScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Araman için öneriler',
      empty: 'Sonuç bulunamadı',
      error: 'Arama sonuçları yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'home.vicdandan_karaktere_detail',
    Screen: HomeVicdandanKaraktereDetailScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Değer odaklı bir yolculuk',
      empty: 'Program bulunamadı',
      error: 'Program yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'home.active_content_list',
    Screen: HomeActiveContentListScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Devam ettiğin içerikler',
      empty: 'Aktif içerik yok',
      error: 'Aktif içerikler yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.assistant_intro',
    Screen: DiscoverAssistantIntroScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Sana uygun öneriler',
      empty: 'Öneri yok',
      error: 'Asistan yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.assistant_questions',
    Screen: DiscoverAssistantQuestionsScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Soruları yanıtla',
      empty: 'Sorular bulunamadı',
      error: 'Sorular yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.assistant_results',
    Screen: DiscoverAssistantResultsScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Sana uygun içerikler',
      empty: 'Öneri bulunamadı',
      error: 'Öneriler yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.journeys',
    Screen: DiscoverJourneysScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Kendine uygun yolculuklar',
      empty: 'Yolculuk bulunamadı',
      error: 'Yolculuklar yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.workshops',
    Screen: DiscoverWorkshopsScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Canlı ve kayıtlı atölyeler',
      empty: 'Atölye bulunamadı',
      error: 'Atölyeler yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.modules',
    Screen: DiscoverModulesScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Kısa modüllerle ilerle',
      empty: 'Modül bulunamadı',
      error: 'Modüller yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.ebooks',
    Screen: DiscoverEbooksScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Rahatça okuyabileceğin seçkiler',
      empty: 'e-Kitap bulunamadı',
      error: 'e-Kitaplar yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  }
];

describe('Home and Discover screens render contract states', () => {
  cases.forEach(({ name, Screen, expectations }) => {
    (Object.keys(expectations) as Array<keyof typeof expectations>).forEach(state => {
      it(`${name} renders ${state} state`, () => {
        const { getByText } = render(<Screen route={{ params: { state } }} />);
        expect(getByText(expectations[state])).toBeTruthy();
      });
    });
  });
});
