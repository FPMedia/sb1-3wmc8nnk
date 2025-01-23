import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Package } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { formatCurrency } from '../utils/currency';
import { Loader } from '../components/ui/Loader';
import { useQuery } from '../hooks/useQuery';

export function OrderHistory() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: orders, loading, error } = useQuery(
    async () => {
      if (!user?.id) return [];
      
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('auth_id', user.id)
        .single();

      if (!customer) return [];

      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            design:designs(*)
          )
        `)
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false });

      return data || [];
    },
    [user]
  );

  if (loading) {
    return <Loader className="h-96" />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error.message}</p>
      </div>
    );
  }

  if (!orders?.length) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-4">When you place orders, they will appear here</p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="p-4">
              {order.order_items.map((item) => (
                <div key={item.id} className="flex items-center py-2">
                  <img
                    src={item.design.image_url}
                    alt={item.design.title}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-900">{item.design.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.color} / {item.size} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-bold text-indigo-600">
                  {formatCurrency(order.total_amount)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}