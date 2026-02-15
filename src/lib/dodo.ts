import { supabase } from "@/integrations/supabase/client";

export async function openDodoCheckout(): Promise<string> {
  const { data, error } = await supabase.functions.invoke('create-dodo-checkout', {
    headers: {
      Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
    },
  });

  if (error) throw new Error(error.message || 'Failed to create checkout');
  if (!data?.url) throw new Error('No checkout URL returned');

  return data.url;
}
