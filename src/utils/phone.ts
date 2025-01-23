// Validates and formats South African phone numbers to E.164 format
export function formatPhoneNumber(phone: string): string | null {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle local format (0XX) XXX XXXX
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    // Convert to E.164 format: +27XXXXXXXXX
    return `+27${cleaned.slice(1)}`;
  }
  
  // Handle numbers already in international format
  if (cleaned.startsWith('27') && cleaned.length === 11) {
    return `+${cleaned}`;
  }
  
  return null;
}

export function validatePhoneNumber(phone: string): boolean {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Check local format: 0XXXXXXXXX
  if (/^0[6-8][0-9]{8}$/.test(cleaned)) {
    return true;
  }
  
  // Check international format: +27XXXXXXXXX
  if (/^\+27[6-8][0-9]{8}$/.test(cleaned)) {
    return true;
  }
  
  return false;
}

// Helper to check if a phone number is in E.164 format
export function isE164Format(phone: string): boolean {
  return /^\+27[6-8][0-9]{8}$/.test(phone);
}