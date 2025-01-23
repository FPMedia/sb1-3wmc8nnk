import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthGuard } from './guards/AuthGuard';
import { useAuth } from '../hooks/useAuth';

// Public pages
import { DesignFeed } from '../pages/DesignFeed';
import { AuthPage } from '../pages/AuthPage';
import { DesignDetails } from '../pages/DesignDetails';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderConfirmation } from '../pages/OrderConfirmation';
import { ProfilePage } from '../pages/ProfilePage';
import { OrderHistory } from '../pages/OrderHistory';
import { AdminRoleAssignment } from '../pages/AdminRoleAssignment';
import { PaymentSuccess } from '../pages/payment/PaymentSuccess';
import { PaymentCancel } from '../pages/payment/PaymentCancel';

// Admin pages
import { ManageDesignsPage } from '../pages/admin/ManageDesignsPage';
import { OrdersPage } from '../pages/admin/OrdersPage';
import { CustomersPage } from '../pages/admin/CustomersPage';

export function AppRoutes() {
  const { isAdmin } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<DesignFeed />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/designs/:id" element={<DesignDetails />} />
        <Route path="/admin-role" element={<AdminRoleAssignment />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/cancel" element={<PaymentCancel />} />
      </Route>

      {/* Protected routes */}
      <Route element={<AuthGuard />}>
        <Route element={<PublicLayout />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="designs" replace />} />
        <Route path="designs" element={<ManageDesignsPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="customers" element={<CustomersPage />} />
      </Route>
    </Routes>
  );
}