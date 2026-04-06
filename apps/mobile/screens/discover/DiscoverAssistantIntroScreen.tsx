import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const assistantBenefits = [
  'Hedefine uygun icerik onerileri',
  'Sure ve yogunluga gore plan',
  'Kutuphanenden devam onerileri'
];

const assistantSteps = [
  { title: 'Hedefini sec', subtitle: 'Orn: sinir koyma' },
  { title: 'Sureni belirle', subtitle: '10-20 dk, 30-45 dk' },
  { title: 'Onerilerini al', subtitle: '1 ana + 2 alternatif' }
];

const DiscoverAssistantIntroContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>🤖</PText>
        <PText style={styles.heroTitle}>Kisa bir testle oneri al</PText>
        <PText style={styles.heroSubtitle}>Hedeflerine uygun yolculuk, atolye ve modul onerileri hazirlayalim.</PText>
      </View>

      <PCard style={styles.card}>
        <PText style={styles.cardLabel}>Neler yapar?</PText>
        {assistantBenefits.map(benefit => (
          <PText key={benefit} style={styles.listItem}>
            • {benefit}
          </PText>
        ))}
      </PCard>

      <PCard style={styles.card}>
        <PText style={styles.cardLabel}>Nasil calisir?</PText>
        {assistantSteps.map(step => (
          <View key={step.title} style={styles.stepRow}>
            <PText style={styles.stepTitle}>{step.title}</PText>
            <PText style={styles.stepSubtitle}>{step.subtitle}</PText>
          </View>
        ))}
      </PCard>

      <PButton
        mode="contained"
        disabled={isOffline}
        onPress={() => navigation.navigate('DiscoverAssistantQuestions')}
        style={styles.primaryButton}
      >
        Asistani Baslat
      </PButton>
      <PButton mode="text" disabled={isOffline} onPress={() => navigation.navigate('DiscoverCatalog')}>
        Kataloga Don
      </PButton>
    </View>
  );
};

export const DiscoverAssistantIntroScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <PActivityIndicator animating />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={90} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <StateMessage
          title="Oneri yok"
          description="Yeni icerikler icin daha sonra tekrar deneyebilirsin."
          actionLabel="Kataloga Don"
          icon="lightbulb-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <StateMessage
          title="Asistan yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <OfflineNotice />
        <DiscoverAssistantIntroContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Icerik Asistani">
      <DiscoverAssistantIntroContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    hero: {
      alignItems: 'center',
      marginBottom: spacing[3]
    },
    heroEmoji: {
      fontSize: 52,
      marginBottom: spacing[1.5]
    },
    heroTitle: {
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      textAlign: 'center',
      marginBottom: 6
    },
    heroSubtitle: {
      fontSize: fontSizes.xl,
      color: c.textSecondary,
      textAlign: 'center'
    },
    card: {
      padding: spacing[2],
      borderRadius: radii.xl,
      marginBottom: spacing[2]
    },
    cardLabel: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: spacing[1.5]
    },
    listItem: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      marginBottom: 6
    },
    stepRow: {
      marginBottom: spacing[1.5]
    },
    stepTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 2
    },
    stepSubtitle: {
      fontSize: fontSizes.md,
      color: c.textTertiary
    },
    primaryButton: {
      marginBottom: spacing[1]
    }
  });
}
