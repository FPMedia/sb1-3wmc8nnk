import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Design } from '../types';

export function useDesign(id: string) {
  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDesign = async () => {
      if (!id) {
        setError(new Error('Design ID is required'));
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('designs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Design not found');
        
        setDesign(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching design:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch design'));
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchDesign();
  }, [id]);

  return { design, loading, error };
}