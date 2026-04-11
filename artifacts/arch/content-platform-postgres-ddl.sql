-- PST Content Platform Postgres DDL
--
-- Derived from:
-- - artifacts/arch/content-platform-erd.md
-- - artifacts/arch/content-platform-architecture-evaluation.md
--
-- Scope:
-- - Server-side Postgres schema for content, publishing, and operational app data
-- - Excludes the mobile-local SQLite tables (`local_*`, `sync_outbox`,
--   `sync_dead_letter`, `sync_checkpoint`) because they belong on-device
--
-- Assumptions:
-- - Seed data has been split into `artifacts/arch/content-platform-postgres-seed.sql`
-- - Greenfield schema intended as a concrete draft, not a rerunnable migration
-- - UUID primary keys use pgcrypto/gen_random_uuid()

begin;

create extension if not exists pgcrypto;
create schema if not exists pst;
set search_path to pst, public;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

create type content_item_kind as enum (
  'journey',
  'module',
  'workshop',
  'ebook',
  'spiritual_lesson_collection',
  'spiritual_lesson',
  'emotion_library',
  'emotion_entry',
  'hadith_analysis',
  'video'
);

create type content_status as enum (
  'draft',
  'review',
  'published',
  'archived'
);

create type content_visibility as enum (
  'free',
  'subscription',
  'addon',
  'role_restricted'
);

create type source_document_type as enum (
  'docx',
  'markdown',
  'rich_text_json',
  'plain_text',
  'html',
  'epub',
  'audio_transcript'
);

create type import_status as enum (
  'pending',
  'processing',
  'imported',
  'failed'
);

create type content_asset_type as enum (
  'cover',
  'ebook_package',
  'audio',
  'video',
  'worksheet_pdf',
  'image',
  'document',
  'transcript'
);

create type journey_child_type as enum (
  'module',
  'workshop',
  'ebook'
);

create type package_source_domain_type as enum (
  'spiritual_lesson',
  'emotion_entry'
);

create type user_role as enum (
  'guest',
  'member',
  'plan_owner',
  'coach',
  'admin'
);

create type subscription_status as enum (
  'inactive',
  'trial',
  'active',
  'canceled'
);

create type plan_type as enum (
  'individual',
  'family',
  'group'
);

create type addon_type as enum (
  'ai_package',
  'coaching_training',
  'extra_seat'
);

create type addon_status as enum (
  'inactive',
  'active',
  'canceled'
);

create type seat_status as enum (
  'available',
  'invited',
  'assigned',
  'inactive'
);

create type entitlement_type as enum (
  'subscription',
  'addon',
  'role',
  'seat',
  'content_bundle'
);

create type progress_status as enum (
  'locked',
  'available',
  'in_progress',
  'completed'
);

create type locator_type as enum (
  'page',
  'chapter',
  'section',
  'timestamp',
  'block'
);

create type comment_status as enum (
  'draft',
  'submitted',
  'locked',
  'expired'
);

create type favorite_source_type as enum (
  'content_item',
  'highlight',
  'note'
);

create type download_status as enum (
  'queued',
  'downloading',
  'completed',
  'failed',
  'evicted'
);

create type workbook_entry_status as enum (
  'draft',
  'saved',
  'submitted',
  'archived'
);

create type followup_window_type as enum (
  '72h',
  '3_weeks',
  '30_days'
);

create type followup_status as enum (
  'draft',
  'active',
  'completed',
  'archived'
);

create type reminder_type as enum (
  'daily',
  'journey',
  'workshop',
  'reading',
  'social',
  'workshop_followup'
);

create type notification_type as enum (
  'content',
  'reminder',
  'social',
  'coach_feedback',
  'billing',
  'system'
);

create type notification_preference_type as enum (
  'journey',
  'workshop',
  'reading',
  'social',
  'billing',
  'coach',
  'system'
);

create type notification_frequency as enum (
  'instant',
  'daily_digest',
  'weekly_digest'
);

create type coach_assignment_status as enum (
  'active',
  'paused',
  'completed'
);

create type risk_level as enum (
  'low',
  'medium',
  'high'
);

create type privacy_type as enum (
  'open',
  'private'
);

create type badge_category as enum (
  'journey',
  'workshop',
  'ebook',
  'module',
  'social',
  'general'
);

create type ai_message_role as enum (
  'system',
  'user',
  'assistant'
);

create type embedding_status as enum (
  'pending',
  'ready',
  'failed'
);

create type video_difficulty as enum (
  'beginner',
  'intermediate',
  'advanced'
);

-- ---------------------------------------------------------------------------
-- Content, source, publishing, and composition
-- ---------------------------------------------------------------------------

create table source_documents (
  id uuid primary key default gen_random_uuid(),
  source_type source_document_type not null default 'rich_text_json',
  domain_type content_item_kind not null,
  title text not null,
  original_uri text,
  payload_json jsonb,
  checksum text not null unique,
  language_code text not null,
  import_status import_status not null default 'pending',
  imported_at timestamptz not null default now(),
  imported_by text,
  metadata jsonb not null default '{}'::jsonb,
  check (char_length(language_code) between 2 and 16),
  check (original_uri is not null or payload_json is not null),
  check (source_type <> 'rich_text_json' or payload_json is not null)
);

create table content_items (
  id uuid primary key default gen_random_uuid(),
  kind content_item_kind not null,
  subtype text,
  slug text not null,
  title text not null,
  subtitle text,
  summary text,
  status content_status not null default 'draft',
  visibility content_visibility not null default 'subscription',
  locale text not null,
  current_version_id uuid,
  estimated_minutes integer,
  analytics_key text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (current_version_id),
  unique (slug, locale),
  check (estimated_minutes is null or estimated_minutes >= 0),
  check (char_length(locale) between 2 and 16)
);

create table content_versions (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  source_document_id uuid references source_documents(id) on delete set null,
  version_no integer not null,
  structured_payload_ref text,
  metadata jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  published_by text,
  change_summary text,
  created_at timestamptz not null default now(),
  unique (content_item_id, version_no),
  check (version_no > 0)
);

alter table content_items
  add constraint fk_content_items_current_version
  foreign key (current_version_id)
  references content_versions(id)
  on delete set null
  deferrable initially deferred;

create table content_assets (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  content_version_id uuid references content_versions(id) on delete cascade,
  asset_type content_asset_type not null,
  storage_uri text not null,
  mime_type text not null,
  byte_size bigint,
  checksum text,
  download_policy text,
  created_at timestamptz not null default now(),
  check (byte_size is null or byte_size >= 0)
);

create table content_relations (
  id uuid primary key default gen_random_uuid(),
  from_content_item_id uuid not null references content_items(id) on delete cascade,
  to_content_item_id uuid not null references content_items(id) on delete cascade,
  relation_type text not null,
  sort_order integer,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (from_content_item_id, relation_type, to_content_item_id)
);

create table content_tags (
  id uuid primary key default gen_random_uuid(),
  tag_type text not null,
  label text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table content_item_tags (
  content_item_id uuid not null references content_items(id) on delete cascade,
  content_tag_id uuid not null references content_tags(id) on delete cascade,
  primary key (content_item_id, content_tag_id)
);

create table journeys (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  duration_days integer,
  level text,
  created_at timestamptz not null default now(),
  check (duration_days is null or duration_days > 0)
);

create table journey_items (
  id uuid primary key default gen_random_uuid(),
  journey_content_item_id uuid not null references journeys(content_item_id) on delete cascade,
  child_content_item_id uuid not null references content_items(id) on delete restrict,
  child_type journey_child_type not null,
  order_index integer not null,
  is_required boolean not null default true,
  created_at timestamptz not null default now(),
  unique (journey_content_item_id, order_index),
  unique (journey_content_item_id, child_content_item_id),
  check (order_index > 0)
);

create table modules (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  description text,
  created_at timestamptz not null default now()
);

create table packages (
  id uuid primary key default gen_random_uuid(),
  module_content_item_id uuid not null references modules(content_item_id) on delete cascade,
  source_content_item_id uuid not null references content_items(id) on delete restrict,
  source_domain_type package_source_domain_type not null,
  title text not null,
  order_index integer not null,
  created_at timestamptz not null default now(),
  unique (module_content_item_id, order_index),
  unique (module_content_item_id, source_content_item_id),
  check (order_index > 0)
);

create table ebooks (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  author_name text,
  category text,
  total_pages integer not null,
  has_audio boolean not null default false,
  download_package_asset_id uuid references content_assets(id) on delete set null,
  created_at timestamptz not null default now(),
  check (total_pages > 0)
);

create table ebook_chapters (
  id uuid primary key default gen_random_uuid(),
  ebook_content_item_id uuid not null references ebooks(content_item_id) on delete cascade,
  parent_chapter_id uuid references ebook_chapters(id) on delete cascade,
  title text not null,
  order_index integer not null,
  start_locator text,
  end_locator text,
  created_at timestamptz not null default now(),
  unique (ebook_content_item_id, order_index),
  check (order_index > 0)
);

create table ebook_page_maps (
  id uuid primary key default gen_random_uuid(),
  ebook_content_item_id uuid not null references ebooks(content_item_id) on delete cascade,
  page_number integer not null,
  locator text not null,
  chapter_id uuid references ebook_chapters(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (ebook_content_item_id, page_number),
  check (page_number > 0)
);

create table spiritual_lesson_collections (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  lesson_count integer,
  audience text,
  difficulty text,
  created_at timestamptz not null default now(),
  check (lesson_count is null or lesson_count >= 0)
);

create table spiritual_lessons (
  id uuid primary key default gen_random_uuid(),
  collection_content_item_id uuid not null references spiritual_lesson_collections(content_item_id) on delete cascade,
  content_item_id uuid not null unique references content_items(id) on delete cascade,
  lesson_no integer,
  estimated_minutes integer,
  has_audio boolean not null default false,
  reflection_prompt_set_id uuid,
  created_at timestamptz not null default now(),
  check (lesson_no is null or lesson_no > 0),
  check (estimated_minutes is null or estimated_minutes >= 0)
);

create table lesson_sections (
  id uuid primary key default gen_random_uuid(),
  spiritual_lesson_id uuid not null references spiritual_lessons(id) on delete cascade,
  section_type text not null,
  title text,
  body_rich_text text,
  order_index integer not null,
  created_at timestamptz not null default now(),
  unique (spiritual_lesson_id, order_index),
  check (order_index > 0)
);

create table emotion_libraries (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  emotion_count integer,
  created_at timestamptz not null default now(),
  check (emotion_count is null or emotion_count >= 0)
);

create table emotion_entries (
  id uuid primary key default gen_random_uuid(),
  library_content_item_id uuid not null references emotion_libraries(content_item_id) on delete cascade,
  content_item_id uuid not null unique references content_items(id) on delete cascade,
  emotion_name text not null,
  emotion_group text,
  intensity_level text,
  primary_color_token text,
  created_at timestamptz not null default now()
);

create table emotion_sections (
  id uuid primary key default gen_random_uuid(),
  emotion_entry_id uuid not null references emotion_entries(id) on delete cascade,
  section_type text not null,
  body_rich_text text,
  order_index integer not null,
  created_at timestamptz not null default now(),
  unique (emotion_entry_id, order_index),
  check (order_index > 0)
);

create table workshops (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  theme text not null,
  target_audience text,
  total_duration_minutes integer,
  delivery_mode text,
  facilitator_guide_asset_id uuid references content_assets(id) on delete set null,
  participant_workbook_asset_id uuid references content_assets(id) on delete set null,
  created_at timestamptz not null default now(),
  check (total_duration_minutes is null or total_duration_minutes >= 0)
);

create table workshop_stages (
  id uuid primary key default gen_random_uuid(),
  workshop_content_item_id uuid not null references workshops(content_item_id) on delete cascade,
  stage_number integer not null,
  stage_type text not null,
  title text not null,
  unlock_rule text,
  summary_text text,
  expected_output_count integer,
  created_at timestamptz not null default now(),
  unique (workshop_content_item_id, stage_number),
  check (stage_number > 0),
  check (expected_output_count is null or expected_output_count >= 0)
);

create table workshop_sessions (
  id uuid primary key default gen_random_uuid(),
  workshop_stage_id uuid not null references workshop_stages(id) on delete cascade,
  day_index integer,
  slot text,
  duration_minutes integer,
  session_goal text,
  schedule_template text,
  created_at timestamptz not null default now(),
  check (day_index is null or day_index > 0),
  check (duration_minutes is null or duration_minutes >= 0)
);

create table workshop_content_blocks (
  id uuid primary key default gen_random_uuid(),
  workshop_stage_id uuid not null references workshop_stages(id) on delete cascade,
  block_type text not null,
  title text,
  body_rich_text text,
  quote_source text,
  callout_style text,
  citation_ref text,
  order_index integer not null,
  created_at timestamptz not null default now(),
  unique (workshop_stage_id, order_index),
  check (order_index > 0)
);

create table workshop_artifacts (
  id uuid primary key default gen_random_uuid(),
  workshop_content_item_id uuid not null references workshops(content_item_id) on delete cascade,
  artifact_type text not null,
  version integer not null default 1,
  title text,
  storage_uri text,
  artifact_schema jsonb not null default '{}'::jsonb,
  role_scope text,
  created_at timestamptz not null default now(),
  check (version > 0)
);

create table hadith_analyses (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  hadith_no text,
  headline text not null,
  canonical_quote text,
  source_reference text,
  recorded_at timestamptz,
  duration_seconds integer,
  speaker text,
  created_at timestamptz not null default now(),
  check (duration_seconds is null or duration_seconds >= 0)
);

create table hadith_analysis_sections (
  id uuid primary key default gen_random_uuid(),
  hadith_analysis_content_item_id uuid not null references hadith_analyses(content_item_id) on delete cascade,
  section_type text not null,
  title text,
  body_rich_text text,
  order_index integer not null,
  created_at timestamptz not null default now(),
  unique (hadith_analysis_content_item_id, order_index),
  check (order_index > 0)
);

create table hadith_source_citations (
  id uuid primary key default gen_random_uuid(),
  hadith_analysis_content_item_id uuid not null references hadith_analyses(content_item_id) on delete cascade,
  source_name text not null,
  book_ref text,
  chapter_ref text,
  hadith_ref text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Users, subscriptions, entitlements, and preferences
-- ---------------------------------------------------------------------------

create table users (
  id uuid primary key default gen_random_uuid(),
  role user_role not null default 'member',
  language_code text not null default 'tr',
  subscription_status subscription_status not null default 'inactive',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(language_code) between 2 and 16)
);

create table user_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  expires_at timestamptz not null,
  last_active_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table demographic_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  age integer not null,
  gender text,
  country_code text not null,
  updated_at timestamptz not null default now(),
  check (age between 13 and 120),
  check (char_length(country_code) between 2 and 3)
);

create table accessibility_settings (
  user_id uuid primary key references users(id) on delete cascade,
  text_scale numeric(4,2) not null default 1.00,
  high_contrast boolean not null default false,
  reduce_motion boolean not null default false,
  theme text not null default 'system',
  updated_at timestamptz not null default now(),
  check (text_scale > 0)
);

create table subscription_plans (
  id uuid primary key default gen_random_uuid(),
  plan_type plan_type not null,
  seat_limit integer not null,
  student_discount_eligible boolean not null default false,
  created_at timestamptz not null default now(),
  unique (plan_type),
  check (seat_limit > 0)
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references users(id) on delete cascade,
  plan_id uuid not null references subscription_plans(id) on delete restrict,
  status subscription_status not null,
  renewal_at timestamptz,
  period_end_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table subscription_addons (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references subscriptions(id) on delete cascade,
  addon_type addon_type not null,
  status addon_status not null default 'inactive',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (subscription_id, addon_type)
);

create table seats (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references subscriptions(id) on delete cascade,
  assigned_user_id uuid references users(id) on delete set null,
  status seat_status not null default 'available',
  created_at timestamptz not null default now(),
  unique (subscription_id, assigned_user_id)
);

create table entitlement_grants (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  entitlement_type entitlement_type not null,
  target_scope text not null,
  source_subscription_id uuid references subscriptions(id) on delete set null,
  source_addon_id uuid references subscription_addons(id) on delete set null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table purchase_receipts (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references subscriptions(id) on delete cascade,
  store_type text not null,
  external_receipt_id text not null unique,
  verification_status text not null,
  payload jsonb not null default '{}'::jsonb,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table reading_settings (
  user_id uuid primary key references users(id) on delete cascade,
  font_scale numeric(4,2) not null default 1.00,
  background_mode text not null default 'system',
  line_spacing numeric(4,2) not null default 1.50,
  updated_at timestamptz not null default now(),
  check (font_scale > 0),
  check (line_spacing > 0)
);

create table reminder_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  daily_enabled boolean not null default true,
  workshop_followup_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table reminder_schedules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  reminder_type reminder_type not null,
  scheduled_local_time time not null,
  enabled boolean not null default true,
  created_at timestamptz not null default now(),
  unique (user_id, reminder_type, scheduled_local_time)
);

create table notification_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  preference_type notification_preference_type not null,
  enabled boolean not null default true,
  frequency notification_frequency not null default 'instant',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, preference_type)
);

create table quiet_hours (
  user_id uuid primary key references users(id) on delete cascade,
  start_time time not null,
  end_time time not null,
  updated_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  notification_type notification_type not null,
  title text not null,
  body text,
  deep_link text,
  is_read boolean not null default false,
  sent_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Reading, progress, favorites, workbook, and follow-up
-- ---------------------------------------------------------------------------

create table content_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  content_item_id uuid not null references content_items(id) on delete cascade,
  target_type content_item_kind not null,
  status progress_status not null default 'available',
  progress_percent numeric(5,2) not null default 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, content_item_id),
  check (progress_percent between 0 and 100)
);

create table reading_positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  content_item_id uuid not null references content_items(id) on delete cascade,
  locator_type locator_type not null,
  locator_value text not null,
  progress_percent numeric(5,2) not null default 0,
  last_read_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, content_item_id),
  check (progress_percent between 0 and 100)
);

create table highlights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  content_item_id uuid not null references content_items(id) on delete cascade,
  content_version_id uuid references content_versions(id) on delete set null,
  anchor_locator text not null,
  selected_text_hash text,
  color text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  content_item_id uuid not null references content_items(id) on delete cascade,
  content_version_id uuid references content_versions(id) on delete set null,
  anchor_locator text,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table comment_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  target_type content_item_kind not null,
  target_content_item_id uuid not null references content_items(id) on delete cascade,
  content text not null,
  status comment_status not null default 'draft',
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table favorite_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  source_type favorite_source_type not null,
  source_ref_id uuid not null,
  note text,
  created_at timestamptz not null default now(),
  unique (user_id, source_type, source_ref_id)
);

create table collections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (user_id, name)
);

create table collection_items (
  collection_id uuid not null references collections(id) on delete cascade,
  favorite_item_id uuid not null references favorite_items(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (collection_id, favorite_item_id)
);

create table downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  content_item_id uuid not null references content_items(id) on delete cascade,
  asset_id uuid not null references content_assets(id) on delete restrict,
  download_status download_status not null default 'queued',
  local_path text,
  byte_size bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, content_item_id, asset_id),
  check (byte_size is null or byte_size >= 0)
);

create table workbook_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  workshop_content_item_id uuid not null references workshops(content_item_id) on delete cascade,
  workshop_stage_id uuid references workshop_stages(id) on delete set null,
  workshop_session_id uuid references workshop_sessions(id) on delete set null,
  status workbook_entry_status not null default 'draft',
  version_no integer not null default 1,
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (version_no > 0)
);

create table workshop_followup_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  workshop_content_item_id uuid not null references workshops(content_item_id) on delete cascade,
  window_type followup_window_type not null,
  intent_text text,
  daily_phrase text,
  small_step text,
  status followup_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, workshop_content_item_id, window_type)
);

-- ---------------------------------------------------------------------------
-- Coach workflows
-- ---------------------------------------------------------------------------

create table coach_assignments (
  id uuid primary key default gen_random_uuid(),
  coach_user_id uuid not null references users(id) on delete cascade,
  client_user_id uuid not null references users(id) on delete cascade,
  status coach_assignment_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (coach_user_id, client_user_id),
  check (coach_user_id <> client_user_id)
);

create table coach_feedback (
  id uuid primary key default gen_random_uuid(),
  coach_user_id uuid not null references users(id) on delete cascade,
  client_user_id uuid not null references users(id) on delete cascade,
  target_content_item_id uuid references content_items(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now(),
  check (coach_user_id <> client_user_id)
);

create table risk_signals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  risk_level risk_level not null,
  source_type text not null,
  detected_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

-- ---------------------------------------------------------------------------
-- Social: reading groups and book clubs
-- ---------------------------------------------------------------------------

create table reading_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  privacy privacy_type not null default 'private',
  active_material_content_item_id uuid references content_items(id) on delete set null,
  created_at timestamptz not null default now()
);

create table reading_group_members (
  id uuid primary key default gen_random_uuid(),
  reading_group_id uuid not null references reading_groups(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  unique (reading_group_id, user_id)
);

create table reading_group_materials (
  id uuid primary key default gen_random_uuid(),
  reading_group_id uuid not null references reading_groups(id) on delete cascade,
  content_item_id uuid not null references content_items(id) on delete cascade,
  material_type text not null,
  status text not null,
  created_at timestamptz not null default now(),
  unique (reading_group_id, content_item_id)
);

create table reading_group_messages (
  id uuid primary key default gen_random_uuid(),
  reading_group_id uuid not null references reading_groups(id) on delete cascade,
  author_user_id uuid not null references users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table reading_group_schedules (
  id uuid primary key default gen_random_uuid(),
  reading_group_id uuid not null references reading_groups(id) on delete cascade,
  starts_at timestamptz not null,
  cadence text,
  created_at timestamptz not null default now()
);

create table book_clubs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  privacy privacy_type not null default 'private',
  ebook_content_item_id uuid references content_items(id) on delete set null,
  created_at timestamptz not null default now()
);

create table book_club_members (
  id uuid primary key default gen_random_uuid(),
  book_club_id uuid not null references book_clubs(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  unique (book_club_id, user_id)
);

create table book_club_topics (
  id uuid primary key default gen_random_uuid(),
  book_club_id uuid not null references book_clubs(id) on delete cascade,
  title text not null,
  status text not null,
  created_at timestamptz not null default now()
);

create table book_club_messages (
  id uuid primary key default gen_random_uuid(),
  book_club_id uuid not null references book_clubs(id) on delete cascade,
  author_user_id uuid not null references users(id) on delete cascade,
  topic_id uuid references book_club_topics(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create table book_club_events (
  id uuid primary key default gen_random_uuid(),
  book_club_id uuid not null references book_clubs(id) on delete cascade,
  starts_at timestamptz not null,
  event_type text not null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Gamification
-- ---------------------------------------------------------------------------

create table badge_definitions (
  id uuid primary key default gen_random_uuid(),
  category badge_category not null,
  name text not null,
  xp_reward integer not null default 0,
  created_at timestamptz not null default now(),
  unique (category, name),
  check (xp_reward >= 0)
);

create table user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  badge_definition_id uuid not null references badge_definitions(id) on delete cascade,
  awarded_at timestamptz not null default now(),
  unique (user_id, badge_definition_id)
);

create table xp_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  delta_xp integer not null,
  reason_code text not null,
  created_at timestamptz not null default now()
);

create table level_definitions (
  id uuid primary key default gen_random_uuid(),
  level_no integer not null unique,
  required_xp integer not null,
  label text not null,
  created_at timestamptz not null default now(),
  check (level_no > 0),
  check (required_xp >= 0)
);

create table user_levels (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  level_definition_id uuid not null references level_definitions(id) on delete restrict,
  reached_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- AI and RAG traceability
-- ---------------------------------------------------------------------------

create table ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text,
  created_at timestamptz not null default now()
);

create table ai_messages (
  id uuid primary key default gen_random_uuid(),
  ai_conversation_id uuid not null references ai_conversations(id) on delete cascade,
  role ai_message_role not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table embedding_documents (
  id uuid primary key default gen_random_uuid(),
  content_item_id uuid not null references content_items(id) on delete cascade,
  content_version_id uuid not null unique references content_versions(id) on delete cascade,
  status embedding_status not null default 'pending',
  vector_backend text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table embedding_chunks (
  id uuid primary key default gen_random_uuid(),
  embedding_document_id uuid not null references embedding_documents(id) on delete cascade,
  source_table text not null,
  source_row_id uuid,
  chunk_order integer not null,
  locator_ref text,
  chunk_hash text not null,
  chunk_text text,
  created_at timestamptz not null default now(),
  unique (embedding_document_id, chunk_order),
  check (chunk_order >= 0)
);

create table retrieval_traces (
  id uuid primary key default gen_random_uuid(),
  ai_message_id uuid not null references ai_messages(id) on delete cascade,
  embedding_chunk_id uuid references embedding_chunks(id) on delete set null,
  retrieval_strategy text not null,
  rank_order integer,
  score numeric(8,4),
  created_at timestamptz not null default now(),
  check (rank_order is null or rank_order >= 1)
);

create table ai_response_citations (
  id uuid primary key default gen_random_uuid(),
  ai_message_id uuid not null references ai_messages(id) on delete cascade,
  embedding_chunk_id uuid not null references embedding_chunks(id) on delete cascade,
  relevance_score numeric(8,4),
  locator_ref text,
  quoted_excerpt text,
  created_at timestamptz not null default now(),
  unique (ai_message_id, embedding_chunk_id)
);

-- ---------------------------------------------------------------------------
-- Video
-- ---------------------------------------------------------------------------

create table videos (
  content_item_id uuid primary key references content_items(id) on delete cascade,
  duration_seconds integer,
  difficulty video_difficulty,
  stream_uri text,
  created_at timestamptz not null default now(),
  check (duration_seconds is null or duration_seconds >= 0)
);

create table video_caption_tracks (
  id uuid primary key default gen_random_uuid(),
  video_content_item_id uuid not null references videos(content_item_id) on delete cascade,
  language_code text not null,
  file_uri text not null,
  created_at timestamptz not null default now(),
  unique (video_content_item_id, language_code),
  check (char_length(language_code) between 2 and 16)
);

create table video_transcript_segments (
  id uuid primary key default gen_random_uuid(),
  video_content_item_id uuid not null references videos(content_item_id) on delete cascade,
  start_second integer not null,
  end_second integer not null,
  transcript_text text not null,
  created_at timestamptz not null default now(),
  check (start_second >= 0),
  check (end_second >= start_second)
);

create table video_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  video_content_item_id uuid not null references videos(content_item_id) on delete cascade,
  last_position_seconds integer not null default 0,
  progress_percent numeric(5,2) not null default 0,
  updated_at timestamptz not null default now(),
  unique (user_id, video_content_item_id),
  check (last_position_seconds >= 0),
  check (progress_percent between 0 and 100)
);

create table video_downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  video_content_item_id uuid not null references videos(content_item_id) on delete cascade,
  local_path text,
  download_status download_status not null default 'queued',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, video_content_item_id)
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index idx_content_items_kind_status on content_items (kind, status);
create index idx_content_items_visibility on content_items (visibility);
create index idx_content_versions_content_item on content_versions (content_item_id, version_no desc);
create index idx_content_assets_content_item on content_assets (content_item_id, asset_type);
create index idx_content_relations_from on content_relations (from_content_item_id, relation_type, sort_order);
create index idx_content_relations_to on content_relations (to_content_item_id, relation_type);
create index idx_journey_items_journey_order on journey_items (journey_content_item_id, order_index);
create index idx_packages_module_order on packages (module_content_item_id, order_index);
create index idx_ebook_chapters_ebook_order on ebook_chapters (ebook_content_item_id, order_index);
create index idx_spiritual_lessons_collection on spiritual_lessons (collection_content_item_id, lesson_no);
create index idx_emotion_entries_library on emotion_entries (library_content_item_id, emotion_name);
create index idx_workshop_stages_workshop on workshop_stages (workshop_content_item_id, stage_number);
create index idx_workshop_sessions_stage on workshop_sessions (workshop_stage_id, day_index, slot);
create index idx_hadith_sections_content_item on hadith_analysis_sections (hadith_analysis_content_item_id, order_index);

create index idx_user_sessions_user on user_sessions (user_id, expires_at);
create index idx_subscriptions_owner on subscriptions (owner_user_id, status);
create index idx_entitlement_grants_user on entitlement_grants (user_id, entitlement_type, ends_at);
create index idx_notifications_user_sent on notifications (user_id, sent_at desc);

create index idx_content_progress_user on content_progress (user_id, status, updated_at desc);
create index idx_reading_positions_user on reading_positions (user_id, last_read_at desc);
create index idx_highlights_user_content on highlights (user_id, content_item_id);
create index idx_notes_user_content on notes (user_id, content_item_id);
create index idx_comment_submissions_user on comment_submissions (user_id, status, submitted_at desc);
create index idx_downloads_user_status on downloads (user_id, download_status, updated_at desc);
create index idx_workbook_entries_user_workshop on workbook_entries (user_id, workshop_content_item_id, updated_at desc);
create index idx_followup_plans_user on workshop_followup_plans (user_id, status);

create index idx_coach_assignments_client on coach_assignments (client_user_id, status);
create index idx_risk_signals_user on risk_signals (user_id, detected_at desc);

create index idx_reading_group_members_user on reading_group_members (user_id);
create index idx_reading_group_messages_group on reading_group_messages (reading_group_id, created_at desc);
create index idx_book_club_members_user on book_club_members (user_id);
create index idx_book_club_messages_club on book_club_messages (book_club_id, created_at desc);

create index idx_user_badges_user on user_badges (user_id, awarded_at desc);
create index idx_xp_ledger_user on xp_ledger (user_id, created_at desc);

create index idx_ai_conversations_user on ai_conversations (user_id, created_at desc);
create index idx_ai_messages_conversation on ai_messages (ai_conversation_id, created_at);
create index idx_embedding_documents_content_item on embedding_documents (content_item_id, status);
create index idx_embedding_chunks_document on embedding_chunks (embedding_document_id, chunk_order);
create index idx_retrieval_traces_message on retrieval_traces (ai_message_id, rank_order);
create index idx_ai_response_citations_message on ai_response_citations (ai_message_id, relevance_score desc);

create index idx_video_progress_user on video_progress (user_id, updated_at desc);
create index idx_video_transcript_segments_video on video_transcript_segments (video_content_item_id, start_second);

commit;
