import { CustomerSession } from './types';

const SESSION_KEY = 'customer_session';

export function getStoredSession(): CustomerSession | null {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function storeSession(session: CustomerSession): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('customer_auth'));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('customer_auth'));
}