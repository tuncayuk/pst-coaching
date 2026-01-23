import React from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Button, Card, Chip, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getModuleById, getModules, getPackagesForModule } from "../../data/mockSelectors";

type RouteParams = { state?: ScreenState; id?: string };

const ContentModuleHomeContent = ({
  moduleId,
  isOffline,
}: {
  moduleId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const module = getModuleById(moduleId) ?? getModules()[0];
  const packages = module ? getPackagesForModule(module.id) : [];

  return (
    <>
      <SectionCard title="Modül Özeti" actionLabel="Paylaş">
        <Text variant="titleMedium">{module?.title ?? "Modül"}</Text>
        <Text variant="bodySmall" style={styles.subtleText}>
          {module?.description ?? "Modül içeriğini paketlere bölünmüş olarak tamamla."}
        </Text>
        <Chip style={styles.chip} disabled={isOffline}>
          {packages.length} paket
        </Chip>
        <Button
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline || packages.length === 0}
          onPress={() => {
            if (packages[0]) {
              navigation.navigate("Content", {
                screen: "ContentPackageDetail",
                params: { id: packages[0].id },
              });
            }
          }}
        >
          Devam Et
        </Button>
      </SectionCard>

      <SectionCard title="Paketler" actionLabel="Sırala">
        {packages.map((pkg) => (
          <Card key={pkg.id} style={styles.card}>
            <Card.Title title={pkg.title} subtitle={pkg.description} />
            <Card.Actions>
              <Button
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentPackageDetail",
                    params: { id: pkg.id },
                  })
                }
              >
                Paketi Aç
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </SectionCard>
    </>
  );
};

export const ContentModuleHomeScreen = ({ route }: { route?: { params?: RouteParams } }) => {
  const state = resolveScreenState(route);
  const moduleId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Modül" subtitle="Modül yükleniyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
        </SectionCard>
        <SectionCard title="Paketler">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Modül" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Modül bulunamadı"
          description="Bu modül şu anda erişilebilir değil."
          actionLabel="Kütüphaneye Dön"
          icon="layers-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Modül" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Modül yüklenemedi"
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
      <ScreenLayout title="Modül" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentModuleHomeContent moduleId={moduleId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Modül" subtitle="Modül akışı">
      <ContentModuleHomeContent moduleId={moduleId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  subtleText: {
    marginTop: 4,
    opacity: 0.7,
  },
  chip: {
    marginTop: 8,
    alignSelf: "flex-start",
  },
  primaryButton: {
    marginTop: 12,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 12,
  },
});
