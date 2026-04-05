import { render } from '@testing-library/react-native';
import React from 'react';

import { ContentAchievementScreen } from '../content/ContentAchievementScreen';
import { ContentCommentPreviewScreen } from '../content/ContentCommentPreviewScreen';
import { ContentCommentScreen } from '../content/ContentCommentScreen';
import { ContentEbookDetailScreen } from '../content/ContentEbookDetailScreen';
import { ContentEbookHighlightsScreen } from '../content/ContentEbookHighlightsScreen';
import { ContentEbookReaderScreen } from '../content/ContentEbookReaderScreen';
import { ContentEbookTocScreen } from '../content/ContentEbookTocScreen';
import { ContentExerciseScreen } from '../content/ContentExerciseScreen';
import { ContentJourneyDayScreen } from '../content/ContentJourneyDayScreen';
import { ContentJourneyDetailScreen } from '../content/ContentJourneyDetailScreen';
import { ContentJourneyHomeScreen } from '../content/ContentJourneyHomeScreen';
import { ContentModuleHomeScreen } from '../content/ContentModuleHomeScreen';
import { ContentPackageDetailScreen } from '../content/ContentPackageDetailScreen';
import { ContentPaywallScreen } from '../content/ContentPaywallScreen';
import { ContentReadingScreen } from '../content/ContentReadingScreen';
import { ContentReviewPromptScreen } from '../content/ContentReviewPromptScreen';
import { ContentWorkshopDetailScreen } from '../content/ContentWorkshopDetailScreen';
import { ContentWorkshopHomeScreen } from '../content/ContentWorkshopHomeScreen';
import { ContentWorkshopSectionScreen } from '../content/ContentWorkshopSectionScreen';

const cases = [
  {
    name: 'content.journey_home',
    Screen: ContentJourneyHomeScreen,
    expectations: {
      loading: 'Yolculuk yükleniyor',
      ready: 'Yolculuk akışı',
      empty: 'Yolculuk bulunamadı',
      error: 'Yolculuk yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.journey_day',
    Screen: ContentJourneyDayScreen,
    expectations: {
      loading: 'Gün İçeriği yükleniyor',
      ready: 'Gün planı',
      empty: 'Gün içeriği yok',
      error: 'Gün içeriği yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.journey_detail',
    Screen: ContentJourneyDetailScreen,
    expectations: {
      loading: 'Yolculuk yükleniyor',
      ready: 'Yolculuğa genel bakış',
      empty: 'Yolculuk bulunamadı',
      error: 'Yolculuk yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.workshop_home',
    Screen: ContentWorkshopHomeScreen,
    expectations: {
      loading: 'Atölye yükleniyor',
      ready: 'Atölye akışı',
      empty: 'Atölye bulunamadı',
      error: 'Atölye yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.workshop_section',
    Screen: ContentWorkshopSectionScreen,
    expectations: {
      loading: 'Bölüm hazırlanıyor',
      ready: 'Bölüm akışı',
      empty: 'Bölüm bulunamadı',
      error: 'Bölüm yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.workshop_detail',
    Screen: ContentWorkshopDetailScreen,
    expectations: {
      loading: 'Atölye yükleniyor',
      ready: 'Atölye programı ve içerikler',
      empty: 'Atölye bulunamadı',
      error: 'Atölye yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.module_home',
    Screen: ContentModuleHomeScreen,
    expectations: {
      loading: 'Modül yükleniyor',
      ready: 'Modül akışı',
      empty: 'Modül bulunamadı',
      error: 'Modül yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.package_detail',
    Screen: ContentPackageDetailScreen,
    expectations: {
      loading: 'Paket yükleniyor',
      ready: 'Paket içeriği ve plan',
      empty: 'Paket bulunamadı',
      error: 'Paket yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.ebook_detail',
    Screen: ContentEbookDetailScreen,
    expectations: {
      loading: 'e-Kitap yükleniyor',
      ready: 'e-Kitap hakkında',
      empty: 'e-Kitap bulunamadı',
      error: 'e-Kitap yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.ebook_reader',
    Screen: ContentEbookReaderScreen,
    expectations: {
      loading: 'Okuyucu hazırlanıyor',
      ready: 'Okumaya devam et',
      empty: 'Bölüm bulunamadı',
      error: 'Okuyucu yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.ebook_toc',
    Screen: ContentEbookTocScreen,
    expectations: {
      loading: 'İçindekiler hazırlanıyor',
      ready: 'İçindekiler listesi',
      empty: 'Bölüm bulunamadı',
      error: 'İçindekiler yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.ebook_highlights',
    Screen: ContentEbookHighlightsScreen,
    expectations: {
      loading: 'Vurgular yükleniyor',
      ready: 'Kaydettiğin vurgular',
      empty: 'Vurgu bulunamadı',
      error: 'Vurgular yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.reading',
    Screen: ContentReadingScreen,
    expectations: {
      loading: 'Okuma hazırlanıyor',
      ready: 'Okumaya devam et',
      empty: 'Bölüm bulunamadı',
      error: 'Okuma yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.exercise',
    Screen: ContentExerciseScreen,
    expectations: {
      loading: 'Uygulama hazırlanıyor',
      ready: 'Adımları tamamla',
      empty: 'Uygulama bulunamadı',
      error: 'Uygulama yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.comment',
    Screen: ContentCommentScreen,
    expectations: {
      loading: 'Yorum hazırlanıyor',
      ready: 'Yorumunu paylaş',
      empty: 'Yorum şablonu yok',
      error: 'Yorum alanı yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.comment_preview',
    Screen: ContentCommentPreviewScreen,
    expectations: {
      loading: 'Önizleme hazırlanıyor',
      ready: 'Gönderim öncesi kontrol',
      empty: 'Önizleme bulunamadı',
      error: 'Önizleme yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.achievement',
    Screen: ContentAchievementScreen,
    expectations: {
      loading: 'Başarım hazırlanıyor',
      ready: 'Başarımın',
      empty: 'Başarım bulunamadı',
      error: 'Başarım yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.review_prompt',
    Screen: ContentReviewPromptScreen,
    expectations: {
      loading: 'Değerlendirme hazırlanıyor',
      ready: 'Deneyimini değerlendir',
      empty: 'Değerlendirme bulunamadı',
      error: 'Değerlendirme yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'content.paywall',
    Screen: ContentPaywallScreen,
    expectations: {
      loading: 'Abonelik seçenekleri hazırlanıyor',
      ready: 'Abonelik planını seç',
      empty: 'Plan bulunamadı',
      error: 'Planlar yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  }
];

describe('Content screens render contract states', () => {
  cases.forEach(({ name, Screen, expectations }) => {
    (Object.keys(expectations) as (keyof typeof expectations)[]).forEach(state => {
      it(`${name} renders ${state} state`, () => {
        const { getByText } = render(<Screen route={{ params: { state } }} />);
        expect(getByText(expectations[state])).toBeTruthy();
      });
    });
  });
});
