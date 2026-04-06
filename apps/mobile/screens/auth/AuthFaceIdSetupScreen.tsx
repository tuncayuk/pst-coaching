import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const FaceIdSetupContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <PText style={styles.icon}>👤</PText>
          </View>
        </View>
        <PText style={styles.title}>FaceID ile Hızlı Giriş</PText>
        <PText style={styles.description}>Sonraki girişlerinizde FaceID kullanmak ister misiniz?</PText>
        <View style={styles.infoCard}>
          <PText style={styles.infoTitle}>✓ FaceID Avantajları</PText>
          <View style={styles.list}>
            <PText style={styles.listItem}>• Hızlı ve güvenli giriş</PText>
            <PText style={styles.listItem}>• Şifre hatırlama gereksiz</PText>
            <PText style={styles.listItem}>• Biyometrik güvenlik</PText>
            <PText style={styles.listItem}>• İstediğiniz zaman kapatabilirsiniz</PText>
          </View>
        </View>
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={() => {
            navigation.navigate('AuthDemographics');
          }}
          style={styles.button}
          accessibilityLabel="FaceID etkinlestir"
        >
          FaceID'yi Etkinlestir
        </PButton>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AuthDemographics');
          }}
          style={styles.skipButton}
          disabled={isOffline}
          accessibilityRole="button"
          accessibilityLabel="Simdi degil, atla"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <PText style={styles.skipText}>Şimdi Değil</PText>
        </TouchableOpacity>
        <PText style={styles.hint}>
          FaceID ayarlarını dilediğiniz zaman Profil &gt; Ayarlar &gt; Güvenlik bölümünden değiştirebilirsiniz
        </PText>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthFaceIdSetupScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="FaceID Kurulumu" subtitle="Yükleniyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="FaceID Kurulumu" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="face-recognition"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="FaceID Kurulumu" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Yüklenemedi"
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
      <>
        <OfflineNotice />
        <FaceIdSetupContent isOffline />
      </>
    );
  }

  return <FaceIdSetupContent />;
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.background
    },
    scrollContent: {
      paddingHorizontal: spacing[3],
      paddingTop: 32,
      paddingBottom: 32,
      alignItems: 'center'
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: spacing[3]
    },
    iconCircle: {
      width: 120,
      height: 120,
      borderRadius: 40,
      backgroundColor: '#8B5CF6',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#8B5CF6',
      shadowOpacity: 0.4,
      shadowRadius: 30,
      elevation: 10
    },
    icon: {
      fontSize: fontSizes['12xl']
    },
    title: {
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: spacing[1.5],
      textAlign: 'center'
    },
    description: {
      fontSize: fontSizes['2xl'],
      color: c.textTertiary,
      marginBottom: spacing[4],
      textAlign: 'center',
      maxWidth: 300,
      alignSelf: 'center'
    },
    infoCard: {
      backgroundColor: c.secondaryContainer,
      padding: spacing[2],
      borderRadius: radii.lg,
      marginBottom: spacing[3],
      borderWidth: 2,
      borderColor: '#8B5CF6',
      maxWidth: 320,
      alignSelf: 'center'
    },
    infoTitle: {
      fontWeight: fontWeights.bold,
      color: '#8B5CF6',
      marginBottom: spacing[1.5]
    },
    list: {
      gap: spacing[1]
    },
    listItem: {
      fontSize: fontSizes.lg,
      color: c.textPrimary,
      lineHeight: 24,
      marginLeft: 20
    },
    button: {
      marginBottom: spacing[1.5],
      maxWidth: 320,
      alignSelf: 'center',
      borderRadius: radii.lg
    },
    skipButton: {
      alignItems: 'center',
      marginTop: spacing[1]
    },
    skipText: {
      color: c.textSecondary,
      fontWeight: fontWeights.semiBold,
      fontSize: fontSizes.xl
    },
    hint: {
      textAlign: 'center',
      color: c.textSecondary,
      marginTop: spacing[3],
      maxWidth: 280,
      alignSelf: 'center',
      lineHeight: 18,
      fontSize: fontSizes.base
    }
  });
}
