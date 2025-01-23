-- Create function to assign admin role by phone
CREATE OR REPLACE FUNCTION assign_admin_role_by_phone(phone_number text)
RETURNS void AS $$
BEGIN
  -- Validate phone number format
  IF NOT phone_number ~ '^\+?27[6-8][0-9]{8}$' THEN
    RAISE EXCEPTION 'Invalid South African phone number format';
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
        OR c.phone = phone_number
      )
    );
  END;
  $inner$ LANGUAGE plpgsql SECURITY DEFINER;

  -- Grant execute permissions
  GRANT EXECUTE ON FUNCTION is_admin TO authenticated;
  GRANT EXECUTE ON FUNCTION is_admin TO anon;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the assignment function
GRANT EXECUTE ON FUNCTION assign_admin_role_by_phone TO authenticated;
GRANT EXECUTE ON FUNCTION assign_admin_role_by_phone TO anon;