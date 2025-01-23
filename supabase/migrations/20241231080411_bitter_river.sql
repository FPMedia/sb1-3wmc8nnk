/*
  # Add new admin user

  1. Changes
    - Update admin check function to include new admin phone number
    - Add index on customers phone number for better performance
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
$$ LANGUAGE plpgsql;

-- Create index for phone number lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);