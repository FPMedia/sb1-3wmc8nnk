import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../currency';

describe('formatCurrency', () => {
  it('formats currency in ZAR', () => {
    expect(formatCurrency(350)).toBe('R 350.00');
    expect(formatCurrency(1234.56)).toBe('R 1,234.56');
    expect(formatCurrency(0)).toBe('R 0.00');
  });

  it('handles negative numbers', () => {
    expect(formatCurrency(-350)).toBe('-R 350.00');
  });
});