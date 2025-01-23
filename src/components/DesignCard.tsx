import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Design } from '../types';
import { formatCurrency } from '../utils/currency';
import { Pencil, Trash2 } from 'lucide-react';

interface DesignCardProps {
  design: Design;
  isAdmin?: boolean;
}

export function DesignCard({ design, isAdmin }: DesignCardProps) {
  const navigate = useNavigate();

  const handleDesignClick = () => {
    navigate(`/designs/${design.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="aspect-square w-full relative cursor-pointer"
        onClick={handleDesignClick}
      >
        <img
          src={design.image_url}
          alt={design.title}
          className="absolute inset-0 w-full h-full object-cover hover:opacity-90 transition-opacity"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{design.title}</h3>
        <p className="mt-1 text-gray-500 line-clamp-2">{design.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">
            {formatCurrency(design.price)}
          </span>
          {isAdmin ? (
            <div className="flex gap-2">
              <button className="p-2 text-gray-600 hover:text-indigo-600">
                <Pencil className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleDesignClick}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Design
            </button>
          )}
        </div>
      </div>
    </div>
  );
}