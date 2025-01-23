/*
  # Add customers and orders tables

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `phone` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `orders`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key)
      - `total_amount` (decimal)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `design_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (decimal)
      - `color` (text)
      - `size` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for customer access
*/

-- Create customers table
CREATE TABLE customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order items table
CREATE TABLE order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) NOT NULL,
  design_id uuid REFERENCES designs(id) NOT NULL,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  color text NOT NULL,
  size text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Customers can read own data"
  ON customers
  FOR SELECT
  USING (phone IN (SELECT phone FROM customers WHERE id = auth.uid()));

CREATE POLICY "Orders are viewable by customer"
  ON orders
  FOR SELECT
  USING (customer_id IN (SELECT id FROM customers WHERE id = auth.uid()));

CREATE POLICY "Order items are viewable by customer"
  ON order_items
  FOR SELECT
  USING (order_id IN (SELECT id FROM orders WHERE customer_id IN (
    SELECT id FROM customers WHERE id = auth.uid()
  )));