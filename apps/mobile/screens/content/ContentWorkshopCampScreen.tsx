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

// AC-FR-E8-04-01/02: Camp day + session structure
const CAMP_DAYS = [
  {
    day: 1,
    label: '1. Gun',
    sessions: [
      {
        id: 'd1-sabah',
        slot: 'Sabah',
        title: 'Acilis ve Niyet',
        purpose: 'Katilimcilari hazirlamak ve niyet belirlemek',
        duration: '60 dk',
        flow: 'Karsilama, tanisma, kural belirleme, niyet yazimi',
        output: 'Kisisel niyet karti',
        worksheets: ['Niyet Formu'],
        completed: false
      },
      {
        id: 'd1-ogle',
        slot: 'Ogle',
        title: 'Referans Okuma ve Tartisma',
        purpose: 'Kuransal referanslari hayata tasimak',
        duration: '90 dk',
        flow: 'Okuma, kucuk grup tartismasi, paylasim',
        output: 'Ayet cikti notu',
        worksheets: ['Ayet Yansima Sayfasi'],
        completed: false
      },
      {
        id: 'd1-aksam',
        slot: 'Aksam',
        title: 'Butunleme ve Kapalis',
        purpose: 'Gunun kazanimlarini butunlestirmek',
        duration: '45 dk',
        flow: 'Ozet, gunluk yazmak, kapalis duasi',
        output: 'Gun ozeti',
        worksheets: [],
        completed: false
      }
    ]
  },
  {
    day: 2,
    label: '2. Gun',
    sessions: [
      {
        id: 'd2-sabah',
        slot: 'Sabah',
        title: 'Derin Ic Calisma',
        purpose: 'Psikoloji koprulerini pratikte uygulamak',
        duration: '75 dk',
        flow: 'Meditasyon, kisisel yansima, ikili paylasim',
        output: 'Ic calisma notu',
        worksheets: ['Burden Haritasi'],
        completed: false
      },
      {
        id: 'd2-ogle',
        slot: 'Ogle',
        title: 'Grup Uygulamasi',
        purpose: 'Toplulukla pratik yapmak',
        duration: '90 dk',
        flow: 'Egzersiz, rol calismalari, geri bildirim',
        output: 'Grup uygulama ozeti',
        worksheets: ['Ic Cumle Donusum Tablosu'],
        completed: false
      },
      {
        id: 'd2-aksam',
        slot: 'Aksam',
        title: 'Duygusal Isleme',
        purpose: 'Gunun duygusal yogunlugunu islemek',
        duration: '60 dk',
        flow: 'Duygu paylasimi, tevekkul egzersizi, sessizlik',
        output: 'Duygu notu',
        worksheets: ['Tevekkul Dengesi'],
        completed: false
      }
    ]
  },
  {
    day: 3,
    label: '3. Gun',
    sessions: [
      {
        id: 'd3-sabah',
        slot: 'Sabah',
        title: 'Entegrasyon',
        purpose: 'Tum gunlerin kazanimlarini birlestirir',
        duration: '90 dk',
        flow: 'Kisisel ozet, icerik haritalama, paylasim',
        output: 'Kisisel entegrasyon haritasi',
        worksheets: ['Butunleme Formu'],
        completed: false
      },
      {
        id: 'd3-ogle',
        slot: 'Ogle',
        title: 'Taahhu ve Niyet',
        purpose: '30 gunluk plan icin taahhut',
        duration: '75 dk',
        flow: 'Kucuk adimlar yazimi, partner check-in, imza',
        output: '30 Gunluk niyet plani',
        worksheets: ['Donus Plani'],
        completed: false
      },
      {
        id: 'd3-aksam',
        slot: 'Aksam',
        title: 'Kapanis ve Sertifika',
        purpose: 'Kutlama ve anlam pekistirme',
        duration: '60 dk',
        flow: 'Paylasim, dua, sertifika seremonisi',
        output: 'Katilim belgesi',
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
      <SectionCard title={'3 Gunluk Kamp -- ' + (workshop?.title ?? 'Atolye')}>
        <PText variant="bodySmall" style={styles.campDesc}>
          3 gunde her gun sabah, ogle ve aksam oturumlarini tamamla.
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
      <SectionCard title={dayData.label + ' Oturumlari'}>
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
