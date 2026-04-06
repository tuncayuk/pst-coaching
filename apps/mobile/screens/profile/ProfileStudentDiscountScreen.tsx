import React, { useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { PButton, PCard, PChip, PText } from '../../components';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

const STEPS = [
  'Okul e-postanizi dogrulayip ogrenci belgesini yukleyin',
  'Basvurunuz incelemeye alinir (1-2 is gunu)',
  'Onaylandi: %50 indirim hesabiniza taninir',
  'Yillik yeniden dogrulama hatirlatmasi gonderilir'
];

type VerifyMethod = 'email' | 'document' | null;

type VerificationStatus = 'none' | 'pending' | 'approved' | 'expiring' | 'expired';
const MOCK_VERIFICATION_STATUS: VerificationStatus = 'none';
// Change to "expiring" or "expired" to test AC-FR-E3-04-04

const STATUS_CONFIG: Record<VerificationStatus, { label: string; bg: string; text: string }> = {
  none: { label: 'Baslatilmamis', bg: '#F3F4F6', text: '#374151' },
  pending: { label: 'Incelemede', bg: '#FEF3C7', text: '#92400E' },
  approved: { label: 'Onaylandi', bg: '#D1FAE5', text: '#065F46' },
  expiring: { label: 'Yaklasiyor', bg: '#FEF3C7', text: '#92400E' },
  expired: { label: 'Suresi Doldu', bg: '#FEE2E2', text: '#991B1B' }
};

const ProfileStudentDiscountContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>(null);
  // useState prevents TypeScript from narrowing to a literal type
  const [statusKey] = useState<VerificationStatus>(MOCK_VERIFICATION_STATUS);
  const statusCfg = STATUS_CONFIG[statusKey];

  const handleStart = () => {
    if (isOffline) return;
    if (!verifyMethod) {
      Alert.alert('Dogrulama Yontemi', 'Lutfen bir dogrulama yontemi secin.');
      return;
    }
    // analytics: student_discount_started (stub)
    Alert.alert(
      'Dogrulama Baslat',
      verifyMethod === 'email'
        ? 'Okul e-postaniza dogrulama linki gonderilecek.'
        : 'Ogrenci belgenizi yuklemeniz icin yonlendiriliyorsunuz.',
      [{ text: 'Tamam' }]
    );
  };

  return (
    <>
      {/* AC-FR-E3-04-04: expiry warning */}
      {(statusKey === 'expiring' || statusKey === 'expired') && (
        <View style={styles.expiryBanner}>
          <PText variant="bodySmall" style={styles.expiryText}>
            {statusKey === 'expired'
              ? 'Ogrenci indirim dogrulamanizin suresi dolmustur. Erisim 30 gun icinde kesilecektir.'
              : 'Yillik ogrenci dogrulamaniz yaklasiyor. Lutfen yenileyin.'}
          </PText>
          <PButton
            mode="text"
            compact
            disabled={isOffline}
            onPress={() => Alert.alert('Yenile', 'Yeniden dogrulama akisi baslatilacak.')}
            accessibilityLabel="Ogrenci dogrulamasini yenile"
            accessibilityRole="button"
          >
            Simdi Yenile
          </PButton>
        </View>
      )}

      {/* Verification status */}
      <SectionCard title="Dogrulama Durumu">
        <PCard style={styles.card}>
          <PCard.Content style={styles.cardRow}>
            <View>
              <PText variant="bodyMedium" style={styles.statusLabel}>
                Ogrenci Indirimi
              </PText>
              {/* AC-FR-E3-04-02: 50% discount benefit shown */}
              <PText variant="bodySmall" style={styles.discountBadge}>
                %50 indirim - bireysel planlara uygulanir
              </PText>
            </View>
            <PChip compact style={{ backgroundColor: statusCfg.bg }}>
              <PText style={{ color: statusCfg.text, fontSize: 12 }}>{statusCfg.label}</PText>
            </PChip>
          </PCard.Content>
        </PCard>
        {statusKey !== 'none' && (
          <PButton
            mode="text"
            disabled={isOffline}
            onPress={() => Alert.alert('Durum', 'Dogrulama durumunuz kontrol ediliyor.')}
            accessibilityLabel="Dogrulama durumunu kontrol et"
            accessibilityRole="button"
          >
            Durumu Kontrol Et
          </PButton>
        )}
      </SectionCard>

      {/* AC-FR-E3-04-03: privacy notice shown BEFORE start */}
      {statusKey === 'none' && !privacyAccepted && (
        <SectionCard title="Gizlilik Bildirimi">
          <PText variant="bodySmall" style={styles.privacyText}>
            Ogrenci indiriminden yararlanmak icin okul bilgilerinizi paylasmaniz gerekmektedir. Bu bilgiler yalnizca
            dogrulama amaciyla kullanilir ve ucuncu taraflarla paylasilmaz. Dogrulama tamamlandiginda belgeler silinir.
          </PText>
          <PButton
            mode="contained"
            disabled={isOffline}
            onPress={() => setPrivacyAccepted(true)}
            style={styles.privacyButton}
            accessibilityLabel="Gizlilik bildirimini kabul et ve devam et"
            accessibilityRole="button"
          >
            Anliyorum, Devam Et
          </PButton>
        </SectionCard>
      )}

      {/* AC-FR-E3-04-01: verification method selection */}
      {(privacyAccepted || statusKey !== 'none') && statusKey !== 'approved' && (
        <SectionCard title="Dogrulama Yontemi">
          <PText variant="bodySmall" style={styles.methodLabel}>
            Bir dogrulama yontemi secin:
          </PText>
          <View style={styles.methodRow}>
            <View
              style={[styles.methodCard, verifyMethod === 'email' && styles.methodCardSelected]}
              accessibilityRole="radio"
              accessibilityState={{ selected: verifyMethod === 'email' }}
            >
              <PButton
                mode={verifyMethod === 'email' ? 'contained' : 'outlined'}
                onPress={() => setVerifyMethod('email')}
                disabled={isOffline}
                style={styles.methodButton}
                accessibilityLabel="Okul e-postasi ile dogrula"
                accessibilityRole="button"
              >
                Okul E-postasi
              </PButton>
              <PText variant="bodySmall" style={styles.methodDesc}>
                Okul e-posta adresinizle
              </PText>
            </View>
            <View
              style={[styles.methodCard, verifyMethod === 'document' && styles.methodCardSelected]}
              accessibilityRole="radio"
              accessibilityState={{ selected: verifyMethod === 'document' }}
            >
              <PButton
                mode={verifyMethod === 'document' ? 'contained' : 'outlined'}
                onPress={() => setVerifyMethod('document')}
                disabled={isOffline}
                style={styles.methodButton}
                accessibilityLabel="Ogrenci belgesi yukle"
                accessibilityRole="button"
              >
                Belge Yukle
              </PButton>
              <PText variant="bodySmall" style={styles.methodDesc}>
                Ogrenci nufus cuzdani veya transkript
              </PText>
            </View>
          </View>

          <PButton
            mode="contained"
            disabled={isOffline || !verifyMethod}
            onPress={handleStart}
            style={styles.startButton}
            accessibilityLabel="Dogrulama islemini baslat"
            accessibilityRole="button"
          >
            Dogrulamayi Baslat
          </PButton>
        </SectionCard>
      )}

      <SectionCard title="Nasil Calisir?">
        {STEPS.map((step, idx) => (
          <View key={idx} style={styles.stepRow}>
            <View style={styles.stepNumber}>
              <PText style={styles.stepNumberText}>{idx + 1}</PText>
            </View>
            <PText variant="bodySmall" style={styles.stepText}>
              {step}
            </PText>
          </View>
        ))}
      </SectionCard>
    </>
  );
};

export const ProfileStudentDiscountScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Ogrenci Indirimi" subtitle="Dogrulama hazirlaniyor">
        <SectionCard title="Durum">
          <SkeletonBlock height={72} />
        </SectionCard>
        <SectionCard title="Adimlar">
          <SkeletonBlock height={100} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Ogrenci Indirimi" subtitle="Dogrulama">
        <StateMessage
          title="Dogrulama verisi yok"
          description="Henuz dogrulama baslatilmadi. Baslamak icin bilgilerini paylas."
          actionLabel="Dogrulamayi Baslat"
          icon="school-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Ogrenci Indirimi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Ogrenci indirimi yuklenemedi"
          description="Dogrulama bilgilerini getiremedik. Lutfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === 'offline') {
    return (
      <ScreenLayout title="Ogrenci Indirimi" subtitle="Onbellekteki bilgiler">
        <OfflineNotice />
        <ProfileStudentDiscountContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ogrenci Indirimi" subtitle="Ogrenci indirimini dogrula">
      <ProfileStudentDiscountContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    expiryBanner: {
      backgroundColor: palette.red50,
      borderRadius: radii.md,
      padding: spacing[1.5],
      marginBottom: spacing[1],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    expiryText: {
      color: palette.red900,
      flex: 1,
      lineHeight: 18
    },
    card: {
      marginBottom: spacing[1]
    },
    cardRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    statusLabel: {
      fontWeight: fontWeights.semiBold,
      color: '#1F2937'
    },
    discountBadge: {
      color: '#059669',
      marginTop: 2,
      fontWeight: fontWeights.semiBold
    },
    privacyText: {
      color: '#374151',
      lineHeight: 20,
      marginBottom: spacing[1.5]
    },
    privacyButton: {
      minHeight: 48
    },
    methodLabel: {
      color: c.textTertiary,
      marginBottom: 10
    },
    methodRow: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: spacing[1.5]
    },
    methodCard: {
      flex: 1,
      borderRadius: radii.md,
      padding: 4
    },
    methodCardSelected: {
      backgroundColor: '#FAF5FF'
    },
    methodButton: {
      marginBottom: 4,
      minHeight: 44
    },
    methodDesc: {
      textAlign: 'center',
      color: c.textTertiary,
      lineHeight: 16
    },
    startButton: {
      minHeight: 48
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 10,
      gap: 10
    },
    stepNumber: {
      width: 24,
      height: 24,
      borderRadius: radii.lg,
      backgroundColor: '#7C3AED',
      justifyContent: 'center',
      alignItems: 'center'
    },
    stepNumberText: {
      color: palette.white,
      fontSize: fontSizes.base,
      fontWeight: fontWeights.bold
    },
    stepText: {
      flex: 1,
      color: '#374151',
      lineHeight: 20
    }
  });
}

const steps = ['Okul e-postanizi dogrulayip ogrenci belgesini yukleyin', 'Ogrenci belgesi yukle', 'Sonucu bekle'];
