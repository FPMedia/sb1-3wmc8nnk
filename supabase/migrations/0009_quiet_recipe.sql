/*
  # Fix Customer and Order Policies

  1. Changes
    - Allow public creation of customers
    - Fix customer lookup policy
    - Update order creation policies
    - Simplify policy conditions
  
  2. Security
    - Maintain data isolation between customers
    - Allow admin access to all records
    - Ensure proper order creation flow
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create customers" ON customers;
DROP POLICY IF EXISTS "Customers can read own data" ON customers;
DROP POLICY IF EXISTS "Anyone can create orders" ON orders;
DROP POLICY IF EXISTS "Customers can view own orders" ON orders;

-- Customer policies
CREATE POLICY "Public customer creation"
  ON customers
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Customer data access"
  ON customers
  FOR SELECT
  TO public
  USING (
    phone = get_verified_phone()
    OR auth.email() = 'henry@henryshepherdson.com'
  );

-- Order policies
CREATE POLICY "Public order creation"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (
    customer_id IN (
      SELECT id FROM customers
      WHERE phone = get_verified_phone()
    )
  );

CREATE POLICY "Order data access"
  ON orders
  FOR SELECT
  TO public
  USING (
    customer_id IN (
      SELECT id FROM customers
      WHERE phone = get_verified_phone()
    )
    OR auth.email() = 'henry@henryshepherdson.com'
  );

-- Order items policies
CREATE POLICY "Public order item creation"
  ON order_items
  FOR INSERT
  TO public
  WITH CHECK (
    order_id IN (
      SELECT id FROM orders
      WHERE customer_id IN (
        SELECT id FROM customers
        WHERE phone = get_verified_phone()
      )
    )
  );

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);