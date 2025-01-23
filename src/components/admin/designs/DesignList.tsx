import React from 'react';
import { useDesigns } from '../../../hooks/useDesigns';
import { DesignListItem } from './DesignListItem';
import { Loader } from '../../ui/Loader';

export function DesignList() {
  const { designs, loading, error } = useDesigns();

  if (loading) return <Loader className="h-48" />;

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading designs: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {designs.map((design) => (
        <DesignListItem key={design.id} design={design} />
      ))}
    </div>
  );
}