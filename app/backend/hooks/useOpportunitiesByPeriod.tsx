import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export const useOpportunitiesByPeriod = (from: string, to: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .gte('created_at', from)
        .lte('created_at', to);

      if (error) {
        setError(error.message);
        setData([]);
      } else {
        setData(data);
        setError(null);
      }

      setLoading(false);
    };

    fetchData();
  }, [from, to]);

  return { data, loading, error };
};
