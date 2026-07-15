-- Dynamic calendar categories with custom colors
CREATE TABLE calendar_categories (
  slug text PRIMARY KEY,
  label text NOT NULL,
  color text NOT NULL CHECK (color ~ '^#[0-9A-Fa-f]{6}$'),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO calendar_categories (slug, label, color, sort_order) VALUES
  ('meeting', 'Encontros e participação', '#fff3a8', 0),
  ('dance', 'Dança e movimento', '#b8dff5', 1),
  ('art', 'Ateliers expressivos', '#f5c4d4', 2),
  ('garden', 'Horta comunitária', '#c8e6b8', 3);

ALTER TABLE calendar_events
  ALTER COLUMN category TYPE text USING category::text;

ALTER TABLE calendar_events
  ADD CONSTRAINT calendar_events_category_fkey
  FOREIGN KEY (category) REFERENCES calendar_categories (slug)
  ON UPDATE CASCADE
  ON DELETE RESTRICT;

DROP TYPE calendar_category;

ALTER TABLE calendar_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read calendar categories"
  ON calendar_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION calendar_categories_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calendar_categories_updated_at
  BEFORE UPDATE ON calendar_categories
  FOR EACH ROW
  EXECUTE FUNCTION calendar_categories_set_updated_at();
