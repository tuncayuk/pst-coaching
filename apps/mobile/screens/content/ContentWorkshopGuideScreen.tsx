import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PSwitch, PText } from '../../components';
import { getDownloadsForUser, getPrimaryUser, getWorkshopById, getWorkshops } from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-05-01: guide sections with minute-by-minute flow + phrases
const GUIDE_SECTIONS = [
  {
    time: '0-5 dk',
    title: 'Acilis',
    script: 'Herkese hosgeldiniz. Bu deneyim icin buradayiz...',
    responses: ["Katilimci gergin gorunuyorsa: 'Nefes alalim, bu alan guvenli.'"],
    alt: 'Kucuk grup ise: Cember formatina gec'
  },
  {
    time: '5-20 dk',
    title: 'Niyet Oturumu',
    script: 'Simdi herkes bir kagit aliyor ve bu deneyimden ne istedigini yaziyor...',
    responses: ["'Ne yazacagimi bilmiyorum': 'Ilk aklina gelen her sey tamam.'"],
    alt: 'Zaman kiisiyse niyeti sozlu al'
  },
  {
    time: '20-50 dk',
    title: 'Ana Icerik Blogu',
    script: 'Simdi birlikte okuyacagiz... Her cumlenin ardindan dur ve soluk al.',
    responses: ["Duygusal tepki: 'Hissettiklerini gormek cesaretli.'"],
    alt: 'Cok az katilimci varsa: Bireysel okumaya gec'
  },
  {
    time: '50-60 dk',
    title: 'Kapanis Ritueli',
    script: 'Bu oturumu kapatmadan once, kazanimlarinizi uc kelimeyle paylasin...',
    responses: ["Sessizlik: 'Sessizlik de bir cevaptir.'"],
    alt: 'Zaman azsa sadece tek kelime al'
  }
];

// AC-FR-E8-05-02: hard scenario shortcuts
const HARD_SCENARIOS = [
  { label: 'Duygusal kriz', action: 'Oturumu durdur, bireysel alan ac' },
  { label: 'Katilimci cikiyor', action: 'Sessizce izin ver, kapali grup tutum' },
  { label: 'Tartisma cikiyor', action: 'Kural hatirlatmasi yap, sohbeti yonlendir' },
  { label: 'Teknik sorun', action: '5 dk mola ver, alternatif cihaza gec' }
];

const ContentWorkshopGuideContent = ({ workshopId, isOffline }: { workshopId?: string; isOffline?: boolean }) => {
  // AC-FR-E8-05-02: facilitator mode toggle
  const [facilitatorMode, setFacilitatorMode] = useState(false);
  const user = getPrimaryUser();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const downloads = getDownloadsForUser(user?.id);
  // AC-FR-E8-05-03: offline availability -- check if downloaded
  const isDownloaded = downloads.some((d: any) => d.content_id === workshopId && d.status === 'completed');

  const navRef = React.useRef<ScrollView>(null);

  return (
    <>
      {/* AC-FR-E8-05-04: guide vs participant separation */}
      <SectionCard title="Egitmen Rehberi">
        <View style={styles.roleTag}>
          <PChip style={styles.guideChip}>Egitmen Gorunumu</PChip>
          {isDownloaded && <PChip style={styles.offlineChip}>Cevrimdisi Erisim</PChip>}
        </View>
        <PText variant="bodySmall" style={styles.desc}>
          Bu rehber yalnizca egitmen yetkisine sahip kullanicilara erisebilirdir. Katilimci gorunumu ayri bir akis
          izler.
        </PText>
      </SectionCard>

      {/* AC-FR-E8-05-02: facilitator mode toggle */}
      <SectionCard title="Facilitator Mode">
        <View style={styles.toggleRow}>
          <View style={styles.toggleLabel}>
            <PText variant="titleSmall">Buyuk Tipografi Modu</PText>
            <PText variant="bodySmall" style={styles.toggleDesc}>
              Sahne sunumu icin optimum tipografi
            </PText>
          </View>
          <PSwitch
            value={facilitatorMode}
            onValueChange={v => setFacilitatorMode(v)}
            accessibilityLabel="Facilitator mode"
          />
        </View>
        {facilitatorMode && (
          <PText variant="labelMedium" style={styles.modeActive}>
            Buyuk tipografi aktif -- cihazi katilimcilara goster
          </PText>
        )}
      </SectionCard>

      {/* AC-FR-E8-05-01: minute-by-minute flow */}
      {GUIDE_SECTIONS.map((sec, idx) => (
        <SectionCard key={sec.time} title={sec.time + ' -- ' + sec.title}>
          <PText variant="bodyMedium" style={[styles.scriptText, facilitatorMode && styles.scriptTextLarge]}>
            {sec.script}
          </PText>
          <PDivider style={styles.divider} />
          <PText variant="labelSmall" style={styles.sectionLabel}>
            Olasi Katilimci Tepkileri
          </PText>
          {sec.responses.map((r, ri) => (
            <PText key={ri} variant="bodySmall" style={styles.responseText}>
              * {r}
            </PText>
          ))}
          <PDivider style={styles.divider} />
          <PText variant="labelSmall" style={styles.sectionLabel}>
            Alternatif Akis
          </PText>
          <PText variant="bodySmall" style={styles.altText}>
            {sec.alt}
          </PText>
          {facilitatorMode && idx < GUIDE_SECTIONS.length - 1 && (
            <PButton
              mode="outlined"
              compact
              style={styles.jumpBtn}
              onPress={() => {}}
              accessibilityLabel={'Sonraki boluma gec: ' + GUIDE_SECTIONS[idx + 1].title}
            >
              Sonraki Bolum
            </PButton>
          )}
        </SectionCard>
      ))}

      {/* AC-FR-E8-05-02: hard scenario shortcuts */}
      <SectionCard title="Zor Senaryo Kisayollari">
        {HARD_SCENARIOS.map(sc => (
          <View key={sc.label} style={styles.scenarioRow}>
            <PText variant="titleSmall" style={styles.scenarioLabel}>
              {sc.label}
            </PText>
            <PText variant="bodySmall" style={styles.scenarioAction}>
              {sc.action}
            </PText>
            <PDivider style={styles.divider} />
          </View>
        ))}
      </SectionCard>

      {/* AC-FR-E8-05-03: offline download */}
      {!isDownloaded && (
        <SectionCard title="Cevrimdisi Erisim">
          <PText variant="bodySmall" style={styles.desc}>
            Rehberi indirerek internet baglantisi olmadan erisebilirsin.
          </PText>
          <PButton mode="outlined" disabled={isOffline} style={styles.downloadBtn} onPress={() => {}}>
            Rehberi Indir
          </PButton>
        </SectionCard>
      )}
    </>
  );
};

export const ContentWorkshopGuideScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Egitmen Rehberi" subtitle="Yukleniyor">
        <SectionCard title="Rehber Icerigi">
          <PActivityIndicator animating />
          {[1, 2, 3].map(i => (
            <SkeletonBlock key={i} height={20} />
          ))}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Egitmen Rehberi" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Rehber bulunamadi"
          description="Bu atolye icin egitmen rehberi mevcut degil."
          actionLabel="Geri Don"
          icon="book-education-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Egitmen Rehberi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Rehber yuklenemedi"
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
      <ScreenLayout title="Egitmen Rehberi" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopGuideContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Egitmen Rehberi" subtitle="Facilitation rehberi">
      <ContentWorkshopGuideContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  roleTag: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap'
  },
  guideChip: {
    backgroundColor: '#283593'
  },
  offlineChip: {
    backgroundColor: '#2E7D32'
  },
  desc: {
    opacity: 0.7,
    lineHeight: 20
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toggleLabel: {
    flex: 1,
    marginRight: 12
  },
  toggleDesc: {
    opacity: 0.6,
    marginTop: 2
  },
  modeActive: {
    marginTop: 8,
    color: '#F57C00'
  },
  scriptText: {
    lineHeight: 22,
    fontStyle: 'italic'
  },
  scriptTextLarge: {
    fontSize: 18,
    lineHeight: 28
  },
  divider: {
    marginVertical: 8
  },
  sectionLabel: {
    opacity: 0.55,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  responseText: {
    lineHeight: 20,
    marginBottom: 4
  },
  altText: {
    opacity: 0.75,
    lineHeight: 20
  },
  jumpBtn: {
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  scenarioRow: {
    marginBottom: 4
  },
  scenarioLabel: {
    fontWeight: '700',
    color: '#C62828',
    marginBottom: 2
  },
  scenarioAction: {
    opacity: 0.75,
    lineHeight: 20
  },
  downloadBtn: {
    marginTop: 10,
    alignSelf: 'flex-start'
  }
});
