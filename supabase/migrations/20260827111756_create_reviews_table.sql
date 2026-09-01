/*
# Create reviews table (single-tenant, no auth)

1. New Tables
- `reviews`
  - `id` (uuid, primary key)
  - `name` (text, not null) — reviewer's display name
  - `rating` (integer, 1-5, not null) — star rating
  - `comment` (text, not null) — review text
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `reviews`.
- Allow anon + authenticated CRUD because reviews are intentionally public/shared (no sign-in on this portfolio site).
3. Notes
- No user_id column — this is a public portfolio with no accounts.
- `rating` constrained to 1-5 via CHECK.
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_reviews" ON reviews;
CREATE POLICY "anon_select_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_reviews" ON reviews;
CREATE POLICY "anon_insert_reviews" ON reviews FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_reviews" ON reviews;
CREATE POLICY "anon_delete_reviews" ON reviews FOR DELETE
  TO anon, authenticated USING (true);
