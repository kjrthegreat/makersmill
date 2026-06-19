-- Makers Mill D1 seed — mirrors the original hardcoded data.
-- Idempotent: clears both tables then re-inserts.
-- Apply locally:  npx wrangler d1 execute makersmill --local  --file=db/seed.sql
-- Apply remote:   npx wrangler d1 execute makersmill --remote --file=db/seed.sql

DELETE FROM events;
DELETE FROM stage_shows;

-- ── Events ───────────────────────────────────────────────────────────────────
INSERT INTO events (title, type, time, tag, accent, date, weekday, cta_label, cta_url, sort_order) VALUES
  ('Saturday Live Sessions',  'Live Music', '8:00 PM',  'Weekly',   'orange', NULL,         6,    'Get Tickets', 'TICKETS', 1),
  ('Trivia Night',            'Game Night', '7:00 PM',  'Free',     'gold',   NULL,         3,    NULL,          NULL,      2),
  ('Open Mic',                'Live Music', '7:30 PM',  'Free',     'orange', NULL,         2,    NULL,          NULL,      3),
  ('The Ridgeline Band',      'Live Music', '8:30 PM',  'Ticketed', 'orange', '2026-06-27', NULL, 'Get Tickets', 'TICKETS', 4),
  ('Makers Market',           'Market',     '11:00 AM', 'All Ages', 'gold',   '2026-07-04', NULL, NULL,          NULL,      5),
  ('Summer Songwriter Night', 'Live Music', '8:00 PM',  'Ticketed', 'orange', '2026-07-11', NULL, 'Get Tickets', 'TICKETS', 6),
  ('Vinyl & Vintage Pop-Up',  'Pop-Up',     '12:00 PM', 'Free',     'rust',   '2026-07-18', NULL, NULL,          NULL,      7);

-- ── Stage shows ──────────────────────────────────────────────────────────────
INSERT INTO stage_shows (month, day, accent, type, name, detail, time, tag, cta_label, cta_url, sort_order) VALUES
  ('Every', 'Sat', 'orange', 'Weekly · Live Set', 'Saturday Live Set',        'Area musicians take the stage every Saturday. Doors get busy — come early.',     '7:00 PM',                  'All Ages',    'Tickets',       'TICKETS', 1),
  ('Jun',   '14',  'rust',   'Touring Act',       'Touring Artist Showcase',  'A regional/touring performer on The Stage. Lineup confirmed closer to the date.', '8:00 PM',                  'Ticketed',    'Tickets',       'TICKETS', 2),
  ('Jun',   '27',  'gold',   'Open Stage',        'Open Mic Night',           'Singers, poets, comedians. 5-minute sets. Sign up at the door.',                 'Sign-ups 6PM · Start 7PM', 'Open to All', 'Event Details', '#',       3),
  ('Jul',   '19',  'warm',   'Songwriter Round',  'Singer-Songwriter Night',  'A quieter night for original songs and storytelling. Listening-room vibe.',      '7:30 PM',                  'Ticketed',    'Tickets',       'TICKETS', 4);
