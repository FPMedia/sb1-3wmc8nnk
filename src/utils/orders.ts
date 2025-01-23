import { supabase } from '../lib/supabase';
import { CartItem } from '../types';
import { showError } from './toast';

export async function createOrder(customerId: string, items: CartItem[]) {
  if (!items.length) {
    throw new Error('Cannot create order with no items');
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.design.price * item.quantity,
    0
  );

  // Start a Supabase transaction
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_id: customerId,
      total_amount: totalAmount,
      status: 'pending'
    })
    .select('id')
    .single();

  if (orderError) {
    console.error('Failed to create order:', orderError);
    throw new Error('Failed to create order');
  }

  // Create order items
  const orderItems = items.map(item => ({
    order_id: order.id,
    design_id: item.design.id,
    quantity: item.quantity,
    price: item.design.price,
    color: item.color,
    size: item.size
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Failed to create order items:', itemsError);
    // Try to cleanup the order
    await supabase.from('orders').delete().eq('id', order.id);
    throw new Error('Failed to create order items');
  }

  return order.id;
}