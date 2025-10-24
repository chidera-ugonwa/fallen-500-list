import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FallenBillionaire {
  id: string;
  rank: number;
  name: string;
  peak_net_worth: number;
  current_net_worth: number;
  country: string | null;
  industry: string | null;
  summary: string;
  details_html: string | null;
  image_url: string | null;
  key_factors: string | null;
  current_status: string | null;
  lessons_learned: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const useFallenBillionaires = () => {
  const [data, setData] = useState<FallenBillionaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: billionaires, error } = await supabase
        .from('fallen_billionaires')
        .select('*')
        .eq('published', true)
        .order('rank', { ascending: true });

      if (error) throw error;
      setData(billionaires || []);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Set up realtime subscription for immediate updates
    const channel = supabase
      .channel('fallen_billionaires_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'fallen_billionaires'
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { data, loading, error, refetch: fetchData };
};