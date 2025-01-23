import { useState, useEffect } from 'react';
import { getCustomerSession, signOutCustomer } from '../services/auth/customer';
import type { CustomerAuth } from '../services/auth/types';

export function useCustomerAuth(): CustomerAuth & { signOut: () => void } {
  const [auth, setAuth] = useState<CustomerAuth>(() => ({
    session: getCustomerSession(),
    isAuthenticated: !!getCustomerSession()
  }));

  useEffect(() => {
    const handleAuth = () => {
      const session = getCustomerSession();
      setAuth({
        session,
        isAuthenticated: !!session
      });
    };

    window.addEventListener('customer_auth', handleAuth);
    return () => window.removeEventListener('customer_auth', handleAuth);
  }, []);

  return {
    ...auth,
    signOut: signOutCustomer
  };
}