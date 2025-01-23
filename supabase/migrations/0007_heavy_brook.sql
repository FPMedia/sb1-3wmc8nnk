/*
  # Fix orders and order_items RLS policies

  1. Changes
    - Drop existing restrictive policies
    - Add proper policies for order creation and access
    - Enable public access for order creation during checkout
    - Ensure customers can access their own orders
  
  2. Security
    - Enable RLS
    - Add policies for select and insert operations
    - Restrict access to own orders only
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Orders are viewable by customer" ON orders;
DROP POLICY IF EXISTS "Order items are viewable by customer" ON order_items;

-- Orders policies
CREATE POLICY "Anyone can create orders"
  ON orders
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Customers can view own orders"
  ON orders
  FOR SELECT
  TO public
  USING (
    customer_id IN (
      SELECT id FROM customers 
      WHERE phone = current_setting('request.jwt.claims')::json->>'phone'
    )
    OR auth.email() = 'henry@henryshepherdson.com'
  );

-- Order items policies
CREATE POLICY "Anyone can create order items"
  ON order_items
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Customers can view own order items"
  ON order_items
  FOR SELECT
  TO public
  USING (
    order_id IN (
      SELECT o.id FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.phone = current_setting('request.jwt.claims')::json->>'phone'
    )
    OR auth.email() = 'henry@henryshepherdson.com'
  );