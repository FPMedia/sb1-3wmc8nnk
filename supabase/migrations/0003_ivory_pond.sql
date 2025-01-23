/*
  # Add storage bucket for designs

  1. Storage
    - Create 'designs' bucket for storing t-shirt design images
  
  2. Security
    - Enable public read access to designs
    - Restrict upload/delete to admin users only
*/

-- Create bucket if it doesn't exist
DO $$
BEGIN
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('designs', 'designs', true)
  ON CONFLICT (id) DO NOTHING;
END $$;

-- Policies for the storage bucket
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public can view design images" ON storage.objects;
  DROP POLICY IF EXISTS "Only admin can upload design images" ON storage.objects;
  DROP POLICY IF EXISTS "Only admin can update design images" ON storage.objects;
  DROP POLICY IF EXISTS "Only admin can delete design images" ON storage.objects;
END $$;

CREATE POLICY "Public can view design images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'designs');

CREATE POLICY "Only admin can upload design images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'designs' 
  AND auth.email() = 'henry@henryshepherdson.com'
);

CREATE POLICY "Only admin can update design images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'designs'
  AND auth.email() = 'henry@henryshepherdson.com'
)
WITH CHECK (
  bucket_id = 'designs'
  AND auth.email() = 'henry@henryshepherdson.com'
);

CREATE POLICY "Only admin can delete design images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'designs'
  AND auth.email() = 'henry@henryshepherdson.com'
);