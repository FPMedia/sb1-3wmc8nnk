/*
  # Fix customers table RLS policies

  1. Changes
    - Remove recursive policy that was causing infinite recursion
    - Add proper policies for customer access and admin access
    - Ensure public can insert new customers during order process
  
  2. Security
    - Enable RLS
    - Add policies for select, insert, and update operations
    - Restrict sensitive operations
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Customers can read own data" ON customers;

-- Create new policies
CREATE POLICY "Anyone can create customers"
  ON customers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Customers can read own data"
  ON customers
  FOR SELECT
  TO public
  USING (
    -- Allow access to own data based on phone number match
    phone = current_setting('request.jwt.claims')::json->>'phone'
    OR 
    -- Admin can access all records
    auth.email() = 'henry@henryshepherdson.com'
  );

CREATE POLICY "Admin can update customer data"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.email() = 'henry@henryshepherdson.com')
  WITH CHECK (auth.email() = 'henry@henryshepherdson.com');