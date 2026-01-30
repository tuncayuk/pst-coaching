import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";

const DemographicsContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState<string | null>(null);
  const [country, setCountry] = React.useState("Türkiye");
  const navigation = useNavigation<any>();

  const isFormValid = age.length > 0 && parseInt(age) >= 13 && parseInt(age) <= 120 && country.length > 0;

  return (
    <>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>📊</Text>
      </View>
      <SectionCard title="">
        <Text variant="headlineMedium" style={styles.title}>
          Demografi Bilgileri
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          İçeriğe başlamadan önce lütfen bilgilerinizi tamamlayın
        </Text>
        <View style={styles.infoCard}>
          <Text variant="bodySmall" style={styles.infoText}>
            <Text style={styles.infoBold}>💡 Neden soruluyor?</Text>
            {"\n"}Bu bilgiler size daha uygun içerik önerileri sunmamıza yardımcı olur. Verileriniz güvenli şekilde saklanır.
          </Text>
        </View>
        <TextInput
          label="Yaş *"
          mode="outlined"
          keyboardType="number-pad"
          value={age}
          onChangeText={setAge}
          style={styles.input}
          editable={!isOffline}
          placeholder="Yaşınızı girin"
        />
        <Text variant="bodySmall" style={styles.helperText}>
          13-120 yaş arası
        </Text>
        <Text variant="titleSmall" style={styles.label}>
          Cinsiyet
        </Text>
        <View style={styles.genderRow}>
          <Button
            mode={gender === "Kadın" ? "contained" : "outlined"}
            onPress={() => setGender("Kadın")}
            style={styles.genderButton}
            disabled={isOffline}
          >
            Kadın
          </Button>
          <Button
            mode={gender === "Erkek" ? "contained" : "outlined"}
            onPress={() => setGender("Erkek")}
            style={styles.genderButton}
            disabled={isOffline}
          >
            Erkek
          </Button>
        </View>
        <Button
          mode="outlined"
          onPress={() => setGender("Belirtmek istemiyorum")}
          style={styles.genderButtonFull}
          disabled={isOffline}
        >
          Belirtmek istemiyorum
        </Button>
        <Text variant="titleSmall" style={styles.label}>
          Ülke *
        </Text>
        <View style={styles.countryContainer}>
          <Text style={styles.countryText}>{country}</Text>
        </View>
        <Button
          mode="contained"
          disabled={isOffline || !isFormValid}
          onPress={() => {
            // Save demographics and navigate to MainTabs (first content start)
            // TODO: Save demographics data
            navigation.getParent()?.navigate("MainTabs");
          }}
          style={styles.button}
        >
          Kaydet ve Devam Et
        </Button>
        <Text variant="bodySmall" style={styles.requiredText}>
          * Zorunlu alanlar
        </Text>
      </SectionCard>
    </>
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
      <ScreenLayout title="Demografi Bilgileri" subtitle="Önbellekteki bilgiler">
        <OfflineNotice />
        <DemographicsContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Demografi Bilgileri" subtitle="Kişisel bilgilerinizi tamamlayın">
      <DemographicsContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 48,
  },
  title: {
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
  input: {
    marginBottom: 8,
  },
  helperText: {
    color: "#525252",
    marginBottom: 16,
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
  },
  requiredText: {
    textAlign: "center",
    color: "#525252",
    marginTop: 8,
  },
});
