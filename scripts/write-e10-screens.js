#!/usr/bin/env node
// write-e10-screens.js — Writes all 4 EPIC-10 screen files
const fs = require("fs");
const path = require("path");

const PROFILE_DIR = path.join(__dirname, "../apps/mobile/screens/profile");
const files = {};

// ─────────────────────────────────────────────────────────────────────────
// ProfileAccessibilityScreen  (FR-E10-01)  — HUB + quick toggles
// ─────────────────────────────────────────────────────────────────────────
files["ProfileAccessibilityScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAccessibilitySettings, getPrimaryUser } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PDivider,
  PText,
  PSwitch,
} from "../../components";

// Nav arrow pill
const NavCard = ({
  title,
  subtitle,
  onPress,
  disabled,
  accessibilityLabel,
}: {
  title: string;
  subtitle: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel: string;
}) => (
  <TouchableOpacity
    style={[styles.navCard, disabled && styles.navCardDisabled]}
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    accessibilityHint="Bu erisilebilirlik bolumunu acmak icin dokunun"
  >
    <View style={styles.navCardBody}>
      <PText variant="titleSmall" style={styles.navCardTitle}>{title}</PText>
      <PText variant="bodySmall" style={styles.navCardSub}>{subtitle}</PText>
    </View>
    <PText style={styles.navArrow} accessibilityElementsHidden>›</PText>
  </TouchableOpacity>
);

// Toggle row
const ToggleRow = ({
  label,
  description,
  value,
  onValueChange,
  disabled,
  accessibilityLabel,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
  accessibilityLabel: string;
}) => (
  <View
    style={styles.toggleRow}
    accessibilityRole="switch"
    accessibilityLabel={accessibilityLabel}
    accessibilityState={{ checked: value, disabled }}
  >
    <View style={styles.toggleText}>
      <PText variant="bodyMedium" style={styles.toggleLabel}>{label}</PText>
      <PText variant="bodySmall" style={styles.toggleDesc}>{description}</PText>
    </View>
    <PSwitch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel}
    />
  </View>
);

const ProfileAccessibilityContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const settings = getAccessibilitySettings().find((s: any) => s.user_id === user?.id);

  // AC-FR-E10-01-02: interactive local state, simulates immediate apply
  const [highContrast, setHighContrast] = useState(settings?.high_contrast ?? false);
  const [reduceMotion, setReduceMotion] = useState(settings?.reduce_motion ?? false);

  // Summary for nav cards
  const textSizeLabel = settings?.text_size ?? "normal";
  const themeLabel = settings?.theme ?? "system";

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
          onValueChange={(v) => setHighContrast(v)}
          disabled={isOffline}
          accessibilityLabel={"Yuksek kontrast: " + (highContrast ? "acik" : "kapali")}
        />
        <PDivider style={styles.divider} />
        <ToggleRow
          label="Hareketi Azalt"
          description="Animasyonlari ve gecis efektlerini minimize eder"
          value={reduceMotion}
          onValueChange={(v) => setReduceMotion(v)}
          disabled={isOffline}
          accessibilityLabel={"Hareket azaltma: " + (reduceMotion ? "acik" : "kapali")}
        />
      </SectionCard>

      {/* AC-FR-E10-01-01: navigation to each accessibility sub-screen */}
      <SectionCard title="Detayli Ayarlar">
        <NavCard
          title="Metin Buyutme"
          subtitle={"Mevcut: " + textSizeLabel + " · Adim secici + onizleme"}
          onPress={() => navigation.navigate("ProfileTextScale")}
          disabled={isOffline}
          accessibilityLabel={"Metin buyutme ayarina git. Mevcut: " + textSizeLabel}
        />
        <PDivider style={styles.divider} />
        <NavCard
          title="Tema ve Yuksek Kontrast"
          subtitle={"Tema: " + themeLabel + " · Acik / Koyu / Sistem"}
          onPress={() => navigation.navigate("ProfileTheme")}
          disabled={isOffline}
          accessibilityLabel={"Tema ve kontrast ayarina git. Mevcut: " + themeLabel}
        />
        <PDivider style={styles.divider} />
        <NavCard
          title="Ekran Okuyucu Uyumu"
          subtitle="VoiceOver ve TalkBack desteği durumu"
          onPress={() => navigation.navigate("ProfileScreenReader")}
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

export const ProfileAccessibilityScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Erisilebilirlik" subtitle="Ayarlar hazirlanıyor">
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

  if (state === "empty") {
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

  if (state === "error") {
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

  if (state === "offline") {
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

const styles = StyleSheet.create({
  sectionHint: {
    opacity: 0.6,
    marginBottom: 12,
    lineHeight: 18,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    gap: 12,
  },
  toggleText: {
    flex: 1,
  },
  toggleLabel: {
    fontWeight: "600",
  },
  toggleDesc: {
    opacity: 0.65,
    marginTop: 2,
    lineHeight: 18,
  },
  divider: {
    marginVertical: 2,
  },
  navCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  navCardDisabled: {
    opacity: 0.5,
  },
  navCardBody: {
    flex: 1,
  },
  navCardTitle: {
    fontWeight: "600",
    marginBottom: 2,
  },
  navCardSub: {
    opacity: 0.65,
    lineHeight: 18,
  },
  navArrow: {
    fontSize: 22,
    opacity: 0.4,
    paddingLeft: 8,
  },
  offlineNote: {
    opacity: 0.65,
    lineHeight: 20,
    fontStyle: "italic",
  },
  saveBtn: {
    marginTop: 4,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ProfileTextScaleScreen  (FR-E10-02)
// ─────────────────────────────────────────────────────────────────────────
files["ProfileTextScaleScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAccessibilitySettings, getPrimaryUser } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PDivider, PText } from "../../components";

// AC-FR-E10-02-01: 5-step text size values with display scale factors
const TEXT_SIZES = [
  { key: "xsmall",  label: "Cok Kucuk", scale: 0.82, description: "Daha fazla icerik gosterir" },
  { key: "small",   label: "Kucuk",     scale: 0.91, description: "Kompakt gorunum" },
  { key: "normal",  label: "Normal",    scale: 1.00, description: "Varsayilan boyut" },
  { key: "large",   label: "Buyuk",     scale: 1.14, description: "Daha kolay okuma" },
  { key: "xlarge",  label: "Cok Buyuk", scale: 1.30, description: "Maksimum okunabilirlik" },
];

// AC-FR-E10-02-01: live preview text
const PREVIEW_TEXT =
  "Bu bir onizleme cumlesidir. Sectiginiz metin boyutunun iceriklerinizde nasil gorunecegini burada canli olarak takip edebilirsiniz.";

const ProfileTextScaleContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const settings = getAccessibilitySettings().find((s: any) => s.user_id === user?.id);
  const initialSize = TEXT_SIZES.find((s) => s.key === (settings?.text_size ?? "normal")) ?? TEXT_SIZES[2];

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
        <View
          style={styles.stepRow}
          accessibilityRole="radiogroup"
          accessibilityLabel="Metin boyutu secimleri"
        >
          {TEXT_SIZES.map((size) => {
            const isSelected = selected.key === size.key;
            return (
              <TouchableOpacity
                key={size.key}
                style={[styles.stepBtn, isSelected && styles.stepBtnActive]}
                onPress={() => setSelected(size)}
                disabled={isOffline}
                accessibilityRole="radio"
                accessibilityLabel={size.label + (isSelected ? ", secili" : "")}
                accessibilityState={{ selected: isSelected }}
              >
                <PText
                  variant="labelMedium"
                  style={[styles.stepLabel, isSelected && styles.stepLabelActive]}
                >
                  {size.label}
                </PText>
              </TouchableOpacity>
            );
          })}
        </View>
        <PText variant="bodySmall" style={styles.scaleNote}>
          Olcek: {Math.round(selected.scale * 100)}% — {selected.description}
        </PText>
      </SectionCard>

      {/* AC-FR-E10-02-01/03: live preview with word wrap, no overflow */}
      <SectionCard title="Canli Onizleme">
        <PText variant="bodySmall" style={styles.previewLabel}>
          Baslık ornegi
        </PText>
        <PText
          style={[styles.previewHeading, { fontSize: Math.round(20 * selected.scale) }]}
          accessibilityLabel={"Baslik onizlemesi, boyut " + selected.label}
        >
          Icerik Basligı
        </PText>
        <PDivider style={styles.divider} />
        <PText variant="bodySmall" style={styles.previewLabel}>
          Govde metin ornegi
        </PText>
        {/* AC-FR-E10-02-03: no overflow, line wrapping preserved */}
        <PText
          style={[styles.previewBody, { fontSize: Math.round(14 * selected.scale), lineHeight: Math.round(22 * selected.scale) }]}
          numberOfLines={0}
          accessibilityLabel={"Govde metin onizlemesi, boyut " + selected.label}
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
          12 Nisan 2026 · 3 dakika okuma
        </PText>
      </SectionCard>

      {/* AC-FR-E10-02-02: note about global application */}
      <SectionCard title="Etki Alani">
        <PText variant="bodySmall" style={styles.scopeText}>
          Secilen metin boyutu; yolculuklar, atölyeler, e-Kitaplar ve tum uygulama iceriklerine uygulanir.
        </PText>
      </SectionCard>

      <SectionCard title="">
        {saved ? (
          <PText variant="labelMedium" style={styles.savedText}
            accessibilityLiveRegion="polite"
            accessibilityLabel="Metin boyutu kaydedildi"
          >
            Kaydedildi
          </PText>
        ) : null}
        <PButton
          mode="contained"
          disabled={isOffline}
          accessibilityLabel={"Metin boyutu kaydet: " + selected.label}
          style={styles.saveBtn}
          onPress={handleSave}
        >
          Kaydet
        </PButton>
        <PButton
          mode="text"
          accessibilityLabel="Geri don"
          onPress={() => navigation.goBack()}
        >
          Geri Don
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileTextScaleScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Metin Boyutu" subtitle="Ayarlar hazirlanıyor">
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

  if (state === "empty") {
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

  if (state === "error") {
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

  if (state === "offline") {
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

const styles = StyleSheet.create({
  hint: {
    opacity: 0.6,
    marginBottom: 12,
    lineHeight: 18,
  },
  stepRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  stepBtn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#BDBDBD",
    backgroundColor: "#FAFAFA",
  },
  stepBtnActive: {
    borderColor: "#7C4DFF",
    backgroundColor: "#EDE7F6",
  },
  stepLabel: {
    color: "#616161",
  },
  stepLabelActive: {
    color: "#7C4DFF",
    fontWeight: "700",
  },
  scaleNote: {
    opacity: 0.6,
    marginTop: 4,
  },
  divider: {
    marginVertical: 10,
  },
  previewLabel: {
    opacity: 0.5,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  previewHeading: {
    fontWeight: "700",
    color: "#212121",
    marginBottom: 4,
  },
  previewBody: {
    color: "#424242",
  },
  previewCaption: {
    color: "#757575",
  },
  scopeText: {
    opacity: 0.7,
    lineHeight: 20,
  },
  savedText: {
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 6,
  },
  saveBtn: {
    marginBottom: 8,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ProfileThemeScreen  (FR-E10-03)
// ─────────────────────────────────────────────────────────────────────────
files["ProfileThemeScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAccessibilitySettings, getPrimaryUser } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PDivider,
  PRadioButtonGroup,
  PRadioButtonItem,
  PText,
  PSwitch,
} from "../../components";

// AC-FR-E10-03-03: theme options
type ThemeOption = "light" | "dark" | "system";
const THEME_OPTIONS: Array<{ value: ThemeOption; label: string; desc: string }> = [
  { value: "light",  label: "Acik Tema",  desc: "Beyaz arka plan, koyu metin"   },
  { value: "dark",   label: "Koyu Tema",  desc: "Koyu arka plan, acik metin"    },
  { value: "system", label: "Sistem",     desc: "Cihaz temasini takip eder"     },
];

// AC-FR-E10-03-02: color blindness modes
type ColorBlindMode = "none" | "deuteranopia" | "protanopia" | "tritanopia";
const CB_MODES: Array<{ key: ColorBlindMode; label: string; desc: string; color: string }> = [
  { key: "none",         label: "Normal",          desc: "Tum renkler varsayilan", color: "#7C4DFF" },
  { key: "deuteranopia", label: "Deuteranopi",      desc: "Yesil koru destegi",    color: "#00897B" },
  { key: "protanopia",   label: "Protanopi",        desc: "Kirmizi koru destegi",  color: "#1E88E5" },
  { key: "tritanopia",   label: "Tritanopi",        desc: "Mavi koru destegi",     color: "#F57C00" },
];

// Visual theme preview swatch
const ThemeSwatch = ({
  theme,
  isSelected,
}: {
  theme: ThemeOption;
  isSelected: boolean;
}) => {
  const bg = theme === "dark" ? "#212121" : theme === "light" ? "#FFFFFF" : "#F5F5F5";
  const textColor = theme === "dark" ? "#E0E0E0" : "#212121";
  return (
    <View
      style={[styles.swatch, { backgroundColor: bg }, isSelected && styles.swatchSelected]}
      accessible={false}
    >
      <PText style={[styles.swatchText, { color: textColor }]}>Aa</PText>
    </View>
  );
};

const ProfileThemeContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const settings = getAccessibilitySettings().find((s: any) => s.user_id === user?.id);

  // AC-FR-E10-03-03: theme selection
  const [theme, setTheme] = useState<ThemeOption>((settings?.theme as ThemeOption) ?? "system");
  // AC-FR-E10-03-01: high contrast mode
  const [highContrast, setHighContrast] = useState(settings?.high_contrast ?? false);
  // AC-FR-E10-03-02: color blindness mode
  const [cbMode, setCbMode] = useState<ColorBlindMode>("none");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      {/* AC-FR-E10-03-03: theme selector */}
      <SectionCard title="Tema Secimi">
        <PText variant="bodySmall" style={styles.hint}>
          Tema tercihinizi secin; aninda onizleme saglanir.
        </PText>
        <PRadioButtonGroup
          value={theme}
          onValueChange={(v) => setTheme(v as ThemeOption)}
        >
          {THEME_OPTIONS.map((opt) => (
            <View key={opt.value}>
              <View
                style={styles.themeRow}
                accessibilityRole="radio"
                accessibilityLabel={opt.label + ", " + opt.desc}
                accessibilityState={{ selected: theme === opt.value }}
              >
                <ThemeSwatch theme={opt.value} isSelected={theme === opt.value} />
                <View style={styles.themeText}>
                  <PText variant="titleSmall" style={styles.themeLabel}>{opt.label}</PText>
                  <PText variant="bodySmall" style={styles.themeDesc}>{opt.desc}</PText>
                </View>
                <PRadioButtonItem
                  value={opt.value}
                  label=""
                  disabled={isOffline}
                  style={styles.radioHide}
                />
              </View>
              {opt.value !== "system" && <PDivider style={styles.divider} />}
            </View>
          ))}
        </PRadioButtonGroup>
      </SectionCard>

      {/* AC-FR-E10-03-01: high contrast mode with 7:1 notice */}
      <SectionCard title="Yuksek Kontrast">
        <PText variant="bodySmall" style={styles.hint}>
          Aktif oldugunda metin/arka plan kontrast orani en az 7:1 olarak ayarlanir (WCAG AAA).
        </PText>
        <View
          style={styles.toggleRow}
          accessibilityRole="switch"
          accessibilityLabel={"Yuksek kontrast: " + (highContrast ? "acik" : "kapali")}
          accessibilityState={{ checked: highContrast, disabled: isOffline }}
        >
          <View style={styles.toggleText}>
            <PText variant="bodyMedium" style={styles.toggleLabel}>Yuksek Kontrast</PText>
            <PText variant="bodySmall" style={styles.toggleDesc}>
              7:1 kontrast orani (WCAG AAA)
            </PText>
          </View>
          <PSwitch
            value={highContrast}
            onValueChange={(v) => setHighContrast(v)}
            disabled={isOffline}
            accessibilityLabel={"Yuksek kontrast: " + (highContrast ? "acik" : "kapali")}
          />
        </View>
        {highContrast && (
          <View style={styles.contrastBadge} accessibilityLiveRegion="polite">
            <PText variant="labelSmall" style={styles.contrastBadgeText}>
              Kontrast orani: 7:1 aktif
            </PText>
          </View>
        )}
      </SectionCard>

      {/* AC-FR-E10-03-02: color blindness mode with icon+pattern support */}
      <SectionCard title="Renk Koru Destegi">
        <PText variant="bodySmall" style={styles.hint}>
          Renk koru destegi; ikon ve desen eslikli renk kodlamasi saglar.
        </PText>
        <View
          style={styles.cbGrid}
          accessibilityRole="radiogroup"
          accessibilityLabel="Renk koru modu secimleri"
        >
          {CB_MODES.map((mode) => {
            const isSelected = cbMode === mode.key;
            return (
              <TouchableOpacity
                key={mode.key}
                style={[styles.cbCard, isSelected && { borderColor: mode.color, backgroundColor: mode.color + "18" }]}
                onPress={() => setCbMode(mode.key)}
                disabled={isOffline}
                accessibilityRole="radio"
                accessibilityLabel={mode.label + ": " + mode.desc + (isSelected ? ", secili" : "")}
                accessibilityState={{ selected: isSelected }}
              >
                {/* Pattern/icon indicator — AC-FR-E10-03-02 */}
                <View style={[styles.cbSwatch, { backgroundColor: mode.color }]} accessible={false}>
                  {mode.key === "deuteranopia" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>◈</PText>
                  )}
                  {mode.key === "protanopia" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>◉</PText>
                  )}
                  {mode.key === "tritanopia" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>◎</PText>
                  )}
                  {mode.key === "none" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>●</PText>
                  )}
                </View>
                <PText variant="labelSmall" style={[styles.cbLabel, isSelected && { color: mode.color }]}>
                  {mode.label}
                </PText>
                <PText variant="labelSmall" style={styles.cbDesc}>{mode.desc}</PText>
              </TouchableOpacity>
            );
          })}
        </View>
      </SectionCard>

      <SectionCard title="">
        {saved && (
          <PText
            variant="labelMedium"
            style={styles.savedText}
            accessibilityLiveRegion="polite"
            accessibilityLabel="Tema ayarlari kaydedildi"
          >
            Kaydedildi
          </PText>
        )}
        <PButton
          mode="contained"
          disabled={isOffline}
          accessibilityLabel="Tema ayarlarini kaydet"
          style={styles.saveBtn}
          onPress={handleSave}
        >
          Kaydet
        </PButton>
        <PButton
          mode="text"
          accessibilityLabel="Geri don"
          onPress={() => navigation.goBack()}
        >
          Geri Don
        </PButton>
      </SectionCard>
    </>
  );
};

export const ProfileThemeScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Tema ve Kontrast" subtitle="Ayarlar hazirlanıyor">
        <SectionCard title="Tema">
          <PActivityIndicator animating accessibilityLabel="Tema ayarlari yukleniyor" />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
        <SectionCard title="Yuksek Kontrast">
          <SkeletonBlock height={52} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Tema ve Kontrast" subtitle="Varsayilan ayarlar">
        <StateMessage
          title="Tema ayari bulunamadi"
          description="Sistem temasi varsayilan olarak uygulanacak."
          actionLabel="Sistem Temasini Sec"
          icon="palette-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Tema ve Kontrast" subtitle="Bir sorun olustu">
        <StateMessage
          title="Tema ayarlari yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Tema ve Kontrast" subtitle="Onbellekteki ayarlar">
        <OfflineNotice />
        <ProfileThemeContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Tema ve Kontrast" subtitle="Gorsel tercihlerini ayarla">
      <ProfileThemeContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  hint: {
    opacity: 0.6,
    marginBottom: 10,
    lineHeight: 18,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  swatch: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  swatchSelected: {
    borderColor: "#7C4DFF",
    borderWidth: 2.5,
  },
  swatchText: {
    fontSize: 16,
    fontWeight: "700",
  },
  themeText: {
    flex: 1,
  },
  themeLabel: {
    fontWeight: "600",
  },
  themeDesc: {
    opacity: 0.6,
    marginTop: 2,
  },
  radioHide: {
    position: "absolute",
    right: 0,
    opacity: 1,
  },
  divider: {
    marginVertical: 2,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    gap: 12,
  },
  toggleText: {
    flex: 1,
  },
  toggleLabel: {
    fontWeight: "600",
  },
  toggleDesc: {
    opacity: 0.65,
    marginTop: 2,
    lineHeight: 18,
  },
  contrastBadge: {
    backgroundColor: "#E8F5E9",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  contrastBadgeText: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  cbGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  cbCard: {
    width: "46%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    padding: 12,
    alignItems: "center",
  },
  cbSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  cbIcon: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "700",
  },
  cbLabel: {
    fontWeight: "600",
    color: "#424242",
    marginBottom: 2,
  },
  cbDesc: {
    opacity: 0.6,
    textAlign: "center",
    lineHeight: 16,
  },
  savedText: {
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 6,
  },
  saveBtn: {
    marginBottom: 8,
  },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// ProfileScreenReaderScreen  (FR-E10-04)
// ─────────────────────────────────────────────────────────────────────────
files["ProfileScreenReaderScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getAccessibilitySettings, getPrimaryUser } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PDivider,
  PText,
  PSwitch,
} from "../../components";

// AC-FR-E10-04-01/02/03/04: feature status checklist
type SupportStatus = "supported" | "partial" | "tip";
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
    id: "button_labels",
    ac: "AC-FR-E10-04-01",
    label: "Buton ve Eleman Etiketleri",
    description: "Tum butonlar ve etkilesimli elemanlar anlamli accessibilityLabel tasiyor.",
    status: "supported",
  },
  {
    id: "focus_order",
    ac: "AC-FR-E10-04-02",
    label: "Odak Sirasi",
    description: "Odak sirasi gorusel siraya uygun ilerliyor (soldan saga, yukari asagi).",
    status: "supported",
  },
  {
    id: "form_labels",
    ac: "AC-FR-E10-04-03",
    label: "Form Etiketleri ve Hata Mesajlari",
    description: "Form alanlari etiket ve hata mesajlariyla ekran okuyucuya aktariliyor.",
    status: "supported",
  },
  {
    id: "image_alt",
    ac: "AC-FR-E10-04-04",
    label: "Gorsel Metin Alternatifleri",
    description: "Grafik ve gorseller icin accessibilityLabel ile metin alternatifleri saglanmis.",
    status: "supported",
  },
];

const TIP_ITEMS = [
  {
    id: "voiceover",
    label: "VoiceOver (iOS)",
    tip: "Ayarlar > Erisilebilirlik > VoiceOver. Gezinmek icin saga/sola kaydirin.",
    icon: "apple",
  },
  {
    id: "talkback",
    label: "TalkBack (Android)",
    tip: "Ayarlar > Erisilebilirlik > TalkBack. Ekran okuyucu hareketleri icin iki parmakla kaydirin.",
    icon: "android",
  },
];

const StatusBadge = ({ status }: { status: SupportStatus }) => {
  const configs = {
    supported: { bg: "#E8F5E9", text: "#2E7D32", label: "Destekleniyor" },
    partial:   { bg: "#FFF8E1", text: "#F57F17", label: "Kismi Destek" },
    tip:       { bg: "#E3F2FD", text: "#1565C0", label: "Ipucu" },
  };
  const cfg = configs[status];
  return (
    <View style={[styles.statusBadge, { backgroundColor: cfg.bg }]}>
      <PText variant="labelSmall" style={{ color: cfg.text, fontWeight: "700" }}>
        {cfg.label}
      </PText>
    </View>
  );
};

const ProfileScreenReaderContent = ({ isOffline }: { isOffline?: boolean }) => {
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
          accessibilityLabel={"Gelismis ekran okuyucu modu: " + (enhancedMode ? "acik" : "kapali")}
          accessibilityState={{ checked: enhancedMode }}
        >
          <View style={styles.toggleText}>
            <PText variant="bodyMedium" style={styles.toggleLabel}>Gelismis Mod</PText>
            <PText variant="bodySmall" style={styles.toggleDesc}>
              Ozet duyurular ve ek baglam saglar
            </PText>
          </View>
          <PSwitch
            value={enhancedMode}
            onValueChange={(v) => setEnhancedMode(v)}
            disabled={isOffline}
            accessibilityLabel={"Gelismis ekran okuyucu modu: " + (enhancedMode ? "acik" : "kapali")}
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
              accessibilityLabel={feature.label + ": " + feature.description + ". Durum: Destekleniyor"}
            >
              <View style={styles.featureBody}>
                <View style={styles.featureTitleRow}>
                  <PText variant="titleSmall" style={styles.featureTitle}>
                    {feature.label}
                  </PText>
                  <PText variant="labelSmall" style={styles.featureAc}>{feature.ac}</PText>
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
          Tum form alanlari; accessibilityLabel, accessibilityHint ve accessibilityState ozellikleriyle
          donanimli olup ekran okuyucu tarafindan etkin sekilde okunmaktadir. Hata mesajlari
          accessibilityLiveRegion="polite" ile duyurulmaktadir.
        </PText>
      </SectionCard>

      {/* Tips for using with VoiceOver/TalkBack */}
      <SectionCard title="Ekran Okuyucu Ipuclari">
        {TIP_ITEMS.map((item, idx) => (
          <View key={item.id}>
            <View
              style={styles.tipRow}
              accessibilityRole="none"
              accessibilityLabel={item.label + ": " + item.tip}
            >
              <PAvatar.Icon
                size={36}
                icon={item.icon}
                style={styles.tipIcon}
                accessible={false}
              />
              <View style={styles.tipBody}>
                <PText variant="titleSmall" style={styles.tipTitle}>{item.label}</PText>
                <PText variant="bodySmall" style={styles.tipText}>{item.tip}</PText>
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

export const ProfileScreenReaderScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
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

  if (state === "empty") {
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

  if (state === "error") {
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

  if (state === "offline") {
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

const styles = StyleSheet.create({
  hint: {
    opacity: 0.6,
    marginBottom: 10,
    lineHeight: 18,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    gap: 12,
  },
  toggleText: { flex: 1 },
  toggleLabel: { fontWeight: "600" },
  toggleDesc: { opacity: 0.65, marginTop: 2, lineHeight: 18 },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: 10,
    gap: 8,
  },
  featureBody: { flex: 1 },
  featureTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  featureTitle: { fontWeight: "600", flex: 1, marginRight: 8 },
  featureAc: { opacity: 0.45, fontSize: 10 },
  featureDesc: { opacity: 0.7, lineHeight: 18 },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
    minWidth: 90,
    alignItems: "center",
  },
  divider: { marginVertical: 2 },
  formNote: { opacity: 0.7, lineHeight: 20 },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    gap: 12,
  },
  tipIcon: {
    backgroundColor: "#EDE7F6",
  },
  tipBody: { flex: 1 },
  tipTitle: { fontWeight: "600", marginBottom: 4 },
  tipText: { opacity: 0.7, lineHeight: 18 },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// Write files
// ─────────────────────────────────────────────────────────────────────────
let written = 0;
for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(PROFILE_DIR, filename);
  fs.writeFileSync(filePath, content, "utf8");
  written++;
  console.log(`Wrote ${filename}`);
}
console.log(`\nScreens written: ${written}/${Object.keys(files).length}`);
