import React from 'react';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyCart } from '../components/cart/EmptyCart';

export function CartPage() {
  const { state } = useCart();

  if (!state.items.length) {
    return <EmptyCart />;
  }

  const total = state.items.reduce(
    (sum, item) => sum + item.design.price * item.quantity,
    0
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="divide-y">
          {state.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <CartSummary total={total} />
      </div>
    </div>
  );
}