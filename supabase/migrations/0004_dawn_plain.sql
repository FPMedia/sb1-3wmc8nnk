/*
  # Fix designs table policies

  1. Changes
    - Drop existing policies
    - Create new policies for designs table:
      - Public read access
      - Admin-only write access
  
  2. Security
    - Enable RLS on designs table
    - Add policies for public viewing and admin management
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Designs are viewable by everyone" ON designs;
  DROP POLICY IF EXISTS "Only admin can insert designs" ON designs;
  DROP POLICY IF EXISTS "Only admin can update designs" ON designs;
  DROP POLICY IF EXISTS "Only admin can delete designs" ON designs;
END $$;

-- Ensure RLS is enabled
ALTER TABLE designs ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Anyone can view designs"
  ON designs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admin can insert designs"
  ON designs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.email() = 'henry@henryshepherdson.com');

CREATE POLICY "Admin can update designs"
  ON designs
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'henry@henryshepherdson.com')
  WITH CHECK (auth.email() = 'henry@henryshepherdson.com');

CREATE POLICY "Admin can delete designs"
  ON designs
  FOR DELETE
  TO authenticated
  USING (auth.email() = 'henry@henryshepherdson.com');