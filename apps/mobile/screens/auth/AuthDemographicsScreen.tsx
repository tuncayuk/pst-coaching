import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PActivityIndicator, PButton, PText, PTextInput } from "../../components";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { ScreenState, resolveScreenState } from "../components/ScreenState";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";

const COUNTRIES = [
  "Turkiye",
  "Almanya",
  "Amerika Birlesik Devletleri",
  "Avustralya",
  "Avusturya",
  "Azerbaycan",
  "Belcika",
  "Birlesik Krallik",
  "Fransa",
  "Hollanda",
  "Irak",
  "Iran",
  "Ispanya",
  "Isvec",
  "Isvicre",
  "Italya",
  "Japonya",
  "Kanada",
  "Kazakistan",
  "Kirgizistan",
  "Kuzey Kibris",
  "Misir",
  "Ozbekistan",
  "Polonya",
  "Romanya",
  "Rusya",
  "Suudi Arabistan",
  "Turkmenistan",
  "Ukrayna",
  "Yunanistan",
];

const DemographicsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<string | null>(null);
  const [country, setCountry] = React.useState("");
  const [countrySearch, setCountrySearch] = React.useState("");
  const [showCountryDropdown, setShowCountryDropdown] = React.useState(false);
  const navigation = useNavigation<any>();

  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const ageNum = parseInt(age);
  const isFormValid = age.length > 0 && ageNum >= 13 && ageNum <= 120 && country.length > 0;
  const ageError = age.length > 0 && (isNaN(ageNum) || ageNum < 13 || ageNum > 120);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.iconContainer}>
          <PText style={styles.icon}>📊</PText>
        </View>
        <PText style={styles.title}>Demografi Bilgileri</PText>
        <PText style={styles.subtitle}>
          İçeriğe başlamadan önce lütfen bilgilerinizi tamamlayın
        </PText>
        <View style={styles.infoCard}>
          <PText style={styles.infoText}>
            <PText style={styles.infoBold}>💡 Neden soruluyor?</PText>
            {"\n"}Bu bilgiler size daha uygun içerik önerileri sunmamıza yardımcı olur. Verileriniz
            güvenli şekilde saklanır.
          </PText>
        </View>
        <View style={styles.inputGroup}>
          <PText style={styles.label}>Ulke *</PText>
          <TouchableOpacity
            onPress={() => setShowCountryDropdown(!showCountryDropdown)}
            disabled={isOffline}
            accessibilityRole="button"
            accessibilityLabel="Ulke secimi, zorunlu alan"
          >
            <View style={[styles.countrySelector, !country && styles.countrySelectorEmpty]}>
              <PText style={[styles.countryText, !country && styles.countryPlaceholder]}>
                {country || "Ulke secin"}
              </PText>
              <PText style={styles.countryChevron}>
                {showCountryDropdown ? "\u25B4" : "\u25BE"}
              </PText>
            </View>
          </TouchableOpacity>
          {showCountryDropdown && (
            <View style={styles.dropdownContainer}>
              <PTextInput
                mode="outlined"
                value={countrySearch}
                onChangeText={setCountrySearch}
                placeholder="Ulke ara..."
                style={styles.searchInput}
                outlineStyle={styles.searchOutline}
                editable={!isOffline}
                accessibilityLabel="Ulke ara"
              />
              <ScrollView
                style={styles.dropdownList}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
              >
                {filteredCountries.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.dropdownItem, item === country && styles.dropdownItemSelected]}
                    onPress={() => {
                      setCountry(item);
                      setCountrySearch("");
                      setShowCountryDropdown(false);
                    }}
                    accessibilityRole="button"
                    accessibilityState={{ selected: item === country }}
                  >
                    <PText
                      style={[
                        styles.dropdownItemText,
                        item === country && styles.dropdownItemTextSelected,
                      ]}
                    >
                      {item}
                    </PText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
        <View style={styles.inputGroup}>
          <PText style={styles.label}>Yas *</PText>
          <PTextInput
            mode="outlined"
            keyboardType="number-pad"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineStyle={[styles.inputOutline, ageError && styles.inputOutlineError]}
            editable={!isOffline}
            placeholder="Yasinizi girin"
            accessibilityLabel="Yas girisi, zorunlu alan"
          />
          {ageError ? (
            <PText style={styles.errorText}>Yas 13-120 arasinda olmalidir</PText>
          ) : (
            <PText style={styles.helperText}>13-120 yas arasi</PText>
          )}
        </View>
        <PText style={styles.label}>Cinsiyet</PText>
        <View style={styles.genderRow}>
          <PButton
            mode={gender === "Kadin" ? "contained" : "outlined"}
            onPress={() => setGender("Kadin")}
            style={styles.genderButton}
            disabled={isOffline}
            accessibilityLabel="Kadin"
            accessibilityState={{ selected: gender === "Kadin" }}
          >
            Kadin
          </PButton>
          <PButton
            mode={gender === "Erkek" ? "contained" : "outlined"}
            onPress={() => setGender("Erkek")}
            style={styles.genderButton}
            disabled={isOffline}
            accessibilityLabel="Erkek"
            accessibilityState={{ selected: gender === "Erkek" }}
          >
            Erkek
          </PButton>
        </View>
        <PButton
          mode="outlined"
          onPress={() => setGender("Belirtmek istemiyorum")}
          style={styles.genderButtonFull}
          disabled={isOffline}
          accessibilityLabel="Belirtmek istemiyorum"
        >
          Belirtmek istemiyorum
        </PButton>
        <PButton
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => {
            navigation.getParent()?.navigate("MainTabs");
          }}
          style={styles.button}
        >
          Kaydet ve Devam Et
        </PButton>
        <PText style={styles.requiredText}>* Zorunlu alanlar</PText>
      </ScrollView>
    </SafeAreaView>
  );
};

export const AuthDemographicsScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Demografi Bilgileri" subtitle="Yükleniyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Demografi Bilgileri" subtitle="Bilgi bulunamadı">
        <StateMessage
          title="Bilgi bulunamadı"
          description="Yeniden deneyebilirsin."
          actionLabel="Tekrar Dene"
          icon="account-details-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Demografi Bilgileri" subtitle="Bir sorun oluştu">
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

  if (state === "offline") {
    return (
      <>
        <OfflineNotice />
        <DemographicsContent isOffline />
      </>
    );
  }

  return <DemographicsContent />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 56,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2B1B5D",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#404040",
    marginBottom: 24,
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: "#E0F7FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: "#00B4D8",
  },
  infoText: {
    color: "#171717",
    lineHeight: 24,
  },
  infoBold: {
    fontWeight: "700",
  },
  inputGroup: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
  },
  inputContent: {
    paddingVertical: 16,
  },
  inputOutline: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#D4D4D4",
  },
  helperText: {
    color: "#525252",
    marginTop: 6,
    fontSize: 12,
  },
  errorText: {
    color: "#DC2626",
    marginTop: 6,
    fontSize: 12,
  },
  inputOutlineError: {
    borderColor: "#EF4444",
  },
  label: {
    fontWeight: "600",
    color: "#171717",
    marginBottom: 8,
    marginTop: 8,
  },
  genderRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  genderButton: {
    flex: 1,
  },
  genderButtonFull: {
    marginBottom: 16,
  },
  countrySelector: {
    borderWidth: 2,
    borderColor: "#D4D4D4",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  countrySelectorEmpty: {
    borderColor: "#D4D4D4",
  },
  countryText: {
    fontSize: 16,
    color: "#171717",
  },
  countryPlaceholder: {
    color: "#9CA3AF",
  },
  countryChevron: {
    fontSize: 14,
    color: "#525252",
  },
  dropdownContainer: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    maxHeight: 240,
    overflow: "hidden",
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    margin: 8,
  },
  searchOutline: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#D4D4D4",
  },
  dropdownList: {
    maxHeight: 180,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  dropdownItemSelected: {
    backgroundColor: "#E0F7FA",
  },
  dropdownItemText: {
    fontSize: 15,
    color: "#171717",
  },
  dropdownItemTextSelected: {
    color: "#00B4D8",
    fontWeight: "600",
  },
  button: {
    marginBottom: 12,
    borderRadius: 12,
  },
  requiredText: {
    textAlign: "center",
    color: "#525252",
    marginTop: 8,
    fontSize: 12,
  },
});
