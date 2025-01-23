import React from 'react';
import { AdminDesignForm } from '../../components/AdminDesignForm';
import { DesignList } from '../../components/admin/DesignList';

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload New Design</h2>
          <AdminDesignForm />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Designs</h2>
        <DesignList />
      </div>
    </div>
  );
}