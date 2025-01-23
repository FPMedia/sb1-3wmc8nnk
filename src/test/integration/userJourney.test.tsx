import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../utils';
import { App } from '../../App';
import { clearSession } from '../../services/auth/storage';

describe('User Journey', () => {
  beforeEach(() => {
    clearSession();
    localStorage.clear();
  });

  it('completes full purchase flow: select design → checkout → verify → view order', async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    // 1. View and select design
    await waitFor(() => {
      expect(screen.getByText('Test Design')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /choose design/i }));

    // 2. Customize and add to cart
    await waitFor(() => {
      expect(screen.getByText(/customize your order/i)).toBeInTheDocument();
    });

    // Select color and size
    await user.click(screen.getByRole('button', { name: /black/i }));
    await user.click(screen.getByRole('button', { name: /xl/i }));

    // Add to cart
    await user.click(screen.getByRole('button', { name: /add to cart/i }));

    // 3. View cart and proceed to checkout
    await waitFor(() => {
      expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('link', { name: /cart/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /proceed to checkout/i }));

    // 4. Phone verification
    await waitFor(() => {
      expect(screen.getByText(/enter your phone number/i)).toBeInTheDocument();
    });

    const phoneInput = screen.getByPlaceholderText(/071 234 5678/i);
    await user.type(phoneInput, '0721234567');
    await user.click(screen.getByRole('button', { name: /send verification code/i }));

    // Enter verification code
    await waitFor(() => {
      expect(screen.getByText(/verify your phone/i)).toBeInTheDocument();
    });

    const codeInput = screen.getByPlaceholderText(/enter 6-digit code/i);
    await user.type(codeInput, '123456');
    await user.click(screen.getByRole('button', { name: /verify and place order/i }));

    // 5. Order confirmation
    await waitFor(() => {
      expect(screen.getByText(/order confirmed/i)).toBeInTheDocument();
    });

    // 6. View order history
    await user.click(screen.getByRole('link', { name: /order history/i }));

    await waitFor(() => {
      expect(screen.getByText(/order history/i)).toBeInTheDocument();
      expect(screen.getByText('Test Design')).toBeInTheDocument();
      expect(screen.getByText(/r 350\.00/i)).toBeInTheDocument();
    });
  });
});