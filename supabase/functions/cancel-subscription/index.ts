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
    const CHARGEBEE_SITE = Deno.env.get('CHARGEBEE_SITE');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Get the subscription payment_reference to cancel on Chargebee
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('payment_reference, payment_provider')
      .eq('user_id', user.id)
      .maybeSingle();

    // If we have a Chargebee subscription, cancel it on Chargebee's side too
    if (sub?.payment_reference && sub?.payment_provider === 'chargebee' && CHARGEBEE_API_KEY && CHARGEBEE_SITE) {
      try {
        const cancelUrl = `https://${CHARGEBEE_SITE}.chargebee.com/api/v2/subscriptions/${sub.payment_reference}/cancel_for_items`;
        const cancelResponse = await fetch(cancelUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${btoa(CHARGEBEE_API_KEY + ':')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: 'end_of_term=true',
        });

        if (!cancelResponse.ok) {
          const errorBody = await cancelResponse.text();
          console.error('Chargebee cancel error:', cancelResponse.status, errorBody);
        } else {
          console.log('Chargebee subscription canceled:', sub.payment_reference);
        }
      } catch (cbError) {
        console.error('Error calling Chargebee cancel API:', cbError);
      }
    }

    // Update local subscription status
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ 
        status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (updateError) {
      throw updateError;
    }

    console.log('Subscription canceled for user:', user.id);

    return new Response(
      JSON.stringify({ success: true, message: 'Subscription canceled successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error in cancel-subscription:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
