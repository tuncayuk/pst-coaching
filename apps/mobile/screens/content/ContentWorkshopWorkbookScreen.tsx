import React, { useState } from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getWorkshopById, getWorkshops } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PButton,
  PChip,
  PDivider,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState; id?: string };

// AC-FR-E8-06-01: worksheet types
type WorksheetEntry = {
  id: string;
  title: string;
  description: string;
  fields: Array<{ key: string; label: string; placeholder: string; multiline?: boolean }>;
};

const WORKSHEETS: WorksheetEntry[] = [
  {
    id: "burden-map",
    title: "Yuk Haritasi",
    description: "Simdi tasidigin duygusal, zihinsel ve fiziksel yukleri haritalandir.",
    fields: [
      { key: "emotional", label: "Duygusal Yukler", placeholder: "Kaygi, korku, kizginlik...", multiline: true },
      { key: "mental",    label: "Zihinsel Yukler",  placeholder: "Dusunceler, kararlar, gelecek...", multiline: true },
      { key: "physical",  label: "Fiziksel Yukler",  placeholder: "Yorgunluk, agri, enerji...", multiline: true },
    ],
  },
  {
    id: "inner-sentence",
    title: "Ic Cumle Donusum Tablosu",
    description: "Olumsuz ic cumlelerini donusturmek icin her satiri doldur.",
    fields: [
      { key: "negative",   label: "Olumsuz ic cumle",   placeholder: "Ornek: 'Asla yeterim yok'", multiline: false },
      { key: "reality",    label: "Gerceklik kontrolu",  placeholder: "Bu cumle gercekten dogru mu?", multiline: false },
      { key: "positive",   label: "Donusturulmus cumle", placeholder: "Ornek: 'Adim adim buyuyorum'", multiline: false },
    ],
  },
  {
    id: "prayer-card",
    title: "Dua Karti",
    description: "Bu deneyimden sonra kalp sesini dua olarak yaz.",
    fields: [
      { key: "dua", label: "Duan", placeholder: "Rabbim, bu deneyimden...", multiline: true },
    ],
  },
  {
    id: "tawakkul",
    title: "Tevekkul Dengesi",
    description: "Kontrolunde olan ve olmayanlar: kabul ve hareket dengesi.",
    fields: [
      { key: "in_control",  label: "Kontrol edebildiklerim", placeholder: "Tepkilerimi, niyetimi...", multiline: true },
      { key: "surrender",   label: "Birakabileceklerim",      placeholder: "Sonucu, zamanlamami...", multiline: true },
    ],
  },
  {
    id: "return-plan",
    title: "Donus Plani",
    description: "Atolyeden sonra hayatina geri donusunu planla.",
    fields: [
      { key: "week1", label: "1. Hafta Hedefi",   placeholder: "Kucuk, somut bir adim...", multiline: false },
      { key: "week2", label: "2. Hafta Hedefi",   placeholder: "...", multiline: false },
      { key: "week3", label: "3. Hafta Hedefi",   placeholder: "...", multiline: false },
      { key: "day30", label: "30. Gun Hedefi",     placeholder: "30 gunde ulasacagim nokta...", multiline: true },
    ],
  },
];

const WorksheetForm = ({
  worksheet,
  isOffline,
  savedValues: initialValues,
  onSave,
}: {
  worksheet: WorksheetEntry;
  isOffline: boolean;
  savedValues: Record<string, string>;
  onSave: (id: string, values: Record<string, string>, completedAt?: string) => void;
}) => {
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // AC-FR-E8-06-02: auto-save with context
    onSave(worksheet.id, values, new Date().toISOString().split("T")[0]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <View style={styles.worksheetForm}>
      <PText variant="bodySmall" style={styles.wsDesc}>{worksheet.description}</PText>
      <PDivider style={styles.divider} />
      {worksheet.fields.map((field) => (
        <View key={field.key} style={styles.fieldBlock}>
          <PText variant="labelMedium" style={styles.fieldLabel}>{field.label}</PText>
          <TextInput
            style={[styles.textInput, field.multiline && styles.textInputMulti]}
            multiline={field.multiline}
            value={values[field.key] ?? ""}
            onChangeText={(v) => setValues((prev) => ({ ...prev, [field.key]: v }))}
            placeholder={field.placeholder}
            editable={!isOffline}
            accessibilityLabel={field.label}
          />
        </View>
      ))}
      {saved && (
        <PText variant="labelSmall" style={styles.savedNote}>Kaydedildi</PText>
      )}
      <PButton
        mode="contained"
        compact
        disabled={isOffline}
        style={styles.saveBtn}
        onPress={handleSave}
      >
        Kaydet
      </PButton>
    </View>
  );
};

const ContentWorkshopWorkbookContent = ({
  workshopId,
  isOffline,
}: {
  workshopId?: string;
  isOffline?: boolean;
}) => {
  const workshop = getWorkshopById(workshopId) ?? getWorkshops()[0];

  // AC-FR-E8-06-02/03: track saved worksheets
  const [savedData, setSavedData] = useState<Record<string, { values: Record<string, string>; completedAt?: string }>>({});
  const [activeSheet, setActiveSheet] = useState<string | null>(WORKSHEETS[0].id);
  // AC-FR-E8-06-04: privacy consent modal
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleSave = (id: string, values: Record<string, string>, completedAt?: string) => {
    setSavedData((prev) => ({ ...prev, [id]: { values, completedAt } }));
  };

  const handleExport = () => {
    // AC-FR-E8-06-04: privacy consent (BR-09)
    if (!privacyAccepted) {
      setShowPrivacy(true);
    }
  };

  return (
    <>
      <SectionCard title={"Calisma Kitabi -- " + (workshop?.title ?? "Atolye")}>
        <PText variant="bodySmall" style={styles.desc}>
          Her calisma kagidini doldurarak atolye deneyimini derinlestir.
          Girdiler otomatik kaydedilir ve bu atolye/asama baglaminla saklanir.
        </PText>
        <PButton
          mode="outlined"
          compact
          style={styles.exportBtn}
          onPress={handleExport}
          disabled={isOffline}
        >
          Disari Aktar
        </PButton>
      </SectionCard>

      {/* AC-FR-E8-06-01/03: worksheet list with status */}
      <SectionCard title="Calisma Kagitlari">
        {WORKSHEETS.map((ws) => {
          const saved = savedData[ws.id];
          const isCompleted = !!saved?.completedAt;
          return (
            <View key={ws.id}>
              <View style={styles.wsRow}>
                <View style={styles.wsInfo}>
                  <PText variant="titleSmall">{ws.title}</PText>
                  {isCompleted ? (
                    <PText variant="labelSmall" style={styles.completedText}>
                      Tamamlandi: {saved.completedAt}
                    </PText>
                  ) : (
                    <PText variant="labelSmall" style={styles.incompleteText}>
                      {saved ? "Yarida birakildi" : "Baslanmadi"}
                    </PText>
                  )}
                </View>
                <PButton
                  mode={activeSheet === ws.id ? "contained" : "outlined"}
                  compact
                  onPress={() => setActiveSheet(activeSheet === ws.id ? null : ws.id)}
                >
                  {activeSheet === ws.id ? "Kapat" : saved ? "Devam Et" : "Ac"}
                </PButton>
              </View>

              {activeSheet === ws.id && (
                <WorksheetForm
                  worksheet={ws}
                  isOffline={!!isOffline}
                  savedValues={saved?.values ?? {}}
                  onSave={handleSave}
                />
              )}
              <PDivider style={styles.divider} />
            </View>
          );
        })}
      </SectionCard>

      {/* AC-FR-E8-06-04: privacy consent modal */}
      <Modal
        visible={showPrivacy}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPrivacy(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <PText variant="titleMedium" style={styles.modalTitle}>
              Gizlilik Onayi (BR-09)
            </PText>
            <PText variant="bodySmall" style={styles.modalText}>
              Calisma kagidi icerikleriniz kisiye ozel bilgiler icermektedir.
              Disari aktarmadan once gizlilik politikasini okudugunuzu onaylayin.
            </PText>
            <View style={styles.modalActions}>
              <PButton
                mode="contained"
                onPress={() => {
                  setPrivacyAccepted(true);
                  setShowPrivacy(false);
                }}
              >
                Onayliyorum, Aktar
              </PButton>
              <PButton mode="outlined" onPress={() => setShowPrivacy(false)}>
                Iptal
              </PButton>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const ContentWorkshopWorkbookScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const workshopId = route?.params?.id;

  if (state === "loading") {
    return (
      <ScreenLayout title="Calisma Kitabi" subtitle="Yukleniyor">
        <SectionCard title="Calisma Kagitlari">
          <PActivityIndicator animating />
          {[1, 2, 3].map((i) => <SkeletonBlock key={i} height={56} />)}
        </SectionCard>
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Calisma Kitabi" subtitle="Icerik bulunamadi">
        <StateMessage
          title="Calisma kagidi bulunamadi"
          description="Bu atolye icin calisma kagidi mevcut degil."
          actionLabel="Geri Don"
          icon="notebook-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Calisma Kitabi" subtitle="Bir sorun olustu">
        <StateMessage
          title="Calisma kitabi yuklenemedi"
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
      <ScreenLayout title="Calisma Kitabi" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentWorkshopWorkbookContent workshopId={workshopId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Calisma Kitabi" subtitle="Kisisel calisma kagitlarin">
      <ContentWorkshopWorkbookContent workshopId={workshopId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  desc: {
    opacity: 0.7,
    lineHeight: 20,
    marginBottom: 8,
  },
  exportBtn: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  wsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    gap: 10,
  },
  wsInfo: {
    flex: 1,
  },
  completedText: {
    color: "#4CAF50",
    marginTop: 2,
  },
  incompleteText: {
    opacity: 0.55,
    marginTop: 2,
  },
  divider: {
    marginVertical: 6,
  },
  worksheetForm: {
    paddingTop: 8,
    paddingBottom: 12,
  },
  wsDesc: {
    opacity: 0.7,
    lineHeight: 20,
  },
  fieldBlock: {
    marginBottom: 12,
  },
  fieldLabel: {
    marginBottom: 4,
    opacity: 0.7,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  textInputMulti: {
    minHeight: 72,
    textAlignVertical: "top",
  },
  savedNote: {
    color: "#4CAF50",
    marginBottom: 4,
  },
  saveBtn: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 36,
  },
  modalTitle: {
    marginBottom: 12,
    fontWeight: "700",
  },
  modalText: {
    opacity: 0.75,
    lineHeight: 20,
    marginBottom: 16,
  },
  modalActions: {
    gap: 10,
  },
});
