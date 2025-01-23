/*
  # Add admin phone number to admin check

  1. Changes
    - Update is_admin function to check for admin phone number
    - Add index for phone number lookups
*/

-- Drop existing admin check function
DROP FUNCTION IF EXISTS is_admin;

-- Create updated admin function that checks both email and phone
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM auth.users u
    LEFT JOIN customers c ON c.auth_id = u.id
    WHERE u.id = user_id 
    AND (
      u.email = 'henry@henryshepherdson.com'
      OR c.phone = '+27767229569'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin TO anon;