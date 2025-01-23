ALTER TABLE customers
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS email text;

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);