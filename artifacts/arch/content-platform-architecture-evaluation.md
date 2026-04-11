# PST Content Platform Architecture Evaluation

## Purpose

This document converts the user brief into a decision-ready super question, ranks 5 high-level architecture options, and proposes a database design for the PST Coaching mobile app.

It is grounded in:
- `artifacts/prd/PST_Mobile_PRD_Rev4.md`
- `artifacts/normalized/requirements.md`
- `artifacts/arch/architecture.md`
- `artifacts/arch/adrs/ADR-0001-foundation.md`
- `artifacts/arch/adrs/ADR-0002-offline.md`
- `artifacts/domain/domain_model.json`
- `artifacts/domain/state_machines.json`
- `artifacts/ux/screen_inventory.json`
- `artifacts/ux/screen_contracts/home.dashboard.json`
- `artifacts/ux/screen_contracts/discover.catalog.json`
- `artifacts/ux/screen_contracts/library.overview.json`
- `artifacts/prd/HadithAnalysis.docx`

## Problem Restatement

The mobile app must be built around 5 primary content source domains:

1. `e-Books`
   - About 20+ books
   - Each book has 200+ pages
   - Full in-app reading is required
2. `Kesifler Yolculugu`
   - 400+ spiritual lessons
   - Each lesson has 10+ pages
3. `Duygular Evreni`
   - 200+ emotions
   - Each emotion has 10+ pages
4. `Atolyeler`
   - Each workshop has 100+ pages
   - Users must access workshop materials inside the app
5. `Hadis Analizleri`
   - Long-form hadith analysis material exists in `.docx` form
   - Users must access hadith analysis material inside the app

The PRD adds important constraints:
- Offline-first reading and cached detail access are required.
- The home screen must explain and route users into the major content areas.
- Workshop content is structurally different from plain reading and must preserve stage -> session -> content block -> artifact behavior.
- The app must support subscriptions, seats, reminders, notes, highlights, favorites, progress, coach workflows, reading groups, book clubs, AI/RAG, notifications, gamification, and video.
- AI responses must use only approved PST sources with citations.

## Super Question

Design the end-to-end product and technical architecture for the PST Coaching mobile app where the platform must treat 5 long-form content domains as first-class source systems: `e-Books` (20+ books, 200+ pages each), `Kesifler Yolculugu` (400+ spiritual lessons, 10+ pages each), `Duygular Evreni` (200+ emotion entries, 10+ pages each), `Atolyeler` (100+ page workshop materials with structured stage/session/artifact behavior), and `Hadis Analizleri` (long-form hadith analysis documents such as `HadithAnalysis.docx`). Recommend and rank 5 high-level architecture options for mobile, backend, content management, offline delivery, search, and future AI/RAG support. Then propose the target information architecture, home screen structure, and a database design that supports all current and future PRD epics including authentication, subscriptions, seats, progress, reading, notes, favorites, collections, reminders, accessibility, modules, coach workflows, group reading, book clubs, gamification, AI citation tracing, notifications, and video. The recommended architecture must explain content ingestion from source documents, structured storage of long-form content, offline sync strategy, role and entitlement enforcement, analytics boundaries, and how the system remains scalable without losing editorial control.

## Evaluation Criteria

The options below are ranked against these criteria:
- `Content fit`: Can it represent all 5 content domains cleanly?
- `Offline fit`: Can it support large local reading caches and queued writes?
- `Editorial fit`: Can the team ingest and manage long-form source materials easily?
- `RAG fit`: Can it support chunking, citation tracing, and source-bound AI?
- `Product fit`: Can it support all 18 epics without major rework?
- `Delivery speed`: Can it be built without unnecessary complexity?
- `Operational complexity`: Is the ongoing maintenance reasonable?

## Source Document Type Strategy

Recommended `source_document_type` ranking for this product and future AI/RAG use:

| Rank | Type | Primary Use | RAG Fit | Recommendation |
| --- | --- | --- | --- | --- |
| 1 | `rich_text_json` | Rich editor-authored content with headings, callouts, lists, citations, embeds | Very strong after normalization | Use as the default source document type for new editor-created content |
| 2 | `markdown` | Editorial authoring, long-form lesson/book content | Excellent | Keep as a strong authoring format because it is simple, diff-friendly, and chunks cleanly |
| 3 | `html` | Imported web/native rich documents | Strong after cleanup | Keep for interoperable publishing and migration cases |
| 4 | `plain_text` | Transcript fallback, normalization output, rescue extraction | Excellent | Add for deterministic retrieval pipelines and audit/debug workflows |
| 5 | `docx` | Legacy editorial intake and manual manuscript imports | Good after conversion | Keep because current source material already exists in this format |
| 6 | `epub` | Ebook ingestion and packaging source | Moderate | Keep because it is important for long-form ebook distribution |
| 7 | `audio_transcript` | Human-reviewed transcript documents | Strong | Keep for audio/video AI retrieval inputs |

The source format list is intentionally narrow so ingestion stays predictable and editorial tooling stays simple.

Recommended default behavior:
- `database default`: `rich_text_json`
- `editor-created content default`: `rich_text_json`
- `retrieval/chunking preference`: normalized plain text derived from `rich_text_json` or `markdown`

## RAG Normalization Strategy

All supported source document types should pass through a normalization pipeline before publishing and before entering retrieval.

Recommended ingestion path:

1. `Preserve original source`
   - store the original source document and checksum in `source_document`
2. `Normalize into canonical blocks`
   - convert the source into stable block/section nodes with semantic roles such as heading, paragraph, quote, worksheet prompt, citation, page locator, and timestamp locator
3. `Extract clean retrieval text`
   - generate chunkable plain text from the normalized blocks
   - strip layout noise, decorative markup, and editor-specific wrappers
4. `Attach trace metadata`
   - preserve source document id, version id, block id, page or timestamp locator, and citation metadata for every chunk
5. `Publish structured payload`
   - store the normalized output as the published content payload referenced by `content_version.structured_payload_ref`
6. `Embed only approved text`
   - embeddings and retrieval chunks must come from the normalized published representation, not directly from raw `docx`, `epub`, or editor JSON

Practical rules:
- default new source documents to `rich_text_json`
- store editor-authored rich text in `source_document.payload_json` as Postgres `jsonb`
- treat `content_version.structured_payload_ref` as the canonical reader and RAG delivery pointer
- prefer normalized plain text for chunk generation
- use `rich_text_json` for editing, not as the retrieval format itself
- keep raw `docx` and `epub` as intake formats, not primary AI retrieval sources

## Rich Text Storage Options

Question being answered:
- should a rich editor source such as `s3://pst/editorial/modules/steadiness-rich-text.json` stay in S3, move into Postgres `jsonb`, or use both?
- keep in mind the app must render content in the reader screen

Short answer:
- yes, it can make sense to store `rich_text_json` in Postgres `jsonb`
- no, the reader screen should usually not read the raw editor document directly
- the best design is to separate:
  - `editor source`
  - `published reader payload`
  - `offline/mobile delivery`

Adopted option for this project:
- keep source `rich_text_json` in Postgres `jsonb`
- publish a normalized reader payload to `S3/CDN`
- point to it from `content_version.structured_payload_ref`
- render the reader from the published payload
- use the published normalized payload for RAG and chunking

Recommended ranking for this project:

| Rank | Option | Source Storage | Reader Storage | Why It Ranks Here |
| --- | --- | --- | --- | --- |
| 1 | `Hybrid recommended` | `rich_text_json` source in Postgres `jsonb` | normalized published payload in `S3/CDN`, with Postgres metadata/version pointers | Best balance of editor UX, versioning, reader performance, offline packaging, and RAG traceability |
| 2 | `DB-first published blocks` | source in Postgres `jsonb` | normalized reader blocks/sections in Postgres tables | Excellent if the API wants chunk-level DB queries; more modeling effort than option 1 |
| 3 | `CMS source + published object payload` | source in CMS or Postgres document store | normalized published payload in `S3/CDN` | Strong for editorial teams using a CMS, but adds platform moving parts |
| 4 | `All in Postgres with cache` | source in Postgres `jsonb` | published payload also in Postgres `jsonb`, fronted by cache/CDN | Acceptable for moderate scale, but less ideal for large immutable reader packages |
| 5 | `S3 source + DB published blocks` | raw source in S3 | normalized reader blocks in Postgres | Fine when editor tooling already writes files to object storage, but weak for in-DB editing/version diffs |
| 6 | `S3 source + S3 published payload` | source in S3 | published payload in S3, Postgres only keeps metadata | Cheap and simple, but weaker for queryability, content introspection, and chunk-level governance |
| 7 | `Relational blocks only` | no stored rich source, only normalized rows | normalized rows in Postgres | Good for reader and RAG queries, bad for preserving editor fidelity and round-tripping authored content |
| 8 | `Single large JSONB document only` | source in one Postgres `jsonb` blob | same blob used for reader delivery | Easy to start, but poor for partial updates, citations, transforms, and reader-specific optimization |
| 9 | `DynamoDB documents + S3` | source in document store | published payload in S3 or DynamoDB | Harder to manage joins, editorial traceability, and chunk-level citations than Postgres |
| 10 | `Search index as source of truth` | source in OpenSearch/vector store | reader derived from search index | Not recommended; search and embeddings should never be the canonical editorial store |

### Recommendation

Choose `Option 1`.

For this project, the cleanest separation is:

1. `Source document`
   - keep editor-authored `rich_text_json` in Postgres `jsonb` when the document is actively edited and versioned
   - keep `original_uri` if there is also a file snapshot/export in S3
2. `Published reader payload`
   - publish an immutable reader-friendly JSON payload to `S3/CDN`
   - store its pointer in `content_version.structured_payload_ref`
3. `Reader screen`
   - read the published normalized payload, not the raw editor JSON
4. `Offline mobile`
   - cache the published reader payload or a device-optimized derivative in SQLite/file storage
5. `RAG`
   - chunk and cite from the normalized published payload, not from the raw editor document

### Why raw editor JSON should not be the reader payload

The reader screen usually needs:
- stable blocks and sections
- pagination/locator support
- highlights and notes anchors
- offline-friendly deterministic payloads
- a sanitized shape without editor-only marks, history, comments, or transient UI metadata

Raw editor JSON is often too editor-specific for that.

### Practical rule of thumb

- `rich_text_json` in Postgres `jsonb`: good for authoring and versioning
- `structured_payload_ref` to `S3/CDN`: good for published reader delivery
- `SQLite/file cache on device`: good for offline reading

## Ranked Architecture Options

| Rank | Option | Summary | Why It Ranks Here |
| --- | --- | --- | --- |
| 1 | Hybrid content platform: `Headless CMS + Postgres + S3 + GraphQL BFF/AppSync + mobile SQLite cache + vector index` | Editorial source of truth in CMS, operational source of truth in relational DB, blob assets in object storage, offline sync to mobile | Best balance of structured content, editorial workflow, offline delivery, future AI/RAG, and support for all epics |
| 2 | Modular monolith: `Admin/CMS app + Postgres JSONB + S3 + pgvector/OpenSearch + mobile SQLite cache` | One backend codebase handles content, users, progress, and ingestion | Simplest serious option if the content/editorial team is small and wants fewer moving parts |
| 3 | AWS serverless: `AppSync + Lambda + DynamoDB + S3 + OpenSearch/Bedrock + mobile SQLite cache` | AWS-first architecture with offline-friendly GraphQL sync patterns | Scales well and aligns partly with current repo direction, but complex content modeling and reporting are harder than with a relational core |
| 4 | CMS-first SaaS: `Contentful/Sanity/Strapi + thin operational backend + mobile SQLite cache` | Fastest path for authoring and publishing content | Good for content entry, but weaker for subscriptions, group features, analytics, progress logic, and AI citation control |
| 5 | Microservices + event bus + polyglot persistence | Separate services for content, progress, AI, billing, notifications, social, video | Too much complexity for current scope; should only come later if the platform grows dramatically |

## Architecture Details

### 1. Recommended: Hybrid Content Platform

**Shape**
- `Content source of truth`: Headless CMS for editorial records and publishing workflow
- `Operational source of truth`: Postgres for users, subscriptions, entitlements, progress, reminders, groups, AI trace records
- `Asset storage`: S3 or equivalent object storage for ebook packages, workshop files, audio, video, exports
- `API layer`: GraphQL BFF or AppSync over the operational domain and published content views
- `Mobile local store`: SQLite for offline catalogs, details, downloaded content, progress cache, and sync outbox
- `Search/RAG`: vector index plus keyword search for citations and retrieval

**Why it fits best**
- Handles long-form content and structured workshop content without flattening everything into a single generic document.
- Separates `editorial publishing` from `runtime entitlements/progress`, which becomes critical as EPIC-3, EPIC-12, EPIC-13, EPIC-14, EPIC-16, EPIC-17, and EPIC-18 arrive.
- Supports document ingestion from `.docx` while still publishing normalized, mobile-friendly content blocks.
- Best fit for citation-based RAG because every chunk can be traced back to a published content node and source asset version.

**Trade-offs**
- More moving parts than a pure monolith.
- Requires a clear publishing pipeline and content governance.

### 2. Modular Monolith with Relational Core

**Shape**
- One backend application for admin, content, subscriptions, progress, reminders, and AI trace records
- Postgres as the main database with JSONB for flexible content sections
- S3 for large assets
- SQLite on device for offline cache

**Why it is strong**
- Lowest complexity among the options that can still support all epics.
- Very good for hierarchical content, reporting, and admin features.
- Easier than DynamoDB for cross-domain queries like coach metrics, club activity, reminders, and AI citation tracing.

**Why it is not rank 1**
- Editorial workflow is weaker unless the team also builds or adopts a strong authoring UI.
- Content ops can become harder as the source library grows.

### 3. AWS Serverless AppSync Stack

**Shape**
- Cognito for auth
- AppSync for GraphQL
- Lambda for orchestration and ingestion
- DynamoDB for operational entities
- S3 for assets
- OpenSearch or vector service for search/RAG
- SQLite on device for offline cache

**Why it is viable**
- Good for mobile synchronization and scale.
- Fits the current repo's AWS/AppSync direction.
- Works well for event-driven notifications and background workflows.

**Why it ranks below the relational options**
- Workshop and long-form content hierarchies are more cumbersome in DynamoDB.
- Future reporting for coach, group, club, and gamification flows becomes harder.
- Citation-level RAG traceability often ends up needing additional indexing layers anyway.

### 4. CMS-First SaaS with Thin Backend

**Shape**
- SaaS CMS manages all content and publishing
- Small custom backend handles auth, subscriptions, progress, and reminders
- Mobile app consumes CMS content APIs and backend APIs

**Why it can help**
- Fastest editorial onboarding.
- Good if the team mostly needs to import and publish source content quickly.

**Why it is weaker**
- Harder to keep AI citations, entitlements, offline bundles, and operational metrics tightly controlled.
- Social, coach, and gamification features usually force a larger custom backend later.

### 5. Microservices with Event Bus

**Shape**
- Separate content, billing, progress, AI, notification, social, and video services
- Event bus for sync and projections
- Polyglot databases per domain

**Why it is last**
- Over-architected for current scale.
- Slows delivery and increases failure modes.
- Only makes sense after clear product-market scale and team specialization.

## Recommendation

Choose `Option 1: Hybrid content platform`.

This is the best fit because the real complexity is not just mobile UI. It is the combination of:
- long-form source ingestion
- multiple content domain shapes
- offline reading at scale
- structured workshop logic
- subscriptions and seat management
- future coach and social features
- citation-bound AI responses

If the team needs the fastest practical version with the smallest platform team, choose `Option 2` as the fallback.

## Content Access Model

The product model should separate:

1. `Source truth libraries`
   - the 5 authoritative content domains the organization maintains
2. `User-facing content types`
   - the 4 Discovery entry points users browse inside the app

### Source Truth Libraries

- `e-Books`
- `Kesifler Yolculugu`
- `Duygular Evreni`
- `Atolyeler`
- `Hadis Analizleri`

### User-Facing Discovery Content Types

- `Journeys / Yolculuklar`
- `Workshops / Atolyeler`
- `Modules / Moduller`
- `e-Books / e-Kitaplar`

### Containment Rules

- `Journey` can contain `Module`, `Workshop`, and `Ebook`
- `Workshop` contains only `Workshop`
- `Module` contains source content from `Kesifler Yolculugu` or `Duygular Evreni`
- `Ebook` contains only `Ebook`

### Current Hadith Access Assumption

Because the current Discovery model has 4 content types and does not define a standalone `Hadis Analizleri` tab, the recommended assumption is:

- `Hadith Analizleri` remains a source truth library
- hadith analysis items are linked into `Journeys`, `Modules`, and `Workshops` as supporting/reference content through `content_relation`
- if the product later wants direct browsing of hadith analyses, add a fifth Discovery content type or a dedicated sub-catalog under one of the existing types

## Target Information Architecture

The app should preserve the PRD tab structure while distinguishing between:
- `what users browse`: 4 Discovery content types
- `what the platform is built from`: 5 source truth libraries

### Home Screen

The home screen should include:
- `Continue learning`: current item, last position, countdown or next action
- `4 primary entry cards`: `Journeys`, `Workshops`, `Modules`, `e-Books`
- `Source truth explainer`: a short section that explains the app is powered by `e-Books`, `Kesifler Yolculugu`, `Duygular Evreni`, `Atolyeler`, and `Hadis Analizleri`
- `My active content`: up to 3 active items from any type
- `Recent activity`: recent lesson/book/emotion/workshop/hadith analysis access
- `Progress summary`: type-based totals across ebook, lesson, emotion, workshop, hadith
- `Reminder state`: daily reminder and workshop follow-up reminder

### Discover / Catalog

Catalog should be organized first by `user-facing content type`, then by contained items and filters.

Recommended content type mapping:
- `Journeys` -> catalogs curated programs that contain `Module`, `Workshop`, and `Ebook`
- `Workshops` -> catalogs standalone `Workshop`
- `Modules` -> catalogs standalone `Module`
- `e-Books` -> catalogs standalone `Ebook`

Recommended source truth mapping:
- `e-Books` feeds `Ebook` and can also be included in `Journey`
- `Kesifler Yolculugu` feeds `Module`, and modules can also be included in `Journey`
- `Duygular Evreni` feeds `Module`, and modules can also be included in `Journey`
- `Atolyeler` feeds `Workshop`, and workshops can also be included in `Journey`
- `Hadis Analizleri` feeds linked/supportive content attached to journeys, modules, and workshops unless a separate Discovery type is added later

## Canonical Content Model

A good architecture should not force all 5 source libraries and 4 product content types into one flat shape.

The correct model is:
- `source content entities`: the authoritative knowledge/content libraries
- `delivery content entities`: the user-facing containers exposed in Discovery
- `composition entities`: the tables that define what a journey or module contains

### Shared Core

Use a universal content registry:
- `content_item`
- `content_version`
- `content_asset`
- `content_relation`
- `content_tag`
- `content_authority_source`

Every content item has:
- stable id
- domain type
- title and summary
- status and visibility
- locale
- source document linkage
- published version
- access policy
- analytics key
- search index metadata

### Delivery Content Shapes

- `journey` -> curated delivery object containing `module`, `workshop`, and `ebook`
- `workshop` -> standalone delivery object wrapping one workshop program
- `module` -> standalone delivery object composed from `spiritual_lesson` or `emotion_entry` source content
- `ebook` -> standalone delivery object wrapping one ebook

### Source Content Shapes

- `ebook` -> book, chapter, page range, downloadable package, audio linkage
- `spiritual_lesson` -> lesson collection, lesson, section, reflection prompts
- `emotion_entry` -> emotion, subtopics, coping guidance, related lessons/books/hadiths
- `workshop` -> workshop, stage, session, content block, artifact, workbook entry, follow-up plan
- `hadith_analysis` -> hadith, source citation, transcript/analysis blocks, tags, cross-links to emotions, lessons, workshops, books

### Composition Shapes

- `journey_item` -> ordered references from `journey` to `module`, `workshop`, or `ebook`
- `package` -> ordered references from `module` to its underlying source content
- `content_relation` -> lateral cross-links such as `hadith_analysis -> workshop` or `hadith_analysis -> module`

## Proposed Database Design

A single database is not enough for the whole system. The correct design is a `three-layer data model`:

1. `Editorial and source layer`
   - stores imported source documents, publishing versions, and structured content output
2. `Operational application layer`
   - stores users, subscriptions, progress, notes, groups, reminders, AI traceability, notifications, gamification
3. `Device offline layer`
   - stores local cache, downloads, reading state, and sync queue

### A. Server Database: Editorial and Operational Core

Recommended primary server database: `Postgres`

Use object storage for binaries and large payloads:
- original `.docx`
- epub/pdf packages
- audio
- video
- generated exports

Use a search/vector index for retrieval:
- keyword search
- semantic retrieval
- citation trace records

### B. Core Tables for Content Source and Publishing

#### `source_document`
Tracks original editorial files and in-database rich text authoring payloads.

Key columns:
- `id`
- `source_type` (`docx`, `markdown`, `rich_text_json`, `plain_text`, `html`, `epub`, `audio_transcript`)
- `domain_type` (any `content_item_kind`, commonly `journey`, `module`, `workshop`, `ebook`, `spiritual_lesson_collection`, `spiritual_lesson`, `emotion_library`, `emotion_entry`, `hadith_analysis`, `video`)
- `title`
- `original_uri` (optional for imported files or editorial exports)
- `payload_json` (`jsonb`, used when the source of truth is editor-authored `rich_text_json` stored in Postgres)
- `checksum`
- `language_code`
- `import_status`
- `imported_at`
- `imported_by`

Recommended default:
- `source_type default`: `rich_text_json`

Adopted delivery rule:
- authoring lives in `source_document.payload_json` when the source is `rich_text_json`
- reader delivery and RAG retrieval use the normalized payload referenced by `content_version.structured_payload_ref`

#### `content_item`
Universal registry for all published content.

Key columns:
- `id`
- `domain_type`
- `subtype`
- `slug`
- `title`
- `subtitle`
- `summary`
- `cover_asset_id`
- `status` (`draft`, `review`, `published`, `archived`)
- `visibility` (`free`, `subscription`, `addon`, `role_restricted`)
- `locale`
- `current_version_id`
- `estimated_minutes`
- `analytics_key`
- `created_at`
- `updated_at`

#### `content_version`
Published versions for traceability.

Key columns:
- `id`
- `content_item_id`
- `version_no`
- `source_document_id`
- `structured_payload_ref`
- `published_at`
- `published_by`
- `change_summary`

#### `content_relation`
Cross-links between content domains.

Examples:
- lesson -> emotion
- hadith analysis -> workshop
- workshop -> ebook
- journey -> ebook
- ebook -> book club

Key columns:
- `id`
- `from_content_id`
- `relation_type`
- `to_content_id`
- `sort_order`

#### `content_asset`
Assets tied to a content item or version.

Key columns:
- `id`
- `content_item_id`
- `content_version_id`
- `asset_type` (`cover`, `ebook_package`, `audio`, `video`, `worksheet_pdf`, `image`)
- `storage_uri`
- `mime_type`
- `byte_size`
- `checksum`
- `download_policy`

#### `content_tag`
Shared taxonomy.

Key columns:
- `id`
- `tag_type` (`topic`, `emotion`, `audience`, `difficulty`, `theme`, `language`)
- `label`
- `slug`

#### `content_item_tag`
Join table for tagging.

### C. Delivery and Composition Tables

These tables represent the 4 user-facing Discovery content types and how they compose the underlying source truth libraries.

#### `journey`
Extends the current `Journey` entity as a delivery container.

Key columns:
- `content_item_id`
- `duration_days`
- `level`

#### `journey_item`
Ordered composition table for `Journey`.

Rules:
- a journey item may point only to `module`, `workshop`, or `ebook`

Key columns:
- `id`
- `journey_content_item_id`
- `child_content_item_id`
- `child_type` (`module`, `workshop`, `ebook`)
- `order_index`
- `is_required`

#### `module`
Extends the current `Module` entity as a delivery container.

Key columns:
- `content_item_id`
- `description`

#### `package`
Extends the current `Package` entity as the ordered composition unit inside a module.

Rules:
- a package should point to source content from `spiritual_lesson` or `emotion_entry`

Key columns:
- `id`
- `module_content_item_id`
- `source_content_item_id`
- `source_domain_type` (`spiritual_lesson`, `emotion_entry`)
- `title`
- `order_index`

### D. Source Library Tables

#### 1. `ebook`
Extends current `Ebook` entity.

Key columns:
- `content_item_id`
- `author_name`
- `category`
- `total_pages`
- `toc_depth`
- `has_audio`
- `download_package_asset_id`

#### `ebook_chapter`
- `id`
- `ebook_id`
- `parent_chapter_id`
- `title`
- `order_index`
- `start_locator`
- `end_locator`

#### `ebook_page_map`
Optional if fixed-page rendering is required.
- `id`
- `ebook_id`
- `page_number`
- `locator`
- `chapter_id`

#### 2. `spiritual_lesson_collection`
Represents `Kesifler Yolculugu` as a first-class library.

Key columns:
- `id`
- `content_item_id`
- `lesson_count`
- `audience`
- `difficulty`

#### `spiritual_lesson`
- `id`
- `collection_id`
- `content_item_id`
- `lesson_no`
- `estimated_minutes`
- `has_audio`
- `reflection_prompt_set_id`

#### `lesson_section`
- `id`
- `lesson_id`
- `section_type` (`intro`, `body`, `quote`, `exercise`, `reflection`, `summary`)
- `title`
- `body_rich_text`
- `order_index`

#### 3. `emotion_library`
Represents `Duygular Evreni`.

Key columns:
- `id`
- `content_item_id`
- `emotion_count`

#### `emotion_entry`
- `id`
- `library_id`
- `content_item_id`
- `emotion_name`
- `emotion_group`
- `intensity_level`
- `primary_color_token`

#### `emotion_section`
- `id`
- `emotion_id`
- `section_type` (`definition`, `symptoms`, `reflection`, `practice`, `related_content`)
- `body_rich_text`
- `order_index`

#### 4. `workshop`
Extend the current workshop model instead of replacing it.

Keep and expand the repo entities:
- `Workshop`
- `WorkshopStage`
- `WorkshopSession`
- `WorkshopContentBlock`
- `WorkshopArtifact`
- `WorkbookEntry`
- `WorkshopFollowUpPlan`

Add recommended columns:
- `Workshop`: `content_item_id`, `facilitator_guide_asset_id`, `participant_workbook_asset_id`, `delivery_mode`, `certificate_template_id`
- `WorkshopStage`: `unlock_rule`, `summary_text`, `expected_output_count`
- `WorkshopSession`: `session_goal`, `required_artifact_ids`, `schedule_template`
- `WorkshopContentBlock`: `body_rich_text`, `quote_source`, `callout_style`, `citation_ref`
- `WorkshopArtifact`: `title`, `storage_uri`, `artifact_schema`, `role_scope`

#### 5. `hadith_analysis`
This is missing from the current domain model and should be added explicitly.

The sample `.docx` suggests the need for:
- hadith title
- source citation
- recording date
- duration
- long-form transcript
- structured analytical commentary
- modern psychology mapping
- cross-links to other PST content

Recommended tables:

##### `hadith_analysis`
- `id`
- `content_item_id`
- `hadith_no`
- `headline`
- `canonical_quote`
- `source_reference`
- `recorded_at`
- `duration_seconds`
- `speaker`

##### `hadith_analysis_section`
- `id`
- `hadith_analysis_id`
- `section_type` (`quote`, `translation`, `analysis`, `psychology_bridge`, `application`, `summary`)
- `title`
- `body_rich_text`
- `order_index`

##### `hadith_source_citation`
- `id`
- `hadith_analysis_id`
- `source_name`
- `book_ref`
- `chapter_ref`
- `hadith_ref`

### E. Operational Tables for All EPICs

The current `domain_model.json` already covers some of this, but it does not yet cover all future epics. The database should include the following areas.

#### Identity, account, subscription, entitlement
- `user`
- `user_session`
- `demographic_profile`
- `accessibility_settings`
- `subscription_plan`
- `subscription`
- `addon`
- `seat`
- `entitlement_grant`
- `purchase_receipt`
- `student_discount_verification`

#### Reading, progress, notes, highlights, favorites
Current model has `ContentProgress`, `CommentSubmission`, and `FavoriteItem`, but it should be extended with:
- `content_progress`
- `reading_position`
- `highlight`
- `note`
- `comment_submission`
- `favorite_item`
- `collection`
- `collection_item`
- `download`
- `reading_settings`
- `sync_outbox`
- `dead_letter_sync`

Recommended `reading_position` columns:
- `user_id`
- `content_item_id`
- `locator_type` (`page`, `chapter`, `section`, `timestamp`, `block`)
- `locator_value`
- `progress_percent`
- `last_read_at`

Recommended `highlight` columns:
- `user_id`
- `content_item_id`
- `content_version_id`
- `anchor_locator`
- `selected_text_hash`
- `color`
- `created_at`

Recommended `download` columns:
- `user_id`
- `content_item_id`
- `asset_id`
- `download_status`
- `local_path`
- `byte_size`
- `last_verified_at`

#### Reminders, notifications, follow-ups
Current model has `ReminderSetting`, but Phase 2 needs more detail.

Recommended tables:
- `reminder_setting`
- `reminder_schedule`
- `notification`
- `notification_delivery`
- `notification_preference`
- `quiet_hours`

#### Progress, reporting, growth, coach workflows
Recommended tables:
- `progress_metric_daily`
- `user_streak`
- `weekly_summary`
- `growth_report`
- `coach_assignment`
- `coach_feedback`
- `coach_feedback_draft`
- `risk_signal`

#### Social: reading groups and book clubs
Recommended tables:
- `reading_group`
- `reading_group_member`
- `reading_group_material`
- `reading_group_message`
- `reading_group_schedule`
- `book_club`
- `book_club_member`
- `book_club_topic`
- `book_club_message`
- `book_club_event`
- `content_report`
- `moderation_action`

#### Gamification
Recommended tables:
- `badge_definition`
- `badge_unlock_rule`
- `user_badge`
- `xp_ledger`
- `level_definition`
- `leaderboard_snapshot`
- `streak_history`

#### AI / RAG
This is critical because PRD requires source-bound responses with traceability.

Recommended tables:
- `ai_conversation`
- `ai_message`
- `ai_prompt_template`
- `embedding_document`
- `embedding_chunk`
- `retrieval_trace`
- `ai_response_citation`
- `ai_insight`
- `emotion_analysis_summary`

Recommended `embedding_chunk` columns:
- `id`
- `content_item_id`
- `content_version_id`
- `source_table`
- `source_row_id`
- `chunk_text`
- `chunk_hash`
- `chunk_order`
- `locator_ref`
- `embedding_vector_ref`

Recommended `ai_response_citation` columns:
- `ai_message_id`
- `content_item_id`
- `content_version_id`
- `chunk_id`
- `relevance_score`
- `quoted_excerpt`
- `locator_ref`

#### Video
Recommended tables:
- `video`
- `video_caption_track`
- `video_transcript_segment`
- `video_progress`
- `video_download`

### F. Mobile Local Database Design

Recommended local database: `SQLite`

The local database should not mirror the entire server schema. It should keep a mobile-optimized subset.

Recommended local tables:
- `local_content_item`
- `local_content_version`
- `local_content_section`
- `local_asset`
- `local_download`
- `local_reading_position`
- `local_progress`
- `local_highlight`
- `local_note`
- `local_favorite`
- `local_workbook_entry`
- `local_reminder_setting`
- `sync_outbox`
- `sync_dead_letter`
- `sync_checkpoint`

Why this matters:
- Large long-form content must open without network.
- Write actions must survive offline mode.
- Workshop workbooks and follow-up plans must autosave locally.
- Video and ebook downloads need device-specific paths and verification state.

### G. Content Ingestion Pipeline

For the listed source materials, especially `.docx`, the architecture should include a publishing pipeline:

1. `Import`
   - Upload `.docx`, `.md`, rich-text editor JSON, `.epub`, HTML, plain text, or transcript content
2. `Parse`
   - Extract headings, sections, citations, tables, and metadata
3. `Normalize`
   - Convert to canonical domain structures
4. `Review`
   - Human editorial check
5. `Publish`
   - Create immutable content version
6. `Index`
   - Generate search index and AI chunks
7. `Distribute`
   - Build mobile download package and update catalog manifests

This is especially important for:
- `Hadis Analizleri`, which currently appears to start from long transcript-style documents
- `Atolyeler`, which should not remain as flat text if stage/session/artifact behavior is required

## Gaps Between Current Domain Model and Needed Target Model

Current `artifacts/domain/domain_model.json` already includes:
- `User`
- `Subscription`
- `Seat`
- `Journey`
- `Module`
- `Package`
- `Ebook`
- `Workshop`
- `WorkshopStage`
- `WorkshopSession`
- `WorkshopContentBlock`
- `WorkshopArtifact`
- `WorkbookEntry`
- `WorkshopFollowUpPlan`
- `CommentSubmission`
- `ContentProgress`
- `FavoriteItem`
- `ReminderSetting`

But it is still missing explicit support for:
- `JourneyItem`
- `HadithAnalysis`
- `SpiritualLesson` / `Kesifler Yolculugu`
- `EmotionEntry` / `Duygular Evreni`
- `Package.source_content_item_id`
- `Download`
- `ReadingPosition`
- `Highlight`
- `Note`
- `Collection`
- `EntitlementGrant`
- `PurchaseReceipt`
- `CoachAssignment`
- `CoachFeedback`
- `ReadingGroup`
- `BookClub`
- `Badge / XP / Leaderboard`
- `AIConversation / Citation / RetrievalTrace`
- `Notification`
- `Video`

These gaps should be closed before the app architecture is locked.

## Final Recommendation

If the product is expected to grow across all 18 epics, the best architecture is:
- `Headless CMS for content authoring and publishing`
- `Postgres for operational application data`
- `S3 for content and media assets`
- `GraphQL BFF or AppSync for mobile delivery`
- `SQLite on device for offline-first reading and queued writes`
- `Search + vector index for content discovery and RAG`

This architecture gives the team:
- strong editorial control
- clean modeling for the 5 source domains
- proper support for workshops as structured experiences
- future-safe AI citation tracing
- a practical offline mobile experience
- enough room for coach, social, notifications, gamification, and video features
