import { Debug } from '../../utils/debug';
import { generateCode, storeCode, verifyCode } from './index';
import { sendSMS } from '../sms';
import { formatPhoneNumber } from '../../utils/phone';
import { supabase } from '../../lib/supabase';

const MODULE = 'VERIFICATION_PROCESS';

export async function initiateVerification(phone: string): Promise<boolean> {
  Debug.info(MODULE, 'Starting verification process', { phone });

  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    throw new Error('Invalid phone number format');
  }

  try {
    // Check if user exists
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('phone', formattedPhone)
      .maybeSingle();

    const code = generateCode();
    await sendSMS(formattedPhone, `Your T-Shirt Designs verification code is: ${code}`);
    storeCode(formattedPhone, code);

    Debug.info(MODULE, 'Verification initiated successfully', { isNewCustomer: !existingCustomer });
    return !existingCustomer;
  } catch (error) {
    Debug.error(MODULE, 'Verification initiation failed', error);
    throw error;
  }
}

export async function completeVerification(
  phone: string,
  code: string,
  customerDetails?: {
    firstName: string;
    lastName: string;
    email: string;
  }
): Promise<void> {
  Debug.info(MODULE, 'Completing verification', { phone });

  const formattedPhone = formatPhoneNumber(phone);
  if (!formattedPhone) {
    throw new Error('Invalid phone number');
  }

  if (!verifyCode(formattedPhone, code)) {
    throw new Error('Invalid or expired verification code');
  }

  try {
    // Sign in with phone number
    const { data: { session }, error: signInError } = await supabase.auth.signInWithOtp({
      phone: formattedPhone
    });

    if (signInError) throw signInError;
    if (!session) throw new Error('No session created');

    // Create or update customer profile
    if (customerDetails) {
      const { error: profileError } = await supabase
        .from('customers')
        .upsert({
          phone: formattedPhone,
          first_name: customerDetails.firstName,
          last_name: customerDetails.lastName,
          email: customerDetails.email,
          auth_id: session.user.id
        });

      if (profileError) throw profileError;
    }

    Debug.info(MODULE, 'Verification completed successfully');
  } catch (error) {
    Debug.error(MODULE, 'Verification completion failed', error);
    throw error;
  }
}