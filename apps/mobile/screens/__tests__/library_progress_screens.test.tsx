import React from "react";
import { render } from "@testing-library/react-native";
import { LibraryJourneysScreen } from "../library/LibraryJourneysScreen";
import { LibraryWorkshopsScreen } from "../library/LibraryWorkshopsScreen";
import { LibraryModulesScreen } from "../library/LibraryModulesScreen";
import { LibraryEbooksScreen } from "../library/LibraryEbooksScreen";
import { LibraryFavoritesScreen } from "../library/LibraryFavoritesScreen";
import { LibraryFavoriteDetailScreen } from "../library/LibraryFavoriteDetailScreen";
import { LibraryCollectionsScreen } from "../library/LibraryCollectionsScreen";
import { LibraryCollectionDetailScreen } from "../library/LibraryCollectionDetailScreen";
import { LibraryDownloadsScreen } from "../library/LibraryDownloadsScreen";
import { ProgressEmotionalMapScreen } from "../progress/ProgressEmotionalMapScreen";
import { ProgressWeeklySummaryScreen } from "../progress/ProgressWeeklySummaryScreen";
import { ProgressStrengthsScreen } from "../progress/ProgressStrengthsScreen";
import { ProgressReportExportScreen } from "../progress/ProgressReportExportScreen";

const cases = [
  {
    name: "library.journeys",
    Screen: LibraryJourneysScreen,
    expectations: {
      loading: "Yolculuklar hazırlanıyor",
      ready: "Programlarını yönet",
      empty: "Yolculuk bulunamadı",
      error: "Yolculuklar yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.workshops",
    Screen: LibraryWorkshopsScreen,
    expectations: {
      loading: "Atölyeler hazırlanıyor",
      ready: "Etkinlikleri takip et",
      empty: "Atölye bulunamadı",
      error: "Atölyeler yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.modules",
    Screen: LibraryModulesScreen,
    expectations: {
      loading: "Modüller hazırlanıyor",
      ready: "Programlarına göz at",
      empty: "Modül bulunamadı",
      error: "Modüller yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.ebooks",
    Screen: LibraryEbooksScreen,
    expectations: {
      loading: "e-Kitaplar hazırlanıyor",
      ready: "Okumalarına devam et",
      empty: "e-Kitap bulunamadı",
      error: "e-Kitaplar yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.favorites",
    Screen: LibraryFavoritesScreen,
    expectations: {
      loading: "Favoriler hazırlanıyor",
      ready: "Kaydettiklerin",
      empty: "Favori eklenmedi",
      error: "Favoriler yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.favorite_detail",
    Screen: LibraryFavoriteDetailScreen,
    expectations: {
      loading: "Detaylar hazırlanıyor",
      ready: "Favori içeriğin",
      empty: "Favori bulunamadı",
      error: "Favori yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.collections",
    Screen: LibraryCollectionsScreen,
    expectations: {
      loading: "Koleksiyonlar hazırlanıyor",
      ready: "Arşivini düzenle",
      empty: "Koleksiyon yok",
      error: "Koleksiyonlar yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.collection_detail",
    Screen: LibraryCollectionDetailScreen,
    expectations: {
      loading: "Detaylar hazırlanıyor",
      ready: "Koleksiyonun",
      empty: "Koleksiyon boş",
      error: "Koleksiyon yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "library.downloads",
    Screen: LibraryDownloadsScreen,
    expectations: {
      loading: "İndirilenler hazırlanıyor",
      ready: "Dosyalarını yönet",
      empty: "İndirilen içerik yok",
      error: "İndirilenler yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "progress.emotional_map",
    Screen: ProgressEmotionalMapScreen,
    expectations: {
      loading: "Harita hazırlanıyor",
      ready: "Duygusal durumunu izle",
      empty: "Duygu verisi yok",
      error: "Harita yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "progress.weekly_summary",
    Screen: ProgressWeeklySummaryScreen,
    expectations: {
      loading: "Özet hazırlanıyor",
      ready: "Haftanı gözden geçir",
      empty: "Haftalık veri yok",
      error: "Özet yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "progress.strengths",
    Screen: ProgressStrengthsScreen,
    expectations: {
      loading: "Analiz hazırlanıyor",
      ready: "Güçlü yanlarını keşfet",
      empty: "Veri yok",
      error: "Analiz yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "progress.report_export",
    Screen: ProgressReportExportScreen,
    expectations: {
      loading: "Rapor hazırlanıyor",
      ready: "Raporunu paylaş",
      empty: "Rapor bulunamadı",
      error: "Rapor yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
];

describe("Library and progress screens render contract states", () => {
  cases.forEach(({ name, Screen, expectations }) => {
    (Object.keys(expectations) as Array<keyof typeof expectations>).forEach((state) => {
      it(`${name} renders ${state} state`, () => {
        const { getByText } = render(<Screen route={{ params: { state } }} />);
        expect(getByText(expectations[state])).toBeTruthy();
      });
    });
  });
});
