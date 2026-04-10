import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PSwitch, PText } from '../../components';
import { getDownloadsForUser, getPrimaryUser, getWorkshopById, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-05-01: guide sections with minute-by-minute flow + facilitator script
// Aligned with Mutlak.docx Asama 9 — Full Professional Script
const GUIDE_SECTIONS = [
  {
    stage: 'Asama 1–4',
    time: '0–15 dk',
    title: 'Kavramsal Zemin Kurulumu',
    script:
      'Herkese hosgeldiniz. Bugun birlikte bir zemin kuraKacagiz. "Muhtacim" kelimesi bir eksiklik degil, bir hakikat. Fatir 15\'i birlikte okuyalim... Ardindan susmani bekliyorum. Bu cumle size ne hissettirdi?',
    responses: [
      "Gergin gorunen katilimci: 'Bu alan guvenli. Burada dogru ya da yanlis cevap yok.'",
      "\"Benim icin gecerli degil\" diyen: 'Bu hissi tarif etmeni istiyorum — hangi alanda en guclu hissediyorsun?'"
    ],
    alt: 'Kucuk grup ise: Cember formatinda her biri bir kelimeyle baslasın',
    microSkill: 'Yansitma: Katilimcinin soylediklerini geri verin, yorum katmadan.'
  },
  {
    stage: 'Asama 2–3',
    time: '15–45 dk',
    title: 'Ayet Analizi ve Aynalama',
    script:
      'Simdi Bakara 255 ve Rahman 29\'u yan yana okuyacagiz. Kayyumiyet ne anlama geliyor? Her an tutuluyor olmak... Siz hic tutuldugunuzu hissettiniz mi? Ya da tam tersine, her seyin sizin omuzlarinizda oldugunu?',
    responses: [
      "Goz dolmasi / aglamak: 'Bu sizi dokunan bir yer demek. Oraya bir sure oturabilirsiniz.'",
      "Entelektuel mesafe kuran: 'Bu benim icin teorik kalıyor' → 'Hangi cumle size en yakin geldi? Sadece biri bile olsa.'"
    ],
    alt: 'Cok kognitif gruplarda: once bireysel okuma, sonra grup tartismasi',
    microSkill: 'Derinlestirme: "Bunu biraz daha acabilir misin?" sorusunu kriz anlarinda kullanin.'
  },
  {
    stage: 'Asama 4',
    time: '45–65 dk',
    title: 'Alim Perspektifleri — Mufessirler',
    script:
      'Simdi Nursi\'nin fakr-acz eksenine bakacagiz. O diyor ki: "Insan zayifligi oraninda Allah\'a siginir." Bu cumle kisisel alinabilir. Size zayif hissettiren sey, bir giris kapisi olabilir.',
    responses: [
      "\"Bediuzzaman'i bilmiyorum\": 'Bilmene gerek yok. Sadece bu cumle size bir sey ifade ediyor mu?'",
      "Dini bilgiye sahip katilimci domine ederse: 'Tesekkurler — su an herkesin kendi deneyimine donmesini istiyorum.'"
    ],
    alt: 'Laik katilimci agirlikli gruplarda: psikolojik terminolojiyi one cikar',
    microSkill: 'Kiriilma ani yonetimi: Sessizligi bozma. 10 saniye bekle, sonra nazikce sor.'
  },
  {
    stage: 'Asama 5–7',
    time: '65–90 dk',
    title: 'Vicdan-Karakter + Psikoloji + Felsefe Entegrasyonu',
    script:
      'Simdi Jung\'un "self" kavramina geciyoruz. Kontrolu birakamayan insan, aslinda ne kaybetmekten korkuyor? Adler der ki: asagilik duygusu telafi arayan insan, guc olarak kontrol illüzyonu kurar. Bu sizin icin nasil gorunuyor?',
    responses: [
      "\"Bu cok teorik\" diyen: 'Haklısın. Somutlastiralim — gecen ay en cok ne kontrolunuzu elinize almaya calıstınız?'",
      'Aglamak ya da kapanmak: Oturumu bireysel alana tasi, grup onunde zorlamayin.'
    ],
    alt: 'Zaman kiisiyse: Asama 6 veya 7\'yi ozet slide ile gec',
    microSkill: 'Yansitma + derinlestirme: "Simdi ne hissediyorsunuz?" sorusu her geciste calisir.'
  },
  {
    stage: 'Asama 8 — Kamp',
    time: 'Gun 1–3 (Tam Senaryo)',
    title: 'Kamp Facilitasyonu',
    script:
      'Gun 1 (Tespit): "Bu sabah tek bir soru: Ben gercekten neye guveniyorum?" → Sessizlik ver → "Kontrol illüzyonum tablosu"nu doldurtalim. Gun 2 (Cozum): Mu\'min 60 → Sesli dua egzersizi → "Hangi esmayla yoneliyorsun?". Gun 3 (Insa): 21 gunluk plan imzalansin, partner ile taahhut ritueli yapilsin.',
    responses: [
      "Kamp 1. Gunde kapanan katilimci: 'Calisma kagidini orada birakabilirsin. Sonra bakabiliriz.'",
      "2. Gunde duygusal yogunluk: 'Bu normal — bu kamp bu yukleri tasimak icin alan aciyor.'",
      "3. Gunde \"yapabilir miyim\" kaygisi: '21 gun mikro adimlar icin. Biri bile olsa yeter.'"
    ],
    alt: 'Kamp online yapiliyorsa: Her gun kucuk breakout odalara bol',
    microSkill: 'Kiriilma ani: Katilimci agladiysa → cember durur → egitmen sessizce yanina gider → grup bekler.'
  },
  {
    stage: 'Asama 11',
    time: 'Son 30 dk',
    title: 'Kapanis Konusmasi',
    script:
      '"Bu deneyimden tasiyacaginiz tek cumle nedir?" → Herkes bir cumle paylasiyor → Toplu dua → Sertifika seremonisi. Kapalis: "Buraya gelen insanlar daha guclu ayrilmaz. Daha dogru bir yere yerlesir. O yer, kulluktur."',
    responses: [
      "\"Yeterli degilim\" hisseden: 'Bu deneyim bitmedi. Simdi basliyor.'",
      'Gozyaslari: Izin ver. Duayla kapatalim.',
      '\"Buradakiler degisecek mi?\" sorusu: \'Sen karar veriyorsun. Bu araclari aldın.\''
    ],
    alt: 'Buyuk grupta sertifikalar bireysel verilemezse: toplu kutlama seremonisi',
    microSkill: 'Anlam pekistirme: Her katilimcinin soyledigi cumleyi bir kelimeyle tekrar et ve tesekkur et.'
  }
];

// AC-FR-E8-05-02: hard scenario shortcuts — aligned with Mutlak.docx Asama 9 scenarios
const HARD_SCENARIOS = [
  {
    label: 'Aglamak / Duygusal kriz',
    action: 'Grup durur. Egitmen sessizce yanina gider. "Bu alan guvenli" der. Devam etmeye zorlamayin. Bireysel alan acin.'
  },
  {
    label: 'Katilimci kapaniyor / konusmak istemiyor',
    action: '"Sessizlik de bir cevaptir" deyin. Zorlama. Calisma kagidini bireysel doldurmaya yonlendirin.'
  },
  {
    label: 'Alay etmek / entelektuel savunma',
    action: '"Buradaki sorgulama bence degerli" deyin. Dogrudan kisiyle tartismayin. Grubu kendi deneyimine dondurun.'
  },
  {
    label: 'Tartisma / grup polarizasyonu',
    action: 'Kural hatirlatmasi: "Burada yanlis cevap yok." Taraflar yerine deneyime donun: "Siz bu konuyu nasil yasadınız?"'
  },
  {
    label: 'Katilimci cikip gitmek istiyor',
    action: 'Sessizce izin verin. Kapali grup tutumunu koruyun. Grupla devam edin.'
  },
  {
    label: 'Dini bilgisi cok yuksek katilimci domine ediyor',
    action: '"Tesekkurler — simdi herkesin kendi deneyimine donmesini istiyorum" deyin. Egitmen konuyu yonlendirir.'
  },
  {
    label: 'Teknik sorun / internet kesintisi',
    action: '5 dk mola. Alternatif cihaza gec veya bireysel calismaya gecis yap.'
  }
];

const ContentWorkshopGuideContent = ({ workshopId, isOffline }: { workshopId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

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

      {/* AC-FR-E8-05-01: minute-by-minute flow with stage references */}
      {GUIDE_SECTIONS.map((sec, idx) => (
        <SectionCard key={sec.time} title={sec.stage + ' · ' + sec.time + ' — ' + sec.title}>
          <PChip compact style={styles.stageChip}>
            {sec.stage}
          </PChip>
          <PText variant="bodyMedium" style={[styles.scriptText, facilitatorMode && styles.scriptTextLarge]}>
            {sec.script}
          </PText>
          <PDivider style={styles.divider} />
          <PText variant="labelSmall" style={styles.sectionLabel}>
            Olasi Katilimci Tepkileri
          </PText>
          {sec.responses.map((r, ri) => (
            <PText key={ri} variant="bodySmall" style={styles.responseText}>
              · {r}
            </PText>
          ))}
          <PDivider style={styles.divider} />
          <PText variant="labelSmall" style={styles.sectionLabel}>
            Mikro Beceri
          </PText>
          <PText variant="bodySmall" style={styles.microSkillText}>
            {sec.microSkill}
          </PText>
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

      {/* AC-FR-E8-05-02: hard scenario shortcuts — from Mutlak.docx Asama 9 */}
      <SectionCard title="Zor Senaryo Kisayollari (7 Senaryo)">
        {HARD_SCENARIOS.map((sc, idx) => (
          <View key={sc.label} style={styles.scenarioRow}>
            <PText variant="titleSmall" style={styles.scenarioLabel}>
              {sc.label}
            </PText>
            <PText variant="bodySmall" style={styles.scenarioAction}>
              {sc.action}
            </PText>
            {idx < HARD_SCENARIOS.length - 1 && <PDivider style={styles.divider} />}
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

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    roleTag: {
      flexDirection: 'row',
      gap: spacing[1],
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
      marginTop: spacing[1],
      color: '#F57C00'
    },
    scriptText: {
      lineHeight: 22,
      fontStyle: 'italic'
    },
    scriptTextLarge: {
      fontSize: fontSizes['3xl'],
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
    stageChip: {
      alignSelf: 'flex-start',
      marginBottom: 10,
      backgroundColor: '#283593'
    },
    microSkillText: {
      fontStyle: 'italic',
      color: '#F57C00',
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
      fontWeight: fontWeights.bold,
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
}
