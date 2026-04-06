import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PDivider,
  PIconButton,
  PProgressBar,
  PText
} from '../../components';
import { getContentItemsForParent, getExerciseSteps, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

// Fallback exercise steps when no real data
const FALLBACK_STEPS = [
  {
    id: 's1',
    title: 'Adim 1: Durumu Tanimlayin',
    description: 'Hangi durum sizi etkiledi? Ne oldu? Kisa ve net sekilde yazin.'
  },
  {
    id: 's2',
    title: 'Adim 2: Duygu ve Dusunceler',
    description: 'O anda ne hissettiniz? Akliniza gelen ilk dusunce neydi?'
  },
  {
    id: 's3',
    title: 'Adim 3: Kanitlari Degerlendirin',
    description: 'Bu dusunceyi destekleyen ve curutenler neler? Her ikisini de listeleyin.'
  },
  {
    id: 's4',
    title: 'Adim 4: Denge Kurumun',
    description: 'Daha dengeli, gercekci bir bakis acisi nasil olabilir?'
  }
];

type StepStatus = 'done' | 'active' | 'locked';

const ContentExerciseContent = ({ contentItemId, isOffline }: { contentItemId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  // Load steps: prefer ExerciseStep records; fallback to static list
  const rawSteps = getExerciseSteps().filter((s: any) => s.content_item_id === contentItemId);
  const steps =
    rawSteps.length > 0
      ? rawSteps.map((s: any) => ({
          id: s.id,
          title: s.title ?? 'Adim',
          description: s.instruction ?? s.description ?? ''
        }))
      : FALLBACK_STEPS;

  // AC-FR-E11-03-02: step completion state
  const [completedCount, setCompletedCount] = useState(0);
  // AC-FR-E11-03-01: per-step notes
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [savedSteps, setSavedSteps] = useState<Set<string>>(new Set());

  const allDone = completedCount >= steps.length;

  const handleComplete = () => {
    if (isOffline) return;
    setCompletedCount(prev => Math.min(prev + 1, steps.length));
  };

  const handleSaveNote = (stepId: string) => {
    setSavedSteps(prev => new Set(prev).add(stepId));
    setTimeout(
      () =>
        setSavedSteps(prev => {
          const s = new Set(prev);
          s.delete(stepId);
          return s;
        }),
      2000
    );
  };

  // AC-FR-E11-03-03: next section navigation
  const handleNextSection = () => {
    navigation.goBack();
  };

  const progressFraction = steps.length > 0 ? completedCount / steps.length : 0;

  return (
    <View style={styles.wrapper}>
      {/* Sticky progress header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <PIconButton
            icon="arrow-left"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Geri don"
            accessibilityRole="button"
          />
          <View style={styles.headerCenter}>
            <PText style={styles.headerTitle} numberOfLines={1}>
              Uygulama Alistirmasi
            </PText>
            <PText style={styles.headerSubtitle}>
              {completedCount}/{steps.length} adim tamamlandi
            </PText>
          </View>
        </View>
        <PProgressBar
          progress={progressFraction}
          style={styles.progressBar}
          color="#0EA5E9"
          accessible
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(progressFraction * 100) }}
          accessibilityLabel={'Ilerleme: yuzde ' + Math.round(progressFraction * 100)}
        />
      </View>

      {isOffline && <OfflineNotice />}

      <ScrollView contentContainerStyle={styles.body}>
        {/* AC-FR-E11-03-01: Instructions (reading text full screen context) */}
        <PCard style={styles.instructionCard}>
          <View style={styles.instructionHeader}>
            <PAvatar.Icon
              size={28}
              icon="lightbulb-outline"
              color="#7C4DFF"
              style={styles.lightbulb}
              accessible={false}
            />
            <PText style={styles.instructionTitle}>Talimatlar</PText>
          </View>
          <PText style={styles.instructionText}>
            Son bir haftanizda yasadiginiz zorlayici bir durumu dusunun. Asagidaki adimlari sirasiyla tamamlayin ve her
            bolume notlarinizi ekleyin.
          </PText>
        </PCard>

        {/* AC-FR-E11-03-02: sequential steps */}
        <View style={styles.stepList}>
          {steps.map((step, index) => {
            const isDone = index < completedCount;
            const isActive = index === completedCount;
            const isLocked = index > completedCount;
            const statusColor = isDone ? '#16A34A' : isActive ? '#0EA5E9' : '#9CA3AF';
            const noteText = notes[step.id] ?? '';
            const noteSaved = savedSteps.has(step.id);

            return (
              <PCard
                key={step.id}
                style={[
                  styles.stepCard,
                  isDone && styles.stepCardDone,
                  isActive && styles.stepCardActive,
                  isLocked && styles.stepCardLocked
                ]}
              >
                <View style={styles.stepHeader}>
                  <View
                    style={[styles.stepBadge, { backgroundColor: statusColor + '22' }]}
                    accessibilityRole="none"
                    accessible={false}
                  >
                    <PText style={[styles.stepBadgeText, { color: statusColor }]}>{isDone ? '+' : index + 1}</PText>
                  </View>
                  <View style={styles.stepInfo}>
                    <PText style={[styles.stepTitle, isLocked && styles.stepTitleLocked]} accessibilityRole="header">
                      {step.title}
                    </PText>
                    {!isLocked && <PText style={styles.stepDesc}>{step.description}</PText>}
                    {isLocked && <PText style={styles.stepLockedHint}>Onceki adimi tamamlayin</PText>}
                  </View>
                </View>

                {/* AC-FR-E11-03-01: per-step note input */}
                {(isDone || isActive) && !isOffline && (
                  <View style={styles.noteArea}>
                    <PDivider style={styles.noteDivider} />
                    <PText style={styles.noteLabel}>Notunuz</PText>
                    <TextInput
                      style={styles.noteInput}
                      multiline
                      value={noteText}
                      onChangeText={t => setNotes(prev => ({ ...prev, [step.id]: t }))}
                      placeholder="Dusuncelerinizi buraya yazin..."
                      editable={!isOffline}
                      accessibilityLabel={'Adim ' + (index + 1) + ' notu'}
                      accessibilityHint="Bu adim icin dusuncelerinizi yazin"
                    />
                    {noteSaved && (
                      <PText
                        style={styles.noteSavedText}
                        accessibilityLiveRegion="polite"
                        accessibilityLabel="Not kaydedildi"
                      >
                        Kaydedildi
                      </PText>
                    )}
                    <View style={styles.stepActions}>
                      <PButton
                        mode="text"
                        compact
                        onPress={() => handleSaveNote(step.id)}
                        disabled={!noteText}
                        accessibilityLabel={'Adim ' + (index + 1) + ' notunu kaydet'}
                      >
                        Notu Kaydet
                      </PButton>
                      {isActive && (
                        <PButton
                          mode="contained"
                          compact
                          disabled={isOffline}
                          onPress={handleComplete}
                          accessibilityLabel={'Adim ' + (index + 1) + ' tamamla'}
                        >
                          Adimi Tamamla
                        </PButton>
                      )}
                    </View>
                  </View>
                )}
              </PCard>
            );
          })}
        </View>

        {/* AC-FR-E11-03-03: next section CTA on completion */}
        {allDone && (
          <PCard style={styles.completionCard}>
            <PAvatar.Icon
              size={56}
              icon="check-circle"
              color="#16A34A"
              style={styles.completionIcon}
              accessible={false}
            />
            <PText
              style={styles.completionTitle}
              accessibilityLiveRegion="polite"
              accessibilityLabel="Tebrikler! Alistirmayi tamamladiniz."
            >
              Tebrikler!
            </PText>
            <PText style={styles.completionDesc}>
              Bu alistirmayi basariyla tamamladiniz. Bir sonraki bolume gecebilirsiniz.
            </PText>
            <PButton
              mode="contained"
              style={styles.nextSectionBtn}
              onPress={handleNextSection}
              accessibilityLabel="Sonraki bolume gec"
            >
              Sonraki Bolum
            </PButton>
          </PCard>
        )}
      </ScrollView>
    </View>
  );
};

export const ContentExerciseScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);
  const id = route?.params?.id;

  if (state === 'loading') {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <PActivityIndicator animating accessibilityLabel="Alistirma yukleniyor" />
        <SkeletonBlock height={72} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </SafeAreaView>
    );
  }

  if (state === 'empty') {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <StateMessage
          title="Alistirma bulunamadi"
          description="Bu alistirma icin icerik bulunamadi."
          actionLabel="Pakete Don"
          icon="pencil-outline"
        />
      </SafeAreaView>
    );
  }

  if (state === 'error') {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <StateMessage
          title="Alistirma yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </SafeAreaView>
    );
  }

  if (state === 'offline') {
    return (
      <SafeAreaView style={styles.rootSafe}>
        <ContentExerciseContent contentItemId={id} isOffline />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.rootSafe}>
      <ContentExerciseContent contentItemId={id} />
    </SafeAreaView>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    rootSafe: { flex: 1, backgroundColor: '#F8FAFC' },
    wrapper: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
      backgroundColor: c.surface,
      borderBottomWidth: 1,
      borderBottomColor: '#E2E8F0',
      paddingHorizontal: 4,
      paddingTop: 4,
      paddingBottom: 8
    },
    headerRow: { flexDirection: 'row', alignItems: 'center' },
    headerCenter: { flex: 1, paddingRight: 8 },
    headerTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: '#1E3A5F' },
    headerSubtitle: { fontSize: fontSizes.sm, color: '#64748B', marginTop: 1 },
    progressBar: { height: 4, borderRadius: 0, marginTop: 6, marginHorizontal: 16 },
    body: { paddingHorizontal: spacing[2], paddingTop: 16, paddingBottom: 40 },
    instructionCard: {
      padding: 14,
      borderRadius: radii.lg,
      marginBottom: spacing[2],
      backgroundColor: '#F5F3FF',
      borderLeftWidth: 3,
      borderLeftColor: '#7C4DFF'
    },
    instructionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], marginBottom: 6 },
    lightbulb: { backgroundColor: c.secondaryContainer },
    instructionTitle: { fontSize: fontSizes.md, fontWeight: fontWeights.bold, color: '#4C1D95' },
    instructionText: { fontSize: fontSizes.md, color: '#4C1D95', lineHeight: 20 },
    stepList: { gap: 10 },
    stepCard: {
      borderRadius: radii.lg,
      padding: 14,
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: '#E2E8F0'
    },
    stepCardDone: {
      backgroundColor: '#F0FDF4',
      borderColor: '#86EFAC'
    },
    stepCardActive: {
      backgroundColor: '#F0F9FF',
      borderColor: '#7DD3FC',
      shadowColor: '#0EA5E9',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2
    },
    stepCardLocked: {
      backgroundColor: c.background,
      borderColor: '#E5E7EB',
      opacity: 0.7
    },
    stepHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
    stepBadge: {
      width: 32,
      height: 32,
      borderRadius: radii.xl,
      alignItems: 'center',
      justifyContent: 'center'
    },
    stepBadgeText: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold },
    stepInfo: { flex: 1 },
    stepTitle: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: '#1E293B', marginBottom: 4 },
    stepTitleLocked: { color: '#9CA3AF' },
    stepDesc: { fontSize: fontSizes.md, color: '#475569', lineHeight: 20 },
    stepLockedHint: { fontSize: fontSizes.base, color: '#9CA3AF', fontStyle: 'italic' },
    noteArea: { marginTop: 4 },
    noteDivider: { marginVertical: 10 },
    noteLabel: { fontSize: fontSizes.sm, color: '#94A3B8', marginBottom: 4, fontWeight: fontWeights.semiBold },
    noteInput: {
      borderWidth: 1,
      borderColor: '#CBD5E1',
      borderRadius: radii.md,
      padding: 10,
      minHeight: 72,
      fontSize: fontSizes.md,
      textAlignVertical: 'top',
      color: '#1E293B',
      marginBottom: 6
    },
    noteSavedText: { fontSize: fontSizes.sm, color: c.success, marginBottom: 4 },
    stepActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    completionCard: {
      padding: spacing[3],
      borderRadius: radii.xl,
      marginTop: spacing[2],
      backgroundColor: '#F0FDF4',
      alignItems: 'center',
      borderColor: '#86EFAC',
      borderWidth: 1.5
    },
    completionIcon: { backgroundColor: c.tertiaryContainer, marginBottom: spacing[1.5] },
    completionTitle: {
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.extraBold,
      color: '#15803D',
      marginBottom: 6
    },
    completionDesc: {
      fontSize: fontSizes.lg,
      color: '#166534',
      lineHeight: 20,
      textAlign: 'center',
      marginBottom: spacing[2]
    },
    nextSectionBtn: { alignSelf: 'stretch', borderRadius: radii.lg }
  });
}
