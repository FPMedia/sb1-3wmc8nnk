import { Design } from '../../types';

export interface Order {
  id: string;
  customer_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  design_id: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  created_at: string;
  design: Design;
}

export interface OrderWithItems extends Order {
  order_items: OrderItem[];
}