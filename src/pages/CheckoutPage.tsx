import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';
import { supabase } from '../lib/supabase';
import { createOrder } from '../utils/orders';
import { initiatePayment } from '../services/payment/api';
import { showError } from '../utils/toast';
import { Loader } from '../components/ui/Loader';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { state, dispatch } = useCart();
  const [processing, setProcessing] = useState(false);

  // Handle navigation for empty cart and unauthenticated users
  useEffect(() => {
    if (!loading) {
      if (!state.items.length) {
        navigate('/cart');
      } else if (!user) {
        navigate('/auth', { 
          state: { from: '/checkout' }
        });
      }
    }
  }, [loading, user, state.items.length, navigate]);

  // Handle order processing
  useEffect(() => {
    async function processOrder() {
      if (!user || processing || !state.items.length) return;
      
      setProcessing(true);
      try {
        // Get customer profile
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .select('*')
          .eq('auth_id', user.id)
          .single();

        if (customerError) throw customerError;
        if (!customer) {
          throw new Error('Customer profile not found');
        }

        // Calculate total amount
        const totalAmount = state.items.reduce(
          (sum, item) => sum + item.design.price * item.quantity,
          0
        );

        // Create order
        const orderId = await createOrder(customer.id, state.items);

        // Initiate payment
        const paymentUrl = await initiatePayment(
          orderId,
          totalAmount,
          'T-Shirt Design Order',
          {
            firstName: customer.first_name,
            lastName: customer.last_name,
            email: customer.email
          }
        );

        // Clear cart and redirect to payment
        dispatch({ type: 'CLEAR_CART' });
        window.location.href = paymentUrl;
      } catch (error) {
        console.error('Checkout failed:', error);
        showError('Failed to process checkout. Please try again.');
        setProcessing(false);
      }
    }

    if (user && !loading && state.items.length > 0) {
      processOrder();
    }
  }, [user, loading, state.items, dispatch, navigate, processing]);

  if (loading || processing) {
    return <Loader className="h-96" />;
  }

  return <Loader className="h-96" />;
}