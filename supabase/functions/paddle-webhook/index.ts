import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, paddle-signature',
};

async function verifyPaddleSignature(rawBody: string, signature: string, secretKey: string): Promise<boolean> {
  try {
    const parts = signature.split(';');
    const tsStr = parts.find(p => p.startsWith('ts='))?.replace('ts=', '');
    const h1 = parts.find(p => p.startsWith('h1='))?.replace('h1=', '');

    if (!tsStr || !h1) return false;

    const signedPayload = `${tsStr}:${rawBody}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secretKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(signedPayload));
    const computedHash = Array.from(new Uint8Array(sig))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return computedHash === h1;
  } catch (e) {
    console.error('Signature verification error:', e);
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookSecret = Deno.env.get('PADDLE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new Error('PADDLE_WEBHOOK_SECRET not configured');
    }

    const signature = req.headers.get('paddle-signature');
    const body = await req.text();

    if (!signature) {
      console.error('Missing paddle-signature header');
      return new Response('Missing signature', { status: 401 });
    }

    const isValid = await verifyPaddleSignature(body, signature, webhookSecret);
    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response('Invalid signature', { status: 401 });
    }

    const event = JSON.parse(body);
    console.log('Paddle webhook event:', event.event_type);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const eventType = event.event_type;
    const data = event.data;

    if (eventType === 'subscription.activated' || eventType === 'subscription.updated') {
      const userId = data.custom_data?.user_id;
      if (!userId) {
        console.error('No user_id in custom_data');
        return new Response(JSON.stringify({ received: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const status = data.status === 'active' ? 'active' : data.status;
      const currentPeriodStart = data.current_billing_period?.starts_at;
      const currentPeriodEnd = data.current_billing_period?.ends_at;

      const { data: existingSub } = await supabase
        .from('subscriptions')
        .select('id')
        .eq('user_id', userId)
        .single();

      const subData = {
        status,
        payment_reference: data.id,
        payment_provider: 'paddle',
        current_period_start: currentPeriodStart,
        current_period_end: currentPeriodEnd,
        updated_at: new Date().toISOString(),
      };

      if (existingSub) {
        await supabase
          .from('subscriptions')
          .update(subData)
          .eq('user_id', userId);
      } else {
        await supabase
          .from('subscriptions')
          .insert({
            user_id: userId,
            ...subData,
          });
      }

      console.log(`Subscription ${eventType} for user:`, userId);
    } else if (eventType === 'subscription.canceled') {
      const userId = data.custom_data?.user_id;
      if (userId) {
        await supabase
          .from('subscriptions')
          .update({ status: 'canceled', updated_at: new Date().toISOString() })
          .eq('user_id', userId);
        console.log('Subscription canceled for user:', userId);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in paddle-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
