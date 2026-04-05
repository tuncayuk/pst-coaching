import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getCommentsForClient, getUsers } from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PCard,
  PDivider,
  PIconButton,
  PText,
} from "../../components";

type RouteParams = { clientId?: string; state?: ScreenState };

const MAX_CHARS = 500;
const AUTO_SAVE_DELAY = 2000;

type FeedbackStatus = "idle" | "saving" | "saved" | "sent";

function getDisplayName(email?: string): string {
  if (!email) return "Danisan";
  return email.split("@")[0].replace(/[._]/g, " ").replace(/w/g, (c) => c.toUpperCase());
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
}

const CoachFeedbackContent = ({
  clientId,
  isOffline,
}: {
  clientId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const client = getUsers().find((u) => u.id === clientId) ?? getUsers()[1];
  const history = getCommentsForClient(client?.id)
    .sort((a: any, b: any) => new Date(b.updated_at ?? 0).getTime() - new Date(a.updated_at ?? 0).getTime());

  const [text, setText] = useState("");
  const [status, setStatus] = useState<FeedbackStatus>("idle");
  const [sendConfirmed, setSendConfirmed] = useState(false);
  const [localHistory, setLocalHistory] = useState<Array<{ id: string; text: string; date: string; status: string }>>(
    history.map((c: any) => ({ id: c.id, text: c.text, date: c.updated_at, status: c.status }))
  );

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // AC-FR-E12-04-04: auto-save draft on text change
  useEffect(() => {
    if (!text) return;
    setStatus("saving");
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(() => {
      setStatus("saved");
    }, AUTO_SAVE_DELAY);
    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current);
    };
  }, [text]);

  const handleSend = () => {
    if (!text.trim() || isOffline) return;
    // AC-FR-E12-04-02: simulate sending notification
    const newEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      date: new Date().toISOString(),
      status: "submitted",
    };
    setLocalHistory((prev) => [newEntry, ...prev]);
    setText("");
    setStatus("idle");
    setSendConfirmed(true);
    setTimeout(() => setSendConfirmed(false), 3000);
  };

  const displayName = getDisplayName(client?.email);
  const charCount = text.length;
  const overLimit = charCount > MAX_CHARS;

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <PIconButton
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Geri don"
          accessibilityRole="button"
        />
        <View style={styles.headerCenter}>
          {/* Client avatar */}
          <View style={styles.headerAvatar}>
            <PText style={styles.headerAvatarText}>
              {displayName.substring(0, 1).toUpperCase()}
            </PText>
          </View>
          <View>
            <PText style={styles.headerTitle}>Geri Bildirim</PText>
            <PText style={styles.headerSubtitle}>{displayName}</PText>
          </View>
        </View>
      </View>

      {isOffline && <OfflineNotice />}

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">

        {/* AC-FR-E12-04-01: feedback form with rich text support indicators */}
        <PCard style={styles.formCard}>
          <PText style={styles.formTitle}>Yeni Geri Bildirim</PText>
          <PText style={styles.formHint}>
            Danisaniniz icin bireysel gozlem, onerim veya destek notu yazin.
          </PText>

          {/* AC-FR-E12-04-04: draft auto-save status */}
          {status !== "idle" && (
            <View
              style={styles.draftStatus}
              accessibilityLiveRegion="polite"
              accessible
              accessibilityLabel={status === "saving" ? "Taslak kaydediliyor" : "Taslak kaydedildi"}
            >
              <PAvatar.Icon
                size={16}
                icon={status === "saving" ? "loading" : "check"}
                color={status === "saving" ? "#9CA3AF" : "#16A34A"}
                style={styles.draftIcon}
                accessible={false}
              />
              <PText style={[styles.draftText, { color: status === "saving" ? "#9CA3AF" : "#16A34A" }]}>
                {status === "saving" ? "Taslak kaydediliyor..." : "Taslak kaydedildi"}
              </PText>
            </View>
          )}

          {/* AC-FR-E12-04-01: text input */}
          <TextInput
            style={[styles.input, overLimit && styles.inputError, isOffline && styles.inputDisabled]}
            multiline
            value={text}
            onChangeText={setText}
            placeholder="Geri bildiriminizi buraya yazin... (ornek: Bu hafta dikkat dagitici ogeler konusunda gelisme gostermis.)"
            editable={!isOffline}
            maxLength={MAX_CHARS + 50}
            accessibilityLabel={"Geri bildirim metin alani. " + displayName + " icin geri bildirim yazin."}
            accessibilityHint={"Maksimum " + MAX_CHARS + " karakter"}
          />

          <View style={styles.formFooter}>
            <PText style={[styles.charCounter, overLimit && styles.charCounterError]}>
              {charCount}/{MAX_CHARS}
            </PText>
            {/* AC-FR-E12-04-02: send button */}
            <PButton
              mode="contained"
              compact
              disabled={!text.trim() || overLimit || isOffline}
              onPress={handleSend}
              accessibilityLabel="Geri bildirimi gonder"
              accessibilityState={{ disabled: !text.trim() || overLimit || isOffline }}
            >
              Gonder
            </PButton>
          </View>

          {sendConfirmed && (
            <View
              style={styles.sentConfirm}
              accessibilityLiveRegion="polite"
              accessible
              accessibilityLabel={"Geri bildirim basariyla gonderildi. " + displayName + " bildirim alacak."}
            >
              <PAvatar.Icon size={20} icon="check-circle" color="#16A34A" style={styles.sentIcon} accessible={false} />
              <PText style={styles.sentText}>
                Gonderildi - {displayName} bildirim alacak.
              </PText>
            </View>
          )}

          {isOffline && (
            <View style={styles.offlineNote}>
              <PText style={styles.offlineNoteText}>
                Cevrimdisi modda geri bildirim gonderilemez. Baglanti saglandiktan sonra deneyin.
              </PText>
            </View>
          )}
        </PCard>

        {/* AC-FR-E12-04-03: feedback history */}
        <PCard style={styles.historyCard}>
          <PText style={styles.historyTitle}>Onceki Geri Bildirimler</PText>

          {localHistory.length === 0 ? (
            <View style={styles.historyEmpty}>
              <PAvatar.Icon size={40} icon="message-outline" color="#94A3B8" style={styles.historyEmptyIcon} accessible={false} />
              <PText style={styles.historyEmptyText}>
                Henuz gonderilmis geri bildirim yok.
              </PText>
            </View>
          ) : (
            localHistory.map((item, idx) => {
              const isDraft = item.status === "draft";
              return (
                <View key={item.id}>
                  <View
                    style={styles.historyItem}
                    accessible
                    accessibilityRole="none"
                    accessibilityLabel={
                      (isDraft ? "Taslak: " : "Gonderildi " + formatDate(item.date) + ": ") + item.text
                    }
                  >
                    <View style={styles.historyItemHeader}>
                      <PAvatar.Icon
                        size={24}
                        icon={isDraft ? "pencil-outline" : "check-circle"}
                        color={isDraft ? "#9CA3AF" : "#16A34A"}
                        style={styles.historyIcon}
                        accessible={false}
                      />
                      <PText style={styles.historyDate}>{formatDate(item.date)}</PText>
                      <View style={[
                        styles.historyStatusBadge,
                        { backgroundColor: isDraft ? "#F9FAFB" : "#D1FAE5" }
                      ]}>
                        <PText style={[styles.historyStatusText, { color: isDraft ? "#9CA3AF" : "#065F46" }]}>
                          {isDraft ? "Taslak" : "Gonderildi"}
                        </PText>
                      </View>
                    </View>
                    <PText style={styles.historyText} numberOfLines={3}>
                      {item.text}
                    </PText>
                  </View>
                  {idx < localHistory.length - 1 && <PDivider style={styles.historyDivider} />}
                </View>
              );
            })
          )}
        </PCard>
      </ScrollView>
    </View>
  );
};

export const CoachFeedbackScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const clientId = route?.params?.clientId;

  if (state === "loading") {
    return (
      <SafeAreaView style={styles.root}>
        <PActivityIndicator animating accessibilityLabel="Geri bildirim yukleniyor" />
        <SkeletonBlock height={200} />
        <SkeletonBlock height={120} />
      </SafeAreaView>
    );
  }

  if (state === "empty" || !clientId) {
    return (
      <SafeAreaView style={styles.root}>
        <StateMessage
          title="Danisan bulunamadi"
          description="Geri bildirim yazilacak danisan belirlenemedi."
          icon="account-outline"
        />
      </SafeAreaView>
    );
  }

  if (state === "error") {
    return (
      <SafeAreaView style={styles.root}>
        <StateMessage
          title="Veriler yuklenemedi"
          description="Baglantini kontrol edip tekrar dene."
          actionLabel="Tekrar Dene"
          icon="alert-circle-outline"
          tone="error"
        />
      </SafeAreaView>
    );
  }

  if (state === "offline") {
    return (
      <SafeAreaView style={styles.root}>
        <CoachFeedbackContent clientId={clientId} isOffline />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <CoachFeedbackContent clientId={clientId} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  wrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerCenter: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1E3A5F",
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },
  headerTitle: { fontSize: 15, fontWeight: "700", color: "#1E293B" },
  headerSubtitle: { fontSize: 12, color: "#6B7280" },
  body: { padding: 16, paddingBottom: 40 },
  formCard: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  formTitle: { fontSize: 15, fontWeight: "700", color: "#1E3A5F", marginBottom: 4 },
  formHint: { fontSize: 12, color: "#6B7280", marginBottom: 12, lineHeight: 18 },
  draftStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  draftIcon: { backgroundColor: "transparent" },
  draftText: { fontSize: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    padding: 12,
    minHeight: 120,
    fontSize: 14,
    textAlignVertical: "top",
    color: "#1E293B",
    marginBottom: 8,
    lineHeight: 20,
  },
  inputError: { borderColor: "#DC2626" },
  inputDisabled: { backgroundColor: "#F9FAFB", color: "#9CA3AF" },
  formFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  charCounter: { fontSize: 12, color: "#9CA3AF" },
  charCounterError: { color: "#DC2626" },
  sentConfirm: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    backgroundColor: "#F0FDF4",
    borderRadius: 8,
    padding: 8,
  },
  sentIcon: { backgroundColor: "transparent" },
  sentText: { fontSize: 13, color: "#16A34A" },
  offlineNote: {
    backgroundColor: "#FFF7ED",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#F59E0B",
  },
  offlineNoteText: { fontSize: 12, color: "#92400E" },
  historyCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  historyTitle: { fontSize: 15, fontWeight: "700", color: "#1E3A5F", marginBottom: 14 },
  historyEmpty: { alignItems: "center", paddingVertical: 24 },
  historyEmptyIcon: { backgroundColor: "#F1F5F9", marginBottom: 10 },
  historyEmptyText: { fontSize: 13, color: "#9CA3AF" },
  historyItem: { paddingVertical: 8 },
  historyItemHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  historyIcon: { backgroundColor: "transparent" },
  historyDate: { flex: 1, fontSize: 12, color: "#6B7280" },
  historyStatusBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  historyStatusText: { fontSize: 10, fontWeight: "700" },
  historyText: { fontSize: 13, color: "#374151", lineHeight: 20 },
  historyDivider: { marginVertical: 4 },
});
