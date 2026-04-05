import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PText } from '../../components';
import {
  getContentItemsForParent,
  getContentProgressForUser,
  getPrimaryUser,
  getWorkshopById,
  getWorkshops
} from '../../data/mockSelectors';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

const STAGE_COUNT = 11;
const CAMP_DAYS = 3;

// Simulated stage type labels for display (AC-FR-E8-02-02)
const STAGE_LABELS: Record<number, string> = {
  1: 'Referans',
  2: 'Icgoru',
  3: 'Referans',
  4: 'Icgoru',
  5: 'Referans',
  6: 'Icgoru',
  7: 'Entegrasyon',
  8: 'Kamp',
  9: 'Rehber',
  10: 'Calisma Kitabi',
  11: 'Kapanis'
};

const ContentWorkshopDetailContent = ({ workshopId, isOffline }: { workshopId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  // AC-FR-E8-01-03: role-based CTA -- "facilitator" role triggers guide CTA
  const isFacilitator = user?.role === 'facilitator';
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const sections = getContentItemsForParent('workshop', workshop?.id);
  const progressList = getContentProgressForUser(user?.id);
  // AC-FR-E8-01-04: show last synced stage/session
  const workshopProgress = progressList.find((p: any) => p.content_id === workshop?.id);
  const isStarted = !!workshopProgress?.started_at;
  const isCompleted = !!workshopProgress?.completed_at;
  const completedCount = sections.filter(
    (s: any) => progressList.find((p: any) => p.content_id === s.id)?.status === 'completed'
  ).length;
  const lastSection = completedCount > 0 ? sections[completedCount - 1] : null;

  const handlePrimary = () => {
    if (isFacilitator) {
      // AC-FR-E8-01-03: facilitator opens guide
      navigation.navigate('Content', {
        screen: 'ContentWorkshopGuide',
        params: { id: workshop?.id }
      });
    } else {
      navigation.navigate('Content', {
        screen: 'ContentWorkshopHome',
        params: { id: workshop?.id }
      });
    }
  };

  return (
    <>
      {/* AC-FR-E8-01-01: title, theme, conversion goal, target audience, duration, references */}
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>{'\uD83C\uDFDB'}</PText>
        <PText variant="headlineMedium" style={styles.heroTitle}>
          {workshop?.title ?? 'Atolye'}
        </PText>
        <PText variant="bodyMedium" style={styles.heroDesc}>
          {workshop?.description ?? 'Canli uygulamalar, paylasim ve destekleyici egzersizlerle ilerleyen bir atolye.'}
        </PText>
      </View>

      {/* AC-FR-E8-01-02: stage count, camp days, workbook, guide labels */}
      <SectionCard title="Yapi Ozeti">
        <View style={styles.chipRow}>
          <PChip style={styles.chip}>{STAGE_COUNT} asama</PChip>
          <PChip style={styles.chip}>{CAMP_DAYS} gun kamp</PChip>
          <PChip style={styles.chip}>Calisma kitabi var</PChip>
          <PChip style={styles.chip}>Egitmen rehberi var</PChip>
        </View>
        <PDivider style={styles.divider} />
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>
            Hedef kitle
          </PText>
          <PText variant="bodySmall">Kisisel gelisim arayanlar</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>
            Toplam sure
          </PText>
          <PText variant="bodySmall">3 gun + 7 oncesi asama</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>
            Referans
          </PText>
          <PText variant="bodySmall">Kuran ve sunnet destekli icerik</PText>
        </View>
      </SectionCard>

      {/* AC-FR-E8-01-04: last visited stage summary */}
      {isStarted && lastSection ? (
        <SectionCard title="Kaldigin Yer">
          <PText variant="bodySmall" style={styles.subtleText}>
            Son asama: {lastSection.title ?? 'Asama ' + completedCount}
          </PText>
          <PText variant="bodySmall" style={styles.subtleText}>
            {completedCount}/{sections.length} bolum tamamlandi
          </PText>
          {isOffline && (
            <PText variant="labelSmall" style={styles.offlineNote}>
              Son senkronize edilmis veri gosteriliyor.
            </PText>
          )}
        </SectionCard>
      ) : null}

      {/* Stage type preview */}
      <SectionCard title="Asama Plani">
        {Object.entries(STAGE_LABELS).map(([num, label]) => (
          <View key={num} style={styles.stageRow}>
            <PText variant="labelMedium" style={styles.stageNum}>
              {num}.
            </PText>
            <PText variant="bodySmall" style={styles.stageLabel}>
              {label}
            </PText>
          </View>
        ))}
      </SectionCard>

      {/* AC-FR-E8-01-03: role-based primary CTA */}
      <SectionCard title="">
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.primaryButton}
          onPress={handlePrimary}
          accessibilityLabel={isFacilitator ? 'Rehberi Ac' : isStarted ? 'Devam Et' : 'Basla'}
        >
          {isFacilitator ? 'Rehberi Ac' : isStarted ? 'Devam Et' : 'Basla'}
        </PButton>
        {!isFacilitator && (
          <PButton
            mode="outlined"
            disabled={isOffline}
            style={styles.secondaryButton}
            onPress={() =>
              navigation.navigate('Content', {
                screen: 'ContentWorkshopCompletion',
                params: { id: workshop?.id }
              })
            }
          >
            {isCompleted ? 'Arsivi Gor' : 'Tamamlama Ekrani'}
          </PButton>
        )}
      </SectionCard>
    </>
  );
};

export const ContentWorkshopDetailScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Atolye" subtitle="Yukleniyor">
        <SectionCard title="Atolye Bilgisi">
          <PActivityIndicator animating />
          <SkeletonBlock height={24} />
          <SkeletonBlock height={16} />
        </SectionCard>
        <SectionCard title="Yapi Ozeti">
          <SkeletonBlock height={36} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Atolye" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Atolye bulunamadi"
          description="Bu atolye su anda erisebilir degil."
          actionLabel="Kesfet"
          icon="account-group-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Atolye" subtitle="Bir sorun olustu">
        <StateMessage
          title="Atolye yuklenemedi"
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
      <ScreenLayout title="Atolye" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopDetailContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atolye" subtitle="Atolye detayi">
      <ContentWorkshopDetailContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 12
  },
  heroTitle: {
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 8
  },
  heroDesc: {
    textAlign: 'center',
    opacity: 0.75,
    lineHeight: 22
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12
  },
  chip: {
    marginBottom: 4
  },
  divider: {
    marginVertical: 10
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6
  },
  metaLabel: {
    opacity: 0.6
  },
  subtleText: {
    opacity: 0.7,
    marginTop: 4
  },
  offlineNote: {
    marginTop: 8,
    opacity: 0.55,
    fontStyle: 'italic'
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  stageNum: {
    width: 28,
    opacity: 0.5
  },
  stageLabel: {
    flex: 1
  },
  primaryButton: {
    marginTop: 8
  },
  secondaryButton: {
    marginTop: 10
  }
});
