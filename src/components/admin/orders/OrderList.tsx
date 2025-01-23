import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { OrderListItem } from './OrderListItem';
import { Loader } from '../../ui/Loader';
import type { OrderWithItems } from '../../../types';

export function OrderList() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            customer:customers(first_name, last_name, email, phone),
            order_items(
              *,
              design:designs(*)
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch orders'));
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <Loader className="h-48" />;

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading orders: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderListItem key={order.id} order={order} />
      ))}
    </div>
  );
}