import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= min}
        className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-50"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="px-4 py-2 text-gray-700">{quantity}</span>
      <button
        type="button"
        onClick={increase}
        disabled={quantity >= max}
        className="p-2 text-gray-600 hover:text-indigo-600 disabled:opacity-50"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}