import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getWorkshopById, getWorkshopCampDays, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-04-01/02: Camp day + session structure — aligned with Mutlak.docx 3-Day Camp
// Day 1: TESPİT (Discovery) — "Ben gerçekten neye güveniyorum?"
// Day 2: ÇÖZÜM (Solution) — Verse/hadith transformation + prayer practice
// Day 3: İNŞA (Building) — Daily life plan + 30-day character system
const CAMP_DAYS = getWorkshopCampDays();
const CAMP_TITLE = CAMP_DAYS.length > 0 ? `${CAMP_DAYS.length} Gunluk Kamp` : 'Kamp';

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
  const campDaySummary = useMemo(() => {
    if (CAMP_DAYS.length === 0) return 'Kamp gunleri henuz tanimlanmadi.';
    return CAMP_DAYS.map(day => day.label).join(' · ');
  }, []);
  const campProgramSummary = useMemo(() => {
    if (CAMP_DAYS.length === 0) return 'Bu atolye icin kamp plani yakinda eklenecek.';

    const totalSessions = CAMP_DAYS.reduce((sum, day) => sum + day.sessions.length, 0);
    const slotSet = new Set(CAMP_DAYS.flatMap(day => day.sessions.map(session => session.slot)));
    const orderedSlots = ['Sabah', 'Ogle', 'Aksam'].filter(slot => slotSet.has(slot));
    const slotLabel = orderedSlots.length > 0 ? orderedSlots.join(', ').toLowerCase() : 'planlanan';
    return `Programda ${CAMP_DAYS.length} gun ve toplam ${totalSessions} oturum var. Her gun ${slotLabel} oturumlarini tamamlayarak ilerle.`;
  }, []);

  const handleComplete = (sessionId: string) => {
    setCompleted(prev => ({ ...prev, [sessionId]: true }));
  };

  const dayData = CAMP_DAYS[activeDay] ?? CAMP_DAYS[0];
  if (!dayData) {
    return (
      <SectionCard title={'Kamp — ' + (workshop?.title ?? 'Atolye')}>
        <StateMessage
          title="Kamp plani bulunamadi"
          description="Bu atolye icin kamp gunleri henuz tanimlanmamis."
          icon="campfire"
          tone="warning"
        />
      </SectionCard>
    );
  }
  const dayCompletedCount = dayData.sessions.filter(s => completed[s.id]).length;
  const isDayDone = dayCompletedCount === dayData.sessions.length;

  return (
    <>
      <SectionCard title={CAMP_TITLE + ' — ' + (workshop?.title ?? 'Atolye')}>
        <PText variant="bodySmall" style={styles.campDesc}>
          {campDaySummary}
        </PText>
        <PText variant="bodySmall" style={styles.campDesc}>
          {campProgramSummary}
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
      <ScreenLayout title={CAMP_TITLE} subtitle="Yukleniyor">
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
      <ScreenLayout title={CAMP_TITLE} subtitle="Icerik bulunamadi">
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
      <ScreenLayout title={CAMP_TITLE} subtitle="Bir sorun olustu">
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
      <ScreenLayout title={CAMP_TITLE} subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopCampContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={CAMP_TITLE} subtitle="Kamp oturum plani">
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
