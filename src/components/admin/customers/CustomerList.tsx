import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { CustomerListItem } from './CustomerListItem';
import { Loader } from '../../ui/Loader';
import type { Customer } from '../../../types';

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('*, orders(count)')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCustomers(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch customers'));
      } finally {
        setLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  if (loading) return <Loader className="h-48" />;

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading customers: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <CustomerListItem key={customer.id} customer={customer} />
      ))}
    </div>
  );
}