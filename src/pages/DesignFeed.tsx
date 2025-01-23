import React from 'react';
import { useDesigns } from '../hooks/useDesigns';
import { DesignCard } from '../components/DesignCard';
import { Loader } from '../components/ui/Loader';

export function DesignFeed() {
  const { designs, loading, error } = useDesigns();

  if (loading) {
    return <Loader className="h-96" />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error.message}
      </div>
    );
  }

  if (!designs.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No designs available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Latest T-Shirt Designs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </div>
    </div>
  );
}