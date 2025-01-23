/*
  # Update admin phone number format

  1. Changes
    - Update is_admin function to handle phone numbers without "+" prefix
    - Update assign_admin_role_by_phone function to handle phone numbers without "+" prefix
    - Add phone number normalization to ensure consistent format

  2. Security
    - Maintains SECURITY DEFINER setting
    - Preserves existing permissions
*/

-- Drop existing functions
DROP FUNCTION IF EXISTS is_admin;
DROP FUNCTION IF EXISTS assign_admin_role_by_phone;

-- Create updated admin function that handles phone numbers without "+" prefix
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
      OR c.phone = '27767229569'
      OR c.phone = '+27767229569'  -- Support both formats during transition
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create updated function to assign admin role by phone
CREATE OR REPLACE FUNCTION assign_admin_role_by_phone(phone_number text)
RETURNS void AS $$
DECLARE
  normalized_phone text;
BEGIN
  -- Normalize phone number by removing "+" if present
  normalized_phone := REPLACE(phone_number, '+', '');
  
  -- Validate phone number format (27XXXXXXXXX)
  IF NOT normalized_phone ~ '^27[6-8][0-9]{8}$' THEN
    RAISE EXCEPTION 'Invalid South African phone number format. Must be in format: 27XXXXXXXXX';
  END IF;

  -- Update the is_admin function to include the new phone number
  CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
  RETURNS BOOLEAN AS $inner$
  BEGIN
    RETURN EXISTS (
      SELECT 1 
      FROM auth.users u
      LEFT JOIN customers c ON c.auth_id = u.id
      WHERE u.id = user_id 
      AND (
        u.email = 'henry@henryshepherdson.com'
        OR c.phone = normalized_phone
        OR c.phone = '+' || normalized_phone  -- Support both formats during transition
      )
    );
  END;
  $inner$ LANGUAGE plpgsql SECURITY DEFINER;

  -- Grant execute permissions
  GRANT EXECUTE ON FUNCTION is_admin TO authenticated;
  GRANT EXECUTE ON FUNCTION is_admin TO anon;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION is_admin TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin TO anon;
GRANT EXECUTE ON FUNCTION assign_admin_role_by_phone TO authenticated;
GRANT EXECUTE ON FUNCTION assign_admin_role_by_phone TO anon;