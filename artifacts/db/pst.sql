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
-- FIX-4: Added 'pending' to receipt_status enum
CREATE TYPE receipt_status AS ENUM ('pending', 'verified', 'expired', 'refunded');

CREATE TYPE content_source_type AS ENUM (
    'journey-of-discoveries', 'universe-of-emotions', 'books', 'workshops'
);
-- FIX-8: Language-agnostic journey level codes
CREATE TYPE journey_level AS ENUM ('level_1', 'level_2', 'level_3', 'level_4', 'level_5');
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
CREATE TYPE workshop_asset_role AS ENUM (
    'source_document',
    'facilitator_guide',
    'participant_workbook',
    'worksheet',
    'slide_deck',
    'audio_practice',
    'video_lesson',
    'image',
    'attachment'
);
CREATE TYPE worksheet_type AS ENUM (
    'load_map', 'inner_sentence_shift', 'dua_card', 'trust_balance', 'transformation_plan'
);
CREATE TYPE workbook_entry_status AS ENUM ('draft', 'saved', 'submitted', 'archived');
CREATE TYPE followup_window_type AS ENUM ('h72', 'w3', 'd30');
CREATE TYPE followup_status AS ENUM ('planned', 'active', 'completed', 'missed');

CREATE TYPE asset_type AS ENUM (
    'ebook_package', 'worksheet_pdf', 'audio', 'video', 'image', 'document',
    'facilitator_guide', 'participant_workbook', 'slide_deck'
);
CREATE TYPE download_policy AS ENUM ('downloadable', 'streaming', 'premium');
CREATE TYPE download_status AS ENUM ('pending', 'in_progress', 'completed', 'failed', 'paused');

CREATE TYPE product_type AS ENUM ('journey', 'module', 'package', 'workshop', 'ebook');

CREATE TYPE asset_status AS ENUM ('pending', 'processing', 'ready', 'failed');

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


-- FIX-12: Use user_id as PK (drop separate id column and redundant index)
CREATE TABLE reminder_settings (
    user_id                     UUID        PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    daily_enabled               BOOLEAN     NOT NULL DEFAULT false,
    daily_time_local            TIME,
    workshop_followup_enabled   BOOLEAN     NOT NULL DEFAULT false,
    created_by                  UUID,
    updated_by                  UUID,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);


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


-- FIX-4: Default status changed to 'pending'
CREATE TABLE purchase_receipts (
    id                  UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id     UUID                 NOT NULL REFERENCES subscriptions (id),
    store_type          store_type           NOT NULL,
    external_receipt_id TEXT                 NOT NULL,
    verification_status verification_status  NOT NULL DEFAULT 'pending',
    status              receipt_status       NOT NULL DEFAULT 'pending',
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
    id              UUID                NOT NULL DEFAULT gen_random_uuid(),
    title           TEXT                NOT NULL,
    subtitle        TEXT,
    description     TEXT                NOT NULL DEFAULT '',
    icon            TEXT,
    accent_color    TEXT,
    content_source_type content_source_type NOT NULL,
    order_index     SMALLINT            NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);


-- FIX-6: Added DEFAULT gen_random_uuid() to content_series.id
CREATE TABLE content_series (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id       UUID        REFERENCES content_sources (id) ON DELETE RESTRICT,
    title           TEXT        NOT NULL,
    description     TEXT        NOT NULL DEFAULT '',
    order_index     SMALLINT    NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_series_source_id ON content_series (source_id);
CREATE INDEX idx_content_series_order     ON content_series (source_id, order_index);


CREATE TABLE content_items (
    id              UUID                NOT NULL DEFAULT gen_random_uuid(),
    source_id       UUID                REFERENCES content_sources (id) ON DELETE SET NULL,
    series_id       UUID                REFERENCES content_series (id) ON DELETE SET NULL,
    title           TEXT                NOT NULL,
    description     TEXT                NOT NULL DEFAULT '',
    order_index     SMALLINT            NOT NULL DEFAULT 0,
    release_date    DATE,
    language_code   language_code       NOT NULL DEFAULT 'tr',
    is_published    BOOLEAN             NOT NULL DEFAULT false,
    created_at      TIMESTAMPTZ         NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

CREATE INDEX idx_content_items_source_id     ON content_items (source_id);
CREATE INDEX idx_content_items_series_id     ON content_items (series_id);
CREATE INDEX idx_content_items_source_order  ON content_items (source_id, order_index);
CREATE INDEX idx_content_items_series_order  ON content_items (series_id, order_index);
CREATE INDEX idx_content_items_release_date  ON content_items (release_date);
CREATE INDEX idx_content_items_language_code ON content_items (language_code);
CREATE INDEX idx_content_items_published     ON content_items (is_published) WHERE is_published = true;


CREATE TABLE content_assets (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    content_item_id     UUID            NOT NULL REFERENCES content_items (id) ON DELETE CASCADE,
    asset_type          asset_type      NOT NULL,
    status              asset_status    NOT NULL DEFAULT 'pending',
    language_code       language_code,
    storage_uri         TEXT            NOT NULL,
    mime_type           TEXT            NOT NULL,
    byte_size           BIGINT          NOT NULL DEFAULT 0,
    duration_seconds    INTEGER,
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
-- SECTION 3A — MOBILE READ MODELS — CONTENT AREAS
-- FIX-2: Moved content_areas before content_products
-- FIX-14: Renamed camelCase columns (accentColor → accent_color, requiresSubscription → requires_subscription)
-- =============================================================================

CREATE TABLE content_areas (
    id                      UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    route                   TEXT        NOT NULL UNIQUE,
    label                   TEXT        NOT NULL,
    description             TEXT        NOT NULL DEFAULT '',
    icon                    TEXT        NOT NULL,
    suffix                  TEXT        NOT NULL DEFAULT '',
    accent_color            TEXT        NOT NULL,
    bg                      TEXT        NOT NULL,
    requires_subscription   BOOLEAN     NOT NULL DEFAULT false,
    show_in_dashboard       BOOLEAN     NOT NULL DEFAULT false,
    show_in_home_nav        BOOLEAN     NOT NULL DEFAULT false,
    order_index             SMALLINT    NOT NULL DEFAULT 0,
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- =============================================================================
-- SECTION 4 — CONTENT PRODUCTS (Phase 2 super table)
-- FIX-2: content_areas now exists above so the FK reference is valid
-- =============================================================================

CREATE TABLE content_products (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    product_type    product_type NOT NULL,
    area_id         UUID         REFERENCES content_areas (id) ON DELETE SET NULL,
    is_published    BOOLEAN      NOT NULL DEFAULT false,
    order_index     SMALLINT     NOT NULL DEFAULT 0,
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_content_products_area ON content_products (area_id);
CREATE INDEX idx_content_products_type ON content_products (product_type);


-- =============================================================================
-- SECTION 5 — JOURNEYS
-- FIX-8: journey_level enum uses language-agnostic codes; default updated
-- =============================================================================

CREATE TABLE journeys (
    id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id      UUID          NOT NULL REFERENCES content_products (id) ON DELETE CASCADE,
    title           TEXT          NOT NULL,
    description     TEXT,
    duration_days   SMALLINT      CHECK (duration_days > 0),
    level           journey_level NOT NULL DEFAULT 'level_1',
    outline_steps   JSONB         NOT NULL DEFAULT '[]',
    benefits        JSONB         NOT NULL DEFAULT '[]',
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_journeys_level ON journeys (level);


CREATE TABLE journey_days (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id      UUID        NOT NULL REFERENCES journeys (id) ON DELETE CASCADE,
    day_number      SMALLINT    NOT NULL CHECK (day_number >= 1),
    title           TEXT,
    unlock_time_local TIME,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (journey_id, day_number)
);

CREATE INDEX idx_journey_days_journey ON journey_days (journey_id);


CREATE TABLE journey_items (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id      UUID         NOT NULL REFERENCES journeys (id) ON DELETE CASCADE,
    content_item_id UUID         NOT NULL REFERENCES content_items (id) ON DELETE RESTRICT,
    order_index     SMALLINT     NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    UNIQUE (journey_id, content_item_id)
);

CREATE INDEX idx_journey_items_journey ON journey_items (journey_id);
CREATE INDEX idx_journey_items_order   ON journey_items (journey_id, order_index);


-- =============================================================================
-- SECTION 6 — MODULES & PACKAGES
-- =============================================================================

CREATE TABLE modules (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  UUID        NOT NULL REFERENCES content_products (id) ON DELETE CASCADE,
    title       TEXT        NOT NULL,
    description TEXT,
    created_by  UUID,
    updated_by  UUID,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);


CREATE TABLE packages (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id  UUID        NOT NULL REFERENCES content_products (id) ON DELETE CASCADE,
    module_id   UUID        NOT NULL REFERENCES modules (id) ON DELETE CASCADE,
    title       TEXT        NOT NULL,
    order_index SMALLINT    NOT NULL DEFAULT 0,
    created_by  UUID,
    updated_by  UUID,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_packages_module ON packages (module_id);
CREATE INDEX idx_packages_order  ON packages (module_id, order_index);


CREATE TABLE package_items (
    id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    package_id      UUID        NOT NULL REFERENCES packages (id) ON DELETE CASCADE,
    content_item_id UUID        NOT NULL REFERENCES content_items (id) ON DELETE RESTRICT,
    order_index     SMALLINT    NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (package_id, content_item_id)
);

CREATE INDEX idx_package_items_package ON package_items (package_id);
CREATE INDEX idx_package_items_order   ON package_items (package_id, order_index);


-- =============================================================================
-- SECTION 7 — WORKSHOPS
-- FIX-5: Removed featured_workshop_ids JSONB from workshop_groups
-- =============================================================================

CREATE TABLE workshop_groups (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    code                TEXT        NOT NULL UNIQUE,
    title               TEXT        NOT NULL,
    description         TEXT        NOT NULL DEFAULT '',
    order_index         SMALLINT    NOT NULL DEFAULT 0,
    target_audiences    JSONB       NOT NULL DEFAULT '[]',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE workshops (
    id                            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id                    UUID          NOT NULL REFERENCES content_products (id) ON DELETE CASCADE,
    title                         TEXT          NOT NULL,
    description                   TEXT,
    theme                         TEXT          NOT NULL,
    target_audience               TEXT          NOT NULL DEFAULT '18+',
    total_duration_minutes        INTEGER       CHECK (total_duration_minutes > 0),
    delivery_mode                 delivery_mode NOT NULL,
    workshop_group_id             UUID          REFERENCES workshop_groups (id) ON DELETE SET NULL,
    source_document_asset_id      UUID          REFERENCES content_assets (id) ON DELETE SET NULL,
    facilitator_guide_asset_id    UUID          REFERENCES content_assets (id) ON DELETE SET NULL,
    participant_workbook_asset_id UUID          REFERENCES content_assets (id) ON DELETE SET NULL,
    created_by                    UUID,
    updated_by                    UUID,
    created_at                    TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at                    TIMESTAMPTZ   NOT NULL DEFAULT now()
);

CREATE INDEX idx_workshops_group_id      ON workshops (workshop_group_id);
CREATE INDEX idx_workshops_delivery_mode ON workshops (delivery_mode);
CREATE INDEX idx_workshops_source_document_asset ON workshops (source_document_asset_id) WHERE source_document_asset_id IS NOT NULL;


-- FIX-5: Junction table replacing featured_workshop_ids JSONB
-- Kept after workshops so the FK can be created in a clean schema load.
CREATE TABLE workshop_group_featured (
    id                 UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_group_id  UUID        NOT NULL REFERENCES workshop_groups(id) ON DELETE CASCADE,
    workshop_id        UUID        NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
    order_index        SMALLINT    NOT NULL DEFAULT 0,
    created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (workshop_group_id, workshop_id)
);
CREATE INDEX idx_workshop_group_featured_group ON workshop_group_featured (workshop_group_id);


CREATE TABLE workshop_stages (
    id               UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id      UUID                 NOT NULL REFERENCES workshops (id) ON DELETE CASCADE,
    content_item_id  UUID                 REFERENCES content_items (id) ON DELETE SET NULL,
    primary_asset_id UUID                 REFERENCES content_assets (id) ON DELETE SET NULL,
    stage_number     SMALLINT             NOT NULL CHECK (stage_number >= 1),
    stage_type       workshop_stage_type  NOT NULL,
    title            TEXT                 NOT NULL,
    summary          TEXT,
    created_by       UUID,
    updated_by       UUID,
    created_at       TIMESTAMPTZ          NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ          NOT NULL DEFAULT now(),
    UNIQUE (workshop_id, stage_number)
);

CREATE INDEX idx_workshop_stages_workshop ON workshop_stages (workshop_id);
CREATE INDEX idx_workshop_stages_content_item ON workshop_stages (content_item_id);
CREATE INDEX idx_workshop_stages_primary_asset ON workshop_stages (primary_asset_id) WHERE primary_asset_id IS NOT NULL;


CREATE TABLE workshop_sessions (
    id                  UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_stage_id   UUID         NOT NULL REFERENCES workshop_stages (id) ON DELETE CASCADE,
    content_item_id     UUID         REFERENCES content_items (id) ON DELETE SET NULL,
    primary_asset_id    UUID         REFERENCES content_assets (id) ON DELETE SET NULL,
    title               TEXT,
    day_index           SMALLINT,
    slot                session_slot,
    duration_minutes    SMALLINT     CHECK (duration_minutes > 0),
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX idx_workshop_sessions_stage ON workshop_sessions (workshop_stage_id);
CREATE INDEX idx_workshop_sessions_content_item ON workshop_sessions (content_item_id);
CREATE INDEX idx_workshop_sessions_primary_asset ON workshop_sessions (primary_asset_id) WHERE primary_asset_id IS NOT NULL;


-- FIX-3: parent_id made nullable self-reference (removed NOT NULL)
CREATE TABLE workshop_content_blocks (
    id                  UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_stage_id   UUID                 NOT NULL REFERENCES workshop_stages (id) ON DELETE CASCADE,
    workshop_session_id UUID                 REFERENCES workshop_sessions (id) ON DELETE CASCADE,
    content_item_id     UUID                 REFERENCES content_items (id) ON DELETE SET NULL,
    asset_id            UUID                 REFERENCES content_assets (id) ON DELETE SET NULL,
    parent_id           UUID                 REFERENCES workshop_content_blocks(id) ON DELETE CASCADE,
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
CREATE INDEX idx_workshop_content_blocks_session     ON workshop_content_blocks (workshop_session_id);
CREATE INDEX idx_workshop_content_blocks_content_item ON workshop_content_blocks (content_item_id);
CREATE INDEX idx_workshop_content_blocks_asset       ON workshop_content_blocks (asset_id);
CREATE INDEX idx_workshop_content_blocks_order       ON workshop_content_blocks (workshop_stage_id, order_index);

-- FIX-7: _content_blocks zombie table removed

-- FIX-15: Added asset_id column to workshop_artifacts
CREATE TABLE workshop_artifacts (
    id              UUID                    PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id     UUID                    NOT NULL REFERENCES workshops (id) ON DELETE CASCADE,
    content_item_id UUID                    REFERENCES content_items (id) ON DELETE SET NULL,
    artifact_type   workshop_artifact_type  NOT NULL,
    title           TEXT,
    version         SMALLINT                NOT NULL DEFAULT 1,
    asset_id        UUID                    REFERENCES content_assets(id) ON DELETE SET NULL,
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ             NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ             NOT NULL DEFAULT now()
);

CREATE INDEX idx_workshop_artifacts_workshop ON workshop_artifacts (workshop_id);
CREATE INDEX idx_workshop_artifacts_content_item ON workshop_artifacts (content_item_id);
CREATE INDEX idx_workshop_artifacts_asset ON workshop_artifacts (asset_id);


CREATE TABLE workshop_asset_links (
    id                  UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id         UUID                NOT NULL REFERENCES workshops (id) ON DELETE CASCADE,
    workshop_stage_id   UUID                REFERENCES workshop_stages (id) ON DELETE CASCADE,
    workshop_session_id UUID                REFERENCES workshop_sessions (id) ON DELETE CASCADE,
    content_block_id    UUID                REFERENCES workshop_content_blocks (id) ON DELETE CASCADE,
    workshop_artifact_id UUID              REFERENCES workshop_artifacts (id) ON DELETE CASCADE,
    content_item_id     UUID                REFERENCES content_items (id) ON DELETE SET NULL,
    asset_id            UUID                NOT NULL REFERENCES content_assets (id) ON DELETE CASCADE,
    asset_role          workshop_asset_role NOT NULL,
    label               TEXT,
    order_index         SMALLINT            NOT NULL DEFAULT 0,
    created_by          UUID,
    updated_by          UUID,
    created_at          TIMESTAMPTZ         NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ         NOT NULL DEFAULT now(),
    CHECK (
        num_nonnulls(workshop_stage_id, workshop_session_id, content_block_id, workshop_artifact_id) <= 1
    )
);

CREATE INDEX idx_workshop_asset_links_workshop ON workshop_asset_links (workshop_id, asset_role, order_index);
CREATE INDEX idx_workshop_asset_links_stage ON workshop_asset_links (workshop_stage_id) WHERE workshop_stage_id IS NOT NULL;
CREATE INDEX idx_workshop_asset_links_session ON workshop_asset_links (workshop_session_id) WHERE workshop_session_id IS NOT NULL;
CREATE INDEX idx_workshop_asset_links_block ON workshop_asset_links (content_block_id) WHERE content_block_id IS NOT NULL;
CREATE INDEX idx_workshop_asset_links_artifact ON workshop_asset_links (workshop_artifact_id) WHERE workshop_artifact_id IS NOT NULL;
CREATE INDEX idx_workshop_asset_links_content_item ON workshop_asset_links (content_item_id) WHERE content_item_id IS NOT NULL;
CREATE INDEX idx_workshop_asset_links_asset ON workshop_asset_links (asset_id);


-- FIX-11: Removed redundant workshop_id column from workbook_entries
CREATE TABLE workbook_entries (
    id              UUID                   PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID                   NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    stage_id        UUID                   NOT NULL REFERENCES workshop_stages (id),
    session_id      UUID                   REFERENCES workshop_sessions (id) ON DELETE SET NULL,
    worksheet_type  worksheet_type         NOT NULL,
    payload         JSONB                  NOT NULL DEFAULT '{}',
    status          workbook_entry_status  NOT NULL DEFAULT 'draft',
    version         SMALLINT               NOT NULL DEFAULT 1,
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ            NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ            NOT NULL DEFAULT now()
);

CREATE INDEX idx_workbook_entries_user_id  ON workbook_entries (user_id);
CREATE INDEX idx_workbook_entries_stage    ON workbook_entries (stage_id);


CREATE TABLE workshop_followup_plans (
    id              UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID                 NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    workshop_id     UUID                 NOT NULL REFERENCES workshops (id) ON DELETE CASCADE,
    window_type     followup_window_type NOT NULL,
    intent_text     TEXT,
    daily_phrase    TEXT,
    small_step      TEXT,
    status          followup_status      NOT NULL DEFAULT 'planned',
    created_by      UUID,
    updated_by      UUID,
    created_at      TIMESTAMPTZ          NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ          NOT NULL DEFAULT now(),
    UNIQUE (user_id, workshop_id, window_type)
);

CREATE INDEX idx_workshop_followup_user_id  ON workshop_followup_plans (user_id);
CREATE INDEX idx_workshop_followup_workshop ON workshop_followup_plans (workshop_id);


-- =============================================================================
-- SECTION 8 — EBOOKS
-- =============================================================================

CREATE TABLE ebooks (
    id                          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id                  UUID        NOT NULL REFERENCES content_products (id) ON DELETE CASCADE,
    content_item_id             UUID        REFERENCES content_items (id) ON DELETE SET NULL,
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
    id                UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    ebook_id          UUID        NOT NULL REFERENCES ebooks (id) ON DELETE CASCADE,
    title             TEXT        NOT NULL,
    order_index       SMALLINT    NOT NULL DEFAULT 0,
    parent_chapter_id UUID        REFERENCES ebook_chapters (id) ON DELETE SET NULL,
    start_locator     TEXT,
    end_locator       TEXT,
    created_by        UUID,
    updated_by        UUID,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ebook_chapters_ebook  ON ebook_chapters (ebook_id);
CREATE INDEX idx_ebook_chapters_parent ON ebook_chapters (parent_chapter_id);
CREATE INDEX idx_ebook_chapters_order  ON ebook_chapters (ebook_id, order_index);


-- =============================================================================
-- SECTION 9 — USER PROGRESS & ENGAGEMENT
-- FIX-9: Added target_id nullable column and updated UNIQUE constraint
-- =============================================================================

CREATE TABLE content_progress (
    id               UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID                  NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    target_type      progress_target_type  NOT NULL,
    target_id        UUID,
    product_id       UUID                  NOT NULL REFERENCES content_products (id) ON DELETE CASCADE,
    status           progress_status       NOT NULL DEFAULT 'locked',
    progress_percent SMALLINT              NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    started_at       TIMESTAMPTZ,
    completed_at     TIMESTAMPTZ,
    created_by       UUID,
    updated_by       UUID,
    created_at       TIMESTAMPTZ           NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ           NOT NULL DEFAULT now(),
    UNIQUE (user_id, product_id, target_type, target_id)
);

CREATE INDEX idx_content_progress_user_id    ON content_progress (user_id);
CREATE INDEX idx_content_progress_product    ON content_progress (product_id);
CREATE INDEX idx_content_progress_status     ON content_progress (status);
CREATE INDEX idx_content_progress_user_status ON content_progress (user_id, status);


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


-- FIX-10: Replaced simple num_nonnulls check with source_type-aware CASE check
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
        CASE source_type
            WHEN 'highlight' THEN highlight_ref_id IS NOT NULL AND content_item_ref_id IS NULL AND note_ref_id IS NULL
            WHEN 'note'      THEN note_ref_id IS NOT NULL AND content_item_ref_id IS NULL AND highlight_ref_id IS NULL
            ELSE                  content_item_ref_id IS NOT NULL AND highlight_ref_id IS NULL AND note_ref_id IS NULL
        END
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
-- SECTION 10 — READING & DOWNLOADS
-- =============================================================================

CREATE TABLE reading_positions (
    id               UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID          NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    ebook_id         UUID          NOT NULL REFERENCES ebooks (id) ON DELETE CASCADE,
    progress_percent SMALLINT      NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    locator_type     locator_type  NOT NULL DEFAULT 'page',
    locator_value    TEXT          NOT NULL,
    last_read_at     TIMESTAMPTZ   NOT NULL DEFAULT now(),
    created_by       UUID,
    updated_by       UUID,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT now(),
    UNIQUE (user_id, ebook_id)
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
-- SECTION 10B — GAMIFICATION
-- (renamed from duplicate SECTION 10 header)
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
-- Note: content_areas moved to SECTION 3A (FIX-2)
-- =============================================================================

CREATE TABLE reminder_time_slots (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    label       TEXT        NOT NULL UNIQUE,
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
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    code        TEXT        NOT NULL UNIQUE,
    title       TEXT        NOT NULL,
    subtitle    TEXT,
    order_index SMALLINT    NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE content_screen_mock (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- FIX-13: Sync title/description back to content_items when domain tables change
CREATE OR REPLACE FUNCTION sync_content_item_meta()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    UPDATE content_items
    SET title       = NEW.title,
        description = COALESCE(NEW.description, ''),
        updated_at  = now()
    WHERE id = NEW.content_item_id
      AND NEW.content_item_id IS NOT NULL;
    RETURN NEW;
END;
$$;

CREATE TRIGGER trg_ebooks_sync_meta
    AFTER INSERT OR UPDATE OF title ON ebooks
    FOR EACH ROW EXECUTE FUNCTION sync_content_item_meta();


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
COMMENT ON COLUMN reminder_settings.user_id                   IS 'Primary key — one-to-one FK to users.';
COMMENT ON COLUMN reminder_settings.daily_enabled             IS 'Whether the daily reminder push notification is active.';
COMMENT ON COLUMN reminder_settings.daily_time_local          IS 'Local time-of-day for the daily reminder (device timezone).';
COMMENT ON COLUMN reminder_settings.workshop_followup_enabled IS 'Whether workshop follow-up push notifications are active.';
