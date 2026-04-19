import { useNavigation } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PActivityIndicator, PButton, PDivider, PText } from '../../components';
import { OfflineNotice } from '../../components/OfflineNotice';
import { ScreenLayout } from '../../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../../components/ScreenState';
import { SectionCard } from '../../components/SectionCard';
import { SkeletonBlock } from '../../components/SkeletonBlock';
import { StateMessage } from '../../components/StateMessage';
import { getAccessibilitySettings, getPrimaryUser } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';

// AC-FR-E10-02-01: 5-step text size values with display scale factors
const TEXT_SIZES = [
  { key: 'xsmall', label: 'Cok Kucuk', scale: 0.82, description: 'Daha fazla icerik gosterir' },
  { key: 'small', label: 'Kucuk', scale: 0.91, description: 'Kompakt gorunum' },
  { key: 'normal', label: 'Normal', scale: 1.0, description: 'Varsayilan boyut' },
  { key: 'large', label: 'Buyuk', scale: 1.14, description: 'Daha kolay okuma' },
  { key: 'xlarge', label: 'Cok Buyuk', scale: 1.3, description: 'Maksimum okunabilirlik' }
];

// AC-FR-E10-02-01: live preview text
const PREVIEW_TEXT =
  'Bu bir onizleme cumlesidir. Sectiginiz metin boyutunun iceriklerinizde nasil gorunecegini burada canli olarak takip edebilirsiniz.';

const ProfileTextScaleContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const settings = getAccessibilitySettings().find((s: any) => s.user_id === user?.id);
  const initialSize = TEXT_SIZES.find(s => s.key === (settings?.text_size ?? 'normal')) ?? TEXT_SIZES[2];

  // AC-FR-E10-02-01: live selection
  const [selected, setSelected] = useState(initialSize);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* AC-FR-E10-02-01: step selector */}
      <SectionCard title="Metin Boyutu Sec">
        <PText variant="bodySmall" style={styles.hint}>
          Boyutu degistirin; onizleme asagida aninda guncellenir.
        </PText>
        <View style={styles.stepRow} accessibilityRole="radiogroup" accessibilityLabel="Metin boyutu secimleri">
          {TEXT_SIZES.map(size => {
            const isSelected = selected.key === size.key;
            return (
              <TouchableOpacity
                key={size.key}
                style={[styles.stepBtn, isSelected && styles.stepBtnActive]}
                onPress={() => setSelected(size)}
                disabled={isOffline}
                accessibilityRole="radio"
                accessibilityLabel={size.label + (isSelected ? ', secili' : '')}
                accessibilityState={{ selected: isSelected }}
              >
                <PText variant="labelMedium" style={[styles.stepLabel, isSelected && styles.stepLabelActive]}>
                  {size.label}
                </PText>
              </TouchableOpacity>
            );
          })}
        </View>
        <PText variant="bodySmall" style={styles.scaleNote}>
          Olcek: {Math.round(selected.scale * 100)}% - {selected.description}
        </PText>
      </SectionCard>

      {/* AC-FR-E10-02-01/03: live preview with word wrap, no overflow */}
      <SectionCard title="Canli Onizleme">
        <PText variant="bodySmall" style={styles.previewLabel}>
          Baslik ornegi
        </PText>
        <PText
          style={[styles.previewHeading, { fontSize: Math.round(20 * selected.scale) }]}
          accessibilityLabel={'Baslik onizlemesi, boyut ' + selected.label}
        >
          Icerik Basligi
        </PText>
        <PDivider style={styles.divider} />
        <PText variant="bodySmall" style={styles.previewLabel}>
          Govde metin ornegi
        </PText>
        {/* AC-FR-E10-02-03: no overflow, line wrapping preserved */}
        <PText
          style={[
            styles.previewBody,
            {
              fontSize: Math.round(14 * selected.scale),
              lineHeight: Math.round(22 * selected.scale)
            }
          ]}
          numberOfLines={0}
          accessibilityLabel={'Govde metin onizlemesi, boyut ' + selected.label}
        >
          {PREVIEW_TEXT}
        </PText>
        <PDivider style={styles.divider} />
        <PText variant="bodySmall" style={styles.previewLabel}>
          Kucuk metin ornegi (etiketler)
        </PText>
        <PText
          style={[styles.previewCaption, { fontSize: Math.round(11 * selected.scale) }]}
          accessibilityLabel="Kucuk metin onizlemesi"
        >
          12 Nisan 2026 - 3 dakika okuma
        </PText>
      </SectionCard>

      {/* AC-FR-E10-02-02: note about global application */}
      <SectionCard title="Etki Alani">
        <PText variant="bodySmall" style={styles.scopeText}>
          Secilen metin boyutu; yolculuklar, atolyeler, e-Kitaplar ve tum uygulama iceriklerine uygulanir.
        </PText>
      </SectionCard>

      <SectionCard title="">
        {saved ? (
          <PText
            variant="labelMedium"
            style={styles.savedText}
            accessibilityLiveRegion="polite"
            accessibilityLabel="Metin boyutu kaydedildi"
          >
            Kaydedildi
          </PText>
        ) : null}
        <PButton
          mode="contained"
          disabled={isOffline}
          accessibilityLabel={'Metin boyutu kaydet: ' + selected.label}
          style={styles.saveBtn}
          onPress={handleSave}
        >
          Kaydet
        </PButton>
        <PButton mode="text" accessibilityLabel="Geri don" onPress={() => navigation.goBack()}>
          Geri Don
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileTextScaleScreen = ({ route }: { route?: { params?: { state?: ScreenState } } }) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Metin Boyutu" subtitle="Ayarlar hazirlaniyor">
        <SectionCard title="Boyut Sec">
          <PActivityIndicator animating accessibilityLabel="Metin boyutu yukleniyor" />
          <SkeletonBlock height={48} />
        </SectionCard>
        <SectionCard title="Onizleme">
          <SkeletonBlock height={24} />
          <SkeletonBlock height={60} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === 'empty') {
    return (
      <ScreenLayout title="Metin Boyutu" subtitle="Varsayilan boyut">
        <StateMessage
          title="Ayar bulunamadi"
          description="Normal boyut varsayilan olarak uygulanacak."
          actionLabel="Normal Boyutu Sec"
          icon="format-size"
        />
      </ScreenLayout>
    );
  }

  if (state === 'error') {
    return (
      <ScreenLayout title="Metin Boyutu" subtitle="Bir sorun olustu">
        <StateMessage
          title="Boyut ayari yuklenemedi"
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
      <ScreenLayout title="Metin Boyutu" subtitle="Onbellekteki ayarlar">
        <OfflineNotice />
        <ProfileTextScaleContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Metin Boyutu" subtitle="Okuma konforunu kisisellestir">
      <ProfileTextScaleContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    hint: {
      opacity: 0.6,
      marginBottom: spacing[1.5],
      lineHeight: 18
    },
    stepRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing[1],
      marginBottom: 10
    },
    stepBtn: {
      paddingHorizontal: 14,
      paddingVertical: 9,
      borderRadius: radii['2xl'],
      borderWidth: 1.5,
      borderColor: '#BDBDBD',
      backgroundColor: c.background
    },
    stepBtnActive: {
      borderColor: '#7C4DFF',
      backgroundColor: c.secondaryContainer
    },
    stepLabel: {
      color: '#616161'
    },
    stepLabelActive: {
      color: '#7C4DFF',
      fontWeight: fontWeights.bold
    },
    scaleNote: {
      opacity: 0.6,
      marginTop: 4
    },
    divider: {
      marginVertical: 10
    },
    previewLabel: {
      opacity: 0.5,
      marginBottom: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5
    },
    previewHeading: {
      fontWeight: fontWeights.bold,
      color: '#212121',
      marginBottom: 4
    },
    previewBody: {
      color: '#424242'
    },
    previewCaption: {
      color: '#757575'
    },
    scopeText: {
      opacity: 0.7,
      lineHeight: 20
    },
    savedText: {
      color: '#4CAF50',
      textAlign: 'center',
      marginBottom: 6
    },
    saveBtn: {
      marginBottom: spacing[1]
    }
  });
}
