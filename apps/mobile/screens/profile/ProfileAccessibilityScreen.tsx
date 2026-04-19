import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PDivider, PSwitch, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getAccessibilitySettings, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

// Nav arrow pill
const NavCard = ({
  title,
  subtitle,
  onPress,
  disabled,
  accessibilityLabel
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel: string;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <TouchableOpacity
      style={[styles.navCard, disabled && styles.navCardDisabled]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Bu erisilebilirlik bolumunu acmak icin dokunun"
    >
      <View style={styles.navCardBody}>
        <PText variant="titleSmall" style={styles.navCardTitle}>
          {title}
        </PText>
        <PText variant="bodySmall" style={styles.navCardSub}>
          {subtitle}
        </PText>
      </View>
      <PText style={styles.navArrow} accessibilityElementsHidden>
        {'>'}
      </PText>
    </TouchableOpacity>
  );
};

// Toggle row
const ToggleRow = ({
  label,
  description,
  value,
  onValueChange,
  disabled,
  accessibilityLabel
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  accessibilityLabel: string;
}) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);
  return (
    <View
      style={styles.toggleRow}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
    >
      <View style={styles.toggleText}>
        <PText variant="bodyMedium" style={styles.toggleLabel}>
          {label}
        </PText>
        <PText variant="bodySmall" style={styles.toggleDesc}>
          {description}
        </PText>
      </View>
      <PSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
};

const ProfileAccessibilityContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const settings = getAccessibilitySettings().find((s: any) => s.user_id === user?.id);

  // AC-FR-E10-01-02: interactive local state, simulates immediate apply
  const [highContrast, setHighContrast] = useState(settings?.high_contrast ?? false);
  const [reduceMotion, setReduceMotion] = useState(settings?.reduce_motion ?? false);

  // Summary for nav cards
  const textSizeLabel = settings?.text_size ?? 'normal';
  const themeLabel = settings?.theme ?? 'system';

  return (
    <>
      {/* AC-FR-E10-01-01: text size, high contrast, reduce motion on one screen */}
      <SectionCard title="Hizli Ayarlar">
        <PText variant="bodySmall" style={styles.sectionHint}>
          Degisiklikler aninda uygulanir ve cihazda kaydedilir.
        </PText>
        <ToggleRow
          label="Yuksek Kontrast"
          description="Metin ve arka plan kontrastini arttirir (min 7:1)"
          value={highContrast}
          onValueChange={v => setHighContrast(v)}
          disabled={isOffline}
          accessibilityLabel={'Yuksek kontrast: ' + (highContrast ? 'acik' : 'kapali')}
        />
        <PDivider style={styles.divider} />
        <ToggleRow
          label="Hareketi Azalt"
          description="Animasyonlari ve gecis efektlerini minimize eder"
          value={reduceMotion}
          onValueChange={v => setReduceMotion(v)}
          disabled={isOffline}
          accessibilityLabel={'Hareket azaltma: ' + (reduceMotion ? 'acik' : 'kapali')}
        />
      </SectionCard>

      {/* AC-FR-E10-01-01: navigation to each accessibility sub-screen */}
      <SectionCard title="Detayli Ayarlar">
        <NavCard
          title="Metin Buyutme"
          subtitle={'Mevcut: ' + textSizeLabel + ' - Adim secici + onizleme'}
          onPress={() => navigation.navigate('ProfileTextScale')}
          disabled={isOffline}
          accessibilityLabel={'Metin buyutme ayarina git. Mevcut: ' + textSizeLabel}
        />
        <PDivider style={styles.divider} />
        <NavCard
          title="Tema ve Yuksek Kontrast"
          subtitle={'Tema: ' + themeLabel + ' - Acik / Koyu / Sistem'}
          onPress={() => navigation.navigate('ProfileTheme')}
          disabled={isOffline}
          accessibilityLabel={'Tema ve kontrast ayarina git. Mevcut: ' + themeLabel}
        />
        <PDivider style={styles.divider} />
        <NavCard
          title="Ekran Okuyucu Uyumu"
          subtitle="VoiceOver ve TalkBack destegi durumu"
          onPress={() => navigation.navigate('ProfileScreenReader')}
          disabled={false}
          accessibilityLabel="Ekran okuyucu uyumu ayarina git"
        />
      </SectionCard>

      {/* AC-FR-E10-01-03: offline note */}
      {isOffline && (
        <SectionCard title="Cevrimdisi">
          <PText variant="bodySmall" style={styles.offlineNote}>
            Degisiklikler cihazda saklanir ve baglanti gelince senkronize edilir.
          </PText>
        </SectionCard>
      )}

      <SectionCard title="">
        <PButton
          mode="contained"
          disabled={isOffline}
          accessibilityLabel="Erisilebilirlik ayarlarini kaydet"
          style={styles.saveBtn}
          onPress={() => {}}
        >
          Ayarlari Kaydet
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileAccessibilityScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Erisilebilirlik" subtitle="Ayarlar hazirlaniyor">
        <SectionCard title="Hizli Ayarlar">
          <PActivityIndicator animating accessibilityLabel="Ayarlar yukleniyor" />
          <SkeletonBlock height={52} />
          <SkeletonBlock height={52} />
        </SectionCard>
        <SectionCard title="Detayli Ayarlar">
          <SkeletonBlock height={56} />
          <SkeletonBlock height={56} />
          <SkeletonBlock height={56} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Erisilebilirlik" subtitle="Varsayilan ayarlar">
        <StateMessage
          title="Ayar bulunamadi"
          description="Erisilebilirlik ayarlari henuz yapilmamis. Varsayilan degerler kullanilacak."
          actionLabel="Varsayilana Sifirla"
          icon="accessibility"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Erisilebilirlik" subtitle="Bir sorun olustu">
        <StateMessage
          title="Ayarlar yuklenemedi"
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
      <ScreenLayout title="Erisilebilirlik" subtitle="Onbellekteki ayarlar">
        <OfflineNotice />
        <ProfileAccessibilityContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Erisilebilirlik" subtitle="Kapsayici deneyim ayarlari">
      <ProfileAccessibilityContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    sectionHint: {
      opacity: 0.6,
      marginBottom: spacing[1.5],
      lineHeight: 18
    },
    toggleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      gap: spacing[1.5]
    },
    toggleText: {
      flex: 1
    },
    toggleLabel: {
      fontWeight: fontWeights.semiBold
    },
    toggleDesc: {
      opacity: 0.65,
      marginTop: 2,
      lineHeight: 18
    },
    divider: {
      marginVertical: 2
    },
    navCard: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
      paddingHorizontal: 4
    },
    navCardDisabled: {
      opacity: 0.5
    },
    navCardBody: {
      flex: 1
    },
    navCardTitle: {
      fontWeight: fontWeights.semiBold,
      marginBottom: 2
    },
    navCardSub: {
      opacity: 0.65,
      lineHeight: 18
    },
    navArrow: {
      fontSize: fontSizes['5xl'],
      opacity: 0.4,
      paddingLeft: 8
    },
    offlineNote: {
      opacity: 0.65,
      lineHeight: 20,
      fontStyle: 'italic'
    },
    saveBtn: {
      marginTop: 4
    }
  });
}
