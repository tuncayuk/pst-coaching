/**
 * FR-E17-04: Hatirlatici planlama ve tip bazli zamanlama
 * AC-FR-E17-04-01: Daily reminder with one or more time slots
 * AC-FR-E17-04-02: Per-type scheduling (journey/workshop/reading)
 * AC-FR-E17-04-03: Active/passive toggle per type
 * AC-FR-E17-04-04: CRUD for custom reminder times
 */
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PDivider, PIconButton, PListItem, PSwitch, PText } from '../../components';
import { getPrimaryUser, getReminderSettingsForUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type ReminderType = 'journey' | 'workshop' | 'reading';

const TYPE_LABELS: Record<ReminderType, string> = {
  journey: 'Yolculuk',
  workshop: 'Atolye',
  reading: 'Okuma'
};

const PRESET_TIMES = ['07:00', '09:00', '12:00', '18:00', '20:00', '21:30'];

type ReminderTypeConfig = {
  enabled: boolean;
  times: string[];
};

const ReminderPlannerContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const user = getPrimaryUser();
  const settings = getReminderSettingsForUser(user?.id);

  // AC-FR-E17-04-01: Global daily reminder time slots
  const [globalTimes, setGlobalTimes] = useState<string[]>(settings?.time_local ? [settings.time_local] : ['20:00']);

  // AC-FR-E17-04-02 + AC-FR-E17-04-03: Per-type config
  const [typeConfigs, setTypeConfigs] = useState<Record<ReminderType, ReminderTypeConfig>>({
    journey: { enabled: true, times: ['20:00'] },
    workshop: { enabled: false, times: [] },
    reading: { enabled: true, times: ['18:00'] }
  });

  const addGlobalTime = (time: string) => {
    if (isOffline) return;
    if (!globalTimes.includes(time)) {
      setGlobalTimes(prev => [...prev, time].sort());
    }
  };

  const removeGlobalTime = (time: string) => {
    if (isOffline) return;
    setGlobalTimes(prev => prev.filter(t => t !== time));
  };

  const toggleTypeEnabled = (type: ReminderType, val: boolean) => {
    if (isOffline) return;
    setTypeConfigs(prev => ({
      ...prev,
      [type]: { ...prev[type], enabled: val }
    }));
  };

  const addTypeTime = (type: ReminderType, time: string) => {
    if (isOffline) return;
    const cur = typeConfigs[type].times;
    if (!cur.includes(time)) {
      setTypeConfigs(prev => ({
        ...prev,
        [type]: { ...prev[type], times: [...cur, time].sort() }
      }));
    }
  };

  const removeTypeTime = (type: ReminderType, time: string) => {
    if (isOffline) return;
    setTypeConfigs(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        times: prev[type].times.filter(t => t !== time)
      }
    }));
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      {/* AC-FR-E17-04-01: Global daily reminder slots */}
      <SectionCard title="Gunluk Hatirlatici Saatleri">
        <PText style={styles.sectionHint}>Secili saatlerde hatirlatici alirsiniz.</PText>
        <View style={styles.timeGrid}>
          {PRESET_TIMES.map(t => {
            const isSelected = globalTimes.includes(t);
            return (
              <TouchableOpacity
                key={t}
                style={[styles.timeChip, isSelected && styles.timeChipSelected]}
                onPress={() => (isSelected ? removeGlobalTime(t) : addGlobalTime(t))}
                disabled={isOffline}
                accessibilityLabel={`Saat ${t}${isSelected ? ', secili' : ''}`}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                activeOpacity={0.75}
              >
                <PText style={[styles.timeChipText, isSelected && styles.timeChipTextSelected]}>{t}</PText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* AC-FR-E17-04-04: Show selected times with delete */}
        {globalTimes.length > 0 && (
          <>
            <PDivider style={styles.divider} />
            <PText style={styles.selectedLabel}>Secili saatler:</PText>
            <View style={styles.selectedRow}>
              {globalTimes.map(t => (
                <View key={t} style={styles.selectedChip}>
                  <PText style={styles.selectedChipText}>{t}</PText>
                  <PIconButton
                    icon="close-circle"
                    size={14}
                    onPress={() => removeGlobalTime(t)}
                    disabled={isOffline}
                    accessibilityLabel={`${t} saatini kaldir`}
                    style={styles.removeIcon}
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </SectionCard>

      {/* AC-FR-E17-04-02 + AC-FR-E17-04-03: Per-type scheduling */}
      {(Object.keys(TYPE_LABELS) as ReminderType[]).map(type => {
        const cfg = typeConfigs[type];
        return (
          <SectionCard key={type} title={TYPE_LABELS[type] + ' Hatirlaticisi'}>
            {/* AC-FR-E17-04-03: Active/passive toggle */}
            <PListItem
              title={TYPE_LABELS[type] + ' hatirlat'}
              right={() => (
                <PSwitch
                  value={cfg.enabled}
                  onValueChange={v => toggleTypeEnabled(type, v)}
                  disabled={isOffline}
                  accessibilityLabel={`${TYPE_LABELS[type]} hatirlatici acik/kapali`}
                />
              )}
            />

            {cfg.enabled && (
              <>
                <PDivider />
                {/* AC-FR-E17-04-02: Time slots for this type */}
                <PText style={styles.sectionHint}>Saat sec:</PText>
                <View style={styles.timeGrid}>
                  {PRESET_TIMES.map(t => {
                    const sel = cfg.times.includes(t);
                    return (
                      <TouchableOpacity
                        key={type + '-' + t}
                        style={[styles.timeChip, sel && styles.timeChipSelected]}
                        onPress={() => (sel ? removeTypeTime(type, t) : addTypeTime(type, t))}
                        disabled={isOffline}
                        accessibilityLabel={`${TYPE_LABELS[type]} saat ${t}${sel ? ', secili' : ''}`}
                        accessibilityRole="checkbox"
                        accessibilityState={{ checked: sel }}
                        activeOpacity={0.75}
                      >
                        <PText style={[styles.timeChipText, sel && styles.timeChipTextSelected]}>{t}</PText>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* AC-FR-E17-04-04: Selected times with remove */}
                {cfg.times.length > 0 && (
                  <View style={styles.selectedRow}>
                    {cfg.times.map(t => (
                      <View key={t} style={styles.selectedChip}>
                        <PText style={styles.selectedChipText}>{t}</PText>
                        <PIconButton
                          icon="close-circle"
                          size={14}
                          onPress={() => removeTypeTime(type, t)}
                          disabled={isOffline}
                          accessibilityLabel={`${t} saatini kaldir`}
                          style={styles.removeIcon}
                        />
                      </View>
                    ))}
                  </View>
                )}

                {cfg.times.length === 0 && <PText style={styles.noTimesHint}>En az bir saat oncesi secin.</PText>}
              </>
            )}
          </SectionCard>
        );
      })}

      <SectionCard title="Kaydet">
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={() => {}}
          accessibilityLabel="Hatirlatici ayarlarini kaydet"
        >
          Ayarlari Kaydet
        </PButton>
      </SectionCard>
    </ScrollView>
  );
};

type ReminderPlannerScreenProps = {
  route?: { params?: { state?: ScreenState } };
};

export const ReminderPlannerScreen = ({ route }: ReminderPlannerScreenProps) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Hatirlatici Planlayici">
        <PActivityIndicator />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Hatirlatici Planlayici">
        <StateMessage
          tone="error"
          title="Hatirlaticilar yuklenemedi"
          description="Ayarlar yuklenirken bir sorun olustu."
          actionLabel="Tekrar Dene"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Hatirlatici Planlayici">
        <OfflineNotice />
        <ReminderPlannerContent isOffline />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Hatirlatici Planlayici">
        <StateMessage
          title="Hatirlatici bulunamadi"
          description="Henuz hatirlatici olusturulmamis. Asagidan yeni bir zaman dilimi ekleyebilirsiniz."
        />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Hatirlatici Planlayici">
      <ReminderPlannerContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 32 },
    skeleton: { marginHorizontal: 16, marginBottom: spacing[1.5] },
    sectionHint: { fontSize: fontSizes.base, color: c.textTertiary, marginBottom: spacing[1] },
    timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[1], marginBottom: spacing[1] },
    timeChip: {
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: c.outline,
      paddingHorizontal: spacing[1.5],
      paddingVertical: 6,
      backgroundColor: c.background
    },
    timeChipSelected: { borderColor: c.primary, backgroundColor: c.primaryContainer },
    timeChipText: { fontSize: fontSizes.md, color: c.textSecondary },
    timeChipTextSelected: { color: c.primary, fontWeight: fontWeights.bold },
    divider: { marginVertical: 8 },
    selectedLabel: { fontSize: fontSizes.base, color: c.textTertiary, marginBottom: 6 },
    selectedRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
    selectedChip: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: c.primary,
      paddingHorizontal: spacing[1],
      paddingVertical: 2,
      backgroundColor: c.primaryContainer
    },
    selectedChipText: { fontSize: fontSizes.md, color: c.primary, fontWeight: fontWeights.semiBold },
    removeIcon: { margin: 0, padding: 0 },
    noTimesHint: { fontSize: fontSizes.base, color: '#A3A3A3', fontStyle: 'italic' }
  });
}
