import { supabase } from '../../lib/supabase';
import { formatPhoneNumber } from '../../utils/phone';
import { CustomerProfile, CustomerSession } from './types';
import { getStoredSession, storeSession, clearSession } from './storage';

export function getCustomerSession(): CustomerSession | null {
  return getStoredSession();
}

export function getVerifiedPhone(): string | null {
  const session = getCustomerSession();
  return session?.phone || null;
}

export async function getCustomerProfile(phone: string): Promise<CustomerProfile | null> {
  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) return null;

  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('phone', formattedPhone)
    .single();

  if (error) {
    console.error('Error fetching customer profile:', error);
    return null;
  }

  return data;
}

interface ProfileUpdateData {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
}

export async function updateCustomerProfile(phone: string, data: ProfileUpdateData): Promise<void> {
  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    throw new Error('Invalid phone number format');
  }

  const { error } = await supabase
    .from('customers')
    .update(data)
    .eq('phone', formattedPhone);

  if (error) {
    console.error('Error updating customer profile:', error);
    throw error;
  }
}

export async function signInCustomer(phone: string): Promise<void> {
  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    throw new Error('Invalid phone number format');
  }

  // Get or create customer profile
  const profile = await getCustomerProfile(formattedPhone);
  if (!profile) {
    throw new Error('Customer profile not found');
  }

  // Store session
  storeSession({
    phone: formattedPhone,
    customerId: profile.id
  });
}

export function signOutCustomer(): void {
  clearSession();
}