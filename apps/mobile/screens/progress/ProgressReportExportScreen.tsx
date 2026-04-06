import React, { useMemo, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PDivider, PText } from '../../components';
import { getContentProgressForUser, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type Format = 'PDF' | 'Ozet';

const THEMES = ['Duygusal Zeka', 'Oz Yonetim', 'Empati', 'Stres Yonetimi'];

const ProgressReportExportContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [format, setFormat] = useState<Format>('PDF');
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const user = getPrimaryUser();
  const progressItems = getContentProgressForUser(user?.id);
  const completed = progressItems.filter(p => p.status === 'completed');
  const totalSessions = progressItems.length;
  const totalCompleted = completed.length;
  const shareRate = totalSessions > 0 ? Math.round((totalCompleted / totalSessions) * 100) : 0;

  const handleDownload = () => {
    setIsDownloading(true);
    setIsDownloaded(false);
    setTimeout(() => {
      setIsDownloading(false);
      setIsDownloaded(true);
    }, 1500);
  };

  const handleShareConfirm = () => {
    setShowConsent(false);
    setIsShared(true);
  };

  return (
    <>
      {/* AC-FR-E6-06-01: summary metrics + themes + suggestions */}
      <SectionCard title="Ilerleme Ozeti">
        <View style={styles.metricRow}>
          <View style={styles.metricBox}>
            <PText style={styles.metricValue}>{totalSessions}</PText>
            <PText style={styles.metricLabel}>Toplam Seans</PText>
          </View>
          <View style={styles.metricBox}>
            <PText style={styles.metricValue}>{totalCompleted}</PText>
            <PText style={styles.metricLabel}>Tamamlanan</PText>
          </View>
          <View style={styles.metricBox}>
            <PText style={styles.metricValue}>{shareRate}%</PText>
            <PText style={styles.metricLabel}>Tamamlanma</PText>
          </View>
        </View>
        <PDivider style={styles.divider} />
        <PText style={styles.label}>Calisiilan Temalar</PText>
        <View style={styles.chipRow}>
          {THEMES.map(t => (
            <PChip key={t} compact style={styles.chip}>
              {t}
            </PChip>
          ))}
        </View>
        <PText style={styles.suggestionText}>
          Onerimiz: Oz Yonetim ve Empati becerilerini pekistirmek icin haftalik 2 seans hedefleyin.
        </PText>
      </SectionCard>

      {/* Format selector */}
      <SectionCard title="Rapor Formati">
        <View style={styles.chipRow}>
          {(['PDF', 'Ozet'] as Format[]).map(f => (
            <PChip
              key={f}
              selected={format === f}
              onPress={() => setFormat(f)}
              disabled={isOffline}
              style={styles.chip}
            >
              {f}
            </PChip>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E6-06-02: PDF download */}
      <SectionCard title="Indir">
        {isDownloaded && <PText style={styles.successText}>Rapor basariyla indirildi.</PText>}
        <PButton
          mode="contained"
          loading={isDownloading}
          disabled={isOffline || isDownloading}
          onPress={handleDownload}
          style={styles.action}
        >
          {isDownloaded ? 'Tekrar Indir' : 'Raporu Indir'}
        </PButton>
      </SectionCard>

      {/* AC-FR-E6-06-03: privacy consent before sharing */}
      <SectionCard title="Paylas">
        {isShared && <PText style={styles.successText}>Rapor paylasildi.</PText>}
        <PButton mode="outlined" disabled={isOffline} onPress={() => setShowConsent(true)} style={styles.action}>
          Raporu Paylas
        </PButton>
        <Modal visible={showConsent} transparent animationType="fade" onRequestClose={() => setShowConsent(false)}>
          <View style={styles.modalOverlay}>
            <PCard style={styles.consentCard}>
              <PCard.Content>
                <PText style={styles.consentTitle}>Gizlilik Onayi</PText>
                <PText style={styles.consentBody}>
                  Bu raporu paylasmadan once, ilerlemene iliskin verilerin secilenlerle paylasilmasina izin verdiginizi
                  onaylayin. Kisisel saglik verileri ucuncu sahislarla satilamaz.
                </PText>
                <View style={styles.consentActions}>
                  <PButton mode="text" onPress={() => setShowConsent(false)}>
                    Iptal
                  </PButton>
                  <PButton mode="contained" onPress={handleShareConfirm}>
                    Onayliyorum
                  </PButton>
                </View>
              </PCard.Content>
            </PCard>
          </View>
        </Modal>
      </SectionCard>
    </>
  );
};

export const ProgressReportExportScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Rapor Disa Aktar" subtitle="Rapor hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Rapor">
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Rapor Disa Aktar" subtitle="Rapor hazir degil">
        <StateMessage
          title="Rapor bulunamadi"
          description="Henuz yeterli veri yok. Yeni icerikleri tamamladikca rapor olusur."
          actionLabel="Icerik Tamamla"
          icon="file-document-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Rapor Disa Aktar" subtitle="Bir sorun olustu">
        <StateMessage
          title="Rapor yuklenemedi"
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
      <ScreenLayout title="Rapor Disa Aktar" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ProgressReportExportContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Rapor Disa Aktar" subtitle="Raporunu paylas">
      <ProgressReportExportContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    metricRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing[1.5]
    },
    metricBox: {
      flex: 1,
      alignItems: 'center',
      padding: spacing[1.5],
      backgroundColor: '#F5F3FF',
      borderRadius: radii.md,
      marginHorizontal: 4
    },
    metricValue: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.extraBold,
      color: '#6B46C1'
    },
    metricLabel: {
      fontSize: fontSizes.sm,
      color: c.textTertiary,
      marginTop: 2,
      textAlign: 'center'
    },
    divider: { marginVertical: 12 },
    label: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      color: c.textSecondary,
      marginBottom: spacing[1]
    },
    chipRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: spacing[1.5]
    },
    chip: {
      marginRight: 8,
      marginBottom: spacing[1]
    },
    suggestionText: {
      fontSize: fontSizes.md,
      color: '#1F2937',
      lineHeight: 18,
      padding: 10,
      backgroundColor: palette.purple50,
      borderRadius: radii.md,
      borderLeftWidth: 4,
      borderLeftColor: '#6B46C1'
    },
    action: { marginTop: spacing[1] },
    successText: {
      fontSize: fontSizes.md,
      color: '#15803D',
      fontWeight: fontWeights.semiBold,
      marginBottom: spacing[1],
      textAlign: 'center'
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing[3]
    },
    consentCard: {
      width: '100%',
      borderRadius: radii.xl,
      padding: spacing[1]
    },
    consentTitle: {
      fontSize: 17,
      fontWeight: fontWeights.bold,
      color: '#1F2937',
      marginBottom: spacing[1.5]
    },
    consentBody: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      lineHeight: 22,
      marginBottom: spacing[2.5]
    },
    consentActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: spacing[1]
    }
  });
}
