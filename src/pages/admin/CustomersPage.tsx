import React from 'react';
import { CustomerList } from '../../components/admin/customers/CustomerList';
import { CustomerStats } from '../../components/admin/customers/CustomerStats';

export function CustomersPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
      
      <CustomerStats />
      
      <div className="bg-white shadow rounded-lg p-6">
        <CustomerList />
      </div>
    </div>
  );
}