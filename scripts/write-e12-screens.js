#!/usr/bin/env node
// write-e12-screens.js — Writes all 4 EPIC-12 coach screen files
const fs = require("fs");
const path = require("path");

const COACH_DIR = path.join(__dirname, "../apps/mobile/screens/coach");
fs.mkdirSync(COACH_DIR, { recursive: true });

const files = {};

// ─────────────────────────────────────────────────────────────────────────
// CoachDashboardScreen  (FR-E12-01)
// AC-FR-E12-01-01: client list | AC-FR-E12-01-02: risk level badges
// AC-FR-E12-01-03: last activity date | AC-FR-E12-01-04: risk filter
// ─────────────────────────────────────────────────────────────────────────
files["CoachDashboardScreen.tsx"] = `import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getClientsForCoach,
  getContentProgressForUser,
  getPrimaryUser,
  getSessionsForUser,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PChip,
  PDivider,
  PProgressBar,
  PText,
} from "../../components";

type RouteParams = { state?: ScreenState };

type RiskLevel = "high" | "medium" | "low";

const RISK_CONFIG: Record<RiskLevel, { label: string; color: string; bg: string; icon: string }> = {
  high:   { label: "Yuksek Risk", color: "#DC2626", bg: "#FEF2F2", icon: "alert-circle" },
  medium: { label: "Orta Risk",   color: "#D97706", bg: "#FFFBEB", icon: "alert" },
  low:    { label: "Dusuk Risk",  color: "#16A34A", bg: "#F0FDF4", icon: "check-circle" },
};

const RISK_FILTERS: Array<{ key: RiskLevel | "all"; label: string }> = [
  { key: "all",    label: "Tumu" },
  { key: "high",   label: "Yuksek" },
  { key: "medium", label: "Orta" },
  { key: "low",    label: "Dusuk" },
];

function computeRiskLevel(userId?: string): RiskLevel {
  const progress = getContentProgressForUser(userId);
  if (progress.length === 0) return "high";
  const lastActive = progress
    .map((p) => new Date(p.started_at ?? 0).getTime())
    .reduce((max, t) => Math.max(max, t), 0);
  const daysSince = (Date.now() - lastActive) / 86400000;
  if (daysSince > 7) return "high";
  if (daysSince > 3) return "medium";
  return "low";
}

function getLastActivityLabel(userId?: string): string {
  const progress = getContentProgressForUser(userId);
  const sessions = getSessionsForUser(userId);
  const all = [
    ...progress.map((p) => new Date(p.started_at ?? 0).getTime()),
    ...sessions.map((s: any) => new Date(s.last_active_at ?? 0).getTime()),
  ];
  if (all.length === 0) return "Aktivite yok";
  const lastMs = all.reduce((max, t) => Math.max(max, t), 0);
  const daysSince = Math.floor((Date.now() - lastMs) / 86400000);
  if (daysSince === 0) return "Bugun";
  if (daysSince === 1) return "Dun";
  return daysSince + " gun once";
}

function getInitials(email?: string): string {
  if (!email) return "?";
  const name = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0] ?? "?").substring(0, 2).toUpperCase();
}

function getDisplayName(email?: string): string {
  if (!email) return "Bilinmiyor";
  return email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const CoachDashboardContent = ({ isOffline }: { isOffline?: boolean }) => {
  const navigation = useNavigation<any>();
  const coach = getPrimaryUser();
  const [activeFilter, setActiveFilter] = useState<RiskLevel | "all">("all");

  const clients = getClientsForCoach(coach?.id);

  // Compute derived data per client
  const clientData = clients.map((client) => {
    const risk = computeRiskLevel(client?.id);
    const lastActivity = getLastActivityLabel(client?.id);
    const progress = getContentProgressForUser(client?.id);
    const completed = progress.filter((p) => p.status === "completed").length;
    const total = Math.max(progress.length, 1);
    const progressFraction = completed / total;
    return { client, risk, lastActivity, progressFraction, completed, total };
  });

  const filtered = activeFilter === "all"
    ? clientData
    : clientData.filter((d) => d.risk === activeFilter);

  const riskCounts = {
    high:   clientData.filter((d) => d.risk === "high").length,
    medium: clientData.filter((d) => d.risk === "medium").length,
    low:    clientData.filter((d) => d.risk === "low").length,
  };

  return (
    <>
      {/* AC-FR-E12-01-01 + overview stats */}
      <SectionCard title="Ozet">
        <View style={styles.statsRow}>
          <View
            style={styles.statItem}
            accessible
            accessibilityRole="text"
            accessibilityLabel={clients.length + " toplam danisan"}
          >
            <PText style={styles.statValue}>{clients.length}</PText>
            <PText style={styles.statLabel}>Danisan</PText>
          </View>
          <View style={[styles.statItem, styles.statBorder]}>
            <PText style={[styles.statValue, riskCounts.high > 0 && styles.statValueRed]}>
              {riskCounts.high}
            </PText>
            <PText style={styles.statLabel}>Yuksek Risk</PText>
          </View>
          <View style={styles.statItem}>
            <PText style={[styles.statValue, riskCounts.medium > 0 && styles.statValueAmber]}>
              {riskCounts.medium}
            </PText>
            <PText style={styles.statLabel}>Orta Risk</PText>
          </View>
          <View style={styles.statItem}>
            <PText style={[styles.statValue, styles.statValueGreen]}>{riskCounts.low}</PText>
            <PText style={styles.statLabel}>Dusuk Risk</PText>
          </View>
        </View>
      </SectionCard>

      {/* AC-FR-E12-01-04: risk filter */}
      <SectionCard title="Danisanlar">
        <View
          style={styles.filterRow}
          accessible
          accessibilityRole="none"
          accessibilityLabel="Risk filtresi"
        >
          {RISK_FILTERS.map((f) => (
            <PChip
              key={f.key}
              selected={activeFilter === f.key}
              onPress={() => setActiveFilter(f.key)}
              style={[styles.filterChip, activeFilter === f.key && styles.filterChipActive]}
              compact
              accessibilityLabel={f.label + " filtresi" + (activeFilter === f.key ? ", secili" : "")}
              accessibilityRole="button"
              accessibilityState={{ selected: activeFilter === f.key }}
            >
              {f.label}
            </PChip>
          ))}
        </View>

        {/* AC-FR-E12-01-01/02/03: client cards */}
        {filtered.length === 0 && (
          <View style={styles.emptyFilter}>
            <PText style={styles.emptyFilterText}>
              Bu risk seviyesinde danisan bulunamadi.
            </PText>
          </View>
        )}

        {filtered.map((item, idx) => {
          const { client, risk, lastActivity, progressFraction, completed, total } = item;
          const cfg = RISK_CONFIG[risk];
          const initials = getInitials(client?.email);
          const displayName = getDisplayName(client?.email);

          return (
            <View key={client?.id ?? idx}>
              <TouchableOpacity
                style={[styles.clientCard, { backgroundColor: cfg.bg, borderLeftColor: cfg.color }]}
                onPress={() =>
                  !isOffline &&
                  navigation.navigate("CoachClientProfile", { clientId: client?.id })
                }
                accessibilityRole="button"
                accessibilityLabel={
                  displayName +
                  ". Risk: " + cfg.label +
                  ". Son aktivite: " + lastActivity +
                  ". Ilerleme: %d tamamlandi.".replace("%d", String(Math.round(progressFraction * 100)))
                }
                disabled={isOffline}
              >
                <View style={styles.clientTop}>
                  {/* Avatar with initials */}
                  <View style={[styles.avatarCircle, { backgroundColor: cfg.color }]} accessible={false}>
                    <PText style={styles.avatarInitials}>{initials}</PText>
                  </View>

                  <View style={styles.clientInfo}>
                    <View style={styles.clientNameRow}>
                      <PText style={styles.clientName} numberOfLines={1}>
                        {displayName}
                      </PText>
                      {/* AC-FR-E12-01-02: risk badge */}
                      <View style={[styles.riskBadge, { backgroundColor: cfg.color + "22" }]}>
                        <PAvatar.Icon
                          size={14}
                          icon={cfg.icon}
                          color={cfg.color}
                          style={styles.riskBadgeIcon}
                          accessible={false}
                        />
                        <PText style={[styles.riskBadgeText, { color: cfg.color }]}>
                          {cfg.label}
                        </PText>
                      </View>
                    </View>
                    {/* AC-FR-E12-01-03: last activity */}
                    <PText style={styles.lastActivity}>
                      Son aktivite: {lastActivity}
                    </PText>
                  </View>
                </View>

                {/* Progress */}
                <View style={styles.progressSection}>
                  <View style={styles.progressLabelRow}>
                    <PText style={styles.progressLabel}>Ilerleme</PText>
                    <PText style={[styles.progressValue, { color: cfg.color }]}>
                      {Math.round(progressFraction * 100)}%
                    </PText>
                  </View>
                  <PProgressBar
                    progress={progressFraction}
                    color={cfg.color}
                    style={styles.progressBar}
                    accessible={false}
                  />
                  <PText style={styles.progressMeta}>
                    {completed}/{total} icerik tamamlandi
                  </PText>
                </View>

                <View style={styles.clientActions}>
                  <PButton
                    mode="outlined"
                    compact
                    disabled={isOffline}
                    style={[styles.clientActionBtn, { borderColor: cfg.color }]}
                    labelStyle={{ color: cfg.color, fontSize: 12 }}
                    onPress={() =>
                      !isOffline &&
                      navigation.navigate("CoachClientProfile", { clientId: client?.id })
                    }
                    accessibilityLabel={displayName + " profilini gor"}
                  >
                    Profil Gor
                  </PButton>
                  <PButton
                    mode="text"
                    compact
                    disabled={isOffline}
                    labelStyle={{ color: cfg.color, fontSize: 12 }}
                    onPress={() =>
                      !isOffline &&
                      navigation.navigate("CoachFeedback", { clientId: client?.id })
                    }
                    accessibilityLabel={displayName + " icin geri bildirim yaz"}
                  >
                    Geri Bildirim
                  </PButton>
                </View>
              </TouchableOpacity>

              {idx < filtered.length - 1 && <PDivider style={styles.cardDivider} />}
            </View>
          );
        })}

        {clients.length === 0 && activeFilter === "all" && (
          <View style={styles.emptyAll}>
            <PAvatar.Icon size={48} icon="account-group-outline" color="#94A3B8" style={styles.emptyIcon} accessible={false} />
            <PText style={styles.emptyTitle}>Danisan bulunamadi</PText>
            <PText style={styles.emptyDesc}>
              Henuz size atanmis bir danisan yok.
            </PText>
          </View>
        )}
      </SectionCard>
    </>
  );
};

export const CoachDashboardScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);

  if (state === "loading") {
    return (
      <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
        <PActivityIndicator animating accessibilityLabel="Yukleniyor" />
        <SkeletonBlock height={80} />
        <SkeletonBlock height={120} />
        <SkeletonBlock height={120} />
      </ScreenLayout>
    );
  }

  if (state === "empty") {
    return (
      <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
        <StateMessage
          title="Danisan bulunamadi"
          description="Henuz size atanmis bir danisan yok."
          icon="account-group-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
        <StateMessage
          title="Veriler yuklenemedi"
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
      <ScreenLayout title="Koc Paneli" subtitle="Cevrimdisi mod">
        <OfflineNotice />
        <CoachDashboardContent isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Koc Paneli" subtitle="Danisanlarinizi yonetin">
      <CoachDashboardContent />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
  },
  statItem: { alignItems: "center", flex: 1 },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#E5E7EB" },
  statValue: { fontSize: 22, fontWeight: "800", color: "#1E3A5F" },
  statValueRed: { color: "#DC2626" },
  statValueAmber: { color: "#D97706" },
  statValueGreen: { color: "#16A34A" },
  statLabel: { fontSize: 11, color: "#6B7280", marginTop: 2 },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  filterChip: { borderRadius: 20 },
  filterChipActive: { backgroundColor: "#EFF6FF" },
  clientCard: {
    borderRadius: 12,
    borderLeftWidth: 4,
    padding: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 2,
  },
  clientTop: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 10 },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  clientInfo: { flex: 1 },
  clientNameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 4,
  },
  clientName: { flex: 1, fontSize: 15, fontWeight: "700", color: "#1E293B" },
  riskBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 3,
  },
  riskBadgeIcon: { backgroundColor: "transparent" },
  riskBadgeText: { fontSize: 10, fontWeight: "700" },
  lastActivity: { fontSize: 12, color: "#6B7280" },
  progressSection: { marginBottom: 10 },
  progressLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  progressLabel: { fontSize: 12, color: "#525252" },
  progressValue: { fontSize: 12, fontWeight: "700" },
  progressBar: { height: 6, borderRadius: 6, marginBottom: 4 },
  progressMeta: { fontSize: 11, color: "#9CA3AF" },
  clientActions: { flexDirection: "row", gap: 8 },
  clientActionBtn: { borderRadius: 8 },
  cardDivider: { marginVertical: 8 },
  emptyFilter: { paddingVertical: 24, alignItems: "center" },
  emptyFilterText: { color: "#9CA3AF", fontSize: 14 },
  emptyAll: { alignItems: "center", paddingVertical: 32 },
  emptyIcon: { backgroundColor: "#F1F5F9", marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: "#374151", marginBottom: 4 },
  emptyDesc: { fontSize: 13, color: "#6B7280", textAlign: "center" },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// CoachClientProfileScreen  (FR-E12-02)
// AC-FR-E12-02-01: active goal | AC-FR-E12-02-02: content status summary
// AC-FR-E12-02-03: engagement metrics | AC-FR-E12-02-04: progress trend
// ─────────────────────────────────────────────────────────────────────────
files["CoachClientProfileScreen.tsx"] = `import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getAchievements,
  getContentProgressForUser,
  getJourneys,
  getSessionsForUser,
  getUsers,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PButton,
  PDivider,
  PProgressBar,
  PText,
} from "../../components";

type RouteParams = { clientId?: string; state?: ScreenState };

function getDisplayName(email?: string): string {
  if (!email) return "Danisan";
  return email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getInitials(email?: string): string {
  if (!email) return "?";
  const name = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0] ?? "?").substring(0, 2).toUpperCase();
}

function computeTrend(userId?: string): { label: string; icon: string; color: string } {
  const progress = getContentProgressForUser(userId);
  const sessions = getSessionsForUser(userId);
  const recent = progress.filter((p) => {
    const ms = new Date(p.started_at ?? 0).getTime();
    return Date.now() - ms < 14 * 86400000;
  }).length;
  if (sessions.length === 0 && recent === 0) {
    return { label: "Aktivite tespit edilmedi", icon: "trending-down", color: "#DC2626" };
  }
  if (recent >= 3) {
    return { label: "Ilerleme artis egilimiyle", icon: "trending-up", color: "#16A34A" };
  }
  return { label: "Ilerleme stabil", icon: "trending-neutral", color: "#D97706" };
}

const CoachClientProfileContent = ({
  clientId,
  isOffline,
}: {
  clientId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const client = getUsers().find((u) => u.id === clientId) ?? getUsers()[1];

  const progress = getContentProgressForUser(client?.id);
  const sessions = getSessionsForUser(client?.id);
  const achievements = getAchievements().filter((a: any) => a.user_id === client?.id);

  // Status breakdown
  const completedItems = progress.filter((p) => p.status === "completed").length;
  const inProgressItems = progress.filter((p) => p.status === "in_progress").length;
  const notStarted = Math.max(0, 5 - completedItems - inProgressItems); // estimate

  // AC-FR-E12-02-01: active goal — derive from in-progress content
  const activeGoal = progress.find((p) => p.status === "in_progress");
  const activeGoalLabel = activeGoal
    ? (activeGoal.content_type === "journey_day" ? "Yolculuk gunu" : "Icerik") + " devam ediyor"
    : "Hedef belirlenmemis";

  // AC-FR-E12-02-03: session count + 7-day activity
  const last7DayActivity = progress.filter((p) => {
    const ms = new Date(p.started_at ?? 0).getTime();
    return Date.now() - ms < 7 * 86400000;
  }).length;

  // AC-FR-E12-02-04: trend
  const trend = computeTrend(client?.id);
  const progressFraction =
    progress.length > 0 ? completedItems / progress.length : 0;

  const initials = getInitials(client?.email);
  const displayName = getDisplayName(client?.email);

  return (
    <>
      {/* Client header */}
      <View style={styles.profileHeader} accessible accessibilityRole="header"
        accessibilityLabel={"Danisan profili: " + displayName + ", Durum: " + client?.status ?? "active"}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <PText style={styles.avatarInitials}>{initials}</PText>
          </View>
        </View>
        <PText style={styles.clientName}>{displayName}</PText>
        <PText style={styles.clientEmail}>{client?.email ?? ""}</PText>
        <View style={[
          styles.statusBadge,
          { backgroundColor: client?.status === "active" ? "#D1FAE5" : "#FEE2E2" }
        ]}>
          <PText style={[
            styles.statusBadgeText,
            { color: client?.status === "active" ? "#065F46" : "#991B1B" }
          ]}>
            {client?.status === "active" ? "Aktif" : "Pasif"}
          </PText>
        </View>
      </View>

      {/* AC-FR-E12-02-01: active goal */}
      <SectionCard title="Aktif Hedef">
        <View style={styles.goalRow} accessible
          accessibilityLabel={"Aktif hedef: " + activeGoalLabel}>
          <PAvatar.Icon
            size={36}
            icon={activeGoal ? "bullseye-arrow" : "target"}
            color={activeGoal ? "#7C4DFF" : "#9CA3AF"}
            style={[styles.goalIcon, { backgroundColor: activeGoal ? "#F5F3FF" : "#F4F4F5" }]}
            accessible={false}
          />
          <View style={styles.goalInfo}>
            <PText style={styles.goalLabel}>{activeGoalLabel}</PText>
            {activeGoal && (
              <PText style={styles.goalMeta}>
                {activeGoal.content_type.replace("_", " ")} — devam ediyor
              </PText>
            )}
          </View>
        </View>
        {progressFraction > 0 && (
          <View style={styles.goalProgress}>
            <PProgressBar
              progress={progressFraction}
              color="#7C4DFF"
              style={styles.goalProgressBar}
              accessible
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: Math.round(progressFraction * 100) }}
              accessibilityLabel={"Genel ilerleme: yuzde " + Math.round(progressFraction * 100)}
            />
            <PText style={styles.goalProgressLabel}>
              Genel ilerleme: {Math.round(progressFraction * 100)}%
            </PText>
          </View>
        )}
      </SectionCard>

      {/* AC-FR-E12-02-02: content status summary */}
      <SectionCard title="Icerik Durumu">
        <View style={styles.statusRow}>
          {[
            { label: "Baslamadi", count: notStarted, color: "#9CA3AF", bg: "#F4F4F5" },
            { label: "Devam",     count: inProgressItems, color: "#0EA5E9", bg: "#E0F2FE" },
            { label: "Tamamlandi", count: completedItems, color: "#16A34A", bg: "#D1FAE5" },
          ].map((s) => (
            <View
              key={s.label}
              style={[styles.statusItem, { backgroundColor: s.bg }]}
              accessible
              accessibilityRole="text"
              accessibilityLabel={s.label + ": " + s.count + " icerik"}
            >
              <PText style={[styles.statusCount, { color: s.color }]}>{s.count}</PText>
              <PText style={styles.statusLabel}>{s.label}</PText>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E12-02-03: engagement metrics */}
      <SectionCard title="Etkilesim Metrikleri">
        <View style={styles.metricsGrid}>
          {[
            { icon: "calendar-check", label: "Toplam Oturum", value: String(sessions.length), color: "#1E3A5F" },
            { icon: "lightning-bolt", label: "Son 7 Gun", value: String(last7DayActivity) + " aktivite", color: "#0EA5E9" },
            { icon: "trophy",         label: "Basarilar",    value: String(achievements.length), color: "#F59E0B" },
            { icon: "check-all",      label: "Tamamlanan",   value: String(completedItems),     color: "#16A34A" },
          ].map((m) => (
            <View
              key={m.label}
              style={styles.metricItem}
              accessible
              accessibilityRole="text"
              accessibilityLabel={m.label + ": " + m.value}
            >
              <PAvatar.Icon
                size={28}
                icon={m.icon}
                color={m.color}
                style={[styles.metricIcon, { backgroundColor: m.color + "18" }]}
                accessible={false}
              />
              <PText style={[styles.metricValue, { color: m.color }]}>{m.value}</PText>
              <PText style={styles.metricLabel}>{m.label}</PText>
            </View>
          ))}
        </View>
      </SectionCard>

      {/* AC-FR-E12-02-04: progress trend */}
      <SectionCard title="Ilerleme Trendi">
        <View
          style={[styles.trendRow, { backgroundColor: trend.color + "12" }]}
          accessible
          accessibilityLabel={"Ilerleme trendi: " + trend.label}
        >
          <PAvatar.Icon
            size={36}
            icon={trend.icon}
            color={trend.color}
            style={[styles.trendIcon, { backgroundColor: trend.color + "22" }]}
            accessible={false}
          />
          <View style={styles.trendInfo}>
            <PText style={[styles.trendLabel, { color: trend.color }]}>{trend.label}</PText>
            <PText style={styles.trendDesc}>
              Son 14 gunde {progress.filter((p) => {
                const ms = new Date(p.started_at ?? 0).getTime();
                return Date.now() - ms < 14 * 86400000;
              }).length} icerik etklesimi
            </PText>
          </View>
        </View>
      </SectionCard>

      <PDivider style={styles.actionDivider} />
      <View style={styles.actions}>
        <PButton
          mode="contained"
          disabled={isOffline}
          style={styles.actionBtn}
          onPress={() => navigation.navigate("CoachContentTracking", { clientId: client?.id })}
          accessibilityLabel="Icerik takibini ac"
        >
          Icerik Takibi
        </PButton>
        <PButton
          mode="outlined"
          disabled={isOffline}
          style={styles.actionBtn}
          onPress={() => navigation.navigate("CoachFeedback", { clientId: client?.id })}
          accessibilityLabel="Geri bildirim yaz"
        >
          Geri Bildirim Yaz
        </PButton>
      </View>
    </>
  );
};

export const CoachClientProfileScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const clientId = route?.params?.clientId;
  const client = getUsers().find((u) => u.id === clientId);
  const title = client ? getDisplayName(client.email) : "Danisan Profili";

  if (state === "loading") {
    return (
      <ScreenLayout title={title} subtitle="Danisan profili">
        <PActivityIndicator animating accessibilityLabel="Profil yukleniyor" />
        <SkeletonBlock height={80} />
        <SkeletonBlock height={100} />
        <SkeletonBlock height={100} />
      </ScreenLayout>
    );
  }

  if (state === "empty" || !clientId) {
    return (
      <ScreenLayout title="Danisan Profili" subtitle="">
        <StateMessage
          title="Profil bulunamadi"
          description="Bu danisana ait veri bulunamadi."
          icon="account-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title={title} subtitle="">
        <StateMessage
          title="Profil yuklenemedi"
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
      <ScreenLayout title={title} subtitle="Cevrimdisi mod">
        <OfflineNotice />
        <CoachClientProfileContent clientId={clientId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title={title} subtitle="Danisan profili ve metrikleri">
      <CoachClientProfileContent clientId={clientId} />
    </ScreenLayout>
  );
};

function getDisplayName(email?: string): string {
  if (!email) return "Danisan";
  return email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getInitials(email?: string): string {
  if (!email) return "?";
  const name = email.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim();
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return (parts[0] ?? "?").substring(0, 2).toUpperCase();
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 8,
  },
  avatarWrap: { marginBottom: 12 },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#1E3A5F",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: { color: "#FFFFFF", fontSize: 26, fontWeight: "700" },
  clientName: { fontSize: 20, fontWeight: "800", color: "#1E293B", marginBottom: 2 },
  clientEmail: { fontSize: 13, color: "#6B7280", marginBottom: 8 },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  statusBadgeText: { fontSize: 12, fontWeight: "700" },
  goalRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  goalIcon: { borderRadius: 18 },
  goalInfo: { flex: 1 },
  goalLabel: { fontSize: 14, fontWeight: "600", color: "#1E293B" },
  goalMeta: { fontSize: 12, color: "#6B7280" },
  goalProgress: { marginTop: 4 },
  goalProgressBar: { height: 6, borderRadius: 6, marginBottom: 4 },
  goalProgressLabel: { fontSize: 12, color: "#7C4DFF", textAlign: "right" },
  statusRow: { flexDirection: "row", gap: 8 },
  statusItem: { flex: 1, borderRadius: 10, padding: 10, alignItems: "center" },
  statusCount: { fontSize: 20, fontWeight: "800" },
  statusLabel: { fontSize: 11, color: "#525252", marginTop: 2 },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  metricItem: {
    width: "47%",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    paddingVertical: 14,
  },
  metricIcon: { borderRadius: 14, marginBottom: 6 },
  metricValue: { fontSize: 16, fontWeight: "800", marginBottom: 2 },
  metricLabel: { fontSize: 11, color: "#6B7280", textAlign: "center" },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 10,
  },
  trendIcon: { borderRadius: 18 },
  trendInfo: { flex: 1 },
  trendLabel: { fontSize: 14, fontWeight: "700" },
  trendDesc: { fontSize: 12, color: "#525252", marginTop: 2 },
  actionDivider: { marginVertical: 8 },
  actions: { gap: 10 },
  actionBtn: { borderRadius: 12 },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// CoachContentTrackingScreen  (FR-E12-03)
// AC-FR-E12-03-01: journeys+workshops | AC-FR-E12-03-02: ebooks+chapter status
// AC-FR-E12-03-03: completion % | AC-FR-E12-03-04: time-spent metrics
// ─────────────────────────────────────────────────────────────────────────
files["CoachContentTrackingScreen.tsx"] = `import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { OfflineNotice } from "../components/OfflineNotice";
import { ScreenLayout } from "../components/ScreenLayout";
import { SectionCard } from "../components/SectionCard";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { StateMessage } from "../components/StateMessage";
import { resolveScreenState, ScreenState } from "../components/ScreenState";
import {
  getContentProgressForUser,
  getEbookProgressForUser,
  getEbooks,
  getJourneys,
  getUsers,
  getWorkshops,
} from "../../data/mockSelectors";
import {
  PActivityIndicator,
  PAvatar,
  PDivider,
  PProgressBar,
  PText,
} from "../../components";

type RouteParams = { clientId?: string; state?: ScreenState };

function getDisplayName(email?: string): string {
  if (!email) return "Danisan";
  return email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function getLastActivityLabel(dateStr?: string): string {
  if (!dateStr) return "Bilinmiyor";
  const daysSince = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (daysSince === 0) return "Bugun";
  if (daysSince === 1) return "Dun";
  return daysSince + " gun once";
}

// Estimated minutes per content progress item
const EST_MINS_PER_ITEM = 15;

const CoachContentTrackingContent = ({
  clientId,
  isOffline,
}: {
  clientId?: string;
  isOffline?: boolean;
}) => {
  const navigation = useNavigation<any>();
  const client = getUsers().find((u) => u.id === clientId) ?? getUsers()[1];
  const progress = getContentProgressForUser(client?.id);
  const ebookProgress = getEbookProgressForUser(client?.id);
  const journeys = getJourneys();
  const workshops = getWorkshops();
  const ebooks = getEbooks();

  // Group progress by content_type
  const journeyProgress = progress.filter((p) => p.content_type === "journey_day");
  const workshopProgress = progress.filter(
    (p) => p.content_type === "workshop" || p.content_type === "workshop_section"
  );
  const completedIds = new Set(
    progress.filter((p) => p.status === "completed").map((p) => p.content_id)
  );

  // AC-FR-E12-03-03: compute completion % per journey
  const journeyStats = journeys.map((j) => {
    const days = progress.filter(
      (p) => p.content_type === "journey_day" && p.content_id.startsWith("b")
    );
    const done = progress.filter((p) => p.status === "completed" && p.content_type === "journey_day").length;
    const total = Math.max(progress.length, 1);
    const pct = total > 0 ? done / total : 0;
    const lastP = progress
      .filter((p) => p.content_type === "journey_day")
      .sort((a, b) => new Date(b.started_at ?? 0).getTime() - new Date(a.started_at ?? 0).getTime())[0];
    // AC-FR-E12-03-04: time spent estimate
    const estMins = done * EST_MINS_PER_ITEM;
    return { journey: j, pct, done, total: progress.length, lastActivity: lastP?.started_at, estMins };
  });

  const workshopStats = workshops.map((w) => {
    const done = 0;
    const total = 3; // estimate
    const pct = done / total;
    const estMins = 0;
    return { workshop: w, pct, done, total, estMins };
  });

  return (
    <>
      {/* AC-FR-E12-03-01: journeys */}
      <SectionCard title="Aktif Yolculuklar">
        {journeyStats.length === 0 ? (
          <View style={styles.emptySection}>
            <PText style={styles.emptyText}>Aktif yolculuk bulunamadi.</PText>
          </View>
        ) : (
          journeyStats.map((item, idx) => (
            <View key={item.journey.id}>
              <View
                style={styles.contentRow}
                accessible
                accessibilityLabel={
                  item.journey.title +
                  ". Tamamlanma: yuzde " + Math.round(item.pct * 100) +
                  ". Son aktivite: " + getLastActivityLabel(item.lastActivity) +
                  ". Tahmini sure: " + item.estMins + " dakika."
                }
              >
                <PAvatar.Icon
                  size={36}
                  icon="map-marker-path"
                  color="#7C4DFF"
                  style={styles.contentIcon}
                  accessible={false}
                />
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle} numberOfLines={1}>
                    {item.journey.title}
                  </PText>
                  {/* AC-FR-E12-03-03: completion % */}
                  <View style={styles.pctRow}>
                    <PProgressBar
                      progress={item.pct}
                      color="#7C4DFF"
                      style={styles.contentBar}
                      accessible={false}
                    />
                    <PText style={styles.pctText}>{Math.round(item.pct * 100)}%</PText>
                  </View>
                  <View style={styles.metaRow}>
                    <PText style={styles.metaText}>
                      Son aktivite: {getLastActivityLabel(item.lastActivity)}
                    </PText>
                    {/* AC-FR-E12-03-04: time spent */}
                    <PText style={styles.metaText}>
                      {item.estMins > 0 ? "~" + item.estMins + "dk" : "Baslamamis"}
                    </PText>
                  </View>
                </View>
              </View>
              {idx < journeyStats.length - 1 && <PDivider style={styles.rowDivider} />}
            </View>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E12-03-01: workshops */}
      <SectionCard title="Atolyeler">
        {workshopStats.length === 0 ? (
          <View style={styles.emptySection}>
            <PText style={styles.emptyText}>Aktif atolye bulunamadi.</PText>
          </View>
        ) : (
          workshopStats.map((item, idx) => (
            <View key={item.workshop.id}>
              <View
                style={styles.contentRow}
                accessible
                accessibilityLabel={
                  item.workshop.title +
                  ". Tamamlanma: yuzde " + Math.round(item.pct * 100) +
                  ". Tahmini sure: " + item.estMins + " dakika."
                }
              >
                <PAvatar.Icon
                  size={36}
                  icon="school-outline"
                  color="#0EA5E9"
                  style={styles.contentIconBlue}
                  accessible={false}
                />
                <View style={styles.contentInfo}>
                  <PText style={styles.contentTitle} numberOfLines={1}>
                    {item.workshop.title}
                  </PText>
                  <View style={styles.pctRow}>
                    <PProgressBar
                      progress={item.pct}
                      color="#0EA5E9"
                      style={styles.contentBar}
                      accessible={false}
                    />
                    <PText style={styles.pctText}>{Math.round(item.pct * 100)}%</PText>
                  </View>
                  <View style={styles.metaRow}>
                    <PText style={styles.metaText}>
                      {item.done}/{item.total} bolum
                    </PText>
                    <PText style={styles.metaText}>
                      {item.estMins > 0 ? "~" + item.estMins + "dk" : "Baslamamis"}
                    </PText>
                  </View>
                </View>
              </View>
              {idx < workshopStats.length - 1 && <PDivider style={styles.rowDivider} />}
            </View>
          ))
        )}
      </SectionCard>

      {/* AC-FR-E12-03-02: ebooks and chapter status */}
      <SectionCard title="E-Kitaplar">
        {ebooks.length === 0 ? (
          <View style={styles.emptySection}>
            <PText style={styles.emptyText}>E-kitap bulunamadi.</PText>
          </View>
        ) : (
          ebooks.map((ebook, idx) => {
            const ep = ebookProgress.find((p: any) => p.ebook_id === ebook.id);
            const pct = ep ? (ep as any).percent_complete ?? 0 : 0;
            const estMins = Math.round(pct * 200 / 100); // estimate 200 mins for full book
            const lastRead = ep ? (ep as any).updated_at ?? null : null;
            return (
              <View key={ebook.id}>
                <View
                  style={styles.contentRow}
                  accessible
                  accessibilityLabel={
                    ebook.title +
                    ". Tamamlanma: yuzde " + Math.round(pct) +
                    (lastRead ? ". Son okuma: " + getLastActivityLabel(lastRead) : "")
                  }
                >
                  <PAvatar.Icon
                    size={36}
                    icon="book-open-outline"
                    color="#10B981"
                    style={styles.contentIconGreen}
                    accessible={false}
                  />
                  <View style={styles.contentInfo}>
                    <PText style={styles.contentTitle} numberOfLines={1}>
                      {ebook.title}
                    </PText>
                    <View style={styles.pctRow}>
                      <PProgressBar
                        progress={pct / 100}
                        color="#10B981"
                        style={styles.contentBar}
                        accessible={false}
                      />
                      <PText style={styles.pctText}>{Math.round(pct)}%</PText>
                    </View>
                    <View style={styles.metaRow}>
                      {/* AC-FR-E12-03-02: chapter status */}
                      <PText style={styles.metaText}>
                        {lastRead ? "Son okuma: " + getLastActivityLabel(lastRead) : "Henuz baslanmamis"}
                      </PText>
                      {/* AC-FR-E12-03-04: time spent */}
                      <PText style={styles.metaText}>
                        {estMins > 0 ? "~" + estMins + "dk" : "0dk"}
                      </PText>
                    </View>
                  </View>
                </View>
                {idx < ebooks.length - 1 && <PDivider style={styles.rowDivider} />}
              </View>
            );
          })
        )}
      </SectionCard>
    </>
  );
};

export const CoachContentTrackingScreen = ({
  route,
}: {
  route?: { params?: RouteParams };
}) => {
  const state = resolveScreenState(route);
  const clientId = route?.params?.clientId;
  const client = getUsers().find((u) => u.id === clientId);
  const title = client ? getDisplayName(client.email) : "Danisan";

  if (state === "loading") {
    return (
      <ScreenLayout title="Icerik Takibi" subtitle={title}>
        <PActivityIndicator animating accessibilityLabel="Icerik takibi yukleniyor" />
        <SkeletonBlock height={100} />
        <SkeletonBlock height={100} />
        <SkeletonBlock height={100} />
      </ScreenLayout>
    );
  }

  if (state === "empty" || !clientId) {
    return (
      <ScreenLayout title="Icerik Takibi" subtitle="">
        <StateMessage
          title="Icerik bulunamadi"
          description="Bu danisana ait icerik verisi bulunamadi."
          icon="book-open-outline"
        />
      </ScreenLayout>
    );
  }

  if (state === "error") {
    return (
      <ScreenLayout title="Icerik Takibi" subtitle={title}>
        <StateMessage
          title="Veriler yuklenemedi"
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
      <ScreenLayout title="Icerik Takibi" subtitle={title + " - Cevrimdisi mod"}>
        <OfflineNotice />
        <CoachContentTrackingContent clientId={clientId} isOffline />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout title="Icerik Takibi" subtitle={title + " - Detayli ilerleme"}>
      <CoachContentTrackingContent clientId={clientId} />
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  contentRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 8 },
  contentIcon:      { backgroundColor: "#F5F3FF", borderRadius: 18 },
  contentIconBlue:  { backgroundColor: "#E0F2FE", borderRadius: 18 },
  contentIconGreen: { backgroundColor: "#D1FAE5", borderRadius: 18 },
  contentInfo: { flex: 1 },
  contentTitle: { fontSize: 14, fontWeight: "600", color: "#1E293B", marginBottom: 6 },
  pctRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  contentBar: { flex: 1, height: 6, borderRadius: 6 },
  pctText: { fontSize: 12, fontWeight: "700", color: "#525252", minWidth: 32 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 4 },
  metaText: { fontSize: 11, color: "#9CA3AF" },
  rowDivider: { marginVertical: 4 },
  emptySection: { paddingVertical: 16, alignItems: "center" },
  emptyText: { fontSize: 13, color: "#9CA3AF" },
});
`;

// ─────────────────────────────────────────────────────────────────────────
// CoachFeedbackScreen  (FR-E12-04)
// AC-FR-E12-04-01: feedback form | AC-FR-E12-04-02: send notification
// AC-FR-E12-04-03: feedback history | AC-FR-E12-04-04: auto-save draft
// ─────────────────────────────────────────────────────────────────────────
files["CoachFeedbackScreen.tsx"] = `import React, { useEffect, useRef, useState } from "react";
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
  return email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
                Gonderildi — {displayName} bildirim alacak.
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
`;

// Write all files
let written = 0;
for (const [filename, content] of Object.entries(files)) {
  const filePath = path.join(COACH_DIR, filename);
  fs.writeFileSync(filePath, content, "utf8");
  written++;
  console.log("Wrote " + filename);
}
console.log("\nScreens written: " + written + "/" + Object.keys(files).length);
