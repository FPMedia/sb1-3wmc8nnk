import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../contexts/CartContext';
import { Toaster } from 'react-hot-toast';

export function renderWithProviders(ui: React.ReactElement) {
  return render(
    <BrowserRouter>
      <CartProvider>
        {ui}
        <Toaster position="top-right" />
      </CartProvider>
    </BrowserRouter>
  );
}