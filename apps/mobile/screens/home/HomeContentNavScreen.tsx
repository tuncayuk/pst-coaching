import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type ContentAreaConfig = {
  label: string;
  description: string;
  count: string;
  accentColor: string;
  bg: string;
  route: string;
  requiresSubscription?: boolean;
};

/** AC-FR-E2-03-01: 4 content type entry cards */
const CONTENT_AREAS: ContentAreaConfig[] = [
  {
    label: 'Yolculuklar',
    description: 'Gunluk adimlarla buyume',
    count: '12 program',
    accentColor: '#00B4D8',
    bg: '#E0F7FA',
    route: 'DiscoverJourneys'
  },
  {
    label: 'Atolyeler',
    description: 'Odakli pratik seanslar',
    count: '8 atolye',
    accentColor: '#7C3AED',
    bg: '#EDE9FE',
    route: 'DiscoverWorkshops'
  },
  {
    label: 'e-Kitaplar',
    description: 'Derinlemesine okuma',
    count: '24 kitap',
    accentColor: '#F59E0B',
    bg: '#FEF3C7',
    route: 'DiscoverEbooks'
  },
  {
    label: 'Kocluk Okulu',
    description: 'Sertifika programlari',
    count: '5 kurs',
    accentColor: '#10B981',
    bg: '#D1FAE5',
    route: 'DiscoverCatalog',
    requiresSubscription: true
  }
];

const HomeContentNavGrid = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  const handleAreaTap = (area: ContentAreaConfig) => {
    if (isOffline) return;
    // AC-FR-E2-03-03: if restricted, show paywall - in real app check entitlement
    // For mock: navigate directly
    navigation.navigate(area.route as any);
  };

  return (
    <SectionCard title="Icerik Alanlari">
      <View style={styles.grid}>
        {CONTENT_AREAS.map(area => (
          <TouchableOpacity
            key={area.label}
            style={[styles.card, { backgroundColor: area.bg, borderColor: area.accentColor }]}
            onPress={() => handleAreaTap(area)}
            disabled={isOffline}
            accessibilityLabel={`${area.label}, ${area.count}. ${area.description}`}
            accessibilityRole="button"
            accessibilityHint={`${area.label} katalna gider`}
            activeOpacity={0.75}
          >
            <View style={[styles.accentBar, { backgroundColor: area.accentColor }]} />
            <View style={styles.cardBody}>
              <PText style={[styles.cardLabel, { color: area.accentColor }]}>{area.label}</PText>
              <PText style={styles.cardDescription}>{area.description}</PText>
              <PText style={styles.cardCount}>{area.count}</PText>
            </View>
            {area.requiresSubscription && (
              <View style={styles.lockBadge} accessibilityLabel="Abonelik gerektirir">
                <PText style={styles.lockBadgeText}>Premium</PText>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SectionCard>
  );
};

export const HomeContentNavScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Icerik Alanlari" subtitle="Alanlar yukleniyor">
        <SectionCard title="Yukleniyor">
          <PActivityIndicator animating />
          <View style={styles.skeletonGrid}>
            <SkeletonBlock height={96} />
            <SkeletonBlock height={96} />
          </View>
          <View style={styles.skeletonGrid}>
            <SkeletonBlock height={96} />
            <SkeletonBlock height={96} />
          </View>
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Icerik Alanlari" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Icerik alanlari yuklenemedi"
          description="Lutfen daha sonra tekrar deneyin."
          actionLabel="Tekrar Dene"
          icon="compass-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Icerik Alanlari" subtitle="Bir sorun olustu">
        <StateMessage
          title="Icerik alanlari yuklenemedi"
          description="Baglantiyi kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Icerik Alanlari" subtitle="Onbellekteki kataloglar">
        <OfflineNotice />
        <HomeContentNavGrid isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Icerik Alanlari" subtitle="Tek dokunusla kataloga git">
      <HomeContentNavGrid />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1.5]
    },
    skeletonGrid: {
      flexDirection: 'row',
      gap: spacing[1.5],
      marginBottom: spacing[1.5]
    },
    card: {
      width: '47%',
      borderRadius: radii.xl,
      borderWidth: 1.5,
      overflow: 'hidden',
      minHeight: 100,
      position: 'relative'
    },
    accentBar: {
      height: 4,
      width: '100%'
    },
    cardBody: {
      padding: spacing[1.5]
    },
    cardLabel: {
      fontSize: fontSizes.xl,
      fontWeight: fontWeights.extraBold,
      marginBottom: 4
    },
    cardDescription: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      marginBottom: 6
    },
    cardCount: {
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold,
      color: c.textTertiary
    },
    lockBadge: {
      position: 'absolute',
      top: 10,
      right: 8,
      backgroundColor: c.textBrand,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: radii.full
    },
    lockBadgeText: {
      fontSize: 10,
      fontWeight: fontWeights.bold,
      color: palette.white
    }
  });
}
