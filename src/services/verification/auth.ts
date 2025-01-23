import { supabase } from '../../lib/supabase';
import { Debug } from '../../utils/debug';

const MODULE = 'VERIFICATION_AUTH';

export async function authenticateWithPhone(
  phone: string,
  password: string,
  isNewUser: boolean
): Promise<void> {
  Debug.info(MODULE, 'Authenticating with phone', { phone, isNewUser });

  try {
    if (isNewUser) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: `${phone}@phone.user`,
        password,
        phone
      });

      if (signUpError) throw signUpError;
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: `${phone}@phone.user`,
        password
      });

      if (signInError) throw signInError;
    }

    Debug.info(MODULE, 'Authentication successful');
  } catch (error) {
    Debug.error(MODULE, 'Authentication failed', error);
    throw error;
  }
}