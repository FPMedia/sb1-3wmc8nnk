const VALID_PHONE_PREFIXES = ['+27'];

export function validatePhoneNumber(phone: string): boolean {
  // Must be in E.164 format: +27XXXXXXXXX
  return VALID_PHONE_PREFIXES.some(prefix => 
    phone.startsWith(prefix) && 
    phone.length === prefix.length + 9 &&
    /^\+\d+$/.test(phone)
  );
}

export function validateMessage(message: string): boolean {
  return message.length > 0 && message.length <= 1600; // Twilio's limit
}