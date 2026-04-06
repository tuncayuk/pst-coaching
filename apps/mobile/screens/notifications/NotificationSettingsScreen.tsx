/**
 * FR-E17-03: Bildirim ayarlari ve sessiz saatler
 * AC-FR-E17-03-01: Type toggles (journey/workshop/reading/social)
 * AC-FR-E17-03-02: Quiet hours with start + end time picker
 * AC-FR-E17-03-03: Frequency selector (instant / daily summary / weekly)
 * AC-FR-E17-03-04: Sound + vibration independent toggles
 */
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  PActivityIndicator,
  PDivider,
  PListItem,
  PRadioButtonGroup,
  PRadioButtonItem,
  PSwitch,
  PText
} from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type NotifType = 'journey' | 'workshop' | 'reading' | 'social';
type Frequency = 'instant' | 'daily_summary' | 'weekly';

const TYPE_LABELS: Record<NotifType, string> = {
  journey: 'Yolculuk Bildirimleri',
  workshop: 'Atolye Bildirimleri',
  reading: 'Okuma Bildirimleri',
  social: 'Sosyal Bildirimler'
};

const QUIET_HOURS = ['20:00', '21:00', '22:00', '23:00', '00:00'];

const FREQUENCY_OPTIONS: { label: string; value: Frequency }[] = [
  { label: 'Aninda', value: 'instant' },
  { label: 'Gunluk Ozet', value: 'daily_summary' },
  { label: 'Haftalik Ozet', value: 'weekly' }
];

const NotificationSettingsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  // AC-FR-E17-03-01: Type toggles
  const [typeToggles, setTypeToggles] = useState<Record<NotifType, boolean>>({
    journey: true,
    workshop: true,
    reading: true,
    social: false
  });

  // AC-FR-E17-03-02: Quiet hours
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('08:00');
  const [quietEnabled, setQuietEnabled] = useState(true);

  // AC-FR-E17-03-03: Frequency
  const [frequency, setFrequency] = useState<Frequency>('instant');

  // AC-FR-E17-03-04: Sound + vibration
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const handleTypeToggle = (type: NotifType, value: boolean) => {
    if (isOffline) return;
    setTypeToggles(prev => ({ ...prev, [type]: value }));
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      {/* AC-FR-E17-03-01: Per-type toggles */}
      <SectionCard title="Bildirim Turleri">
        {(Object.keys(TYPE_LABELS) as NotifType[]).map((type, idx, arr) => (
          <View key={type}>
            <PListItem
              title={TYPE_LABELS[type]}
              right={() => (
                <PSwitch
                  value={typeToggles[type]}
                  onValueChange={v => handleTypeToggle(type, v)}
                  disabled={isOffline}
                  accessibilityLabel={`${TYPE_LABELS[type]} acik/kapali`}
                />
              )}
            />
            {idx < arr.length - 1 && <PDivider />}
          </View>
        ))}
      </SectionCard>

      {/* AC-FR-E17-03-02: Quiet hours */}
      <SectionCard title="Sessiz Saatler">
        <PListItem
          title="Sessiz Saatler"
          description="Bu araliktaki bildirimleri ertele"
          right={() => (
            <PSwitch
              value={quietEnabled}
              onValueChange={v => {
                if (!isOffline) setQuietEnabled(v);
              }}
              disabled={isOffline}
              accessibilityLabel="Sessiz saat modu"
            />
          )}
        />
        {quietEnabled && (
          <>
            <PDivider />
            <View style={styles.quietRow}>
              <View style={styles.quietHalf}>
                <PText style={styles.quietLabel}>Baslangic</PText>
                <View style={styles.timeChipRow}>
                  {QUIET_HOURS.map(t => (
                    <View
                      key={'start-' + t}
                      style={[styles.timeChip, quietStart === t && styles.timeChipSelected]}
                      accessible
                      accessibilityRole="button"
                      accessibilityLabel={`Baslangic saati ${t}${quietStart === t ? ', secili' : ''}`}
                    >
                      <PText
                        style={[styles.timeChipText, quietStart === t && styles.timeChipTextSelected]}
                        onPress={() => !isOffline && setQuietStart(t)}
                      >
                        {t}
                      </PText>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.quietHalf}>
                <PText style={styles.quietLabel}>Bitis</PText>
                <View style={styles.timeChipRow}>
                  {['06:00', '07:00', '08:00', '09:00', '10:00'].map(t => (
                    <View
                      key={'end-' + t}
                      style={[styles.timeChip, quietEnd === t && styles.timeChipSelected]}
                      accessible
                      accessibilityRole="button"
                      accessibilityLabel={`Bitis saati ${t}${quietEnd === t ? ', secili' : ''}`}
                    >
                      <PText
                        style={[styles.timeChipText, quietEnd === t && styles.timeChipTextSelected]}
                        onPress={() => !isOffline && setQuietEnd(t)}
                      >
                        {t}
                      </PText>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </>
        )}
      </SectionCard>

      {/* AC-FR-E17-03-03: Frequency */}
      <SectionCard title="Bildirim Sikligi">
        <PRadioButtonGroup
          value={frequency}
          onValueChange={v => {
            if (!isOffline) setFrequency(v as Frequency);
          }}
        >
          {FREQUENCY_OPTIONS.map(opt => (
            <PRadioButtonItem key={opt.value} label={opt.label} value={opt.value} disabled={isOffline} />
          ))}
        </PRadioButtonGroup>
      </SectionCard>

      {/* AC-FR-E17-03-04: Sound + vibration */}
      <SectionCard title="Ses ve Titresim">
        <PListItem
          title="Bildirim Sesi"
          right={() => (
            <PSwitch
              value={soundEnabled}
              onValueChange={v => {
                if (!isOffline) setSoundEnabled(v);
              }}
              disabled={isOffline}
              accessibilityLabel="Bildirim sesi acik/kapali"
            />
          )}
        />
        <PDivider />
        <PListItem
          title="Titresim"
          right={() => (
            <PSwitch
              value={vibrationEnabled}
              onValueChange={v => {
                if (!isOffline) setVibrationEnabled(v);
              }}
              disabled={isOffline}
              accessibilityLabel="Titresim acik/kapali"
            />
          )}
        />
      </SectionCard>
    </ScrollView>
  );
};

type NotificationSettingsScreenProps = {
  route?: { params?: { state?: ScreenState } };
};

export const NotificationSettingsScreen = ({ route }: NotificationSettingsScreenProps) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Bildirim Ayarlari">
        <PActivityIndicator />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={80} />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Bildirim Ayarlari">
        <StateMessage
          tone="error"
          title="Ayarlar yuklenemedi"
          description="Bildirim ayarlari yuklenirken bir hata olustu."
          actionLabel="Tekrar Dene"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Bildirim Ayarlari">
        <OfflineNotice />
        <NotificationSettingsContent isOffline />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Bildirim Ayarlari">
        <StateMessage title="Ayar bulunamadi" description="Bildirim ayarlari henuz olusturulmamis." />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Bildirim Ayarlari">
      <NotificationSettingsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 32 },
    skeleton: { marginHorizontal: 16, marginBottom: spacing[1.5] },
    quietRow: { flexDirection: 'row', gap: spacing[1.5], paddingVertical: spacing[1] },
    quietHalf: { flex: 1 },
    quietLabel: {
      fontSize: fontSizes.base,
      color: c.textTertiary,
      fontWeight: fontWeights.semiBold,
      marginBottom: 6
    },
    timeChipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    timeChip: {
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: c.outline,
      paddingHorizontal: 10,
      paddingVertical: 4,
      backgroundColor: c.background
    },
    timeChipSelected: {
      borderColor: c.primary,
      backgroundColor: palette.cyan50
    },
    timeChipText: { fontSize: fontSizes.base, color: c.textSecondary },
    timeChipTextSelected: { color: c.primary, fontWeight: fontWeights.bold }
  });
}
