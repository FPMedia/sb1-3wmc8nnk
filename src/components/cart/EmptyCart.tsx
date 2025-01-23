import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EmptyCart() {
  return (
    <div className="text-center py-12">
      <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven't added any items yet
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}