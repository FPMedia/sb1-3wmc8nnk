import React from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '../../contexts/CartContext';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/currency';
import { QuantitySelector } from '../ui/QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  const handleQuantityChange = (quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity } });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b">
      <img
        src={item.design.image_url}
        alt={item.design.title}
        className="h-20 w-20 object-cover rounded"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 truncate">{item.design.title}</h3>
        <p className="text-sm text-gray-500">
          {item.color} / {item.size}
        </p>
        <p className="font-medium text-indigo-600 sm:hidden mt-1">
          {formatCurrency(item.design.price)}
        </p>
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <QuantitySelector
          quantity={item.quantity}
          onChange={handleQuantityChange}
          min={1}
          max={10}
        />
        <div className="hidden sm:block">
          <p className="font-medium text-indigo-600 whitespace-nowrap">
            {formatCurrency(item.design.price)}
          </p>
        </div>
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors ml-auto sm:ml-0"
          aria-label="Remove item"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}