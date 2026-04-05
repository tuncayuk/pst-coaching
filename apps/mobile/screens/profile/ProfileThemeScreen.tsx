import React, { useState } from "react";
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
                {/* Pattern/icon indicator - AC-FR-E10-03-02 */}
                <View style={[styles.cbSwatch, { backgroundColor: mode.color }]} accessible={false}>
                  {mode.key === "deuteranopia" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>[D]</PText>
                  )}
                  {mode.key === "protanopia" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>[P]</PText>
                  )}
                  {mode.key === "tritanopia" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>[T]</PText>
                  )}
                  {mode.key === "none" && (
                    <PText style={styles.cbIcon} accessibilityElementsHidden>[N]</PText>
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
      <ScreenLayout title="Tema ve Kontrast" subtitle="Ayarlar hazirlaniyor">
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
