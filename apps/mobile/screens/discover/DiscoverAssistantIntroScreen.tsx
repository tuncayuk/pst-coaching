import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
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

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    marginBottom: 24
  },
  heroEmoji: {
    fontSize: 52,
    marginBottom: 12
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2B1B5D',
    textAlign: 'center',
    marginBottom: 6
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#525252',
    textAlign: 'center'
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16
  },
  cardLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12
  },
  listItem: {
    fontSize: 14,
    color: '#525252',
    marginBottom: 6
  },
  stepRow: {
    marginBottom: 12
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 2
  },
  stepSubtitle: {
    fontSize: 13,
    color: '#737373'
  },
  primaryButton: {
    marginBottom: 8
  }
});
