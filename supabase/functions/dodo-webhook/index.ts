import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, webhook-id, webhook-signature, webhook-timestamp',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const WEBHOOK_SECRET = Deno.env.get('DODO_WEBHOOK_SECRET');
    if (!WEBHOOK_SECRET) {
      throw new Error('DODO_WEBHOOK_SECRET is not configured');
    }

    const body = await req.text();
    
    // Verify webhook signature
    const webhookId = req.headers.get('webhook-id');
    const webhookTimestamp = req.headers.get('webhook-timestamp');
    const webhookSignature = req.headers.get('webhook-signature');

    if (!webhookId || !webhookTimestamp || !webhookSignature) {
      console.error('Missing webhook headers');
      return new Response('Missing webhook headers', { status: 400 });
    }

    // Verify signature: base64(HMAC-SHA256(secret, "webhook_id.timestamp.body"))
    const signedContent = `${webhookId}.${webhookTimestamp}.${body}`;
    
    // The secret may be prefixed with "whsec_", strip it
    const secretKey = WEBHOOK_SECRET.startsWith('whsec_') 
      ? WEBHOOK_SECRET.slice(6) 
      : WEBHOOK_SECRET;
    
    const secretBytes = Uint8Array.from(atob(secretKey), c => c.charCodeAt(0));
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', secretBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signedContent));
    const computedSig = btoa(String.fromCharCode(...new Uint8Array(signature)));

    // Dodo sends multiple signatures separated by spaces, each prefixed with "v1,"
    const expectedSigs = webhookSignature.split(' ').map(s => s.replace('v1,', ''));
    const isValid = expectedSigs.some(s => s === computedSig);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return new Response('Invalid signature', { status: 401 });
    }

    const event = JSON.parse(body);
    console.log('Dodo webhook event:', event.type, JSON.stringify(event));

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const eventType = event.type;
    const payload = event.data;

    if (!payload) {
      console.log('No data in event, skipping');
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract user_id from metadata or look up by email
    let userId = payload.metadata?.user_id;
    
    if (!userId && payload.customer?.email) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', payload.customer.email)
        .maybeSingle();
      
      userId = profile?.id;
    }

    if (!userId) {
      console.error('Could not determine user_id from webhook payload');
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subscriptionId = payload.subscription_id || payload.id;

    switch (eventType) {
      case 'subscription.active': {
        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            status: 'active',
            payment_provider: 'dodo',
            payment_reference: subscriptionId,
            current_period_start: payload.current_period_start || new Date().toISOString(),
            current_period_end: payload.current_period_end || null,
            amount: payload.recurring_pre_tax_amount ? payload.recurring_pre_tax_amount / 100 : 9.99,
            currency: payload.currency || 'USD',
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (error) console.error('Error upserting subscription:', error);
        else console.log('Subscription activated for user:', userId);
        break;
      }

      case 'subscription.renewed': {
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            current_period_start: payload.current_period_start || new Date().toISOString(),
            current_period_end: payload.current_period_end || null,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (error) console.error('Error renewing subscription:', error);
        else console.log('Subscription renewed for user:', userId);
        break;
      }

      case 'subscription.on_hold':
      case 'subscription.failed':
      case 'subscription.cancelled': {
        const status = eventType === 'subscription.on_hold' ? 'on_hold' 
          : eventType === 'subscription.cancelled' ? 'canceled' : 'failed';
        
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (error) console.error(`Error updating subscription to ${status}:`, error);
        else console.log(`Subscription ${status} for user:`, userId);
        break;
      }

      default:
        console.log('Unhandled event type:', eventType);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in dodo-webhook:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
