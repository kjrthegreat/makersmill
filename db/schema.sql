-- Makers Mill D1 schema
-- Apply locally:  npx wrangler d1 execute makersmill --local  --file=db/schema.sql
-- Apply remote:   npx wrangler d1 execute makersmill --remote --file=db/schema.sql

-- ── Events (homepage calendar) ───────────────────────────────────────────────
-- One-off event  → set `date` ('YYYY-MM-DD'), leave `weekday` NULL
-- Weekly regular → set `weekday` (0=Sun … 6=Sat), leave `date` NULL
-- cta_url sentinel 'TICKETS' resolves to the site TICKETS_URL constant in the app.
-- NULL cta_url/cta_label → app shows "Details →" linking to the Experiences section.
CREATE TABLE IF NOT EXISTS events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  title      TEXT    NOT NULL,
  type       TEXT    NOT NULL,
  time       TEXT,
  tag        TEXT,
  accent     TEXT    NOT NULL DEFAULT 'orange',  -- orange | rust | gold
  date       TEXT,                               -- 'YYYY-MM-DD' for one-offs
  weekday    INTEGER,                            -- 0-6 for weekly recurring
  cta_label  TEXT,
  cta_url    TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ── Stage shows (the /stage page list) ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS stage_shows (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  month      TEXT    NOT NULL,                   -- 'Every', 'Jun', 'Jul' …
  day        TEXT    NOT NULL,                   -- 'Sat', '14', '27' …
  accent     TEXT    NOT NULL DEFAULT 'orange',  -- orange | rust | gold | warm
  type       TEXT    NOT NULL,
  name       TEXT    NOT NULL,
  detail     TEXT    NOT NULL,
  time       TEXT    NOT NULL,
  tag        TEXT    NOT NULL,
  cta_label  TEXT    NOT NULL,
  cta_url    TEXT,                               -- 'TICKETS' sentinel, a URL, or NULL ('#')
  sort_order INTEGER NOT NULL DEFAULT 0
);
