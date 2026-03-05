
# Chargebee Migration Plan

## Summary
Replace Dodo Payments with Chargebee for subscription billing. The `subscriptions` table and `useSubscription` hook stay the same — only the payment provider value and edge function logic change.

## Prerequisites
- Chargebee Site name, API Key, and Publishable Key from the Chargebee dashboard.
- Create a Plan/Item Price in Chargebee for the $9.99/month subscription. Note the `item_price_id`.
- Store `CHARGEBEE_API_KEY` and `CHARGEBEE_SITE` as secrets.

## Steps

### A. Create checkout edge function (`create-chargebee-checkout/index.ts`)
- Authenticate user (same pattern as current).
- Call Chargebee's "Create a hosted checkout page" API: `POST https://{site}.chargebee.com/api/v2/hosted_pages/checkout_new_for_items` with the item price ID and customer email.
- Return the hosted page URL to the frontend.

### B. Create webhook edge function (`chargebee-webhook/index.ts`)
- Verify webhook using Chargebee's webhook password or basic auth.
- Handle events: `subscription_created`, `subscription_activated`, `subscription_renewed`, `subscription_cancelled`, `subscription_paused`, `payment_failed`.
- Upsert/update the `subscriptions` table with `payment_provider: 'chargebee'` and the Chargebee subscription ID as `payment_reference`.

### C. Update cancel-subscription edge function
- Call Chargebee's cancel subscription API: `POST https://{site}.chargebee.com/api/v2/subscriptions/{id}/cancel_for_items` using the `payment_reference` stored in the DB.
- Then update the local `subscriptions` row.

### D. Frontend changes
- Replace `src/lib/dodo.ts` with `src/lib/chargebee.ts` that invokes `create-chargebee-checkout`.
- Update imports in `SubscribeModal.tsx` and `Pricing.tsx`.

### E. Cleanup
- Delete `create-dodo-checkout`, `dodo-webhook` edge functions.
- Remove `DODO_PAYMENTS_API_KEY` and `DODO_WEBHOOK_SECRET` secrets.
- Update `supabase/config.toml` with new function entries.

### F. Database
- No schema changes needed. Existing Dodo subscriptions remain; new ones get `payment_provider: 'chargebee'`.

## Files to Create
- `supabase/functions/create-chargebee-checkout/index.ts`
- `supabase/functions/chargebee-webhook/index.ts`
- `src/lib/chargebee.ts`

## Files to Modify
- `supabase/functions/cancel-subscription/index.ts`
- `src/components/SubscribeModal.tsx`
- `src/pages/Pricing.tsx`
- `supabase/config.toml`

## Files to Delete
- `supabase/functions/create-dodo-checkout/index.ts`
- `supabase/functions/dodo-webhook/index.ts`
- `src/lib/dodo.ts`
