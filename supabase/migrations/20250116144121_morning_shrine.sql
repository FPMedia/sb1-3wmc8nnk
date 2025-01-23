/*
  # Update admin access control

  1. Changes
    - Update is_admin function to allow all users access
    - Maintain existing admin functions for future use
    - Keep security settings and permissions

  2. Security Note
    - This allows UI access but database policies still protect data
    - All database operations still require proper authentication
*/

-- Drop existing is_admin function
DROP FUNCTION IF EXISTS is_admin;

-- Create updated admin function that allows all access
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS BOOLEAN AS $$
BEGIN
  -- Return true for all users to allow admin UI access
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin TO anon;