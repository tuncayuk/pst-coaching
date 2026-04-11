-- PST Content Platform Postgres Seed Data
--
-- Run this after:
-- - artifacts/arch/content-platform-postgres-ddl.sql
--
-- Scope:
-- - Example and catalog expansion data for content, operational flows, AI/RAG,
--   social features, video, and user activity

begin;

create extension if not exists pgcrypto;
create schema if not exists pst;
set search_path to pst, public;

insert into source_documents (
  id, source_type, domain_type, title, original_uri, payload_json, checksum, language_code,
  import_status, imported_at, imported_by, metadata
) values
  (
    '33333333-3333-3333-3333-333333333001', 'markdown', 'journey',
    'Inner Balance Journey Outline',
    's3://pst/editorial/journeys/inner-balance-journey.md', null,
    'sha256:journey-inner-balance-v1', 'tr', 'imported',
    '2026-04-11 09:00:00+00', 'editorial.lead',
    '{"source_truths":["kesifler_yolculugu","duygular_evreni","atolyeler","ebooks","hadith_analizleri"]}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333002', 'docx', 'module',
    'Kesifler Awareness Module Source',
    's3://pst/editorial/modules/kesifler-awareness.docx', null,
    'sha256:module-kesifler-awareness-v1', 'tr', 'imported',
    '2026-04-11 09:05:00+00', 'editorial.lead',
    '{"backing_library":"kesifler_yolculugu"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333003', 'docx', 'module',
    'Emotion Regulation Module Source',
    's3://pst/editorial/modules/emotion-regulation.docx', null,
    'sha256:module-emotion-regulation-v1', 'tr', 'imported',
    '2026-04-11 09:06:00+00', 'editorial.lead',
    '{"backing_library":"duygular_evreni"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333004', 'epub', 'ebook',
    'Kalbimin Beyazi',
    's3://pst/editorial/ebooks/kalbimin-beyazi.epub', null,
    'sha256:ebook-kalbimin-beyazi-v3', 'tr', 'imported',
    '2026-04-11 09:10:00+00', 'editorial.lead',
    '{"page_count":248}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333005', 'docx', 'spiritual_lesson_collection',
    'Kesifler Yolculugu Master Manuscript',
    's3://pst/editorial/kesifler/master-kesifler.docx', null,
    'sha256:kesifler-master-v7', 'tr', 'imported',
    '2026-04-11 09:12:00+00', 'editorial.lead',
    '{"lesson_count":400}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333006', 'docx', 'emotion_library',
    'Duygular Evreni Master Manuscript',
    's3://pst/editorial/emotions/master-duygular-evreni.docx', null,
    'sha256:duygular-master-v4', 'tr', 'imported',
    '2026-04-11 09:15:00+00', 'editorial.lead',
    '{"emotion_count":200}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333007', 'docx', 'workshop',
    'Mutlak Muhtaclik Workshop',
    's3://pst/editorial/workshops/mutlak-muhtaclik.docx', null,
    'sha256:workshop-mutlak-v5', 'tr', 'imported',
    '2026-04-11 09:18:00+00', 'editorial.lead',
    '{"stage_model":"rev4"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333008', 'docx', 'hadith_analysis',
    'Hadis Analizi: Kuvvetli Mumin',
    's3://pst/editorial/hadith/hadith-analysis-kuvvetli-mumin.docx', null,
    'sha256:hadith-kuvvetli-mumin-v2', 'tr', 'imported',
    '2026-04-11 09:20:00+00', 'editorial.lead',
    '{"source_file":"HadithAnalysis.docx"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333009', 'audio_transcript', 'video',
    'Emotional Resilience Video Transcript',
    's3://pst/editorial/video/emotional-resilience-transcript.json', null,
    'sha256:video-emotional-resilience-v1', 'tr', 'imported',
    '2026-04-11 09:25:00+00', 'media.team',
    '{"captions":["tr","en"]}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333010', 'rich_text_json', 'module',
    'Steadiness Module Rich Text Draft',
    null,
    '{"root":{"type":"root","children":[{"type":"heading","tag":"h1","children":[{"text":"Sebat ve Tazelenme"}]},{"type":"paragraph","children":[{"text":"Sebat, niyeti koruyan kucuk ama tekrarli adimlarin ruhudur."}]},{"type":"callout","variant":"reflection","children":[{"type":"paragraph","children":[{"text":"Bugun seni sabit tutan tek davranisi kaydet."}]}]},{"type":"bulleted_list","children":[{"type":"list_item","children":[{"text":"Niyetini sabah tazele"}]},{"type":"list_item","children":[{"text":"Aksam mini muhasebe yap"}]}]}]}}'::jsonb,
    'sha256:module-steadiness-richtext-v1', 'tr', 'imported',
    '2026-04-11 09:26:00+00', 'editorial.lead',
    '{"editor_family":"lexical","schema_version":"1","normalization_target":"published_content_blocks","storage_pattern":"db_source_jsonb_to_published_s3"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333011', 'markdown', 'emotion_library',
    'Emotion Library Editorial Manuscript',
    's3://pst/editorial/emotions/emotion-library-manuscript.md', null,
    'sha256:emotion-library-manuscript-v1', 'tr', 'imported',
    '2026-04-11 09:27:00+00', 'data.ops',
    '{"normalization_target":"emotion_entry_records","editorial_shape":"taxonomy_markdown"}'::jsonb
  )
on conflict do nothing;

insert into content_items (
  id, kind, subtype, slug, title, subtitle, summary, status, visibility, locale,
  current_version_id, estimated_minutes, analytics_key, metadata, created_at, updated_at
) values
  (
    '11111111-1111-1111-1111-111111111001', 'journey', 'guided_program',
    'inner-balance-journey', 'Ic Denge Yolculugu', 'Kesif, duygu ve uygulama akisi',
    'Kesifler, duygular, atolye ve ebook baglantilarini tek bir yolculukta birlestirir.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222001', 42, 'journey_inner_balance',
    '{"primary_goal":"anxiety_to_clarity","discovery_type":"journey"}'::jsonb,
    '2026-04-11 09:30:00+00', '2026-04-11 09:30:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111002', 'module', 'kesifler_based',
    'kesifler-awareness-module', 'Kesif Farkindalik Modulu', null,
    'Kesifler Yolculugu kaynaklarindan uretilmis moduler okuma ve uygulama akisi.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222002', 18, 'module_kesifler_awareness',
    '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb,
    '2026-04-11 09:31:00+00', '2026-04-11 09:31:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111003', 'workshop', 'standalone',
    'mutlak-muhtaclik-workshop', 'Mutlak Muhtaclik Atolyesi', null,
    'Asama, kamp, rehber ve workbook yapisi olan derin uygulamali atolye.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222003', 240, 'workshop_mutlak_muhtaclik',
    '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb,
    '2026-04-11 09:32:00+00', '2026-04-11 09:32:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111004', 'ebook', 'standalone',
    'kalbimin-beyazi', 'Kalbimin Beyazi', 'Dijital okuma + sesli destek',
    'Uzun formlu ebook deneyimi ve yolculuk icinde yardimci okuma olarak kullanilir.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222004', 360, 'ebook_kalbimin_beyazi',
    '{"source_truth":"ebooks","discovery_type":"ebook"}'::jsonb,
    '2026-04-11 09:33:00+00', '2026-04-11 09:33:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111005', 'spiritual_lesson_collection', 'source_library',
    'kesifler-yolculugu-library', 'Kesifler Yolculugu', null,
    '400+ ruhsal dersin bulundugu temel kaynak kutuphanesi.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222005', null, 'library_kesifler_yolculugu',
    '{"source_truth":true}'::jsonb,
    '2026-04-11 09:34:00+00', '2026-04-11 09:34:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111006', 'spiritual_lesson', 'source_item',
    'kesifler-sabir-ve-farkindalik-01', 'Sabir ve Farkindalik', null,
    'Kesifler kaynagindan gelen ilk ders.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222006', 12, 'lesson_sabir_farkindalik',
    '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb,
    '2026-04-11 09:35:00+00', '2026-04-11 09:35:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111007', 'spiritual_lesson', 'source_item',
    'kesifler-niyet-ve-devam-02', 'Niyet ve Devam', null,
    'Kesifler kaynagindan gelen ikinci ders.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222007', 14, 'lesson_niyet_devam',
    '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb,
    '2026-04-11 09:36:00+00', '2026-04-11 09:36:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111008', 'emotion_library', 'source_library',
    'duygular-evreni-library', 'Duygular Evreni', null,
    '200+ duygu karti ve aciklamalarindan olusan temel kaynak kutuphanesi.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222008', null, 'library_duygular_evreni',
    '{"source_truth":true}'::jsonb,
    '2026-04-11 09:37:00+00', '2026-04-11 09:37:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111009', 'emotion_entry', 'source_item',
    'kaygi-emotion-entry', 'Kaygi', null,
    'Duygular Evreni icindeki kaygi maddesi.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222009', 10, 'emotion_kaygi',
    '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb,
    '2026-04-11 09:38:00+00', '2026-04-11 09:38:00+00'
  ),
  (
    '11111111-1111-1111-1111-11111111100a', 'emotion_entry', 'source_item',
    'sukunet-emotion-entry', 'Sukunet', null,
    'Duygular Evreni icindeki sukunet maddesi.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-22222222200a', 9, 'emotion_sukunet',
    '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb,
    '2026-04-11 09:39:00+00', '2026-04-11 09:39:00+00'
  ),
  (
    '11111111-1111-1111-1111-11111111100b', 'hadith_analysis', 'source_item',
    'kuvvetli-mumin-hadith-analysis', 'Kuvvetli Mumin Hadis Analizi', null,
    'Hadis metni, psikoloji koprusu ve uygulama ciktilari ile zenginlestirilmis analiz.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-22222222200b', 15, 'hadith_kuvvetli_mumin',
    '{"source_truth":"hadith_analizleri"}'::jsonb,
    '2026-04-11 09:40:00+00', '2026-04-11 09:40:00+00'
  ),
  (
    '11111111-1111-1111-1111-11111111100c', 'video', 'standalone',
    'emotional-resilience-video', 'Duygusal Dayaniklilik Videosu', null,
    'Transkript, altyazi ve ilerleme senkronu ile video icerigi.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-22222222200c', 22, 'video_emotional_resilience',
    '{"discovery_type":"video_extension"}'::jsonb,
    '2026-04-11 09:41:00+00', '2026-04-11 09:41:00+00'
  ),
  (
    '11111111-1111-1111-1111-11111111100d', 'module', 'emotion_based',
    'emotion-regulation-module', 'Duygu Regulasyon Modulu', null,
    'Duygular Evreni kaynaklarindan uretilmis moduler duzenleme paketi.',
    'published', 'subscription', 'tr',
    '22222222-2222-2222-2222-22222222200d', 20, 'module_emotion_regulation',
    '{"source_truth":"duygular_evreni","discovery_type":"module"}'::jsonb,
    '2026-04-11 09:42:00+00', '2026-04-11 09:42:00+00'
  )
on conflict do nothing;

insert into content_items (
  id, kind, subtype, slug, title, subtitle, summary, status, visibility, locale, current_version_id, estimated_minutes, analytics_key, metadata, created_at, updated_at
) values
  ('11111111-1111-1111-1111-000000000010', 'journey', 'guided_program', 'sabahla-baslayan-denge-yolculugu', 'Sabahla Baslayan Denge Yolculugu', 'Sabah niyeti, odak ve denge akisi', 'Modul, atolye ve ebook akisini sabahla baslayan denge yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000010', 14, 'journey_sabahla_baslayan_denge_yolculugu', '{"primary_goal":"morning_balance","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000011', 'journey', 'guided_program', 'kaygidan-netlige-yolculuk', 'Kaygidan Netlige Yolculuk', 'Kaygiyi isimlendirme ve net adim secimi', 'Modul, atolye ve ebook akisini kaygidan netlige yolculuk etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000011', 28, 'journey_kaygidan_netlige_yolculuk', '{"primary_goal":"anxiety_to_clarity","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000012', 'journey', 'guided_program', 'niyet-ve-devam-yolculugu', 'Niyet ve Devam Yolculugu', 'Baslama enerjisini surdurulebilir ritme cevirme', 'Modul, atolye ve ebook akisini niyet ve devam yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000012', 20, 'journey_niyet_ve_devam_yolculugu', '{"primary_goal":"intention_to_consistency","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000013', 'journey', 'guided_program', 'sukrun-rengi-yolculugu', 'Sukrun Rengi Yolculugu', 'Gorulen nimetleri gunluk hayata tasima', 'Modul, atolye ve ebook akisini sukrun rengi yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000013', 24, 'journey_sukrun_rengi_yolculugu', '{"primary_goal":"gratitude_visibility","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000014', 'journey', 'guided_program', 'belirsizlikte-guven-yolculugu', 'Belirsizlikte Guven Yolculugu', 'Cevap beklerken dengeyi koruma', 'Modul, atolye ve ebook akisini belirsizlikte guven yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000014', 28, 'journey_belirsizlikte_guven_yolculugu', '{"primary_goal":"uncertainty_to_trust","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000015', 'journey', 'guided_program', 'yavaslama-ve-farkindalik-yolculugu', 'Yavaslama ve Farkindalik Yolculugu', 'Hizi dusurup dikkati toplama', 'Modul, atolye ve ebook akisini yavaslama ve farkindalik yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000015', 18, 'journey_yavaslama_ve_farkindalik_yolculugu', '{"primary_goal":"slow_down_awareness","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000016', 'journey', 'guided_program', 'merhametli-kalp-yolculugu', 'Merhametli Kalp Yolculugu', 'Icine ve baskasina daha yumusak bakis', 'Modul, atolye ve ebook akisini merhametli kalp yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000016', 30, 'journey_merhametli_kalp_yolculugu', '{"primary_goal":"self_compassion","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000017', 'journey', 'guided_program', 'korkudan-cesarete-yolculuk', 'Korkudan Cesarete Yolculuk', 'Korkuyu bilgiye ve eyleme cevirme', 'Modul, atolye ve ebook akisini korkudan cesarete yolculuk etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000017', 28, 'journey_korkudan_cesarete_yolculuk', '{"primary_goal":"fear_to_courage","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000018', 'journey', 'guided_program', 'aidiyet-ve-sohbet-yolculugu', 'Aidiyet ve Sohbet Yolculugu', 'Yalnizlik yerine bag kurma pratikleri', 'Modul, atolye ve ebook akisini aidiyet ve sohbet yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000018', 22, 'journey_aidiyet_ve_sohbet_yolculugu', '{"primary_goal":"belonging","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000019', 'journey', 'guided_program', 'yorgunluktan-toparlanmaya-yolculuk', 'Yorgunluktan Toparlanmaya Yolculuk', 'Tukenmeye karsi ritim ve onarim', 'Modul, atolye ve ebook akisini yorgunluktan toparlanmaya yolculuk etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000019', 42, 'journey_yorgunluktan_toparlanmaya_yolculuk', '{"primary_goal":"fatigue_recovery","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000001a', 'journey', 'guided_program', 'sessizlikte-tefekkur-yolculugu', 'Sessizlikte Tefekkur Yolculugu', 'Icerideki sesi duymaya alan acma', 'Modul, atolye ve ebook akisini sessizlikte tefekkur yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000001a', 16, 'journey_sessizlikte_tefekkur_yolculugu', '{"primary_goal":"silence_reflection","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000001b', 'journey', 'guided_program', 'dua-ile-yakinlik-yolculugu', 'Dua ile Yakinlik Yolculugu', 'Dua dilini gunluk hayata yerlestirme', 'Modul, atolye ve ebook akisini dua ile yakinlik yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000001b', 20, 'journey_dua_ile_yakinlik_yolculugu', '{"primary_goal":"dua_connection","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000001c', 'journey', 'guided_program', 'kalp-temizligi-yolculugu', 'Kalp Temizligi Yolculugu', 'Ic muhasebe ve niyet safilastirma', 'Modul, atolye ve ebook akisini kalp temizligi yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000001c', 32, 'journey_kalp_temizligi_yolculugu', '{"primary_goal":"heart_clarity","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000001d', 'journey', 'guided_program', 'ferahliga-acilan-yolculuk', 'Ferahliga Acilan Yolculuk', 'Bunalmisliktan nefes alanina gecis', 'Modul, atolye ve ebook akisini ferahliga acilan yolculuk etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000001d', 26, 'journey_ferahliga_acilan_yolculuk', '{"primary_goal":"overwhelm_to_relief","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000001e', 'journey', 'guided_program', 'teslimiyet-ve-gayret-yolculugu', 'Teslimiyet ve Gayret Yolculugu', 'Teslim olurken eylem sorumlulugunu koruma', 'Modul, atolye ve ebook akisini teslimiyet ve gayret yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000001e', 36, 'journey_teslimiyet_ve_gayret_yolculugu', '{"primary_goal":"effort_and_reliance","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000001f', 'journey', 'guided_program', 'sabitlik-ve-sebat-yolculugu', 'Sabitlik ve Sebat Yolculugu', 'Kucuk dogru adimlari kalici rutine tasima', 'Modul, atolye ve ebook akisini sabitlik ve sebat yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000001f', 42, 'journey_sabitlik_ve_sebat_yolculugu', '{"primary_goal":"steadiness","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000020', 'journey', 'guided_program', 'huzunden-umuda-yolculuk', 'Huzunden Umuda Yolculuk', 'Huzne alan acarken umudu canli tutma', 'Modul, atolye ve ebook akisini huzunden umuda yolculuk etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000020', 24, 'journey_huzunden_umuda_yolculuk', '{"primary_goal":"grief_to_hope","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000021', 'journey', 'guided_program', 'gunluk-denge-yolculugu', 'Gunluk Denge Yolculugu', 'Gunde yirmi dakikalik mini denge protokolu', 'Modul, atolye ve ebook akisini gunluk denge yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000021', 14, 'journey_gunluk_denge_yolculugu', '{"primary_goal":"daily_balance","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000022', 'journey', 'guided_program', 'ic-dayaniklilik-yolculugu', 'Ic Dayaniklilik Yolculugu', 'Duygusal dayanma gucunu adim adim arttirma', 'Modul, atolye ve ebook akisini ic dayaniklilik yolculugu etrafinda birlestiren yolculuk.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000022', 56, 'journey_ic_dayaniklilik_yolculugu', '{"primary_goal":"inner_resilience","discovery_type":"journey"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000030', 'module', 'kesifler_based', 'sabri-derinlestirme-modulu', 'Sabri Derinlestirme Modulu', null, 'Kesifler Yolculugu icinden secilen derslerle kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000030', 18, 'module_sabri_derinlestirme_modulu', '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000031', 'module', 'kesifler_based', 'dua-ve-yakinlik-modulu', 'Dua ve Yakinlik Modulu', null, 'Kesifler Yolculugu icinden secilen derslerle kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000031', 18, 'module_dua_ve_yakinlik_modulu', '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000032', 'module', 'kesifler_based', 'tevazu-ve-hizmet-modulu', 'Tevazu ve Hizmet Modulu', null, 'Kesifler Yolculugu icinden secilen derslerle kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000032', 18, 'module_tevazu_ve_hizmet_modulu', '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000033', 'module', 'kesifler_based', 'belirsizlikte-guven-modulu', 'Belirsizlikte Guven Modulu', null, 'Kesifler Yolculugu icinden secilen derslerle kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000033', 18, 'module_belirsizlikte_guven_modulu', '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000034', 'module', 'kesifler_based', 'kirilganliktan-hikmete-modulu', 'Kirilganliktan Hikmete Modulu', null, 'Kesifler Yolculugu icinden secilen derslerle kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000034', 18, 'module_kirilganliktan_hikmete_modulu', '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000035', 'module', 'kesifler_based', 'sebat-ve-tazelenme-modulu', 'Sebat ve Tazelenme Modulu', null, 'Kesifler Yolculugu icinden secilen derslerle kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000035', 18, 'module_sebat_ve_tazelenme_modulu', '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000036', 'module', 'kesifler_based', 'merhametli-bakis-modulu', 'Merhametli Bakis Modulu', null, 'Kesifler Yolculugu icinden secilen derslerle kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000036', 18, 'module_merhametli_bakis_modulu', '{"source_truth":"kesifler_yolculugu","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000037', 'module', 'emotion_based', 'umut-ve-cesaret-modulu', 'Umut ve Cesaret Modulu', null, 'Duygular Evreni icinden secilen duygularla kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000037', 18, 'module_umut_ve_cesaret_modulu', '{"source_truth":"duygular_evreni","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000038', 'module', 'emotion_based', 'korku-ve-tedirginlik-modulu', 'Korku ve Tedirginlik Modulu', null, 'Duygular Evreni icinden secilen duygularla kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000038', 18, 'module_korku_ve_tedirginlik_modulu', '{"source_truth":"duygular_evreni","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000039', 'module', 'emotion_based', 'huzun-ve-ozlem-modulu', 'Huzun ve Ozlem Modulu', null, 'Duygular Evreni icinden secilen duygularla kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000039', 18, 'module_huzun_ve_ozlem_modulu', '{"source_truth":"duygular_evreni","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000003a', 'module', 'emotion_based', 'sucluluk-ve-mahcubiyet-modulu', 'Sucluluk ve Mahcubiyet Modulu', null, 'Duygular Evreni icinden secilen duygularla kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000003a', 18, 'module_sucluluk_ve_mahcubiyet_modulu', '{"source_truth":"duygular_evreni","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000003b', 'module', 'emotion_based', 'aidiyet-ve-yalnizlik-modulu', 'Aidiyet ve Yalnizlik Modulu', null, 'Duygular Evreni icinden secilen duygularla kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000003b', 18, 'module_aidiyet_ve_yalnizlik_modulu', '{"source_truth":"duygular_evreni","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000003c', 'module', 'emotion_based', 'ferahlama-ve-rahatlama-modulu', 'Ferahlama ve Rahatlama Modulu', null, 'Duygular Evreni icinden secilen duygularla kurulan moduler akis.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000003c', 18, 'module_ferahlama_ve_rahatlama_modulu', '{"source_truth":"duygular_evreni","discovery_type":"module"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000040', 'workshop', 'standalone', 'kaygi-aninda-denge-atolyesi', 'Kaygi Aninda Denge Atolyesi', null, 'Kaygi Aninda Denge Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000040', 180, 'workshop_kaygi_aninda_denge_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000041', 'workshop', 'standalone', 'iliski-onarimi-atolyesi', 'Iliski Onarimi Atolyesi', null, 'Iliski Onarimi Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000041', 210, 'workshop_iliski_onarimi_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000042', 'workshop', 'standalone', 'belirsizlikle-yasama-atolyesi', 'Belirsizlikle Yasama Atolyesi', null, 'Belirsizlikle Yasama Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000042', 160, 'workshop_belirsizlikle_yasama_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000043', 'workshop', 'standalone', 'sukrun-ritmi-atolyesi', 'Sukrun Ritmi Atolyesi', null, 'Sukrun Ritmi Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000043', 150, 'workshop_sukrun_ritmi_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000044', 'workshop', 'standalone', 'yalnizlik-ve-aidiyet-atolyesi', 'Yalnizlik ve Aidiyet Atolyesi', null, 'Yalnizlik ve Aidiyet Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000044', 200, 'workshop_yalnizlik_ve_aidiyet_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000045', 'workshop', 'standalone', 'yorgun-kalbi-toparlama-atolyesi', 'Yorgun Kalbi Toparlama Atolyesi', null, 'Yorgun Kalbi Toparlama Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000045', 190, 'workshop_yorgun_kalbi_toparlama_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000046', 'workshop', 'standalone', 'niyet-tazeleme-atolyesi', 'Niyet Tazeleme Atolyesi', null, 'Niyet Tazeleme Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000046', 165, 'workshop_niyet_tazeleme_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000047', 'workshop', 'standalone', 'sinir-ve-merhamet-atolyesi', 'Sinir ve Merhamet Atolyesi', null, 'Sinir ve Merhamet Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000047', 175, 'workshop_sinir_ve_merhamet_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000048', 'workshop', 'standalone', 'cesaretle-adim-atma-atolyesi', 'Cesaretle Adim Atma Atolyesi', null, 'Cesaretle Adim Atma Atolyesi, katilimciyi kavram, egzersiz ve workbook uretimiyle ilerletir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000048', 185, 'workshop_cesaretle_adim_atma_atolyesi', '{"source_truth":"atolyeler","discovery_type":"workshop"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000050', 'ebook', 'standalone', 'belirsizlikte-yurumek', 'Belirsizlikte Yurumek', null, 'Belirsizlikte Yurumek, uzun formlu okuma, bolum bazli izleme ve indirilebilir paket sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000050', 252, 'ebook_belirsizlikte_yurumek', '{"source_truth":"ebooks","discovery_type":"ebook"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000051', 'ebook', 'standalone', 'merhametin-dili', 'Merhametin Dili', null, 'Merhametin Dili, uzun formlu okuma, bolum bazli izleme ve indirilebilir paket sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000051', 276, 'ebook_merhametin_dili', '{"source_truth":"ebooks","discovery_type":"ebook"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000052', 'ebook', 'standalone', 'kaygidan-dengeye-notlar', 'Kaygidan Dengeye Notlar', null, 'Kaygidan Dengeye Notlar, uzun formlu okuma, bolum bazli izleme ve indirilebilir paket sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000052', 304, 'ebook_kaygidan_dengeye_notlar', '{"source_truth":"ebooks","discovery_type":"ebook"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000053', 'ebook', 'standalone', 'sessizlik-ve-tefekkur', 'Sessizlik ve Tefekkur', null, 'Sessizlik ve Tefekkur, uzun formlu okuma, bolum bazli izleme ve indirilebilir paket sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000053', 238, 'ebook_sessizlik_ve_tefekkur', '{"source_truth":"ebooks","discovery_type":"ebook"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000060', 'spiritual_lesson', 'source_item', 'tefekkurde-derinlesmek', 'Tefekkurde Derinlesmek', null, 'Tefekkurde Derinlesmek dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000060', 10, 'lesson_tefekkurde_derinlesmek', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000061', 'spiritual_lesson', 'source_item', 'sukretmek-ve-gormek', 'Sukretmek ve Gormek', null, 'Sukretmek ve Gormek dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000061', 11, 'lesson_sukretmek_ve_gormek', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000062', 'spiritual_lesson', 'source_item', 'teslimiyet-ve-gayret', 'Teslimiyet ve Gayret', null, 'Teslimiyet ve Gayret dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000062', 12, 'lesson_teslimiyet_ve_gayret', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000063', 'spiritual_lesson', 'source_item', 'kalp-temizligi', 'Kalp Temizligi', null, 'Kalp Temizligi dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000063', 13, 'lesson_kalp_temizligi', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000064', 'spiritual_lesson', 'source_item', 'dua-ile-yakinlik', 'Dua ile Yakinlik', null, 'Dua ile Yakinlik dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000064', 14, 'lesson_dua_ile_yakinlik', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000065', 'spiritual_lesson', 'source_item', 'merhametli-bakis', 'Merhametli Bakis', null, 'Merhametli Bakis dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000065', 15, 'lesson_merhametli_bakis', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000066', 'spiritual_lesson', 'source_item', 'ic-muhasebe', 'Ic Muhasebe', null, 'Ic Muhasebe dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000066', 16, 'lesson_ic_muhasebe', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000067', 'spiritual_lesson', 'source_item', 'gonul-yorgunlugunu-fark-etmek', 'Gonul Yorgunlugunu Fark Etmek', null, 'Gonul Yorgunlugunu Fark Etmek dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000067', 10, 'lesson_gonul_yorgunlugunu_fark_etmek', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000068', 'spiritual_lesson', 'source_item', 'sabitlik-ve-sebat', 'Sabitlik ve Sebat', null, 'Sabitlik ve Sebat dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000068', 11, 'lesson_sabitlik_ve_sebat', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000069', 'spiritual_lesson', 'source_item', 'tevazu-ve-dayaniklilik', 'Tevazu ve Dayaniklilik', null, 'Tevazu ve Dayaniklilik dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000069', 12, 'lesson_tevazu_ve_dayaniklilik', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000006a', 'spiritual_lesson', 'source_item', 'hizmet-bilinci', 'Hizmet Bilinci', null, 'Hizmet Bilinci dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000006a', 13, 'lesson_hizmet_bilinci', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000006b', 'spiritual_lesson', 'source_item', 'affetmeye-yaklasmak', 'Affetmeye Yaklasmak', null, 'Affetmeye Yaklasmak dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000006b', 14, 'lesson_affetmeye_yaklasmak', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000006c', 'spiritual_lesson', 'source_item', 'gecikmeye-tahammul', 'Gecikmeye Tahammul', null, 'Gecikmeye Tahammul dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000006c', 15, 'lesson_gecikmeye_tahammul', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000006d', 'spiritual_lesson', 'source_item', 'nimetin-izini-surmek', 'Nimetin Izini Surmek', null, 'Nimetin Izini Surmek dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000006d', 16, 'lesson_nimetin_izini_surmek', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000006e', 'spiritual_lesson', 'source_item', 'yalnizlikta-saglam-kalmak', 'Yalnizlikta Saglam Kalmak', null, 'Yalnizlikta Saglam Kalmak dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000006e', 10, 'lesson_yalnizlikta_saglam_kalmak', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000006f', 'spiritual_lesson', 'source_item', 'sohbetin-bereketi', 'Sohbetin Bereketi', null, 'Sohbetin Bereketi dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000006f', 11, 'lesson_sohbetin_bereketi', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000070', 'spiritual_lesson', 'source_item', 'korkudan-emanete', 'Korkudan Emanete', null, 'Korkudan Emanete dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000070', 12, 'lesson_korkudan_emanete', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000071', 'spiritual_lesson', 'source_item', 'belirsizlikte-guven', 'Belirsizlikte Guven', null, 'Belirsizlikte Guven dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000071', 13, 'lesson_belirsizlikte_guven', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000072', 'spiritual_lesson', 'source_item', 'hedefi-tazelemek', 'Hedefi Tazelemek', null, 'Hedefi Tazelemek dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000072', 14, 'lesson_hedefi_tazelemek', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000073', 'spiritual_lesson', 'source_item', 'kirikliktan-hikmete', 'Kirikliktan Hikmete', null, 'Kirikliktan Hikmete dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000073', 15, 'lesson_kirikliktan_hikmete', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000074', 'spiritual_lesson', 'source_item', 'yoldan-dusunce-toparlanmak', 'Yoldan Dusunce Toparlanmak', null, 'Yoldan Dusunce Toparlanmak dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000074', 16, 'lesson_yoldan_dusunce_toparlanmak', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000075', 'spiritual_lesson', 'source_item', 'sessizlikte-dinlemek', 'Sessizlikte Dinlemek', null, 'Sessizlikte Dinlemek dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000075', 10, 'lesson_sessizlikte_dinlemek', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000076', 'spiritual_lesson', 'source_item', 'sukrun-pratigi', 'Sukrun Pratigi', null, 'Sukrun Pratigi dersi, Kesifler Yolculugu kaynak kutuphanesindeki tematik derslerden biridir.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000076', 11, 'lesson_sukrun_pratigi', '{"library":"kesifler_yolculugu","discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000080', 'emotion_entry', 'source_item', 'umut-emotion-entry', 'Umut', null, 'Umut maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000080', 8, 'emotion_umut', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000081', 'emotion_entry', 'source_item', 'ozlem-emotion-entry', 'Ozlem', null, 'Ozlem maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000081', 9, 'emotion_ozlem', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000082', 'emotion_entry', 'source_item', 'mahcubiyet-emotion-entry', 'Mahcubiyet', null, 'Mahcubiyet maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000082', 10, 'emotion_mahcubiyet', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000083', 'emotion_entry', 'source_item', 'minnet-emotion-entry', 'Minnet', null, 'Minnet maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000083', 11, 'emotion_minnet', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000084', 'emotion_entry', 'source_item', 'yalnizlik-emotion-entry', 'Yalnizlik', null, 'Yalnizlik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000084', 12, 'emotion_yalnizlik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000085', 'emotion_entry', 'source_item', 'bunalmislik-emotion-entry', 'Bunalmislik', null, 'Bunalmislik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000085', 8, 'emotion_bunalmislik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000086', 'emotion_entry', 'source_item', 'hayal-kirikligi-emotion-entry', 'Hayal Kirikligi', null, 'Hayal Kirikligi maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000086', 9, 'emotion_hayal_kirikligi', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000087', 'emotion_entry', 'source_item', 'guvende-hissetme-emotion-entry', 'Guvende Hissetme', null, 'Guvende Hissetme maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000087', 10, 'emotion_guvende_hissetme', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000088', 'emotion_entry', 'source_item', 'korku-emotion-entry', 'Korku', null, 'Korku maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000088', 11, 'emotion_korku', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000089', 'emotion_entry', 'source_item', 'merak-emotion-entry', 'Merak', null, 'Merak maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000089', 12, 'emotion_merak', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000008a', 'emotion_entry', 'source_item', 'kararsizlik-emotion-entry', 'Kararsizlik', null, 'Kararsizlik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000008a', 8, 'emotion_kararsizlik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000008b', 'emotion_entry', 'source_item', 'sevinc-emotion-entry', 'Sevinc', null, 'Sevinc maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000008b', 9, 'emotion_sevinc', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000008c', 'emotion_entry', 'source_item', 'huzun-emotion-entry', 'Huzun', null, 'Huzun maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000008c', 10, 'emotion_huzun', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000008d', 'emotion_entry', 'source_item', 'sucluluk-emotion-entry', 'Sucluluk', null, 'Sucluluk maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000008d', 11, 'emotion_sucluluk', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000008e', 'emotion_entry', 'source_item', 'rahatlama-emotion-entry', 'Rahatlama', null, 'Rahatlama maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000008e', 12, 'emotion_rahatlama', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000008f', 'emotion_entry', 'source_item', 'caresizlik-emotion-entry', 'Caresizlik', null, 'Caresizlik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000008f', 8, 'emotion_caresizlik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000090', 'emotion_entry', 'source_item', 'sabirsizlik-emotion-entry', 'Sabirsizlik', null, 'Sabirsizlik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000090', 9, 'emotion_sabirsizlik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000091', 'emotion_entry', 'source_item', 'guven-emotion-entry', 'Guven', null, 'Guven maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000091', 10, 'emotion_guven', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000092', 'emotion_entry', 'source_item', 'direnc-emotion-entry', 'Direnc', null, 'Direnc maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000092', 11, 'emotion_direnc', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000093', 'emotion_entry', 'source_item', 'sikisiklik-emotion-entry', 'Sikisiklik', null, 'Sikisiklik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000093', 12, 'emotion_sikisiklik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000094', 'emotion_entry', 'source_item', 'utanc-emotion-entry', 'Utanc', null, 'Utanc maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000094', 8, 'emotion_utanc', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000095', 'emotion_entry', 'source_item', 'aidiyet-emotion-entry', 'Aidiyet', null, 'Aidiyet maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000095', 9, 'emotion_aidiyet', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000096', 'emotion_entry', 'source_item', 'kiskanclik-emotion-entry', 'Kiskanclik', null, 'Kiskanclik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000096', 10, 'emotion_kiskanclik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000097', 'emotion_entry', 'source_item', 'hayranlik-emotion-entry', 'Hayranlik', null, 'Hayranlik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000097', 11, 'emotion_hayranlik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000098', 'emotion_entry', 'source_item', 'yorgunluk-emotion-entry', 'Yorgunluk', null, 'Yorgunluk maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000098', 12, 'emotion_yorgunluk', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-000000000099', 'emotion_entry', 'source_item', 'ferahlik-emotion-entry', 'Ferahlik', null, 'Ferahlik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-000000000099', 8, 'emotion_ferahlik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000009a', 'emotion_entry', 'source_item', 'tedirginlik-emotion-entry', 'Tedirginlik', null, 'Tedirginlik maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000009a', 9, 'emotion_tedirginlik', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00'),
  ('11111111-1111-1111-1111-00000000009b', 'emotion_entry', 'source_item', 'cesaret-emotion-entry', 'Cesaret', null, 'Cesaret maddesi, Duygular Evreni icinde fark etme ve duzenleme dili sunar.', 'published', 'subscription', 'tr', '22222222-2222-2222-2222-00000000009b', 10, 'emotion_cesaret', '{"library":"duygular_evreni","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:00:00+00', '2026-04-12 09:00:00+00')
on conflict do nothing;

insert into content_versions (
  id, content_item_id, source_document_id, version_no, structured_payload_ref,
  metadata, published_at, published_by, change_summary, created_at
) values
  (
    '22222222-2222-2222-2222-222222222001', '11111111-1111-1111-1111-111111111001',
    '33333333-3333-3333-3333-333333333001', 1,
    's3://pst/published/journeys/inner-balance/v1.json',
    '{"contains":["module","module","workshop","ebook"]}'::jsonb,
    '2026-04-11 10:00:00+00', 'release.bot', 'Initial journey publish',
    '2026-04-11 10:00:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222002', '11111111-1111-1111-1111-111111111002',
    '33333333-3333-3333-3333-333333333002', 1,
    's3://pst/published/modules/kesifler-awareness/v1.json',
    '{"composition":"spiritual_lesson_packages"}'::jsonb,
    '2026-04-11 10:01:00+00', 'release.bot', 'Initial module publish',
    '2026-04-11 10:01:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222003', '11111111-1111-1111-1111-111111111003',
    '33333333-3333-3333-3333-333333333007', 2,
    's3://pst/published/workshops/mutlak-muhtaclik/v2.json',
    '{"stage_count":3,"has_workbook":true,"has_facilitator_guide":true}'::jsonb,
    '2026-04-11 10:02:00+00', 'release.bot', 'Workshop rev4 publish',
    '2026-04-11 10:02:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222004', '11111111-1111-1111-1111-111111111004',
    '33333333-3333-3333-3333-333333333004', 3,
    's3://pst/published/ebooks/kalbimin-beyazi/v3.json',
    '{"toc_depth":2,"audio_available":true}'::jsonb,
    '2026-04-11 10:03:00+00', 'release.bot', 'Ebook refresh with audio markers',
    '2026-04-11 10:03:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222005', '11111111-1111-1111-1111-111111111005',
    '33333333-3333-3333-3333-333333333005', 1,
    's3://pst/published/source/kesifler-library/v1.json',
    '{"lesson_count":400}'::jsonb,
    '2026-04-11 10:04:00+00', 'release.bot', 'Source library publish',
    '2026-04-11 10:04:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222006', '11111111-1111-1111-1111-111111111006',
    '33333333-3333-3333-3333-333333333005', 1,
    's3://pst/published/kesifler/sabir-farkindalik/v1.json',
    '{"module_ready":true}'::jsonb,
    '2026-04-11 10:05:00+00', 'release.bot', 'Lesson extracted from source library',
    '2026-04-11 10:05:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222007', '11111111-1111-1111-1111-111111111007',
    '33333333-3333-3333-3333-333333333005', 1,
    's3://pst/published/kesifler/niyet-devam/v1.json',
    '{"module_ready":true}'::jsonb,
    '2026-04-11 10:06:00+00', 'release.bot', 'Lesson extracted from source library',
    '2026-04-11 10:06:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222008', '11111111-1111-1111-1111-111111111008',
    '33333333-3333-3333-3333-333333333006', 1,
    's3://pst/published/source/duygular-library/v1.json',
    '{"emotion_count":200}'::jsonb,
    '2026-04-11 10:07:00+00', 'release.bot', 'Source library publish',
    '2026-04-11 10:07:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222009', '11111111-1111-1111-1111-111111111009',
    '33333333-3333-3333-3333-333333333006', 1,
    's3://pst/published/duygular/kaygi/v1.json',
    '{"recommended_module":"emotion-regulation-module"}'::jsonb,
    '2026-04-11 10:08:00+00', 'release.bot', 'Emotion item publish',
    '2026-04-11 10:08:00+00'
  ),
  (
    '22222222-2222-2222-2222-22222222200a', '11111111-1111-1111-1111-11111111100a',
    '33333333-3333-3333-3333-333333333006', 1,
    's3://pst/published/duygular/sukunet/v1.json',
    '{"recommended_module":"emotion-regulation-module"}'::jsonb,
    '2026-04-11 10:09:00+00', 'release.bot', 'Emotion item publish',
    '2026-04-11 10:09:00+00'
  ),
  (
    '22222222-2222-2222-2222-22222222200b', '11111111-1111-1111-1111-11111111100b',
    '33333333-3333-3333-3333-333333333008', 2,
    's3://pst/published/hadith/kuvvetli-mumin/v2.json',
    '{"supports":["module","workshop"]}'::jsonb,
    '2026-04-11 10:10:00+00', 'release.bot', 'Hadith analysis publish with psychology bridge',
    '2026-04-11 10:10:00+00'
  ),
  (
    '22222222-2222-2222-2222-22222222200c', '11111111-1111-1111-1111-11111111100c',
    '33333333-3333-3333-3333-333333333009', 1,
    's3://pst/published/video/emotional-resilience/v1.json',
    '{"captions":["tr","en"],"transcript_linked":true}'::jsonb,
    '2026-04-11 10:11:00+00', 'release.bot', 'Video publish',
    '2026-04-11 10:11:00+00'
  ),
  (
    '22222222-2222-2222-2222-22222222200d', '11111111-1111-1111-1111-11111111100d',
    '33333333-3333-3333-3333-333333333003', 1,
    's3://pst/published/modules/emotion-regulation/v1.json',
    '{"composition":"emotion_entry_packages"}'::jsonb,
    '2026-04-11 10:12:00+00', 'release.bot', 'Emotion-based module publish',
    '2026-04-11 10:12:00+00'
  )
on conflict do nothing;

insert into content_versions (
  id, content_item_id, source_document_id, version_no, structured_payload_ref, metadata, published_at, published_by, change_summary, created_at
) values
  ('22222222-2222-2222-2222-000000000010', '11111111-1111-1111-1111-000000000010', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/sabahla-baslayan-denge-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000011', '11111111-1111-1111-1111-000000000011', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/kaygidan-netlige-yolculuk/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000012', '11111111-1111-1111-1111-000000000012', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/niyet-ve-devam-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000013', '11111111-1111-1111-1111-000000000013', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/sukrun-rengi-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000014', '11111111-1111-1111-1111-000000000014', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/belirsizlikte-guven-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000015', '11111111-1111-1111-1111-000000000015', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/yavaslama-ve-farkindalik-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000016', '11111111-1111-1111-1111-000000000016', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/merhametli-kalp-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000017', '11111111-1111-1111-1111-000000000017', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/korkudan-cesarete-yolculuk/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000018', '11111111-1111-1111-1111-000000000018', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/aidiyet-ve-sohbet-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000019', '11111111-1111-1111-1111-000000000019', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/yorgunluktan-toparlanmaya-yolculuk/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000001a', '11111111-1111-1111-1111-00000000001a', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/sessizlikte-tefekkur-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000001b', '11111111-1111-1111-1111-00000000001b', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/dua-ile-yakinlik-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000001c', '11111111-1111-1111-1111-00000000001c', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/kalp-temizligi-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000001d', '11111111-1111-1111-1111-00000000001d', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/ferahliga-acilan-yolculuk/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000001e', '11111111-1111-1111-1111-00000000001e', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/teslimiyet-ve-gayret-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000001f', '11111111-1111-1111-1111-00000000001f', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/sabitlik-ve-sebat-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000020', '11111111-1111-1111-1111-000000000020', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/huzunden-umuda-yolculuk/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000021', '11111111-1111-1111-1111-000000000021', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/gunluk-denge-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000022', '11111111-1111-1111-1111-000000000022', '33333333-3333-3333-3333-333333333001', 1, 's3://pst/published/journeys/ic-dayaniklilik-yolculugu/v1.json', '{"contains":["module","module","workshop","ebook"]}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded discovery seed publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000030', '11111111-1111-1111-1111-000000000030', '33333333-3333-3333-3333-333333333002', 1, 's3://pst/published/modules/sabri-derinlestirme-modulu/v1.json', '{"composition":"spiritual_lesson_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000031', '11111111-1111-1111-1111-000000000031', '33333333-3333-3333-3333-333333333002', 1, 's3://pst/published/modules/dua-ve-yakinlik-modulu/v1.json', '{"composition":"spiritual_lesson_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000032', '11111111-1111-1111-1111-000000000032', '33333333-3333-3333-3333-333333333002', 1, 's3://pst/published/modules/tevazu-ve-hizmet-modulu/v1.json', '{"composition":"spiritual_lesson_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000033', '11111111-1111-1111-1111-000000000033', '33333333-3333-3333-3333-333333333002', 1, 's3://pst/published/modules/belirsizlikte-guven-modulu/v1.json', '{"composition":"spiritual_lesson_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000034', '11111111-1111-1111-1111-000000000034', '33333333-3333-3333-3333-333333333002', 1, 's3://pst/published/modules/kirilganliktan-hikmete-modulu/v1.json', '{"composition":"spiritual_lesson_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000035', '11111111-1111-1111-1111-000000000035', '33333333-3333-3333-3333-333333333010', 1, 's3://pst/published/modules/sebat-ve-tazelenme-modulu/v1.json', '{"composition":"spiritual_lesson_packages","discovery_type":"module","published_from":"rich_text_json","reader_delivery":"structured_payload_ref","rag_source":"published_payload"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish from in-db rich text source to published reader payload', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000036', '11111111-1111-1111-1111-000000000036', '33333333-3333-3333-3333-333333333002', 1, 's3://pst/published/modules/merhametli-bakis-modulu/v1.json', '{"composition":"spiritual_lesson_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000037', '11111111-1111-1111-1111-000000000037', '33333333-3333-3333-3333-333333333003', 1, 's3://pst/published/modules/umut-ve-cesaret-modulu/v1.json', '{"composition":"emotion_entry_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000038', '11111111-1111-1111-1111-000000000038', '33333333-3333-3333-3333-333333333003', 1, 's3://pst/published/modules/korku-ve-tedirginlik-modulu/v1.json', '{"composition":"emotion_entry_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000039', '11111111-1111-1111-1111-000000000039', '33333333-3333-3333-3333-333333333003', 1, 's3://pst/published/modules/huzun-ve-ozlem-modulu/v1.json', '{"composition":"emotion_entry_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000003a', '11111111-1111-1111-1111-00000000003a', '33333333-3333-3333-3333-333333333003', 1, 's3://pst/published/modules/sucluluk-ve-mahcubiyet-modulu/v1.json', '{"composition":"emotion_entry_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000003b', '11111111-1111-1111-1111-00000000003b', '33333333-3333-3333-3333-333333333003', 1, 's3://pst/published/modules/aidiyet-ve-yalnizlik-modulu/v1.json', '{"composition":"emotion_entry_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000003c', '11111111-1111-1111-1111-00000000003c', '33333333-3333-3333-3333-333333333003', 1, 's3://pst/published/modules/ferahlama-ve-rahatlama-modulu/v1.json', '{"composition":"emotion_entry_packages","discovery_type":"module"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded module publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000040', '11111111-1111-1111-1111-000000000040', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/kaygi-aninda-denge-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000041', '11111111-1111-1111-1111-000000000041', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/iliski-onarimi-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000042', '11111111-1111-1111-1111-000000000042', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/belirsizlikle-yasama-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000043', '11111111-1111-1111-1111-000000000043', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/sukrun-ritmi-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000044', '11111111-1111-1111-1111-000000000044', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/yalnizlik-ve-aidiyet-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000045', '11111111-1111-1111-1111-000000000045', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/yorgun-kalbi-toparlama-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000046', '11111111-1111-1111-1111-000000000046', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/niyet-tazeleme-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000047', '11111111-1111-1111-1111-000000000047', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/sinir-ve-merhamet-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000048', '11111111-1111-1111-1111-000000000048', '33333333-3333-3333-3333-333333333007', 1, 's3://pst/published/workshops/cesaretle-adim-atma-atolyesi/v1.json', '{"stage_count":1,"has_workbook":true,"discovery_type":"workshop"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded workshop publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000050', '11111111-1111-1111-1111-000000000050', '33333333-3333-3333-3333-333333333004', 1, 's3://pst/published/ebooks/belirsizlikte-yurumek/v1.json', '{"toc_depth":2,"audio_available":true,"discovery_type":"ebook"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded ebook publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000051', '11111111-1111-1111-1111-000000000051', '33333333-3333-3333-3333-333333333004', 1, 's3://pst/published/ebooks/merhametin-dili/v1.json', '{"toc_depth":2,"audio_available":false,"discovery_type":"ebook"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded ebook publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000052', '11111111-1111-1111-1111-000000000052', '33333333-3333-3333-3333-333333333004', 1, 's3://pst/published/ebooks/kaygidan-dengeye-notlar/v1.json', '{"toc_depth":2,"audio_available":true,"discovery_type":"ebook"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded ebook publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000053', '11111111-1111-1111-1111-000000000053', '33333333-3333-3333-3333-333333333004', 1, 's3://pst/published/ebooks/sessizlik-ve-tefekkur/v1.json', '{"toc_depth":2,"audio_available":false,"discovery_type":"ebook"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded ebook publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000060', '11111111-1111-1111-1111-000000000060', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/tefekkurde-derinlesmek/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000061', '11111111-1111-1111-1111-000000000061', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/sukretmek-ve-gormek/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000062', '11111111-1111-1111-1111-000000000062', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/teslimiyet-ve-gayret/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000063', '11111111-1111-1111-1111-000000000063', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/kalp-temizligi/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000064', '11111111-1111-1111-1111-000000000064', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/dua-ile-yakinlik/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000065', '11111111-1111-1111-1111-000000000065', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/merhametli-bakis/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000066', '11111111-1111-1111-1111-000000000066', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/ic-muhasebe/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000067', '11111111-1111-1111-1111-000000000067', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/gonul-yorgunlugunu-fark-etmek/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000068', '11111111-1111-1111-1111-000000000068', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/sabitlik-ve-sebat/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000069', '11111111-1111-1111-1111-000000000069', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/tevazu-ve-dayaniklilik/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000006a', '11111111-1111-1111-1111-00000000006a', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/hizmet-bilinci/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000006b', '11111111-1111-1111-1111-00000000006b', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/affetmeye-yaklasmak/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000006c', '11111111-1111-1111-1111-00000000006c', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/gecikmeye-tahammul/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000006d', '11111111-1111-1111-1111-00000000006d', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/nimetin-izini-surmek/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000006e', '11111111-1111-1111-1111-00000000006e', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/yalnizlikta-saglam-kalmak/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000006f', '11111111-1111-1111-1111-00000000006f', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/sohbetin-bereketi/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000070', '11111111-1111-1111-1111-000000000070', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/korkudan-emanete/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000071', '11111111-1111-1111-1111-000000000071', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/belirsizlikte-guven/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000072', '11111111-1111-1111-1111-000000000072', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/hedefi-tazelemek/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000073', '11111111-1111-1111-1111-000000000073', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/kirikliktan-hikmete/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000074', '11111111-1111-1111-1111-000000000074', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/yoldan-dusunce-toparlanmak/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000075', '11111111-1111-1111-1111-000000000075', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/sessizlikte-dinlemek/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000076', '11111111-1111-1111-1111-000000000076', '33333333-3333-3333-3333-333333333005', 1, 's3://pst/published/kesifler/sukrun-pratigi/v1.json', '{"module_ready":true,"discovery_type":"spiritual_lesson"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded lesson publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000080', '11111111-1111-1111-1111-000000000080', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/umut/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000081', '11111111-1111-1111-1111-000000000081', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/ozlem/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000082', '11111111-1111-1111-1111-000000000082', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/mahcubiyet/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000083', '11111111-1111-1111-1111-000000000083', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/minnet/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000084', '11111111-1111-1111-1111-000000000084', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/yalnizlik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000085', '11111111-1111-1111-1111-000000000085', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/bunalmislik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000086', '11111111-1111-1111-1111-000000000086', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/hayal-kirikligi/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000087', '11111111-1111-1111-1111-000000000087', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/guvende-hissetme/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000088', '11111111-1111-1111-1111-000000000088', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/korku/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000089', '11111111-1111-1111-1111-000000000089', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/merak/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000008a', '11111111-1111-1111-1111-00000000008a', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/kararsizlik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000008b', '11111111-1111-1111-1111-00000000008b', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/sevinc/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000008c', '11111111-1111-1111-1111-00000000008c', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/huzun/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000008d', '11111111-1111-1111-1111-00000000008d', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/sucluluk/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000008e', '11111111-1111-1111-1111-00000000008e', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/rahatlama/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000008f', '11111111-1111-1111-1111-00000000008f', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/caresizlik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000090', '11111111-1111-1111-1111-000000000090', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/sabirsizlik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000091', '11111111-1111-1111-1111-000000000091', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/guven/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000092', '11111111-1111-1111-1111-000000000092', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/direnc/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000093', '11111111-1111-1111-1111-000000000093', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/sikisiklik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000094', '11111111-1111-1111-1111-000000000094', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/utanc/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000095', '11111111-1111-1111-1111-000000000095', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/aidiyet/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000096', '11111111-1111-1111-1111-000000000096', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/kiskanclik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000097', '11111111-1111-1111-1111-000000000097', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/hayranlik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000098', '11111111-1111-1111-1111-000000000098', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/yorgunluk/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-000000000099', '11111111-1111-1111-1111-000000000099', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/ferahlik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000009a', '11111111-1111-1111-1111-00000000009a', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/tedirginlik/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00'),
  ('22222222-2222-2222-2222-00000000009b', '11111111-1111-1111-1111-00000000009b', '33333333-3333-3333-3333-333333333006', 1, 's3://pst/published/duygular/cesaret/v1.json', '{"recommended_surface":"discovery_emotion","discovery_type":"emotion"}'::jsonb, '2026-04-12 09:20:00+00', 'release.bot', 'Expanded emotion publish', '2026-04-12 09:20:00+00')
on conflict do nothing;

insert into content_assets (
  id, content_item_id, content_version_id, asset_type, storage_uri, mime_type,
  byte_size, checksum, download_policy, created_at
) values
  (
    '44444444-4444-4444-4444-444444444001', '11111111-1111-1111-1111-111111111001',
    '22222222-2222-2222-2222-222222222001', 'cover',
    's3://pst/assets/journeys/inner-balance-cover.jpg', 'image/jpeg',
    245000, 'sha256:journey-cover-1', 'stream_only', '2026-04-11 10:20:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444002', '11111111-1111-1111-1111-111111111004',
    '22222222-2222-2222-2222-222222222004', 'cover',
    's3://pst/assets/ebooks/kalbimin-beyazi-cover.jpg', 'image/jpeg',
    198000, 'sha256:ebook-cover-1', 'stream_only', '2026-04-11 10:21:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444003', '11111111-1111-1111-1111-111111111004',
    '22222222-2222-2222-2222-222222222004', 'ebook_package',
    's3://pst/assets/ebooks/kalbimin-beyazi-package.epub', 'application/epub+zip',
    5242880, 'sha256:ebook-package-1', 'downloadable', '2026-04-11 10:22:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444004', '11111111-1111-1111-1111-111111111003',
    '22222222-2222-2222-2222-222222222003', 'worksheet_pdf',
    's3://pst/assets/workshops/mutlak-muhtaclik-facilitator-guide.pdf', 'application/pdf',
    3145728, 'sha256:facilitator-guide-1', 'downloadable', '2026-04-11 10:23:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444005', '11111111-1111-1111-1111-111111111003',
    '22222222-2222-2222-2222-222222222003', 'worksheet_pdf',
    's3://pst/assets/workshops/mutlak-muhtaclik-workbook.pdf', 'application/pdf',
    4194304, 'sha256:workbook-1', 'downloadable', '2026-04-11 10:24:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444006', '11111111-1111-1111-1111-111111111003',
    '22222222-2222-2222-2222-222222222003', 'cover',
    's3://pst/assets/workshops/mutlak-muhtaclik-cover.jpg', 'image/jpeg',
    231000, 'sha256:workshop-cover-1', 'stream_only', '2026-04-11 10:25:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444007', '11111111-1111-1111-1111-11111111100b',
    '22222222-2222-2222-2222-22222222200b', 'document',
    's3://pst/assets/hadith/kuvvetli-mumin-analysis.pdf', 'application/pdf',
    1572864, 'sha256:hadith-doc-1', 'downloadable', '2026-04-11 10:26:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444008', '11111111-1111-1111-1111-11111111100c',
    '22222222-2222-2222-2222-22222222200c', 'image',
    's3://pst/assets/video/emotional-resilience-cover.jpg', 'image/jpeg',
    267000, 'sha256:video-cover-1', 'stream_only', '2026-04-11 10:27:00+00'
  )
on conflict do nothing;

insert into content_assets (
  id, content_item_id, content_version_id, asset_type, storage_uri, mime_type, byte_size, checksum, download_policy, created_at
) values
  ('44444444-4444-4444-4444-000000000040', '11111111-1111-1111-1111-000000000040', '22222222-2222-2222-2222-000000000040', 'worksheet_pdf', 's3://pst/assets/workshops/kaygi-aninda-denge-atolyesi-facilitator-guide.pdf', 'application/pdf', 2600000, 'sha256:kaygi-aninda-denge-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000041', '11111111-1111-1111-1111-000000000040', '22222222-2222-2222-2222-000000000040', 'worksheet_pdf', 's3://pst/assets/workshops/kaygi-aninda-denge-atolyesi-workbook.pdf', 'application/pdf', 3100000, 'sha256:kaygi-aninda-denge-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000042', '11111111-1111-1111-1111-000000000041', '22222222-2222-2222-2222-000000000041', 'worksheet_pdf', 's3://pst/assets/workshops/iliski-onarimi-atolyesi-facilitator-guide.pdf', 'application/pdf', 2610000, 'sha256:iliski-onarimi-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000043', '11111111-1111-1111-1111-000000000041', '22222222-2222-2222-2222-000000000041', 'worksheet_pdf', 's3://pst/assets/workshops/iliski-onarimi-atolyesi-workbook.pdf', 'application/pdf', 3110000, 'sha256:iliski-onarimi-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000044', '11111111-1111-1111-1111-000000000042', '22222222-2222-2222-2222-000000000042', 'worksheet_pdf', 's3://pst/assets/workshops/belirsizlikle-yasama-atolyesi-facilitator-guide.pdf', 'application/pdf', 2620000, 'sha256:belirsizlikle-yasama-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000045', '11111111-1111-1111-1111-000000000042', '22222222-2222-2222-2222-000000000042', 'worksheet_pdf', 's3://pst/assets/workshops/belirsizlikle-yasama-atolyesi-workbook.pdf', 'application/pdf', 3120000, 'sha256:belirsizlikle-yasama-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000046', '11111111-1111-1111-1111-000000000043', '22222222-2222-2222-2222-000000000043', 'worksheet_pdf', 's3://pst/assets/workshops/sukrun-ritmi-atolyesi-facilitator-guide.pdf', 'application/pdf', 2630000, 'sha256:sukrun-ritmi-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000047', '11111111-1111-1111-1111-000000000043', '22222222-2222-2222-2222-000000000043', 'worksheet_pdf', 's3://pst/assets/workshops/sukrun-ritmi-atolyesi-workbook.pdf', 'application/pdf', 3130000, 'sha256:sukrun-ritmi-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000048', '11111111-1111-1111-1111-000000000044', '22222222-2222-2222-2222-000000000044', 'worksheet_pdf', 's3://pst/assets/workshops/yalnizlik-ve-aidiyet-atolyesi-facilitator-guide.pdf', 'application/pdf', 2640000, 'sha256:yalnizlik-ve-aidiyet-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000049', '11111111-1111-1111-1111-000000000044', '22222222-2222-2222-2222-000000000044', 'worksheet_pdf', 's3://pst/assets/workshops/yalnizlik-ve-aidiyet-atolyesi-workbook.pdf', 'application/pdf', 3140000, 'sha256:yalnizlik-ve-aidiyet-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-00000000004a', '11111111-1111-1111-1111-000000000045', '22222222-2222-2222-2222-000000000045', 'worksheet_pdf', 's3://pst/assets/workshops/yorgun-kalbi-toparlama-atolyesi-facilitator-guide.pdf', 'application/pdf', 2650000, 'sha256:yorgun-kalbi-toparlama-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-00000000004b', '11111111-1111-1111-1111-000000000045', '22222222-2222-2222-2222-000000000045', 'worksheet_pdf', 's3://pst/assets/workshops/yorgun-kalbi-toparlama-atolyesi-workbook.pdf', 'application/pdf', 3150000, 'sha256:yorgun-kalbi-toparlama-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-00000000004c', '11111111-1111-1111-1111-000000000046', '22222222-2222-2222-2222-000000000046', 'worksheet_pdf', 's3://pst/assets/workshops/niyet-tazeleme-atolyesi-facilitator-guide.pdf', 'application/pdf', 2660000, 'sha256:niyet-tazeleme-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-00000000004d', '11111111-1111-1111-1111-000000000046', '22222222-2222-2222-2222-000000000046', 'worksheet_pdf', 's3://pst/assets/workshops/niyet-tazeleme-atolyesi-workbook.pdf', 'application/pdf', 3160000, 'sha256:niyet-tazeleme-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-00000000004e', '11111111-1111-1111-1111-000000000047', '22222222-2222-2222-2222-000000000047', 'worksheet_pdf', 's3://pst/assets/workshops/sinir-ve-merhamet-atolyesi-facilitator-guide.pdf', 'application/pdf', 2670000, 'sha256:sinir-ve-merhamet-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-00000000004f', '11111111-1111-1111-1111-000000000047', '22222222-2222-2222-2222-000000000047', 'worksheet_pdf', 's3://pst/assets/workshops/sinir-ve-merhamet-atolyesi-workbook.pdf', 'application/pdf', 3170000, 'sha256:sinir-ve-merhamet-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000050', '11111111-1111-1111-1111-000000000048', '22222222-2222-2222-2222-000000000048', 'worksheet_pdf', 's3://pst/assets/workshops/cesaretle-adim-atma-atolyesi-facilitator-guide.pdf', 'application/pdf', 2680000, 'sha256:cesaretle-adim-atma-atolyesi-guide', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000051', '11111111-1111-1111-1111-000000000048', '22222222-2222-2222-2222-000000000048', 'worksheet_pdf', 's3://pst/assets/workshops/cesaretle-adim-atma-atolyesi-workbook.pdf', 'application/pdf', 3180000, 'sha256:cesaretle-adim-atma-atolyesi-workbook', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000020', '11111111-1111-1111-1111-000000000050', '22222222-2222-2222-2222-000000000050', 'cover', 's3://pst/assets/ebooks/belirsizlikte-yurumek-cover.jpg', 'image/jpeg', 185000, 'sha256:belirsizlikte-yurumek-cover', 'stream_only', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000021', '11111111-1111-1111-1111-000000000050', '22222222-2222-2222-2222-000000000050', 'ebook_package', 's3://pst/assets/ebooks/belirsizlikte-yurumek-package.epub', 'application/epub+zip', 4900000, 'sha256:belirsizlikte-yurumek-package', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000022', '11111111-1111-1111-1111-000000000051', '22222222-2222-2222-2222-000000000051', 'cover', 's3://pst/assets/ebooks/merhametin-dili-cover.jpg', 'image/jpeg', 190000, 'sha256:merhametin-dili-cover', 'stream_only', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000023', '11111111-1111-1111-1111-000000000051', '22222222-2222-2222-2222-000000000051', 'ebook_package', 's3://pst/assets/ebooks/merhametin-dili-package.epub', 'application/epub+zip', 5020000, 'sha256:merhametin-dili-package', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000024', '11111111-1111-1111-1111-000000000052', '22222222-2222-2222-2222-000000000052', 'cover', 's3://pst/assets/ebooks/kaygidan-dengeye-notlar-cover.jpg', 'image/jpeg', 195000, 'sha256:kaygidan-dengeye-notlar-cover', 'stream_only', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000025', '11111111-1111-1111-1111-000000000052', '22222222-2222-2222-2222-000000000052', 'ebook_package', 's3://pst/assets/ebooks/kaygidan-dengeye-notlar-package.epub', 'application/epub+zip', 5140000, 'sha256:kaygidan-dengeye-notlar-package', 'downloadable', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000026', '11111111-1111-1111-1111-000000000053', '22222222-2222-2222-2222-000000000053', 'cover', 's3://pst/assets/ebooks/sessizlik-ve-tefekkur-cover.jpg', 'image/jpeg', 200000, 'sha256:sessizlik-ve-tefekkur-cover', 'stream_only', '2026-04-12 09:40:00+00'),
  ('44444444-4444-4444-4444-000000000027', '11111111-1111-1111-1111-000000000053', '22222222-2222-2222-2222-000000000053', 'ebook_package', 's3://pst/assets/ebooks/sessizlik-ve-tefekkur-package.epub', 'application/epub+zip', 5260000, 'sha256:sessizlik-ve-tefekkur-package', 'downloadable', '2026-04-12 09:40:00+00')
on conflict do nothing;

insert into content_relations (
  id, from_content_item_id, to_content_item_id, relation_type, sort_order, metadata, created_at
) values
  (
    gen_random_uuid(), '11111111-1111-1111-1111-11111111100b',
    '11111111-1111-1111-1111-111111111003', 'supports_workshop', 1,
    '{"why":"hadith reinforces active effort and reliance balance"}'::jsonb,
    '2026-04-11 10:30:00+00'
  ),
  (
    gen_random_uuid(), '11111111-1111-1111-1111-11111111100b',
    '11111111-1111-1111-1111-11111111100d', 'supports_module', 1,
    '{"why":"hadith connects to learned helplessness and resilience"}'::jsonb,
    '2026-04-11 10:31:00+00'
  ),
  (
    gen_random_uuid(), '11111111-1111-1111-1111-111111111006',
    '11111111-1111-1111-1111-111111111009', 'related_emotion', 1,
    '{"pattern":"sabr_under_anxiety"}'::jsonb,
    '2026-04-11 10:32:00+00'
  ),
  (
    gen_random_uuid(), '11111111-1111-1111-1111-111111111007',
    '11111111-1111-1111-1111-111111111004', 'recommended_reading', 1,
    '{"surface":"end_of_module_cta"}'::jsonb,
    '2026-04-11 10:33:00+00'
  )
on conflict do nothing;

insert into content_tags (id, tag_type, label, slug, created_at) values
  ('55555555-5555-5555-5555-555555555001', 'topic', 'Sabir', 'sabr', '2026-04-11 10:35:00+00'),
  ('55555555-5555-5555-5555-555555555002', 'emotion', 'Kaygi', 'kaygi', '2026-04-11 10:35:00+00'),
  ('55555555-5555-5555-5555-555555555003', 'audience', 'Yetiskin', 'yetiskin', '2026-04-11 10:35:00+00'),
  ('55555555-5555-5555-5555-555555555004', 'topic', 'Hadis Analizi', 'hadis-analizi', '2026-04-11 10:35:00+00')
on conflict do nothing;

insert into content_item_tags (content_item_id, content_tag_id) values
  ('11111111-1111-1111-1111-111111111001', '55555555-5555-5555-5555-555555555001'),
  ('11111111-1111-1111-1111-111111111003', '55555555-5555-5555-5555-555555555003'),
  ('11111111-1111-1111-1111-111111111009', '55555555-5555-5555-5555-555555555002'),
  ('11111111-1111-1111-1111-11111111100b', '55555555-5555-5555-5555-555555555004')
on conflict do nothing;

insert into journeys (content_item_id, duration_days, level, created_at) values
  ('11111111-1111-1111-1111-111111111001', 21, 'intermediate', '2026-04-11 10:40:00+00')
on conflict do nothing;

insert into journeys (
  content_item_id, duration_days, level, created_at
) values
  ('11111111-1111-1111-1111-000000000010', 7, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000011', 14, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000012', 10, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000013', 12, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000014', 14, 'intermediate', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000015', 9, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000016', 15, 'intermediate', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000017', 14, 'intermediate', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000018', 11, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000019', 21, 'intermediate', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000001a', 8, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000001b', 10, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000001c', 16, 'advanced', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000001d', 13, 'intermediate', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000001e', 18, 'advanced', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000001f', 21, 'advanced', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000020', 12, 'intermediate', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000021', 7, 'beginner', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000022', 28, 'advanced', '2026-04-12 10:00:00+00')
on conflict do nothing;

insert into journey_items (
  id, journey_content_item_id, child_content_item_id, child_type, order_index, is_required, created_at
) values
  (
    '66666666-6666-6666-6666-666666666001', '11111111-1111-1111-1111-111111111001',
    '11111111-1111-1111-1111-111111111002', 'module', 1, true, '2026-04-11 10:41:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666002', '11111111-1111-1111-1111-111111111001',
    '11111111-1111-1111-1111-11111111100d', 'module', 2, true, '2026-04-11 10:41:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666003', '11111111-1111-1111-1111-111111111001',
    '11111111-1111-1111-1111-111111111003', 'workshop', 3, true, '2026-04-11 10:41:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666004', '11111111-1111-1111-1111-111111111001',
    '11111111-1111-1111-1111-111111111004', 'ebook', 4, false, '2026-04-11 10:41:00+00'
  )
on conflict do nothing;

insert into journey_items (
  id, journey_content_item_id, child_content_item_id, child_type, order_index, is_required, created_at
) values
  ('66666666-6666-6666-6666-000000000201', '11111111-1111-1111-1111-000000000010', '11111111-1111-1111-1111-000000000002', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000202', '11111111-1111-1111-1111-000000000010', '11111111-1111-1111-1111-000000000033', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000203', '11111111-1111-1111-1111-000000000010', '11111111-1111-1111-1111-000000000003', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000204', '11111111-1111-1111-1111-000000000010', '11111111-1111-1111-1111-000000000004', 'ebook', 4, false, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000209', '11111111-1111-1111-1111-000000000011', '11111111-1111-1111-1111-00000000000d', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000020a', '11111111-1111-1111-1111-000000000011', '11111111-1111-1111-1111-000000000034', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000020b', '11111111-1111-1111-1111-000000000011', '11111111-1111-1111-1111-000000000040', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000020c', '11111111-1111-1111-1111-000000000011', '11111111-1111-1111-1111-000000000050', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000211', '11111111-1111-1111-1111-000000000012', '11111111-1111-1111-1111-000000000030', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000212', '11111111-1111-1111-1111-000000000012', '11111111-1111-1111-1111-000000000035', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000213', '11111111-1111-1111-1111-000000000012', '11111111-1111-1111-1111-000000000041', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000214', '11111111-1111-1111-1111-000000000012', '11111111-1111-1111-1111-000000000051', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000219', '11111111-1111-1111-1111-000000000013', '11111111-1111-1111-1111-000000000031', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000021a', '11111111-1111-1111-1111-000000000013', '11111111-1111-1111-1111-000000000036', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000021b', '11111111-1111-1111-1111-000000000013', '11111111-1111-1111-1111-000000000042', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000021c', '11111111-1111-1111-1111-000000000013', '11111111-1111-1111-1111-000000000052', 'ebook', 4, false, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000221', '11111111-1111-1111-1111-000000000014', '11111111-1111-1111-1111-000000000032', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000222', '11111111-1111-1111-1111-000000000014', '11111111-1111-1111-1111-000000000037', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000223', '11111111-1111-1111-1111-000000000014', '11111111-1111-1111-1111-000000000043', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000224', '11111111-1111-1111-1111-000000000014', '11111111-1111-1111-1111-000000000053', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000229', '11111111-1111-1111-1111-000000000015', '11111111-1111-1111-1111-000000000033', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000022a', '11111111-1111-1111-1111-000000000015', '11111111-1111-1111-1111-000000000038', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000022b', '11111111-1111-1111-1111-000000000015', '11111111-1111-1111-1111-000000000044', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000022c', '11111111-1111-1111-1111-000000000015', '11111111-1111-1111-1111-000000000004', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000231', '11111111-1111-1111-1111-000000000016', '11111111-1111-1111-1111-000000000034', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000232', '11111111-1111-1111-1111-000000000016', '11111111-1111-1111-1111-000000000039', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000233', '11111111-1111-1111-1111-000000000016', '11111111-1111-1111-1111-000000000045', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000234', '11111111-1111-1111-1111-000000000016', '11111111-1111-1111-1111-000000000050', 'ebook', 4, false, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000239', '11111111-1111-1111-1111-000000000017', '11111111-1111-1111-1111-000000000035', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000023a', '11111111-1111-1111-1111-000000000017', '11111111-1111-1111-1111-00000000003a', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000023b', '11111111-1111-1111-1111-000000000017', '11111111-1111-1111-1111-000000000046', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000023c', '11111111-1111-1111-1111-000000000017', '11111111-1111-1111-1111-000000000051', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000241', '11111111-1111-1111-1111-000000000018', '11111111-1111-1111-1111-000000000036', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000242', '11111111-1111-1111-1111-000000000018', '11111111-1111-1111-1111-00000000003b', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000243', '11111111-1111-1111-1111-000000000018', '11111111-1111-1111-1111-000000000047', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000244', '11111111-1111-1111-1111-000000000018', '11111111-1111-1111-1111-000000000052', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000249', '11111111-1111-1111-1111-000000000019', '11111111-1111-1111-1111-000000000037', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000024a', '11111111-1111-1111-1111-000000000019', '11111111-1111-1111-1111-00000000003c', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000024b', '11111111-1111-1111-1111-000000000019', '11111111-1111-1111-1111-000000000048', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000024c', '11111111-1111-1111-1111-000000000019', '11111111-1111-1111-1111-000000000053', 'ebook', 4, false, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000251', '11111111-1111-1111-1111-00000000001a', '11111111-1111-1111-1111-000000000038', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000252', '11111111-1111-1111-1111-00000000001a', '11111111-1111-1111-1111-000000000002', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000253', '11111111-1111-1111-1111-00000000001a', '11111111-1111-1111-1111-000000000003', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000254', '11111111-1111-1111-1111-00000000001a', '11111111-1111-1111-1111-000000000004', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000259', '11111111-1111-1111-1111-00000000001b', '11111111-1111-1111-1111-000000000039', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000025a', '11111111-1111-1111-1111-00000000001b', '11111111-1111-1111-1111-00000000000d', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000025b', '11111111-1111-1111-1111-00000000001b', '11111111-1111-1111-1111-000000000040', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000025c', '11111111-1111-1111-1111-00000000001b', '11111111-1111-1111-1111-000000000050', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000261', '11111111-1111-1111-1111-00000000001c', '11111111-1111-1111-1111-00000000003a', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000262', '11111111-1111-1111-1111-00000000001c', '11111111-1111-1111-1111-000000000030', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000263', '11111111-1111-1111-1111-00000000001c', '11111111-1111-1111-1111-000000000041', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000264', '11111111-1111-1111-1111-00000000001c', '11111111-1111-1111-1111-000000000051', 'ebook', 4, false, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000269', '11111111-1111-1111-1111-00000000001d', '11111111-1111-1111-1111-00000000003b', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000026a', '11111111-1111-1111-1111-00000000001d', '11111111-1111-1111-1111-000000000031', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000026b', '11111111-1111-1111-1111-00000000001d', '11111111-1111-1111-1111-000000000042', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000026c', '11111111-1111-1111-1111-00000000001d', '11111111-1111-1111-1111-000000000052', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000271', '11111111-1111-1111-1111-00000000001e', '11111111-1111-1111-1111-00000000003c', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000272', '11111111-1111-1111-1111-00000000001e', '11111111-1111-1111-1111-000000000032', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000273', '11111111-1111-1111-1111-00000000001e', '11111111-1111-1111-1111-000000000043', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000274', '11111111-1111-1111-1111-00000000001e', '11111111-1111-1111-1111-000000000053', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000279', '11111111-1111-1111-1111-00000000001f', '11111111-1111-1111-1111-000000000002', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000027a', '11111111-1111-1111-1111-00000000001f', '11111111-1111-1111-1111-000000000033', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000027b', '11111111-1111-1111-1111-00000000001f', '11111111-1111-1111-1111-000000000044', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000027c', '11111111-1111-1111-1111-00000000001f', '11111111-1111-1111-1111-000000000004', 'ebook', 4, false, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000281', '11111111-1111-1111-1111-000000000020', '11111111-1111-1111-1111-00000000000d', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000282', '11111111-1111-1111-1111-000000000020', '11111111-1111-1111-1111-000000000034', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000283', '11111111-1111-1111-1111-000000000020', '11111111-1111-1111-1111-000000000045', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000284', '11111111-1111-1111-1111-000000000020', '11111111-1111-1111-1111-000000000050', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000289', '11111111-1111-1111-1111-000000000021', '11111111-1111-1111-1111-000000000030', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000028a', '11111111-1111-1111-1111-000000000021', '11111111-1111-1111-1111-000000000035', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000028b', '11111111-1111-1111-1111-000000000021', '11111111-1111-1111-1111-000000000046', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000028c', '11111111-1111-1111-1111-000000000021', '11111111-1111-1111-1111-000000000051', 'ebook', 4, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000291', '11111111-1111-1111-1111-000000000022', '11111111-1111-1111-1111-000000000031', 'module', 1, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000292', '11111111-1111-1111-1111-000000000022', '11111111-1111-1111-1111-000000000036', 'module', 2, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000293', '11111111-1111-1111-1111-000000000022', '11111111-1111-1111-1111-000000000047', 'workshop', 3, true, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000294', '11111111-1111-1111-1111-000000000022', '11111111-1111-1111-1111-000000000052', 'ebook', 4, false, '2026-04-12 10:00:00+00')
on conflict do nothing;

insert into modules (content_item_id, description, created_at) values
  (
    '11111111-1111-1111-1111-111111111002',
    'Kesifler kaynakli modul; sabir, niyet ve devam temalari etrafinda paketlenmis okuma akisi.',
    '2026-04-11 10:42:00+00'
  ),
  (
    '11111111-1111-1111-1111-11111111100d',
    'Duygular Evreni kaynakli modul; kaygi ve sukunet maddelerini duzenleme perspektifinden bir araya getirir.',
    '2026-04-11 10:42:00+00'
  )
on conflict do nothing;

insert into modules (
  content_item_id, description, created_at
) values
  ('11111111-1111-1111-1111-000000000030', 'Sabri Derinlestirme Modulu; birden fazla ruhsal dersi paketleyip uygulama akisina tasir.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000031', 'Dua ve Yakinlik Modulu; birden fazla ruhsal dersi paketleyip uygulama akisina tasir.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000032', 'Tevazu ve Hizmet Modulu; birden fazla ruhsal dersi paketleyip uygulama akisina tasir.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000033', 'Belirsizlikte Guven Modulu; birden fazla ruhsal dersi paketleyip uygulama akisina tasir.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000034', 'Kirilganliktan Hikmete Modulu; birden fazla ruhsal dersi paketleyip uygulama akisina tasir.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000035', 'Sebat ve Tazelenme Modulu; birden fazla ruhsal dersi paketleyip uygulama akisina tasir.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000036', 'Merhametli Bakis Modulu; birden fazla ruhsal dersi paketleyip uygulama akisina tasir.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000037', 'Umut ve Cesaret Modulu; birden fazla duygu maddesini fark etme ve duzenleme akisinda toplar.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000038', 'Korku ve Tedirginlik Modulu; birden fazla duygu maddesini fark etme ve duzenleme akisinda toplar.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000039', 'Huzun ve Ozlem Modulu; birden fazla duygu maddesini fark etme ve duzenleme akisinda toplar.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000003a', 'Sucluluk ve Mahcubiyet Modulu; birden fazla duygu maddesini fark etme ve duzenleme akisinda toplar.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000003b', 'Aidiyet ve Yalnizlik Modulu; birden fazla duygu maddesini fark etme ve duzenleme akisinda toplar.', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-00000000003c', 'Ferahlama ve Rahatlama Modulu; birden fazla duygu maddesini fark etme ve duzenleme akisinda toplar.', '2026-04-12 10:00:00+00')
on conflict do nothing;

insert into packages (
  id, module_content_item_id, source_content_item_id, source_domain_type, title, order_index, created_at
) values
  (
    '66666666-6666-6666-6666-666666666011', '11111111-1111-1111-1111-111111111002',
    '11111111-1111-1111-1111-111111111006', 'spiritual_lesson',
    'Sabir ve Farkindalik Paketi', 1, '2026-04-11 10:43:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666012', '11111111-1111-1111-1111-111111111002',
    '11111111-1111-1111-1111-111111111007', 'spiritual_lesson',
    'Niyet ve Devam Paketi', 2, '2026-04-11 10:43:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666013', '11111111-1111-1111-1111-11111111100d',
    '11111111-1111-1111-1111-111111111009', 'emotion_entry',
    'Kaygiyi Tanimak Paketi', 1, '2026-04-11 10:43:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666014', '11111111-1111-1111-1111-11111111100d',
    '11111111-1111-1111-1111-11111111100a', 'emotion_entry',
    'Sukuneti Insa Paketi', 2, '2026-04-11 10:43:00+00'
  )
on conflict do nothing;

insert into packages (
  id, module_content_item_id, source_content_item_id, source_domain_type, title, order_index, created_at
) values
  ('66666666-6666-6666-6666-000000000101', '11111111-1111-1111-1111-000000000030', '11111111-1111-1111-1111-000000000060', 'spiritual_lesson', 'Tefekkurde Derinlesmek Ders Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000102', '11111111-1111-1111-1111-000000000030', '11111111-1111-1111-1111-000000000061', 'spiritual_lesson', 'Sukretmek ve Gormek Ders Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000103', '11111111-1111-1111-1111-000000000030', '11111111-1111-1111-1111-000000000062', 'spiritual_lesson', 'Teslimiyet ve Gayret Ders Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000104', '11111111-1111-1111-1111-000000000030', '11111111-1111-1111-1111-000000000063', 'spiritual_lesson', 'Kalp Temizligi Ders Paketi', 4, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000010b', '11111111-1111-1111-1111-000000000031', '11111111-1111-1111-1111-000000000064', 'spiritual_lesson', 'Dua ile Yakinlik Ders Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000010c', '11111111-1111-1111-1111-000000000031', '11111111-1111-1111-1111-000000000065', 'spiritual_lesson', 'Merhametli Bakis Ders Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000010d', '11111111-1111-1111-1111-000000000031', '11111111-1111-1111-1111-000000000066', 'spiritual_lesson', 'Ic Muhasebe Ders Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000010e', '11111111-1111-1111-1111-000000000031', '11111111-1111-1111-1111-000000000067', 'spiritual_lesson', 'Gonul Yorgunlugunu Fark Etmek Ders Paketi', 4, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000115', '11111111-1111-1111-1111-000000000032', '11111111-1111-1111-1111-000000000068', 'spiritual_lesson', 'Sabitlik ve Sebat Ders Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000116', '11111111-1111-1111-1111-000000000032', '11111111-1111-1111-1111-000000000069', 'spiritual_lesson', 'Tevazu ve Dayaniklilik Ders Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000117', '11111111-1111-1111-1111-000000000032', '11111111-1111-1111-1111-00000000006a', 'spiritual_lesson', 'Hizmet Bilinci Ders Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000011f', '11111111-1111-1111-1111-000000000033', '11111111-1111-1111-1111-00000000006b', 'spiritual_lesson', 'Affetmeye Yaklasmak Ders Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000120', '11111111-1111-1111-1111-000000000033', '11111111-1111-1111-1111-00000000006c', 'spiritual_lesson', 'Gecikmeye Tahammul Ders Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000121', '11111111-1111-1111-1111-000000000033', '11111111-1111-1111-1111-00000000006d', 'spiritual_lesson', 'Nimetin Izini Surmek Ders Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000129', '11111111-1111-1111-1111-000000000034', '11111111-1111-1111-1111-00000000006e', 'spiritual_lesson', 'Yalnizlikta Saglam Kalmak Ders Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000012a', '11111111-1111-1111-1111-000000000034', '11111111-1111-1111-1111-00000000006f', 'spiritual_lesson', 'Sohbetin Bereketi Ders Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000012b', '11111111-1111-1111-1111-000000000034', '11111111-1111-1111-1111-000000000070', 'spiritual_lesson', 'Korkudan Emanete Ders Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000133', '11111111-1111-1111-1111-000000000035', '11111111-1111-1111-1111-000000000071', 'spiritual_lesson', 'Belirsizlikte Guven Ders Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000134', '11111111-1111-1111-1111-000000000035', '11111111-1111-1111-1111-000000000072', 'spiritual_lesson', 'Hedefi Tazelemek Ders Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000135', '11111111-1111-1111-1111-000000000035', '11111111-1111-1111-1111-000000000073', 'spiritual_lesson', 'Kirikliktan Hikmete Ders Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000013d', '11111111-1111-1111-1111-000000000036', '11111111-1111-1111-1111-000000000074', 'spiritual_lesson', 'Yoldan Dusunce Toparlanmak Ders Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000013e', '11111111-1111-1111-1111-000000000036', '11111111-1111-1111-1111-000000000075', 'spiritual_lesson', 'Sessizlikte Dinlemek Ders Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000013f', '11111111-1111-1111-1111-000000000036', '11111111-1111-1111-1111-000000000076', 'spiritual_lesson', 'Sukrun Pratigi Ders Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000147', '11111111-1111-1111-1111-000000000037', '11111111-1111-1111-1111-000000000080', 'emotion_entry', 'Umut Duygu Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000148', '11111111-1111-1111-1111-000000000037', '11111111-1111-1111-1111-000000000081', 'emotion_entry', 'Ozlem Duygu Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000149', '11111111-1111-1111-1111-000000000037', '11111111-1111-1111-1111-000000000082', 'emotion_entry', 'Mahcubiyet Duygu Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000014a', '11111111-1111-1111-1111-000000000037', '11111111-1111-1111-1111-000000000083', 'emotion_entry', 'Minnet Duygu Paketi', 4, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000014b', '11111111-1111-1111-1111-000000000037', '11111111-1111-1111-1111-000000000084', 'emotion_entry', 'Yalnizlik Duygu Paketi', 5, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000151', '11111111-1111-1111-1111-000000000038', '11111111-1111-1111-1111-000000000085', 'emotion_entry', 'Bunalmislik Duygu Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000152', '11111111-1111-1111-1111-000000000038', '11111111-1111-1111-1111-000000000086', 'emotion_entry', 'Hayal Kirikligi Duygu Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000153', '11111111-1111-1111-1111-000000000038', '11111111-1111-1111-1111-000000000087', 'emotion_entry', 'Guvende Hissetme Duygu Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000154', '11111111-1111-1111-1111-000000000038', '11111111-1111-1111-1111-000000000088', 'emotion_entry', 'Korku Duygu Paketi', 4, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000155', '11111111-1111-1111-1111-000000000038', '11111111-1111-1111-1111-000000000089', 'emotion_entry', 'Merak Duygu Paketi', 5, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000015b', '11111111-1111-1111-1111-000000000039', '11111111-1111-1111-1111-00000000008a', 'emotion_entry', 'Kararsizlik Duygu Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000015c', '11111111-1111-1111-1111-000000000039', '11111111-1111-1111-1111-00000000008b', 'emotion_entry', 'Sevinc Duygu Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000015d', '11111111-1111-1111-1111-000000000039', '11111111-1111-1111-1111-00000000008c', 'emotion_entry', 'Huzun Duygu Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000015e', '11111111-1111-1111-1111-000000000039', '11111111-1111-1111-1111-00000000008d', 'emotion_entry', 'Sucluluk Duygu Paketi', 4, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000015f', '11111111-1111-1111-1111-000000000039', '11111111-1111-1111-1111-00000000008e', 'emotion_entry', 'Rahatlama Duygu Paketi', 5, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000165', '11111111-1111-1111-1111-00000000003a', '11111111-1111-1111-1111-00000000008f', 'emotion_entry', 'Caresizlik Duygu Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000166', '11111111-1111-1111-1111-00000000003a', '11111111-1111-1111-1111-000000000090', 'emotion_entry', 'Sabirsizlik Duygu Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000167', '11111111-1111-1111-1111-00000000003a', '11111111-1111-1111-1111-000000000091', 'emotion_entry', 'Guven Duygu Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000168', '11111111-1111-1111-1111-00000000003a', '11111111-1111-1111-1111-000000000092', 'emotion_entry', 'Direnc Duygu Paketi', 4, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000169', '11111111-1111-1111-1111-00000000003a', '11111111-1111-1111-1111-000000000093', 'emotion_entry', 'Sikisiklik Duygu Paketi', 5, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000016f', '11111111-1111-1111-1111-00000000003b', '11111111-1111-1111-1111-000000000094', 'emotion_entry', 'Utanc Duygu Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000170', '11111111-1111-1111-1111-00000000003b', '11111111-1111-1111-1111-000000000095', 'emotion_entry', 'Aidiyet Duygu Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000171', '11111111-1111-1111-1111-00000000003b', '11111111-1111-1111-1111-000000000096', 'emotion_entry', 'Kiskanclik Duygu Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000172', '11111111-1111-1111-1111-00000000003b', '11111111-1111-1111-1111-000000000097', 'emotion_entry', 'Hayranlik Duygu Paketi', 4, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000179', '11111111-1111-1111-1111-00000000003c', '11111111-1111-1111-1111-000000000098', 'emotion_entry', 'Yorgunluk Duygu Paketi', 1, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000017a', '11111111-1111-1111-1111-00000000003c', '11111111-1111-1111-1111-000000000099', 'emotion_entry', 'Ferahlik Duygu Paketi', 2, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000017b', '11111111-1111-1111-1111-00000000003c', '11111111-1111-1111-1111-00000000009a', 'emotion_entry', 'Tedirginlik Duygu Paketi', 3, '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000017c', '11111111-1111-1111-1111-00000000003c', '11111111-1111-1111-1111-00000000009b', 'emotion_entry', 'Cesaret Duygu Paketi', 4, '2026-04-12 10:00:00+00')
on conflict do nothing;

insert into ebooks (
  content_item_id, author_name, category, total_pages, has_audio, download_package_asset_id, created_at
) values
  (
    '11111111-1111-1111-1111-111111111004',
    'PST Coaching Editorial Team', 'Spiritual Growth', 248, true,
    '44444444-4444-4444-4444-444444444003', '2026-04-11 10:44:00+00'
  )
on conflict do nothing;

insert into ebooks (
  content_item_id, author_name, category, total_pages, has_audio, download_package_asset_id, created_at
) values
  ('11111111-1111-1111-1111-000000000050', 'PST Coaching Editorial Team', 'Spiritual Growth', 212, true, '44444444-4444-4444-4444-000000000021', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000051', 'PST Coaching Editorial Team', 'Relationships', 236, false, '44444444-4444-4444-4444-000000000023', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000052', 'PST Coaching Editorial Team', 'Emotional Health', 264, true, '44444444-4444-4444-4444-000000000025', '2026-04-12 10:00:00+00'),
  ('11111111-1111-1111-1111-000000000053', 'PST Coaching Editorial Team', 'Reflection', 198, false, '44444444-4444-4444-4444-000000000027', '2026-04-12 10:00:00+00')
on conflict do nothing;

insert into ebook_chapters (
  id, ebook_content_item_id, parent_chapter_id, title, order_index, start_locator, end_locator, created_at
) values
  (
    '66666666-6666-6666-6666-666666666021', '11111111-1111-1111-1111-111111111004',
    null, 'Bolum 1: Kalpte Farkindalik', 1, 'epubcfi(/6/2[chap01])', 'epubcfi(/6/4[chap01-end])',
    '2026-04-11 10:45:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666022', '11111111-1111-1111-1111-111111111004',
    null, 'Bolum 2: Kaygidan Sukunete', 2, 'epubcfi(/6/6[chap02])', 'epubcfi(/6/8[chap02-end])',
    '2026-04-11 10:45:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666023', '11111111-1111-1111-1111-111111111004',
    null, 'Bolum 3: Hayata Uygulama', 3, 'epubcfi(/6/10[chap03])', 'epubcfi(/6/12[chap03-end])',
    '2026-04-11 10:45:00+00'
  )
on conflict do nothing;

insert into ebook_chapters (
  id, ebook_content_item_id, parent_chapter_id, title, order_index, start_locator, end_locator, created_at
) values
  ('66666666-6666-6666-6666-000000000301', '11111111-1111-1111-1111-000000000050', null, 'Bolum 1: Temel Cerceve', 1, 'epubcfi(/6/2[chapter1])', 'epubcfi(/6/4[chapter1-end])', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000302', '11111111-1111-1111-1111-000000000050', null, 'Bolum 2: Uygulamaya Gecis', 2, 'epubcfi(/6/6[chapter2])', 'epubcfi(/6/8[chapter2-end])', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000030b', '11111111-1111-1111-1111-000000000051', null, 'Bolum 1: Temel Cerceve', 1, 'epubcfi(/6/2[chapter1])', 'epubcfi(/6/4[chapter1-end])', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000030c', '11111111-1111-1111-1111-000000000051', null, 'Bolum 2: Uygulamaya Gecis', 2, 'epubcfi(/6/6[chapter2])', 'epubcfi(/6/8[chapter2-end])', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000315', '11111111-1111-1111-1111-000000000052', null, 'Bolum 1: Temel Cerceve', 1, 'epubcfi(/6/2[chapter1])', 'epubcfi(/6/4[chapter1-end])', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000316', '11111111-1111-1111-1111-000000000052', null, 'Bolum 2: Uygulamaya Gecis', 2, 'epubcfi(/6/6[chapter2])', 'epubcfi(/6/8[chapter2-end])', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000031f', '11111111-1111-1111-1111-000000000053', null, 'Bolum 1: Temel Cerceve', 1, 'epubcfi(/6/2[chapter1])', 'epubcfi(/6/4[chapter1-end])', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000320', '11111111-1111-1111-1111-000000000053', null, 'Bolum 2: Uygulamaya Gecis', 2, 'epubcfi(/6/6[chapter2])', 'epubcfi(/6/8[chapter2-end])', '2026-04-12 10:00:00+00')
on conflict do nothing;

insert into ebook_page_maps (
  id, ebook_content_item_id, page_number, locator, chapter_id, created_at
) values
  (
    '66666666-6666-6666-6666-666666666031', '11111111-1111-1111-1111-111111111004',
    1, 'epubcfi(/6/2[chap01]!/4/2/2)', '66666666-6666-6666-6666-666666666021', '2026-04-11 10:46:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666032', '11111111-1111-1111-1111-111111111004',
    57, 'epubcfi(/6/6[chap02]!/4/2/8)', '66666666-6666-6666-6666-666666666022', '2026-04-11 10:46:00+00'
  ),
  (
    '66666666-6666-6666-6666-666666666033', '11111111-1111-1111-1111-111111111004',
    131, 'epubcfi(/6/10[chap03]!/4/2/14)', '66666666-6666-6666-6666-666666666023', '2026-04-11 10:46:00+00'
  )
on conflict do nothing;

insert into ebook_page_maps (
  id, ebook_content_item_id, page_number, locator, chapter_id, created_at
) values
  ('66666666-6666-6666-6666-000000000401', '11111111-1111-1111-1111-000000000050', 1, 'epubcfi(/6/2[chapter1]!/4/2/2)', '66666666-6666-6666-6666-000000000301', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000402', '11111111-1111-1111-1111-000000000050', 106, 'epubcfi(/6/6[chapter2]!/4/2/8)', '66666666-6666-6666-6666-000000000302', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000040b', '11111111-1111-1111-1111-000000000051', 1, 'epubcfi(/6/2[chapter1]!/4/2/2)', '66666666-6666-6666-6666-00000000030b', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000040c', '11111111-1111-1111-1111-000000000051', 118, 'epubcfi(/6/6[chapter2]!/4/2/8)', '66666666-6666-6666-6666-00000000030c', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000415', '11111111-1111-1111-1111-000000000052', 1, 'epubcfi(/6/2[chapter1]!/4/2/2)', '66666666-6666-6666-6666-000000000315', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000416', '11111111-1111-1111-1111-000000000052', 132, 'epubcfi(/6/6[chapter2]!/4/2/8)', '66666666-6666-6666-6666-000000000316', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-00000000041f', '11111111-1111-1111-1111-000000000053', 1, 'epubcfi(/6/2[chapter1]!/4/2/2)', '66666666-6666-6666-6666-00000000031f', '2026-04-12 10:00:00+00'),
  ('66666666-6666-6666-6666-000000000420', '11111111-1111-1111-1111-000000000053', 99, 'epubcfi(/6/6[chapter2]!/4/2/8)', '66666666-6666-6666-6666-000000000320', '2026-04-12 10:00:00+00')
on conflict do nothing;

insert into spiritual_lesson_collections (
  content_item_id, lesson_count, audience, difficulty, created_at
) values
  (
    '11111111-1111-1111-1111-111111111005', 400, 'Adults and late teens', 'mixed',
    '2026-04-11 10:47:00+00'
  )
on conflict do nothing;

insert into spiritual_lessons (
  id, collection_content_item_id, content_item_id, lesson_no, estimated_minutes,
  has_audio, reflection_prompt_set_id, created_at
) values
  (
    '77777777-7777-7777-7777-777777777001', '11111111-1111-1111-1111-111111111005',
    '11111111-1111-1111-1111-111111111006', 1, 12, true, null, '2026-04-11 10:48:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777002', '11111111-1111-1111-1111-111111111005',
    '11111111-1111-1111-1111-111111111007', 2, 14, false, null, '2026-04-11 10:48:00+00'
  )
on conflict do nothing;

insert into spiritual_lessons (
  id, collection_content_item_id, content_item_id, lesson_no, estimated_minutes, has_audio, reflection_prompt_set_id, created_at
) values
  ('77777777-7777-7777-7777-000000000103', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000060', 3, 10, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000104', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000061', 4, 11, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000105', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000062', 5, 12, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000106', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000063', 6, 13, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000107', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000064', 7, 14, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000108', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000065', 8, 15, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000109', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000066', 9, 16, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000010a', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000067', 10, 10, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000010b', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000068', 11, 11, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000010c', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000069', 12, 12, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000010d', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-00000000006a', 13, 13, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000010e', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-00000000006b', 14, 14, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000010f', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-00000000006c', 15, 15, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000110', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-00000000006d', 16, 16, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000111', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-00000000006e', 17, 10, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000112', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-00000000006f', 18, 11, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000113', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000070', 19, 12, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000114', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000071', 20, 13, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000115', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000072', 21, 14, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000116', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000073', 22, 15, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000117', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000074', 23, 16, true, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000118', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000075', 24, 10, false, null, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000119', '11111111-1111-1111-1111-000000000005', '11111111-1111-1111-1111-000000000076', 25, 11, true, null, '2026-04-12 10:20:00+00')
on conflict do nothing;

insert into lesson_sections (
  id, spiritual_lesson_id, section_type, title, body_rich_text, order_index, created_at
) values
  (
    '77777777-7777-7777-7777-777777777011', '77777777-7777-7777-7777-777777777001',
    'intro', 'Sabir Neden Zor?', 'Sabir, tetiklenen duygunun ilk dalgasinda yon kaybetmemeyi ogretir.', 1,
    '2026-04-11 10:49:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777012', '77777777-7777-7777-7777-777777777001',
    'reflection', 'Kendi tetikleyicilerini fark et', 'Son 7 gunde hangi olaylar seni aceleci hale getirdi?', 2,
    '2026-04-11 10:49:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777013', '77777777-7777-7777-7777-777777777002',
    'body', 'Niyetin surdurucu gucu', 'Niyet, motivasyon dustugunde tekrar yon belirleyen ic sozlesmedir.', 1,
    '2026-04-11 10:49:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777014', '77777777-7777-7777-7777-777777777002',
    'summary', 'Bugun neyi devam ettireceksin?', 'Kucuk ama surdurulebilir bir adim sec.', 2,
    '2026-04-11 10:49:00+00'
  )
on conflict do nothing;

insert into lesson_sections (
  id, spiritual_lesson_id, section_type, title, body_rich_text, order_index, created_at
) values
  ('77777777-7777-7777-7777-000000000206', '77777777-7777-7777-7777-000000000103', 'insight', 'Tefekkurde Derinlesmek Girisi', 'Tefekkurde Derinlesmek dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000207', '77777777-7777-7777-7777-000000000103', 'reflection', 'Gunluk Uygulama', 'Kullanici tefekkurde derinlesmek temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000208', '77777777-7777-7777-7777-000000000104', 'insight', 'Sukretmek ve Gormek Girisi', 'Sukretmek ve Gormek dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000209', '77777777-7777-7777-7777-000000000104', 'reflection', 'Gunluk Uygulama', 'Kullanici sukretmek ve gormek temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000020a', '77777777-7777-7777-7777-000000000105', 'insight', 'Teslimiyet ve Gayret Girisi', 'Teslimiyet ve Gayret dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000020b', '77777777-7777-7777-7777-000000000105', 'reflection', 'Gunluk Uygulama', 'Kullanici teslimiyet ve gayret temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000020c', '77777777-7777-7777-7777-000000000106', 'insight', 'Kalp Temizligi Girisi', 'Kalp Temizligi dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000020d', '77777777-7777-7777-7777-000000000106', 'reflection', 'Gunluk Uygulama', 'Kullanici kalp temizligi temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000020e', '77777777-7777-7777-7777-000000000107', 'insight', 'Dua ile Yakinlik Girisi', 'Dua ile Yakinlik dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000020f', '77777777-7777-7777-7777-000000000107', 'reflection', 'Gunluk Uygulama', 'Kullanici dua ile yakinlik temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000210', '77777777-7777-7777-7777-000000000108', 'insight', 'Merhametli Bakis Girisi', 'Merhametli Bakis dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000211', '77777777-7777-7777-7777-000000000108', 'reflection', 'Gunluk Uygulama', 'Kullanici merhametli bakis temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000212', '77777777-7777-7777-7777-000000000109', 'insight', 'Ic Muhasebe Girisi', 'Ic Muhasebe dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000213', '77777777-7777-7777-7777-000000000109', 'reflection', 'Gunluk Uygulama', 'Kullanici ic muhasebe temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000214', '77777777-7777-7777-7777-00000000010a', 'insight', 'Gonul Yorgunlugunu Fark Etmek Girisi', 'Gonul Yorgunlugunu Fark Etmek dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000215', '77777777-7777-7777-7777-00000000010a', 'reflection', 'Gunluk Uygulama', 'Kullanici gonul yorgunlugunu fark etmek temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000216', '77777777-7777-7777-7777-00000000010b', 'insight', 'Sabitlik ve Sebat Girisi', 'Sabitlik ve Sebat dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000217', '77777777-7777-7777-7777-00000000010b', 'reflection', 'Gunluk Uygulama', 'Kullanici sabitlik ve sebat temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000218', '77777777-7777-7777-7777-00000000010c', 'insight', 'Tevazu ve Dayaniklilik Girisi', 'Tevazu ve Dayaniklilik dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000219', '77777777-7777-7777-7777-00000000010c', 'reflection', 'Gunluk Uygulama', 'Kullanici tevazu ve dayaniklilik temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000021a', '77777777-7777-7777-7777-00000000010d', 'insight', 'Hizmet Bilinci Girisi', 'Hizmet Bilinci dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000021b', '77777777-7777-7777-7777-00000000010d', 'reflection', 'Gunluk Uygulama', 'Kullanici hizmet bilinci temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000021c', '77777777-7777-7777-7777-00000000010e', 'insight', 'Affetmeye Yaklasmak Girisi', 'Affetmeye Yaklasmak dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000021d', '77777777-7777-7777-7777-00000000010e', 'reflection', 'Gunluk Uygulama', 'Kullanici affetmeye yaklasmak temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000021e', '77777777-7777-7777-7777-00000000010f', 'insight', 'Gecikmeye Tahammul Girisi', 'Gecikmeye Tahammul dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000021f', '77777777-7777-7777-7777-00000000010f', 'reflection', 'Gunluk Uygulama', 'Kullanici gecikmeye tahammul temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000220', '77777777-7777-7777-7777-000000000110', 'insight', 'Nimetin Izini Surmek Girisi', 'Nimetin Izini Surmek dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000221', '77777777-7777-7777-7777-000000000110', 'reflection', 'Gunluk Uygulama', 'Kullanici nimetin izini surmek temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000222', '77777777-7777-7777-7777-000000000111', 'insight', 'Yalnizlikta Saglam Kalmak Girisi', 'Yalnizlikta Saglam Kalmak dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000223', '77777777-7777-7777-7777-000000000111', 'reflection', 'Gunluk Uygulama', 'Kullanici yalnizlikta saglam kalmak temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000224', '77777777-7777-7777-7777-000000000112', 'insight', 'Sohbetin Bereketi Girisi', 'Sohbetin Bereketi dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000225', '77777777-7777-7777-7777-000000000112', 'reflection', 'Gunluk Uygulama', 'Kullanici sohbetin bereketi temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000226', '77777777-7777-7777-7777-000000000113', 'insight', 'Korkudan Emanete Girisi', 'Korkudan Emanete dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000227', '77777777-7777-7777-7777-000000000113', 'reflection', 'Gunluk Uygulama', 'Kullanici korkudan emanete temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000228', '77777777-7777-7777-7777-000000000114', 'insight', 'Belirsizlikte Guven Girisi', 'Belirsizlikte Guven dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000229', '77777777-7777-7777-7777-000000000114', 'reflection', 'Gunluk Uygulama', 'Kullanici belirsizlikte guven temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000022a', '77777777-7777-7777-7777-000000000115', 'insight', 'Hedefi Tazelemek Girisi', 'Hedefi Tazelemek dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000022b', '77777777-7777-7777-7777-000000000115', 'reflection', 'Gunluk Uygulama', 'Kullanici hedefi tazelemek temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000022c', '77777777-7777-7777-7777-000000000116', 'insight', 'Kirikliktan Hikmete Girisi', 'Kirikliktan Hikmete dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000022d', '77777777-7777-7777-7777-000000000116', 'reflection', 'Gunluk Uygulama', 'Kullanici kirikliktan hikmete temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000022e', '77777777-7777-7777-7777-000000000117', 'insight', 'Yoldan Dusunce Toparlanmak Girisi', 'Yoldan Dusunce Toparlanmak dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-00000000022f', '77777777-7777-7777-7777-000000000117', 'reflection', 'Gunluk Uygulama', 'Kullanici yoldan dusunce toparlanmak temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000230', '77777777-7777-7777-7777-000000000118', 'insight', 'Sessizlikte Dinlemek Girisi', 'Sessizlikte Dinlemek dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000231', '77777777-7777-7777-7777-000000000118', 'reflection', 'Gunluk Uygulama', 'Kullanici sessizlikte dinlemek temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000232', '77777777-7777-7777-7777-000000000119', 'insight', 'Sukrun Pratigi Girisi', 'Sukrun Pratigi dersi, kisinin bugunku ic akisinda neyi fark edecegini aciklar.', 1, '2026-04-12 10:20:00+00'),
  ('77777777-7777-7777-7777-000000000233', '77777777-7777-7777-7777-000000000119', 'reflection', 'Gunluk Uygulama', 'Kullanici sukrun pratigi temasini bugun hangi somut adimla hayata tasiyacagini yazar.', 2, '2026-04-12 10:20:00+00')
on conflict do nothing;

insert into emotion_libraries (content_item_id, emotion_count, created_at) values
  ('11111111-1111-1111-1111-111111111008', 200, '2026-04-11 10:50:00+00')
on conflict do nothing;

insert into emotion_entries (
  id, library_content_item_id, content_item_id, emotion_name, emotion_group,
  intensity_level, primary_color_token, created_at
) values
  (
    '77777777-7777-7777-7777-777777777021', '11111111-1111-1111-1111-111111111008',
    '11111111-1111-1111-1111-111111111009', 'Kaygi', 'Threat response', 'high', 'amber-600',
    '2026-04-11 10:51:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777022', '11111111-1111-1111-1111-111111111008',
    '11111111-1111-1111-1111-11111111100a', 'Sukunet', 'Regulation', 'medium', 'green-600',
    '2026-04-11 10:51:00+00'
  )
on conflict do nothing;

insert into emotion_entries (
  id, library_content_item_id, content_item_id, emotion_name, emotion_group, intensity_level, primary_color_token, created_at
) values
  ('77777777-7777-7777-7777-000000000301', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000080', 'Umut', 'Growth', 'medium', 'sky-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000302', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000081', 'Ozlem', 'Attachment', 'medium', 'indigo-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000303', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000082', 'Mahcubiyet', 'Social self', 'medium', 'rose-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000304', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000083', 'Minnet', 'Relational warmth', 'low', 'emerald-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000305', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000084', 'Yalnizlik', 'Connection', 'high', 'slate-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000306', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000085', 'Bunalmislik', 'Stress load', 'high', 'orange-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000307', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000086', 'Hayal Kirikligi', 'Loss', 'medium', 'stone-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000308', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000087', 'Guvende Hissetme', 'Safety', 'low', 'teal-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000309', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000088', 'Korku', 'Threat response', 'high', 'red-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000030a', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000089', 'Merak', 'Exploration', 'medium', 'cyan-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000030b', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000008a', 'Kararsizlik', 'Conflict', 'medium', 'yellow-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000030c', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000008b', 'Sevinc', 'Positive activation', 'medium', 'lime-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000030d', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000008c', 'Huzun', 'Loss', 'medium', 'blue-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000030e', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000008d', 'Sucluluk', 'Moral emotion', 'medium', 'amber-700', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000030f', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000008e', 'Rahatlama', 'Release', 'low', 'green-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000310', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000008f', 'Caresizlik', 'Threat response', 'high', 'red-700', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000311', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000090', 'Sabirsizlik', 'Activation', 'high', 'orange-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000312', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000091', 'Guven', 'Safety', 'medium', 'teal-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000313', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000092', 'Direnc', 'Protection', 'medium', 'zinc-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000314', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000093', 'Sikisiklik', 'Stress load', 'high', 'amber-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000315', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000094', 'Utanc', 'Social self', 'high', 'rose-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000316', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000095', 'Aidiyet', 'Connection', 'medium', 'emerald-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000317', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000096', 'Kiskanclik', 'Comparison', 'medium', 'fuchsia-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000318', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000097', 'Hayranlik', 'Wonder', 'low', 'violet-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000319', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000098', 'Yorgunluk', 'Energy', 'medium', 'stone-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000031a', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-000000000099', 'Ferahlik', 'Release', 'medium', 'green-600', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000031b', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000009a', 'Tedirginlik', 'Threat response', 'medium', 'amber-500', '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000031c', '11111111-1111-1111-1111-000000000008', '11111111-1111-1111-1111-00000000009b', 'Cesaret', 'Approach', 'medium', 'red-500', '2026-04-12 10:40:00+00')
on conflict do nothing;

insert into emotion_sections (
  id, emotion_entry_id, section_type, body_rich_text, order_index, created_at
) values
  (
    '77777777-7777-7777-7777-777777777031', '77777777-7777-7777-7777-777777777021',
    'definition', 'Kaygi, yaklasan tehdit ihtimalini zihinde buyuten koruyucu ama yorucu bir duygu halidir.', 1,
    '2026-04-11 10:52:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777032', '77777777-7777-7777-7777-777777777021',
    'practice', 'Nefes, beden tarama ve dusunce etiketleme birlikte uygulanir.', 2,
    '2026-04-11 10:52:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777033', '77777777-7777-7777-7777-777777777022',
    'definition', 'Sukunet, gercegi berrak gormeyi saglayan dengeli ic acikliktir.', 1,
    '2026-04-11 10:52:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777034', '77777777-7777-7777-7777-777777777022',
    'related_content', 'Bu madde, sabir ve farkindalik dersi ile birlikte calisildiginda daha kalicidir.', 2,
    '2026-04-11 10:52:00+00'
  )
on conflict do nothing;

insert into emotion_sections (
  id, emotion_entry_id, section_type, body_rich_text, order_index, created_at
) values
  ('77777777-7777-7777-7777-000000000401', '77777777-7777-7777-7777-000000000301', 'definition', 'Umut, kisinin growth alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000402', '77777777-7777-7777-7777-000000000301', 'practice', 'Umut hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000403', '77777777-7777-7777-7777-000000000302', 'definition', 'Ozlem, kisinin attachment alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000404', '77777777-7777-7777-7777-000000000302', 'practice', 'Ozlem hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000405', '77777777-7777-7777-7777-000000000303', 'definition', 'Mahcubiyet, kisinin social self alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000406', '77777777-7777-7777-7777-000000000303', 'practice', 'Mahcubiyet hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000407', '77777777-7777-7777-7777-000000000304', 'definition', 'Minnet, kisinin relational warmth alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000408', '77777777-7777-7777-7777-000000000304', 'practice', 'Minnet hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000409', '77777777-7777-7777-7777-000000000305', 'definition', 'Yalnizlik, kisinin connection alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000040a', '77777777-7777-7777-7777-000000000305', 'practice', 'Yalnizlik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000040b', '77777777-7777-7777-7777-000000000306', 'definition', 'Bunalmislik, kisinin stress load alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000040c', '77777777-7777-7777-7777-000000000306', 'practice', 'Bunalmislik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000040d', '77777777-7777-7777-7777-000000000307', 'definition', 'Hayal Kirikligi, kisinin loss alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000040e', '77777777-7777-7777-7777-000000000307', 'practice', 'Hayal Kirikligi hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000040f', '77777777-7777-7777-7777-000000000308', 'definition', 'Guvende Hissetme, kisinin safety alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000410', '77777777-7777-7777-7777-000000000308', 'practice', 'Guvende Hissetme hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000411', '77777777-7777-7777-7777-000000000309', 'definition', 'Korku, kisinin threat response alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000412', '77777777-7777-7777-7777-000000000309', 'practice', 'Korku hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000413', '77777777-7777-7777-7777-00000000030a', 'definition', 'Merak, kisinin exploration alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000414', '77777777-7777-7777-7777-00000000030a', 'practice', 'Merak hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000415', '77777777-7777-7777-7777-00000000030b', 'definition', 'Kararsizlik, kisinin conflict alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000416', '77777777-7777-7777-7777-00000000030b', 'practice', 'Kararsizlik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000417', '77777777-7777-7777-7777-00000000030c', 'definition', 'Sevinc, kisinin positive activation alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000418', '77777777-7777-7777-7777-00000000030c', 'practice', 'Sevinc hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000419', '77777777-7777-7777-7777-00000000030d', 'definition', 'Huzun, kisinin loss alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000041a', '77777777-7777-7777-7777-00000000030d', 'practice', 'Huzun hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000041b', '77777777-7777-7777-7777-00000000030e', 'definition', 'Sucluluk, kisinin moral emotion alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000041c', '77777777-7777-7777-7777-00000000030e', 'practice', 'Sucluluk hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000041d', '77777777-7777-7777-7777-00000000030f', 'definition', 'Rahatlama, kisinin release alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000041e', '77777777-7777-7777-7777-00000000030f', 'practice', 'Rahatlama hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000041f', '77777777-7777-7777-7777-000000000310', 'definition', 'Caresizlik, kisinin threat response alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000420', '77777777-7777-7777-7777-000000000310', 'practice', 'Caresizlik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000421', '77777777-7777-7777-7777-000000000311', 'definition', 'Sabirsizlik, kisinin activation alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000422', '77777777-7777-7777-7777-000000000311', 'practice', 'Sabirsizlik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000423', '77777777-7777-7777-7777-000000000312', 'definition', 'Guven, kisinin safety alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000424', '77777777-7777-7777-7777-000000000312', 'practice', 'Guven hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000425', '77777777-7777-7777-7777-000000000313', 'definition', 'Direnc, kisinin protection alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000426', '77777777-7777-7777-7777-000000000313', 'practice', 'Direnc hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000427', '77777777-7777-7777-7777-000000000314', 'definition', 'Sikisiklik, kisinin stress load alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000428', '77777777-7777-7777-7777-000000000314', 'practice', 'Sikisiklik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000429', '77777777-7777-7777-7777-000000000315', 'definition', 'Utanc, kisinin social self alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000042a', '77777777-7777-7777-7777-000000000315', 'practice', 'Utanc hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000042b', '77777777-7777-7777-7777-000000000316', 'definition', 'Aidiyet, kisinin connection alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000042c', '77777777-7777-7777-7777-000000000316', 'practice', 'Aidiyet hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000042d', '77777777-7777-7777-7777-000000000317', 'definition', 'Kiskanclik, kisinin comparison alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000042e', '77777777-7777-7777-7777-000000000317', 'practice', 'Kiskanclik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-00000000042f', '77777777-7777-7777-7777-000000000318', 'definition', 'Hayranlik, kisinin wonder alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000430', '77777777-7777-7777-7777-000000000318', 'practice', 'Hayranlik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000431', '77777777-7777-7777-7777-000000000319', 'definition', 'Yorgunluk, kisinin energy alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000432', '77777777-7777-7777-7777-000000000319', 'practice', 'Yorgunluk hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000433', '77777777-7777-7777-7777-00000000031a', 'definition', 'Ferahlik, kisinin release alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000434', '77777777-7777-7777-7777-00000000031a', 'practice', 'Ferahlik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000435', '77777777-7777-7777-7777-00000000031b', 'definition', 'Tedirginlik, kisinin threat response alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000436', '77777777-7777-7777-7777-00000000031b', 'practice', 'Tedirginlik hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000437', '77777777-7777-7777-7777-00000000031c', 'definition', 'Cesaret, kisinin approach alaninda sinyal veren bir duygusal durumdur.', 1, '2026-04-12 10:40:00+00'),
  ('77777777-7777-7777-7777-000000000438', '77777777-7777-7777-7777-00000000031c', 'practice', 'Cesaret hissedildiginde isimlendirme, beden farkindaligi ve kucuk dogru adim birlikte onerilir.', 2, '2026-04-12 10:40:00+00')
on conflict do nothing;

insert into workshops (
  content_item_id, theme, target_audience, total_duration_minutes, delivery_mode,
  facilitator_guide_asset_id, participant_workbook_asset_id, created_at
) values
  (
    '11111111-1111-1111-1111-111111111003', 'Dependence, prayer, and resilience',
    'Adults navigating anxiety and control struggles', 240, 'hybrid',
    '44444444-4444-4444-4444-444444444004', '44444444-4444-4444-4444-444444444005',
    '2026-04-11 10:53:00+00'
  )
on conflict do nothing;

insert into workshops (
  content_item_id, theme, target_audience, total_duration_minutes, delivery_mode, facilitator_guide_asset_id, participant_workbook_asset_id, created_at
) values
  ('11111111-1111-1111-1111-000000000040', 'Anxiety regulation and grounding', 'Adults seeking guided practice', 180, 'hybrid', '44444444-4444-4444-4444-000000000040', '44444444-4444-4444-4444-000000000041', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000041', 'Repair, apology, and relational courage', 'Adults seeking guided practice', 210, 'in_person', '44444444-4444-4444-4444-000000000042', '44444444-4444-4444-4444-000000000043', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000042', 'Trust while waiting and not knowing', 'Adults seeking guided practice', 160, 'hybrid', '44444444-4444-4444-4444-000000000044', '44444444-4444-4444-4444-000000000045', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000043', 'Practicing gratitude with consistency', 'Adults seeking guided practice', 150, 'online', '44444444-4444-4444-4444-000000000046', '44444444-4444-4444-4444-000000000047', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000044', 'From isolation to belonging', 'Adults seeking guided practice', 200, 'hybrid', '44444444-4444-4444-4444-000000000048', '44444444-4444-4444-4444-000000000049', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000045', 'Recovery after emotional overload', 'Adults seeking guided practice', 190, 'online', '44444444-4444-4444-4444-00000000004a', '44444444-4444-4444-4444-00000000004b', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000046', 'Rebuilding intention after drift', 'Adults seeking guided practice', 165, 'in_person', '44444444-4444-4444-4444-00000000004c', '44444444-4444-4444-4444-00000000004d', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000047', 'Boundaries with warmth and clarity', 'Adults seeking guided practice', 175, 'hybrid', '44444444-4444-4444-4444-00000000004e', '44444444-4444-4444-4444-00000000004f', '2026-04-12 11:00:00+00'),
  ('11111111-1111-1111-1111-000000000048', 'Small brave steps under fear', 'Adults seeking guided practice', 185, 'online', '44444444-4444-4444-4444-000000000050', '44444444-4444-4444-4444-000000000051', '2026-04-12 11:00:00+00')
on conflict do nothing;

insert into workshop_stages (
  id, workshop_content_item_id, stage_number, stage_type, title, unlock_rule,
  summary_text, expected_output_count, created_at
) values
  (
    '77777777-7777-7777-7777-777777777041', '11111111-1111-1111-1111-111111111003',
    1, 'concept', 'Kavram Insasi', 'always_open',
    'Temel kavramlar ve ana hadis/ayet cercevesi.', 1, '2026-04-11 10:54:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777042', '11111111-1111-1111-1111-111111111003',
    8, 'camp', '3 Gunluk Kamp', 'stage_1_completed',
    'Sabah-oglen-aksam akisiyla yogun uygulama katmani.', 3, '2026-04-11 10:54:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777043', '11111111-1111-1111-1111-111111111003',
    10, 'workbook', 'Katilimci Defteri', 'stage_8_completed',
    'Yuk haritasi ve donusum plani worksheet katmani.', 2, '2026-04-11 10:54:00+00'
  )
on conflict do nothing;

insert into workshop_stages (
  id, workshop_content_item_id, stage_number, stage_type, title, unlock_rule, summary_text, expected_output_count, created_at
) values
  ('77777777-7777-7777-7777-000000000501', '11111111-1111-1111-1111-000000000040', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000502', '11111111-1111-1111-1111-000000000041', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000503', '11111111-1111-1111-1111-000000000042', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000504', '11111111-1111-1111-1111-000000000043', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000505', '11111111-1111-1111-1111-000000000044', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000506', '11111111-1111-1111-1111-000000000045', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000507', '11111111-1111-1111-1111-000000000046', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000508', '11111111-1111-1111-1111-000000000047', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000509', '11111111-1111-1111-1111-000000000048', 1, 'practice', 'Merkez Uygulama Asamasi', 'always_open', 'Kavram, egzersiz ve kisa yazili ciktiyi bir araya getirir.', 2, '2026-04-12 11:00:00+00')
on conflict do nothing;

insert into workshop_sessions (
  id, workshop_stage_id, day_index, slot, duration_minutes, session_goal,
  schedule_template, created_at
) values
  (
    '77777777-7777-7777-7777-777777777051', '77777777-7777-7777-7777-777777777042',
    1, 'morning', 75, 'Katilimciyi guvenli acilisa almak',
    'intro -> reflection -> paired sharing', '2026-04-11 10:55:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777052', '77777777-7777-7777-7777-777777777042',
    2, 'evening', 90, 'Kriz ani dilini donusturmek',
    'guided talk -> worksheet -> closing sentence', '2026-04-11 10:55:00+00'
  )
on conflict do nothing;

insert into workshop_sessions (
  id, workshop_stage_id, day_index, slot, duration_minutes, session_goal, schedule_template, created_at
) values
  ('77777777-7777-7777-7777-000000000601', '77777777-7777-7777-7777-000000000501', 1, 'evening', 75, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000602', '77777777-7777-7777-7777-000000000502', 1, 'evening', 78, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000603', '77777777-7777-7777-7777-000000000503', 1, 'evening', 81, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000604', '77777777-7777-7777-7777-000000000504', 1, 'evening', 84, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000605', '77777777-7777-7777-7777-000000000505', 1, 'evening', 87, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000606', '77777777-7777-7777-7777-000000000506', 1, 'evening', 90, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000607', '77777777-7777-7777-7777-000000000507', 1, 'evening', 93, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000608', '77777777-7777-7777-7777-000000000508', 1, 'evening', 96, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000609', '77777777-7777-7777-7777-000000000509', 1, 'evening', 99, 'Katimcilari kucuk ama uygulanabilir bir adima tasimak', 'intro -> reflection -> worksheet', '2026-04-12 11:00:00+00')
on conflict do nothing;

insert into workshop_content_blocks (
  id, workshop_stage_id, block_type, title, body_rich_text, quote_source,
  callout_style, citation_ref, order_index, created_at
) values
  (
    '77777777-7777-7777-7777-777777777061', '77777777-7777-7777-7777-777777777041',
    'hadith', 'Kuvvetli Mumin Cercevesi',
    'Aktif caba, Allah'tan yardim isteme ve keske dilinden sakinma dengesi kurulur.',
    'Muslim, Qadar 34', 'quote', 'hadith:strong-believer', 1, '2026-04-11 10:56:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777062', '77777777-7777-7777-7777-777777777041',
    'bridge', 'Psikoloji Koprusu',
    'Learned helplessness ile iradeyi koruyan teslimiyet arasindaki fark ele alinir.',
    null, 'callout', 'psych:learned-helplessness', 2, '2026-04-11 10:56:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777063', '77777777-7777-7777-7777-777777777042',
    'exercise', 'Yuk Haritasi Uygulamasi',
    'Katilimci, tasidigi yukleri kategori bazinda yazar ve yeniden isimlendirir.',
    null, 'worksheet', 'artifact:load-map', 1, '2026-04-11 10:56:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777064', '77777777-7777-7777-7777-777777777043',
    'output', 'Donusum Plani',
    '72 saat, 3 hafta ve 30 gunluk kucuk dogru adimlar belirlenir.',
    null, 'output', 'followup:plan', 1, '2026-04-11 10:56:00+00'
  )
on conflict do nothing;

insert into workshop_content_blocks (
  id, workshop_stage_id, block_type, title, body_rich_text, quote_source, callout_style, citation_ref, order_index, created_at
) values
  ('77777777-7777-7777-7777-000000000701', '77777777-7777-7777-7777-000000000501', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000702', '77777777-7777-7777-7777-000000000501', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000703', '77777777-7777-7777-7777-000000000502', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000704', '77777777-7777-7777-7777-000000000502', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000705', '77777777-7777-7777-7777-000000000503', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000706', '77777777-7777-7777-7777-000000000503', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000707', '77777777-7777-7777-7777-000000000504', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000708', '77777777-7777-7777-7777-000000000504', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000709', '77777777-7777-7777-7777-000000000505', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-00000000070a', '77777777-7777-7777-7777-000000000505', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-00000000070b', '77777777-7777-7777-7777-000000000506', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-00000000070c', '77777777-7777-7777-7777-000000000506', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-00000000070d', '77777777-7777-7777-7777-000000000507', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-00000000070e', '77777777-7777-7777-7777-000000000507', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-00000000070f', '77777777-7777-7777-7777-000000000508', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000710', '77777777-7777-7777-7777-000000000508', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000711', '77777777-7777-7777-7777-000000000509', 'reflection', 'Durumu Isimlendirme', 'Katilimci hissettigi ana basligi, bedendeki etkisini ve ihtiyacini ayirt eder.', null, 'callout', 'reflection:state-naming', 1, '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000712', '77777777-7777-7777-7777-000000000509', 'exercise', 'Kucuk Dogru Adim', 'Katilimci bir sonraki yirmi dort saatte atilacak en kucuk faydali adimi secip yazar.', null, 'worksheet', 'exercise:small-step', 2, '2026-04-12 11:00:00+00')
on conflict do nothing;

insert into workshop_artifacts (
  id, workshop_content_item_id, artifact_type, version, title, storage_uri,
  artifact_schema, role_scope, created_at
) values
  (
    '77777777-7777-7777-7777-777777777071', '11111111-1111-1111-1111-111111111003',
    'worksheet', 2, 'Yuk Haritasi',
    's3://pst/assets/workshops/load-map-schema.json',
    '{"fields":["yuk","tetikleyici","karsilik_dua"]}'::jsonb, 'participant',
    '2026-04-11 10:57:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777072', '11111111-1111-1111-1111-111111111003',
    'guide_section', 1, 'Zor Senaryo Kisayolu',
    's3://pst/assets/workshops/facilitator-hard-scenarios.json',
    '{"scenarios":["panic","withdrawal","resistance"]}'::jsonb, 'facilitator',
    '2026-04-11 10:57:00+00'
  )
on conflict do nothing;

insert into workshop_artifacts (
  id, workshop_content_item_id, artifact_type, version, title, storage_uri, artifact_schema, role_scope, created_at
) values
  ('77777777-7777-7777-7777-000000000801', '11111111-1111-1111-1111-000000000040', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/kaygi-aninda-denge-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000802', '11111111-1111-1111-1111-000000000041', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/iliski-onarimi-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000803', '11111111-1111-1111-1111-000000000042', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/belirsizlikle-yasama-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000804', '11111111-1111-1111-1111-000000000043', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/sukrun-ritmi-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000805', '11111111-1111-1111-1111-000000000044', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/yalnizlik-ve-aidiyet-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000806', '11111111-1111-1111-1111-000000000045', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/yorgun-kalbi-toparlama-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000807', '11111111-1111-1111-1111-000000000046', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/niyet-tazeleme-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000808', '11111111-1111-1111-1111-000000000047', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/sinir-ve-merhamet-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00'),
  ('77777777-7777-7777-7777-000000000809', '11111111-1111-1111-1111-000000000048', 'worksheet', 1, 'Mini Uygulama Defteri', 's3://pst/assets/workshops/cesaretle-adim-atma-atolyesi-worksheet-schema.json', '{"fields":["durum","beden_sinyali","kucuk_adim"]}'::jsonb, 'participant', '2026-04-12 11:00:00+00')
on conflict do nothing;

insert into hadith_analyses (
  content_item_id, hadith_no, headline, canonical_quote, source_reference,
  recorded_at, duration_seconds, speaker, created_at
) values
  (
    '11111111-1111-1111-1111-11111111100b', '1',
    'Kuvvetli Mumin, Zayif Muminden Daha Hayirlidir',
    'Kuvvetli mumin, Allah katinda zayif muminden daha hayirli ve daha sevimlidir...',
    'Muslim, Qadar 34', '2026-03-03 08:00:00+00', 519, 'PST Coach Team',
    '2026-04-11 10:58:00+00'
  )
on conflict do nothing;

insert into hadith_analysis_sections (
  id, hadith_analysis_content_item_id, section_type, title, body_rich_text, order_index, created_at
) values
  (
    '77777777-7777-7777-7777-777777777081', '11111111-1111-1111-1111-11111111100b',
    'quote', 'Metin', 'Hadis metni tam olarak verilir ve baglami acilir.', 1, '2026-04-11 10:59:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777082', '11111111-1111-1111-1111-11111111100b',
    'analysis', 'Irade ve Teslimiyet Dengesi', 'Pasif kadercilik ile aktif gayret arasindaki sinir islenir.', 2, '2026-04-11 10:59:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777083', '11111111-1111-1111-1111-11111111100b',
    'psychology_bridge', 'Learned Helplessness Koprusu', 'Seligman cercevesiyle hadisin psikolojik karsiligi kurulur.', 3, '2026-04-11 10:59:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777084', '11111111-1111-1111-1111-11111111100b',
    'application', 'Gunluk Uygulama', 'Kullanici bugun faydali olan bir seye yonelip kucuk bir adim secer.', 4, '2026-04-11 10:59:00+00'
  )
on conflict do nothing;

insert into hadith_source_citations (
  id, hadith_analysis_content_item_id, source_name, book_ref, chapter_ref, hadith_ref, created_at
) values
  (
    '77777777-7777-7777-7777-777777777091', '11111111-1111-1111-1111-11111111100b',
    'Sahih Muslim', 'Kitab al-Qadar', 'Chapter 34', '34', '2026-04-11 11:00:00+00'
  ),
  (
    '77777777-7777-7777-7777-777777777092', '11111111-1111-1111-1111-11111111100b',
    'Ibn Majah', 'Muqaddimah', 'Chapter 10', '10', '2026-04-11 11:00:00+00'
  )
on conflict do nothing;

insert into users (
  id, role, language_code, subscription_status, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888001', 'plan_owner', 'tr', 'active',
    '2026-04-01 08:00:00+00', '2026-04-11 11:05:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888002', 'member', 'tr', 'active',
    '2026-04-02 08:00:00+00', '2026-04-11 11:05:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888003', 'coach', 'tr', 'inactive',
    '2026-04-03 08:00:00+00', '2026-04-11 11:05:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888004', 'admin', 'en', 'inactive',
    '2026-04-04 08:00:00+00', '2026-04-11 11:05:00+00'
  )
on conflict do nothing;

insert into user_sessions (
  id, user_id, expires_at, last_active_at, created_at
) values
  (
    '88888888-8888-8888-8888-888888888011', '88888888-8888-8888-8888-888888888001',
    '2026-04-11 23:59:00+00', '2026-04-11 11:06:00+00', '2026-04-11 08:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888012', '88888888-8888-8888-8888-888888888002',
    '2026-04-11 23:59:00+00', '2026-04-11 10:52:00+00', '2026-04-11 08:10:00+00'
  )
on conflict do nothing;

insert into demographic_profiles (user_id, age, gender, country_code, updated_at) values
  ('88888888-8888-8888-8888-888888888001', 34, 'female', 'TR', '2026-04-11 11:07:00+00'),
  ('88888888-8888-8888-8888-888888888002', 17, 'male', 'TR', '2026-04-11 11:07:00+00'),
  ('88888888-8888-8888-8888-888888888003', 41, 'female', 'GB', '2026-04-11 11:07:00+00')
on conflict do nothing;

insert into accessibility_settings (
  user_id, text_scale, high_contrast, reduce_motion, theme, updated_at
) values
  ('88888888-8888-8888-8888-888888888001', 1.15, false, false, 'system', '2026-04-11 11:08:00+00'),
  ('88888888-8888-8888-8888-888888888002', 1.30, true, true, 'light', '2026-04-11 11:08:00+00'),
  ('88888888-8888-8888-8888-888888888003', 1.00, false, false, 'dark', '2026-04-11 11:08:00+00')
on conflict do nothing;

insert into subscription_plans (
  id, plan_type, seat_limit, student_discount_eligible, created_at
) values
  ('88888888-8888-8888-8888-888888888021', 'individual', 1, true, '2026-04-11 11:09:00+00'),
  ('88888888-8888-8888-8888-888888888022', 'family', 5, true, '2026-04-11 11:09:00+00'),
  ('88888888-8888-8888-8888-888888888023', 'group', 10, false, '2026-04-11 11:09:00+00')
on conflict do nothing;

insert into subscriptions (
  id, owner_user_id, plan_id, status, renewal_at, period_end_at, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888031', '88888888-8888-8888-8888-888888888001',
    '88888888-8888-8888-8888-888888888022', 'active',
    '2026-05-01 00:00:00+00', '2026-05-01 00:00:00+00',
    '2026-04-01 09:00:00+00', '2026-04-11 11:10:00+00'
  )
on conflict do nothing;

insert into subscription_addons (
  id, subscription_id, addon_type, status, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888041', '88888888-8888-8888-8888-888888888031',
    'ai_package', 'active', '2026-04-01 09:05:00+00', '2026-04-11 11:11:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888042', '88888888-8888-8888-8888-888888888031',
    'extra_seat', 'active', '2026-04-02 09:05:00+00', '2026-04-11 11:11:00+00'
  )
on conflict do nothing;

insert into seats (
  id, subscription_id, assigned_user_id, status, created_at
) values
  (
    '88888888-8888-8888-8888-888888888051', '88888888-8888-8888-8888-888888888031',
    '88888888-8888-8888-8888-888888888002', 'assigned', '2026-04-02 10:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888052', '88888888-8888-8888-8888-888888888031',
    null, 'available', '2026-04-02 10:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888053', '88888888-8888-8888-8888-888888888031',
    null, 'invited', '2026-04-10 10:00:00+00'
  )
on conflict do nothing;

insert into entitlement_grants (
  id, user_id, entitlement_type, target_scope, source_subscription_id,
  source_addon_id, starts_at, ends_at, created_at
) values
  (
    '88888888-8888-8888-8888-888888888061', '88888888-8888-8888-8888-888888888001',
    'subscription', 'library:*', '88888888-8888-8888-8888-888888888031',
    null, '2026-04-01 09:00:00+00', '2026-05-01 00:00:00+00', '2026-04-01 09:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888062', '88888888-8888-8888-8888-888888888002',
    'seat', 'library:*', '88888888-8888-8888-8888-888888888031',
    null, '2026-04-02 10:00:00+00', '2026-05-01 00:00:00+00', '2026-04-02 10:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888063', '88888888-8888-8888-8888-888888888001',
    'addon', 'feature:ai_package', '88888888-8888-8888-8888-888888888031',
    '88888888-8888-8888-8888-888888888041', '2026-04-01 09:05:00+00', '2026-05-01 00:00:00+00', '2026-04-01 09:05:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888064', '88888888-8888-8888-8888-888888888003',
    'role', 'coach_panel:*', null,
    null, '2026-04-03 08:00:00+00', null, '2026-04-03 08:00:00+00'
  )
on conflict do nothing;

insert into purchase_receipts (
  id, subscription_id, store_type, external_receipt_id, verification_status, payload, verified_at, created_at
) values
  (
    '88888888-8888-8888-8888-888888888071', '88888888-8888-8888-8888-888888888031',
    'apple_app_store', 'apple-family-plan-receipt-20260401-001', 'verified',
    '{"currency":"USD","gross_amount":"49.99","addons":["ai_package","extra_seat"]}'::jsonb,
    '2026-04-01 09:01:00+00', '2026-04-01 09:01:00+00'
  )
on conflict do nothing;

insert into reading_settings (
  user_id, font_scale, background_mode, line_spacing, updated_at
) values
  ('88888888-8888-8888-8888-888888888001', 1.20, 'sepia', 1.60, '2026-04-11 11:12:00+00'),
  ('88888888-8888-8888-8888-888888888002', 1.35, 'light', 1.80, '2026-04-11 11:12:00+00')
on conflict do nothing;

insert into reminder_settings (
  id, user_id, daily_enabled, workshop_followup_enabled, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888081', '88888888-8888-8888-8888-888888888001',
    true, true, '2026-04-01 09:10:00+00', '2026-04-11 11:13:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888082', '88888888-8888-8888-8888-888888888002',
    true, false, '2026-04-02 09:10:00+00', '2026-04-11 11:13:00+00'
  )
on conflict do nothing;

insert into reminder_schedules (
  id, user_id, reminder_type, scheduled_local_time, enabled, created_at
) values
  (
    '88888888-8888-8888-8888-888888888091', '88888888-8888-8888-8888-888888888001',
    'daily', '20:00:00', true, '2026-04-01 09:11:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888092', '88888888-8888-8888-8888-888888888001',
    'workshop_followup', '08:30:00', true, '2026-04-05 09:11:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888093', '88888888-8888-8888-8888-888888888002',
    'daily', '19:30:00', true, '2026-04-02 09:11:00+00'
  )
on conflict do nothing;

insert into notification_preferences (
  id, user_id, preference_type, enabled, frequency, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888101', '88888888-8888-8888-8888-888888888001',
    'journey', true, 'instant', '2026-04-01 09:12:00+00', '2026-04-11 11:14:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888102', '88888888-8888-8888-8888-888888888001',
    'social', false, 'weekly_digest', '2026-04-01 09:12:00+00', '2026-04-11 11:14:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888103', '88888888-8888-8888-8888-888888888002',
    'reading', true, 'daily_digest', '2026-04-02 09:12:00+00', '2026-04-11 11:14:00+00'
  )
on conflict do nothing;

insert into quiet_hours (user_id, start_time, end_time, updated_at) values
  ('88888888-8888-8888-8888-888888888001', '22:30:00', '07:00:00', '2026-04-11 11:15:00+00')
on conflict do nothing;

insert into notifications (
  id, user_id, notification_type, title, body, deep_link, is_read, sent_at, created_at
) values
  (
    '88888888-8888-8888-8888-888888888111', '88888888-8888-8888-8888-888888888001',
    'reminder', 'Bugunku yolculuk adimin hazir',
    'Ic Denge Yolculugu icindeki Duygu Regulasyon Modulu seni bekliyor.',
    '/home', false, '2026-04-11 20:00:00+00', '2026-04-11 20:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888112', '88888888-8888-8888-8888-888888888001',
    'coach_feedback', 'Kocundan yeni geri bildirim var',
    'Workbook girisindeki niyet cumlen uzerine yeni bir not paylasildi.',
    '/coach/client/88888888-8888-8888-8888-888888888001', true, '2026-04-11 09:30:00+00', '2026-04-11 09:30:00+00'
  )
on conflict do nothing;

insert into content_progress (
  id, user_id, content_item_id, target_type, status, progress_percent,
  started_at, completed_at, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999001', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111001', 'journey', 'in_progress', 46.50,
    '2026-04-03 08:00:00+00', null, '2026-04-03 08:00:00+00', '2026-04-11 11:20:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999002', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111002', 'module', 'completed', 100.00,
    '2026-04-03 08:05:00+00', '2026-04-06 21:10:00+00', '2026-04-03 08:05:00+00', '2026-04-06 21:10:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999003', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', 'workshop', 'in_progress', 63.00,
    '2026-04-07 09:00:00+00', null, '2026-04-07 09:00:00+00', '2026-04-11 11:20:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999004', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111004', 'ebook', 'in_progress', 27.40,
    '2026-04-05 19:00:00+00', null, '2026-04-05 19:00:00+00', '2026-04-11 11:20:00+00'
  )
on conflict do nothing;

insert into reading_positions (
  id, user_id, content_item_id, locator_type, locator_value, progress_percent,
  last_read_at, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999011', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111004', 'page', '131', 52.80,
    '2026-04-11 07:45:00+00', '2026-04-05 19:10:00+00', '2026-04-11 07:45:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999012', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-11111111100b', 'section', 'analysis:2', 75.00,
    '2026-04-11 08:10:00+00', '2026-04-10 20:00:00+00', '2026-04-11 08:10:00+00'
  )
on conflict do nothing;

insert into highlights (
  id, user_id, content_item_id, content_version_id, anchor_locator,
  selected_text_hash, color, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999021', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111004', '22222222-2222-2222-2222-222222222004',
    'page:131:paragraph:4', 'sha256:selected-ebook-passive-vs-active', 'amber',
    '2026-04-11 07:46:00+00', '2026-04-11 07:46:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999022', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-11111111100b', '22222222-2222-2222-2222-22222222200b',
    'section:psychology_bridge:paragraph:2', 'sha256:selected-hadith-learned-helplessness', 'green',
    '2026-04-11 08:12:00+00', '2026-04-11 08:12:00+00'
  )
on conflict do nothing;

insert into notes (
  id, user_id, content_item_id, content_version_id, anchor_locator,
  body, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999031', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111004', '22222222-2222-2222-2222-222222222004',
    'page:131:paragraph:4',
    'Bu bolumde kaygiyi tamamen yok etmek yerine onu isimlendirmek daha gercekci gorunuyor.',
    '2026-04-11 07:47:00+00', '2026-04-11 07:47:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999032', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '22222222-2222-2222-2222-222222222003',
    'stage:10:block:output',
    'Workshop planinda 72 saatlik kucuk adimim: tetiklenince once nefes, sonra dua cumlesi.',
    '2026-04-11 09:20:00+00', '2026-04-11 09:20:00+00'
  )
on conflict do nothing;

insert into comment_submissions (
  id, user_id, target_type, target_content_item_id, content, status,
  submitted_at, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999041', '88888888-8888-8888-8888-888888888001',
    'module', '11111111-1111-1111-1111-111111111002',
    'Sabir bolumunde kacma davranisimi fark ettim; devam etmenin kucuk adimini secmek iyi geldi.',
    'submitted', '2026-04-06 21:05:00+00', '2026-04-06 20:55:00+00', '2026-04-06 21:05:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999042', '88888888-8888-8888-8888-888888888001',
    'workshop', '11111111-1111-1111-1111-111111111003',
    'Kriz ani dua karti bana otomatiklesen ic cumlelerimi gorme firsati verdi.',
    'draft', null, '2026-04-11 09:15:00+00', '2026-04-11 09:18:00+00'
  )
on conflict do nothing;

insert into favorite_items (
  id, user_id, source_type, source_ref_id, note, created_at
) values
  (
    '99999999-9999-9999-9999-999999999051', '88888888-8888-8888-8888-888888888001',
    'highlight', '99999999-9999-9999-9999-999999999021',
    'Ebook icindeki en cok dondugum pasaj.', '2026-04-11 08:00:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999052', '88888888-8888-8888-8888-888888888001',
    'note', '99999999-9999-9999-9999-999999999032',
    'Workshop notunu hizli erisim icin arsivledim.', '2026-04-11 09:21:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999053', '88888888-8888-8888-8888-888888888001',
    'content_item', '11111111-1111-1111-1111-11111111100b',
    'Bu hadisi AI sohbetinde tekrar kullanmak istiyorum.', '2026-04-11 08:15:00+00'
  )
on conflict do nothing;

insert into collections (id, user_id, name, created_at) values
  (
    '99999999-9999-9999-9999-999999999061', '88888888-8888-8888-8888-888888888001',
    'Kaygi ve Denge', '2026-04-11 09:25:00+00'
  )
on conflict do nothing;

insert into collection_items (collection_id, favorite_item_id, created_at) values
  ('99999999-9999-9999-9999-999999999061', '99999999-9999-9999-9999-999999999051', '2026-04-11 09:26:00+00'),
  ('99999999-9999-9999-9999-999999999061', '99999999-9999-9999-9999-999999999053', '2026-04-11 09:26:30+00')
on conflict do nothing;

insert into downloads (
  id, user_id, content_item_id, asset_id, download_status, local_path,
  byte_size, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999071', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111004', '44444444-4444-4444-4444-444444444003',
    'completed', '/data/user/0/pst/files/ebooks/kalbimin-beyazi.epub',
    5242880, '2026-04-05 19:15:00+00', '2026-04-05 19:17:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999072', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '44444444-4444-4444-4444-444444444005',
    'completed', '/data/user/0/pst/files/workshops/mutlak-workbook.pdf',
    4194304, '2026-04-07 09:05:00+00', '2026-04-07 09:06:00+00'
  )
on conflict do nothing;

insert into workbook_entries (
  id, user_id, workshop_content_item_id, workshop_stage_id, workshop_session_id,
  status, version_no, payload_json, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999081', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '77777777-7777-7777-7777-777777777043',
    '77777777-7777-7777-7777-777777777052', 'saved', 3,
    '{"yuk_haritasi":[{"yuk":"kontrol etme ihtiyaci","tetikleyici":"belirsizlik","karsilik_dua":"Allahim beni dogruya yonelt"}],"kucuk_adim":"aksam kontrol listesi yerine 5 dakikalik tefekkur"}'::jsonb,
    '2026-04-11 09:00:00+00', '2026-04-11 09:22:00+00'
  )
on conflict do nothing;

insert into workshop_followup_plans (
  id, user_id, workshop_content_item_id, window_type, intent_text,
  daily_phrase, small_step, status, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999091', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '72h',
    'Ilk 72 saatte panige donmeden yukumu isimlendirmek istiyorum.',
    'Guclu olmak, vazgecmemek ve yardim istemektir.',
    'Tetiklenince once 3 nefes, sonra dua cumlesi.', 'active',
    '2026-04-11 09:23:00+00', '2026-04-11 09:23:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999092', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '30_days',
    '30 gun boyunca kontrol yerine tevekkul pratigini guclendirmek istiyorum.',
    'Faydali olani surdur, yardim iste, acizlik kimligi kurma.',
    'Haftada bir coach notlariyla birlikte workbook gozden gecir.', 'draft',
    '2026-04-11 09:24:00+00', '2026-04-11 09:24:00+00'
  )
on conflict do nothing;

insert into coach_assignments (
  id, coach_user_id, client_user_id, status, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999101', '88888888-8888-8888-8888-888888888003',
    '88888888-8888-8888-8888-888888888001', 'active',
    '2026-04-07 08:00:00+00', '2026-04-11 11:30:00+00'
  )
on conflict do nothing;

insert into coach_feedback (
  id, coach_user_id, client_user_id, target_content_item_id, body, created_at
) values
  (
    '99999999-9999-9999-9999-999999999111', '88888888-8888-8888-8888-888888888003',
    '88888888-8888-8888-8888-888888888001', '11111111-1111-1111-1111-111111111003',
    'Workbook girisindeki ic cumleni daha somut tetikleyicilerle eslestirirsen 72 saatlik plan daha uygulanabilir hale gelir.',
    '2026-04-11 09:28:00+00'
  )
on conflict do nothing;

insert into risk_signals (
  id, user_id, risk_level, source_type, detected_at, metadata
) values
  (
    '99999999-9999-9999-9999-999999999121', '88888888-8888-8888-8888-888888888001',
    'medium', 'comment_sentiment',
    '2026-04-11 09:29:00+00',
    '{"signal":"high anxiety language + low sleep references","recommended_action":"coach review"}'::jsonb
  )
on conflict do nothing;

insert into reading_groups (
  id, name, privacy, active_material_content_item_id, created_at
) values
  (
    '99999999-9999-9999-9999-999999999131', 'Aile Ic Denge Grubu', 'private',
    '11111111-1111-1111-1111-111111111001', '2026-04-08 18:00:00+00'
  )
on conflict do nothing;

insert into reading_group_members (
  id, reading_group_id, user_id, role, created_at
) values
  (
    '99999999-9999-9999-9999-999999999141', '99999999-9999-9999-9999-999999999131',
    '88888888-8888-8888-8888-888888888001', 'owner', '2026-04-08 18:01:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999142', '99999999-9999-9999-9999-999999999131',
    '88888888-8888-8888-8888-888888888002', 'member', '2026-04-08 18:02:00+00'
  )
on conflict do nothing;

insert into reading_group_materials (
  id, reading_group_id, content_item_id, material_type, status, created_at
) values
  (
    '99999999-9999-9999-9999-999999999151', '99999999-9999-9999-9999-999999999131',
    '11111111-1111-1111-1111-111111111001', 'journey', 'active', '2026-04-08 18:03:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999152', '99999999-9999-9999-9999-999999999131',
    '11111111-1111-1111-1111-111111111004', 'ebook', 'recommended', '2026-04-08 18:04:00+00'
  )
on conflict do nothing;

insert into reading_group_messages (
  id, reading_group_id, author_user_id, body, created_at
) values
  (
    '99999999-9999-9999-9999-999999999161', '99999999-9999-9999-9999-999999999131',
    '88888888-8888-8888-8888-888888888001',
    'Bu hafta Duygu Regulasyon Modulundeki Kaygiyi Tanimak paketini birlikte bitirelim.',
    '2026-04-10 19:00:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999162', '99999999-9999-9999-9999-999999999131',
    '88888888-8888-8888-8888-888888888002',
    'Ebook bolumundeki sayfa 131 notu bana da iyi geldi; onu grubun favorilerine ekleyelim.',
    '2026-04-10 19:10:00+00'
  )
on conflict do nothing;

insert into reading_group_schedules (
  id, reading_group_id, starts_at, cadence, created_at
) values
  (
    '99999999-9999-9999-9999-999999999171', '99999999-9999-9999-9999-999999999131',
    '2026-04-12 19:30:00+00', 'weekly', '2026-04-08 18:05:00+00'
  )
on conflict do nothing;

insert into book_clubs (
  id, name, privacy, ebook_content_item_id, created_at
) values
  (
    '99999999-9999-9999-9999-999999999181', 'Kalbimin Beyazi Kulubu', 'open',
    '11111111-1111-1111-1111-111111111004', '2026-04-09 17:00:00+00'
  )
on conflict do nothing;

insert into book_club_members (
  id, book_club_id, user_id, role, created_at
) values
  (
    '99999999-9999-9999-9999-999999999191', '99999999-9999-9999-9999-999999999181',
    '88888888-8888-8888-8888-888888888001', 'host', '2026-04-09 17:01:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999192', '99999999-9999-9999-9999-999999999181',
    '88888888-8888-8888-8888-888888888002', 'member', '2026-04-09 17:02:00+00'
  )
on conflict do nothing;

insert into book_club_topics (
  id, book_club_id, title, status, created_at
) values
  (
    '99999999-9999-9999-9999-999999999201', '99999999-9999-9999-9999-999999999181',
    'Bolum 2: Kaygidan Sukunete', 'active', '2026-04-09 17:03:00+00'
  )
on conflict do nothing;

insert into book_club_messages (
  id, book_club_id, author_user_id, topic_id, body, created_at
) values
  (
    '99999999-9999-9999-9999-999999999211', '99999999-9999-9999-9999-999999999181',
    '88888888-8888-8888-8888-888888888001', '99999999-9999-9999-9999-999999999201',
    'Bu bolumde kaygiyi sondurmekten cok tanimlamak vurgusu sizde ne uyandirdi?',
    '2026-04-10 20:00:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999212', '99999999-9999-9999-9999-999999999181',
    '88888888-8888-8888-8888-888888888002', '99999999-9999-9999-9999-999999999201',
    'Benim icin workbook ile birlikte okununca daha uygulamali hale geldi.',
    '2026-04-10 20:05:00+00'
  )
on conflict do nothing;

insert into book_club_events (
  id, book_club_id, starts_at, event_type, created_at
) values
  (
    '99999999-9999-9999-9999-999999999221', '99999999-9999-9999-9999-999999999181',
    '2026-04-13 20:00:00+00', 'discussion_session', '2026-04-09 17:04:00+00'
  )
on conflict do nothing;

insert into badge_definitions (
  id, category, name, xp_reward, created_at
) values
  (
    '99999999-9999-9999-9999-999999999231', 'module', 'Kesif Tamamlama Rozeti', 120,
    '2026-04-11 11:31:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999232', 'workshop', 'Workbook Ustaligi', 180,
    '2026-04-11 11:31:00+00'
  )
on conflict do nothing;

insert into user_badges (
  id, user_id, badge_definition_id, awarded_at
) values
  (
    '99999999-9999-9999-9999-999999999241', '88888888-8888-8888-8888-888888888001',
    '99999999-9999-9999-9999-999999999231', '2026-04-06 21:10:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999242', '88888888-8888-8888-8888-888888888001',
    '99999999-9999-9999-9999-999999999232', '2026-04-11 09:25:00+00'
  )
on conflict do nothing;

insert into xp_ledger (
  id, user_id, delta_xp, reason_code, created_at
) values
  (
    '99999999-9999-9999-9999-999999999251', '88888888-8888-8888-8888-888888888001',
    120, 'module_completed', '2026-04-06 21:10:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999252', '88888888-8888-8888-8888-888888888001',
    180, 'workbook_submitted', '2026-04-11 09:25:00+00'
  )
on conflict do nothing;

insert into level_definitions (
  id, level_no, required_xp, label, created_at
) values
  ('99999999-9999-9999-9999-999999999261', 1, 0, 'Yeni Baslayan', '2026-04-11 11:32:00+00'),
  ('99999999-9999-9999-9999-999999999262', 2, 100, 'Istikrarli Okuyucu', '2026-04-11 11:32:00+00'),
  ('99999999-9999-9999-9999-999999999263', 3, 250, 'Derinlesen Yolcu', '2026-04-11 11:32:00+00')
on conflict do nothing;

insert into user_levels (
  id, user_id, level_definition_id, reached_at
) values
  (
    '99999999-9999-9999-9999-999999999271', '88888888-8888-8888-8888-888888888001',
    '99999999-9999-9999-9999-999999999263', '2026-04-11 09:25:30+00'
  )
on conflict do nothing;

insert into ai_conversations (
  id, user_id, title, created_at
) values
  (
    '99999999-9999-9999-9999-999999999281', '88888888-8888-8888-8888-888888888001',
    'Kaygi ve aktif gayret uzerine AI sohbeti', '2026-04-11 08:05:00+00'
  )
on conflict do nothing;

insert into ai_messages (
  id, ai_conversation_id, role, body, created_at
) values
  (
    '99999999-9999-9999-9999-999999999291', '99999999-9999-9999-9999-999999999281',
    'system', 'Yanitlarini yalnizca PST kaynaklarindan uret ve mutlaka kaynak goster.', '2026-04-11 08:05:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999292', '99999999-9999-9999-9999-999999999281',
    'user', 'Kaygi yasarken aktif caba ile teslimiyet dengesini nasil kurabilirim?', '2026-04-11 08:06:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999293', '99999999-9999-9999-9999-999999999281',
    'assistant', 'PST kaynaklarina gore once faydali olan kucuk adimi sec, sonra yardim iste ve "keske" diline dusme. Asagida ilgili kaynaklari ekledim.', '2026-04-11 08:06:30+00'
  )
on conflict do nothing;

insert into embedding_documents (
  id, content_item_id, content_version_id, status, vector_backend, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999301', '11111111-1111-1111-1111-11111111100b',
    '22222222-2222-2222-2222-22222222200b', 'ready', 'pgvector',
    '2026-04-11 08:00:00+00', '2026-04-11 08:00:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999302', '11111111-1111-1111-1111-111111111003',
    '22222222-2222-2222-2222-222222222003', 'ready', 'pgvector',
    '2026-04-11 08:00:00+00', '2026-04-11 08:00:00+00'
  )
on conflict do nothing;

insert into embedding_chunks (
  id, embedding_document_id, source_table, source_row_id, chunk_order, locator_ref,
  chunk_hash, chunk_text, created_at
) values
  (
    '99999999-9999-9999-9999-999999999311', '99999999-9999-9999-9999-999999999301',
    'hadith_analysis_sections', '77777777-7777-7777-7777-777777777082', 0, 'analysis:2',
    'sha256:chunk-hadith-analysis-2',
    'Pasif kadercilik ile aktif gayret arasindaki fark bu bolumde aciklanir.',
    '2026-04-11 08:01:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999312', '99999999-9999-9999-9999-999999999301',
    'hadith_analysis_sections', '77777777-7777-7777-7777-777777777083', 1, 'psychology_bridge:3',
    'sha256:chunk-hadith-psych-3',
    'Learned helplessness ile hadisin irade cagrisi arasinda iliski kurulur.',
    '2026-04-11 08:01:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999313', '99999999-9999-9999-9999-999999999302',
    'workshop_content_blocks', '77777777-7777-7777-7777-777777777061', 0, 'stage:1:block:1',
    'sha256:chunk-workshop-hadith',
    'Workshop ilk asamada kuvvetli mumin hadisini kavramsal bir giris olarak kullanir.',
    '2026-04-11 08:01:30+00'
  ),
  (
    '99999999-9999-9999-9999-999999999314', '99999999-9999-9999-9999-999999999302',
    'workshop_content_blocks', '77777777-7777-7777-7777-777777777062', 1, 'stage:1:block:2',
    'sha256:chunk-workshop-psychology',
    'Workshop psikoloji koprusu, katilimcinin acizlik kimligi kurmasini fark ettirir.',
    '2026-04-11 08:01:30+00'
  )
on conflict do nothing;

insert into retrieval_traces (
  id, ai_message_id, embedding_chunk_id, retrieval_strategy, rank_order, score, created_at
) values
  (
    '99999999-9999-9999-9999-999999999321', '99999999-9999-9999-9999-999999999293',
    '99999999-9999-9999-9999-999999999312', 'hybrid_keyword_vector', 1, 0.9625, '2026-04-11 08:06:20+00'
  ),
  (
    '99999999-9999-9999-9999-999999999322', '99999999-9999-9999-9999-999999999293',
    '99999999-9999-9999-9999-999999999311', 'hybrid_keyword_vector', 2, 0.9340, '2026-04-11 08:06:21+00'
  ),
  (
    '99999999-9999-9999-9999-999999999323', '99999999-9999-9999-9999-999999999293',
    '99999999-9999-9999-9999-999999999314', 'hybrid_keyword_vector', 3, 0.9011, '2026-04-11 08:06:22+00'
  )
on conflict do nothing;

insert into ai_response_citations (
  id, ai_message_id, embedding_chunk_id, relevance_score, locator_ref, quoted_excerpt, created_at
) values
  (
    '99999999-9999-9999-9999-999999999331', '99999999-9999-9999-9999-999999999293',
    '99999999-9999-9999-9999-999999999312', 0.9625, 'psychology_bridge:3',
    'Learned helplessness yerine faydali olana yonelme cagrisi one cikar.',
    '2026-04-11 08:06:30+00'
  ),
  (
    '99999999-9999-9999-9999-999999999332', '99999999-9999-9999-9999-999999999293',
    '99999999-9999-9999-9999-999999999314', 0.9011, 'stage:1:block:2',
    'Workshop icerigi acizlik kimligi ile mucadeleyi uygulamaya tasir.',
    '2026-04-11 08:06:30+00'
  )
on conflict do nothing;

insert into videos (
  content_item_id, duration_seconds, difficulty, stream_uri, created_at
) values
  (
    '11111111-1111-1111-1111-11111111100c', 1320, 'intermediate',
    'https://cdn.pst.example/video/emotional-resilience/master.m3u8', '2026-04-11 11:33:00+00'
  )
on conflict do nothing;

insert into video_caption_tracks (
  id, video_content_item_id, language_code, file_uri, created_at
) values
  (
    '99999999-9999-9999-9999-999999999341', '11111111-1111-1111-1111-11111111100c',
    'tr', 'https://cdn.pst.example/video/emotional-resilience/tr.vtt', '2026-04-11 11:34:00+00'
  )
on conflict do nothing;

insert into video_transcript_segments (
  id, video_content_item_id, start_second, end_second, transcript_text, created_at
) values
  (
    '99999999-9999-9999-9999-999999999351', '11111111-1111-1111-1111-11111111100c',
    0, 45, 'Kaygi yukseldiginde ilk yapilacak sey, duyguyu isimlendirip bedene donmektir.',
    '2026-04-11 11:35:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999352', '11111111-1111-1111-1111-11111111100c',
    46, 110, 'Ikinci adim, faydali olan kucuk adimi secmek ve yardim istemekten kacinmamaktir.',
    '2026-04-11 11:35:00+00'
  )
on conflict do nothing;

insert into video_progress (
  id, user_id, video_content_item_id, last_position_seconds, progress_percent, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999361', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-11111111100c', 534, 40.45, '2026-04-11 11:36:00+00'
  )
on conflict do nothing;

insert into video_downloads (
  id, user_id, video_content_item_id, local_path, download_status, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999371', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-11111111100c',
    '/data/user/0/pst/files/video/emotional-resilience-offline.mp4',
    'completed', '2026-04-11 11:37:00+00', '2026-04-11 11:38:00+00'
  )
on conflict do nothing;

-- Supplemental enum-coverage scenarios:
-- - guest trial onboarding with free video content
-- - review-only coach module imported from legacy HTML
-- - archived role-restricted coach video and churned billing flows
-- - failed imports, pending embeddings, multi-state downloads, and moderated comments

insert into source_documents (
  id, source_type, domain_type, title, original_uri, payload_json, checksum, language_code,
  import_status, imported_at, imported_by, metadata
) values
  (
    '33333333-3333-3333-3333-333333333012', 'html', 'module',
    'Coach Observation Review Import',
    's3://pst/editorial/modules/coach-observation-review.html', null,
    'sha256:module-coach-observation-html-v1', 'tr', 'imported',
    '2026-04-11 12:00:00+00', 'editorial.review',
    '{"workflow":"editorial_review","source_origin":"legacy_web_export"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333013', 'plain_text', 'video',
    'Basic Breathing Practice Transcript',
    's3://pst/editorial/video/basic-breathing-practice.txt', null,
    'sha256:video-basic-breathing-txt-v1', 'tr', 'imported',
    '2026-04-11 12:02:00+00', 'media.team',
    '{"normalization_target":"caption_blocks","speaker":"guided_audio"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333014', 'html', 'hadith_analysis',
    'Draft Hadith Companion HTML Import',
    's3://pst/editorial/hadith/draft-hadith-companion.html', null,
    'sha256:hadith-companion-html-v1', 'tr', 'pending',
    '2026-04-11 12:03:00+00', 'editorial.ops',
    '{"expected_target":"addon_only","reason":"awaiting_editor_assignment"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333015', 'plain_text', 'workshop',
    'Workshop Hotline Notes Import',
    's3://pst/editorial/workshops/hotline-notes-raw.txt', null,
    'sha256:workshop-hotline-notes-txt-v1', 'tr', 'processing',
    '2026-04-11 12:04:00+00', 'ingest.bot',
    '{"pipeline_stage":"normalizing_sections","target_workshop":"mutlak-muhtaclik"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333016', 'plain_text', 'ebook',
    'Broken Ebook OCR Rescue Text',
    's3://pst/editorial/ebooks/archived-ocr-rescue.txt', null,
    'sha256:ebook-ocr-rescue-v1', 'tr', 'failed',
    '2026-04-11 12:05:00+00', 'ocr.pipeline',
    '{"failure_reason":"page_map_alignment_failed","next_action":"manual_reimport"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333017', 'plain_text', 'video',
    'Archived Coach Lab Transcript',
    's3://pst/editorial/video/coach-lab-transcript.txt', null,
    'sha256:video-coach-lab-txt-v1', 'tr', 'imported',
    '2026-04-11 12:06:00+00', 'media.team',
    '{"visibility":"role_restricted","audience":"coach_only"}'::jsonb
  )
on conflict do nothing;

insert into content_items (
  id, kind, subtype, slug, title, subtitle, summary, status, visibility, locale,
  current_version_id, estimated_minutes, analytics_key, metadata, created_at, updated_at
) values
  (
    '11111111-1111-1111-1111-111111111101', 'video', 'breathing_practice',
    'temel-nefes-pratigi-videosu', 'Temel Nefes Pratigi Videosu', 'Ucretsiz baslangic egzersizi',
    'Yeni kullanicilar icin acik olan, kisa ve yonlendirmeli nefes duzenleme videosu.',
    'published', 'free', 'tr',
    '22222222-2222-2222-2222-222222222101', 6, 'video_temel_nefes_pratigi',
    '{"discovery_type":"video_extension","entry_point":"free_onboarding"}'::jsonb,
    '2026-04-11 12:10:00+00', '2026-04-11 12:10:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111102', 'module', 'coach_review',
    'koc-gozlem-review-modulu', 'Koc Gozlem Review Modulu', null,
    'HTML kaynaktan normalize edilmis, editor onayi bekleyen gozlem modulu.',
    'review', 'subscription', 'tr',
    '22222222-2222-2222-2222-222222222102', 14, 'module_koc_gozlem_review',
    '{"source_truth":"kesifler_yolculugu","workflow":"review_only"}'::jsonb,
    '2026-04-11 12:11:00+00', '2026-04-11 12:11:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111103', 'video', 'coach_training',
    'kriz-ani-koc-laboratuvari', 'Kriz Ani Koc Laboratuvari', 'Arsivlenmis ileri seviye egitim',
    'Yalnizca koc rolleri icin acik olan, arsive alinmis ileri seviye uygulama videosu.',
    'archived', 'role_restricted', 'tr',
    '22222222-2222-2222-2222-222222222103', 35, 'video_kriz_ani_koc_laboratuvari',
    '{"discovery_type":"video_extension","audience":"coach_only"}'::jsonb,
    '2026-04-11 12:12:00+00', '2026-04-11 12:12:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111104', 'hadith_analysis', 'draft_addon',
    'hadis-ek-paketi-taslak-analiz', 'Hadis Ek Paketi Taslak Analiz', null,
    'Yalnizca ek paket satin alan kullanicilar icin hazirlanan, editor bekleyen taslak analiz.',
    'draft', 'addon', 'tr',
    null, 18, 'hadith_addon_draft_analysis',
    '{"source_truth":"hadith_analizleri","release_gate":"addon_bundle"}'::jsonb,
    '2026-04-11 12:13:00+00', '2026-04-11 12:13:00+00'
  )
on conflict do nothing;

insert into content_versions (
  id, content_item_id, source_document_id, version_no, structured_payload_ref,
  metadata, published_at, published_by, change_summary, created_at
) values
  (
    '22222222-2222-2222-2222-222222222101', '11111111-1111-1111-1111-111111111101',
    '33333333-3333-3333-3333-333333333013', 1,
    's3://pst/published/video/temel-nefes-pratigi/v1.json',
    '{"surface":"free_onboarding","difficulty":"beginner","reader_delivery":"structured_payload_ref"}'::jsonb,
    '2026-04-11 12:14:00+00', 'release.bot', 'Published free starter video',
    '2026-04-11 12:14:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222102', '11111111-1111-1111-1111-111111111102',
    '33333333-3333-3333-3333-333333333012', 1,
    's3://pst/published/modules/koc-gozlem-review/v1-preview.json',
    '{"workflow":"review","reader_delivery":"structured_payload_ref","published_from":"html"}'::jsonb,
    null, null, 'HTML import normalized for editorial review',
    '2026-04-11 12:15:00+00'
  ),
  (
    '22222222-2222-2222-2222-222222222103', '11111111-1111-1111-1111-111111111103',
    '33333333-3333-3333-3333-333333333017', 1,
    's3://pst/published/video/kriz-ani-koc-laboratuvari/v1.json',
    '{"surface":"coach_archive","difficulty":"advanced","visibility":"role_restricted"}'::jsonb,
    '2025-12-10 09:00:00+00', 'archive.bot', 'Archived coach training cut',
    '2025-12-10 09:00:00+00'
  )
on conflict do nothing;

insert into content_assets (
  id, content_item_id, content_version_id, asset_type, storage_uri, mime_type,
  byte_size, checksum, download_policy, created_at
) values
  (
    '44444444-4444-4444-4444-444444444009', '11111111-1111-1111-1111-111111111004',
    '22222222-2222-2222-2222-222222222004', 'audio',
    's3://pst/assets/ebooks/kalbimin-beyazi-audio.mp3', 'audio/mpeg',
    18700000, 'sha256:ebook-audio-1', 'downloadable', '2026-04-11 12:16:00+00'
  ),
  (
    '44444444-4444-4444-4444-444444444010', '11111111-1111-1111-1111-11111111100c',
    '22222222-2222-2222-2222-22222222200c', 'transcript',
    's3://pst/assets/video/emotional-resilience-transcript.vtt', 'text/vtt',
    28000, 'sha256:video-transcript-1', 'downloadable', '2026-04-11 12:17:00+00'
  )
on conflict do nothing;

insert into users (
  id, role, language_code, subscription_status, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888005', 'guest', 'tr', 'trial',
    '2026-04-11 12:18:00+00', '2026-04-11 12:18:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888006', 'plan_owner', 'tr', 'canceled',
    '2026-03-01 09:00:00+00', '2026-04-11 12:18:00+00'
  )
on conflict do nothing;

insert into subscriptions (
  id, owner_user_id, plan_id, status, renewal_at, period_end_at, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888032', '88888888-8888-8888-8888-888888888005',
    '88888888-8888-8888-8888-888888888021', 'trial',
    '2026-04-18 00:00:00+00', '2026-04-18 00:00:00+00',
    '2026-04-11 12:19:00+00', '2026-04-11 12:19:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888033', '88888888-8888-8888-8888-888888888006',
    '88888888-8888-8888-8888-888888888021', 'canceled',
    null, '2026-04-05 00:00:00+00',
    '2026-03-01 09:10:00+00', '2026-04-05 00:00:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888034', '88888888-8888-8888-8888-888888888006',
    '88888888-8888-8888-8888-888888888021', 'inactive',
    null, '2025-12-01 00:00:00+00',
    '2025-10-01 09:10:00+00', '2025-12-01 00:00:00+00'
  )
on conflict do nothing;

insert into subscription_addons (
  id, subscription_id, addon_type, status, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888043', '88888888-8888-8888-8888-888888888032',
    'coaching_training', 'inactive', '2026-04-11 12:20:00+00', '2026-04-11 12:20:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888044', '88888888-8888-8888-8888-888888888033',
    'coaching_training', 'canceled', '2026-03-01 09:15:00+00', '2026-04-05 00:00:00+00'
  )
on conflict do nothing;

insert into seats (
  id, subscription_id, assigned_user_id, status, created_at
) values
  (
    '88888888-8888-8888-8888-888888888054', '88888888-8888-8888-8888-888888888033',
    null, 'inactive', '2026-04-05 00:00:00+00'
  )
on conflict do nothing;

insert into entitlement_grants (
  id, user_id, entitlement_type, target_scope, source_subscription_id,
  source_addon_id, starts_at, ends_at, created_at
) values
  (
    '88888888-8888-8888-8888-888888888065', '88888888-8888-8888-8888-888888888002',
    'content_bundle', 'bundle:anxiety-reset-pack', null,
    null, '2026-04-11 12:21:00+00', '2026-05-11 12:21:00+00', '2026-04-11 12:21:00+00'
  )
on conflict do nothing;

insert into reminder_schedules (
  id, user_id, reminder_type, scheduled_local_time, enabled, created_at
) values
  (
    '88888888-8888-8888-8888-888888888094', '88888888-8888-8888-8888-888888888002',
    'journey', '07:30:00', true, '2026-04-11 12:22:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888095', '88888888-8888-8888-8888-888888888002',
    'workshop', '18:00:00', true, '2026-04-11 12:22:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888096', '88888888-8888-8888-8888-888888888005',
    'reading', '21:00:00', true, '2026-04-11 12:22:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888097', '88888888-8888-8888-8888-888888888005',
    'social', '12:30:00', false, '2026-04-11 12:22:00+00'
  )
on conflict do nothing;

insert into notification_preferences (
  id, user_id, preference_type, enabled, frequency, created_at, updated_at
) values
  (
    '88888888-8888-8888-8888-888888888104', '88888888-8888-8888-8888-888888888002',
    'workshop', true, 'instant', '2026-04-11 12:23:00+00', '2026-04-11 12:23:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888105', '88888888-8888-8888-8888-888888888006',
    'billing', true, 'weekly_digest', '2026-04-11 12:23:00+00', '2026-04-11 12:23:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888106', '88888888-8888-8888-8888-888888888001',
    'coach', true, 'instant', '2026-04-11 12:23:00+00', '2026-04-11 12:23:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888107', '88888888-8888-8888-8888-888888888005',
    'system', true, 'daily_digest', '2026-04-11 12:23:00+00', '2026-04-11 12:23:00+00'
  )
on conflict do nothing;

insert into notifications (
  id, user_id, notification_type, title, body, deep_link, is_read, sent_at, created_at
) values
  (
    '88888888-8888-8888-8888-888888888113', '88888888-8888-8888-8888-888888888002',
    'content', 'Ucretsiz video acildi',
    'Temel Nefes Pratigi Videosu artik tum yeni kullanicilar icin acik.',
    '/discover/videos/temel-nefes-pratigi-videosu', false, '2026-04-11 12:24:00+00', '2026-04-11 12:24:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888114', '88888888-8888-8888-8888-888888888006',
    'billing', 'Iptal edilen planin erisim suresi bitti',
    'Kocluk egitimi ek paketi kapandi; yalnizca mevcut indirmelerin erisimi kaldirildi.',
    '/settings/billing', false, '2026-04-11 12:24:30+00', '2026-04-11 12:24:30+00'
  ),
  (
    '88888888-8888-8888-8888-888888888115', '88888888-8888-8888-8888-888888888001',
    'social', 'Kitap kulubunde yeni mesaj var',
    'Kalbimin Beyazi Kulubu icinde yeni tartisma mesaji paylasildi.',
    '/community/book-clubs/99999999-9999-9999-9999-999999999181', true, '2026-04-11 12:25:00+00', '2026-04-11 12:25:00+00'
  ),
  (
    '88888888-8888-8888-8888-888888888116', '88888888-8888-8888-8888-888888888005',
    'system', 'Deneme hesabina hos geldin',
    'Ucretsiz video, ebook ve yolculuk onerileri hazir.',
    '/home', false, '2026-04-11 12:25:30+00', '2026-04-11 12:25:30+00'
  )
on conflict do nothing;

insert into content_progress (
  id, user_id, content_item_id, target_type, status, progress_percent,
  started_at, completed_at, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999005', '88888888-8888-8888-8888-888888888005',
    '11111111-1111-1111-1111-111111111101', 'video', 'available', 0.00,
    null, null, '2026-04-11 12:26:00+00', '2026-04-11 12:26:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999006', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111103', 'video', 'locked', 0.00,
    null, null, '2026-04-11 12:26:00+00', '2026-04-11 12:26:00+00'
  )
on conflict do nothing;

insert into reading_positions (
  id, user_id, content_item_id, locator_type, locator_value, progress_percent,
  last_read_at, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999013', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111004', 'chapter', 'chapter:3', 34.00,
    '2026-04-11 12:27:00+00', '2026-04-09 19:10:00+00', '2026-04-11 12:27:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999014', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-11111111100c', 'timestamp', '192', 14.55,
    '2026-04-11 12:27:30+00', '2026-04-11 12:20:00+00', '2026-04-11 12:27:30+00'
  ),
  (
    '99999999-9999-9999-9999-999999999015', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111102', 'block', 'intro:block:reflection', 8.00,
    '2026-04-11 12:28:00+00', '2026-04-11 12:21:00+00', '2026-04-11 12:28:00+00'
  )
on conflict do nothing;

insert into comment_submissions (
  id, user_id, target_type, target_content_item_id, content, status,
  submitted_at, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999043', '88888888-8888-8888-8888-888888888002',
    'ebook', '11111111-1111-1111-1111-111111111004',
    'Paylasilan alintinin grup icinde kismi okunur olmasi daha guvenli olabilir.',
    'locked', '2026-04-09 20:00:00+00', '2026-04-09 19:50:00+00', '2026-04-10 08:00:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999044', '88888888-8888-8888-8888-888888888006',
    'journey', '11111111-1111-1111-1111-111111111001',
    'Eski abonelikten kalan yorum taslagi sure asimina ugradi.',
    'expired', '2026-03-10 10:00:00+00', '2026-03-10 09:40:00+00', '2026-04-11 12:28:30+00'
  )
on conflict do nothing;

insert into downloads (
  id, user_id, content_item_id, asset_id, download_status, local_path,
  byte_size, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999073', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111004', '44444444-4444-4444-4444-444444444009',
    'queued', null,
    18700000, '2026-04-11 12:29:00+00', '2026-04-11 12:29:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999074', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-11111111100c', '44444444-4444-4444-4444-444444444010',
    'downloading', '/data/user/0/pst/cache/video/emotional-resilience-transcript.partial',
    14000, '2026-04-11 12:29:10+00', '2026-04-11 12:29:20+00'
  ),
  (
    '99999999-9999-9999-9999-999999999075', '88888888-8888-8888-8888-888888888005',
    '11111111-1111-1111-1111-111111111004', '44444444-4444-4444-4444-444444444003',
    'failed', '/data/user/0/pst/cache/ebooks/kalbimin-beyazi.partial',
    1024000, '2026-04-11 12:29:30+00', '2026-04-11 12:29:50+00'
  ),
  (
    '99999999-9999-9999-9999-999999999076', '88888888-8888-8888-8888-888888888006',
    '11111111-1111-1111-1111-11111111100b', '44444444-4444-4444-4444-444444444007',
    'evicted', '/data/user/0/pst/files/hadith/kuvvetli-mumin-analysis.pdf',
    1572864, '2026-03-05 08:00:00+00', '2026-04-11 12:30:00+00'
  )
on conflict do nothing;

insert into workbook_entries (
  id, user_id, workshop_content_item_id, workshop_stage_id, workshop_session_id,
  status, version_no, payload_json, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999082', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111003', '77777777-7777-7777-7777-777777777043',
    '77777777-7777-7777-7777-777777777052', 'draft', 1,
    '{"ilk_not":"Tetigimi daha isimlendiremedim ama nefese donmeyi deniyorum."}'::jsonb,
    '2026-04-11 12:31:00+00', '2026-04-11 12:31:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999083', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '77777777-7777-7777-7777-777777777043',
    '77777777-7777-7777-7777-777777777052', 'submitted', 4,
    '{"niyet":"Tetiklendikten sonra panige degil duaya donmek","takip":"3 gunluk coach geri bildirimi bekleniyor"}'::jsonb,
    '2026-04-11 12:31:30+00', '2026-04-11 12:32:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999084', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '77777777-7777-7777-7777-777777777043',
    '77777777-7777-7777-7777-777777777052', 'archived', 2,
    '{"arsiv_notu":"Tamamlanan onceki donem calismasi"}'::jsonb,
    '2026-03-20 12:00:00+00', '2026-04-11 12:32:30+00'
  )
on conflict do nothing;

insert into workshop_followup_plans (
  id, user_id, workshop_content_item_id, window_type, intent_text,
  daily_phrase, small_step, status, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999093', '88888888-8888-8888-8888-888888888001',
    '11111111-1111-1111-1111-111111111003', '3_weeks',
    'Uc hafta boyunca tetiklenme anlarini daha erken fark etmeyi hedefliyorum.',
    'Erken fark et, kucuk adim sec, yardim iste.',
    'Her pazar workbook notlarini 10 dakika gozden gecir.', 'completed',
    '2026-03-20 12:40:00+00', '2026-04-11 12:33:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999094', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111003', '72h',
    'Ilk 72 saatte bedensel alarmi anlamaya calisacaktim.',
    'Yavasla, isimlendir, yardim iste.',
    'Nefes videosunu gunde bir kere ac.', 'archived',
    '2026-03-10 12:40:00+00', '2026-04-11 12:33:30+00'
  )
on conflict do nothing;

insert into coach_assignments (
  id, coach_user_id, client_user_id, status, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999102', '88888888-8888-8888-8888-888888888003',
    '88888888-8888-8888-8888-888888888002', 'paused',
    '2026-04-01 08:00:00+00', '2026-04-11 12:34:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999103', '88888888-8888-8888-8888-888888888003',
    '88888888-8888-8888-8888-888888888006', 'completed',
    '2026-02-01 08:00:00+00', '2026-03-15 12:00:00+00'
  )
on conflict do nothing;

insert into risk_signals (
  id, user_id, risk_level, source_type, detected_at, metadata
) values
  (
    '99999999-9999-9999-9999-999999999122', '88888888-8888-8888-8888-888888888002',
    'low', 'reading_pattern',
    '2026-04-11 12:35:00+00',
    '{"signal":"steady usage with improved completion","recommended_action":"celebrate_progress"}'::jsonb
  ),
  (
    '99999999-9999-9999-9999-999999999123', '88888888-8888-8888-8888-888888888006',
    'high', 'billing_churn_and_distress_language',
    '2026-04-11 12:35:30+00',
    '{"signal":"canceled plan + repeated hopelessness phrasing","recommended_action":"manual_outreach"}'::jsonb
  )
on conflict do nothing;

insert into badge_definitions (
  id, category, name, xp_reward, created_at
) values
  (
    '99999999-9999-9999-9999-999999999233', 'journey', 'Yolculuga Sadakat', 90,
    '2026-04-11 12:36:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999234', 'ebook', 'Gece Okuru', 60,
    '2026-04-11 12:36:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999235', 'social', 'Sohbeti Tasiyan', 75,
    '2026-04-11 12:36:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999236', 'general', 'Yeniden Baslama Cesareti', 40,
    '2026-04-11 12:36:00+00'
  )
on conflict do nothing;

insert into user_badges (
  id, user_id, badge_definition_id, awarded_at
) values
  (
    '99999999-9999-9999-9999-999999999243', '88888888-8888-8888-8888-888888888001',
    '99999999-9999-9999-9999-999999999233', '2026-04-11 12:36:30+00'
  ),
  (
    '99999999-9999-9999-9999-999999999244', '88888888-8888-8888-8888-888888888002',
    '99999999-9999-9999-9999-999999999234', '2026-04-11 12:36:45+00'
  ),
  (
    '99999999-9999-9999-9999-999999999245', '88888888-8888-8888-8888-888888888001',
    '99999999-9999-9999-9999-999999999235', '2026-04-11 12:37:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999246', '88888888-8888-8888-8888-888888888005',
    '99999999-9999-9999-9999-999999999236', '2026-04-11 12:37:15+00'
  )
on conflict do nothing;

insert into embedding_documents (
  id, content_item_id, content_version_id, status, vector_backend, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999303', '11111111-1111-1111-1111-111111111101',
    '22222222-2222-2222-2222-222222222101', 'failed', 'pgvector',
    '2026-04-11 12:38:00+00', '2026-04-11 12:38:30+00'
  ),
  (
    '99999999-9999-9999-9999-999999999304', '11111111-1111-1111-1111-111111111102',
    '22222222-2222-2222-2222-222222222102', 'pending', 'pgvector',
    '2026-04-11 12:39:00+00', '2026-04-11 12:39:00+00'
  )
on conflict do nothing;

insert into videos (
  content_item_id, duration_seconds, difficulty, stream_uri, created_at
) values
  (
    '11111111-1111-1111-1111-111111111101', 360, 'beginner',
    'https://cdn.pst.example/video/temel-nefes-pratigi/master.m3u8', '2026-04-11 12:40:00+00'
  ),
  (
    '11111111-1111-1111-1111-111111111103', 2100, 'advanced',
    'https://cdn.pst.example/video/kriz-ani-koc-laboratuvari/master.m3u8', '2026-04-11 12:40:00+00'
  )
on conflict do nothing;

insert into video_caption_tracks (
  id, video_content_item_id, language_code, file_uri, created_at
) values
  (
    '99999999-9999-9999-9999-999999999342', '11111111-1111-1111-1111-111111111101',
    'tr', 'https://cdn.pst.example/video/temel-nefes-pratigi/tr.vtt', '2026-04-11 12:40:30+00'
  ),
  (
    '99999999-9999-9999-9999-999999999343', '11111111-1111-1111-1111-111111111103',
    'tr', 'https://cdn.pst.example/video/kriz-ani-koc-laboratuvari/tr.vtt', '2026-04-11 12:40:30+00'
  )
on conflict do nothing;

insert into video_transcript_segments (
  id, video_content_item_id, start_second, end_second, transcript_text, created_at
) values
  (
    '99999999-9999-9999-9999-999999999353', '11111111-1111-1111-1111-111111111101',
    0, 30, 'Nefesi dort sayida al, dort sayida tut ve alti sayida ver.',
    '2026-04-11 12:41:00+00'
  ),
  (
    '99999999-9999-9999-9999-999999999354', '11111111-1111-1111-1111-111111111103',
    0, 60, 'Kriz ani rol oyununda once yansitici dinleme sonra sinirlama cizgisi kurulur.',
    '2026-04-11 12:41:00+00'
  )
on conflict do nothing;

insert into video_downloads (
  id, user_id, video_content_item_id, local_path, download_status, created_at, updated_at
) values
  (
    '99999999-9999-9999-9999-999999999372', '88888888-8888-8888-8888-888888888002',
    '11111111-1111-1111-1111-111111111101',
    null,
    'queued', '2026-04-11 12:41:30+00', '2026-04-11 12:41:30+00'
  ),
  (
    '99999999-9999-9999-9999-999999999373', '88888888-8888-8888-8888-888888888006',
    '11111111-1111-1111-1111-111111111103',
    '/data/user/0/pst/cache/video/coach-lab.partial',
    'failed', '2026-03-05 08:05:00+00', '2026-04-11 12:41:45+00'
  )
on conflict do nothing;

commit;
