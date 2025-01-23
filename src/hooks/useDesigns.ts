import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Design } from '../types';
import { showError } from '../utils/toast';

export function useDesigns() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDesigns() {
      try {
        const { data, error } = await supabase
          .from('designs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (mounted) {
          setDesigns(data || []);
        }
      } catch (err) {
        if (mounted) {
          const error = err instanceof Error ? err : new Error('Failed to fetch designs');
          setError(error);
          showError(error.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchDesigns();

    return () => {
      mounted = false;
    };
  }, []);

  return { designs, loading, error };
}