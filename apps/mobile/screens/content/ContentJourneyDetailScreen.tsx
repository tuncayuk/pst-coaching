import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PActivityIndicator, PButton, PCard, PChip, PIconButton, PText } from '../../components';
import { getEbooks, getJourneyById, getModules, getWorkshops } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const ContentJourneyDetailContent = ({ journeyId, isOffline }: { journeyId?: string; isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const journey = getJourneyById(journeyId);
  const modules = getModules().slice(0, 2);
  const workshops = getWorkshops().slice(0, 1);
  const ebooks = getEbooks().slice(0, 1);
  const duration = journey?.duration_days ?? 40;
  const level = journey?.level ?? 'Başlangıç';
  const dailyGoal = journey?.daily_target ?? '10-20 dk/gün';

  return (
    <View>
      <View style={styles.hero}>
        <PText style={styles.heroEmoji}>🎯</PText>
        <PIconButton
          icon="heart-outline"
          style={styles.heroFav}
          accessibilityLabel="Favorilere ekle"
          accessibilityRole="button"
          onPress={() => {}}
        />
      </View>

      <View style={styles.content}>
        <PText style={styles.title}>{journey?.title ?? 'Sıdk ve Integrity Yolculuğu'}</PText>
        <View style={styles.tagRow}>
          <PText style={styles.tagPrimary}>⏱️ {duration} gün</PText>
          <PText style={styles.tagSuccess}>📊 {level}</PText>
          <PText style={styles.tagSecondary}>📅 {dailyGoal}</PText>
        </View>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>Yolculuk Hakkında</PText>
          <PText style={styles.paragraph}>
            Sıdk ve doğruluk üzerine derinlemesine bir keşif yolculuğu. Kendi gerçekliğinizle yüzleşin, içsel
            bütünlüğünüzü güçlendirin.
          </PText>
        </PCard>

        <PCard style={styles.sectionCard}>
          <PText style={styles.sectionTitle}>İçerik</PText>
          <View style={styles.contentList}>
            {modules.map(item => (
              <View key={item.id} style={styles.contentRow}>
                <PText style={styles.contentEmoji}>📦</PText>
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle}>{item.title}</PText>
                  <PText style={styles.contentMeta}>5 paket</PText>
                </View>
              </View>
            ))}
            {workshops.map(item => (
              <View key={item.id} style={styles.contentRow}>
                <PText style={styles.contentEmoji}>🎨</PText>
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle}>{item.title}</PText>
                  <PText style={styles.contentMeta}>8 okuma • 4 uygulama</PText>
                </View>
              </View>
            ))}
            {ebooks.map(item => (
              <View key={item.id} style={styles.contentRow}>
                <PText style={styles.contentEmoji}>📖</PText>
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle}>{item.title}</PText>
                  <PText style={styles.contentMeta}>{item.total_pages ?? 256} sayfa</PText>
                </View>
              </View>
            ))}
          </View>
        </PCard>

        <PButton
          mode="contained"
          disabled={isOffline}
          accessibilityLabel="Yolculugu Baslat"
          accessibilityHint="Bu yolculuğa başlar"
          onPress={() => navigation.navigate('ContentJourneyHome' as never, { id: journey?.id ?? '' } as never)}
        >
          Yolculugu Baslat
        </PButton>
      </View>
    </View>
  );
};

export const ContentJourneyDetailScreen = ({
  route
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);
  const journeyId = route?.params?.id;

  if (state === 'loading') {
    return (
      <ScreenLayout title="Yolculuk Detayi">
        <PActivityIndicator animating />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={18} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Yolculuk Detayi">
        <StateMessage
          title="Yolculuk bulunamadı"
          description="Bu yolculuk şu anda erişilebilir değil."
          actionLabel="Keşfe Dön"
          icon="map-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Yolculuk Detayi">
        <StateMessage
          title="Yolculuk yüklenemedi"
          description="Bağlantını kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Yolculuk Detayi">
        <OfflineNotice />
        <ContentJourneyDetailContent journeyId={journeyId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Yolculuk Detayi">
      <ContentJourneyDetailContent journeyId={journeyId} />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: c.background
    },
    page: {
      paddingBottom: 24
    },
    hero: {
      height: 200,
      backgroundColor: '#FFDDC1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    heroEmoji: {
      fontSize: fontSizes['12xl']
    },
    heroBack: {
      position: 'absolute',
      top: 16,
      left: 16,
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
    heroFav: {
      position: 'absolute',
      top: 16,
      right: 16,
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
    content: {
      padding: spacing[2]
    },
    title: {
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.extraBold,
      color: c.textBrand,
      marginBottom: spacing[1.5]
    },
    tagRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginBottom: spacing[2]
    },
    tagPrimary: {
      backgroundColor: c.primaryContainer,
      color: '#0096B8',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: radii.md,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold
    },
    tagSuccess: {
      backgroundColor: c.tertiaryContainer,
      color: '#065F46',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: radii.md,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold
    },
    tagSecondary: {
      backgroundColor: c.secondaryContainer,
      color: c.textBrand,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: radii.md,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.semiBold
    },
    sectionCard: {
      padding: spacing[2],
      borderRadius: radii.xl,
      marginBottom: spacing[2]
    },
    sectionTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: spacing[1]
    },
    paragraph: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      lineHeight: 20
    },
    contentList: {
      gap: spacing[1.5]
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing[1.5],
      padding: spacing[1.5],
      borderRadius: radii.md,
      backgroundColor: c.background
    },
    contentEmoji: {
      fontSize: fontSizes['4xl']
    },
    contentInfo: {
      flex: 1
    },
    contentTitle: {
      fontSize: fontSizes.lg,
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary,
      marginBottom: 4
    },
    contentMeta: {
      fontSize: fontSizes.base,
      color: c.textSecondary
    }
  });
}
