import { supabase } from '../../lib/supabase';
import { Debug } from '../../utils/debug';
import type { Order, OrderWithItems } from './types';

const MODULE = 'ORDERS_API';

export async function getCustomerOrders(customerId: string): Promise<OrderWithItems[]> {
  Debug.info(MODULE, 'Fetching customer orders', { customerId });

  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          design: designs (*)
        )
      `)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return orders;
  } catch (error) {
    Debug.error(MODULE, 'Failed to fetch customer orders', error);
    throw error;
  }
}