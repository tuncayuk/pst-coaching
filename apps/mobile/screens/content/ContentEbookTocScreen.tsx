import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import { getEbookChaptersForEbook, getEbookById } from "../../data/mockSelectors";
import { PActivityIndicator, PButton, PDivider, PText } from "../../components";

const ContentEbookTocContent = ({
  isOffline, ebookId, currentChapterId,
}: { isOffline?: boolean; ebookId?: string; currentChapterId?: string }) => {
  const navigation = useNavigation<any>();
  const ebook = getEbookById(ebookId) ?? getEbookById(undefined);
  const chapters = getEbookChaptersForEbook(ebook?.id ?? ebookId);
  // AC-FR-E7-02-02: jump to page
  const [jumpPage, setJumpPage] = useState("");
  const [jumpError, setJumpError] = useState("");

  const handleJump = () => {
    const pageNum = parseInt(jumpPage, 10);
    if (isNaN(pageNum) || pageNum < 1) { setJumpError("Gecerli bir sayfa numarasi girin."); return; }
    const targetChapter = chapters.find((c: any) => c.page_start <= pageNum && c.page_end >= pageNum);
    if (!targetChapter) { setJumpError("Sayfa bulunamadi."); return; }
    setJumpError("");
    navigation.navigate("ContentEbookReader", { id: ebookId ?? "", chapterId: targetChapter.id });
  };

  return (
    <>
      {/* AC-FR-E7-02-02: jump to page input */}
      <SectionCard title="Sayfaya Atla">
        <View style={styles.jumpRow}>
          <TextInput
            style={styles.jumpInput}
            keyboardType="numeric"
            placeholder="Sayfa numarasi"
            placeholderTextColor="#9CA3AF"
            value={jumpPage}
            onChangeText={(t) => { setJumpPage(t); setJumpError(""); }}
            accessibilityLabel="Sayfa numarasi girisi"
            maxLength={4}
            editable={!isOffline}
          />
          <PButton mode="outlined" compact disabled={isOffline || !jumpPage} onPress={handleJump}>
            Git
          </PButton>
        </View>
        {jumpError ? <PText style={styles.jumpError}>{jumpError}</PText> : null}
      </SectionCard>

      {/* AC-FR-E7-02-03: TOC chapters navigable */}
      <SectionCard title={"Bolumler (" + chapters.length + ")"}>
        {chapters.length === 0 ? (
          <PText style={styles.emptyHint}>Bolum bulunamadi.</PText>
        ) : (
          chapters.map((ch: any, i: number) => (
            <View key={ch.id}>
              <View style={[styles.chapRow, currentChapterId === ch.id && styles.chapRowActive]}>
                <View style={styles.chapMeta}>
                  <PText style={[styles.chapTitle, currentChapterId === ch.id && styles.chapTitleActive]}>
                    {ch.order_index ?? i + 1}. {ch.title}
                  </PText>
                  {ch.page_start != null && (
                    <PText style={styles.chapPages}>Sayfa {ch.page_start}-{ch.page_end}</PText>
                  )}
                </View>
                <PButton
                  mode="text"
                  compact
                  disabled={isOffline}
                  onPress={() => navigation.navigate("ContentEbookReader", { id: ebookId ?? "", chapterId: ch.id })}
                >
                  Oku
                </PButton>
              </View>
              {i < chapters.length - 1 && <PDivider />}
            </View>
          ))
        )}
      </SectionCard>
    </>
  );
};

export const ContentEbookTocScreen = ({ route }: { route?: { params?: { state?: ScreenState; id?: string; chapterId?: string } } }) => {
  const state = resolveScreenState(route);
  const ebookId = route?.params?.id;
  const currentChapterId = route?.params?.chapterId;

  if (state === "loading") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Hazirlaniyor">
        <SectionCard title="Yukleniyor"><PActivityIndicator animating /><SkeletonBlock height={40} /></SectionCard>
        <SectionCard title="Bolumler"><SkeletonBlock height={60} /><SkeletonBlock height={60} /></SectionCard>
      </ScreenLayout>
    );
  }
  if (state === "empty") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Icerik bulunamadi">
        <StateMessage title="Bolum bulunamadi" description="Henuz listelenecek bolum yok." actionLabel="Kutuphaneye Don" icon="book-open-outline" />
      </ScreenLayout>
    );
  }
  if (state === "error") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Bir sorun olustu">
        <StateMessage title="Icindekiler yuklenemedi" description="Baglantiyi kontrol edip tekrar dene." actionLabel="Tekrar Dene" icon="alert-circle-outline" tone="error" />
      </ScreenLayout>
    );
  }
  if (state === "offline") {
    return (
      <ScreenLayout title="e-Kitap Icindekiler" subtitle="Onbellekteki icerik">
        <OfflineNotice />
        <ContentEbookTocContent isOffline ebookId={ebookId} currentChapterId={currentChapterId} />
      </ScreenLayout>
    );
  }
  return (
    <ScreenLayout title="e-Kitap Icindekiler" subtitle="Bolum listesi">
      <ContentEbookTocContent ebookId={ebookId} currentChapterId={currentChapterId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  jumpRow: { flexDirection: "row", gap: 10, alignItems: "center" },
  jumpInput: { flex: 1, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 10, padding: 10, fontSize: 14, color: "#1F2937", backgroundColor: "#FAFAFA" },
  jumpError: { fontSize: 12, color: "#DC2626", marginTop: 6 },
  chapRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10, paddingHorizontal: 4 },
  chapRowActive: { backgroundColor: "#EDE7F6", borderRadius: 8 },
  chapMeta: { flex: 1, marginRight: 8 },
  chapTitle: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  chapTitleActive: { color: "#6B46C1" },
  chapPages: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },
  emptyHint: { fontSize: 13, color: "#9CA3AF" },
});
