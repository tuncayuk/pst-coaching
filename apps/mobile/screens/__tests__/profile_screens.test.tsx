import React from "react";
import { render } from "@testing-library/react-native";
import { ProfileSettingsScreen } from "../profile/ProfileSettingsScreen";
import { ProfileAccountScreen } from "../profile/ProfileAccountScreen";
import { ProfileSubscriptionScreen } from "../profile/ProfileSubscriptionScreen";
import { ProfileCheckoutScreen } from "../profile/ProfileCheckoutScreen";
import { ProfileAddonsScreen } from "../profile/ProfileAddonsScreen";
import { ProfileSeatManagementScreen } from "../profile/ProfileSeatManagementScreen";
import { ProfilePaymentHistoryScreen } from "../profile/ProfilePaymentHistoryScreen";
import { ProfileRestorePurchasesScreen } from "../profile/ProfileRestorePurchasesScreen";
import { ProfileStudentDiscountScreen } from "../profile/ProfileStudentDiscountScreen";
import { ProfileLogoutConfirmScreen } from "../profile/ProfileLogoutConfirmScreen";

const cases = [
  {
    name: "profile.settings",
    Screen: ProfileSettingsScreen,
    expectations: {
      loading: "Ayarlar hazırlanıyor",
      ready: "Tercihlerini düzenle",
      empty: "Ayar bulunamadı",
      error: "Ayarlar yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.account",
    Screen: ProfileAccountScreen,
    expectations: {
      loading: "Hesap hazırlanıyor",
      ready: "Hesabını düzenle",
      empty: "Hesap bilgileri yok",
      error: "Hesap yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.subscription",
    Screen: ProfileSubscriptionScreen,
    expectations: {
      loading: "Abonelik hazırlanıyor",
      ready: "Planını yönet",
      empty: "Abonelik bulunamadı",
      error: "Abonelik yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.checkout",
    Screen: ProfileCheckoutScreen,
    expectations: {
      loading: "Satın alma hazırlanıyor",
      ready: "Satın almayı tamamla",
      empty: "Sepet boş",
      error: "Satın alma yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.addons",
    Screen: ProfileAddonsScreen,
    expectations: {
      loading: "Add-on'lar hazırlanıyor",
      ready: "Eklentilerini yönet",
      empty: "Add-on bulunamadı",
      error: "Add-on'lar yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.seat_management",
    Screen: ProfileSeatManagementScreen,
    expectations: {
      loading: "Kişiler hazırlanıyor",
      ready: "Ekibini yönet",
      empty: "Kişi bulunamadı",
      error: "Kişiler yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.payment_history",
    Screen: ProfilePaymentHistoryScreen,
    expectations: {
      loading: "Ödeme geçmişi hazırlanıyor",
      ready: "İşlemlerini incele",
      empty: "Ödeme geçmişi yok",
      error: "Ödemeler yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.restore_purchases",
    Screen: ProfileRestorePurchasesScreen,
    expectations: {
      loading: "Geri yükleme hazırlanıyor",
      ready: "Satın alımlarını doğrula",
      empty: "Geri yüklenecek satın alım yok",
      error: "Geri yükleme başarısız",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.student_discount",
    Screen: ProfileStudentDiscountScreen,
    expectations: {
      loading: "Doğrulama hazırlanıyor",
      ready: "Öğrenci indirimini doğrula",
      empty: "Doğrulama verisi yok",
      error: "Öğrenci indirimi yüklenemedi",
      offline: "Çevrimdışısınız",
    },
  },
  {
    name: "profile.logout_confirm",
    Screen: ProfileLogoutConfirmScreen,
    expectations: {
      loading: "Çıkış hazırlanıyor",
      ready: "Hesabından çıkış yap",
      empty: "Çıkış bilgisi yok",
      error: "Çıkış yapılamadı",
      offline: "Çevrimdışısınız",
    },
  },
];

describe("Profile screens render contract states", () => {
  cases.forEach(({ name, Screen, expectations }) => {
    (Object.keys(expectations) as Array<keyof typeof expectations>).forEach((state) => {
      it(`${name} renders ${state} state`, () => {
        const { getByText } = render(<Screen route={{ params: { state } }} />);
        expect(getByText(expectations[state])).toBeTruthy();
      });
    });
  });
});
