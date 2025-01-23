import { useState, useEffect } from 'react';
import { getVerifiedPhone } from '../services/auth/customer';

export function useCustomer() {
  const [phone, setPhone] = useState<string | null>(getVerifiedPhone());

  useEffect(() => {
    const handleStorage = () => {
      setPhone(getVerifiedPhone());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return {
    isAuthenticated: !!phone,
    phone
  };
}