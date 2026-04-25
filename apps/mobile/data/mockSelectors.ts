import mockDataJson from '../../../artifacts/mock/mock_data.json';
import { getMockData } from '../config/mockData';

export type MockData = typeof mockDataJson;

const getData = (): MockData | null => getMockData();

const getList = <T>(list?: T[]): T[] => list ?? [];

// ---------------------------------------------------------------------------
// Raw entity accessors (internal)
// ---------------------------------------------------------------------------

const getRawJourneys = () => getList(getData()?.journeys);
const getRawModules = () => getList(getData()?.modules);
const getRawWorkshops = () => getList(getData()?.workshops);
const getRawWorkshopGroups = () => getList((getData() as any)?.workshop_groups as any[]);
const getRawEbooks = () => getList(getData()?.ebooks);
const getRawContentSeries = () => getList((getData() as any)?.content_series as any[]);

const inferEntityTypeByContentItemId = (contentItemId?: string) => {
  if (!contentItemId) return 'content';
  if (getRawJourneys().some((j: any) => j.content_item_id === contentItemId)) return 'journey';
  if (getRawModules().some((m: any) => m.content_item_id === contentItemId)) return 'module';
  if (getRawWorkshops().some((w: any) => w.content_item_id === contentItemId)) return 'workshop';
  if (getRawEbooks().some((e: any) => e.content_item_id === contentItemId)) return 'ebook';
  return 'content';
};

// ---------------------------------------------------------------------------
// Entity normalization helpers
// Adds `id` alias for `content_item_id` and `title` from domain fields so
// screens written for the old flat schema still work.
// ---------------------------------------------------------------------------

type Normalized<T extends object> = T & { id: string; title: string };

const normalizeJourney = (j: any): Normalized<typeof j> => ({
  ...j,
  id: j.content_item_id,
  title: j.title ?? `Yolculuk (${j.duration_days} gun, ${j.level})`
});

const normalizeModule = (m: any): Normalized<typeof m> => ({
  ...m,
  id: m.content_item_id,
  title: m.title ?? m.description ?? 'Modul'
});

const normalizeWorkshop = (w: any): Normalized<typeof w> => ({
  ...w,
  id: w.content_item_id,
  title: w.title ?? w.theme ?? 'Atolye'
});

const normalizeEbook = (e: any): Normalized<typeof e> => ({
  ...e,
  id: e.content_item_id,
  title: e.title ?? e.category ?? 'e-Kitap'
});

// ---------------------------------------------------------------------------
// User / session
// ---------------------------------------------------------------------------

export const getUsers = () =>
  getList(getData()?.users).map((u: any) => ({
    ...u,
    // Compatibility aliases
    language: u.language_code,
    phone: u.phone ?? null,
    status: u.status ?? 'active'
  }));
export const getPrimaryUser = () => getUsers()[0];
export const getUserSessions = () => getList(getData()?.user_sessions as any[]);
export const getSessionsForUser = (userId?: string) => getUserSessions().filter((s: any) => s.user_id === userId);

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export const getAccessibilitySettings = () =>
  getList(getData()?.accessibility_settings).map((s: any) => ({
    ...s,
    // Compatibility aliases
    text_size: s.text_scale
  }));

export const getReadingSettings = () =>
  getList(getData()?.reading_settings).map((s: any) => ({
    ...s,
    // Compatibility aliases
    font_size: Math.round(s.font_scale * 16),
    background: s.background_mode,
    line_height: String(s.line_spacing)
  }));

export const getReminderSettings = () =>
  getList(getData()?.reminder_settings).map((s: any) => ({
    ...s,
    // Compatibility aliases
    enabled: s.daily_enabled,
    time_local: s.daily_time_local ?? s.time_local ?? '20:00'
  }));

// ---------------------------------------------------------------------------
// Subscription / billing
// ---------------------------------------------------------------------------

export const getSubscriptionPlans = () =>
  getList(getData()?.subscription_plans).map((p: any) => ({
    ...p,
    // Compatibility alias
    name: p.name ?? p.plan_type
  }));
export const getSubscriptions = () => getList(getData()?.subscriptions);

/** Subscription add-ons junction table (subscription_addons). */
export const getSubscriptionAddOns = () => getList(getData()?.subscription_addons as any[]);

/** Stub: no invitations in current mock data. */
export const getInvitations = (): any[] => [];

/**
 * Synthetic add-on catalog derived from known addon_type values.
 * Replaces the old `add_ons` table which no longer exists in mock_data.json.
 */
const ADDON_CATALOG = [
  { id: 'addon-coaching-school', code: 'coaching_school', addon_type: 'coaching_school', name: 'Kocluk Okulu Erisimi' },
  {
    id: 'addon-ebook-unlimited',
    code: 'ebook_unlimited',
    addon_type: 'ebook_unlimited',
    name: 'Sonsuz e-Kitap Erisimi'
  },
  { id: 'addon-group-workshop', code: 'group_workshop', addon_type: 'group_workshop', name: 'Grup Atolyesi' }
];
export const getAddOns = () => ADDON_CATALOG;

export const getSeats = () =>
  getList(getData()?.seats).map((s: any) => ({
    ...s,
    // Compatibility alias
    user_id: s.user_id ?? s.assigned_user_id
  }));

/**
 * Purchase receipts (replaces old payment_transactions).
 * Returns purchase_receipts enriched with compatibility fields so screens
 * expecting `amount`, `currency`, `status`, and `purchased_at` still work.
 */
export const getPaymentTransactions = () =>
  getList(getData()?.purchase_receipts as any[]).map((r: any) => ({
    ...r,
    status: r.verification_status ?? 'completed',
    purchased_at: r.verified_at ?? r.created_at,
    amount: r.amount ?? null,
    currency: r.currency ?? null
  }));

// ---------------------------------------------------------------------------
// Content entities (normalized with id + title)
// ---------------------------------------------------------------------------

export const getJourneys = () => getRawJourneys().map(normalizeJourney);
export const getModules = () => getRawModules().map(normalizeModule);
export const getPackages = () =>
  getList(getData()?.packages).map((p: any) => ({
    ...p,
    // Compatibility alias
    description: p.description ?? null
  }));
export const getWorkshops = () => getRawWorkshops().map(normalizeWorkshop);
export const getWorkshopGroups = () => {
  // Build a live count map from actual workshop_group_id FK — no hardcoded numbers.
  const countByGroup = new Map<string, number>();
  for (const w of getRawWorkshops()) {
    const gid = (w as any).workshop_group_id;
    if (gid) countByGroup.set(gid, (countByGroup.get(gid) ?? 0) + 1);
  }
  return getRawWorkshopGroups()
    .map((group: any) => ({
      ...group,
      title: group.title ?? group.name ?? 'Atolye Grubu',
      description: group.description ?? '',
      catalog_count: countByGroup.get(group.id) ?? 0,
      featured_workshop_ids: getList(group.featured_workshop_ids as string[]),
      target_audiences: getList(group.target_audiences as string[])
    }))
    .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));
};
export const getEbooks = () => getRawEbooks().map(normalizeEbook);
export const getEbookChapters = () =>
  getList(getData()?.ebook_chapters).map((ch: any) => ({
    ...ch,
    // Compatibility aliases
    page_start: ch.page_start ?? null,
    page_end: ch.page_end ?? null
  }));
export const getContentAssets = () => getList(getData()?.content_assets as any[]);

/**
 * Content items registry — abstract parent record for every top-level piece of
 * content (journeys, modules, workshops, ebooks). Each row maps an `id` (=
 * content_item_id on child tables) to `source_id` and compatibility metadata.
 */
export const getContentItemsRegistry = () =>
  getList((getData() as any)?.content_items as any[]).map((ci: any) => ({
    ...ci,
    // Compatibility: infer entity_type when mock fixture omits it.
    entity_type: ci.entity_type ?? inferEntityTypeByContentItemId(ci.id)
  }));
export const getContentItemRegistryById = (id: string) => getContentItemsRegistry().find((ci: any) => ci.id === id);

/**
 * Content sources — the 4 top-level catalogs (Kesifler Yolculugu, Duygular
 * Evreni, Kitaplar, Atolyeler). Sorted by order_index.
 */
export const getContentSources = () =>
  getList((getData() as any)?.content_sources as any[])
    .map((source: any) => ({
      ...source
    }))
    .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));

export const getContentSourceById = (id: string) => getContentSources().find((s: any) => s.id === id);

export const getContentSeries = () =>
  getRawContentSeries().sort((a: any, b: any) => {
    const sourceCmp = String(a.source_id ?? '').localeCompare(String(b.source_id ?? ''));
    if (sourceCmp !== 0) return sourceCmp;
    return (a.order_index ?? 0) - (b.order_index ?? 0);
  });
export const getContentSeriesById = (id: string) => getContentSeries().find((series: any) => series.id === id);
export const getContentSeriesForSource = (sourceId?: string) =>
  getContentSeries().filter((series: any) => series.source_id === sourceId);

/**
 * Content blocks (_content_blocks) – sub-items within journeys, packages,
 * workshops. Replaces the old `content_items` table.
 */
export const getContentItems = () => getList(getData()?._content_blocks as any[]);

/** Stub: exercise steps removed from current schema. */
export const getExerciseSteps = (): any[] => [];

/** Journey-day rows used by day-level content screens. */
export const getJourneyDays = () => getList((getData() as any)?.journey_days as any[]);

// ---------------------------------------------------------------------------
// User content / progress
// ---------------------------------------------------------------------------

/**
 * Content progress.
 * Adds `content_id` as a compatibility alias for `content_item_id` so screens
 * written with the old field name still work.
 */
export const getContentProgress = () =>
  getList(getData()?.content_progress).map((p: any) => ({
    ...p,
    content_id: p.content_item_id,
    // `content_type` alias for `target_type` (old progress schema)
    content_type: p.target_type ?? p.content_type
  }));

/**
 * Comment submissions (replaces old `comments` table).
 * Provides a `content_item_id` compatibility alias pointing at
 * `target_content_item_id` so old screens continue to work.
 */
export const getComments = () =>
  getList(getData()?.comment_submissions as any[]).map((c: any) => ({
    ...c,
    content_item_id: c.target_content_item_id ?? c.content_item_id
  }));

/**
 * Highlights. Adds `source_id` / `source_type` compatibility aliases.
 */
export const getHighlights = () =>
  getList(getData()?.highlights).map((h: any) => ({
    ...h,
    source_id: h.content_item_id,
    source_type: 'ebook'
  }));

/**
 * Notes. Adds `source_id` compatibility alias and `text` alias for `body`.
 */
export const getNotes = () =>
  getList(getData()?.notes).map((n: any) => ({
    ...n,
    source_id: n.content_item_id,
    text: n.body
  }));

/**
 * Favorite items (replaces old `favorites` table).
 * Exposes a `content_id` compatibility alias derived from the typed FK columns.
 */
export const getFavorites = () =>
  getList(getData()?.favorite_items as any[]).map((f: any) => ({
    ...f,
    // Compatibility: derive a single content_id / item_id from typed FKs
    content_id: f.content_item_ref_id ?? f.highlight_ref_id ?? f.note_ref_id ?? null,
    item_id: f.content_item_ref_id ?? f.highlight_ref_id ?? f.note_ref_id ?? null
  }));

export const getCollections = () => getList(getData()?.collections);
export const getCollectionItems = () => getList(getData()?.collection_items);

/**
 * Reading positions (replaces old `ebook_progress` table).
 * Exposes `ebook_id` as a compatibility alias for `content_item_id`.
 */
export const getEbookProgress = () =>
  getList(getData()?.reading_positions as any[]).map((p: any) => ({
    ...p,
    ebook_id: p.content_item_id,
    percent_complete: p.progress_percent
  }));

export const getDownloads = () => {
  const ebookIds = new Set(getRawEbooks().map((e: any) => e.content_item_id));
  const workshopIds = new Set(getRawWorkshops().map((w: any) => w.content_item_id));
  const journeyIds = new Set(getRawJourneys().map((j: any) => j.content_item_id));
  return getList(getData()?.downloads as any[]).map((d: any) => {
    let content_type = d.content_type ?? 'content';
    if (!d.content_type) {
      if (ebookIds.has(d.content_item_id)) content_type = 'ebook';
      else if (workshopIds.has(d.content_item_id)) content_type = 'workshop';
      else if (journeyIds.has(d.content_item_id)) content_type = 'journey';
    }
    return {
      ...d,
      // Compatibility aliases
      content_id: d.content_item_id,
      content_type,
      status: d.download_status,
      size_bytes: d.byte_size
    };
  });
};

/**
 * User badges (replaces old `achievements` table).
 * Exposes compatibility fields: `source_id`, `source_type`, `issued_at`.
 */
export const getAchievements = () =>
  getList(getData()?.user_badges as any[]).map((b: any) => ({
    ...b,
    // Compatibility aliases for screens expecting old achievement shape
    source_id: b.badge_definition_id,
    source_type: b.badge_definition?.category ?? 'badge',
    issued_at: b.awarded_at
  }));

export const getBadgeDefinitions = () => getList(getData()?.badge_definitions as any[]);

/** Stub: content reviews not in current schema. */
export const getContentReviews = (): any[] => [];

export const getCoachAssignments = () => getList(getData()?.coach_assignments as any[]);

// ---------------------------------------------------------------------------
// Filtered / relational helpers
// ---------------------------------------------------------------------------

export const getSubscriptionForUser = (userId?: string) => getSubscriptions().find(s => s.owner_user_id === userId);

export const getPlanForSubscription = (planId?: string) => getSubscriptionPlans().find(p => p.id === planId);

/**
 * Returns catalog add-on entries that are active for the given subscription.
 * Matches by `addon_type` against the subscription_addons junction table.
 */
export const getAddOnsForSubscription = (subscriptionId?: string) => {
  const activeAddonTypes = new Set(
    getSubscriptionAddOns()
      .filter((item: any) => item.subscription_id === subscriptionId)
      .map((item: any) => item.addon_type)
  );
  return ADDON_CATALOG.filter(addon => activeAddonTypes.has(addon.addon_type));
};

export const getSeatsForSubscription = (subscriptionId?: string) =>
  getSeats().filter(seat => seat.subscription_id === subscriptionId);

export const getInvitesForSubscription = (_subscriptionId?: string): any[] => [];

export const getPaymentsForSubscription = (subscriptionId?: string) =>
  getPaymentTransactions().filter((tx: any) => tx.subscription_id === subscriptionId);

// Content entity lookups (by id = content_item_id after normalization)
export const getJourneyById = (id?: string) => getJourneys().find(j => j.id === id);

export const getJourneyDaysForJourney = (journeyId?: string): any[] =>
  getJourneyDays().filter((d: any) => d.journey_content_item_id === journeyId);

export const getModuleById = (id?: string) => getModules().find(m => m.id === id);

/** Packages for a module. Uses `module_content_item_id` FK. */
export const getPackagesForModule = (moduleId?: string) =>
  getPackages().filter((pkg: any) => pkg.module_content_item_id === moduleId);

export const getWorkshopById = (id?: string) => getWorkshops().find(w => w.id === id);
export const getWorkshopGroupById = (id?: string) => getWorkshopGroups().find((group: any) => group.id === id);

export const getWorkshopsForGroup = (groupId?: string) => {
  if (!groupId) return getWorkshops();
  return getWorkshops().filter(w => (w as any).workshop_group_id === groupId);
};

export const getEbookById = (id?: string) => getEbooks().find(e => e.id === id);

/** Ebook chapters. Uses `ebook_content_item_id` FK. */
export const getEbookChaptersForEbook = (ebookId?: string) =>
  getEbookChapters().filter((ch: any) => ch.ebook_content_item_id === ebookId);

/** Content blocks by parent type / id. */
export const getContentItemsForParent = (parentType: string, parentId?: string) =>
  getContentItems().filter((item: any) => item.parent_type === parentType && item.parent_id === parentId);

export const getContentProgressForUser = (userId?: string) => getContentProgress().filter(p => p.user_id === userId);

export const getEbookProgressForUser = (userId?: string) => getEbookProgress().filter((p: any) => p.user_id === userId);

export const getHighlightsForUser = (userId?: string) => getHighlights().filter(h => h.user_id === userId);

export const getNotesForUser = (userId?: string) => getNotes().filter(n => n.user_id === userId);

export const getFavoritesForUser = (userId?: string) => getFavorites().filter((f: any) => f.user_id === userId);

export const getCollectionsForUser = (userId?: string) => getCollections().filter(c => c.user_id === userId);

export const getDownloadsForUser = (userId?: string) => getDownloads().filter((d: any) => d.user_id === userId);

// ---------------------------------------------------------------------------
// Coach helpers
// ---------------------------------------------------------------------------

export const getClientsForCoach = (coachUserId?: string) => {
  const assignments = getCoachAssignments().filter((a: any) => a.coach_user_id === coachUserId);
  const clientIds = new Set(assignments.map((a: any) => a.client_user_id));
  if (clientIds.size === 0) {
    return getUsers().filter(u => u.id !== coachUserId);
  }
  return getUsers().filter(u => clientIds.has(u.id));
};

export const getCommentsForClient = (clientUserId?: string) =>
  getComments().filter((c: any) => c.user_id === clientUserId);

// ---------------------------------------------------------------------------
// EPIC-17: Notification + Reminder selectors
// ---------------------------------------------------------------------------

export type MockNotification = {
  id: string;
  user_id: string;
  type: 'journey' | 'workshop' | 'reading' | 'social' | 'achievement';
  title: string;
  description: string;
  content_id?: string;
  content_type?: string;
  is_read: boolean;
  created_at: string;
};

/** FR-E17-01/02: Prefer notifications table; fallback to synthesized feed if absent. */
export const getNotificationsForUser = (userId?: string): MockNotification[] => {
  const uid = userId ?? getPrimaryUser()?.id;
  const rawNotifications = getList((getData() as any)?.notifications as any[]).filter((n: any) => n.user_id === uid);
  if (rawNotifications.length > 0) {
    return rawNotifications.map((n: any) => {
      const payload = n.payload ?? {};
      const contentType = payload.content_type ?? (payload.type === 'achievement' ? 'badge' : payload.type);
      const mapType = (t?: string): MockNotification['type'] => {
        if (t === 'journey' || t === 'workshop' || t === 'reading' || t === 'social' || t === 'achievement') {
          return t;
        }
        return 'social';
      };
      return {
        id: n.id,
        user_id: n.user_id,
        type: mapType(payload.type),
        title: n.title,
        description: payload.description ?? n.body,
        content_id: payload.content_id ?? payload.content_item_id,
        content_type: contentType,
        is_read: n.status === 'read' || !!n.read_at,
        created_at: n.created_at
      };
    });
  }

  const results: MockNotification[] = [];

  // Achievements (user_badges)
  getAchievements()
    .filter((a: any) => a.user_id === uid)
    .forEach((a: any) => {
      results.push({
        id: 'notif-ach-' + a.id,
        user_id: a.user_id,
        type: 'achievement',
        title: 'Rozet Kazanildi',
        description: 'Yeni bir basarim rozeti kazandiniz.',
        content_id: a.badge_definition_id,
        content_type: 'badge',
        is_read: false,
        created_at: a.awarded_at ?? a.created_at
      });
    });

  // Completed content progress
  getContentProgress()
    .filter(p => p.user_id === uid && p.status === 'completed')
    .forEach(p => {
      results.push({
        id: 'notif-prog-' + p.id,
        user_id: p.user_id,
        type: 'journey',
        title: 'Icerik Tamamlandi',
        description: 'Bir icerik basariyla tamamlandi.',
        content_id: p.content_item_id,
        content_type: p.target_type,
        is_read: false,
        created_at: (p as any).completed_at ?? (p as any).started_at
      });
    });

  // Submitted comments
  getComments()
    .filter((c: any) => c.user_id === uid && c.status === 'submitted')
    .forEach((c: any) => {
      results.push({
        id: 'notif-cmt-' + c.id,
        user_id: c.user_id,
        type: 'social',
        title: 'Yorum Gonderildi',
        description: 'Yorumunuz basariyla gonderildi.',
        content_id: c.target_content_item_id ?? c.content_item_id,
        content_type: c.target_type ?? 'content_item',
        is_read: false,
        created_at: c.submitted_at ?? c.updated_at
      });
    });

  return results;
};

/** FR-E17-04: Get reminder settings for a specific user. */
export const getReminderSettingsForUser = (userId?: string) => {
  const uid = userId ?? getPrimaryUser()?.id;
  return getReminderSettings().find((r: any) => r.user_id === uid) ?? null;
};

// ---------------------------------------------------------------------------
// Home dashboard helpers
// ---------------------------------------------------------------------------

export const getContentAreas = () => getList(getData()?.content_areas as any[]);

export const getContentNavAreas = () => getList(getData()?.content_nav_areas as any[]);

export const getReminderTimeSlots = () => getList(getData()?.reminder_time_slots as any[]);

export const getRecentSearchesForUser = (userId?: string) => {
  const uid = userId ?? getPrimaryUser()?.id;
  return getList(getData()?.recent_searches as any[])
    .filter((s: any) => s.user_id === uid)
    .map((s: any) => s.term as string);
};

export const getPopularTopics = () => getList(getData()?.popular_topics as any[]);

export const getAddOnCatalogWithStatusForSubscription = (subscriptionId?: string) => {
  const activeTypes = new Set(
    getSubscriptionAddOns()
      .filter((item: any) => item.subscription_id === subscriptionId)
      .map((item: any) => item.addon_type)
  );
  return ADDON_CATALOG.map(addon => ({ ...addon, active: activeTypes.has(addon.addon_type) }));
};

export const getHomeStatsForUser = (userId?: string) => {
  const uid = userId ?? getPrimaryUser()?.id;
  return getList(getData()?.home_stats as any[]).find((s: any) => s.user_id === uid) ?? null;
};

function relativeTime(dateStr?: string | null): string {
  if (!dateStr) return '';
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diffMs / 3_600_000);
  if (hours < 24) return `${hours} saat once`;
  return `${Math.floor(hours / 24)} gun once`;
}

export const getActivitiesForUser = (
  userId?: string
): Array<{ title: string; time: string; icon: string; tone: 'success' | 'warning' | 'error' | 'primary' }> => {
  const uid = userId ?? getPrimaryUser()?.id;

  const raw: Array<{
    sortKey: number;
    title: string;
    time: string;
    icon: string;
    tone: 'success' | 'warning' | 'error' | 'primary';
  }> = [];

  getAchievements()
    .filter((a: any) => a.user_id === uid)
    .forEach((a: any) => {
      raw.push({
        sortKey: new Date(a.awarded_at ?? a.created_at).getTime(),
        title: 'Yeni rozet kazandiniz!',
        time: relativeTime(a.awarded_at ?? a.created_at),
        icon: 'trophy-outline',
        tone: 'warning'
      });
    });

  getContentProgress()
    .filter(p => p.user_id === uid && p.status === 'completed')
    .forEach(p => {
      const typeLabel = (p as any).target_type === 'module' ? 'Modul' : 'Icerik';
      const date = (p as any).completed_at ?? (p as any).started_at;
      raw.push({
        sortKey: new Date(date).getTime(),
        title: `${typeLabel} tamamlandi`,
        time: relativeTime(date),
        icon: 'check-circle-outline',
        tone: 'success'
      });
    });

  return raw.sort((a, b) => b.sortKey - a.sortKey).map(({ sortKey: _s, ...item }) => item);
};

// ---------------------------------------------------------------------------
// Content screen mock payloads
// ---------------------------------------------------------------------------

const getContentScreenMock = () => (getData() as any)?.content_screen_mock ?? {};

export const getCommentEmotionTags = (): string[] => getList(getContentScreenMock().comment_emotion_tags as string[]);

export const getReviewRatingLabels = (): string[] => getList(getContentScreenMock().review_rating_labels as string[]);

export const getPaywallPlanBenefits = (): string[] => getList(getContentScreenMock().paywall_plan_benefits as string[]);

export const getReaderAudioSpeeds = (): string[] => getList(getContentScreenMock().reader_audio_speeds as string[]);

export const getReaderHighlightColors = () =>
  getList(
    getContentScreenMock().reader_highlight_colors as Array<{
      key: string;
      color: string;
      label: string;
    }>
  );

export const getReadingParagraphs = (): string[] => getList(getContentScreenMock().reading_paragraphs as string[]);

export const getExerciseFallbackSteps = () =>
  getList(
    getContentScreenMock().exercise_fallback_steps as Array<{
      id: string;
      title: string;
      description: string;
    }>
  );

export const getWorkshopSectionBlocks = () =>
  getList(
    getContentScreenMock().workshop_section_blocks as Array<{
      type: string;
      label: string;
      text: string;
      arabic?: string;
      transliteration?: string;
    }>
  );

export const getWorkshopGuideSections = () =>
  getList(
    getContentScreenMock().workshop_guide_sections as Array<{
      stage: string;
      time: string;
      title: string;
      script: string;
      responses: string[];
      alt: string;
      microSkill: string;
    }>
  );

export const getWorkshopGuideHardScenarios = () =>
  getList(
    getContentScreenMock().workshop_guide_hard_scenarios as Array<{
      label: string;
      action: string;
    }>
  );

export const getWorkshopFollowUpPhases = () =>
  getList(
    getContentScreenMock().workshop_follow_up_phases as Array<{
      id: string;
      label: string;
      desc: string;
      steps: string[];
    }>
  );

export const getWorkshopFollowUpReminderTimes = (): string[] =>
  getList(getContentScreenMock().workshop_follow_up_reminder_times as string[]);

export const getWorkshopCampDays = () =>
  getList(
    getContentScreenMock().workshop_camp_days as Array<{
      day: number;
      label: string;
      theme: string;
      sessions: Array<{
        id: string;
        slot: string;
        title: string;
        purpose: string;
        duration: string;
        flow: string;
        output: string;
        worksheets: string[];
        completed?: boolean;
      }>;
    }>
  );

const getDiscoverMock = () => getContentScreenMock().discover_mock ?? {};

export const getDiscoverAssistantIntroBenefits = (): string[] =>
  getList(getDiscoverMock().assistant_intro_benefits as string[]);

export const getDiscoverAssistantIntroSteps = () =>
  getList(
    getDiscoverMock().assistant_intro_steps as Array<{
      title: string;
      subtitle: string;
    }>
  );

export const getDiscoverAssistantGoalOptions = () =>
  getList(
    getDiscoverMock().assistant_question_goal_options as Array<{
      label: string;
      value: string;
    }>
  );

export const getDiscoverAssistantDurationOptions = () =>
  getList(
    getDiscoverMock().assistant_question_duration_options as Array<{
      label: string;
      value: string;
    }>
  );

export const getDiscoverAssistantPreferenceOptions = () =>
  getList(
    getDiscoverMock().assistant_question_preference_options as Array<{
      label: string;
      value: string;
      emoji: string;
    }>
  );

export const getDiscoverAIAssistantHistory = () =>
  getList(
    getDiscoverMock().ai_assistant_intro_history as Array<{
      id: string;
      question: string;
      preview: string;
      time: string;
      sourceCount: number;
    }>
  );

export const getDiscoverAIAssistantQuickSuggestions = (): string[] =>
  getList(getDiscoverMock().ai_assistant_intro_quick_suggestions as string[]);

export const getDiscoverAIAssistantFollowUpSuggestions = (): string[] =>
  getList(getDiscoverMock().ai_assistant_follow_up_suggestions as string[]);

export const getDiscoverAIAssistantSourceTypes = () =>
  getList(
    getDiscoverMock().ai_assistant_source_types as Array<{
      icon: string;
      label: string;
      type: string;
    }>
  );

export const getDiscoverAssistantInsightPatterns = () =>
  getList(
    getDiscoverMock().assistant_insight_patterns as Array<{
      id: string;
      label: string;
      count: number;
      icon: string;
    }>
  );

export const getDiscoverJourneySortOptions = (): string[] =>
  getList(getDiscoverMock().journeys_sort_options as string[]);

export const getDiscoverJourneyLevelOptions = () =>
  getList(
    getDiscoverMock().journeys_level_options as Array<{
      key: string;
      label: string;
    }>
  );

export const getDiscoverJourneyCardEmojis = (): string[] => getList(getDiscoverMock().journeys_card_emojis as string[]);

export const getDiscoverJourneyCardColors = (): string[] => getList(getDiscoverMock().journeys_card_colors as string[]);

export const getDiscoverEbookSortOptions = (): string[] => getList(getDiscoverMock().ebooks_sort_options as string[]);

export const getDiscoverEbookCoverColors = (): string[] => getList(getDiscoverMock().ebooks_cover_colors as string[]);

export const getDiscoverEbookCoverEmojis = (): string[] => getList(getDiscoverMock().ebooks_cover_emojis as string[]);

export const getDiscoverWorkshopSortOptions = (): string[] =>
  getList(getDiscoverMock().workshops_sort_options as string[]);

export const getDiscoverWorkshopTypeOptions = () =>
  getList(
    getDiscoverMock().workshops_type_options as Array<{
      key: string;
      label: string;
    }>
  );

export const getDiscoverWorkshopTypeLabels = () =>
  (getDiscoverMock().workshops_type_labels as Record<string, string>) ?? {};

export const getDiscoverWorkshopTypeBackgroundColors = () =>
  (getDiscoverMock().workshops_type_bg as Record<string, string>) ?? {};

export const getDiscoverWorkshopTypeForegroundColors = () =>
  (getDiscoverMock().workshops_type_fg as Record<string, string>) ?? {};

export const getDiscoverWorkshopDifficultyLabels = () =>
  (getDiscoverMock().workshops_difficulty_labels as Record<string, string>) ?? {};

export const getDiscoverWorkshopDifficultyColors = () =>
  (getDiscoverMock().workshops_difficulty_colors as Record<string, string>) ?? {};

export const getDiscoverModuleSortOptions = (): string[] => getList(getDiscoverMock().modules_sort_options as string[]);

export const getDiscoverModuleTopicOptions = () =>
  getList(
    getDiscoverMock().modules_topic_options as Array<{
      key: string;
      label: string;
    }>
  );

export const getDiscoverModuleCardEmojis = (): string[] => getList(getDiscoverMock().modules_card_emojis as string[]);

export const getDiscoverModuleCardColors = (): string[] => getList(getDiscoverMock().modules_card_colors as string[]);

export const getDiscoverModuleTopics = (): string[] => getList(getDiscoverMock().modules_topics as string[]);

export const getDiscoverCatalogTabs = () =>
  getList(
    getDiscoverMock().catalog_tabs as Array<{
      key: string;
      label: string;
      emoji: string;
      route: string;
    }>
  );
