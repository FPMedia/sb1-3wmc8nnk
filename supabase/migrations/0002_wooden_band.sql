/*
  # Create designs table and admin role

  1. New Tables
    - `designs`
      - `id` (uuid, primary key)
      - `title` (text)
      - `image_url` (text)
      - `description` (text)
      - `price` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on `designs` table
    - Add policies for:
      - Public read access
      - Admin-only write access
*/

-- Create admin role
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN user_id IN (
    SELECT id FROM auth.users WHERE email = 'henry@henryshepherdson.com'
  );
END;
$$ LANGUAGE plpgsql;

-- Create designs table
CREATE TABLE IF NOT EXISTS designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Designs are viewable by everyone"
  ON designs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only admin can insert designs"
  ON designs
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admin can update designs"
  ON designs
  FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admin can delete designs"
  ON designs
  FOR DELETE
  TO authenticated
  USING (is_admin(auth.uid()));