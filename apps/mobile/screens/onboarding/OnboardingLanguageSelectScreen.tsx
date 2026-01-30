import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, RadioButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getPrimaryUser } from "../../data/mockSelectors";
import { PButton, PText } from "../../components";

const LanguageSelectContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const user = getPrimaryUser();
  const [selectedLanguage, setSelectedLanguage] = React.useState(user?.language ?? "tr");

  return (
    <>
      <SectionCard title="Dilini seç">
        <PText variant="bodyMedium" style={styles.helperText}>
          Uygulamayı kullanacağın dili seçerek başlayalım.
        </PText>
        <RadioButton.Group
          onValueChange={(value) => setSelectedLanguage(value)}
          value={selectedLanguage}
        >
          <RadioButton.Item
            label="Türkçe"
            value="tr"
            disabled={isOffline}
          />
          <RadioButton.Item
            label="English"
            value="en"
            disabled={isOffline}
          />
          <RadioButton.Item
            label="Español"
            value="es"
            disabled={isOffline}
          />
        </RadioButton.Group>
        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline}
          onPress={() => navigation.navigate("AuthRegister")}
        >
          Devam Et
        </PButton>
      </SectionCard>
      <SectionCard title="Dil tercihi">
        <PText variant="bodySmall" style={styles.bodyText}>
          Tercihini daha sonra Profil &gt; Dil bölümünden güncelleyebilirsin.
        </PText>
      </SectionCard>
    </>
  );
};

export const OnboardingLanguageSelectScreen = ({
  route,
}: {
  route?: { params?: { state?: ScreenState } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Dil Seçimi" subtitle="Dil seçenekleri hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Dil Seçimi" subtitle="Dil seçenekleri bulunamadı">
        <StateMessage
          title="Dil seçenekleri bulunamadı"
          description="Uygulama dili için seçenekleri tekrar yükleyebilirsin."
          actionLabel="Tekrar Dene"
          icon="translate"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Dil Seçimi" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Dil seçenekleri yüklenemedi"
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
      <ScreenLayout title="Dil Seçimi" subtitle="Önbellekteki tercihler">
        <OfflineNotice />
        <LanguageSelectContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Dil Seçimi" subtitle="Dilini seç">
      <LanguageSelectContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  helperText: {
    marginBottom: 12,
  },
  primaryButton: {
    marginTop: 16,
    alignSelf: "flex-start",
  },
  bodyText: {
    lineHeight: 20,
  },
});
