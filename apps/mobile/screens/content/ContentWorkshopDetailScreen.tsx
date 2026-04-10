import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PChip, PDivider, PText } from '../../components';
import {
  getContentItemsForParent,
  getContentProgressForUser,
  getPrimaryUser,
  getWorkshopById,
  getWorkshops
} from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type RouteParams = { state?: ScreenState; id?: string };

// Mutlak.docx aligned 11-stage labels
const STAGE_LABELS: Record<number, string> = {
  1: "Kavram İnşası",
  2: "Kur'ân Analizi",
  3: 'Ayet Aynalama',
  4: 'Müfessirler',
  5: 'Vicdandan Karaktere',
  6: 'Psikoloji Köprüsü',
  7: 'Felsefe Köprüsü',
  8: '3-Gün Kamp ★',
  9: 'Eğitmen Rehberi',
  10: 'Çalışma Kitabı',
  11: 'Kapanış & Hayata Uygulama'
};
const TYPE_LABELS: Record<string, string> = { kamp: 'Kamp', rehber: 'Rehber', calisma_kitabi: 'Çalışma Kitabı' };
const TYPE_BG: Record<string, string> = { kamp: '#FEE2E2', rehber: '#D1FAE5', calisma_kitabi: '#EDE7F6' };
const TYPE_FG: Record<string, string> = { kamp: '#B91C1C', rehber: '#065F46', calisma_kitabi: '#4C1D95' };
const DIFF_LABELS: Record<string, string> = { baslangic: 'Başlangıç', orta: 'Orta', ileri: 'İleri' };
const getWField = <T,>(w: any, key: string, fallback: T): T => (w?.[key] ?? fallback) as T;

const ContentWorkshopDetailContent = ({ workshopId, isOffline }: { workshopId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  // AC-FR-E8-01-03: role-based CTA
  const isFacilitator = user?.role === 'facilitator';
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const sections = getContentItemsForParent('workshop', workshop?.id);
  const progressList = getContentProgressForUser(user?.id);
  // AC-FR-E8-01-04: last synced stage
  const workshopProgress = progressList.find((p: any) => p.content_id === workshop?.id);
  const isStarted = !!workshopProgress?.started_at;
  const isCompleted = !!workshopProgress?.completed_at;
  const completedCount = sections.filter(
    (s: any) => progressList.find((p: any) => p.content_id === s.id)?.status === 'completed'
  ).length;
  const lastSection = completedCount > 0 ? sections[completedCount - 1] : null;

  // Real fields from rich mock data
  const emoji: string = getWField(workshop, 'emoji', '\uD83C\uDFD7');
  const heroColor: string = getWField(workshop, 'color', '#F3F4F6');
  const wType: string = getWField(workshop, 'type', 'kamp');
  const durationLabel: string = getWField(workshop, 'duration_label', '—');
  const ageTarget: string = getWField(workshop, 'age_target', '18+');
  const stageCount: number = getWField(workshop, 'stage_count', 11);
  const sessionCount: number = getWField(workshop, 'session_count', 0);
  const hasCamp: boolean = getWField(workshop, 'has_camp', false);
  const hasGuide: boolean = getWField(workshop, 'has_guide', false);
  const hasWorkbook: boolean = getWField(workshop, 'has_workbook', false);
  const facilitator: string = getWField(workshop, 'facilitator', 'PST Coaching');
  const scheduledDate: string | null = getWField(workshop, 'scheduled_date', null);
  const attendeeCount: number = getWField(workshop, 'attendee_count', 0);
  const difficulty: string = getWField(workshop, 'difficulty', 'orta');
  const tags: string[] = getWField<string[]>(workshop, 'tags', []);
  const isUpcoming: boolean = getWField(workshop, 'is_upcoming', false);
  const isRecommended: boolean = getWField(workshop, 'is_recommended', false);

  const handlePrimary = () => {
    if (isFacilitator) {
      navigation.navigate('Content', { screen: 'ContentWorkshopGuide', params: { id: workshop?.id } });
    } else {
      navigation.navigate('Content', { screen: 'ContentWorkshopHome', params: { id: workshop?.id } });
    }
  };

  return (
    <>
      {/* AC-FR-E8-01-01: hero — emoji, title, description, badges */}
      <View style={[styles.hero, { backgroundColor: heroColor + '55' }]}>
        <PText style={styles.heroEmoji}>{emoji}</PText>
        <PText variant="headlineMedium" style={styles.heroTitle}>
          {workshop?.title ?? 'Atölye'}
        </PText>
        <PText variant="bodyMedium" style={styles.heroDesc}>
          {(workshop as any)?.description ?? 'Canlı uygulamalar, paylaşım ve destekleyici egzersizlerle ilerleyen bir atölye.'}
        </PText>
        {/* type + difficulty badges */}
        <View style={styles.heroBadgeRow}>
          <View style={[styles.typeBadge, { backgroundColor: TYPE_BG[wType] ?? '#F3F4F6' }]}>
            <PText style={[styles.typeBadgeText, { color: TYPE_FG[wType] ?? '#111' }]}>
              {TYPE_LABELS[wType] ?? wType}
            </PText>
          </View>
          <View style={styles.diffBadge}>
            <PText style={styles.diffBadgeText}>{DIFF_LABELS[difficulty] ?? difficulty}</PText>
          </View>
          {isRecommended && (
            <View style={styles.recBadge}>
              <PText style={styles.recBadgeText}>★ Önerilen</PText>
            </View>
          )}
        </View>
      </View>

      {/* AC-FR-E8-01-02: real yapı özeti */}
      <SectionCard title="Yapı Özeti">
        <View style={styles.chipRow}>
          <PChip style={styles.chip}>{stageCount} aşama</PChip>
          {hasCamp && <PChip style={styles.chip}>⛺ 3 Gün Kamp</PChip>}
          {hasWorkbook && <PChip style={styles.chip}>📓 Çalışma Kitabı</PChip>}
          {hasGuide && <PChip style={styles.chip}>📖 Eğitmen Rehberi</PChip>}
        </View>
        <PDivider style={styles.divider} />
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Hedef kitle</PText>
          <PText variant="bodySmall">{ageTarget}</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Süre</PText>
          <PText variant="bodySmall">{durationLabel}</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Oturum sayısı</PText>
          <PText variant="bodySmall">{sessionCount} oturum</PText>
        </View>
        <View style={styles.metaRow}>
          <PText variant="labelMedium" style={styles.metaLabel}>Kolaylaştırıcı</PText>
          <PText variant="bodySmall">{facilitator}</PText>
        </View>
        {attendeeCount > 0 && (
          <View style={styles.metaRow}>
            <PText variant="labelMedium" style={styles.metaLabel}>Katılımcı</PText>
            <PText variant="bodySmall">{attendeeCount} kişi</PText>
          </View>
        )}
        {scheduledDate && (
          <View style={styles.metaRow}>
            <PText variant="labelMedium" style={styles.metaLabel}>Tarih</PText>
            <View style={[styles.datePill, isUpcoming && styles.datePillUpcoming]}>
              <PText variant="bodySmall">📅 {scheduledDate}</PText>
            </View>
          </View>
        )}
        {tags.length > 0 && (
          <>
            <PDivider style={styles.divider} />
            <View style={styles.tagRow}>
              {tags.map(tag => (
                <View key={tag} style={styles.tagChip}>
                  <PText style={styles.tagText}>#{tag}</PText>
                </View>
              ))}
            </View>
          </>
        )}
      </SectionCard>

      {/* AC-FR-E8-01-04: last visited stage */}
      {isStarted && lastSection ? (
        <SectionCard title="Kaldığın Yer">
          <PText variant="bodySmall" style={styles.subtleText}>
            Son aşama: {lastSection.title ?? 'Aşama ' + completedCount}
          </PText>
          <PText variant="bodySmall" style={styles.subtleText}>
            {completedCount}/{sections.length} bölüm tamamlandı
          </PText>
          {isOffline && (
            <PText variant="labelSmall" style={styles.offlineNote}>
              Son senkronize edilmiş veri gösteriliyor.
            </PText>
          )}
        </SectionCard>
      ) : null}

      {/* Stage plan */}
      <SectionCard title="11 Aşama Planı">
        {Object.entries(STAGE_LABELS).map(([num, label]) => {
          const n = parseInt(num, 10);
          const isDone = n <= completedCount;
          return (
            <View key={num} style={styles.stageRow}>
              <View style={[styles.stageNumBadge, isDone && styles.stageNumBadgeDone, n === 8 && !isDone && styles.stageNumBadgeCamp]}>
                <PText style={styles.stageNumText}>{isDone ? '✓' : String(n)}</PText>
              </View>
              <PText variant="bodySmall" style={[styles.stageLabel, isDone && styles.stageLabelDone]}>
                {label}
              </PText>
            </View>
          );
        })}
      </SectionCard>

      {/* AC-FR-E8-01-03: role-based CTA */}
      <SectionCard title="">
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.primaryButton}
          onPress={handlePrimary}
          accessibilityLabel={isFacilitator ? 'Rehberi Aç' : isStarted ? 'Devam Et' : 'Başla'}
        >
          {isFacilitator ? 'Rehberi Aç' : isStarted ? 'Devam Et' : 'Başla'}
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
            {isCompleted ? 'Arşivi Gör' : 'Tamamlama Ekranı'}
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

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    hero: {
      alignItems: 'center',
      paddingVertical: spacing[3],
      paddingHorizontal: spacing[2]
    },
    heroEmoji: {
      fontSize: fontSizes['11xl'],
      marginBottom: spacing[1.5]
    },
    heroTitle: {
      textAlign: 'center',
      fontWeight: fontWeights.bold,
      marginBottom: spacing[1]
    },
    heroDesc: {
      textAlign: 'center',
      opacity: 0.75,
      lineHeight: 22
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginBottom: spacing[1.5]
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
      marginTop: spacing[1],
      opacity: 0.55,
      fontStyle: 'italic'
    },
    stageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4
    },
    heroBadgeRow: {
      flexDirection: 'row',
      gap: spacing[1],
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: spacing[1]
    },
    typeBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm
    },
    typeBadgeText: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold
    },
    diffBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm,
      backgroundColor: '#F3F4F6'
    },
    diffBadgeText: {
      fontSize: fontSizes.sm,
      color: '#555'
    },
    recBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm,
      backgroundColor: '#FEF3C7'
    },
    recBadgeText: {
      fontSize: fontSizes.sm,
      fontWeight: fontWeights.bold,
      color: '#92400E'
    },
    datePill: {
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm
    },
    datePillUpcoming: {
      backgroundColor: '#D1FAE5'
    },
    tagRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6
    },
    tagChip: {
      backgroundColor: '#EEF2FF',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: radii.sm
    },
    tagText: {
      fontSize: fontSizes.xs,
      color: '#4338CA'
    },
    stageNumBadge: {
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
      backgroundColor: '#E5E7EB'
    },
    stageNumBadgeDone: {
      backgroundColor: '#4CAF50'
    },
    stageNumBadgeCamp: {
      backgroundColor: '#C62828'
    },
    stageNumText: {
      color: '#FFF',
      fontSize: fontSizes.xs,
      fontWeight: fontWeights.bold
    },
    stageNum: {
      width: 28,
      opacity: 0.5
    },
    stageLabel: {
      flex: 1
    },
    stageLabelDone: {
      opacity: 0.5
    },
    primaryButton: {
      marginTop: spacing[1]
    },
    secondaryButton: {
      marginTop: 10
    }
  });
}
