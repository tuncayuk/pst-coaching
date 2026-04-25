-- =============================================================================
-- PST Coaching — PostgreSQL Schema
-- Version: 4.0.0
-- Generated: 2026-04-20
-- =============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- ENUM TYPES
-- =============================================================================

CREATE TYPE user_role AS ENUM ('guest', 'member', 'plan_owner', 'coach');
CREATE TYPE language_code AS ENUM ('tr', 'en', 'es');
CREATE TYPE auth_provider AS ENUM ('password', 'oauth_google', 'oauth_apple');
CREATE TYPE gender_option AS ENUM ('female', 'male', 'prefer_not_to_say');
CREATE TYPE theme_mode AS ENUM ('light', 'dark', 'system');
CREATE TYPE background_mode AS ENUM ('white', 'sepia', 'dark');

CREATE TYPE plan_type AS ENUM ('individual', 'family', 'group');
CREATE TYPE subscription_status AS ENUM ('inactive', 'trial', 'active', 'canceled');
CREATE TYPE addon_code AS ENUM (
    'coaching_school',
    'ebook_unlimited',
    'ai_pack',
    'coach_training',
    'seat_plus_5',
    'seat_plus_10'
);
CREATE TYPE addon_status AS ENUM ('active', 'inactive');
CREATE TYPE seat_status AS ENUM ('open', 'available', 'invited', 'assigned', 'active', 'removed');
CREATE TYPE store_type AS ENUM ('apple', 'google', 'stripe');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'failed');
CREATE TYPE receipt_status AS ENUM ('verified', 'expired', 'refunded');

CREATE TYPE content_entity_type AS ENUM ('journey', 'module', 'package', 'workshop', 'ebook');
CREATE TYPE content_source_type AS ENUM (
    'journey-of-discoveries', 'universe-of-emotions', 'books', 'workshops'
);
CREATE TYPE journey_level AS ENUM ('baslangic', 'beginner', 'basico', 'orta', 'ileri');
CREATE TYPE delivery_mode AS ENUM ('kamp', 'rehber', 'calisma_kitabi');
CREATE TYPE workshop_stage_type AS ENUM (
    'insight', 'analysis', 'camp', 'facilitator_guide', 'workbook', 'closure'
);
CREATE TYPE session_slot AS ENUM ('morning', 'midday', 'evening');
CREATE TYPE workshop_block_type AS ENUM (
    'intro', 'verse_reference', 'explanation', 'bridge', 'exercise', 'output', 'reading', 'question'
);
CREATE TYPE workshop_artifact_type AS ENUM (
    'worksheet', 'guide', 'output_card', 'plan_template', 'reflection_map'
);
CREATE TYPE worksheet_type AS ENUM (
    'load_map', 'inner_sentence_shift', 'dua_card', 'trust_balance', 'transformation_plan'
);
CREATE TYPE workbook_entry_status AS ENUM ('draft', 'saved', 'submitted', 'archived');
CREATE TYPE followup_window_type AS ENUM ('h72', 'w3', 'd30');
CREATE TYPE followup_status AS ENUM ('planned', 'active', 'completed', 'missed');

CREATE TYPE asset_type AS ENUM ('ebook_package', 'worksheet_pdf', 'audio', 'video', 'image');
CREATE TYPE download_policy AS ENUM ('downloadable', 'streaming', 'premium');
CREATE TYPE download_status AS ENUM ('pending', 'in_progress', 'completed', 'failed', 'paused');

CREATE TYPE progress_target_type AS ENUM (
    'journey', 'module', 'package', 'workshop', 'workshop_stage', 'workshop_session', 'ebook'
);
CREATE TYPE progress_status AS ENUM ('locked', 'available', 'in_progress', 'completed');

CREATE TYPE comment_target_type AS ENUM (
    'journey_day', 'module_package', 'workshop_stage', 'workshop_session', 'ebook_chapter'
);
CREATE TYPE comment_status AS ENUM ('draft', 'submitted', 'locked', 'expired');

CREATE TYPE highlight_color AS ENUM ('yellow', 'green', 'blue', 'pink');
CREATE TYPE locator_type AS ENUM ('page', 'cfi');

CREATE TYPE favorite_source_type AS ENUM (
    'content_item', 'highlight', 'note', 'journey', 'workshop', 'module', 'ebook'
);

CREATE TYPE badge_category AS ENUM (
    'journey', 'module', 'workshop', 'ebook', 'coach', 'streak', 'social'
);
CREATE TYPE coach_assignment_status AS ENUM ('pending', 'active', 'inactive');

CREATE TYPE notification_channel AS ENUM ('push', 'email', 'in_app');
CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed', 'read');

-- =============================================================================
-- SCHEMA HELPER — audit columns macro (applied inline per table)
-- created_by / updated_by are nullable because system operations and seeds
-- don't always have a user context.
-- =============================================================================


-- =============================================================================
-- SECTION 1 — USERS & IDENTITY
-- =============================================================================

CREATE TABLE users (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    email               TEXT        NOT NULL UNIQUE,
    external_auth_id    TEXT,
    auth_provider       auth_provider NOT NULL DEFAULT 'password',
    role                user_role   NOT NULL DEFAULT 'member',
    language_code       language_code NOT NULL DEFAULT 'tr',
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_role  ON users (role);


CREATE TABLE user_sessions (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    expires_at      TIMESTAMPTZ NOT NULL,
    last_active_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_sessions_user_id    ON user_sessions (user_id);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions (expires_at);


CREATE TABLE demographic_profiles (
    user_id      UUID         PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    age          SMALLINT     NOT NULL CHECK (age >= 0 AND age <= 130),
    gender       gender_option,
    country_code CHAR(2)      NOT NULL,
    created_by   UUID,
    updated_by   UUID,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);


CREATE TABLE accessibility_settings (
    user_id       UUID        PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    text_scale    NUMERIC(4,2) NOT NULL DEFAULT 1.0 CHECK (text_scale > 0),
    high_contrast BOOLEAN     NOT NULL DEFAULT false,
    reduce_motion BOOLEAN     NOT NULL DEFAULT false,
    theme         theme_mode  NOT NULL DEFAULT 'system',
    created_by    UUID,
    updated_by    UUID,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE reading_settings (
    user_id         UUID           PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    font_scale      NUMERIC(4,2)   NOT NULL DEFAULT 1.0 CHECK (font_scale > 0),
    line_spacing    NUMERIC(4,2)   NOT NULL DEFAULT 1.5 CHECK (line_spacing > 0),
    background_mode background_mode NOT NULL DEFAULT 'white',
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ    NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ    NOT NULL DEFAULT now()
);


CREATE TABLE reminder_settings (
    id                          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                     UUID        NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    daily_enabled               BOOLEAN     NOT NULL DEFAULT false,
    daily_time_local            TIME,
    workshop_followup_enabled   BOOLEAN     NOT NULL DEFAULT false,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reminder_settings_user_id ON reminder_settings (user_id);


-- =============================================================================
-- SECTION 2 — SUBSCRIPTIONS & BILLING
-- =============================================================================

CREATE TABLE subscription_plans (
    id                          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_type                   plan_type   NOT NULL,
    name                        TEXT        NOT NULL,
    seat_limit                  SMALLINT    NOT NULL DEFAULT 1 CHECK (seat_limit >= 1),
    student_discount_eligible   BOOLEAN     NOT NULL DEFAULT false,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE subscriptions (
    id              UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_user_id   UUID                NOT NULL REFERENCES users (id),
    plan_id         UUID                NOT NULL REFERENCES subscription_plans (id),
    status          subscription_status NOT NULL DEFAULT 'inactive',
    renewal_at      TIMESTAMPTZ,
    period_end_at   TIMESTAMPTZ,
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT now()
);

CREATE INDEX idx_subscriptions_owner_user_id ON subscriptions (owner_user_id);
CREATE INDEX idx_subscriptions_status        ON subscriptions (status);


CREATE TABLE subscription_addons (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id UUID         NOT NULL REFERENCES subscriptions (id) ON DELETE CASCADE,
    addon_type      addon_code   NOT NULL,
    status          addon_status NOT NULL DEFAULT 'active',
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    UNIQUE (subscription_id, addon_type)
);

CREATE INDEX idx_subscription_addons_subscription_id ON subscription_addons (subscription_id);


CREATE TABLE seats (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id  UUID        NOT NULL REFERENCES subscriptions (id) ON DELETE CASCADE,
    assigned_user_id UUID        REFERENCES users (id) ON DELETE SET NULL,
    status           seat_status NOT NULL DEFAULT 'open',
    created_by       UUID,
    updated_by       UUID,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_seats_subscription_id  ON seats (subscription_id);
CREATE INDEX idx_seats_assigned_user_id ON seats (assigned_user_id);


CREATE TABLE purchase_receipts (
    id                  UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id     UUID                 NOT NULL REFERENCES subscriptions (id),
    store_type          store_type           NOT NULL,
    external_receipt_id TEXT                 NOT NULL,
    verification_status verification_status  NOT NULL DEFAULT 'pending',
    status              receipt_status       NOT NULL DEFAULT 'verified',
    payload             JSONB                NOT NULL DEFAULT '{}',
    amount              NUMERIC(12,2)        NOT NULL,
    currency            CHAR(3)              NOT NULL DEFAULT 'TRY',
    purchased_at        TIMESTAMPTZ          NOT NULL,
    verified_at         TIMESTAMPTZ,
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ          NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ          NOT NULL DEFAULT now(),
    UNIQUE (store_type, external_receipt_id)
);

CREATE INDEX idx_purchase_receipts_subscription_id ON purchase_receipts (subscription_id);
CREATE INDEX idx_purchase_receipts_store_ext        ON purchase_receipts (store_type, external_receipt_id);


-- =============================================================================
-- SECTION 3 — CONTENT INFRASTRUCTURE
-- =============================================================================

CREATE TABLE content_sources (
    id              UUID        PRIMARY KEY,
    title           TEXT        NOT NULL,
    subtitle        TEXT,
    description     TEXT        NOT NULL DEFAULT '',
    icon            TEXT,
    accent_color    TEXT,
    content_source_type content_source_type NOT NULL,
    catalog_screen  TEXT,
    order_index     SMALLINT    NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE content_items (
    id              UUID                NOT NULL DEFAULT gen_random_uuid(),
    entity_type     content_entity_type NOT NULL,
    source_id       UUID                REFERENCES content_sources (id) ON DELETE SET NULL,
    language_code   language_code       NOT NULL DEFAULT 'tr',
    is_published    BOOLEAN             NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE INDEX idx_content_items_entity_type   ON content_items (entity_type);
CREATE INDEX idx_content_items_source_id     ON content_items (source_id);
CREATE INDEX idx_content_items_language_code ON content_items (language_code);
CREATE INDEX idx_content_items_published     ON content_items (is_published) WHERE is_published = true;


CREATE TABLE content_assets (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id     UUID            NOT NULL REFERENCES content_items (id) ON DELETE CASCADE,
    asset_type          asset_type      NOT NULL,
    storage_uri         TEXT            NOT NULL,
    mime_type           TEXT            NOT NULL,
    byte_size           BIGINT          NOT NULL DEFAULT 0,
    checksum            TEXT,
    download_policy     download_policy NOT NULL DEFAULT 'streaming',
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_assets_content_item_id ON content_assets (content_item_id);
CREATE INDEX idx_content_assets_asset_type      ON content_assets (asset_type);


-- =============================================================================
-- SECTION 4 — JOURNEYS
-- =============================================================================

CREATE TABLE journeys (
    content_item_id UUID          PRIMARY KEY REFERENCES content_items (id) ON DELETE CASCADE,
    title           TEXT          NOT NULL,
    description     TEXT,
    duration_days   SMALLINT      CHECK (duration_days > 0),
    level           journey_level NOT NULL DEFAULT 'baslangic',
    outline_steps   JSONB         NOT NULL DEFAULT '[]',
    benefits        JSONB         NOT NULL DEFAULT '[]',
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_journeys_level ON journeys (level);


CREATE TABLE journey_days (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_content_item_id UUID        NOT NULL REFERENCES journeys (content_item_id) ON DELETE CASCADE,
    day_number              SMALLINT    NOT NULL CHECK (day_number >= 1),
    title                   TEXT,
    unlock_time_local       TIME,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (journey_content_item_id, day_number)
);

CREATE INDEX idx_journey_days_journey ON journey_days (journey_content_item_id);


-- =============================================================================
-- SECTION 5 — MODULES & PACKAGES
-- =============================================================================

CREATE TABLE modules (
    content_item_id UUID        PRIMARY KEY REFERENCES content_items (id) ON DELETE CASCADE,
    title           TEXT        NOT NULL,
    description     TEXT,
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE packages (
    id                      TEXT        PRIMARY KEY,
    module_content_item_id  UUID        NOT NULL REFERENCES modules (content_item_id) ON DELETE CASCADE,
    title                   TEXT        NOT NULL,
    order_index             SMALLINT    NOT NULL DEFAULT 0,
    source_content_item_id  UUID        REFERENCES content_items (id) ON DELETE SET NULL,
    source_domain_type      TEXT,
    created_by              UUID,
    updated_by              UUID,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_packages_module_content_item_id ON packages (module_content_item_id);
CREATE INDEX idx_packages_order                  ON packages (module_content_item_id, order_index);


-- =============================================================================
-- SECTION 6 — WORKSHOPS
-- =============================================================================

CREATE TABLE workshop_groups (
    id                  TEXT        PRIMARY KEY,
    title               TEXT        NOT NULL,
    description         TEXT        NOT NULL DEFAULT '',
    order_index         SMALLINT    NOT NULL DEFAULT 0,
    target_audiences    JSONB       NOT NULL DEFAULT '[]',
    featured_workshop_ids JSONB     NOT NULL DEFAULT '[]',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE workshops (
    content_item_id             UUID          PRIMARY KEY REFERENCES content_items (id) ON DELETE CASCADE,
    title                       TEXT          NOT NULL,
    theme                       TEXT          NOT NULL,
    target_audience             TEXT          NOT NULL DEFAULT '18+',
    total_duration_minutes      INTEGER       CHECK (total_duration_minutes > 0),
    delivery_mode               delivery_mode NOT NULL,
    workshop_group_id           TEXT          REFERENCES workshop_groups (id) ON DELETE SET NULL,
    facilitator_guide_asset_id  UUID          REFERENCES content_assets (id) ON DELETE SET NULL,
    participant_workbook_asset_id UUID        REFERENCES content_assets (id) ON DELETE SET NULL,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_workshops_group_id      ON workshops (workshop_group_id);
CREATE INDEX idx_workshops_delivery_mode ON workshops (delivery_mode);


CREATE TABLE workshop_stages (
    id                          UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_content_item_id    UUID                 NOT NULL REFERENCES workshops (content_item_id) ON DELETE CASCADE,
    stage_number                SMALLINT             NOT NULL CHECK (stage_number >= 1),
    stage_type                  workshop_stage_type  NOT NULL,
    title                       TEXT                 NOT NULL,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ          NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ          NOT NULL DEFAULT now(),
    UNIQUE (workshop_content_item_id, stage_number)
);

CREATE INDEX idx_workshop_stages_workshop ON workshop_stages (workshop_content_item_id);


CREATE TABLE workshop_sessions (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_stage_id   UUID         NOT NULL REFERENCES workshop_stages (id) ON DELETE CASCADE,
    day_index           SMALLINT,
    slot                session_slot,
    duration_minutes    SMALLINT     CHECK (duration_minutes > 0),
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_workshop_sessions_stage ON workshop_sessions (workshop_stage_id);


CREATE TABLE workshop_content_blocks (
    id                  UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_stage_id   UUID                 NOT NULL REFERENCES workshop_stages (id) ON DELETE CASCADE,
    parent_type         content_entity_type  NOT NULL,
    parent_id           UUID                 NOT NULL,
    block_type          workshop_block_type  NOT NULL,
    content_type        TEXT,
    title               TEXT                 NOT NULL,
    body                TEXT,
    order_index         SMALLINT             NOT NULL DEFAULT 0,
    has_audio           BOOLEAN              NOT NULL DEFAULT false,
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ          NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ          NOT NULL DEFAULT now()
);

CREATE INDEX idx_workshop_content_blocks_stage       ON workshop_content_blocks (workshop_stage_id);
CREATE INDEX idx_workshop_content_blocks_parent      ON workshop_content_blocks (parent_type, parent_id);
CREATE INDEX idx_workshop_content_blocks_order       ON workshop_content_blocks (workshop_stage_id, order_index);

CREATE TABLE _content_blocks (
    id              TEXT        PRIMARY KEY,
    parent_type     TEXT        NOT NULL,
    parent_id       TEXT        NOT NULL,
    content_type    TEXT        NOT NULL,
    title           TEXT        NOT NULL,
    body            TEXT,
    order_index     SMALLINT    NOT NULL DEFAULT 0,
    has_audio       BOOLEAN     NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx__content_blocks_parent ON _content_blocks (parent_type, parent_id);
CREATE INDEX idx__content_blocks_order  ON _content_blocks (parent_type, parent_id, order_index);


CREATE TABLE workshop_artifacts (
    id                          UUID                    PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_content_item_id    UUID                    NOT NULL REFERENCES workshops (content_item_id) ON DELETE CASCADE,
    artifact_type               workshop_artifact_type  NOT NULL,
    version                     SMALLINT                NOT NULL DEFAULT 1,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ             NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ             NOT NULL DEFAULT now()
);

CREATE INDEX idx_workshop_artifacts_workshop ON workshop_artifacts (workshop_content_item_id);


CREATE TABLE workbook_entries (
    id                          UUID                   PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                     UUID                   NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    workshop_content_item_id    UUID                   NOT NULL REFERENCES workshops (content_item_id) ON DELETE CASCADE,
    stage_id                    UUID                   NOT NULL REFERENCES workshop_stages (id),
    session_id                  UUID                   REFERENCES workshop_sessions (id) ON DELETE SET NULL,
    worksheet_type              worksheet_type         NOT NULL,
    payload                     JSONB                  NOT NULL DEFAULT '{}',
    status                      workbook_entry_status  NOT NULL DEFAULT 'draft',
    version                     SMALLINT               NOT NULL DEFAULT 1,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ            NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ            NOT NULL DEFAULT now()
);

CREATE INDEX idx_workbook_entries_user_id     ON workbook_entries (user_id);
CREATE INDEX idx_workbook_entries_workshop    ON workbook_entries (workshop_content_item_id);
CREATE INDEX idx_workbook_entries_stage       ON workbook_entries (stage_id);


CREATE TABLE workshop_followup_plans (
    id                          UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                     UUID              NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    workshop_content_item_id    UUID              NOT NULL REFERENCES workshops (content_item_id) ON DELETE CASCADE,
    window_type                 followup_window_type NOT NULL,
    intent_text                 TEXT,
    daily_phrase                TEXT,
    small_step                  TEXT,
    status                      followup_status   NOT NULL DEFAULT 'planned',
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ       NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ       NOT NULL DEFAULT now(),
    UNIQUE (user_id, workshop_content_item_id, window_type)
);

CREATE INDEX idx_workshop_followup_user_id  ON workshop_followup_plans (user_id);
CREATE INDEX idx_workshop_followup_workshop ON workshop_followup_plans (workshop_content_item_id);


-- =============================================================================
-- SECTION 7 — EBOOKS
-- =============================================================================

CREATE TABLE ebooks (
    content_item_id             UUID        PRIMARY KEY REFERENCES content_items (id) ON DELETE CASCADE,
    title                       TEXT        NOT NULL,
    category                    TEXT        NOT NULL,
    total_pages                 INTEGER     NOT NULL DEFAULT 0,
    has_audio                   BOOLEAN     NOT NULL DEFAULT false,
    author_name                 TEXT,
    download_package_asset_id   UUID        REFERENCES content_assets (id) ON DELETE SET NULL,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ebooks_category ON ebooks (category);


CREATE TABLE ebook_chapters (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    ebook_content_item_id   UUID        NOT NULL REFERENCES ebooks (content_item_id) ON DELETE CASCADE,
    title                   TEXT        NOT NULL,
    order_index             SMALLINT    NOT NULL DEFAULT 0,
    parent_chapter_id       UUID        REFERENCES ebook_chapters (id) ON DELETE SET NULL,
    start_locator           TEXT,
    end_locator             TEXT,
    created_by              UUID,
    updated_by              UUID,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ebook_chapters_ebook         ON ebook_chapters (ebook_content_item_id);
CREATE INDEX idx_ebook_chapters_parent        ON ebook_chapters (parent_chapter_id);
CREATE INDEX idx_ebook_chapters_order         ON ebook_chapters (ebook_content_item_id, order_index);


-- =============================================================================
-- SECTION 8 — USER PROGRESS & ENGAGEMENT
-- =============================================================================

CREATE TABLE content_progress (
    id                  UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID                  NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    target_type         progress_target_type  NOT NULL,
    content_item_id     UUID                  NOT NULL REFERENCES content_items (id) ON DELETE CASCADE,
    status              progress_status       NOT NULL DEFAULT 'locked',
    progress_percent    SMALLINT              NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    started_at          TIMESTAMPTZ,
    completed_at        TIMESTAMPTZ,
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ           NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ           NOT NULL DEFAULT now(),
    UNIQUE (user_id, content_item_id, target_type)
);

CREATE INDEX idx_content_progress_user_id        ON content_progress (user_id);
CREATE INDEX idx_content_progress_content_item   ON content_progress (content_item_id);
CREATE INDEX idx_content_progress_status         ON content_progress (status);
CREATE INDEX idx_content_progress_user_status    ON content_progress (user_id, status);


CREATE TABLE comment_submissions (
    id                      UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID                 NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    target_content_item_id  UUID                 NOT NULL REFERENCES content_items (id) ON DELETE CASCADE,
    target_type             comment_target_type  NOT NULL,
    content                 TEXT                 NOT NULL,
    status                  comment_status       NOT NULL DEFAULT 'draft',
    submitted_at            TIMESTAMPTZ,
    parent_comment_id       UUID                 REFERENCES comment_submissions (id) ON DELETE SET NULL,
    deleted_at              TIMESTAMPTZ,
    created_by              UUID,
    updated_by              UUID,
    created_at              TIMESTAMPTZ          NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ          NOT NULL DEFAULT now()
);

CREATE INDEX idx_comment_submissions_user_id    ON comment_submissions (user_id);
CREATE INDEX idx_comment_submissions_target     ON comment_submissions (target_content_item_id, target_type);
CREATE INDEX idx_comment_submissions_parent     ON comment_submissions (parent_comment_id);
CREATE INDEX idx_comment_submissions_deleted    ON comment_submissions (deleted_at) WHERE deleted_at IS NULL;


CREATE TABLE highlights (
    id                  UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID             NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    content_item_id     UUID             NOT NULL REFERENCES content_items (id) ON DELETE CASCADE,
    color               highlight_color  NOT NULL DEFAULT 'yellow',
    anchor_locator      TEXT             NOT NULL,
    selected_text_hash  TEXT,
    deleted_at          TIMESTAMPTZ,
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ      NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ      NOT NULL DEFAULT now()
);

CREATE INDEX idx_highlights_user_id        ON highlights (user_id);
CREATE INDEX idx_highlights_content_item   ON highlights (content_item_id);
CREATE INDEX idx_highlights_user_content   ON highlights (user_id, content_item_id);
CREATE INDEX idx_highlights_active         ON highlights (user_id) WHERE deleted_at IS NULL;


CREATE TABLE notes (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    content_item_id     UUID        NOT NULL REFERENCES content_items (id) ON DELETE CASCADE,
    body                TEXT        NOT NULL,
    anchor_locator      TEXT,
    deleted_at          TIMESTAMPTZ,
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notes_user_id       ON notes (user_id);
CREATE INDEX idx_notes_content_item  ON notes (content_item_id);
CREATE INDEX idx_notes_active        ON notes (user_id) WHERE deleted_at IS NULL;


CREATE TABLE favorite_items (
    id                  UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID                 NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    source_type         favorite_source_type NOT NULL,
    content_item_ref_id UUID                 REFERENCES content_items (id) ON DELETE CASCADE,
    highlight_ref_id    UUID                 REFERENCES highlights (id) ON DELETE CASCADE,
    note_ref_id         UUID                 REFERENCES notes (id) ON DELETE CASCADE,
    note                TEXT,
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ          NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ          NOT NULL DEFAULT now(),
    CONSTRAINT chk_favorite_ref CHECK (
        num_nonnulls(content_item_ref_id, highlight_ref_id, note_ref_id) = 1
    )
);

CREATE INDEX idx_favorite_items_user_id      ON favorite_items (user_id);
CREATE INDEX idx_favorite_items_source_type  ON favorite_items (source_type);
CREATE INDEX idx_favorite_items_content_ref  ON favorite_items (content_item_ref_id) WHERE content_item_ref_id IS NOT NULL;


CREATE TABLE collections (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    name        TEXT        NOT NULL,
    created_by  UUID,
    updated_by  UUID,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_collections_user_id ON collections (user_id);


CREATE TABLE collection_items (
    collection_id    UUID        NOT NULL REFERENCES collections (id) ON DELETE CASCADE,
    favorite_item_id UUID        NOT NULL REFERENCES favorite_items (id) ON DELETE CASCADE,
    created_by       UUID,
    updated_by       UUID,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (collection_id, favorite_item_id)
);

CREATE INDEX idx_collection_items_favorite ON collection_items (favorite_item_id);


-- =============================================================================
-- SECTION 9 — READING & DOWNLOADS
-- =============================================================================

CREATE TABLE reading_positions (
    id               UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    content_item_id  UUID          NOT NULL REFERENCES ebooks (content_item_id) ON DELETE CASCADE,
    progress_percent SMALLINT      NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    locator_type     locator_type  NOT NULL DEFAULT 'page',
    locator_value    TEXT          NOT NULL,
    last_read_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
    created_by       UUID,
    updated_by       UUID,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE (user_id, content_item_id)
);

CREATE INDEX idx_reading_positions_user_id ON reading_positions (user_id);


CREATE TABLE downloads (
    id               UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID            NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    content_item_id  UUID            NOT NULL REFERENCES content_items (id) ON DELETE CASCADE,
    asset_id         UUID            NOT NULL REFERENCES content_assets (id) ON DELETE CASCADE,
    download_status  download_status NOT NULL DEFAULT 'pending',
    byte_size        BIGINT          NOT NULL DEFAULT 0,
    local_path       TEXT,
    created_by       UUID,
    updated_by       UUID,
    created_at       TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ     NOT NULL DEFAULT now(),
    UNIQUE (user_id, asset_id)
);

CREATE INDEX idx_downloads_user_id        ON downloads (user_id);
CREATE INDEX idx_downloads_content_item   ON downloads (content_item_id);
CREATE INDEX idx_downloads_status         ON downloads (download_status);


-- =============================================================================
-- SECTION 10 — GAMIFICATION
-- =============================================================================

CREATE TABLE badge_definitions (
    id          UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    category    badge_category  NOT NULL,
    name        TEXT            NOT NULL,
    xp_reward   INTEGER         NOT NULL DEFAULT 0 CHECK (xp_reward >= 0),
    created_by  UUID,
    updated_by  UUID,
    created_at  TIMESTAMPTZ     NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ     NOT NULL DEFAULT now()
);

CREATE INDEX idx_badge_definitions_category ON badge_definitions (category);


CREATE TABLE user_badges (
    id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id              UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    badge_definition_id  UUID        NOT NULL REFERENCES badge_definitions (id) ON DELETE CASCADE,
    awarded_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by           UUID,
    updated_by           UUID,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, badge_definition_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges (user_id);


CREATE TABLE home_stats (
    user_id     UUID        PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    day_streak  INTEGER     NOT NULL DEFAULT 0 CHECK (day_streak >= 0),
    xp_total    INTEGER     NOT NULL DEFAULT 0 CHECK (xp_total >= 0),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- =============================================================================
-- SECTION 11 — COACHING
-- =============================================================================

CREATE TABLE coach_assignments (
    id              UUID                    PRIMARY KEY DEFAULT gen_random_uuid(),
    coach_user_id   UUID                    NOT NULL REFERENCES users (id),
    client_user_id  UUID                    NOT NULL REFERENCES users (id),
    status          coach_assignment_status NOT NULL DEFAULT 'pending',
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ             NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ             NOT NULL DEFAULT now(),
    UNIQUE (coach_user_id, client_user_id),
    CONSTRAINT chk_coach_ne_client CHECK (coach_user_id <> client_user_id)
);

CREATE INDEX idx_coach_assignments_coach_user  ON coach_assignments (coach_user_id);
CREATE INDEX idx_coach_assignments_client_user ON coach_assignments (client_user_id);
CREATE INDEX idx_coach_assignments_status      ON coach_assignments (status);


-- =============================================================================
-- SECTION 12 — NOTIFICATIONS
-- =============================================================================

CREATE TABLE notifications (
    id          UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID                  NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    channel     notification_channel  NOT NULL DEFAULT 'in_app',
    status      notification_status   NOT NULL DEFAULT 'pending',
    title       TEXT                  NOT NULL,
    body        TEXT                  NOT NULL,
    payload     JSONB                 NOT NULL DEFAULT '{}',
    read_at     TIMESTAMPTZ,
    sent_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ           NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ           NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_id         ON notifications (user_id);
CREATE INDEX idx_notifications_user_unread      ON notifications (user_id, status) WHERE status <> 'read';
CREATE INDEX idx_notifications_created_at       ON notifications (created_at DESC);

-- =============================================================================
-- SECTION 13 — MOBILE READ MODELS (MOCK-DATA SYNC)
-- =============================================================================

CREATE TABLE content_areas (
    route           TEXT        PRIMARY KEY,
    label           TEXT        NOT NULL,
    description     TEXT        NOT NULL DEFAULT '',
    icon            TEXT        NOT NULL,
    suffix          TEXT        NOT NULL DEFAULT '',
    "accentColor"   TEXT        NOT NULL,
    bg              TEXT        NOT NULL,
    order_index     SMALLINT    NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE content_nav_areas (
    route                   TEXT        PRIMARY KEY,
    label                   TEXT        NOT NULL,
    description             TEXT        NOT NULL DEFAULT '',
    "accentColor"           TEXT        NOT NULL,
    bg                      TEXT        NOT NULL,
    "requiresSubscription"  BOOLEAN     NOT NULL DEFAULT false,
    order_index             SMALLINT    NOT NULL DEFAULT 0,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reminder_time_slots (
    label       TEXT        PRIMARY KEY,
    h           SMALLINT    NOT NULL CHECK (h BETWEEN 0 AND 23),
    m           SMALLINT    NOT NULL CHECK (m BETWEEN 0 AND 59),
    order_index SMALLINT    NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE recent_searches (
    user_id     UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    term        TEXT        NOT NULL,
    searched_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, term)
);

CREATE TABLE popular_topics (
    id          TEXT        PRIMARY KEY,
    title       TEXT        NOT NULL,
    subtitle    TEXT,
    order_index SMALLINT    NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE content_screen_mock (
    id          SMALLINT    PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    payload     JSONB       NOT NULL DEFAULT '{}',
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE meta (
    key         TEXT        PRIMARY KEY,
    value       JSONB       NOT NULL DEFAULT '{}',
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- =============================================================================
-- TRIGGERS — auto-update updated_at
-- =============================================================================

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

DO $$
DECLARE
    t TEXT;
BEGIN
    FOR t IN
        SELECT table_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND column_name   = 'updated_at'
          AND table_name   <> 'home_stats'
    LOOP
        EXECUTE format(
            'CREATE TRIGGER trg_%I_updated_at
             BEFORE UPDATE ON %I
             FOR EACH ROW EXECUTE FUNCTION set_updated_at()',
            t, t
        );
    END LOOP;
END;
$$;

-- home_stats has a single-column update pattern — manage manually
CREATE TRIGGER trg_home_stats_updated_at
    BEFORE UPDATE ON home_stats
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- =============================================================================
-- COLUMN DESCRIPTIONS
-- =============================================================================

-- ---------------- users ----------------
COMMENT ON TABLE  users                        IS 'Authenticated or guest accounts in the PST app.';
COMMENT ON COLUMN users.id                     IS 'Primary key — randomly generated UUID.';
COMMENT ON COLUMN users.email                  IS 'Unique login email address.';
COMMENT ON COLUMN users.external_auth_id       IS 'Opaque identifier from the external OAuth provider (null for password auth).';
COMMENT ON COLUMN users.auth_provider          IS 'Authentication method used to create the account (password | oauth_google | oauth_apple).';
COMMENT ON COLUMN users.role                   IS 'Access role: guest (unauthenticated), member (standard), plan_owner (subscription holder), coach.';
COMMENT ON COLUMN users.language_code          IS 'Preferred UI language (tr | en | es).';
COMMENT ON COLUMN users.created_by             IS 'UUID of the user or system process that created this row (null for system/seed).';
COMMENT ON COLUMN users.updated_by             IS 'UUID of the user or system process that last modified this row.';
COMMENT ON COLUMN users.created_at             IS 'Row creation timestamp (UTC).';
COMMENT ON COLUMN users.updated_at             IS 'Row last-update timestamp (UTC); auto-maintained by trigger.';

-- ---------------- user_sessions ----------------
COMMENT ON TABLE  user_sessions                IS 'Token-backed session lifecycle records.';
COMMENT ON COLUMN user_sessions.id             IS 'Primary key — session token identifier.';
COMMENT ON COLUMN user_sessions.user_id        IS 'Owner of this session (FK → users).';
COMMENT ON COLUMN user_sessions.expires_at     IS 'Hard expiry timestamp; requests after this point are rejected.';
COMMENT ON COLUMN user_sessions.last_active_at IS 'Timestamp of the most recent authenticated request in this session.';
COMMENT ON COLUMN user_sessions.created_by     IS 'Actor that opened the session.';
COMMENT ON COLUMN user_sessions.updated_by     IS 'Actor that last touched the session record.';
COMMENT ON COLUMN user_sessions.created_at     IS 'Session creation timestamp (UTC).';
COMMENT ON COLUMN user_sessions.updated_at     IS 'Row last-update timestamp (UTC).';

-- ---------------- demographic_profiles ----------------
COMMENT ON TABLE  demographic_profiles             IS 'Voluntary demographic data collected during onboarding (FR-E1-08).';
COMMENT ON COLUMN demographic_profiles.user_id     IS 'One-to-one FK to users; also the primary key.';
COMMENT ON COLUMN demographic_profiles.age         IS 'User-reported age in years (0–130).';
COMMENT ON COLUMN demographic_profiles.gender      IS 'Self-identified gender (female | male | prefer_not_to_say); optional.';
COMMENT ON COLUMN demographic_profiles.country_code IS 'ISO 3166-1 alpha-2 country code (e.g. TR, US).';
COMMENT ON COLUMN demographic_profiles.created_by  IS 'Actor that created this profile.';
COMMENT ON COLUMN demographic_profiles.updated_by  IS 'Actor that last updated this profile.';
COMMENT ON COLUMN demographic_profiles.created_at  IS 'Profile creation timestamp (UTC).';
COMMENT ON COLUMN demographic_profiles.updated_at  IS 'Profile last-update timestamp (UTC).';

-- ---------------- accessibility_settings ----------------
COMMENT ON TABLE  accessibility_settings               IS 'Persistent accessibility preferences per user.';
COMMENT ON COLUMN accessibility_settings.user_id       IS 'One-to-one FK to users; also the primary key.';
COMMENT ON COLUMN accessibility_settings.text_scale    IS 'Font size multiplier (1.0 = default, >1 = larger).';
COMMENT ON COLUMN accessibility_settings.high_contrast IS 'Whether high-contrast mode is enabled.';
COMMENT ON COLUMN accessibility_settings.reduce_motion IS 'Whether animations and motion effects are suppressed.';
COMMENT ON COLUMN accessibility_settings.theme         IS 'Colour theme preference (light | dark | system).';
COMMENT ON COLUMN accessibility_settings.created_by    IS 'Actor that created this record.';
COMMENT ON COLUMN accessibility_settings.updated_by    IS 'Actor that last modified this record.';
COMMENT ON COLUMN accessibility_settings.created_at    IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN accessibility_settings.updated_at    IS 'Record last-update timestamp (UTC).';

-- ---------------- reading_settings ----------------
COMMENT ON TABLE  reading_settings                    IS 'In-reader typography preferences per user.';
COMMENT ON COLUMN reading_settings.user_id            IS 'One-to-one FK to users; also the primary key.';
COMMENT ON COLUMN reading_settings.font_scale         IS 'Font size multiplier applied inside the e-book reader (1.0 = default).';
COMMENT ON COLUMN reading_settings.line_spacing       IS 'Line-height multiplier inside the e-book reader (1.5 = default).';
COMMENT ON COLUMN reading_settings.background_mode    IS 'Reader background theme (white | sepia | dark).';
COMMENT ON COLUMN reading_settings.created_by         IS 'Actor that created this record.';
COMMENT ON COLUMN reading_settings.updated_by         IS 'Actor that last modified this record.';
COMMENT ON COLUMN reading_settings.created_at         IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN reading_settings.updated_at         IS 'Record last-update timestamp (UTC).';

-- ---------------- reminder_settings ----------------
COMMENT ON TABLE  reminder_settings                           IS 'Push-notification reminder preferences per user.';
COMMENT ON COLUMN reminder_settings.id                        IS 'Primary key.';
COMMENT ON COLUMN reminder_settings.user_id                   IS 'One-to-one FK to users.';
COMMENT ON COLUMN reminder_settings.daily_enabled             IS 'Whether a daily practice reminder is active.';
COMMENT ON COLUMN reminder_settings.daily_time_local          IS 'Local time-of-day for the daily reminder (null = not set); mapped to `time_local` in mobile compatibility selectors.';
COMMENT ON COLUMN reminder_settings.workshop_followup_enabled IS 'Whether post-workshop follow-up reminders are active.';
COMMENT ON COLUMN reminder_settings.created_by                IS 'Actor that created this record.';
COMMENT ON COLUMN reminder_settings.updated_by                IS 'Actor that last modified this record.';
COMMENT ON COLUMN reminder_settings.created_at                IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN reminder_settings.updated_at                IS 'Record last-update timestamp (UTC).';

-- ---------------- subscription_plans ----------------
COMMENT ON TABLE  subscription_plans                              IS 'Commercial plan catalogue (individual, family, group).';
COMMENT ON COLUMN subscription_plans.id                           IS 'Primary key.';
COMMENT ON COLUMN subscription_plans.plan_type                    IS 'Plan tier: individual (1 seat), family (≤5 seats), group (custom).';
COMMENT ON COLUMN subscription_plans.name                         IS 'Display name shown in the purchase UI.';
COMMENT ON COLUMN subscription_plans.seat_limit                   IS 'Maximum number of users this plan covers.';
COMMENT ON COLUMN subscription_plans.student_discount_eligible    IS 'Whether a student-discount coupon may be applied to this plan.';
COMMENT ON COLUMN subscription_plans.created_by                   IS 'Actor that created this plan definition.';
COMMENT ON COLUMN subscription_plans.updated_by                   IS 'Actor that last modified this plan definition.';
COMMENT ON COLUMN subscription_plans.created_at                   IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN subscription_plans.updated_at                   IS 'Record last-update timestamp (UTC).';

-- ---------------- subscriptions ----------------
COMMENT ON TABLE  subscriptions               IS 'Active entitlement records linking a user to a plan.';
COMMENT ON COLUMN subscriptions.id            IS 'Primary key.';
COMMENT ON COLUMN subscriptions.owner_user_id IS 'User who purchased / owns this subscription (FK → users).';
COMMENT ON COLUMN subscriptions.plan_id       IS 'Plan this subscription is based on (FK → subscription_plans).';
COMMENT ON COLUMN subscriptions.status        IS 'Billing state: inactive | trial | active | canceled.';
COMMENT ON COLUMN subscriptions.renewal_at    IS 'Next scheduled renewal date; null if canceled or not yet set.';
COMMENT ON COLUMN subscriptions.period_end_at IS 'End of the current paid period; populated when status = canceled.';
COMMENT ON COLUMN subscriptions.created_by    IS 'Actor that created this subscription.';
COMMENT ON COLUMN subscriptions.updated_by    IS 'Actor that last modified this subscription.';
COMMENT ON COLUMN subscriptions.created_at    IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN subscriptions.updated_at    IS 'Record last-update timestamp (UTC).';

-- ---------------- subscription_addons ----------------
COMMENT ON TABLE  subscription_addons               IS 'Optional add-on products attached to a subscription.';
COMMENT ON COLUMN subscription_addons.id            IS 'Primary key.';
COMMENT ON COLUMN subscription_addons.subscription_id IS 'Parent subscription (FK → subscriptions).';
COMMENT ON COLUMN subscription_addons.addon_type    IS 'Add-on code: coaching_school | ebook_unlimited | ai_pack | coach_training | seat_plus_5 | seat_plus_10.';
COMMENT ON COLUMN subscription_addons.status        IS 'Whether the add-on is currently active or inactive.';
COMMENT ON COLUMN subscription_addons.created_by    IS 'Actor that activated this add-on.';
COMMENT ON COLUMN subscription_addons.updated_by    IS 'Actor that last modified this add-on.';
COMMENT ON COLUMN subscription_addons.created_at    IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN subscription_addons.updated_at    IS 'Record last-update timestamp (UTC).';

-- ---------------- seats ----------------
COMMENT ON TABLE  seats                  IS 'Individual access slots within a family or group subscription.';
COMMENT ON COLUMN seats.id               IS 'Primary key.';
COMMENT ON COLUMN seats.subscription_id  IS 'Parent subscription that owns this seat (FK → subscriptions).';
COMMENT ON COLUMN seats.assigned_user_id IS 'User occupying this seat; null if the seat is open or invited.';
COMMENT ON COLUMN seats.status           IS 'Seat lifecycle: open | available | invited | assigned | active | removed.';
COMMENT ON COLUMN seats.created_by       IS 'Actor that created this seat record.';
COMMENT ON COLUMN seats.updated_by       IS 'Actor that last modified this seat record.';
COMMENT ON COLUMN seats.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN seats.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- purchase_receipts ----------------
COMMENT ON TABLE  purchase_receipts                     IS 'Store receipts from Apple, Google, or Stripe used to verify purchases.';
COMMENT ON COLUMN purchase_receipts.id                  IS 'Primary key.';
COMMENT ON COLUMN purchase_receipts.subscription_id     IS 'Subscription activated or extended by this receipt (FK → subscriptions).';
COMMENT ON COLUMN purchase_receipts.store_type          IS 'Payment platform: apple | google | stripe.';
COMMENT ON COLUMN purchase_receipts.external_receipt_id IS 'Transaction or order identifier from the payment platform.';
COMMENT ON COLUMN purchase_receipts.verification_status IS 'Server-side verification result: pending | verified | failed.';
COMMENT ON COLUMN purchase_receipts.status              IS 'Receipt lifecycle state: verified | expired | refunded.';
COMMENT ON COLUMN purchase_receipts.payload             IS 'Raw JSON payload returned by the store verification API.';
COMMENT ON COLUMN purchase_receipts.amount              IS 'Charged amount in the local currency.';
COMMENT ON COLUMN purchase_receipts.currency            IS 'ISO 4217 currency code (e.g. TRY, USD).';
COMMENT ON COLUMN purchase_receipts.purchased_at        IS 'Timestamp when the purchase was made by the user.';
COMMENT ON COLUMN purchase_receipts.verified_at         IS 'Timestamp when server-side verification succeeded; null if not yet verified.';
COMMENT ON COLUMN purchase_receipts.created_by          IS 'Actor that created this record.';
COMMENT ON COLUMN purchase_receipts.updated_by          IS 'Actor that last modified this record.';
COMMENT ON COLUMN purchase_receipts.created_at          IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN purchase_receipts.updated_at          IS 'Record last-update timestamp (UTC).';

-- ---------------- content_sources ----------------
COMMENT ON TABLE  content_sources              IS 'Catalogue metadata for top-level content collections shown on the Discover screen.';
COMMENT ON COLUMN content_sources.id           IS 'UUID primary key for a content source row.';
COMMENT ON COLUMN content_sources.title        IS 'Display name of the content source.';
COMMENT ON COLUMN content_sources.subtitle     IS 'Short tagline shown below the title on catalogue cards.';
COMMENT ON COLUMN content_sources.description  IS 'Full-length descriptive text shown on the source detail screen.';
COMMENT ON COLUMN content_sources.icon         IS 'Material Community Icons name used as the source icon.';
COMMENT ON COLUMN content_sources.accent_color IS 'Hex accent colour for branding this source in the UI.';
COMMENT ON COLUMN content_sources.content_source_type IS 'Source category (journey-of-discoveries | universe-of-emotions | books | workshops).';
COMMENT ON COLUMN content_sources.catalog_screen IS 'Navigation route name of the catalogue screen for this source.';
COMMENT ON COLUMN content_sources.order_index  IS 'Display order on the Discover screen (ascending).';
COMMENT ON COLUMN content_sources.created_at   IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN content_sources.updated_at   IS 'Record last-update timestamp (UTC).';

-- ---------------- content_items ----------------
COMMENT ON TABLE  content_items              IS 'Polymorphic container representing a single publishable piece of content (journey, module, workshop, or ebook).';
COMMENT ON COLUMN content_items.id           IS 'Primary key — shared with the entity-specific detail table.';
COMMENT ON COLUMN content_items.entity_type  IS 'Discriminator indicating which detail table holds the rest of the data.';
COMMENT ON COLUMN content_items.source_id    IS 'Catalogue source this item belongs to (FK → content_sources).';
COMMENT ON COLUMN content_items.language_code IS 'Language of this content variant (tr | en | es).';
COMMENT ON COLUMN content_items.is_published IS 'Whether this item is visible to end users.';
COMMENT ON COLUMN content_items.created_at   IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN content_items.updated_at   IS 'Record last-update timestamp (UTC).';

-- ---------------- content_assets ----------------
COMMENT ON TABLE  content_assets                 IS 'Binary assets (EPUB, PDF, audio, video, image) associated with a content item.';
COMMENT ON COLUMN content_assets.id              IS 'Primary key.';
COMMENT ON COLUMN content_assets.content_item_id IS 'Content item this asset belongs to (FK → content_items).';
COMMENT ON COLUMN content_assets.asset_type      IS 'Asset category: ebook_package | worksheet_pdf | audio | video | image.';
COMMENT ON COLUMN content_assets.storage_uri     IS 'S3 (or equivalent) URI pointing to the stored file.';
COMMENT ON COLUMN content_assets.mime_type       IS 'MIME type of the file (e.g. application/epub+zip, application/pdf).';
COMMENT ON COLUMN content_assets.byte_size       IS 'File size in bytes; used to display download progress.';
COMMENT ON COLUMN content_assets.checksum        IS 'SHA-256 hex digest for integrity verification after download.';
COMMENT ON COLUMN content_assets.download_policy IS 'Access policy: downloadable (offline allowed) | streaming (online only) | premium (requires specific add-on).';
COMMENT ON COLUMN content_assets.created_by      IS 'Actor that uploaded this asset.';
COMMENT ON COLUMN content_assets.updated_by      IS 'Actor that last modified this asset record.';
COMMENT ON COLUMN content_assets.created_at      IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN content_assets.updated_at      IS 'Record last-update timestamp (UTC).';

-- ---------------- journeys ----------------
COMMENT ON TABLE  journeys                  IS 'Structured multi-day personal growth programmes.';
COMMENT ON COLUMN journeys.content_item_id  IS 'Primary key and FK to content_items (one-to-one).';
COMMENT ON COLUMN journeys.title            IS 'Display title of the journey.';
COMMENT ON COLUMN journeys.description      IS 'Short motivational description shown on the journey card.';
COMMENT ON COLUMN journeys.duration_days    IS 'Intended completion duration in calendar days.';
COMMENT ON COLUMN journeys.level            IS 'Difficulty / experience level (baslangic | beginner | basico | orta | ileri).';
COMMENT ON COLUMN journeys.outline_steps    IS 'JSON array of step objects {title, duration} previewed on the detail screen.';
COMMENT ON COLUMN journeys.benefits         IS 'JSON array of benefit strings shown as bullet points on the detail screen.';
COMMENT ON COLUMN journeys.created_by       IS 'Actor that created this journey.';
COMMENT ON COLUMN journeys.updated_by       IS 'Actor that last modified this journey.';
COMMENT ON COLUMN journeys.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN journeys.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- journey_days ----------------
COMMENT ON TABLE  journey_days                        IS 'Individual day slots within a journey, each containing content blocks.';
COMMENT ON COLUMN journey_days.id                     IS 'Primary key.';
COMMENT ON COLUMN journey_days.journey_content_item_id IS 'Parent journey (FK → journeys).';
COMMENT ON COLUMN journey_days.day_number             IS 'Sequential day position within the journey (1-based).';
COMMENT ON COLUMN journey_days.title                  IS 'Optional display title for this day (e.g. "Gün 1: Farkındalık").';
COMMENT ON COLUMN journey_days.unlock_time_local      IS 'Optional local unlock time used by day-level journey screens (e.g. 08:00).';
COMMENT ON COLUMN journey_days.created_at             IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN journey_days.updated_at             IS 'Record last-update timestamp (UTC).';

-- ---------------- modules ----------------
COMMENT ON TABLE  modules                  IS 'Themed learning modules grouping several packages.';
COMMENT ON COLUMN modules.content_item_id  IS 'Primary key and FK to content_items (one-to-one).';
COMMENT ON COLUMN modules.title            IS 'Display title of the module.';
COMMENT ON COLUMN modules.description      IS 'Description summarising the learning outcomes of the module.';
COMMENT ON COLUMN modules.created_by       IS 'Actor that created this module.';
COMMENT ON COLUMN modules.updated_by       IS 'Actor that last modified this module.';
COMMENT ON COLUMN modules.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN modules.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- packages ----------------
COMMENT ON TABLE  packages                         IS 'Ordered sub-units within a module, each wrapping a set of content blocks.';
COMMENT ON COLUMN packages.id                      IS 'Slug-style or UUID primary key (matches source IDs such as pkg-0001-01).';
COMMENT ON COLUMN packages.module_content_item_id  IS 'Parent module (FK → modules).';
COMMENT ON COLUMN packages.title                   IS 'Display title of the package.';
COMMENT ON COLUMN packages.order_index             IS 'Display order within the parent module (ascending).';
COMMENT ON COLUMN packages.source_content_item_id  IS 'Optional FK to a source content item that provides base material.';
COMMENT ON COLUMN packages.source_domain_type      IS 'Domain type of the source content (e.g. spiritual_lesson).';
COMMENT ON COLUMN packages.created_by              IS 'Actor that created this package.';
COMMENT ON COLUMN packages.updated_by              IS 'Actor that last modified this package.';
COMMENT ON COLUMN packages.created_at              IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN packages.updated_at              IS 'Record last-update timestamp (UTC).';

-- ---------------- workshop_groups ----------------
COMMENT ON TABLE  workshop_groups                      IS 'Thematic groupings that organise workshops in the catalogue (e.g. Manevi Derinleşme).';
COMMENT ON COLUMN workshop_groups.id                   IS 'Slug-style primary key (e.g. wg-manevi-derinlesme).';
COMMENT ON COLUMN workshop_groups.title                IS 'Display name of the group shown in the catalogue header.';
COMMENT ON COLUMN workshop_groups.description          IS 'Descriptive copy explaining the group theme.';
COMMENT ON COLUMN workshop_groups.order_index          IS 'Display order in the catalogue list (ascending).';
COMMENT ON COLUMN workshop_groups.target_audiences     IS 'JSON array of target audience labels (e.g. ["18+","Aile"]).';
COMMENT ON COLUMN workshop_groups.featured_workshop_ids IS 'JSON array of content_item UUIDs pinned as featured workshops.';
COMMENT ON COLUMN workshop_groups.created_at           IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workshop_groups.updated_at           IS 'Record last-update timestamp (UTC).';

-- ---------------- workshops ----------------
COMMENT ON TABLE  workshops                               IS 'Interactive workshop content items with structured multi-stage delivery.';
COMMENT ON COLUMN workshops.content_item_id               IS 'Primary key and FK to content_items (one-to-one).';
COMMENT ON COLUMN workshops.title                         IS 'Display title of the workshop.';
COMMENT ON COLUMN workshops.theme                         IS 'Central psychological / spiritual theme of the workshop.';
COMMENT ON COLUMN workshops.target_audience               IS 'Intended participant audience label (e.g. "18+", "Aile", "Çift", "14-18").';
COMMENT ON COLUMN workshops.total_duration_minutes        IS 'Total facilitated time across all stages in minutes.';
COMMENT ON COLUMN workshops.delivery_mode                 IS 'Format: kamp (immersive camp) | rehber (guided) | calisma_kitabi (workbook).';
COMMENT ON COLUMN workshops.workshop_group_id             IS 'Catalogue group this workshop belongs to (FK → workshop_groups).';
COMMENT ON COLUMN workshops.facilitator_guide_asset_id    IS 'Optional PDF asset containing the facilitator guide (FK → content_assets).';
COMMENT ON COLUMN workshops.participant_workbook_asset_id IS 'Optional PDF asset containing the participant workbook (FK → content_assets).';
COMMENT ON COLUMN workshops.created_by                    IS 'Actor that created this workshop.';
COMMENT ON COLUMN workshops.updated_by                    IS 'Actor that last modified this workshop.';
COMMENT ON COLUMN workshops.created_at                    IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workshops.updated_at                    IS 'Record last-update timestamp (UTC).';

-- ---------------- workshop_stages ----------------
COMMENT ON TABLE  workshop_stages                          IS 'Sequential phases within a workshop (e.g. insight → analysis → camp → closure).';
COMMENT ON COLUMN workshop_stages.id                       IS 'Primary key.';
COMMENT ON COLUMN workshop_stages.workshop_content_item_id IS 'Parent workshop (FK → workshops).';
COMMENT ON COLUMN workshop_stages.stage_number             IS 'Ordinal position of this stage within the workshop (1-based).';
COMMENT ON COLUMN workshop_stages.stage_type               IS 'Stage category: insight | analysis | camp | facilitator_guide | workbook | closure.';
COMMENT ON COLUMN workshop_stages.title                    IS 'Display title of the stage.';
COMMENT ON COLUMN workshop_stages.created_by               IS 'Actor that created this stage.';
COMMENT ON COLUMN workshop_stages.updated_by               IS 'Actor that last modified this stage.';
COMMENT ON COLUMN workshop_stages.created_at               IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workshop_stages.updated_at               IS 'Record last-update timestamp (UTC).';

-- ---------------- workshop_sessions ----------------
COMMENT ON TABLE  workshop_sessions                  IS 'Time-boxed sessions within a workshop stage (used in multi-day camp formats).';
COMMENT ON COLUMN workshop_sessions.id               IS 'Primary key.';
COMMENT ON COLUMN workshop_sessions.workshop_stage_id IS 'Parent stage (FK → workshop_stages).';
COMMENT ON COLUMN workshop_sessions.day_index        IS 'Zero-based camp day on which this session takes place (null for non-camp formats).';
COMMENT ON COLUMN workshop_sessions.slot             IS 'Time of day slot: morning | midday | evening (null if not scheduled).';
COMMENT ON COLUMN workshop_sessions.duration_minutes IS 'Approximate facilitated duration of this session in minutes.';
COMMENT ON COLUMN workshop_sessions.created_by       IS 'Actor that created this session.';
COMMENT ON COLUMN workshop_sessions.updated_by       IS 'Actor that last modified this session.';
COMMENT ON COLUMN workshop_sessions.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workshop_sessions.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- workshop_content_blocks ----------------
COMMENT ON TABLE  workshop_content_blocks                  IS 'Structured content atoms within a workshop stage (readings, exercises, verse references, etc.).';
COMMENT ON COLUMN workshop_content_blocks.id               IS 'Primary key.';
COMMENT ON COLUMN workshop_content_blocks.workshop_stage_id IS 'Stage this block belongs to (FK → workshop_stages).';
COMMENT ON COLUMN workshop_content_blocks.parent_type      IS 'Entity type of the logical parent (journey | package | workshop).';
COMMENT ON COLUMN workshop_content_blocks.parent_id        IS 'UUID of the logical parent entity.';
COMMENT ON COLUMN workshop_content_blocks.block_type       IS 'Content role: intro | verse_reference | explanation | bridge | exercise | output | reading | question.';
COMMENT ON COLUMN workshop_content_blocks.content_type     IS 'Free-text sub-type tag (e.g. reading, exercise, question) used for UI rendering.';
COMMENT ON COLUMN workshop_content_blocks.title            IS 'Short heading displayed above the block.';
COMMENT ON COLUMN workshop_content_blocks.body             IS 'Main markdown/plain-text content of the block.';
COMMENT ON COLUMN workshop_content_blocks.order_index      IS 'Display order within the parent stage (ascending).';
COMMENT ON COLUMN workshop_content_blocks.has_audio        IS 'Whether an audio recording accompanies this block.';
COMMENT ON COLUMN workshop_content_blocks.created_by       IS 'Actor that created this block.';
COMMENT ON COLUMN workshop_content_blocks.updated_by       IS 'Actor that last modified this block.';
COMMENT ON COLUMN workshop_content_blocks.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workshop_content_blocks.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- _content_blocks ----------------
COMMENT ON TABLE  _content_blocks               IS 'Mobile-ready generic content blocks synced with artifacts/mock/mock_data.json (`_content_blocks`).';
COMMENT ON COLUMN _content_blocks.id            IS 'Primary key from fixture data (UUID-like or slug).';
COMMENT ON COLUMN _content_blocks.parent_type   IS 'Logical parent type (journey_day | package | workshop).';
COMMENT ON COLUMN _content_blocks.parent_id     IS 'Logical parent identifier (UUID or slug).';
COMMENT ON COLUMN _content_blocks.content_type  IS 'UI content type (reading | exercise | question | etc.).';
COMMENT ON COLUMN _content_blocks.title         IS 'Display title.';
COMMENT ON COLUMN _content_blocks.body          IS 'Body text shown in reader-style screens.';
COMMENT ON COLUMN _content_blocks.order_index   IS 'Display order within the same parent.';
COMMENT ON COLUMN _content_blocks.has_audio     IS 'Whether this block has an associated audio rendition.';
COMMENT ON COLUMN _content_blocks.created_at    IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN _content_blocks.updated_at    IS 'Record last-update timestamp (UTC).';

-- ---------------- workshop_artifacts ----------------
COMMENT ON TABLE  workshop_artifacts                          IS 'Versioned downloadable artefacts produced or used in a workshop (worksheets, guides, etc.).';
COMMENT ON COLUMN workshop_artifacts.id                       IS 'Primary key.';
COMMENT ON COLUMN workshop_artifacts.workshop_content_item_id IS 'Parent workshop (FK → workshops).';
COMMENT ON COLUMN workshop_artifacts.artifact_type            IS 'Type: worksheet | guide | output_card | plan_template | reflection_map.';
COMMENT ON COLUMN workshop_artifacts.version                  IS 'Monotonically increasing version number for this artefact type.';
COMMENT ON COLUMN workshop_artifacts.created_by               IS 'Actor that created this artefact record.';
COMMENT ON COLUMN workshop_artifacts.updated_by               IS 'Actor that last modified this artefact record.';
COMMENT ON COLUMN workshop_artifacts.created_at               IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workshop_artifacts.updated_at               IS 'Record last-update timestamp (UTC).';

-- ---------------- workbook_entries ----------------
COMMENT ON TABLE  workbook_entries                          IS 'User-submitted worksheet responses captured during a workshop.';
COMMENT ON COLUMN workbook_entries.id                       IS 'Primary key.';
COMMENT ON COLUMN workbook_entries.user_id                  IS 'Participant who submitted this entry (FK → users).';
COMMENT ON COLUMN workbook_entries.workshop_content_item_id IS 'Workshop this entry belongs to (FK → workshops).';
COMMENT ON COLUMN workbook_entries.stage_id                 IS 'Stage during which this entry was made (FK → workshop_stages).';
COMMENT ON COLUMN workbook_entries.session_id               IS 'Optional session within the stage (FK → workshop_sessions).';
COMMENT ON COLUMN workbook_entries.worksheet_type           IS 'Worksheet template used: load_map | inner_sentence_shift | dua_card | trust_balance | transformation_plan.';
COMMENT ON COLUMN workbook_entries.payload                  IS 'Free-form JSON containing the user''s field responses.';
COMMENT ON COLUMN workbook_entries.status                   IS 'Entry lifecycle: draft | saved | submitted | archived.';
COMMENT ON COLUMN workbook_entries.version                  IS 'Edit version counter; incremented on each save.';
COMMENT ON COLUMN workbook_entries.created_by               IS 'Actor that created this entry.';
COMMENT ON COLUMN workbook_entries.updated_by               IS 'Actor that last modified this entry.';
COMMENT ON COLUMN workbook_entries.created_at               IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workbook_entries.updated_at               IS 'Record last-update timestamp (UTC).';

-- ---------------- workshop_followup_plans ----------------
COMMENT ON TABLE  workshop_followup_plans                          IS 'User-defined follow-up commitments after a workshop (72 h, 3-week, 30-day windows).';
COMMENT ON COLUMN workshop_followup_plans.id                       IS 'Primary key.';
COMMENT ON COLUMN workshop_followup_plans.user_id                  IS 'Participant who created this plan (FK → users).';
COMMENT ON COLUMN workshop_followup_plans.workshop_content_item_id IS 'Workshop this plan follows up on (FK → workshops).';
COMMENT ON COLUMN workshop_followup_plans.window_type              IS 'Follow-up window: h72 (72 hours) | w3 (3 weeks) | d30 (30 days).';
COMMENT ON COLUMN workshop_followup_plans.intent_text              IS 'User''s free-text intention statement for this window.';
COMMENT ON COLUMN workshop_followup_plans.daily_phrase             IS 'Short affirmation or mantra the user commits to repeat daily.';
COMMENT ON COLUMN workshop_followup_plans.small_step               IS 'One concrete micro-action the user plans to take.';
COMMENT ON COLUMN workshop_followup_plans.status                   IS 'Plan state: planned | active | completed | missed.';
COMMENT ON COLUMN workshop_followup_plans.created_by               IS 'Actor that created this plan.';
COMMENT ON COLUMN workshop_followup_plans.updated_by               IS 'Actor that last modified this plan.';
COMMENT ON COLUMN workshop_followup_plans.created_at               IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN workshop_followup_plans.updated_at               IS 'Record last-update timestamp (UTC).';

-- ---------------- ebooks ----------------
COMMENT ON TABLE  ebooks                          IS 'Digital books available in the PST library.';
COMMENT ON COLUMN ebooks.content_item_id          IS 'Primary key and FK to content_items (one-to-one).';
COMMENT ON COLUMN ebooks.title                    IS 'Display title of the e-book.';
COMMENT ON COLUMN ebooks.category                 IS 'Genre or subject category used for filtering (e.g. şükür, kişisel gelişim).';
COMMENT ON COLUMN ebooks.total_pages              IS 'Total page count used to calculate reading progress percentage.';
COMMENT ON COLUMN ebooks.has_audio                IS 'Whether an audio narration accompanies this e-book.';
COMMENT ON COLUMN ebooks.author_name              IS 'Display name of the author; null if anonymous or institution-published.';
COMMENT ON COLUMN ebooks.download_package_asset_id IS 'FK to the EPUB package asset that can be downloaded for offline reading.';
COMMENT ON COLUMN ebooks.created_by               IS 'Actor that created this e-book record.';
COMMENT ON COLUMN ebooks.updated_by               IS 'Actor that last modified this e-book record.';
COMMENT ON COLUMN ebooks.created_at               IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN ebooks.updated_at               IS 'Record last-update timestamp (UTC).';

-- ---------------- ebook_chapters ----------------
COMMENT ON TABLE  ebook_chapters                       IS 'Table-of-contents entries for an e-book, supporting nested chapters.';
COMMENT ON COLUMN ebook_chapters.id                    IS 'Primary key.';
COMMENT ON COLUMN ebook_chapters.ebook_content_item_id IS 'Parent e-book (FK → ebooks).';
COMMENT ON COLUMN ebook_chapters.title                 IS 'Display title of the chapter.';
COMMENT ON COLUMN ebook_chapters.order_index           IS 'Display order within the parent scope (ascending).';
COMMENT ON COLUMN ebook_chapters.parent_chapter_id     IS 'FK to the parent chapter for nested sub-chapters; null for top-level.';
COMMENT ON COLUMN ebook_chapters.start_locator         IS 'EPUB CFI or page-based locator marking the start of this chapter.';
COMMENT ON COLUMN ebook_chapters.end_locator           IS 'EPUB CFI or page-based locator marking the end of this chapter.';
COMMENT ON COLUMN ebook_chapters.created_by            IS 'Actor that created this chapter record.';
COMMENT ON COLUMN ebook_chapters.updated_by            IS 'Actor that last modified this chapter record.';
COMMENT ON COLUMN ebook_chapters.created_at            IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN ebook_chapters.updated_at            IS 'Record last-update timestamp (UTC).';

-- ---------------- content_progress ----------------
COMMENT ON TABLE  content_progress                  IS 'Per-user progress records for any content item type (journey, module, workshop, ebook, etc.).';
COMMENT ON COLUMN content_progress.id               IS 'Primary key.';
COMMENT ON COLUMN content_progress.user_id          IS 'User whose progress is tracked (FK → users).';
COMMENT ON COLUMN content_progress.target_type      IS 'Discriminator indicating which entity type is being tracked.';
COMMENT ON COLUMN content_progress.content_item_id  IS 'Content item being tracked (FK → content_items).';
COMMENT ON COLUMN content_progress.status           IS 'Progress state: locked | available | in_progress | completed.';
COMMENT ON COLUMN content_progress.progress_percent IS 'Completion percentage (0–100).';
COMMENT ON COLUMN content_progress.started_at       IS 'Timestamp of first engagement with this content item.';
COMMENT ON COLUMN content_progress.completed_at     IS 'Timestamp when progress reached 100%; null if not yet completed.';
COMMENT ON COLUMN content_progress.created_by       IS 'Actor that created this progress record.';
COMMENT ON COLUMN content_progress.updated_by       IS 'Actor that last modified this progress record.';
COMMENT ON COLUMN content_progress.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN content_progress.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- comment_submissions ----------------
COMMENT ON TABLE  comment_submissions                       IS 'User-authored guided reflection comments tied to specific content items.';
COMMENT ON COLUMN comment_submissions.id                    IS 'Primary key.';
COMMENT ON COLUMN comment_submissions.user_id               IS 'Author of the comment (FK → users).';
COMMENT ON COLUMN comment_submissions.target_content_item_id IS 'Content item this comment responds to (FK → content_items).';
COMMENT ON COLUMN comment_submissions.target_type           IS 'Sub-entity type being commented on (journey_day | module_package | workshop_stage | workshop_session | ebook_chapter).';
COMMENT ON COLUMN comment_submissions.content               IS 'Plain-text body of the reflection comment.';
COMMENT ON COLUMN comment_submissions.status                IS 'Lifecycle state: draft | submitted | locked | expired.';
COMMENT ON COLUMN comment_submissions.submitted_at          IS 'Timestamp when the user finalised the comment; null while in draft.';
COMMENT ON COLUMN comment_submissions.parent_comment_id     IS 'Self-referential FK for threaded replies; null for top-level comments.';
COMMENT ON COLUMN comment_submissions.deleted_at            IS 'Soft-delete timestamp; null means the comment is active.';
COMMENT ON COLUMN comment_submissions.created_by            IS 'Actor that created this comment.';
COMMENT ON COLUMN comment_submissions.updated_by            IS 'Actor that last modified this comment.';
COMMENT ON COLUMN comment_submissions.created_at            IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN comment_submissions.updated_at            IS 'Record last-update timestamp (UTC).';

-- ---------------- highlights ----------------
COMMENT ON TABLE  highlights                   IS 'Text highlight annotations made by a user inside an e-book or content block.';
COMMENT ON COLUMN highlights.id                IS 'Primary key.';
COMMENT ON COLUMN highlights.user_id           IS 'User who created this highlight (FK → users).';
COMMENT ON COLUMN highlights.content_item_id   IS 'Content item containing the highlighted text (FK → content_items).';
COMMENT ON COLUMN highlights.color             IS 'Visual colour of the highlight: yellow | green | blue | pink.';
COMMENT ON COLUMN highlights.anchor_locator    IS 'Position identifier within the content (e.g. EPUB CFI or "p:1" page reference).';
COMMENT ON COLUMN highlights.selected_text_hash IS 'SHA hash of the highlighted text used for collision detection across content versions.';
COMMENT ON COLUMN highlights.deleted_at        IS 'Soft-delete timestamp; null means the highlight is active.';
COMMENT ON COLUMN highlights.created_by        IS 'Actor that created this highlight.';
COMMENT ON COLUMN highlights.updated_by        IS 'Actor that last modified this highlight.';
COMMENT ON COLUMN highlights.created_at        IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN highlights.updated_at        IS 'Record last-update timestamp (UTC).';

-- ---------------- notes ----------------
COMMENT ON TABLE  notes                  IS 'Free-text annotations attached by a user to a content item or specific location within it.';
COMMENT ON COLUMN notes.id               IS 'Primary key.';
COMMENT ON COLUMN notes.user_id          IS 'User who wrote this note (FK → users).';
COMMENT ON COLUMN notes.content_item_id  IS 'Content item the note is attached to (FK → content_items).';
COMMENT ON COLUMN notes.body             IS 'Plain-text body of the note.';
COMMENT ON COLUMN notes.anchor_locator   IS 'Optional position within the content where the note is anchored.';
COMMENT ON COLUMN notes.deleted_at       IS 'Soft-delete timestamp; null means the note is active.';
COMMENT ON COLUMN notes.created_by       IS 'Actor that created this note.';
COMMENT ON COLUMN notes.updated_by       IS 'Actor that last modified this note.';
COMMENT ON COLUMN notes.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN notes.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- favorite_items ----------------
COMMENT ON TABLE  favorite_items                   IS 'User-bookmarked items; each row references exactly one of: content_item, highlight, or note.';
COMMENT ON COLUMN favorite_items.id                IS 'Primary key.';
COMMENT ON COLUMN favorite_items.user_id           IS 'User who saved this favourite (FK → users).';
COMMENT ON COLUMN favorite_items.source_type       IS 'Discriminator indicating which reference column is populated.';
COMMENT ON COLUMN favorite_items.content_item_ref_id IS 'FK to a content item when source_type = content_item (mutually exclusive with the other refs).';
COMMENT ON COLUMN favorite_items.highlight_ref_id  IS 'FK to a highlight when source_type = highlight (mutually exclusive with the other refs).';
COMMENT ON COLUMN favorite_items.note_ref_id       IS 'FK to a note when source_type = note (mutually exclusive with the other refs).';
COMMENT ON COLUMN favorite_items.note              IS 'Optional personal annotation the user added when saving this favourite.';
COMMENT ON COLUMN favorite_items.created_by        IS 'Actor that created this favourite.';
COMMENT ON COLUMN favorite_items.updated_by        IS 'Actor that last modified this favourite.';
COMMENT ON COLUMN favorite_items.created_at        IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN favorite_items.updated_at        IS 'Record last-update timestamp (UTC).';

-- ---------------- collections ----------------
COMMENT ON TABLE  collections          IS 'User-curated named collections that group favourite items.';
COMMENT ON COLUMN collections.id       IS 'Primary key.';
COMMENT ON COLUMN collections.user_id  IS 'Owner of this collection (FK → users).';
COMMENT ON COLUMN collections.name     IS 'User-defined display name of the collection.';
COMMENT ON COLUMN collections.created_by IS 'Actor that created this collection.';
COMMENT ON COLUMN collections.updated_by IS 'Actor that last modified this collection.';
COMMENT ON COLUMN collections.created_at IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN collections.updated_at IS 'Record last-update timestamp (UTC).';

-- ---------------- collection_items ----------------
COMMENT ON TABLE  collection_items                  IS 'Junction table placing favourite items into collections.';
COMMENT ON COLUMN collection_items.collection_id    IS 'Parent collection (FK → collections).';
COMMENT ON COLUMN collection_items.favorite_item_id IS 'Favourite item added to the collection (FK → favorite_items).';
COMMENT ON COLUMN collection_items.created_by       IS 'Actor that added this item to the collection.';
COMMENT ON COLUMN collection_items.updated_by       IS 'Actor that last modified this membership record.';
COMMENT ON COLUMN collection_items.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN collection_items.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- reading_positions ----------------
COMMENT ON TABLE  reading_positions                   IS 'Last-read position and progress for each user–ebook pair.';
COMMENT ON COLUMN reading_positions.id                IS 'Primary key.';
COMMENT ON COLUMN reading_positions.user_id           IS 'Reader (FK → users).';
COMMENT ON COLUMN reading_positions.content_item_id   IS 'E-book being read (FK → ebooks).';
COMMENT ON COLUMN reading_positions.progress_percent  IS 'Reading completion percentage (0–100) derived from the locator.';
COMMENT ON COLUMN reading_positions.locator_type      IS 'Position format: page (integer page number) | cfi (EPUB Canonical Fragment Identifier).';
COMMENT ON COLUMN reading_positions.locator_value     IS 'Serialised position value (page number string or CFI string).';
COMMENT ON COLUMN reading_positions.last_read_at      IS 'Timestamp of the last reading session; used to sort the library by recency.';
COMMENT ON COLUMN reading_positions.created_by        IS 'Actor that created this record.';
COMMENT ON COLUMN reading_positions.updated_by        IS 'Actor that last modified this record.';
COMMENT ON COLUMN reading_positions.created_at        IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN reading_positions.updated_at        IS 'Record last-update timestamp (UTC).';

-- ---------------- downloads ----------------
COMMENT ON TABLE  downloads                  IS 'Offline download state for content assets on a user''s device.';
COMMENT ON COLUMN downloads.id               IS 'Primary key.';
COMMENT ON COLUMN downloads.user_id          IS 'User who initiated the download (FK → users).';
COMMENT ON COLUMN downloads.content_item_id  IS 'Content item the downloaded asset belongs to (FK → content_items).';
COMMENT ON COLUMN downloads.asset_id         IS 'Specific binary asset being downloaded (FK → content_assets).';
COMMENT ON COLUMN downloads.download_status  IS 'Transfer state: pending | in_progress | completed | failed | paused.';
COMMENT ON COLUMN downloads.byte_size        IS 'Expected total file size in bytes; used for progress calculation.';
COMMENT ON COLUMN downloads.local_path       IS 'Absolute path to the file on the device once the download completes.';
COMMENT ON COLUMN downloads.created_by       IS 'Actor that initiated this download.';
COMMENT ON COLUMN downloads.updated_by       IS 'Actor that last modified this download record.';
COMMENT ON COLUMN downloads.created_at       IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN downloads.updated_at       IS 'Record last-update timestamp (UTC).';

-- ---------------- badge_definitions ----------------
COMMENT ON TABLE  badge_definitions           IS 'Master catalogue of achievement badges and their XP rewards.';
COMMENT ON COLUMN badge_definitions.id        IS 'Primary key.';
COMMENT ON COLUMN badge_definitions.category  IS 'Content area the badge relates to: journey | module | workshop | ebook | coach | streak | social.';
COMMENT ON COLUMN badge_definitions.name      IS 'Display name of the badge shown in the achievement UI.';
COMMENT ON COLUMN badge_definitions.xp_reward IS 'Experience points awarded when this badge is earned.';
COMMENT ON COLUMN badge_definitions.created_by IS 'Actor that created this badge definition.';
COMMENT ON COLUMN badge_definitions.updated_by IS 'Actor that last modified this badge definition.';
COMMENT ON COLUMN badge_definitions.created_at IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN badge_definitions.updated_at IS 'Record last-update timestamp (UTC).';

-- ---------------- user_badges ----------------
COMMENT ON TABLE  user_badges                     IS 'Badges earned by users; each row represents a single award event.';
COMMENT ON COLUMN user_badges.id                  IS 'Primary key.';
COMMENT ON COLUMN user_badges.user_id             IS 'User who earned the badge (FK → users).';
COMMENT ON COLUMN user_badges.badge_definition_id IS 'Badge that was earned (FK → badge_definitions).';
COMMENT ON COLUMN user_badges.awarded_at          IS 'Timestamp when the badge was awarded.';
COMMENT ON COLUMN user_badges.created_by          IS 'Actor that awarded this badge (system or admin).';
COMMENT ON COLUMN user_badges.updated_by          IS 'Actor that last modified this award record.';
COMMENT ON COLUMN user_badges.created_at          IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN user_badges.updated_at          IS 'Record last-update timestamp (UTC).';

-- ---------------- home_stats ----------------
COMMENT ON TABLE  home_stats            IS 'Aggregated engagement statistics displayed on the user''s home dashboard.';
COMMENT ON COLUMN home_stats.user_id    IS 'Owner of these stats (FK → users); also the primary key.';
COMMENT ON COLUMN home_stats.day_streak IS 'Number of consecutive days the user has engaged with the app.';
COMMENT ON COLUMN home_stats.xp_total   IS 'Cumulative experience points earned across all activities.';
COMMENT ON COLUMN home_stats.updated_at IS 'Last time these stats were recalculated (UTC).';

-- ---------------- coach_assignments ----------------
COMMENT ON TABLE  coach_assignments               IS 'Active or pending coaching relationships between a coach and a client.';
COMMENT ON COLUMN coach_assignments.id            IS 'Primary key.';
COMMENT ON COLUMN coach_assignments.coach_user_id IS 'Coach user in the relationship (FK → users, role = coach).';
COMMENT ON COLUMN coach_assignments.client_user_id IS 'Client user in the relationship (FK → users, role = member).';
COMMENT ON COLUMN coach_assignments.status        IS 'Relationship state: pending | active | inactive.';
COMMENT ON COLUMN coach_assignments.created_by    IS 'Actor that created this assignment.';
COMMENT ON COLUMN coach_assignments.updated_by    IS 'Actor that last modified this assignment.';
COMMENT ON COLUMN coach_assignments.created_at    IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN coach_assignments.updated_at    IS 'Record last-update timestamp (UTC).';

-- ---------------- notifications ----------------
COMMENT ON TABLE  notifications            IS 'In-app, push, and email notifications queued for or sent to users.';
COMMENT ON COLUMN notifications.id         IS 'Primary key.';
COMMENT ON COLUMN notifications.user_id    IS 'Recipient of the notification (FK → users).';
COMMENT ON COLUMN notifications.channel    IS 'Delivery channel: push | email | in_app.';
COMMENT ON COLUMN notifications.status     IS 'Delivery state: pending | sent | failed | read.';
COMMENT ON COLUMN notifications.title      IS 'Short notification headline.';
COMMENT ON COLUMN notifications.body       IS 'Full notification message body.';
COMMENT ON COLUMN notifications.payload    IS 'JSON metadata for deep-linking or action handling (e.g. content_item_id, route).';
COMMENT ON COLUMN notifications.read_at    IS 'Timestamp when the user acknowledged the notification; null if unread.';
COMMENT ON COLUMN notifications.sent_at    IS 'Timestamp when the notification was successfully dispatched; null if pending or failed.';
COMMENT ON COLUMN notifications.created_at IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN notifications.updated_at IS 'Record last-update timestamp (UTC).';

-- ---------------- content_areas ----------------
COMMENT ON TABLE  content_areas              IS 'Home dashboard content-area cards from mock fixtures.';
COMMENT ON COLUMN content_areas.route        IS 'Navigation target route (primary key).';
COMMENT ON COLUMN content_areas.label        IS 'Card label.';
COMMENT ON COLUMN content_areas.description  IS 'Card helper text.';
COMMENT ON COLUMN content_areas.icon         IS 'Icon token for the card.';
COMMENT ON COLUMN content_areas.suffix       IS 'Pluralization/helper suffix used with counts.';
COMMENT ON COLUMN content_areas."accentColor" IS 'Accent color hex for the card.';
COMMENT ON COLUMN content_areas.bg           IS 'Background color hex for the card.';
COMMENT ON COLUMN content_areas.order_index  IS 'Display order in the grid.';
COMMENT ON COLUMN content_areas.created_at   IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN content_areas.updated_at   IS 'Record last-update timestamp (UTC).';

-- ---------------- content_nav_areas ----------------
COMMENT ON TABLE  content_nav_areas                    IS 'Home content-navigation cards from mock fixtures.';
COMMENT ON COLUMN content_nav_areas.route              IS 'Navigation target route (primary key).';
COMMENT ON COLUMN content_nav_areas.label              IS 'Card label.';
COMMENT ON COLUMN content_nav_areas.description        IS 'Card helper text.';
COMMENT ON COLUMN content_nav_areas."accentColor"      IS 'Accent color hex for the card.';
COMMENT ON COLUMN content_nav_areas.bg                 IS 'Background color hex for the card.';
COMMENT ON COLUMN content_nav_areas."requiresSubscription" IS 'Whether tapping this area requires a paid entitlement.';
COMMENT ON COLUMN content_nav_areas.order_index        IS 'Display order in the grid.';
COMMENT ON COLUMN content_nav_areas.created_at         IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN content_nav_areas.updated_at         IS 'Record last-update timestamp (UTC).';

-- ---------------- reminder_time_slots ----------------
COMMENT ON TABLE  reminder_time_slots            IS 'Preset reminder times shown in reminder settings.';
COMMENT ON COLUMN reminder_time_slots.label      IS 'Formatted display label (HH:MM).';
COMMENT ON COLUMN reminder_time_slots.h          IS 'Hour component (0-23).';
COMMENT ON COLUMN reminder_time_slots.m          IS 'Minute component (0-59).';
COMMENT ON COLUMN reminder_time_slots.order_index IS 'Display order in the selector.';
COMMENT ON COLUMN reminder_time_slots.created_at IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN reminder_time_slots.updated_at IS 'Record last-update timestamp (UTC).';

-- ---------------- recent_searches ----------------
COMMENT ON TABLE  recent_searches            IS 'Recent search terms keyed by user.';
COMMENT ON COLUMN recent_searches.user_id    IS 'Owner of the search term (FK → users).';
COMMENT ON COLUMN recent_searches.term       IS 'Recent search query string.';
COMMENT ON COLUMN recent_searches.searched_at IS 'Timestamp of the most recent search for this term.';
COMMENT ON COLUMN recent_searches.created_at IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN recent_searches.updated_at IS 'Record last-update timestamp (UTC).';

-- ---------------- popular_topics ----------------
COMMENT ON TABLE  popular_topics            IS 'Popular topic chips shown in search/discovery surfaces.';
COMMENT ON COLUMN popular_topics.id         IS 'Stable topic identifier.';
COMMENT ON COLUMN popular_topics.title      IS 'Topic title.';
COMMENT ON COLUMN popular_topics.subtitle   IS 'Optional helper description.';
COMMENT ON COLUMN popular_topics.order_index IS 'Display order in topic lists.';
COMMENT ON COLUMN popular_topics.created_at IS 'Record creation timestamp (UTC).';
COMMENT ON COLUMN popular_topics.updated_at IS 'Record last-update timestamp (UTC).';

-- ---------------- content_screen_mock ----------------
COMMENT ON TABLE  content_screen_mock           IS 'JSON payload backing mock-only content screen extras.';
COMMENT ON COLUMN content_screen_mock.id        IS 'Singleton row key (always 1).';
COMMENT ON COLUMN content_screen_mock.payload   IS 'JSON object mirroring `content_screen_mock` from mock_data.json.';
COMMENT ON COLUMN content_screen_mock.updated_at IS 'Record last-update timestamp (UTC).';

-- ---------------- meta ----------------
COMMENT ON TABLE  meta                 IS 'Generic JSON metadata (fixture dataset metadata, versions, generators).';
COMMENT ON COLUMN meta.key             IS 'Metadata key.';
COMMENT ON COLUMN meta.value           IS 'Metadata JSON payload.';
COMMENT ON COLUMN meta.updated_at      IS 'Record last-update timestamp (UTC).';


-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
