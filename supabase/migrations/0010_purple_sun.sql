-- Drop existing policies
DROP POLICY IF EXISTS "Public customer creation" ON customers;
DROP POLICY IF EXISTS "Customer data access" ON customers;

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Public customer creation and access"
  ON customers
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);