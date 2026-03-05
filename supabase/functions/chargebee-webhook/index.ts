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
    const body = await req.text();
    const event = JSON.parse(body);
    
    console.log('Chargebee webhook event:', event.event_type, JSON.stringify(event));

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const eventType = event.event_type;
    const content = event.content;

    if (!content) {
      console.log('No content in event, skipping');
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subscription = content.subscription;
    const customer = content.customer;

    if (!subscription) {
      console.log('No subscription in event content, skipping');
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract user_id from pass_thru_content or look up by email
    let userId: string | null = null;

    // Try pass_thru_content first (set during checkout)
    if (subscription.cf_pass_thru_content || content.hosted_page?.pass_thru_content) {
      try {
        const passThru = JSON.parse(subscription.cf_pass_thru_content || content.hosted_page?.pass_thru_content);
        userId = passThru.user_id;
      } catch (e) {
        console.log('Could not parse pass_thru_content');
      }
    }

    // Fallback: look up by customer email
    if (!userId && customer?.email) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customer.email)
        .maybeSingle();
      
      userId = profile?.id || null;
    }

    if (!userId) {
      console.error('Could not determine user_id from webhook payload');
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subscriptionId = subscription.id;
    const currentPeriodStart = subscription.current_term_start 
      ? new Date(subscription.current_term_start * 1000).toISOString() 
      : new Date().toISOString();
    const currentPeriodEnd = subscription.current_term_end 
      ? new Date(subscription.current_term_end * 1000).toISOString() 
      : null;

    switch (eventType) {
      case 'subscription_created':
      case 'subscription_activated':
      case 'subscription_reactivated': {
        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            status: 'active',
            payment_provider: 'chargebee',
            payment_reference: subscriptionId,
            current_period_start: currentPeriodStart,
            current_period_end: currentPeriodEnd,
            amount: subscription.plan_amount ? subscription.plan_amount / 100 : 9.99,
            currency: subscription.currency_code || 'USD',
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (error) console.error('Error upserting subscription:', error);
        else console.log('Subscription activated for user:', userId);
        break;
      }

      case 'subscription_renewed': {
        const { error } = await supabase
          .from('subscriptions')
          .update({
            status: 'active',
            current_period_start: currentPeriodStart,
            current_period_end: currentPeriodEnd,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', userId);

        if (error) console.error('Error renewing subscription:', error);
        else console.log('Subscription renewed for user:', userId);
        break;
      }

      case 'subscription_cancelled':
      case 'subscription_paused':
      case 'payment_failed': {
        const status = eventType === 'subscription_cancelled' ? 'canceled'
          : eventType === 'subscription_paused' ? 'on_hold' : 'failed';
        
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
  } catch (error: any) {
    console.error('Error in chargebee-webhook:', error);
    return new Response(
      JSON.stringify({ error: error?.message || 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
