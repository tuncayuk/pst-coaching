import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  Text,
} from "react-native-paper";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState } from "../components/ScreenState";

const formats = ["PDF", "CSV", "Paylaş"];

const ProgressReportExportContent = ({ isOffline }: { isOffline?: boolean }) => {
  return (
    <>
      <SectionCard title="Rapor Dışa Aktar">
        <Text variant="bodyMedium" style={styles.paragraph}>
          Haftalık ve aylık raporlarını dışa aktarabilir veya paylaşabilirsin.
        </Text>
        <View style={styles.chipRow}>
          {formats.map((label) => (
            <Chip key={label} style={styles.chip} disabled={isOffline}>
              {label}
            </Chip>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Özet">
        <Card style={styles.card}>
          <Card.Title title="Son 4 Hafta" subtitle="12 seans · 6 içerik" />
          <Card.Content>
            <Text variant="bodySmall">Rapor hazır, indirilebilir.</Text>
          </Card.Content>
          <Card.Actions>
            <Button mode="contained" disabled={isOffline}>
              Raporu İndir
            </Button>
            <Button mode="outlined" disabled={isOffline}>
              Paylaş
            </Button>
          </Card.Actions>
        </Card>
      </SectionCard>

      <Divider style={styles.divider} />

      <SectionCard title="Dışa Aktarma Notu">
        <Text variant="bodySmall">
          Raporlar kişisel veriler içerir. Paylaşmadan önce kontrol etmeni öneririz.
        </Text>
      </SectionCard>
    </>
  );
};

export const ProgressReportExportScreen = ({
  route,
}: {
  route?: { params?: { state?: string } };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Rapor Dışa Aktar" subtitle="Rapor hazırlanıyor">
        <SectionCard title="Yükleniyor">
          <ActivityIndicator animating />
          <SkeletonBlock height={18} />
          <SkeletonBlock height={18} />
        </SectionCard>
        <SectionCard title="Rapor">
          <SkeletonBlock height={80} />
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Rapor Dışa Aktar" subtitle="Rapor hazır değil">
        <StateMessage
          title="Rapor bulunamadı"
          description="Henüz yeterli veri yok. Yeni içerikleri tamamladıkça rapor oluşur."
          actionLabel="İçerik Tamamla"
          icon="file-document-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Rapor Dışa Aktar" subtitle="Bir sorun oluştu">
        <StateMessage
          title="Rapor yüklenemedi"
          description="Verileri getiremedik. Lütfen tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </ScreenLayout>
    );
  }

  if (state === "offline") {
    return (
      <ScreenLayout title="Rapor Dışa Aktar" subtitle="Önbellekteki içerik">
        <OfflineNotice />
        <ProgressReportExportContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Rapor Dışa Aktar" subtitle="Raporunu paylaş">
      <ProgressReportExportContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  card: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 12,
  },
});
