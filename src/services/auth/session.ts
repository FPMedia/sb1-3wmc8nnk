import { supabase } from '../../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { showError } from '../../utils/toast';

// Check current auth state
export async function checkAuth(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
}

// Refresh session
export async function refreshSession(): Promise<Session | null> {
  try {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) {
      await supabase.auth.signOut();
      return null;
    }
    return session;
  } catch (error) {
    console.error('Session refresh failed:', error);
    return null;
  }
}

// Sign out
export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    showError('Failed to sign out');
    console.error('Sign out failed:', error);
  }
}