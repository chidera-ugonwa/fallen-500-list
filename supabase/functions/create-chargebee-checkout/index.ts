import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const CHARGEBEE_API_KEY = Deno.env.get('CHARGEBEE_API_KEY');
    const CHARGEBEE_SITE_RAW = Deno.env.get('CHARGEBEE_SITE');
    if (!CHARGEBEE_API_KEY || !CHARGEBEE_SITE_RAW) {
      throw new Error('Chargebee credentials are not configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user?.email) {
      throw new Error('User not authenticated or email not available');
    }

    const origin = req.headers.get('origin') || 'https://fallen500.com';

    // Create Chargebee hosted page checkout
    const chargebeeUrl = `https://${CHARGEBEE_SITE}.chargebee.com/api/v2/hosted_pages/checkout_new_for_items`;
    
    const params = new URLSearchParams();
    params.append('subscription_items[item_price_id][0]', 'Fallen500-P-USD-Monthly');
    params.append('subscription_items[quantity][0]', '1');
    params.append('customer[email]', user.email);
    params.append('customer[first_name]', user.user_metadata?.name || user.email.split('@')[0]);
    params.append('redirect_url', `${origin}/profile?payment=success`);
    params.append('cancel_url', `${origin}/pricing`);
    // Pass user_id in pass_thru_content for webhook identification
    params.append('pass_thru_content', JSON.stringify({ user_id: user.id }));

    const response = await fetch(chargebeeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(CHARGEBEE_API_KEY + ':')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Chargebee API error:', response.status, errorBody);
      throw new Error(`Chargebee API error [${response.status}]: ${errorBody}`);
    }

    const data = await response.json();
    console.log('Chargebee hosted page created:', JSON.stringify(data));

    // Return the hosted page object for Chargebee.js in-page checkout
    return new Response(
      JSON.stringify({ hosted_page: data.hosted_page }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error: any) {
    console.error('Error in create-chargebee-checkout:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
