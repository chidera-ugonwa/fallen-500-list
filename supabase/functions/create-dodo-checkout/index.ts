import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const DODO_API_URL = 'https://api.dodopayments.com';
const DODO_PRODUCT_ID = 'pdt_0NYa7xOb94FluWMe3eCLw';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const DODO_API_KEY = Deno.env.get('DODO_PAYMENTS_API_KEY');
    if (!DODO_API_KEY) {
      throw new Error('DODO_PAYMENTS_API_KEY is not configured');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Authenticate user
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

    // Create Dodo checkout session
    const response = await fetch(`${DODO_API_URL}/subscriptions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DODO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billing: {
          city: "N/A",
          country: "US",
          state: "N/A",
          street: "N/A",
          zipcode: "00000",
        },
        customer: {
          email: user.email,
          name: user.user_metadata?.name || user.email.split('@')[0],
        },
        product_id: DODO_PRODUCT_ID,
        quantity: 1,
        payment_link: true,
        return_url: `${origin}/profile?payment=success`,
        metadata: {
          user_id: user.id,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Dodo API error:', response.status, errorBody);
      throw new Error(`Dodo API error [${response.status}]: ${errorBody}`);
    }

    const data = await response.json();
    console.log('Dodo checkout created:', JSON.stringify(data));

    return new Response(
      JSON.stringify({ url: data.payment_link }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error in create-dodo-checkout:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
