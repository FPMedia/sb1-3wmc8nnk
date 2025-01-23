import React from 'react';
import { DesignList } from '../../components/admin/designs/DesignList';
import { DesignUploadForm } from '../../components/admin/designs/DesignUploadForm';

export function ManageDesignsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Designs</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upload New Design</h2>
          <DesignUploadForm />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Design List</h2>
        <DesignList />
      </div>
    </div>
  );
}