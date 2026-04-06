import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { PButton, PChip, PText } from '../../components';
import { getPrimaryUser, getReadingSettings } from '../../data/mockSelectors';
import { ColorTokens, fontSizes, fontWeights, palette, radii, spacing, useAppTheme } from '../../theme';
import { OfflineNotice } from '../components/OfflineNotice';
import { ScreenLayout } from '../components/ScreenLayout';
import { ScreenState, resolveScreenState } from '../components/ScreenState';
import { SectionCard } from '../components/SectionCard';
import { SkeletonBlock } from '../components/SkeletonBlock';
import { StateMessage } from '../components/StateMessage';

type Background = 'Beyaz' | 'Sepia' | 'Koyu';
type LineHeight = 'Normal' | 'Genis' | 'Cok Genis';

const BG_OPTIONS: { key: Background; bg: string; text: string }[] = [
  { key: 'Beyaz', bg: '#FFFFFF', text: '#1F2937' },
  { key: 'Sepia', bg: '#FDF6E3', text: '#3B2F2F' },
  { key: 'Koyu', bg: '#1A1A2E', text: '#E2E8F0' }
];

const LINE_HEIGHT_MAP: Record<LineHeight, number> = {
  Normal: 22,
  Genis: 30,
  'Cok Genis': 38
};

const ContentEbookSettingsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const { colors: c } = useAppTheme();
  const styles = useMemo(() => makeStyles(c), [c]);

  const user = getPrimaryUser();
  const readingSettings = getReadingSettings();
  const savedSettings = readingSettings.find((s: any) => s.user_id === user?.id);

  // AC-FR-E7-03-04: persisted settings as starting values
  const [fontSize, setFontSize] = useState<number>(savedSettings?.font_size ?? 16);
  const [background, setBackground] = useState<Background>(
    savedSettings?.background === 'sepia' ? 'Sepia' : savedSettings?.background === 'dark' ? 'Koyu' : 'Beyaz'
  );
  const [lineHeight, setLineHeight] = useState<LineHeight>(
    savedSettings?.line_height === '2.0' ? 'Cok Genis' : savedSettings?.line_height === '1.75' ? 'Genis' : 'Normal'
  );
  const [saved, setSaved] = useState(false);

  const activeBg = BG_OPTIONS.find(b => b.key === background) ?? BG_OPTIONS[0];
  const previewLineHeight = LINE_HEIGHT_MAP[lineHeight];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* AC-FR-E7-03-01: font size selector using step buttons */}
      <SectionCard title="Yazi Boyutu">
        <View style={styles.stepRow}>
          <TouchableOpacity
            style={[styles.stepBtn, fontSize <= 12 && styles.stepBtnDisabled]}
            onPress={() => setFontSize(f => Math.max(12, f - 2))}
            accessibilityLabel="Yazi boyutunu kucult"
            disabled={fontSize <= 12}
          >
            <PText style={styles.stepBtnLabel}>A-</PText>
          </TouchableOpacity>
          <View style={styles.stepValue}>
            <PText style={styles.stepValueLabel}>{fontSize}px</PText>
          </View>
          <TouchableOpacity
            style={[styles.stepBtn, fontSize >= 24 && styles.stepBtnDisabled]}
            onPress={() => setFontSize(f => Math.min(24, f + 2))}
            accessibilityLabel="Yazi boyutunu buyut"
            disabled={fontSize >= 24}
          >
            <PText style={styles.stepBtnLabel}>A+</PText>
          </TouchableOpacity>
        </View>
      </SectionCard>

      {/* AC-FR-E7-03-02: background color selection */}
      <SectionCard title="Arka Plan">
        <View style={styles.bgRow}>
          {BG_OPTIONS.map(opt => (
            <PChip
              key={opt.key}
              selected={background === opt.key}
              onPress={() => setBackground(opt.key)}
              style={[
                styles.bgChip,
                {
                  backgroundColor: opt.bg,
                  borderWidth: background === opt.key ? 2 : 1,
                  borderColor: background === opt.key ? '#6B46C1' : '#E5E7EB'
                }
              ]}
              textStyle={{ color: opt.text }}
            >
              {opt.key}
            </PChip>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E7-03-03: line height selector */}
      <SectionCard title="Satir Araligi">
        <View style={styles.lineHeightRow}>
          {(['Normal', 'Genis', 'Cok Genis'] as LineHeight[]).map(lh => (
            <PChip key={lh} selected={lineHeight === lh} onPress={() => setLineHeight(lh)} style={styles.lineHChip}>
              {lh}
            </PChip>
          ))}
        </View>
      </SectionCard>

      {/* Live preview */}
      <SectionCard title="Onizleme">
        <View style={[styles.preview, { backgroundColor: activeBg.bg }]}>
          <PText style={[styles.previewText, { fontSize, lineHeight: previewLineHeight, color: activeBg.text }]}>
            Sukur, kucuk anlarin farkinda olmaktir. Bu satirlar okuma ayarlarinin nasil gorundugunu gosterir.
          </PText>
        </View>
      </SectionCard>

      {/* AC-FR-E7-03-04: save settings */}
      <SectionCard title="Kaydet">
        {saved && <PText style={styles.savedLabel}>Ayarlar kaydedildi.</PText>}
        <PButton mode="contained" disabled={isOffline} onPress={handleSave}>
          Ayarlari Kaydet
        </PButton>
      </SectionCard>
    </>
  );
};

export const ContentEbookSettingsScreen = ({
  route
}: {
  route?: { params?: { state?: ScreenState; id?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === 'loading') {
    return (
      <ScreenLayout title="Okuma Ayarlari" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor">
          <SkeletonBlock height={60} />
        </SectionCard>
        <SectionCard title="Onizleme">
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }
  if (state === 'error') {
    return (
      <ScreenLayout title="Okuma Ayarlari" subtitle="Bir sorun olustu">
        <StateMessage
          title="Ayarlar yuklenemedi"
          description="Varsayilan ayarlar uygulanacak."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }
  if (state === 'offline') {
    return (
      <ScreenLayout title="Okuma Ayarlari" subtitle="Onbellekteki ayarlar">
        <OfflineNotice />
        <ContentEbookSettingsContent isOffline />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="Okuma Ayarlari" subtitle="Okuma deneyimini ozellestir">
      <ContentEbookSettingsContent />
    </ScreenLayout>
  );
};

function makeStyles(c: ColorTokens) {
  return StyleSheet.create({
    stepRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[1.5] },
    stepBtn: {
      width: 48,
      height: 48,
      borderRadius: radii['3xl'],
      borderWidth: 1,
      borderColor: '#6B46C1',
      justifyContent: 'center',
      alignItems: 'center'
    },
    stepBtnDisabled: { borderColor: '#E5E7EB', opacity: 0.4 },
    stepBtnLabel: { fontSize: fontSizes.lg, fontWeight: fontWeights.bold, color: '#6B46C1' },
    stepValue: {
      paddingHorizontal: spacing[2],
      paddingVertical: spacing[1],
      backgroundColor: palette.purple50,
      borderRadius: radii.md
    },
    stepValueLabel: { fontSize: fontSizes['3xl'], fontWeight: fontWeights.extraBold, color: '#6B46C1' },
    bgRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    bgChip: { borderRadius: radii.md },
    lineHeightRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
    lineHChip: {},
    preview: { padding: spacing[2], borderRadius: radii.lg, borderWidth: 1, borderColor: '#E5E7EB' },
    previewText: { lineHeight: 26 },
    savedLabel: { fontSize: fontSizes.md, color: '#15803D', marginBottom: spacing[1] }
  });
}
