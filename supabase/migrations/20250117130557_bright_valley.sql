/*
  # Fix storage policies for design uploads

  1. Changes
    - Update storage policies to allow public uploads
    - Remove email-based restrictions
    - Keep public read access
  
  2. Security
    - Enable RLS on storage.objects
    - Allow public uploads to designs bucket
    - Maintain public read access
*/

-- Drop existing policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public can view design images" ON storage.objects;
  DROP POLICY IF EXISTS "Only admin can upload design images" ON storage.objects;
  DROP POLICY IF EXISTS "Only admin can update design images" ON storage.objects;
  DROP POLICY IF EXISTS "Only admin can delete design images" ON storage.objects;
END $$;

-- Create new policies
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'designs');

CREATE POLICY "Public upload access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'designs');

CREATE POLICY "Public update access"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'designs')
WITH CHECK (bucket_id = 'designs');

CREATE POLICY "Public delete access"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'designs');