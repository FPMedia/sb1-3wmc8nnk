import { useEffect, useState } from 'react';
import { getCustomerSession } from '../services/auth/customer';
import { getCustomerOrders } from '../services/orders/api';
import type { OrderWithItems } from '../services/orders/types';

export function useCustomerOrders() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      const session = getCustomerSession();
      if (!session?.customerId) return;
      
      try {
        const customerOrders = await getCustomerOrders(session.customerId);
        setOrders(customerOrders);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch orders'));
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return { orders, loading, error };
}