-- Update customers policy to use verified phone from request header
CREATE OR REPLACE FUNCTION get_verified_phone()
RETURNS text AS $$
BEGIN
  RETURN COALESCE(
    current_setting('request.headers')::json->>'x-verified-phone',
    ''
  );
END;
$$ LANGUAGE plpgsql;

-- Update customers policies
DROP POLICY IF EXISTS "Customers can read own data" ON customers;
CREATE POLICY "Customers can read own data"
  ON customers
  FOR SELECT
  TO public
  USING (
    phone = get_verified_phone()
    OR auth.email() = 'henry@henryshepherdson.com'
  );

-- Update orders policies
DROP POLICY IF EXISTS "Customers can view own orders" ON orders;
CREATE POLICY "Customers can view own orders"
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

-- Update order items policies
DROP POLICY IF EXISTS "Customers can view own order items" ON order_items;
CREATE POLICY "Customers can view own order items"
  ON order_items
  FOR SELECT
  TO public
  USING (
    order_id IN (
      SELECT o.id FROM orders o
      JOIN customers c ON o.customer_id = c.id
      WHERE c.phone = get_verified_phone()
    )
    OR auth.email() = 'henry@henryshepherdson.com'
  );