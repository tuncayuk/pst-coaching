import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PActivityIndicator, PButton, PText } from '../../components';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const GuestModeContent = ({ isOffline }: { isOffline?: boolean }) => {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA'
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16
  },
  icon: {
    fontSize: 64
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2B1B5D',
    marginBottom: 8,
    textAlign: 'center'
  },
  subtitle: {
    color: '#525252',
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 15
  },
  infoCard: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981'
  },
  infoTitle: {
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 12
  },
  warningCard: {
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B'
  },
  warningTitle: {
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 12
  },
  list: {
    gap: 8
  },
  listItem: {
    fontSize: 14,
    color: '#171717',
    lineHeight: 24
  },
  warningItem: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 24
  },
  button: {
    marginBottom: 12,
    borderRadius: 12
  },
  secondaryButton: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5'
  },
  secondaryButtonContent: {
    height: 56,
    justifyContent: 'center'
  },
  secondaryButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#171717'
  },
  hint: {
    textAlign: 'center',
    color: '#525252',
    marginTop: 16,
    lineHeight: 20,
    fontSize: 12
  }
});
