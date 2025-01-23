export interface Design {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export type TShirtColor = 'white' | 'black' | 'navy' | 'red' | 'green';
export type TShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL';

export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  orders?: [{ count: number }];
}

export interface Order {
  id: string;
  customer_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface OrderWithItems extends Order {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  order_items: Array<{
    id: string;
    design: Design;
    quantity: number;
    price: number;
    color: string;
    size: string;
  }>;
}