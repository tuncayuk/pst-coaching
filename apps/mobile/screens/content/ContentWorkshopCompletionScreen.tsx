import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PProgressBar, PText } from '../../components';
import {
  getAchievements,
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

const STAGE_LABELS: Record<number, string> = {
  1: 'Referans',
  2: 'Icgoru',
  3: 'Referans',
  4: 'Icgoru',
  5: 'Referans',
  6: 'Icgoru',
  7: 'Entegrasyon',
  8: '3-Gun Kamp',
  9: 'Egitmen Rehberi',
  10: 'Calisma Kitabi',
  11: 'Kapanis'
};

const ContentWorkshopCompletionContent = ({ workshopId, isOffline }: { workshopId?: string; isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const sections = getContentItemsForParent('workshop', workshop?.id);
  const progressList = getContentProgressForUser(user?.id);
  const achievements = getAchievements().filter((a: any) => a.user_id === user?.id);

  const completedSections = sections.filter(
    (s: any) => progressList.find((p: any) => p.content_id === s.id)?.status === 'completed'
  ).length;
  const totalSections = sections.length;
  const progressRatio = totalSections > 0 ? completedSections / totalSections : 0;

  // AC-FR-E8-08-01: workshop is done when all mandatory stages completed
  const workshopCompleted = progressRatio >= 1.0;
  const artifactCount = 5; // simulated -- workbook sheets + notes
  const hasFollowUpPlan = true; // simulated

  return (
    <>
      {/* Celebration header */}
      <View style={styles.celebrationBlock}>
        <PText style={styles.celebrationEmoji}>{workshopCompleted ? '[Kupa]' : '[Filiz]'}</PText>
        <PText variant="headlineMedium" style={styles.celebrationTitle}>
          {workshopCompleted ? 'Atolye Tamamlandi!' : 'Atolye Devam Ediyor'}
        </PText>
        <PText variant="bodyMedium" style={styles.celebrationDesc}>
          {workshopCompleted
            ? 'Mukemmel bir yolculugu tamamladin. Arsivinde her zaman erisebilirsin.'
            : 'Kalan asamalari tamamlaman otalye sertifikani aciklayacak.'}
        </PText>
      </View>

      {/* AC-FR-E8-08-02: stage/session completion summary */}
      <SectionCard title="Tamamlanma Ozeti">
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>
            Tamamlanan Asama
          </PText>
          <PText variant="bodyMedium">
            {completedSections} / {totalSections}
          </PText>
        </View>
        <PProgressBar progress={progressRatio} style={styles.progressBar} />
        <PDivider style={styles.divider} />
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>
            Uretilen Artefact
          </PText>
          <PText variant="bodyMedium">{artifactCount} belge</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>
            Secili Takip Plani
          </PText>
          <PText variant="bodyMedium">{hasFollowUpPlan ? 'Olusturuldu' : 'Henuz olusturulmadi'}</PText>
        </View>
        {!hasFollowUpPlan && (
          <PButton
            mode="text"
            compact
            style={styles.createPlanBtn}
            onPress={() =>
              navigation.navigate('Content', {
                screen: 'ContentWorkshopFollowUp',
                params: { id: workshopId }
              })
            }
          >
            Takip Plani Olustur
          </PButton>
        )}
      </SectionCard>

      {/* Stage completion detail */}
      <SectionCard title="Asama Detayi">
        {Object.entries(STAGE_LABELS).map(([num, label]) => {
          const stageNum = parseInt(num, 10);
          const section = sections[stageNum - 1];
          const isDone =
            stageNum <= completedSections ||
            progressList.some((p: any) => p.content_id === section?.id && p.status === 'completed');
          return (
            <View key={num} style={styles.stageRow}>
              <PText style={[styles.stageNum, isDone && styles.stageNumDone]}>{isDone ? 'OK' : String(num)}</PText>
              <PText variant="bodySmall" style={[styles.stageLabel, !isDone && styles.stagePending]}>
                {label}
              </PText>
            </View>
          );
        })}
      </SectionCard>

      {/* AC-FR-E8-08-03: certificate / badge */}
      {workshopCompleted ? (
        <SectionCard title="Sertifika ve Rozet">
          <View style={styles.badgeRow}>
            <PText style={styles.badgeEmoji}>[Altin]</PText>
            <View style={styles.badgeInfo}>
              <PText variant="titleSmall">Atolye Tamamlama Rozeti</PText>
              <PText variant="bodySmall" style={styles.badgeDesc}>
                {workshop?.title ?? 'Atolye'} basariyla tamamlandi.
              </PText>
            </View>
          </View>
          <PChip style={styles.certChip}>Ucretsiz Sertifika</PChip>
          <PButton mode="outlined" style={styles.shareBtn} disabled={isOffline} onPress={() => {}}>
            Sertifikayi Paylas
          </PButton>
        </SectionCard>
      ) : (
        <SectionCard title="Tamamlama Rozeti">
          <PText variant="bodySmall" style={styles.pendingBadge}>
            Tum zorunlu asamalari tamamladiginda rozet kazanilacak.
          </PText>
        </SectionCard>
      )}

      {/* AC-FR-E8-08-04: re-openable from Library / Archive */}
      <SectionCard title="Arsive Erisim">
        <PText variant="bodySmall" style={styles.archiveDesc}>
          Bu atolye Kutuphane ve Favoriler/Arsiv bolumlerinden yeniden acilabilir.
        </PText>
        <View style={styles.archiveButtons}>
          <PButton
            mode="contained"
            disabled={isOffline}
            style={styles.archiveBtn}
            onPress={() => navigation.navigate('Library', { screen: 'LibraryWorkshops' })}
          >
            Kutuphanede Gor
          </PButton>
          <PButton
            mode="outlined"
            disabled={isOffline}
            style={styles.archiveBtn}
            onPress={() =>
              navigation.navigate('Content', {
                screen: 'ContentWorkshopHome',
                params: { id: workshopId }
              })
            }
          >
            Asamalara Don
          </PButton>
        </View>
      </SectionCard>
    </>
  );
};

export const ContentWorkshopCompletionScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Atolye Tamamlama" subtitle="Yukleniyor">
        <SectionCard title="Ozet">
          <PActivityIndicator animating />
          <SkeletonBlock height={24} />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Atolye Tamamlama" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Tamamlama bilgisi bulunamadi"
          description="Henuz tamamlanmis bir atolye yok."
          actionLabel="Asamalara Don"
          icon="trophy-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Atolye Tamamlama" subtitle="Bir sorun olustu">
        <StateMessage
          title="Tamamlama ekrani yuklenemedi"
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
      <ScreenLayout title="Atolye Tamamlama" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopCompletionContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atolye Tamamlama" subtitle="Ozet ve arsiv">
      <ContentWorkshopCompletionContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  celebrationBlock: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16
  },
  celebrationEmoji: {
    fontSize: 48,
    marginBottom: 12
  },
  celebrationTitle: {
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 8
  },
  celebrationDesc: {
    textAlign: 'center',
    opacity: 0.75,
    lineHeight: 22
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  metaLabel: {
    opacity: 0.6
  },
  progressBar: {
    marginVertical: 6,
    borderRadius: 4
  },
  divider: {
    marginVertical: 8
  },
  createPlanBtn: {
    alignSelf: 'flex-start',
    marginTop: 4
  },
  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 10
  },
  stageNum: {
    width: 24,
    textAlign: 'center',
    opacity: 0.4,
    fontWeight: '700'
  },
  stageNumDone: {
    color: '#4CAF50',
    opacity: 1
  },
  stageLabel: {
    flex: 1
  },
  stagePending: {
    opacity: 0.45
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10
  },
  badgeEmoji: {
    fontSize: 36
  },
  badgeInfo: {
    flex: 1
  },
  badgeDesc: {
    opacity: 0.65,
    marginTop: 2
  },
  certChip: {
    alignSelf: 'flex-start',
    marginBottom: 10
  },
  shareBtn: {
    alignSelf: 'flex-start'
  },
  pendingBadge: {
    opacity: 0.6,
    lineHeight: 20
  },
  archiveDesc: {
    opacity: 0.7,
    lineHeight: 20,
    marginBottom: 12
  },
  archiveButtons: {
    gap: 10
  },
  archiveBtn: {
    width: '100%'
  }
});
