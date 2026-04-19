import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { PActivityIndicator, PAvatar, PButton, PDivider, PSwitch, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getAccessibilitySettings, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

// AC-FR-E10-04-01/02/03/04: feature status checklist
type SupportStatus = 'supported' | 'partial' | 'tip';
type FeatureItem = {
  id: string;
  ac: string;
  label: string;
  description: string;
  status: SupportStatus;
  tip?: string;
};

const FEATURES: FeatureItem[] = [
  {
    id: 'button_labels',
    ac: 'AC-FR-E10-04-01',
    label: 'Buton ve Eleman Etiketleri',
    description: 'Tum butonlar ve etkilesimli elemanlar anlamli accessibilityLabel tasiyor.',
    status: 'supported'
  },
  {
    id: 'focus_order',
    ac: 'AC-FR-E10-04-02',
    label: 'Odak Sirasi',
    description: 'Odak sirasi gorusel siraya uygun ilerliyor (soldan saga, yukari asagi).',
    status: 'supported'
  },
  {
    id: 'form_labels',
    ac: 'AC-FR-E10-04-03',
    label: 'Form Etiketleri ve Hata Mesajlari',
    description: 'Form alanlari etiket ve hata mesajlariyla ekran okuyucuya aktariliyor.',
    status: 'supported'
  },
  {
    id: 'image_alt',
    ac: 'AC-FR-E10-04-04',
    label: 'Gorsel Metin Alternatifleri',
    description: 'Grafik ve gorseller icin accessibilityLabel ile metin alternatifleri saglanmis.',
    status: 'supported'
  }
];

const TIP_ITEMS = [
  {
    id: 'voiceover',
    label: 'VoiceOver (iOS)',
    tip: 'Ayarlar > Erisilebilirlik > VoiceOver. Gezinmek icin saga/sola kaydirin.',
    icon: 'apple'
  },
  {
    id: 'talkback',
    label: 'TalkBack (Android)',
    tip: 'Ayarlar > Erisilebilirlik > TalkBack. Ekran okuyucu hareketleri icin iki parmakla kaydirin.',
    icon: 'android'
  }
];

const StatusBadge = ({ status }: { status: SupportStatus }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const configs = {
    supported: { bg: '#E8F5E9', text: '#2E7D32', label: 'Destekleniyor' },
    partial: { bg: '#FFF8E1', text: '#F57F17', label: 'Kismi Destek' },
    tip: { bg: '#E3F2FD', text: '#1565C0', label: 'Ipucu' }
  };
  const cfg = configs[status];
  return (
    <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
      <PText variant="labelSmall" style={{ color: cfg.text, fontWeight: '700' }}>
        {cfg.label}
      </PText>
    </View>
  );
};

const ProfileScreenReaderContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const settings = getAccessibilitySettings().find((s: any) => s.user_id === user?.id);

  // Enhanced screen reader mode toggle
  const [enhancedMode, setEnhancedMode] = useState(false);

  return (
    <>
      {/* Enhanced mode toggle */}
      <SectionCard title="Gelismis Ekran Okuyucu Modu">
        <PText variant="bodySmall" style={styles.hint}>
          Gelismis mod; icerik icerisinde ozet duyurular, bolum basliklarinda daha fazla detay saglar.
        </PText>
        <View
          style={styles.toggleRow}
          accessibilityRole="switch"
          accessibilityLabel={'Gelismis ekran okuyucu modu: ' + (enhancedMode ? 'acik' : 'kapali')}
          accessibilityState={{ checked: enhancedMode }}
        >
          <View style={styles.toggleText}>
            <PText variant="bodyMedium" style={styles.toggleLabel}>
              Gelismis Mod
            </PText>
            <PText variant="bodySmall" style={styles.toggleDesc}>
              Ozet duyurular ve ek baglam saglar
            </PText>
          </View>
          <PSwitch
            value={enhancedMode}
            onValueChange={v => setEnhancedMode(v)}
            disabled={isOffline}
            accessibilityLabel={'Gelismis ekran okuyucu modu: ' + (enhancedMode ? 'acik' : 'kapali')}
          />
        </View>
      </SectionCard>

      {/* AC-FR-E10-04-01/02/03/04: feature checklist */}
      <SectionCard title="Uyumluluk Durumu">
        <PText variant="bodySmall" style={styles.hint}>
          Uygulama, asagidaki erisilebilirlik ozelliklerini desteklemektedir.
        </PText>
        {FEATURES.map((feature, idx) => (
          <View key={feature.id}>
            <View
              style={styles.featureRow}
              accessibilityRole="none"
              accessibilityLabel={feature.label + ': ' + feature.description + '. Durum: Destekleniyor'}
            >
              <View style={styles.featureBody}>
                <View style={styles.featureTitleRow}>
                  <PText variant="titleSmall" style={styles.featureTitle}>
                    {feature.label}
                  </PText>
                  <PText variant="labelSmall" style={styles.featureAc}>
                    {feature.ac}
                  </PText>
                </View>
                <PText variant="bodySmall" style={styles.featureDesc}>
                  {feature.description}
                </PText>
              </View>
              <StatusBadge status={feature.status} />
            </View>
            {idx < FEATURES.length - 1 && <PDivider style={styles.divider} />}
          </View>
        ))}
      </SectionCard>

      {/* AC-FR-E10-04-03: form label tip */}
      <SectionCard title="Form Erisilebilirlik Notu">
        <PText variant="bodySmall" style={styles.formNote}>
          Tum form alanlari; accessibilityLabel, accessibilityHint ve accessibilityState ozellikleriyle donanimli olup
          ekran okuyucu tarafindan etkin sekilde okunmaktadir. Hata mesajlari accessibilityLiveRegion="polite" ile
          duyurulmaktadir.
        </PText>
      </SectionCard>

      {/* Tips for using with VoiceOver/TalkBack */}
      <SectionCard title="Ekran Okuyucu Ipuclari">
        {TIP_ITEMS.map((item, idx) => (
          <View key={item.id}>
            <View style={styles.tipRow} accessibilityRole="none" accessibilityLabel={item.label + ': ' + item.tip}>
              <PAvatar.Icon size={36} icon={item.icon} style={styles.tipIcon} accessible={false} />
              <View style={styles.tipBody}>
                <PText variant="titleSmall" style={styles.tipTitle}>
                  {item.label}
                </PText>
                <PText variant="bodySmall" style={styles.tipText}>
                  {item.tip}
                </PText>
              </View>
            </View>
            {idx < TIP_ITEMS.length - 1 && <PDivider style={styles.divider} />}
          </View>
        ))}
      </SectionCard>

      <SectionCard title="">
        <PButton
          mode="outlined"
          accessibilityLabel="Erisilebilirlik hub ekranina don"
          onPress={() => navigation.goBack()}
        >
          Geri Don
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileScreenReaderScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Ekran Okuyucu" subtitle="Durum yukleniyor">
        <SectionCard title="Gelismis Mod">
          <PActivityIndicator animating accessibilityLabel="Ekran okuyucu ayarlari yukleniyor" />
          <SkeletonBlock height={52} />
        </SectionCard>
        <SectionCard title="Uyumluluk">
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Ekran Okuyucu" subtitle="Destek bilgisi">
        <StateMessage
          title="Durum yuklenemedi"
          description="Ekran okuyucu uyumluluk bilgisi gosterilemiyor."
          actionLabel="Tekrar Dene"
          icon="eye-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Ekran Okuyucu" subtitle="Bir sorun olustu">
        <StateMessage
          title="Bilgi yuklenemedi"
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
      <ScreenLayout title="Ekran Okuyucu" subtitle="Onbellekteki bilgi">
        <OfflineNotice />
        <ProfileScreenReaderContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Ekran Okuyucu" subtitle="VoiceOver ve TalkBack uyumu">
      <ProfileScreenReaderContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    hint: {
      opacity: 0.6,
      marginBottom: 10,
      lineHeight: 18
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing[1],
      gap: spacing[1.5]
    },
    toggleText: { flex: 1 },
    toggleLabel: { fontWeight: fontWeights.semiBold },
    toggleDesc: { opacity: 0.65, marginTop: 2, lineHeight: 18 },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingVertical: 10,
      gap: spacing[1]
    },
    featureBody: { flex: 1 },
    featureTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 3
    },
    featureTitle: { fontWeight: fontWeights.semiBold, flex: 1, marginRight: 8 },
    featureAc: { opacity: 0.45, fontSize: 10 },
    featureDesc: { opacity: 0.7, lineHeight: 18 },
    statusBadge: {
      borderRadius: radii.sm,
      paddingHorizontal: spacing[1],
      paddingVertical: 3,
      alignSelf: 'flex-start',
      minWidth: 90,
      alignItems: 'center'
    },
    divider: { marginVertical: 2 },
    formNote: { opacity: 0.7, lineHeight: 20 },
    tipRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingVertical: 10,
      gap: spacing[1.5]
    },
    tipIcon: {
      backgroundColor: c.secondaryContainer
    },
    tipBody: { flex: 1 },
    tipTitle: { fontWeight: fontWeights.semiBold, marginBottom: 4 },
    tipText: { opacity: 0.7, lineHeight: 18 }
  });
}
