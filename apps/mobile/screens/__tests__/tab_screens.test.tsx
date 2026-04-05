import { render } from '@testing-library/react-native';
import React from 'react';

import { DiscoverCatalogScreen } from '../DiscoverCatalogScreen';
import { HomeDashboardScreen } from '../HomeDashboardScreen';
import { ProfileOverviewScreen } from '../ProfileOverviewScreen';
import { LibraryOverviewScreen } from '../library/LibraryOverviewScreen';
import { ProgressDashboardScreen } from '../progress/ProgressDashboardScreen';

const cases = [
  {
    name: 'home.dashboard',
    Screen: HomeDashboardScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Bugün için öneriler',
      empty: 'Henüz içerik yok',
      error: 'Ana sayfa yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'discover.catalog',
    Screen: DiscoverCatalogScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Yeni içerikleri keşfet',
      empty: 'Henüz içerik yok',
      error: 'Keşfet yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'library.overview',
    Screen: LibraryOverviewScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Kaydedilen içerikler',
      empty: 'Kütüphanen boş',
      error: 'Kütüphane yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'progress.dashboard',
    Screen: ProgressDashboardScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'İlerlemeni takip et',
      empty: 'Henüz veri yok',
      error: 'Gelişim yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'profile.overview',
    Screen: ProfileOverviewScreen,
    expectations: {
      loading: 'Yükleniyor',
      ready: 'Hesabını yönet',
      empty: 'Profil bilgileri eksik',
      error: 'Profil yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  }
];

describe('Tab screens render contract states', () => {
  cases.forEach(({ name, Screen, expectations }) => {
    (Object.keys(expectations) as Array<keyof typeof expectations>).forEach(state => {
      it(`${name} renders ${state} state`, () => {
        const { getByText } = render(<Screen route={{ params: { state } }} />);
        expect(getByText(expectations[state])).toBeTruthy();
      });
    });
  });
});
