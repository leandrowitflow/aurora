-- Calendar events for Coletivo Aurora weekly agenda
CREATE TYPE calendar_category AS ENUM ('meeting', 'dance', 'art', 'garden');

CREATE TABLE calendar_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL,
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 1 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  price_label text NOT NULL DEFAULT '',
  recurrence_note text NOT NULL DEFAULT '',
  category calendar_category NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT calendar_events_end_after_start CHECK (end_time > start_time)
);

CREATE INDEX calendar_events_week_start_idx ON calendar_events (week_start);

ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read calendar events"
  ON calendar_events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION calendar_events_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calendar_events_updated_at
  BEFORE UPDATE ON calendar_events
  FOR EACH ROW
  EXECUTE FUNCTION calendar_events_set_updated_at();
