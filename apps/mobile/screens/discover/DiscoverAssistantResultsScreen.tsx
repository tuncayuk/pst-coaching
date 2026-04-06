import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PText } from '../../components';
import { getEbooks, getJourneys, getModules, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const levelLabels: Record<string, string> = {
  baslangic: 'Baslangic',
  beginner: 'Baslangic',
  orta: 'Orta',
  intermediate: 'Orta',
  ileri: 'Ileri',
  advanced: 'Ileri'
};

const DiscoverAssistantResultsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const journey = getJourneys()[0];
  const workshop = getWorkshops()[0];
  const module = getModules()[0];
  const ebook = getEbooks()[0];

  const primaryTitle = journey?.title ?? 'Onerilen Yolculuk';
  const primaryMeta = journey
    ? `${journey.duration_days} gun • ${levelLabels[journey.level] ?? journey.level}`
    : '6 gun • 20 dk';
  const primaryDetail = journey?.description ?? 'Sana uygun iceriklerle hazirlanan yolculuk.';

  const alternatives = [
    workshop && {
      id: workshop.id,
      title: workshop.title,
      subtitle: 'Atolye • 3 bolum',
      type: 'workshop'
    },
    module && {
      id: module.id,
      title: module.title,
      subtitle: 'Modul • 4 gun',
      type: 'module'
    },
    ebook && {
      id: ebook.id,
      title: ebook.title,
      subtitle: `e-Kitap • ${ebook.total_pages} sayfa`,
      type: 'ebook'
    }
  ].filter(Boolean) as { id: string; title: string; subtitle: string; type: string }[];

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>✨</PText>
        <PText style={styles.heroTitle}>Onerilerin hazir</PText>
        <PText style={styles.heroSubtitle}>Sana uygun icerikleri listeledik.</PText>
      </View>

      <PCard style={styles.primaryCard}>
        <PText style={styles.cardLabel}>Onerilen Yolculuk</PText>
        <PText style={styles.cardTitle}>{primaryTitle}</PText>
        <PText style={styles.cardMeta}>{primaryMeta}</PText>
        <PText style={styles.cardDetail}>{primaryDetail}</PText>
        <View style={styles.primaryActions}>
          <PButton
            mode="contained"
            disabled={isOffline}
            onPress={() =>
              journey &&
              navigation.navigate('Content', {
                screen: 'ContentJourneyDetail',
                params: { id: journey.id }
              })
            }
            style={styles.primaryAction}
          >
            Hemen Basla
          </PButton>
          <PButton
            mode="outlined"
            disabled={isOffline}
            onPress={() =>
              journey &&
              navigation.navigate('Content', {
                screen: 'ContentJourneyDetail',
                params: { id: journey.id }
              })
            }
          >
            Detaylari Gor
          </PButton>
        </View>
      </PCard>

      <PText style={styles.sectionTitle}>Alternatifler</PText>
      {alternatives.slice(0, 2).map(item => (
        <PCard key={item.id} style={styles.altCard}>
          <PText style={styles.altTitle}>{item.title}</PText>
          <PText style={styles.altMeta}>{item.subtitle}</PText>
          <PButton
            mode="outlined"
            disabled={isOffline}
            onPress={() => {
              if (item.type === 'workshop') {
                navigation.navigate('Content', {
                  screen: 'ContentWorkshopDetail',
                  params: { id: item.id }
                });
              }
              if (item.type === 'module') {
                navigation.navigate('Content', {
                  screen: 'ContentModuleHome',
                  params: { id: item.id }
                });
              }
              if (item.type === 'ebook') {
                navigation.navigate('Content', {
                  screen: 'ContentEbookDetail',
                  params: { id: item.id }
                });
              }
            }}
          >
            Incele
          </PButton>
        </PCard>
      ))}

      <PCard style={styles.ctaCard}>
        <PText style={styles.ctaTitle}>Kataloga Don</PText>
        <PText style={styles.ctaText}>Daha fazla icerik gormek icin kesfet sayfasina donebilirsin.</PText>
        <PButton mode="contained" disabled={isOffline} onPress={() => navigation.navigate('DiscoverCatalog')}>
          Kataloga Git
        </PButton>
      </PCard>
    </View>
  );
};

export const DiscoverAssistantResultsScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <PActivityIndicator animating />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={96} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <StateMessage
          title="Oneri bulunamadi"
          description="Secimlerini guncelleyerek yeniden deneyebilirsin."
          actionLabel="Sorulari Guncelle"
          icon="playlist-edit"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Icerik Asistani">
        <StateMessage
          title="Oneriler yuklenemedi"
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
      <ScreenLayout title="Icerik Asistani">
        <OfflineNotice />
        <DiscoverAssistantResultsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Icerik Asistani">
      <DiscoverAssistantResultsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    hero: {
      alignItems: 'center',
      marginBottom: spacing[3]
    },
    heroEmoji: {
      fontSize: 46,
      marginBottom: spacing[1.5]
    },
    heroTitle: {
      fontSize: fontSizes['4xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      textAlign: 'center',
      marginBottom: 6
    },
    heroSubtitle: {
      fontSize: fontSizes.xl,
      color: c.textSecondary,
      textAlign: 'center'
    },
    primaryCard: {
      padding: spacing[2],
      borderRadius: radii.xl,
      marginBottom: spacing[2]
    },
    cardLabel: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: c.primary,
      marginBottom: 6
    },
    cardTitle: {
      fontSize: fontSizes['3xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 4
    },
    cardMeta: {
      fontSize: fontSizes.md,
      color: c.textTertiary,
      marginBottom: 10
    },
    cardDetail: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      marginBottom: spacing[1.5]
    },
    primaryActions: {
      gap: spacing[1]
    },
    primaryAction: {
      marginBottom: 4
    },
    sectionTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 10
    },
    altCard: {
      padding: spacing[2],
      borderRadius: radii.xl,
      marginBottom: spacing[1.5]
    },
    altTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 4
    },
    altMeta: {
      fontSize: fontSizes.md,
      color: c.textTertiary,
      marginBottom: spacing[1.5]
    },
    ctaCard: {
      padding: spacing[2],
      borderRadius: radii.xl,
      marginTop: spacing[1]
    },
    ctaTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: 6
    },
    ctaText: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      marginBottom: spacing[1.5]
    }
  });
}
