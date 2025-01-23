import { supabase } from '../../lib/supabase';
import { formatPhoneNumber } from '../../utils/phone';

// Request OTP
export async function requestPhoneOtp(phone: string) {
  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    throw new Error('Invalid phone number format');
  }

  return supabase.auth.signInWithOtp({
    phone: formattedPhone,
    options: {
      channel: 'sms'
    }
  });
}

// Verify OTP
export async function verifyPhoneOtp(phone: string, token: string) {
  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    throw new Error('Invalid phone number format');
  }

  return supabase.auth.verifyOtp({
    phone: formattedPhone,
    token,
    type: 'sms'
  });
}