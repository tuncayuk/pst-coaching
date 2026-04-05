import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PProgressBar, PText } from '../../components';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

// AC-FR-E6-03-01: Separate strong areas and development areas
const strengths = [
  { title: 'Empati', score: 0.82, description: 'Baskalarinin duygularini anlama ve paylasma.' },
  { title: 'Oz Duzenleme', score: 0.64, description: 'Duygulari ve tepkileri yonetme kapasitesi.' },
  { title: 'Odaklanma', score: 0.71, description: 'Amac odakli surdurulebilir dikkat.' }
];

// AC-FR-E6-03-02: Development areas with concrete suggestions + content references
const developmentAreas = [
  {
    title: 'Kararlilik',
    score: 0.38,
    suggestion: 'Gunluk kucuk kararlar alarak kararliligi guclendir.',
    contentRef: 'Oz-Sefkat Yolculugu',
    contentRouteParams: {
      screen: 'ContentJourneyDetail',
      params: { id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' }
    }
  },
  {
    title: 'Stres Yonetimi',
    score: 0.44,
    suggestion: 'Nefes tekniklerini gunluk rutinine ekle.',
    contentRef: 'Duygusal Dayaniklilik Atolyesi',
    contentRouteParams: {
      screen: 'ContentWorkshopDetail',
      params: { id: 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee' }
    }
  }
];

const ProgressStrengthsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();

  return (
    <>
      {/* AC-FR-E6-03-01: Strong areas card */}
      <SectionCard title="Guclu Alanlar">
        {strengths.map(item => (
          <PCard key={item.title} style={styles.card}>
            <PCard.Title title={item.title} subtitle={`${Math.round(item.score * 100)}%`} />
            <PCard.Content>
              <PProgressBar
                progress={item.score}
                style={styles.bar}
                accessibilityLabel={`${item.title}: yuzde ${Math.round(item.score * 100)}`}
              />
              <PText style={styles.description}>{item.description}</PText>
            </PCard.Content>
          </PCard>
        ))}
      </SectionCard>

      {/* AC-FR-E6-03-01: Development areas card (separate) */}
      <SectionCard title="Gelisim Alanlari">
        {developmentAreas.map(item => (
          <PCard key={item.title} style={[styles.card, styles.devCard]}>
            <PCard.Title title={item.title} subtitle={`${Math.round(item.score * 100)}% — Gelisim alani`} />
            <PCard.Content>
              <PProgressBar
                progress={item.score}
                style={styles.bar}
                accessibilityLabel={`${item.title}: yuzde ${Math.round(item.score * 100)}, gelisim alani`}
              />
              {/* AC-FR-E6-03-02: Concrete suggestion + content reference */}
              <PText style={styles.suggestion}>{item.suggestion}</PText>
              <PText style={styles.contentRef}>Onerilen icerik: {item.contentRef}</PText>
            </PCard.Content>
            {/* AC-FR-E6-03-03: "Onerileri Uygula" navigates to content */}
            <PCard.Actions>
              <PButton
                mode="contained"
                compact
                disabled={isOffline}
                onPress={() => navigation.navigate('Content', item.contentRouteParams)}
              >
                Onerileri Uygula
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>

      <SectionCard title="Kisisel Plan">
        <PText style={styles.planHint}>Gelisim alanlarini hedefleyen kisisel bir eylem plani olusturabilirsin.</PText>
        <PButton mode="outlined" disabled={isOffline} onPress={() => navigation.navigate('ProgressReportExport')}>
          Kisisel Plan Olustur
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProgressStrengthsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Guclu ve Gelisim Alanlari" subtitle="Analiz hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Analiz">
          <SkeletonBlock height={80} />
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Guclu ve Gelisim Alanlari" subtitle="Analiz olusacak">
        <StateMessage
          title="Veri yok"
          description="Daha fazla icerik tamamladikcaguclu alanlar ortaya cikacak."
          actionLabel="Icerik Tamamla"
          icon="star-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Guclu ve Gelisim Alanlari" subtitle="Bir sorun olustu">
        <StateMessage
          title="Analiz yuklenemedi"
          description="Verileri getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Guclu ve Gelisim Alanlari" subtitle="Onbellekteki icerikler">
        <OfflineNotice />
        <ProgressStrengthsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Guclu ve Gelisim Alanlari" subtitle="Guclu yanlarini kesffet">
      <ProgressStrengthsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12
  },
  devCard: {
    borderWidth: 1,
    borderColor: '#FCD34D',
    backgroundColor: '#FFFBEB'
  },
  bar: {
    marginTop: 6,
    marginBottom: 8,
    height: 6,
    borderRadius: 3
  },
  description: {
    fontSize: 12,
    color: '#737373'
  },
  suggestion: {
    fontSize: 13,
    color: '#1F2937',
    marginBottom: 4
  },
  contentRef: {
    fontSize: 11,
    color: '#6B46C1',
    fontWeight: '600'
  },
  planHint: {
    fontSize: 13,
    color: '#525252',
    marginBottom: 10
  }
});
