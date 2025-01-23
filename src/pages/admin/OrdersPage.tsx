import React from 'react';
import { OrderList } from '../../components/admin/orders/OrderList';
import { OrderStats } from '../../components/admin/orders/OrderStats';

export function OrdersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
      
      <OrderStats />
      
      <div className="bg-white shadow rounded-lg p-6">
        <OrderList />
      </div>
    </div>
  );
}