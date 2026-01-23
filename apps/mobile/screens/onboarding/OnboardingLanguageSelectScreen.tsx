import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  RadioButton,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const LanguageSelectContent = ({ isOffline }: { isOffline?: boolean }) => {
  const [selectedLanguage, setSelectedLanguage] = React.useState("tr");

  return (
    <>
      <SectionCard title="Dilini seç">
        <Text variant="bodyMedium" style={styles.helperText}>
          Uygulamayı kullanacağın dili seçerek başlayalım.
        </Text>
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
        </RadioButton.Group>
        <Button mode="contained" style={styles.primaryButton} disabled={isOffline}>
          Devam Et
        </Button>
      </SectionCard>
      <SectionCard title="Dil tercihi">
        <Text variant="bodySmall" style={styles.bodyText}>
          Tercihini daha sonra Profil &gt; Dil bölümünden güncelleyebilirsin.
        </Text>
      </SectionCard>
    </>
  );
};

export const OnboardingLanguageSelectScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
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
