import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { AuthGuard } from './components/guards/AuthGuard';

// Pages
import { DesignFeed } from './pages/DesignFeed';
import { AuthPage } from './pages/AuthPage';
import { DesignDetails } from './pages/DesignDetails';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { ProfilePage } from './pages/ProfilePage';
import { OrderHistory } from './pages/OrderHistory';

// Admin pages
import { ManageDesignsPage } from './pages/admin/ManageDesignsPage';
import { OrdersPage } from './pages/admin/OrdersPage';
import { CustomersPage } from './pages/admin/CustomersPage';

export const routes = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <DesignFeed /> },
      { path: '/auth', element: <AuthPage /> },
      { path: '/designs/:id', element: <DesignDetails /> },
      {
        element: <AuthGuard />,
        children: [
          { path: '/cart', element: <CartPage /> },
          { path: '/checkout', element: <CheckoutPage /> },
          { path: '/order-confirmation', element: <OrderConfirmation /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/orders', element: <OrderHistory /> },
        ],
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'designs', element: <ManageDesignsPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'customers', element: <CustomersPage /> },
    ],
  },
];
