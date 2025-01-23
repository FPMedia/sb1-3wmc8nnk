import React from 'react';
import { formatCurrency } from '../../../utils/currency';
import type { OrderWithItems } from '../../../types';

interface OrderListItemProps {
  order: OrderWithItems;
}

export function OrderListItem({ order }: OrderListItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-gray-900">
            Order #{order.id.slice(0, 8)}
          </h3>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
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

      <div className="border-t border-gray-200 pt-4">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700">Customer</h4>
          <p className="text-sm text-gray-600">
            {order.customer.first_name} {order.customer.last_name}
          </p>
          <p className="text-sm text-gray-600">{order.customer.email}</p>
          <p className="text-sm text-gray-600">{order.customer.phone}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Items</h4>
          <div className="space-y-2">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <img
                  src={item.design.image_url}
                  alt={item.design.title}
                  className="h-12 w-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.design.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.color} / {item.size} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-bold text-indigo-600">
            {formatCurrency(order.total_amount)}
          </span>
        </div>
      </div>
    </div>
  );
}