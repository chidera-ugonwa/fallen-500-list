import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    Chargebee?: {
      init: (config: { site: string; isItemsModel: boolean }) => {
        openCheckout: (options: {
          hostedPage: () => Promise<any>;
          success: (hostedPageId: string) => void;
          error: (error: any) => void;
          close: () => void;
        }) => void;
      };
    };
  }
}

const CHARGEBEE_SITE = 'Fallen500';

function ensureChargebeeLoaded(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Chargebee) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.chargebee.com/v2/chargebee.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Chargebee.js'));
    document.head.appendChild(script);
  });
}

export async function openChargebeeCheckout(): Promise<void> {
  await ensureChargebeeLoaded();

  const cbInstance = window.Chargebee!.init({
    site: CHARGEBEE_SITE,
    isItemsModel: true,
  });

  return new Promise((resolve, reject) => {
    cbInstance.openCheckout({
      hostedPage: async () => {
        const { data, error } = await supabase.functions.invoke('create-chargebee-checkout', {
          headers: {
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        });

        if (error) throw new Error(error.message || 'Failed to create checkout');
        if (!data?.hosted_page) throw new Error('No hosted page returned');

        return data.hosted_page;
      },
      success: (_hostedPageId: string) => {
        resolve();
      },
      error: (error: any) => {
        reject(error);
      },
      close: () => {
        resolve();
      },
    });
  });
}
