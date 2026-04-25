import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-paper';

import { PButton, PText } from '../../components';
import { ScreenLayout } from '../../components/ScreenLayout';
import { StateMessage } from '../../components/StateMessage';
import { getContentSourceById } from '../../data/mockSelectors';
import { HomeStackParamList } from '../../navigation/HomeStack';
import { ColorTokens, fontSizes, fontWeights, radii, spacing, useAppTheme } from '../../theme';

type RouteType = RouteProp<HomeStackParamList, 'HomeContentSourceDetail'>;

const HomeContentSourceDetailContent = () => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  const navigation = useNavigation<any>();
  const route = useRoute<RouteType>();

  const source = getContentSourceById(route.params.sourceId);

  if (!source) {
    return (
      <StateMessage
        title="Kaynak bulunamadi"
        description="Secilen icerik kaynagi mevcut degil."
        actionLabel="Geri Don"
        onAction={() => navigation.goBack()}
        icon="alert-circle-outline"
        tone="error"
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {/* Hero block */}
      <View style={[styles.hero, { backgroundColor: source.accent_color + '18' }]}>
        <View style={[styles.iconCircle, { backgroundColor: source.accent_color + '28' }]}>
          <Icon source={source.icon} size={48} color={source.accent_color} />
        </View>
        <PText style={[styles.heroTitle, { color: source.accent_color }]}>{source.title}</PText>
        <PText style={styles.heroSubtitle}>{source.subtitle}</PText>
      </View>

      {/* Description */}
      <View style={styles.descSection}>
        <PText style={styles.descTitle}>Hakkinda</PText>
        <PText style={styles.descBody}>{source.description}</PText>
      </View>

      {/* CTA */}
      <View style={styles.ctaSection}>
        <PButton
          mode="outlined"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Ana sayfaya don"
          style={styles.backButton}
        >
          Geri Don
        </PButton>
      </View>
    </ScrollView>
  );
};

export const HomeContentSourceDetailScreen = () => {
  const route = useRoute<RouteType>();
  const source = getContentSourceById(route.params.sourceId);

  return (
    <ScreenLayout title={source?.title ?? 'Icerik Kaynagi'}>
      <HomeContentSourceDetailContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    scrollContent: {
      paddingBottom: spacing[4]
    },
    hero: {
      alignItems: 'center',
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[3],
      borderRadius: radii['2xl'],
      marginBottom: spacing[3],
      gap: spacing[1]
    },
    iconCircle: {
      width: 96,
      height: 96,
      borderRadius: radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing[1]
    },
    heroTitle: {
      fontSize: fontSizes['5xl'],
      fontWeight: fontWeights.extraBold,
      textAlign: 'center'
    },
    heroSubtitle: {
      fontSize: fontSizes.lg,
      color: c.textSecondary,
      textAlign: 'center'
    },
    typeBadge: {
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[0.5],
      borderRadius: radii.full,
      marginTop: spacing[0.5]
    },
    typeBadgeText: {
      fontSize: fontSizes.md,
      fontWeight: fontWeights.bold,
      color: '#FFFFFF'
    },
    descSection: {
      marginBottom: spacing[3]
    },
    descTitle: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.bold,
      color: c.textPrimary,
      marginBottom: spacing[1.5]
    },
    descBody: {
      fontSize: fontSizes.base,
      color: c.textSecondary,
      lineHeight: 24
    },
    metaLine: {
      fontSize: fontSizes.sm,
      color: c.textSecondary,
      lineHeight: 20
    },
    ctaSection: {
      gap: spacing[1.5]
    },
    ctaButton: {
      borderRadius: radii.xl
    },
    backButton: {
      borderRadius: radii.xl
    }
  });
}
