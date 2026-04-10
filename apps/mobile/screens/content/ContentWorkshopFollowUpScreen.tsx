import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PSwitch, PText } from '../../components';
import { getWorkshopById, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-07-01: 3-phase follow-up plan
const FOLLOW_UP_PHASES = [
  {
    id: 'phase-72h',
    label: '72 Saat Toparlanma',
    desc: 'Ilk uc gunde enerji yonetimi ve duygusal yerlesme.',
    steps: ['Ekran suresini azalt', 'Once icin hafif beslenme', 'Gunluk yaz / ses kaydi al', 'Paylasim listeni belirle']
  },
  {
    id: 'phase-3w',
    label: '3 Haftalik Takip',
    desc: 'Her hafta kucuk bir adim ve pekistirme egzersizi.',
    steps: [
      'Hafta 1: Niyet cumleni gunluk tekrarla',
      'Hafta 2: Bir kisi ile paylasim yap',
      'Hafta 3: Ortam duzenlemesi yap'
    ]
  },
  {
    id: 'phase-30d',
    label: '30 Gunluk Plan',
    desc: 'Atolyeden 30 gun sonra hedeflerin ile geri bakilacak yer.',
    steps: [
      '30. gunde calisma kitabini yeniden ac',
      'Hangi cumlelerin degistigini gozlemle',
      'Hangi adimi attigini belgele',
      'Yeni bir niyet belirle'
    ]
  }
];

const ContentWorkshopFollowUpContent = ({ workshopId, isOffline }: { workshopId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];

  // AC-FR-E8-07-02: user records intention, daily sentence, small steps
  const [intention, setIntention] = useState('');
  const [dailySentence, setDailySentence] = useState('');
  const [steps, setSteps] = useState(['', '', '']);
  const [planSaved, setPlanSaved] = useState(false);

  // AC-FR-E8-07-03: reminder toggle
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderSaved, setReminderSaved] = useState(false);

  const handleSavePlan = () => {
    setPlanSaved(true);
  };

  const handleSaveReminder = () => {
    setReminderSaved(true);
    setTimeout(() => setReminderSaved(false), 2000);
  };

  return (
    <>
      <SectionCard title={'Takip Plani -- ' + (workshop?.title ?? 'Atolye')}>
        <PText variant="bodySmall" style={styles.desc}>
          Atolye sonrasi davranis surekliligi icin 72 saatlik, 3 haftalik ve 30 gunluk yapilandirilmis takip plani.
        </PText>
      </SectionCard>

      {/* AC-FR-E8-07-01: 3 phases */}
      {FOLLOW_UP_PHASES.map(phase => (
        <SectionCard key={phase.id} title={phase.label}>
          <PText variant="bodySmall" style={styles.phaseDesc}>
            {phase.desc}
          </PText>
          <PDivider style={styles.divider} />
          {phase.steps.map((step, si) => (
            <View key={si} style={styles.stepRow}>
              <PText style={styles.bullet}>·</PText>
              <PText variant="bodySmall" style={styles.stepText}>
                {step}
              </PText>
            </View>
          ))}
        </SectionCard>
      ))}

      {/* AC-FR-E8-07-02: personal intention + daily sentence + small steps */}
      <SectionCard title="Kisisel Niyet ve Adimlar">
        <PText variant="labelMedium" style={styles.fieldLabel}>
          Niyetim
        </PText>
        <TextInput
          style={styles.textInput}
          multiline
          value={intention}
          onChangeText={setIntention}
          placeholder="Atolyeyi tamamladiktan sonra hayatima tasimak istedigim sey..."
          editable={!isOffline}
          accessibilityLabel="Niyet alani"
        />
        <PText variant="labelMedium" style={[styles.fieldLabel, styles.fieldSpacing]}>
          Gunluk Cumlemi
        </PText>
        <TextInput
          style={styles.textInput}
          value={dailySentence}
          onChangeText={setDailySentence}
          placeholder="Her sabah tekrar edecegim cumle..."
          editable={!isOffline}
          accessibilityLabel="Gunluk cumle"
        />
        <PText variant="labelMedium" style={[styles.fieldLabel, styles.fieldSpacing]}>
          3 Kucuk Adim
        </PText>
        {steps.map((step, si) => (
          <TextInput
            key={si}
            style={[styles.textInput, styles.stepInput]}
            value={step}
            onChangeText={v =>
              setSteps(prev => {
                const n = [...prev];
                n[si] = v;
                return n;
              })
            }
            placeholder={'Adim ' + (si + 1) + '...'}
            editable={!isOffline}
            accessibilityLabel={'Adim ' + (si + 1)}
          />
        ))}
        {planSaved && (
          <PText variant="labelSmall" style={styles.savedNote}>
            Plan kaydedildi
          </PText>
        )}
        <PButton
          mode="contained"
          disabled={isOffline || (!intention && !dailySentence)}
          style={styles.saveBtn}
          onPress={handleSavePlan}
        >
          Plani Kaydet
        </PButton>
      </SectionCard>

      {/* AC-FR-E8-07-03: reminder -- separate from daily content reminders */}
      <SectionCard title="Takip Hatirlaticisi">
        <PText variant="bodySmall" style={styles.desc}>
          Gunluk icerik hatirlaticisindan bagimsiz olarak bir takip hatirlaticisi kur.
        </PText>
        <View style={styles.toggleRow}>
          <PText variant="titleSmall">Hatirlatici Aktif</PText>
          <PSwitch
            value={reminderEnabled}
            onValueChange={v => {
              setReminderEnabled(v);
              if (v) handleSaveReminder();
            }}
            disabled={isOffline}
            accessibilityLabel="Hatirlatici aktif et"
          />
        </View>
        {reminderSaved && (
          <PText variant="labelSmall" style={styles.savedNote}>
            Hatirlatici kaydedildi
          </PText>
        )}
        {reminderEnabled && (
          <View style={styles.chipRow}>
            {['Sabah 08:00', 'Ogle 12:00', 'Aksam 21:00'].map(t => (
              <PChip key={t} compact style={styles.timeChip}>
                {t}
              </PChip>
            ))}
          </View>
        )}
      </SectionCard>

      {/* AC-FR-E8-07-04: view in archive */}
      <SectionCard title="">
        <PButton
          mode="outlined"
          disabled={isOffline}
          onPress={() =>
            navigation.navigate('Content', {
              screen: 'ContentWorkshopCompletion',
              params: { id: workshopId }
            })
          }
        >
          Arsivde Gor
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopFollowUpScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Takip Plani" subtitle="Yukleniyor">
        <SectionCard title="Takip Fazlari">
          <PActivityIndicator animating />
          {[1, 2, 3].map(i => (
            <SkeletonBlock key={i} height={40} />
          ))}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Takip Plani" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Takip plani bulunamadi"
          description="Atolyeyi tamamladiktan sonra takip plani olusturalim."
          actionLabel="Geri Don"
          icon="calendar-check-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Takip Plani" subtitle="Bir sorun olustu">
        <StateMessage
          title="Takip plani yuklenemedi"
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
      <ScreenLayout title="Takip Plani" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopFollowUpContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Takip Plani" subtitle="Davranis surekliligi plani">
      <ContentWorkshopFollowUpContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    desc: {
      opacity: 0.7,
      lineHeight: 20
    },
    phaseDesc: {
      opacity: 0.7,
      lineHeight: 20,
      marginBottom: 6
    },
    divider: {
      marginVertical: 8
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 6,
      gap: 6
    },
    bullet: {
      color: '#7C4DFF',
      fontWeight: fontWeights.bold
    },
    stepText: {
      flex: 1,
      lineHeight: 20
    },
    fieldLabel: {
      opacity: 0.65,
      marginBottom: 4
    },
    fieldSpacing: {
      marginTop: spacing[1.5]
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: radii.md,
      padding: 10,
      fontSize: fontSizes.lg
    },
    stepInput: {
      marginBottom: spacing[1]
    },
    savedNote: {
      color: '#4CAF50',
      marginTop: 4
    },
    saveBtn: {
      marginTop: 10
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginTop: spacing[1]
    },
    timeChip: {
      alignSelf: 'flex-start'
    }
  });
}
