import React from 'react';
import { Mail, Phone, Calendar, ShoppingBag } from 'lucide-react';
import type { Customer } from '../../../types';

interface CustomerListItemProps {
  customer: Customer;
}

export function CustomerListItem({ customer }: CustomerListItemProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">
            {customer.first_name} {customer.last_name}
          </h3>
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <Mail className="h-4 w-4 mr-2" />
              {customer.email}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Phone className="h-4 w-4 mr-2" />
              {customer.phone}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Joined {new Date(customer.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm font-medium text-indigo-600">
          <ShoppingBag className="h-4 w-4 mr-1" />
          {customer.orders?.[0]?.count || 0} orders
        </div>
      </div>
    </div>
  );
}