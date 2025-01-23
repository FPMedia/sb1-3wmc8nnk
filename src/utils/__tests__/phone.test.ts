import { describe, it, expect } from 'vitest';
import { formatPhoneNumber } from '../phone';

describe('formatPhoneNumber', () => {
  it('formats valid South African numbers', () => {
    expect(formatPhoneNumber('0721234567')).toBe('+27721234567');
    expect(formatPhoneNumber('+27721234567')).toBe('+27721234567');
  });

  it('returns null for invalid numbers', () => {
    expect(formatPhoneNumber('12345')).toBeNull();
    expect(formatPhoneNumber('not-a-number')).toBeNull();
    expect(formatPhoneNumber('+1234567890')).toBeNull();
  });
});