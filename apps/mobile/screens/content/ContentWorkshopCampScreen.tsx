import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PText } from '../../components';
import { getPrimaryUser, getWorkshopById, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-04-01/02: Camp day + session structure — aligned with Mutlak.docx 3-Day Camp
// Day 1: TESPİT (Discovery) — "Ben gerçekten neye güveniyorum?"
// Day 2: ÇÖZÜM (Solution) — Verse/hadith transformation + prayer practice
// Day 3: İNŞA (Building) — Daily life plan + 30-day character system
const CAMP_DAYS = [
  {
    day: 1,
    label: '1. Gun — Tespit',
    theme: 'Kontrol illüzyonu ve ic kibir haritasi',
    sessions: [
      {
        id: 'd1-sabah',
        slot: 'Sabah',
        title: 'Acilis: Ben Gercekten Neye Guveniyorum?',
        purpose: 'Katilimcilari hazirlamak; gizli guven kaynaklarini yuzey altinda tespit etmek',
        duration: '60 dk',
        flow: 'Karsilama + kural belirleme → niyet yazimi → "Hayatimda kontrolu birakmakta zorlandigim 3 alan" egzersizi → ikili paylasim',
        output: 'Kisisel niyet karti + ilk tespit notu',
        worksheets: ['Niyet Formu', 'Benim Dayanaklarim Haritasi'],
        completed: false
      },
      {
        id: 'd1-ogle',
        slot: 'Ogle',
        title: 'Kontrol Illüzyonu Calismalari',
        purpose: 'Sahte buyukluk ve kontrol baskisinin kaynagini gorunur kilmak',
        duration: '90 dk',
        flow: 'Fatir 15 uzerinde derin okuma → "Kontrolumde oldugunu sandim ama olmayan" tablosu → Beck bilissel carpitma analizi → grup tartismasi',
        output: 'Kontrol illüzyonu tablosu (doldurulmus)',
        worksheets: ['Kontrol Illuzyonum Tablosu'],
        completed: false
      },
      {
        id: 'd1-aksam',
        slot: 'Aksam',
        title: 'Ic Kibir Haritasi ve Gunun Ozeti',
        purpose: 'Kibrin farkinda olunmayan bicimlerini haritalandirmak; gunu butunlestirmek',
        duration: '60 dk',
        flow: 'Ic kibir haritasi calismas → sessizlik aninda yansima → gunluk yazimi → kapalis duasi (Fatir 15 ile)',
        output: 'Ic kibir haritasi + gun ozeti',
        worksheets: ['Ic Kibir Haritasi'],
        completed: false
      }
    ]
  },
  {
    day: 2,
    label: '2. Gun — Cozum',
    theme: 'Ayet ve hadislerle donusum + dua pratigi',
    sessions: [
      {
        id: 'd2-sabah',
        slot: 'Sabah',
        title: 'Ayet ve Hadislerle Donusum',
        purpose: 'Birinci gunun tespitlerini Kurani hakikatlerle donusturmek',
        duration: '90 dk',
        flow: 'Bakara 255 (Kayyumiyet) derinlemesine → Rahman 29 (sen) → "Dun tespit ettigim yukler artik kimin elinde?" sorusu → Ic cumle donusum calismas',
        output: 'Donusturulmus ic cumleler (calisma kagidinda)',
        worksheets: ['Ic Cumle Donusum Tablosu'],
        completed: false
      },
      {
        id: 'd2-ogle',
        slot: 'Ogle',
        title: 'Derin Dua Pratigi',
        purpose: 'Duayi bilgi olmaktan cikarmak, kalbin temel istikameti haline getirmek',
        duration: '90 dk',
        flow: 'Mu\'min 60 analizi (dua = ibadet) → sesli dua egzersizi (bireysel) → Esma bilinci: Allah\'a hangi isimle yoneliyorum? → partner check-in',
        output: 'Kisisel dua karti (kalp sesi ile yazilmis)',
        worksheets: ['Dua Gunlugu', 'Kriz Ani Dua Karti'],
        completed: false
      },
      {
        id: 'd2-aksam',
        slot: 'Aksam',
        title: 'Teslimiyet Egzersizleri',
        purpose: 'Tevekkulu kelime olmaktan cikarmak, bedensel ve duygusal pratiğe donusturmek',
        duration: '60 dk',
        flow: 'Tevekkul dengesi calismas → "Birakabilirim / Birakamam" ayrimi → Fatir 41 (imsak) uzerine sessizlik → duygusal isleme paylasimi → gun kapanisi',
        output: 'Tevekkul dengesi calisma kagidi',
        worksheets: ['Tevekkul Dengesi'],
        completed: false
      }
    ]
  },
  {
    day: 3,
    label: '3. Gun — Insa',
    theme: '21 gunluk donusum plani + karakter insasi',
    sessions: [
      {
        id: 'd3-sabah',
        slot: 'Sabah',
        title: 'Gunluk Hayat Plani',
        purpose: 'Kamp kazanimlarini gundelik rutinlere entegre etmek',
        duration: '90 dk',
        flow: 'Kisisel ozet: "2 gunde ne degisti?" → aile/arkadaslik/yalnizlik/kriz icin birer aksiyon → entegrasyon haritasi → paylasim',
        output: 'Kisisel entegrasyon haritasi',
        worksheets: ['Entegrasyon Haritasi'],
        completed: false
      },
      {
        id: 'd3-ogle',
        slot: 'Ogle',
        title: '21 Gunluk ve 30 Gunluk Sistem',
        purpose: 'Surdurulebilir karakter insasi icin somut eylem plani olusturmak',
        duration: '90 dk',
        flow: '21 gunluk donusum plani doldurmak → 30 gunluk karakter insa cizelgesi → partner taahhut seremonisi → imza ritueli',
        output: '21 gunluk plan + 30 gunluk cizelge (imzalanmis)',
        worksheets: ['21 Gunluk Donusum Plani', '30 Gunluk Karakter Insa Cizelgesi'],
        completed: false
      },
      {
        id: 'd3-aksam',
        slot: 'Aksam',
        title: 'Kapanis Seremonisi ve Katilim Belgesi',
        purpose: 'Kutlama, anlam pekistirme ve yeni baslangic',
        duration: '60 dk',
        flow: '"Bu kamptan tasiyacagim tek cumle" paylasimi → toplu dua → sertifika seremonisi → vedalar',
        output: 'Katilim belgesi + kisisel kapalis cumlesi',
        worksheets: [],
        completed: false
      }
    ]
  }
];

type SessionCardProps = {
  session: (typeof CAMP_DAYS)[0]['sessions'][0];
  isOffline: boolean;
  onComplete: (id: string) => void;
  isCompleted: boolean;
};

const SessionCard = ({ session, isOffline, onComplete, isCompleted }: SessionCardProps) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.sessionCard}>
      <TouchableOpacity
        onPress={() => setExpanded(v => !v)}
        style={styles.sessionHeader}
        accessibilityRole="button"
        accessibilityLabel={session.slot + ' oturumu ' + session.title}
      >
        <PChip style={styles.slotChip} compact>
          {session.slot}
        </PChip>
        <PText variant="titleSmall" style={styles.sessionTitle}>
          {session.title}
        </PText>
        <PText variant="labelSmall" style={styles.duration}>
          {session.duration}
        </PText>
        {isCompleted && <PText style={styles.doneCheck}>OK</PText>}
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sessionDetail}>
          <PDivider style={styles.divider} />
          {/* AC-FR-E8-04-02: purpose, flow, output, worksheets */}
          <View style={styles.detailRow}>
            <PText variant="labelSmall" style={styles.detailLabel}>
              Amac
            </PText>
            <PText variant="bodySmall" style={styles.detailText}>
              {session.purpose}
            </PText>
          </View>
          <View style={styles.detailRow}>
            <PText variant="labelSmall" style={styles.detailLabel}>
              Temel Akis
            </PText>
            <PText variant="bodySmall" style={styles.detailText}>
              {session.flow}
            </PText>
          </View>
          <View style={styles.detailRow}>
            <PText variant="labelSmall" style={styles.detailLabel}>
              Beklenen Cikti
            </PText>
            <PText variant="bodySmall" style={styles.detailText}>
              {session.output}
            </PText>
          </View>
          {session.worksheets.length > 0 && (
            <View style={styles.detailRow}>
              <PText variant="labelSmall" style={styles.detailLabel}>
                Calisma Kagidi
              </PText>
              <PText variant="bodySmall" style={styles.detailText}>
                {session.worksheets.join(', ')}
              </PText>
            </View>
          )}
          {/* AC-FR-E8-04-04: mark completed */}
          {!isCompleted && (
            <PButton
              mode="contained"
              compact
              disabled={isOffline}
              style={styles.completeBtn}
              onPress={() => onComplete(session.id)}
            >
              Oturumu Tamamla
            </PButton>
          )}
        </View>
      )}
    </View>
  );
};

const ContentWorkshopCampContent = ({ workshopId, isOffline }: { workshopId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const [activeDay, setActiveDay] = useState(0);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const handleComplete = (sessionId: string) => {
    setCompleted(prev => ({ ...prev, [sessionId]: true }));
  };

  const dayData = CAMP_DAYS[activeDay];
  const dayCompletedCount = dayData.sessions.filter(s => completed[s.id]).length;
  const isDayDone = dayCompletedCount === dayData.sessions.length;

  return (
    <>
      <SectionCard title={'3 Gunluk Kamp — ' + (workshop?.title ?? 'Atolye')}>
        <PText variant="bodySmall" style={styles.campDesc}>
          Gun 1: Tespit · Gun 2: Cozum · Gun 3: Insa
        </PText>
        <PText variant="bodySmall" style={styles.campDesc}>
          Her gun sabah, ogle ve aksam oturumlarini tamamla. Kamp, atolyenin en kritik asamasidir.
        </PText>
      </SectionCard>

      {/* AC-FR-E8-04-01: Day tabs */}
      <View style={styles.tabRow}>
        {CAMP_DAYS.map((d, i) => (
          <TouchableOpacity
            key={d.day}
            style={[styles.tab, activeDay === i && styles.tabActive]}
            onPress={() => setActiveDay(i)}
            accessibilityRole="tab"
            accessibilityLabel={d.label}
          >
            <PText variant="labelMedium" style={[styles.tabLabel, activeDay === i && styles.tabLabelActive]}>
              {d.label}
            </PText>
          </TouchableOpacity>
        ))}
      </View>

      {/* AC-FR-E8-04-01/02/03: sessions for selected day */}
      <SectionCard title={dayData.label + ' — ' + dayData.theme}>
        <PText variant="labelSmall" style={styles.dayProgress}>
          {dayCompletedCount}/{dayData.sessions.length} oturum tamamlandi
        </PText>
        {dayData.sessions.map(session => (
          <SessionCard
            key={session.id}
            session={session}
            isOffline={!!isOffline}
            onComplete={handleComplete}
            isCompleted={!!completed[session.id]}
          />
        ))}
        {/* AC-FR-E8-04-04: day summary when done */}
        {isDayDone && (
          <View style={styles.daySummary}>
            <PDivider style={styles.divider} />
            <PText variant="titleSmall" style={styles.daySummaryTitle}>
              Gun Tamamlandi!
            </PText>
            <PText variant="bodySmall" style={styles.daySummaryText}>
              {activeDay < 2 ? 'Yarin devam et.' : 'Tum kamp gunleri tamamlandi. Tamamlama ekranini goruntule.'}
            </PText>
            {activeDay < 2 ? (
              <PButton
                mode="outlined"
                style={styles.nextDayBtn}
                disabled={isOffline}
                onPress={() => setActiveDay(activeDay + 1)}
              >
                Sonraki Gun
              </PButton>
            ) : (
              <PButton
                mode="contained"
                style={styles.nextDayBtn}
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate('Content', {
                    screen: 'ContentWorkshopCompletion',
                    params: { id: workshopId }
                  })
                }
              >
                Tamamlama Ekrani
              </PButton>
            )}
          </View>
        )}
      </SectionCard>

      <SectionCard title="Hizli Erisim">
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.quickLink}
          onPress={() =>
            navigation.navigate('Content', {
              screen: 'ContentWorkshopGuide',
              params: { id: workshopId }
            })
          }
        >
          Egitmen Rehberi
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.quickLink}
          onPress={() =>
            navigation.navigate('Content', {
              screen: 'ContentWorkshopWorkbook',
              params: { id: workshopId }
            })
          }
        >
          Calisma Kitabi
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopCampScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Yukleniyor">
        <SectionCard title="Kamp Plani">
          <PActivityIndicator animating />
          <SkeletonBlock height={36} />
        </SectionCard>
        <SectionCard title="Oturumlar">
          {[1, 2, 3].map(i => (
            <SkeletonBlock key={i} height={56} />
          ))}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Kamp icerigi bulunamadi"
          description="Bu atolye icin kamp programi henuz erisebilir degil."
          actionLabel="Asama Listesine Don"
          icon="campfire"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Bir sorun olustu">
        <StateMessage
          title="Kamp yuklenemedi"
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
      <ScreenLayout title="3 Gunluk Kamp" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopCampContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="3 Gunluk Kamp" subtitle="Kamp oturum plani">
      <ContentWorkshopCampContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    campDesc: {
      opacity: 0.7,
      lineHeight: 20
    },
    tabRow: {
      flexDirection: 'row',
      marginHorizontal: 16,
      marginBottom: 0,
      gap: spacing[1]
    },
    tab: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: radii.md,
      alignItems: 'center',
      backgroundColor: '#F0F0F0'
    },
    tabActive: {
      backgroundColor: '#7C4DFF'
    },
    tabLabel: {
      color: '#555'
    },
    tabLabelActive: {
      color: '#FFF',
      fontWeight: fontWeights.bold
    },
    dayProgress: {
      opacity: 0.6,
      marginBottom: 10
    },
    sessionCard: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: radii.md,
      marginBottom: 10,
      overflow: 'hidden'
    },
    sessionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing[1.5],
      gap: spacing[1],
      flexWrap: 'wrap'
    },
    slotChip: {
      height: 24,
      marginRight: 4
    },
    sessionTitle: {
      flex: 1
    },
    duration: {
      opacity: 0.55
    },
    doneCheck: {
      color: '#4CAF50',
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold
    },
    sessionDetail: {
      paddingHorizontal: spacing[1.5],
      paddingBottom: 12
    },
    divider: {
      marginVertical: 8
    },
    detailRow: {
      marginBottom: 6
    },
    detailLabel: {
      opacity: 0.55,
      marginBottom: 2
    },
    detailText: {
      lineHeight: 20
    },
    completeBtn: {
      marginTop: 10,
      alignSelf: 'flex-start'
    },
    daySummary: {
      marginTop: 4
    },
    daySummaryTitle: {
      color: '#4CAF50',
      fontWeight: fontWeights.bold,
      marginBottom: 4
    },
    daySummaryText: {
      opacity: 0.7,
      marginBottom: spacing[1]
    },
    nextDayBtn: {
      alignSelf: 'flex-start'
    },
    quickLink: {
      marginBottom: 10
    }
  });
}
