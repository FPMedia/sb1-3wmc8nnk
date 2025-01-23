/*
  # Update Orders RLS Policies

  1. Changes
    - Drop and recreate orders and order items policies
    - Update policy names to be more descriptive
    - Add proper checks for authenticated users

  2. Security
    - Ensure authenticated users can create orders
    - Allow users to view only their own orders
    - Allow admin access to all orders
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  -- Orders policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'orders' 
    AND policyname IN ('Public order creation', 'Order data access', 'Users can view own orders')
  ) THEN
    DROP POLICY IF EXISTS "Public order creation" ON orders;
    DROP POLICY IF EXISTS "Order data access" ON orders;
    DROP POLICY IF EXISTS "Users can view own orders" ON orders;
  END IF;

  -- Order items policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'order_items' 
    AND policyname IN ('Allow order items creation', 'Users can view own order items')
  ) THEN
    DROP POLICY IF EXISTS "Allow order items creation" ON order_items;
    DROP POLICY IF EXISTS "Users can view own order items" ON order_items;
  END IF;
END $$;

-- Create new orders policies
CREATE POLICY "authenticated_order_creation"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "user_order_access"
  ON orders
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT id FROM customers
      WHERE auth_id = auth.uid()
    )
    OR auth.email() = 'henry@henryshepherdson.com'
  );

-- Create new order items policies
CREATE POLICY "authenticated_order_items_creation"
  ON order_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "user_order_items_access"
  ON order_items
  FOR SELECT
  TO authenticated
  USING (
    order_id IN (
      SELECT o.id FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.auth_id = auth.uid()
    )
    OR auth.email() = 'henry@henryshepherdson.com'
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_customers_auth_id ON customers(auth_id);