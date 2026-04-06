import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PDivider, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

/** AC-FR-E2-08-02: Default reminder time is 20:00 */
const DEFAULT_REMINDER_HOUR = 20;
const DEFAULT_REMINDER_MINUTE = 0;

/** AC-FR-E2-08-04: Phase 1 -- single daily reminder only */
const AVAILABLE_TIMES = [
  { label: '07:00', h: 7, m: 0 },
  { label: '12:00', h: 12, m: 0 },
  { label: '18:00', h: 18, m: 0 },
  { label: '20:00', h: 20, m: 0 },
  { label: '21:30', h: 21, m: 30 }
];

function formatTime(h: number, m: number): string {
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const HomeReminderContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [selectedHour, setSelectedHour] = useState(DEFAULT_REMINDER_HOUR);
  const [selectedMinute, setSelectedMinute] = useState(DEFAULT_REMINDER_MINUTE);
  const [permissionRequested, setPermissionRequested] = useState(false);
  const [saved, setSaved] = useState(false);
  // AC-FR-E2-08-03: mock -- if today's comment already submitted, show completion chip
  const todayCompleted = false;

  const handleRequestPermission = () => {
    if (isOffline) return;
    setPermissionRequested(true);
    // In real app: request notification permission via Permissions API
  };

  const handleSave = () => {
    if (isOffline) return;
    setSaved(true);
    // In real app: persist ReminderSetting entity + schedule OS notification
  };

  return (
    <>
      {/* AC-FR-E2-08-01: Explanation before permission request */}
      <SectionCard title="Gunluk Hatirlatici">
        <PCard style={styles.explanationCard}>
          <PText style={styles.explanationTitle}>Neden Hatirlatici?</PText>
          <PText style={styles.explanationBody}>
            Gunluk kisa pratikler uzun vadeli degisimin temelidir. Hatirlatici, sectigin saatte seni nazikce andenler --
            baskici degil, destekleyicidir.
          </PText>
        </PCard>

        {/* AC-FR-E2-08-03: If already completed today */}
        {todayCompleted && (
          <View style={styles.completedRow}>
            <PChip
              compact
              style={styles.completedChip}
              accessibilityLabel="Bugun tamamlandi -- hatirlatici gonderilmeyecek"
            >
              Bugun Tamamlandi
            </PChip>
            <PText style={styles.completedNote}>Bugunku hatirlatici gonderilmeyecek.</PText>
          </View>
        )}

        {!permissionRequested ? (
          <PButton
            mode="contained"
            onPress={handleRequestPermission}
            disabled={isOffline}
            style={styles.permissionButton}
            accessibilityLabel="Bildirim izni ver"
            accessibilityHint="Sistem bildirim izin ekranini acar"
          >
            Bildirimlere Izin Ver
          </PButton>
        ) : (
          <PCard style={styles.permissionGrantedCard}>
            <PText style={styles.permissionGrantedText}>Bildirim izni verildi.</PText>
          </PCard>
        )}
      </SectionCard>

      {/* AC-FR-E2-08-02: Time selector -- default 20:00, user-editable */}
      <SectionCard title="Hatirlatici Saati">
        <View style={styles.timeGrid}>
          {AVAILABLE_TIMES.map(t => {
            const isSelected = t.h === selectedHour && t.m === selectedMinute;
            return (
              <TouchableOpacity
                key={t.label}
                style={[styles.timeChip, isSelected && styles.timeChipSelected]}
                onPress={() => {
                  if (isOffline) return;
                  setSelectedHour(t.h);
                  setSelectedMinute(t.m);
                }}
                accessibilityLabel={`Saat ${t.label}${isSelected ? ', secili' : ''}`}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                activeOpacity={0.75}
              >
                <PText style={[styles.timeChipText, isSelected && styles.timeChipTextSelected]}>{t.label}</PText>
              </TouchableOpacity>
            );
          })}
        </View>
        <PText style={styles.selectedTimeNote}>
          Secilen saat: <PText style={styles.selectedTimeBold}>{formatTime(selectedHour, selectedMinute)}</PText>
        </PText>
        <PDivider style={styles.divider} />

        {saved ? (
          <PCard style={styles.savedCard}>
            <PText style={styles.savedText}>
              Hatirlatici {formatTime(selectedHour, selectedMinute)} icin ayarlandi.
            </PText>
          </PCard>
        ) : (
          <PButton
            mode="contained"
            onPress={handleSave}
            disabled={isOffline || !permissionRequested}
            accessibilityLabel={`Hatirlaticiyi ${formatTime(selectedHour, selectedMinute)} olarak kaydet`}
            accessibilityHint="Secilen saati kaydeder ve bildirimleri zamanlar"
          >
            Kaydet
          </PButton>
        )}
      </SectionCard>

      {/* AC-FR-E2-08-04: Phase 1 note */}
      <SectionCard title="Bilgi">
        <PText style={styles.phaseNote}>
          Faz 1'de yalnizca tek bir gunluk hatirlatici desteklenmektedir. Coklu zamanlama gelecek surumde eklenecektir.
        </PText>
      </SectionCard>
    </>
  );
};

export const HomeReminderSettingScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Gunluk Hatirlatici" subtitle="Ayarlar yukleniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={80} />
          <SkeletonBlock height={48} />
        </SectionCard>
        <SectionCard title="Saat">
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Gunluk Hatirlatici" subtitle="Ayarlanmamis">
        <StateMessage
          title="Hatirlatici ayarlanmamis"
          description="Gunluk hedeflerini hatirlaman icin bir bildirim saati sec."
          actionLabel="Ayarla"
          icon="bell-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Gunluk Hatirlatici" subtitle="Bir sorun olustu">
        <StateMessage
          title="Hatirlatici ayarlanamadi"
          description="Baglantiyi kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Gunluk Hatirlatici" subtitle="Cevrimdisi -- kayit yapilamaz">
        <OfflineNotice />
        <HomeReminderContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Gunluk Hatirlatici" subtitle="Gunluk ogrenme aliskanligi olustur">
      <HomeReminderContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    explanationCard: {
      backgroundColor: '#F0F9FF',
      borderLeftWidth: 4,
      borderLeftColor: c.primary,
      padding: 14,
      marginBottom: spacing[2]
    },
    explanationTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.bold,
      color: '#0C4A6E',
      marginBottom: 6
    },
    explanationBody: {
      fontSize: fontSizes.md,
      color: '#1E40AF',
      lineHeight: 20
    },
    completedRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1],
      marginBottom: spacing[1.5]
    },
    completedChip: {
      backgroundColor: c.tertiaryContainer
    },
    completedNote: {
      fontSize: fontSizes.base,
      color: '#065F46'
    },
    permissionButton: {
      minHeight: 48
    },
    permissionGrantedCard: {
      backgroundColor: c.tertiaryContainer,
      padding: spacing[1.5],
      borderRadius: radii.md
    },
    permissionGrantedText: {
      fontSize: fontSizes.md,
      color: '#065F46',
      fontWeight: fontWeights.semiBold
    },
    timeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: spacing[1.5]
    },
    timeChip: {
      paddingHorizontal: 18,
      paddingVertical: spacing[1.5],
      borderRadius: radii.lg,
      borderWidth: 1.5,
      borderColor: c.outline,
      backgroundColor: c.surface,
      minWidth: 72,
      alignItems: 'center',
      minHeight: 48,
      justifyContent: 'center'
    },
    timeChipSelected: {
      borderColor: c.primary,
      backgroundColor: c.primaryContainer
    },
    timeChipText: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textTertiary
    },
    timeChipTextSelected: {
      color: '#0096B8',
      fontWeight: fontWeights.extraBold
    },
    selectedTimeNote: {
      fontSize: fontSizes.md,
      color: c.textSecondary,
      marginBottom: spacing[1.5]
    },
    selectedTimeBold: {
      fontWeight: fontWeights.bold,
      color: '#0096B8'
    },
    divider: {
      marginBottom: spacing[1.5]
    },
    savedCard: {
      backgroundColor: c.tertiaryContainer,
      borderLeftWidth: 4,
      borderLeftColor: c.tertiary,
      padding: 14
    },
    savedText: {
      fontSize: fontSizes.md,
      color: '#065F46',
      fontWeight: fontWeights.semiBold
    },
    phaseNote: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      lineHeight: 18
    }
  });
}
