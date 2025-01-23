import React, { useEffect, useState } from 'react';
import { Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface CustomerStats {
  totalCustomers: number;
  totalOrders: number;
  averageOrderValue: number;
}

export function CustomerStats() {
  const [stats, setStats] = useState<CustomerStats>({
    totalCustomers: 0,
    totalOrders: 0,
    averageOrderValue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Get total customers
        const { count: customerCount } = await supabase
          .from('customers')
          .select('*', { count: 'exact', head: true });

        // Get order stats
        const { data: orderStats } = await supabase
          .from('orders')
          .select('total_amount');

        const totalOrders = orderStats?.length || 0;
        const totalValue = orderStats?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
        const averageValue = totalOrders > 0 ? totalValue / totalOrders : 0;

        setStats({
          totalCustomers: customerCount || 0,
          totalOrders,
          averageOrderValue: averageValue,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
            <Users className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Customers</p>
            <p className="text-2xl font-semibold text-gray-900">
              {loading ? '...' : stats.totalCustomers}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-2xl font-semibold text-gray-900">
              {loading ? '...' : stats.totalOrders}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Average Order Value</p>
            <p className="text-2xl font-semibold text-gray-900">
              {loading ? '...' : `R ${stats.averageOrderValue.toFixed(2)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}