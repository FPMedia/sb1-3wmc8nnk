// Generate a 6-digit verification code
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Store verification codes in memory (in production, use Redis or similar)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export function storeVerificationCode(phone: string, code: string): void {
  // Code expires in 10 minutes
  verificationCodes.set(phone, {
    code,
    expires: Date.now() + 10 * 60 * 1000,
  });
}

export function verifyCode(phone: string, code: string): boolean {
  const stored = verificationCodes.get(phone);
  if (!stored) return false;
  
  if (Date.now() > stored.expires) {
    verificationCodes.delete(phone);
    return false;
  }

  const isValid = stored.code === code;
  if (isValid) {
    verificationCodes.delete(phone);
  }
  
  return isValid;
}