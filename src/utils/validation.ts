export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid South African mobile number
  // Must start with 0 and be 10 digits long
  // Valid prefixes: 06, 07, 08
  if (cleaned.length !== 10) return false;
  if (!cleaned.startsWith('0')) return false;
  
  const prefix = cleaned.substring(1, 2);
  return ['6', '7', '8'].includes(prefix);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}