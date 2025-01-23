import { Debug } from '../../utils/debug';

interface VerificationEntry {
  code: string;
  expires: number;
}

const MODULE = 'VERIFICATION_STORAGE';
const EXPIRY_MINUTES = 10;
const verificationCodes = new Map<string, VerificationEntry>();

export function storeCode(phone: string, code: string): void {
  Debug.info(MODULE, 'Storing verification code', { phone });
  
  const entry: VerificationEntry = {
    code,
    expires: Date.now() + EXPIRY_MINUTES * 60 * 1000
  };
  
  verificationCodes.set(phone, entry);
  Debug.debug(MODULE, 'Verification code stored', {
    phone,
    expiresIn: `${EXPIRY_MINUTES} minutes`
  });
}

export function verifyCode(phone: string, code: string): boolean {
  Debug.info(MODULE, 'Verifying code', { phone });
  
  const stored = verificationCodes.get(phone);
  if (!stored) {
    Debug.warn(MODULE, 'No verification code found', { phone });
    return false;
  }
  
  if (Date.now() > stored.expires) {
    Debug.warn(MODULE, 'Verification code expired', {
      phone,
      expired: new Date(stored.expires).toISOString()
    });
    verificationCodes.delete(phone);
    return false;
  }

  const isValid = stored.code === code;
  Debug.info(MODULE, 'Code verification result', { phone, isValid });
  
  if (isValid) {
    verificationCodes.delete(phone);
    Debug.debug(MODULE, 'Verified code removed from storage', { phone });
  }
  
  return isValid;
}