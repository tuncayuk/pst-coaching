import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PRadioButtonGroup, PRadioButtonItem, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const GOAL_OPTIONS = [
  { label: 'Kisisel gelisim', value: 'personal' },
  { label: 'Maneviyat', value: 'spiritual' },
  { label: 'Duygusal denge', value: 'balance' }
];

const DURATION_OPTIONS = [
  { label: '10 dk', value: '10' },
  { label: '20 dk', value: '20' },
  { label: '30+ dk', value: '30' }
];

const PREFERENCE_OPTIONS = [
  { label: 'Okuma', value: 'reading', emoji: '📖' },
  { label: 'Uygulama / Egzersiz', value: 'exercise', emoji: '🧘' },
  { label: 'Video / Ses', value: 'media', emoji: '🎧' }
];

const DiscoverAssistantQuestionsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const [goal, setGoal] = React.useState('personal');
  const [duration, setDuration] = React.useState('20');
  const [preference, setPreference] = React.useState('reading');

  const completedSteps = (goal ? 1 : 0) + (duration ? 1 : 0) + (preference ? 1 : 0);

  return (
    <View>
      <View style={styles.progressRow}>
        <PText variant="labelLarge" style={styles.progressLabel}>
          {completedSteps}/3 adim tamamlandi
        </PText>
      </View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>🤖</PText>
        <PText style={styles.heroTitle}>Size En Uygun Icerigi Bulalim</PText>
        <PText style={styles.heroSubtitle}>Birkas soruyla baslayalim</PText>
      </View>

      {/* Q1: Goal */}
      <PCard style={styles.card}>
        <PText style={styles.cardLabel}>1️⃣ Ana hedefiniz nedir?</PText>
        <PRadioButtonGroup value={goal} onValueChange={setGoal}>
          {GOAL_OPTIONS.map(option => (
            <PRadioButtonItem
              key={option.value}
              label={option.label}
              value={option.value}
              disabled={isOffline}
              style={[styles.radioItem, goal === option.value ? styles.radioItemActive : styles.radioItemIdle]}
            />
          ))}
        </PRadioButtonGroup>
      </PCard>

      {/* Q2: Duration */}
      <PCard style={styles.card}>
        <PText style={styles.cardLabel}>2️⃣ Ne kadar zaman ayirabilirsiniz?</PText>
        <View style={styles.durationGrid}>
          {DURATION_OPTIONS.map(option => (
            <PButton
              key={option.value}
              mode={duration === option.value ? 'contained' : 'outlined'}
              disabled={isOffline}
              onPress={() => setDuration(option.value)}
              style={styles.durationButton}
              buttonColor={duration === option.value ? c.secondary : 'transparent'}
            >
              {option.label}
            </PButton>
          ))}
        </View>
      </PCard>

      {/* Q3: Content preference */}
      <PCard style={styles.card}>
        <PText style={styles.cardLabel}>3️⃣ Hangi tur icerigi tercih edersiniz?</PText>
        <View style={styles.prefGrid}>
          {PREFERENCE_OPTIONS.map(option => {
            const isActive = preference === option.value;
            return (
              <PButton
                key={option.value}
                mode={isActive ? 'contained' : 'outlined'}
                disabled={isOffline}
                onPress={() => setPreference(option.value)}
                style={styles.prefButton}
                contentStyle={styles.prefButtonContent}
                buttonColor={isActive ? c.secondary : 'transparent'}
              >
                {option.emoji} {option.label}
              </PButton>
            );
          })}
        </View>
      </PCard>

      <PButton
        mode="contained"
        style={styles.primaryButton}
        buttonColor={c.secondary}
        disabled={isOffline}
        onPress={() => navigation.navigate('DiscoverAssistantResults')}
      >
        Oneri Al
      </PButton>

      <PButton mode="text" disabled={isOffline} onPress={() => navigation.navigate('DiscoverCatalog')}>
        Atla, Kataloga Git
      </PButton>
    </View>
  );
};

export const DiscoverAssistantQuestionsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <PActivityIndicator animating />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={80} />
        <SkeletonBlock height={80} />
        <SkeletonBlock height={80} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <StateMessage
          title="Sorular bulunamadi"
          description="Su anda soru listesi yuklenemiyor."
          actionLabel="Tekrar Dene"
          icon="help-circle-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <StateMessage
          title="Sorular yuklenemedi"
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
        <DiscoverAssistantQuestionsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Icerik Asistani">
      <DiscoverAssistantQuestionsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    progressRow: { marginBottom: spacing[1.5] },
    progressLabel: { textAlign: 'center' },
    hero: { alignItems: 'center', marginBottom: spacing[2.5] },
    heroEmoji: { fontSize: fontSizes['11xl'], marginBottom: 10 },
    heroTitle: {
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      textAlign: 'center',
      marginBottom: 4
    },
    heroSubtitle: { fontSize: fontSizes.lg, color: c.textSecondary, textAlign: 'center' },
    card: { padding: spacing[2], borderRadius: radii.xl, marginBottom: spacing[2] },
    cardLabel: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginBottom: spacing[1.5]
    },
    radioItem: { borderWidth: 2, borderRadius: radii.lg, marginBottom: spacing[1] },
    radioItemActive: { borderColor: c.textBrand, backgroundColor: c.secondaryContainer },
    radioItemIdle: { borderColor: c.outlineVariant, backgroundColor: c.surface },
    durationGrid: { flexDirection: 'row', gap: spacing[1] },
    durationButton: { flex: 1 },
    prefGrid: { gap: spacing[1] },
    prefButton: { borderRadius: radii.lg },
    prefButtonContent: { height: 40 },
    primaryButton: { marginBottom: spacing[1], borderRadius: radii.lg }
  });
}
