import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/currency';

interface CartSummaryProps {
  total: number;
}

export function CartSummary({ total }: CartSummaryProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-6 pt-6 border-t">
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <button
        onClick={() => navigate('/checkout')}
        className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}