/*
  # Link orders to auth users and add profile management

  1. Changes
    - Add auth_id to customers table
    - Create profile management policies
    - Update order policies to use auth_id

  2. Security
    - Add RLS policies for profile management
    - Ensure users can only access their own data
*/

-- Add auth_id to customers
ALTER TABLE customers
ADD COLUMN IF NOT EXISTS auth_id uuid REFERENCES auth.users(id);

-- Create index for auth_id
CREATE INDEX IF NOT EXISTS idx_customers_auth_id ON customers(auth_id);

-- Update policies for customer profile management
CREATE POLICY "Users can view own profile"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth_id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth_id = auth.uid())
  WITH CHECK (auth_id = auth.uid());

-- Update order policies to use auth_id
CREATE POLICY "Users can view own orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers
      WHERE auth_id = auth.uid()
    )
  );