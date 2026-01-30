import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { PActivityIndicator, PButton, PCard, PChip, PText } from "../../components";
import {
  getContentItemsForParent,
  getWorkshopById,
  getWorkshops,
} from "../../data/mockSelectors";


type RouteParams = { state?: ScreenState; id?: string };

const ContentWorkshopHomeContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];
  const sections = workshop ? getContentItemsForParent("workshop", workshop.id) : [];

  return (
    <>
      <SectionCard title="Atölye Özeti" actionLabel="Paylaş">
        <PText variant="titleMedium">{workshop?.title ?? "Atölye"}</PText>
        <PText variant="bodySmall" style={styles.subtleText}>
          {workshop?.description ?? "Atölye içeriği ve uygulamalarına buradan erişebilirsin."}
        </PText>
        <PChip style={styles.chip} disabled={isOffline}>
          {sections.length} bölüm
        </PChip>
        <PButton
          mode="contained"
          style={styles.primaryButton}
          disabled={isOffline || sections.length === 0}
          onPress={() => {
            if (sections[0]) {
              navigation.navigate("Content", {
                screen: "ContentWorkshopSection",
                params: { id: workshop?.id, sectionId: sections[0].id },
              });
            }
          }}
        >
          Devam Et
        </PButton>
      </SectionCard>

      <SectionCard title="Bölümler" actionLabel="Sırala">
        {sections.map((section) => (
          <PCard key={section.id} style={styles.card}>
            <PCard.Title title={section.title} subtitle={section.content_type} />
            <PCard.Actions>
              <PButton
                mode="outlined"
                disabled={isOffline}
                onPress={() =>
                  navigation.navigate("Content", {
                    screen: "ContentWorkshopSection",
                    params: { id: workshop?.id, sectionId: section.id },
                  })
                }
              >
                Bölümü Aç
              </PButton>
            </PCard.Actions>
          </PCard>
        ))}
      </SectionCard>
    </>
  );
};

export const ContentWorkshopHomeScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Atölye" subtitle="Atölye yükleniyor">
        <SectionCard title="Yükleniyor">
          <PActivityIndicator animating />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={14} />
        </SectionCard>
        <SectionCard title="Bölümler">
          <SkeletonBlock height={64} />
          <SkeletonBlock height={64} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Atölye" subtitle="İçerik bulunamadı">
        <StateMessage
          title="Atölye bulunamadı"
          description="Bu atölye şu anda erişilebilir değil."
          actionLabel="Kütüphaneye Dön"
          icon="account-group-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Atölye" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Atölye yüklenemedi"
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
      <ScreenLayout title="Atölye" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ContentWorkshopHomeContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Atölye" subtitle="Atölye akışı">
      <ContentWorkshopHomeContent workshopId={workshopId} />
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
