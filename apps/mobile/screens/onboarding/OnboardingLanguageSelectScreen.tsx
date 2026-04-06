import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PRadioButtonGroup, PRadioButtonItem, PText } from '../../components';
import { getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const LanguageSelectContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const [selectedLanguage, setSelectedLanguage] = React.useState(user?.language ?? 'tr');

  return (
    <>
      <SectionCard title="Dilini seç">
        <PText variant="bodyMedium" style={styles.helperText}>
          Uygulamayı kullanacağın dili seçerek başlayalım.
        </PText>
        <PRadioButtonGroup onValueChange={value => setSelectedLanguage(value)} value={selectedLanguage}>
          <PRadioButtonItem label="Türkçe" value="tr" disabled={isOffline} />
          <PRadioButtonItem label="English" value="en" disabled={isOffline} />
          <PRadioButtonItem label="Español" value="es" disabled={isOffline} />
        </PRadioButtonGroup>
        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() => navigation.getParent()?.navigate('Auth' as never)}
          accessibilityLabel="Devam et"
        >
          Devam Et
        </PButton>
      </SectionCard>
      <SectionCard title="Dil tercihi">
        <PText variant="bodySmall" style={styles.bodyText}>
          Tercihini daha sonra Profil &gt; Dil bölümünden güncelleyebilirsin.
        </PText>
      </SectionCard>
    </>
  );
};

export const OnboardingLanguageSelectScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Dil Seçimi" subtitle="Dil seçenekleri hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Dil Seçimi" subtitle="Dil seçenekleri bulunamadı">
        <StateMessage
          title="Dil seçenekleri bulunamadı"
          description="Uygulama dili için seçenekleri tekrar yükleyebilirsin."
          actionLabel="Tekrar Dene"
          icon="translate"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Dil Seçimi" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Dil seçenekleri yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Dil Seçimi" subtitle="Önbellekteki tercihler">
        <OfflineNotice />
        <LanguageSelectContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Dil Seçimi" subtitle="Dilini seç">
      <LanguageSelectContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    helperText: {
      marginBottom: spacing[1.5]
    },
    primaryButton: {
      marginTop: spacing[2],
      alignSelf: 'flex-start'
    },
    bodyText: {
      lineHeight: 20
    }
  });
}
