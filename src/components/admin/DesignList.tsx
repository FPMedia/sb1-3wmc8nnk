import React from 'react';
import { useDesigns } from '../../hooks/useDesigns';
import { DesignCard } from '../DesignCard';
import { Loader } from '../ui/Loader';

export function DesignList() {
  const { designs, loading, error } = useDesigns();

  if (loading) {
    return <Loader className="h-48" />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading designs: {error.message}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {designs.map((design) => (
        <DesignCard key={design.id} design={design} isAdmin />
      ))}
    </div>
  );
}