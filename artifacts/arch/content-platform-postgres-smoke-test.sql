-- PST Content Platform Postgres Smoke Test
--
-- Run this after:
-- - artifacts/arch/content-platform-postgres-ddl.sql
-- - artifacts/arch/content-platform-postgres-seed.sql
--
-- Purpose:
-- - Verify the 6 discovery-facing content types exist at the expected seed counts
-- - Catch drift between discovery metadata on content_items and subtype tables

set search_path to pst, public;

-- ---------------------------------------------------------------------------
-- Check 1: discovery catalog counts from content_items metadata
-- ---------------------------------------------------------------------------

with expected as (
  select *
  from (
    values
      ('journey', 20),
      ('workshop', 10),
      ('module', 15),
      ('ebook', 5),
      ('spiritual_lesson', 25),
      ('emotion', 30)
  ) as v(discovery_type, expected_count)
),
actual as (
  select
    metadata ->> 'discovery_type' as discovery_type,
    count(*)::integer as actual_count
  from content_items
  where metadata ? 'discovery_type'
  group by 1
)
select
  'content_items.discovery_type' as check_group,
  e.discovery_type as check_name,
  e.expected_count,
  coalesce(a.actual_count, 0) as actual_count,
  case
    when coalesce(a.actual_count, 0) = e.expected_count then 'PASS'
    else 'FAIL'
  end as status
from expected e
left join actual a using (discovery_type)
order by e.discovery_type;

-- ---------------------------------------------------------------------------
-- Check 2: subtype table counts
-- ---------------------------------------------------------------------------

with counts as (
  select 'journey'::text as content_type, count(*)::integer as actual_count from journeys
  union all
  select 'workshop', count(*)::integer from workshops
  union all
  select 'module', count(*)::integer from modules
  union all
  select 'ebook', count(*)::integer from ebooks
  union all
  select 'spiritual_lesson', count(*)::integer from spiritual_lessons
  union all
  select 'emotion', count(*)::integer from emotion_entries
),
expected as (
  select *
  from (
    values
      ('journey', 20),
      ('workshop', 10),
      ('module', 15),
      ('ebook', 5),
      ('spiritual_lesson', 25),
      ('emotion', 30)
  ) as v(content_type, expected_count)
)
select
  'subtype_tables' as check_group,
  e.content_type as check_name,
  e.expected_count,
  coalesce(c.actual_count, 0) as actual_count,
  case
    when coalesce(c.actual_count, 0) = e.expected_count then 'PASS'
    else 'FAIL'
  end as status
from expected e
left join counts c using (content_type)
order by e.content_type;

-- ---------------------------------------------------------------------------
-- Check 3: content_items to subtype table alignment
-- ---------------------------------------------------------------------------

with paired_counts as (
  select 'journey'::text as content_type,
         (select count(*)::integer from content_items where kind = 'journey') as content_item_count,
         (select count(*)::integer from journeys) as subtype_count
  union all
  select 'workshop',
         (select count(*)::integer from content_items where kind = 'workshop'),
         (select count(*)::integer from workshops)
  union all
  select 'module',
         (select count(*)::integer from content_items where kind = 'module'),
         (select count(*)::integer from modules)
  union all
  select 'ebook',
         (select count(*)::integer from content_items where kind = 'ebook'),
         (select count(*)::integer from ebooks)
  union all
  select 'spiritual_lesson',
         (select count(*)::integer from content_items where kind = 'spiritual_lesson'),
         (select count(*)::integer from spiritual_lessons)
  union all
  select 'emotion',
         (select count(*)::integer from content_items where kind = 'emotion_entry'),
         (select count(*)::integer from emotion_entries)
)
select
  'content_to_subtype_alignment' as check_group,
  content_type as check_name,
  content_item_count as expected_count,
  subtype_count as actual_count,
  case
    when content_item_count = subtype_count then 'PASS'
    else 'FAIL'
  end as status
from paired_counts
order by content_type;
