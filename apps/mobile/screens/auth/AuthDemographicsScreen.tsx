import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PButton, PText, PTextInput } from "../../components";

const DemographicsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<string | null>(null);
  const navigation = useNavigation<any>();

  const isFormValid = age.length > 0 && parseInt(age) >= 13 && parseInt(age) <= 120;

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
            {"\n"}Bu bilgiler size daha uygun içerik önerileri sunmamıza yardımcı olur. Verileriniz güvenli şekilde saklanır.
          </PText>
        </View>
        <View style={styles.inputGroup}>
          <PText style={styles.label}>Yaş *</PText>
          <PTextInput
            mode="outlined"
            keyboardType="number-pad"
            value={age}
            onChangeText={setAge}
            style={styles.input}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            editable={!isOffline}
            placeholder="Yaşınızı girin"
          />
          <PText style={styles.helperText}>13-120 yaş arası</PText>
        </View>
        <PText style={styles.label}>Cinsiyet</PText>
        <View style={styles.genderRow}>
          <PButton
            mode={gender === "Kadın" ? "contained" : "outlined"}
            onPress={() => setGender("Kadın")}
            style={styles.genderButton}
            disabled={isOffline}
          >
            Kadın
          </PButton>
          <PButton
            mode={gender === "Erkek" ? "contained" : "outlined"}
            onPress={() => setGender("Erkek")}
            style={styles.genderButton}
            disabled={isOffline}
          >
            Erkek
          </PButton>
        </View>
        <PButton
          mode="outlined"
          onPress={() => setGender("Belirtmek istemiyorum")}
          style={styles.genderButtonFull}
          disabled={isOffline}
        >
          Belirtmek istemiyorum
        </PButton>
        <PText style={styles.label}>Ülke *</PText>
        <View style={styles.countryContainer}>
          <PText style={styles.countryText}>Türkiye</PText>
        </View>
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
          <ActivityIndicator animating />
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
    fontSize: 28,
    fontWeight: "800",
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
  countryContainer: {
    borderWidth: 2,
    borderColor: "#D4D4D4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    backgroundColor: "#FFFFFF",
  },
  countryText: {
    fontSize: 16,
    color: "#171717",
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
