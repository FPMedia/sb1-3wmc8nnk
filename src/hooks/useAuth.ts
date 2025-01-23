import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log('useAuth - Setting up auth listener');
    
    // Get initial session
    const initAuth = async () => {
      try {
        console.log('useAuth - Getting initial session');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('useAuth - Initial session:', session);
        
        setUser(session?.user ?? null);
        setIsAdmin(session?.user?.phone === '27767229569');
      } catch (error) {
        console.error('useAuth - Auth initialization error:', error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('useAuth - Auth state changed:', { event: _event, session });
      
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.phone === '27767229569');
      setLoading(false);
    });

    return () => {
      console.log('useAuth - Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    isAdmin,
    isAuthenticated: !!user
  };
}