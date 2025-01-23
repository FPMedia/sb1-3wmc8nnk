import React from 'react';
import { useDesigns } from '../hooks/useDesigns';
import { Design } from '../types';
import { formatCurrency } from '../utils/currency';

export function DesignFeed() {
  const { designs, loading, error } = useDesigns();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
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
      {designs.map((design: Design) => (
        <div key={design.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={design.image_url}
            alt={design.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{design.title}</h3>
            <p className="mt-1 text-gray-500">{design.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-2xl font-bold text-indigo-600">
                {formatCurrency(design.price)}
              </span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}