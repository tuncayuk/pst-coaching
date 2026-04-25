-- =============================================================================
-- PST Coaching — Seed Data (from artifacts/mock/mock_data.json)
-- Version: 4.0.0
-- Generated: 2026-04-20
-- Run after: pst.sql
-- =============================================================================

-- =============================================================================
-- SECTION 1 — USERS
-- =============================================================================

INSERT INTO users (id, email, external_auth_id, auth_provider, role, language_code, created_by, updated_by, created_at, updated_at) VALUES
    ('11111111-1111-1111-1111-111111111111', 'demo@pstcoaching.app',     NULL, 'password', 'plan_owner', 'tr', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'member@pstcoaching.app',   NULL, 'password', 'member',     'en', NULL, NULL, '2025-12-10T10:00:00Z', '2025-12-10T10:00:00Z'),
    ('99990000-0000-0000-0000-000000000000', 'inactive@pstcoaching.app', NULL, 'password', 'member',     'es', NULL, NULL, '2025-11-01T09:00:00Z', '2025-11-01T09:00:00Z'),
    ('c0ac0ac0-0000-0000-0000-000000000001', 'coach@pstcoaching.app',    NULL, 'password', 'coach',      'tr', NULL, NULL, '2025-11-01T09:00:00Z', '2025-11-01T09:00:00Z');


-- =============================================================================
-- SECTION 2 — USER SESSIONS
-- =============================================================================

INSERT INTO user_sessions (id, user_id, expires_at, last_active_at, created_by, updated_by, created_at, updated_at) VALUES
    ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '2026-02-01T10:00:00Z', '2026-01-12T08:55:00Z', NULL, NULL, '2026-01-12T08:00:00Z', '2026-01-12T08:55:00Z'),
    ('aaaaaaaa-2222-3333-4444-555555555555', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', '2026-02-01T10:00:00Z', '2026-01-12T09:10:00Z', NULL, NULL, '2026-01-12T09:00:00Z', '2026-01-12T09:10:00Z');


-- =============================================================================
-- SECTION 3 — ACCESSIBILITY SETTINGS
-- =============================================================================

INSERT INTO accessibility_settings (user_id, text_scale, high_contrast, reduce_motion, theme, created_by, updated_by, created_at, updated_at) VALUES
    ('11111111-1111-1111-1111-111111111111', 1.0, false, false, 'system', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 4 — READING SETTINGS
-- =============================================================================

INSERT INTO reading_settings (user_id, font_scale, line_spacing, background_mode, created_by, updated_by, created_at, updated_at) VALUES
    ('11111111-1111-1111-1111-111111111111', 1.0, 1.5, 'white', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 5 — REMINDER SETTINGS
-- =============================================================================

INSERT INTO reminder_settings (id, user_id, daily_enabled, daily_time_local, workshop_followup_enabled, created_by, updated_by, created_at, updated_at) VALUES
    ('rs000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', true, '20:00:00', false, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 6 — SUBSCRIPTION PLANS
-- =============================================================================

INSERT INTO subscription_plans (id, plan_type, name, seat_limit, student_discount_eligible, created_by, updated_by, created_at, updated_at) VALUES
    ('33333333-3333-3333-3333-333333333333', 'individual', 'PST Premium',      1, true,  NULL, NULL, '2025-01-01T00:00:00Z', '2025-01-01T00:00:00Z'),
    ('bbbbbbbb-3333-4444-5555-666666666666', 'family',     'PST Aile Paketi',  5, false, NULL, NULL, '2025-01-01T00:00:00Z', '2025-01-01T00:00:00Z');


-- =============================================================================
-- SECTION 7 — SUBSCRIPTIONS
-- =============================================================================

INSERT INTO subscriptions (id, owner_user_id, plan_id, status, renewal_at, period_end_at, created_by, updated_by, created_at, updated_at) VALUES
    ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'active',   '2026-01-15T10:00:00Z', NULL,                   NULL, NULL, '2025-12-15T10:00:00Z', '2025-12-15T10:00:00Z'),
    ('cccccccc-4444-5555-6666-777777777777', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'bbbbbbbb-3333-4444-5555-666666666666', 'trial',    '2026-02-01T10:00:00Z', NULL,                   NULL, NULL, '2026-01-01T10:00:00Z', '2026-01-01T10:00:00Z'),
    ('dddddddd-5555-6666-7777-888888888888', '99990000-0000-0000-0000-000000000000', '33333333-3333-3333-3333-333333333333', 'canceled', NULL,                   '2025-12-01T10:00:00Z', NULL, NULL, '2025-09-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 8 — SUBSCRIPTION ADD-ONS
-- =============================================================================

INSERT INTO subscription_addons (id, subscription_id, addon_type, status, created_by, updated_by, created_at, updated_at) VALUES
    ('66666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'coaching_school',  'active', NULL, NULL, '2025-12-20T10:00:00Z', '2025-12-20T10:00:00Z'),
    ('77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'ebook_unlimited',  'active', NULL, NULL, '2025-12-20T10:00:00Z', '2025-12-20T10:00:00Z');


-- =============================================================================
-- SECTION 9 — SEATS
-- Note: mock uses status='assigned'; schema enum includes 'assigned' via open/invited/active mapping.
-- Using 'active' as the closest valid enum value for assigned seats.
-- =============================================================================

INSERT INTO seats (id, subscription_id, assigned_user_id, status, created_by, updated_by, created_at, updated_at) VALUES
    ('77777777-7777-7777-7777-777777777778', '44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'active',    NULL, NULL, '2025-12-15T10:00:00Z', '2025-12-15T10:00:00Z'),
    ('abababab-abab-abab-abab-abababababab', 'cccccccc-4444-5555-6666-777777777777', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'active',    NULL, NULL, '2026-01-01T10:00:00Z', '2026-01-01T10:00:00Z'),
    ('bcbcbcbc-bcbc-bcbc-bcbc-bcbcbcbcbcbc', 'cccccccc-4444-5555-6666-777777777777', NULL,                                  'available', NULL, NULL, '2026-01-01T10:00:00Z', '2026-01-01T10:00:00Z');


-- =============================================================================
-- SECTION 10 — PURCHASE RECEIPTS
-- =============================================================================

INSERT INTO purchase_receipts (id, subscription_id, store_type, external_receipt_id, verification_status, status, payload, amount, currency, purchased_at, verified_at, created_by, updated_by, created_at, updated_at) VALUES
    ('99999999-9999-9999-9999-999999999999', '44444444-4444-4444-4444-444444444444', 'apple', 'mock-tx-001', 'verified', 'verified', '{}', 149.99, 'TRY', '2025-12-15T10:00:00Z', '2025-12-15T10:00:00Z', NULL, NULL, '2025-12-15T10:00:00Z', '2025-12-15T10:00:00Z');


-- =============================================================================
-- SECTION 11 — CONTENT SOURCES
-- =============================================================================

INSERT INTO content_sources (id, title, subtitle, description, icon, accent_color, content_type, catalog_screen, order_index, created_at, updated_at) VALUES
    ('src-kesifler-yolculugu', 'Kesifler Yolculugu',  'Ic dünyanizi kesfedecegiz bir adim',        'Kesifler Yolculugu, ruhi ve manevi uyanis yolculuklarinin kapsamli bir koleksiyonudur.',         'compass-outline',        '#6366F1', 'journey',  'DiscoverJourneys',   1, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('src-duygular-evreni',    'Duygular Evreni',     'Duygusal dünyanizi anlayip dönüsturun',      'Duygular Evreni, insanin ic dünyasinin en derin ve en guclu boyutunu kesfetmek icin tasarlanmis.', 'heart-outline',          '#EC4899', 'module',   'DiscoverModules',    2, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('src-kitaplar',           'Kitaplar',            'Uzman yazarlardan seckin e-kitaplar',        'Kitaplar, PST Coaching platformunun zengin dijital kutuphanesidir.',                              'book-outline',           '#F59E0B', 'ebook',    'DiscoverEbooks',     3, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('src-atolyeler',          'Atolyeler',           'Pratik ve etkilesimli atolye deneyimleri',  'Atolyeler, PST Coaching''in en guclu ve etkilesimli icerik deneyimlerini bir araya getirir.',    'account-group-outline',  '#10B981', 'workshop', 'DiscoverWorkshops',  4, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 12 — CONTENT ITEMS
-- =============================================================================

INSERT INTO content_items (id, entity_type, source_id, language_code, is_published, created_at, updated_at) VALUES
    -- Journeys
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'journey',  'src-kesifler-yolculugu', 'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000001', 'journey',  'src-kesifler-yolculugu', 'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000002', 'journey',  'src-kesifler-yolculugu', 'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000003', 'journey',  'src-kesifler-yolculugu', 'en', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000004', 'journey',  'src-kesifler-yolculugu', 'es', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Modules
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000001', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000002', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000003', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000004', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000005', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000006', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000007', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000008', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000009', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000010', 'module',   'src-duygular-evreni',    'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Workshops (25 items: eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee + 00..24)
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000000', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000001', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000002', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000003', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000004', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000005', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000006', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000007', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000008', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000009', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000010', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000011', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000012', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000013', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000014', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000015', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000016', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000017', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000018', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000019', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000020', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000021', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000022', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000023', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000024', 'workshop', 'src-atolyeler',          'tr', true, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    -- Ebooks
    ('eeeeeeee-1111-2222-3333-444444444444', 'ebook',    'src-kitaplar',           'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('eeeeeeee-5555-6666-7777-888888888888', 'ebook',    'src-kitaplar',           'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('eeeeeeee-9999-aaaa-bbbb-cccccccccccc', 'ebook',    'src-kitaplar',           'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('eeeeeeee-dddd-eeee-ffff-000000000000', 'ebook',    'src-kitaplar',           'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'ebook',    'src-kitaplar',           'tr', true, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 13 — CONTENT ASSETS
-- =============================================================================

INSERT INTO content_assets (id, content_item_id, asset_type, storage_uri, mime_type, byte_size, checksum, download_policy, created_by, updated_by, created_at, updated_at) VALUES
    ('a0000000-0000-0000-0000-000000000001', 'ffffffff-ffff-ffff-ffff-ffffffffffff',   'ebook_package',  's3://pst/mock/ebooks/icsel-huzur-rehberi-package.epub',   'application/epub+zip', 5242880,  'sha256:mock-ebook-package',     'downloadable', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('a0000000-0000-0000-0000-000000000002', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'worksheet_pdf',  's3://pst/mock/workshops/mutlak-muhtaclik-workbook.pdf',   'application/pdf',      10485760, 'sha256:mock-workshop-workbook',  'downloadable', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 14 — JOURNEYS
-- =============================================================================

INSERT INTO journeys (content_item_id, title, description, duration_days, level, outline_steps, benefits, created_by, updated_by, created_at, updated_at) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Farkindalik Yolculugu',    'Ic sesini guclendir ve degerlerinle uyumlu kararlar al.', 14, 'baslangic',
        '[{"title":"Vicdani Tanimak","duration":"12 dk"},{"title":"Sefkatli Sinirlar","duration":"18 dk"},{"title":"Gunluk Uygulama","duration":"10 dk"}]',
        '["Gunluk kararlarda tutarlilik","Oz sefkatle sinir koyma","Deger odakli eylem plani"]',
        NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000001', 'Huzur ve Oz-Kabul',       NULL, 7,  'baslangic', '[]', '[]', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000002', 'Derin Donusum',           NULL, 21, 'orta',      '[]', '[]', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000003', 'Oz-Kesfetme',             NULL, 5,  'baslangic', '[]', '[]', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('abababab-0000-0000-0000-000000000004', 'Baslangiç Yolculugu',     NULL, 7,  'baslangic', '[]', '[]', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 15 — MODULES
-- =============================================================================

INSERT INTO modules (content_item_id, title, description, created_by, updated_by, created_at, updated_at) VALUES
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Oz-Farkindalik',             'Ozfarkindalik becerilerini guclendiren paketler.',          NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000001', 'Duygusal Farkindalik',       'Duygusal farkindalik ve ifade becerileri.',                 NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000002', 'Sukur Pratikleri',           'Sukur pratikleriyle guc kazanma.',                         NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000003', 'Empati Temelli Iletisim',    'Empati temelli iletisim stratejileri.',                    NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000004', 'Odaklanma ve Planlama',      'Gunu planlama ve odaklanma aliskanliklari.',                NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000005', 'Sinir Belirleme',            'Hayir diyebilme ve sinir belirleme.',                      NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000006', 'Nefes ve Mindfulness',       'Nefes ve anda kalma uygulamalari.',                        NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000007', 'Hedef Netlestirme',          'Hedef netlestirme ve motivasyon artirma.',                 NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000008', 'Zorluklara Karsi Direnc',    'Zorluklara karsi guclu kalma teknikleri.',                 NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000009', 'Stres Azaltma',              'Stresi azaltan gunluk rutinler.',                          NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('cccccccc-0000-0000-0000-000000000010', 'Oz-Sefkat ve Kabul',         'Kendine nazik yaklasim ve kabul pratikleri.',              NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 16 — PACKAGES
-- =============================================================================

INSERT INTO packages (id, module_content_item_id, title, order_index, source_content_item_id, source_domain_type, created_by, updated_by, created_at, updated_at) VALUES
    -- Oz-Farkindalik (cccccccc-cccc-cccc-cccc-cccccccccccc)
    ('dddddddd-0000-0000-0000-000000000001', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Paket 1: Farkindaligin Temelleri',   1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('dddddddd-0000-0000-0000-000000000002', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Paket 2: Duygulari Tanimak',         2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('dddddddd-0000-0000-0000-000000000003', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Paket 3: Dusunce Kaliplari',         3, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('dddddddd-0000-0000-0000-000000000004', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'Paket 4: Degisim Yolculugu',         4, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Duygusal Farkindalik (cccccccc-0000-0000-0000-000000000001)
    ('pkg-0001-01', 'cccccccc-0000-0000-0000-000000000001', 'Paket 1: Duygular Evreni Temel 1', 1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0001-02', 'cccccccc-0000-0000-0000-000000000001', 'Paket 2: Duygular Evreni Temel 2', 2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Sukur Pratikleri (cccccccc-0000-0000-0000-000000000002)
    ('pkg-0002-01', 'cccccccc-0000-0000-0000-000000000002', 'Paket 1: Sukrun Gucu Temel 1',     1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0002-02', 'cccccccc-0000-0000-0000-000000000002', 'Paket 2: Sukrun Gucu Temel 2',     2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Empati Temelli Iletisim (cccccccc-0000-0000-0000-000000000003)
    ('pkg-0003-01', 'cccccccc-0000-0000-0000-000000000003', 'Paket 1: Iletisim ve Empati Temel 1', 1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0003-02', 'cccccccc-0000-0000-0000-000000000003', 'Paket 2: Iletisim ve Empati Temel 2', 2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Odaklanma ve Planlama (cccccccc-0000-0000-0000-000000000004)
    ('pkg-0004-01', 'cccccccc-0000-0000-0000-000000000004', 'Paket 1: Odak ve Disiplin Temel 1',   1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0004-02', 'cccccccc-0000-0000-0000-000000000004', 'Paket 2: Odak ve Disiplin Temel 2',   2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Sinir Belirleme (cccccccc-0000-0000-0000-000000000005)
    ('pkg-0005-01', 'cccccccc-0000-0000-0000-000000000005', 'Paket 1: Saglikli Sinirlar Temel 1',  1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0005-02', 'cccccccc-0000-0000-0000-000000000005', 'Paket 2: Saglikli Sinirlar Temel 2',  2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Nefes ve Mindfulness (cccccccc-0000-0000-0000-000000000006)
    ('pkg-0006-01', 'cccccccc-0000-0000-0000-000000000006', 'Paket 1: Mindfulness Baslangic Temel 1', 1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0006-02', 'cccccccc-0000-0000-0000-000000000006', 'Paket 2: Mindfulness Baslangic Temel 2', 2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Hedef Netlestirme (cccccccc-0000-0000-0000-000000000007)
    ('pkg-0007-01', 'cccccccc-0000-0000-0000-000000000007', 'Paket 1: Motivasyon ve Hedef Temel 1',   1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0007-02', 'cccccccc-0000-0000-0000-000000000007', 'Paket 2: Motivasyon ve Hedef Temel 2',   2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Zorluklara Karsi Direnc (cccccccc-0000-0000-0000-000000000008)
    ('pkg-0008-01', 'cccccccc-0000-0000-0000-000000000008', 'Paket 1: Duygusal Dayaniklilik Temel 1', 1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0008-02', 'cccccccc-0000-0000-0000-000000000008', 'Paket 2: Duygusal Dayaniklilik Temel 2', 2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Stres Azaltma (cccccccc-0000-0000-0000-000000000009)
    ('pkg-0009-01', 'cccccccc-0000-0000-0000-000000000009', 'Paket 1: Sakinlik ve Denge Temel 1', 1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0009-02', 'cccccccc-0000-0000-0000-000000000009', 'Paket 2: Sakinlik ve Denge Temel 2', 2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    -- Oz-Sefkat ve Kabul (cccccccc-0000-0000-0000-000000000010)
    ('pkg-0010-01', 'cccccccc-0000-0000-0000-000000000010', 'Paket 1: Oz Sefkat Temel 1', 1, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('pkg-0010-02', 'cccccccc-0000-0000-0000-000000000010', 'Paket 2: Oz Sefkat Temel 2', 2, '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 17 — WORKSHOP GROUPS
-- =============================================================================

INSERT INTO workshop_groups (id, title, description, order_index, target_audiences, featured_workshop_ids, created_at, updated_at) VALUES
    ('wg-manevi-derinlesme', 'Manevi Derinlesme',  'Dua, teslimiyet ve icsel farkindalik odakli uzun sureli atolyeler.', 1,
        '["18+","25+"]',
        '["eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee","eeeeeeee-0000-0000-0000-000000000003","eeeeeeee-0000-0000-0000-000000000024"]',
        '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('wg-duygusal-denge',    'Duygusal Denge',     'Ofke, korku, yas ve oz-sefkat temali donusum atolyeleri.',           2,
        '["18+"]',
        '["eeeeeeee-0000-0000-0000-000000000006","eeeeeeee-0000-0000-0000-000000000011","eeeeeeee-0000-0000-0000-000000000020"]',
        '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('wg-iliskiler-aile',    'Iliskiler ve Aile',  'Aile ici iletisim, es iliskisi ve bag kurma odakli atolyeler.',      3,
        '["Aile","Cift","18+"]',
        '["eeeeeeee-0000-0000-0000-000000000010","eeeeeeee-0000-0000-0000-000000000015","eeeeeeee-0000-0000-0000-000000000014"]',
        '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('wg-genc-ve-egitim',    'Genc ve Egitim',     'Ergenlik, kimlik gelisimi ve aidiyet sureclerine odakli atolyeler.', 4,
        '["14-18","18+"]',
        '["eeeeeeee-0000-0000-0000-000000000016","eeeeeeee-0000-0000-0000-000000000009","eeeeeeee-0000-0000-0000-000000000001"]',
        '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('wg-yasam-becerileri',  'Yasam Becerileri',   'Sinir koyma, odaklanma, zaman ve rutin yonetimi atolyeleri.',        5,
        '["18+"]',
        '["eeeeeeee-0000-0000-0000-000000000007","eeeeeeee-0000-0000-0000-000000000013","eeeeeeee-0000-0000-0000-000000000023"]',
        '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('wg-profesyonel-hayat', 'Profesyonel Hayat',  'Liderlik, motivasyon ve sorumluluk gelistiren atolyeler.',           6,
        '["25+","18+"]',
        '["eeeeeeee-0000-0000-0000-000000000017","eeeeeeee-0000-0000-0000-000000000012","eeeeeeee-0000-0000-0000-000000000021"]',
        '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z');


-- =============================================================================
-- SECTION 18 — WORKSHOPS
-- =============================================================================

INSERT INTO workshops (content_item_id, title, theme, target_audience, total_duration_minutes, delivery_mode, workshop_group_id, facilitator_guide_asset_id, participant_workbook_asset_id, created_by, updated_by, created_at, updated_at) VALUES
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Mutlak Muhtaçlık ve Dua Bilinci',             'Mutlak Muhtaçlık ve Dua Bilinci',         '18+',   1620, 'kamp',           'wg-manevi-derinlesme', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000000', 'Mutlak Muhtaçlık ve Dua Bilinci',             'Mutlak Muhtaçlık ve Dua Bilinci',         '18+',   1620, 'kamp',           'wg-manevi-derinlesme', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000001', 'Şükrün Gücü: Minnetin Sırrı',                 'Şükrün Gücü: Minnetin Sırrı',             '18+',   1620, 'kamp',           'wg-manevi-derinlesme', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000002', 'Empati ve Derin İletişim',                    'Empati ve Derin İletişim',                '18+',    240, 'rehber',         'wg-iliskiler-aile',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000003', 'Sabır ve Teslimiyet: Beş Vaktin Bilgeliği',   'Sabır ve Teslimiyet: Beş Vaktin Bilgeliği','18+',   1620, 'kamp',           'wg-manevi-derinlesme', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000004', 'Tövbe ve Dönüşüm: Yeniden Başlamak',          'Tövbe ve Dönüşüm: Yeniden Başlamak',      '18+',   1620, 'kamp',           'wg-manevi-derinlesme', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000005', 'Öz-Şefkat: Kendine İyi Davranmak',            'Öz-Şefkat: Kendine İyi Davranmak',        '18+',    270, 'calisma_kitabi', 'wg-duygusal-denge',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000006', 'Öfke ve Dönüşümü: Ateşi Söndürmek',          'Öfke ve Dönüşümü: Ateşi Söndürmek',       '18+',   1620, 'kamp',           'wg-duygusal-denge',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000007', 'Sınır Koyma ve Hayır Diyebilmek',             'Sınır Koyma ve Hayır Diyebilmek',         '18+',    270, 'calisma_kitabi', 'wg-yasam-becerileri',  NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000008', 'Korku ve Cesaret: Güven''e Yürümek',          'Korku ve Cesaret: Güven''e Yürümek',      '18+',   1620, 'kamp',           'wg-duygusal-denge',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000009', 'Kimlik ve Varoluş: Ben Kimim?',               'Kimlik ve Varoluş: Ben Kimim?',            '18+',   1620, 'kamp',           'wg-genc-ve-egitim',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000010', 'Aile ve Bağ: İlişkilerde Şifa',               'Aile ve Bağ: İlişkilerde Şifa',            'Aile',  1620, 'kamp',           'wg-iliskiler-aile',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000011', 'Keder ve Kayıp: Yas Bilinci',                 'Keder ve Kayıp: Yas Bilinci',              '18+',   1620, 'kamp',           'wg-duygusal-denge',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000012', 'Motivasyon ve Hedef İnşası',                  'Motivasyon ve Hedef İnşası',               '18+',   1620, 'kamp',           'wg-profesyonel-hayat', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000013', 'Zaman ve Dikkat Yönetimi',                    'Zaman ve Dikkat Yönetimi',                 '18+',    270, 'calisma_kitabi', 'wg-yasam-becerileri',  NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000014', 'Güven ve Mahremiyet: Açılabilmek',            'Güven ve Mahremiyet: Açılabilmek',         '18+',    240, 'rehber',         'wg-iliskiler-aile',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000015', 'Evlilik ve Derinleşme: Birlikte Büyümek',     'Evlilik ve Derinleşme: Birlikte Büyümek',  'Çift',  1620, 'kamp',           'wg-iliskiler-aile',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000016', 'Ergenlik ve Özgürlük: Kendin Olmak',          'Ergenlik ve Özgürlük: Kendin Olmak',       '14-18',  300, 'rehber',         'wg-genc-ve-egitim',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000017', 'Liderlik ve Sorumluluk: Öncü Olmak',          'Liderlik ve Sorumluluk: Öncü Olmak',       '25+',    300, 'rehber',         'wg-profesyonel-hayat', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000018', 'Yaratıcılık ve Anlam: Eser Vermek',           'Yaratıcılık ve Anlam: Eser Vermek',        '18+',    270, 'calisma_kitabi', 'wg-yasam-becerileri',  NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000019', 'Dua ve Yakîn: Kalp ile Konuşmak',             'Dua ve Yakîn: Kalp ile Konuşmak',          '18+',   1620, 'kamp',           'wg-manevi-derinlesme', NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000020', 'Özgüven: İç Ses ile Barışmak',                'Özgüven: İç Ses ile Barışmak',             '18+',    240, 'rehber',         'wg-duygusal-denge',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000021', 'Şifa ve Yeniden Başlamak',                    'Şifa ve Yeniden Başlamak',                 '18+',   1620, 'kamp',           'wg-duygusal-denge',    NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000022', 'Bağımlılık ve Özgürlük: Zincirleri Kırmak',  'Bağımlılık ve Özgürlük: Zincirleri Kırmak','18+',   1620, 'kamp',           'wg-yasam-becerileri',  NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000023', 'Odak ve Derin Çalışma',                       'Odak ve Derin Çalışma',                    '18+',    270, 'calisma_kitabi', 'wg-yasam-becerileri',  NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z'),
    ('eeeeeeee-0000-0000-0000-000000000024', 'Nefis Terbiyesi: İçsel Disiplin',             'Nefis Terbiyesi: İçsel Disiplin',          '18+',   1620, 'kamp',           'wg-yasam-becerileri',  NULL, NULL, NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z');


-- =============================================================================
-- SECTION 19 — EBOOKS
-- =============================================================================

INSERT INTO ebooks (content_item_id, title, category, total_pages, has_audio, author_name, download_package_asset_id, created_by, updated_by, created_at, updated_at) VALUES
    ('eeeeeeee-1111-2222-3333-444444444444', 'Sukur: Kalbin Anahtari',  'şükür',            184, false, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('eeeeeeee-5555-6666-7777-888888888888', 'Kendini Kesfet',          'kişisel gelişim',  256, false, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('eeeeeeee-9999-aaaa-bbbb-cccccccccccc', 'Derinlemesine Buyume',    'kişisel gelişim',  312, false, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('eeeeeeee-dddd-eeee-ffff-000000000000', 'Anin Farkindaligi',       'farkındalık',      198, false, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'Icsel Huzur Rehberi',     'kisisel gelisim',  120, false, NULL, 'a0000000-0000-0000-0000-000000000001', NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 20 — EBOOK CHAPTERS
-- Note: mock_data uses string IDs (e.g. "ch-ebook-1-1"). Replaced with valid UUIDs.
-- =============================================================================

INSERT INTO ebook_chapters (id, ebook_content_item_id, title, order_index, parent_chapter_id, start_locator, end_locator, created_by, updated_by, created_at, updated_at) VALUES
    ('10101010-1010-1010-1010-101010101010', 'ffffffff-ffff-ffff-ffff-ffffffffffff',   'Baslangic',           1, NULL, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('c1eb0001-0000-0000-0000-000000000001', 'eeeeeeee-1111-2222-3333-444444444444', 'Şükürün Temelleri',   1, NULL, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('c1eb0001-0000-0000-0000-000000000002', 'eeeeeeee-1111-2222-3333-444444444444', 'Günlük Şükür Pratiği',2, NULL, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('c1eb0001-0000-0000-0000-000000000003', 'eeeeeeee-1111-2222-3333-444444444444', 'Zorlukta Şükür',      3, NULL, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('c1eb0001-0000-0000-0000-000000000004', 'eeeeeeee-1111-2222-3333-444444444444', 'Şükür ve İlişkiler',  4, NULL, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('c1eb0001-0000-0000-0000-000000000005', 'eeeeeeee-1111-2222-3333-444444444444', 'Şükürle Dönüşüm',     5, NULL, NULL, NULL, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 21 — CONTENT PROGRESS
-- =============================================================================

INSERT INTO content_progress (id, user_id, target_type, content_item_id, status, progress_percent, started_at, completed_at, created_by, updated_by, created_at, updated_at) VALUES
    ('13131313-1313-1313-1313-131313131313', '11111111-1111-1111-1111-111111111111', 'journey',  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',  'in_progress', 50,  '2026-01-12T08:00:00Z', NULL,                   NULL, NULL, '2026-01-12T08:00:00Z', '2026-01-12T08:00:00Z'),
    ('23232323-2323-2323-2323-232323232323', '11111111-1111-1111-1111-111111111111', 'module',   'cccccccc-cccc-cccc-cccc-cccccccccccc',  'completed',   100, '2026-01-05T08:00:00Z', '2026-01-05T08:30:00Z', NULL, NULL, '2026-01-05T08:00:00Z', '2026-01-05T08:00:00Z'),
    ('24242424-2424-2424-2424-242424242424', '11111111-1111-1111-1111-111111111111', 'workshop', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'available',   0,   NULL,                   NULL,                   NULL, NULL, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z');


-- =============================================================================
-- SECTION 22 — COMMENT SUBMISSIONS
-- =============================================================================

INSERT INTO comment_submissions (id, user_id, target_content_item_id, target_type, content, status, submitted_at, parent_comment_id, deleted_at, created_by, updated_by, created_at, updated_at) VALUES
    ('14141414-1414-1414-1414-141414141414', '11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'module_package',   'Bugun kendimi daha sakin hissettim.', 'draft',     NULL,                   NULL, NULL, NULL, NULL, '2026-01-12T08:30:00Z', '2026-01-12T08:30:00Z'),
    ('25252525-2525-2525-2525-252525252525', '11111111-1111-1111-1111-111111111111', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee','workshop_stage',   'Bugun biraz daha odakliydim.',       'submitted', '2026-01-12T08:40:00Z', NULL, NULL, NULL, NULL, '2026-01-12T08:40:00Z', '2026-01-12T08:40:00Z');


-- =============================================================================
-- SECTION 23 — HIGHLIGHTS
-- =============================================================================

INSERT INTO highlights (id, user_id, content_item_id, color, anchor_locator, selected_text_hash, deleted_at, created_by, updated_by, created_at, updated_at) VALUES
    ('15151515-1515-1515-1515-151515151515', '11111111-1111-1111-1111-111111111111', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'yellow', 'p:1', NULL, NULL, NULL, NULL, '2026-01-10T09:00:00Z', '2026-01-10T09:00:00Z'),
    ('26262626-2626-2626-2626-262626262626', '11111111-1111-1111-1111-111111111111', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'blue',   'p:1', NULL, NULL, NULL, NULL, '2026-01-06T09:00:00Z', '2026-01-06T09:00:00Z');


-- =============================================================================
-- SECTION 24 — NOTES
-- =============================================================================

INSERT INTO notes (id, user_id, content_item_id, body, anchor_locator, deleted_at, created_by, updated_by, created_at, updated_at) VALUES
    ('16161616-1616-1616-1616-161616161616', '11111111-1111-1111-1111-111111111111', 'ffffffff-ffff-ffff-ffff-ffffffffffff',   'Gunluk nefes pratigi ekle.',     NULL, NULL, NULL, NULL, '2026-01-10T09:05:00Z', '2026-01-10T09:05:00Z'),
    ('27272727-2727-2727-2727-272727272727', '11111111-1111-1111-1111-111111111111', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'Sabah uygulamasini hatirla.',    NULL, NULL, NULL, NULL, '2026-01-06T09:05:00Z', '2026-01-06T09:05:00Z');


-- =============================================================================
-- SECTION 25 — FAVORITE ITEMS
-- =============================================================================

INSERT INTO favorite_items (id, user_id, source_type, content_item_ref_id, highlight_ref_id, note_ref_id, note, created_by, updated_by, created_at, updated_at) VALUES
    ('17171717-1717-1717-1717-171717171717', '11111111-1111-1111-1111-111111111111', 'content_item', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', NULL, NULL, NULL, NULL, NULL, '2026-01-08T12:00:00Z', '2026-01-08T12:00:00Z'),
    ('28282828-2828-2828-2828-282828282828', '11111111-1111-1111-1111-111111111111', 'note',         NULL, NULL, '16161616-1616-1616-1616-161616161616', NULL, NULL, NULL, '2026-01-08T12:30:00Z', '2026-01-08T12:30:00Z');


-- =============================================================================
-- SECTION 26 — COLLECTIONS
-- =============================================================================

INSERT INTO collections (id, user_id, name, created_by, updated_by, created_at, updated_at) VALUES
    ('18181818-1818-1818-1818-181818181818', '11111111-1111-1111-1111-111111111111', 'Sabah Rutinim',  NULL, NULL, '2026-01-08T12:05:00Z', '2026-01-08T12:05:00Z'),
    ('29292929-2929-2929-2929-292929292929', '11111111-1111-1111-1111-111111111111', 'Aksam Notlarim', NULL, NULL, '2026-01-09T12:05:00Z', '2026-01-09T12:05:00Z');


-- =============================================================================
-- SECTION 27 — COLLECTION ITEMS
-- =============================================================================

INSERT INTO collection_items (collection_id, favorite_item_id, created_by, updated_by, created_at, updated_at) VALUES
    ('18181818-1818-1818-1818-181818181818', '17171717-1717-1717-1717-171717171717', NULL, NULL, '2026-01-08T12:10:00Z', '2026-01-08T12:10:00Z'),
    ('29292929-2929-2929-2929-292929292929', '28282828-2828-2828-2828-282828282828', NULL, NULL, '2026-01-09T12:10:00Z', '2026-01-09T12:10:00Z');


-- =============================================================================
-- SECTION 28 — READING POSITIONS
-- =============================================================================

INSERT INTO reading_positions (id, user_id, content_item_id, progress_percent, locator_type, locator_value, last_read_at, created_by, updated_by, created_at, updated_at) VALUES
    ('19191919-1919-1919-1919-191919191919', '11111111-1111-1111-1111-111111111111',   'ffffffff-ffff-ffff-ffff-ffffffffffff', 10, 'page', '12', '2026-01-12T07:30:00Z', NULL, NULL, '2026-01-12T07:30:00Z', '2026-01-12T07:30:00Z'),
    ('30303030-3030-3030-3030-303030303030', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',  'ffffffff-ffff-ffff-ffff-ffffffffffff', 38, 'page', '45', '2026-01-12T07:45:00Z', NULL, NULL, '2026-01-12T07:45:00Z', '2026-01-12T07:45:00Z');


-- =============================================================================
-- SECTION 29 — DOWNLOADS
-- =============================================================================

INSERT INTO downloads (id, user_id, content_item_id, asset_id, download_status, byte_size, local_path, created_by, updated_by, created_at, updated_at) VALUES
    ('20202020-2020-2020-2020-202020202020', '11111111-1111-1111-1111-111111111111', 'ffffffff-ffff-ffff-ffff-ffffffffffff',   'a0000000-0000-0000-0000-000000000001', 'completed', 5242880,  NULL, NULL, NULL, '2026-01-10T11:00:00Z', '2026-01-10T11:00:00Z'),
    ('31313131-3131-3131-3131-313131313131', '11111111-1111-1111-1111-111111111111', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'a0000000-0000-0000-0000-000000000002', 'failed',    10485760, NULL, NULL, NULL, '2026-01-11T11:00:00Z', '2026-01-11T11:00:00Z');


-- =============================================================================
-- SECTION 30 — BADGE DEFINITIONS
-- =============================================================================

INSERT INTO badge_definitions (id, category, name, xp_reward, created_by, updated_by, created_at, updated_at) VALUES
    ('bd000000-0000-0000-0000-000000000001', 'journey', 'Yolculuk Tamamlayici', 150, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z'),
    ('bd000000-0000-0000-0000-000000000002', 'module',  'Modul Ustasi',         100, NULL, NULL, '2025-12-01T10:00:00Z', '2025-12-01T10:00:00Z');


-- =============================================================================
-- SECTION 31 — USER BADGES
-- =============================================================================

INSERT INTO user_badges (id, user_id, badge_definition_id, awarded_at, created_by, updated_by, created_at, updated_at) VALUES
    ('21212121-2121-2121-2121-212121212121', '11111111-1111-1111-1111-111111111111', 'bd000000-0000-0000-0000-000000000001', '2026-01-11T18:00:00Z', NULL, NULL, '2026-01-11T18:00:00Z', '2026-01-11T18:00:00Z'),
    ('32323232-3232-3232-3232-323232323232', '11111111-1111-1111-1111-111111111111', 'bd000000-0000-0000-0000-000000000002', '2026-01-07T18:00:00Z', NULL, NULL, '2026-01-07T18:00:00Z', '2026-01-07T18:00:00Z');


-- =============================================================================
-- SECTION 32 — COACH ASSIGNMENTS
-- =============================================================================

INSERT INTO coach_assignments (id, coach_user_id, client_user_id, status, created_by, updated_by, created_at, updated_at) VALUES
    ('ca000000-0000-0000-0000-000000000001', 'c0ac0ac0-0000-0000-0000-000000000001', 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee', 'active', NULL, NULL, '2026-01-01T09:00:00Z', '2026-01-01T09:00:00Z');


-- =============================================================================
-- SECTION 33 — HOME STATS
-- =============================================================================

INSERT INTO home_stats (user_id, day_streak, xp_total, updated_at) VALUES
    ('11111111-1111-1111-1111-111111111111', 12, 0, now());

-- =============================================================================
-- SECTION 34 — JOURNEY DAYS (SYNCED FROM MOCK)
-- =============================================================================

INSERT INTO journey_days (id, journey_content_item_id, day_number, title, unlock_time_local, created_at, updated_at) VALUES
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 1, 'Gun 1: Farkindalik', '08:00:00', '2026-01-12T08:00:00Z', '2026-01-12T08:00:00Z'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 2, 'Gun 2: Derinlesme', '08:00:00', '2026-01-13T08:00:00Z', '2026-01-13T08:00:00Z');


-- =============================================================================
-- SECTION 35 — GENERIC CONTENT BLOCKS (SYNCED FROM MOCK)
-- =============================================================================

INSERT INTO _content_blocks (id, parent_type, parent_id, content_type, title, body, order_index, has_audio, created_at, updated_at) VALUES
    ('11111111-2222-3333-4444-555555555555', 'journey_day', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'reading', 'Gun 1 Okuma', 'Farkindalik uygulamasina giris.', 1, false, now(), now()),
    ('11111111-2222-3333-4444-666666666666', 'journey_day', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'reading', 'Gun 2 Okuma', 'Derinlesme uygulamasina giris.', 1, false, now(), now()),
    ('ws-mutlak-stage-01', 'workshop', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'reading', 'Kavram Insasi — Zemin Kurulumu', NULL, 1, false, now(), now());


-- =============================================================================
-- SECTION 36 — NOTIFICATIONS (SYNCED FROM MOCK)
-- =============================================================================

INSERT INTO notifications (id, user_id, channel, status, title, body, payload, read_at, sent_at, created_at, updated_at) VALUES
    (
        'n0000000-0000-0000-0000-000000000001',
        '11111111-1111-1111-1111-111111111111',
        'in_app',
        'pending',
        'Yolculuk adimin hazir',
        'Bugunku adimini tamamlamak icin devam et.',
        '{"type":"journey","content_id":"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa","content_type":"journey","description":"Bugunku adimin hazir."}'::jsonb,
        NULL,
        NULL,
        '2026-01-12T08:15:00Z',
        '2026-01-12T08:15:00Z'
    ),
    (
        'n0000000-0000-0000-0000-000000000002',
        '11111111-1111-1111-1111-111111111111',
        'in_app',
        'read',
        'Rozet kazandin',
        'Yeni bir basari rozeti kazandiniz.',
        '{"type":"achievement","content_id":"bd000000-0000-0000-0000-000000000001","content_type":"badge","description":"Yeni bir basari rozeti kazandiniz."}'::jsonb,
        '2026-01-11T18:30:00Z',
        '2026-01-11T18:00:00Z',
        '2026-01-11T18:00:00Z',
        '2026-01-11T18:30:00Z'
    );


-- =============================================================================
-- SECTION 37 — HOME READ MODELS (SYNCED FROM MOCK)
-- =============================================================================

INSERT INTO content_areas (route, label, description, icon, suffix, "accentColor", bg, order_index) VALUES
    ('DiscoverJourneys', 'Yolculuklar', 'Gunluk adimlarla buyume', 'map-marker-path', 'program', '#00B4D8', '#E0F7FA', 1),
    ('DiscoverWorkshops', 'Atolyeler', 'Odakli pratik seanslar', 'school-outline', 'atolye', '#7C3AED', '#EDE9FE', 2),
    ('DiscoverEbooks', 'e-Kitaplar', 'Derinlemesine okuma', 'book-open-variant', 'kitap', '#F59E0B', '#FEF3C7', 3),
    ('DiscoverModules', 'Moduller', 'Kisisel gelisim modulleri', 'human-male-board', 'modul', '#10B981', '#D1FAE5', 4);

INSERT INTO content_nav_areas (route, label, description, "accentColor", bg, "requiresSubscription", order_index) VALUES
    ('DiscoverJourneys', 'Yolculuklar', 'Gunluk adimlarla buyume', '#00B4D8', '#E0F7FA', false, 1),
    ('DiscoverWorkshops', 'Atolyeler', 'Odakli pratik seanslar', '#7C3AED', '#EDE9FE', false, 2),
    ('DiscoverEbooks', 'e-Kitaplar', 'Derinlemesine okuma', '#F59E0B', '#FEF3C7', false, 3),
    ('DiscoverCatalog', 'Kocluk Okulu', 'Sertifika programlari', '#10B981', '#D1FAE5', true, 4);

INSERT INTO reminder_time_slots (label, h, m, order_index) VALUES
    ('07:00', 7, 0, 1),
    ('12:00', 12, 0, 2),
    ('18:00', 18, 0, 3),
    ('20:00', 20, 0, 4),
    ('21:30', 21, 30, 5);

INSERT INTO recent_searches (user_id, term, searched_at) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Oz sefkat', now() - interval '3 day'),
    ('11111111-1111-1111-1111-111111111111', 'Sinir koyma', now() - interval '2 day'),
    ('11111111-1111-1111-1111-111111111111', 'Nefes egzersizi', now() - interval '1 day');

INSERT INTO popular_topics (id, title, subtitle, order_index) VALUES
    ('pt-001', 'Duygusal Dayaniklilik', '6 gun -- 4 icerik', 1),
    ('pt-002', 'Zor Konusmalar', '2 bolum -- 35 dk', 2);

INSERT INTO content_screen_mock (id, payload, updated_at) VALUES
    (
        1,
        '{"review_rating_labels":["Cok kotu","Kotu","Orta","Iyi","Harika"],"reader_audio_speeds":["0.8x","1.0x","1.2x","1.5x"]}'::jsonb,
        now()
    );

INSERT INTO meta (key, value, updated_at) VALUES
    ('mock_data_meta', '{"generated_at":"2026-04-11T09:00:00Z","notes":"Mock fixtures for useMock=true; values align to domain_model.json."}'::jsonb, now());


-- =============================================================================
-- END OF SEED DATA
-- =============================================================================
