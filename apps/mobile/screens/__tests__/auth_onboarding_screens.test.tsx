import { render } from '@testing-library/react-native';
import React from 'react';

import { AuthLockoutScreen } from '../auth/AuthLockoutScreen';
import { AuthLoginScreen } from '../auth/AuthLoginScreen';
import { AuthOtpVerifyScreen } from '../auth/AuthOtpVerifyScreen';
import { AuthPasswordResetScreen } from '../auth/AuthPasswordResetScreen';
import { AuthReauthScreen } from '../auth/AuthReauthScreen';
import { AuthRegisterScreen } from '../auth/AuthRegisterScreen';
import { AuthSessionTimeoutScreen } from '../auth/AuthSessionTimeoutScreen';
import { OnboardingLanguageSelectScreen } from '../onboarding/OnboardingLanguageSelectScreen';
import { OnboardingWelcomeScreen } from '../onboarding/OnboardingWelcomeScreen';

const cases = [
  {
    name: 'onboarding.language_select',
    Screen: OnboardingLanguageSelectScreen,
    expectations: {
      loading: 'Dil seçenekleri hazırlanıyor',
      ready: 'Dilini seç',
      empty: 'Dil seçenekleri bulunamadı',
      error: 'Dil seçenekleri yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'onboarding.welcome',
    Screen: OnboardingWelcomeScreen,
    expectations: {
      loading: 'Karşılama hazırlanıyor',
      ready: 'Yeni bir yolculuğa hoş geldin',
      empty: 'Karşılama içeriği bulunamadı',
      error: 'Hoş geldiniz yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'auth.login',
    Screen: AuthLoginScreen,
    expectations: {
      loading: 'Giriş formu hazırlanıyor',
      ready: 'Hesabına giriş yap',
      empty: 'Giriş bilgisi bulunamadı',
      error: 'Giriş yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'auth.register',
    Screen: AuthRegisterScreen,
    expectations: {
      loading: 'Kayıt formu hazırlanıyor',
      ready: 'Yeni hesap oluştur',
      empty: 'Kayıt seçenekleri bulunamadı',
      error: 'Kayıt yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'auth.otp_verify',
    Screen: AuthOtpVerifyScreen,
    expectations: {
      loading: 'Doğrulama hazırlanıyor',
      ready: 'Doğrulama kodunu gir',
      empty: 'Doğrulama kodu yok',
      error: 'Doğrulama yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'auth.password_reset',
    Screen: AuthPasswordResetScreen,
    expectations: {
      loading: 'Sıfırlama hazırlanıyor',
      ready: 'Şifre sıfırlama bağlantısı gönder',
      empty: 'Sıfırlama bilgisi yok',
      error: 'Şifre sıfırlama yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'auth.session_timeout',
    Screen: AuthSessionTimeoutScreen,
    expectations: {
      loading: 'Oturum kontrol ediliyor',
      ready: 'Oturum süren doldu',
      empty: 'Oturum durumu yok',
      error: 'Oturum bilgisi alınamadı',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'auth.lockout',
    Screen: AuthLockoutScreen,
    expectations: {
      loading: 'Kilit bilgisi hazırlanıyor',
      ready: 'Güvenlik bilgilendirmesi',
      empty: 'Kilit bilgisi yok',
      error: 'Kilit bilgisi alınamadı',
      offline: 'Çevrimdışısınız'
    }
  },
  {
    name: 'auth.reauth',
    Screen: AuthReauthScreen,
    expectations: {
      loading: 'Doğrulama hazırlanıyor',
      ready: 'Devam etmek için doğrula',
      empty: 'Doğrulama bilgisi yok',
      error: 'Doğrulama yüklenemedi',
      offline: 'Çevrimdışısınız'
    }
  }
];

describe('Auth + onboarding screens render contract states', () => {
  cases.forEach(({ name, Screen, expectations }) => {
    (Object.keys(expectations) as Array<keyof typeof expectations>).forEach(state => {
      it(`${name} renders ${state} state`, () => {
        const { getByText } = render(<Screen route={{ params: { state } }} />);
        expect(getByText(expectations[state])).toBeTruthy();
      });
    });
  });
});
