import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const GuestModeContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <PText style={styles.icon}>👻</PText>
        </View>
        <PText style={styles.title}>Misafir Modunda Devam Et</PText>
        <PText style={styles.subtitle}>Kayıt olmadan içerikleri keşfedin</PText>
        <View style={styles.infoCard}>
          <PText style={styles.infoTitle}>✓ Misafir Olarak Yapabilecekleriniz</PText>
          <View style={styles.list}>
            <PText style={styles.listItem}>• Yolculukları keşfedin</PText>
            <PText style={styles.listItem}>• Atölyelere göz atın</PText>
            <PText style={styles.listItem}>• e-Kitap kataloğunu inceleyin</PText>
            <PText style={styles.listItem}>• Modülleri görüntüleyin</PText>
          </View>
        </View>
        <View style={styles.warningCard}>
          <PText style={styles.warningTitle}>⚠️ Sınırlamalar</PText>
          <View style={styles.list}>
            <PText style={styles.warningItem}>• İçerik başlatamazsınız</PText>
            <PText style={styles.warningItem}>• Okuma yapamazsınız</PText>
            <PText style={styles.warningItem}>• Yorum yazamazsınız</PText>
            <PText style={styles.warningItem}>• İlerleme kaydedilemez</PText>
          </View>
        </View>
        <PButton
          mode="contained"
          disabled={isOffline}
          onPress={() => navigation.getParent()?.navigate('MainTabs')}
          style={styles.button}
          accessibilityLabel="Misafir olarak devam et"
        >
          Misafir Olarak Devam Et
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          onPress={() => navigation.navigate('AuthRegister')}
          style={styles.secondaryButton}
          contentStyle={styles.secondaryButtonContent}
          labelStyle={styles.secondaryButtonLabel}
          accessibilityLabel="Kayit ol"
        >
          Kayıt Ol
        </PButton>
        <PText style={styles.hint}>
          Kayit olduktan sonra misafir oturumunuzdaki tum gozatma verileri (favoriler, goruntuleme gecmisi) hesabiniza
          aktarilacaktir.
        </PText>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthGuestModeScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Misafir Modu" subtitle="Yükleniyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Misafir Modu" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="account-off-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Misafir Modu" subtitle="Bir sorun oluştu">
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
        <GuestModeContent isOffline />
      </>
    );
  }

  return <GuestModeContent />;
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
      paddingBottom: 32
    },
    iconContainer: {
      alignItems: 'center',
      marginBottom: spacing[2]
    },
    icon: {
      fontSize: fontSizes['12xl']
    },
    title: {
      fontSize: fontSizes['6xl'],
      fontWeight: fontWeights.bold,
      color: c.textBrand,
      marginBottom: spacing[1],
      textAlign: 'center'
    },
    subtitle: {
      color: c.textSecondary,
      marginBottom: spacing[3],
      textAlign: 'center',
      fontSize: fontSizes.xl
    },
    infoCard: {
      backgroundColor: c.tertiaryContainer,
      padding: spacing[2],
      borderRadius: radii.lg,
      marginBottom: spacing[2],
      borderLeftWidth: 4,
      borderLeftColor: c.tertiary
    },
    infoTitle: {
      fontWeight: fontWeights.bold,
      color: '#065F46',
      marginBottom: spacing[1.5]
    },
    warningCard: {
      backgroundColor: c.warningContainer,
      padding: spacing[2],
      borderRadius: radii.lg,
      marginBottom: spacing[3],
      borderLeftWidth: 4,
      borderLeftColor: '#F59E0B'
    },
    warningTitle: {
      fontWeight: fontWeights.bold,
      color: '#92400E',
      marginBottom: spacing[1.5]
    },
    list: {
      gap: spacing[1]
    },
    listItem: {
      fontSize: fontSizes.lg,
      color: c.textPrimary,
      lineHeight: 24
    },
    warningItem: {
      fontSize: fontSizes.lg,
      color: '#92400E',
      lineHeight: 24
    },
    button: {
      marginBottom: spacing[1.5],
      borderRadius: radii.lg
    },
    secondaryButton: {
      marginBottom: spacing[1.5],
      borderRadius: radii.lg,
      borderWidth: 2,
      borderColor: c.outlineVariant
    },
    secondaryButtonContent: {
      height: 56,
      justifyContent: 'center'
    },
    secondaryButtonLabel: {
      fontSize: fontSizes['2xl'],
      fontWeight: fontWeights.semiBold,
      color: c.textPrimary
    },
    hint: {
      textAlign: 'center',
      color: c.textSecondary,
      marginTop: spacing[2],
      lineHeight: 20,
      fontSize: fontSizes.base
    }
  });
}
