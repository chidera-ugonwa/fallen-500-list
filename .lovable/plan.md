
# Switch from Paddle to Dodo Payments

## Summary
Replace the Paddle payment integration with Dodo Payments for subscription management. Dodo uses a server-side checkout session model (similar to Stripe) where your backend creates a checkout URL and redirects the user, rather than an in-page overlay like Paddle.

## What You'll Need
Before implementation, you'll need to provide two secrets from your Dodo Payments dashboard:
1. **DODO_PAYMENTS_API_KEY** -- your API key (from Developer Settings)
2. **DODO_WEBHOOK_SECRET** -- your webhook secret key (from Webhook Settings)

You'll also need to:
- Create a subscription product in your Dodo dashboard and note the **Product ID** (e.g. `prod_xxxxx`)
- Set your webhook URL in the Dodo dashboard to: `https://kyzbzcdkgggxhakwaqmb.supabase.co/functions/v1/dodo-webhook`

## How the New Flow Works

```text
User clicks "Subscribe"
        |
        v
Frontend calls "create-dodo-checkout" backend function
        |
        v
Backend function calls Dodo API to create a Checkout Session
        |
        v
Backend returns checkout_url to frontend
        |
        v
User is redirected to Dodo's hosted checkout page
        |
        v
User completes payment on Dodo's page
        |
        v
Dodo sends webhook to "dodo-webhook" backend function
        |
        v
Backend verifies webhook signature, updates subscription in DB
        |
        v
User is redirected back to /profile?payment=success
```

## Changes

### 1. Remove Paddle.js from `index.html`
Remove the `<script src="https://cdn.paddle.com/paddle/v2/paddle.js">` tag. Dodo uses server-side checkout sessions, so no client-side SDK is needed.

### 2. Delete `src/lib/paddle.ts`
This file is no longer needed since Dodo doesn't use a client-side SDK.

### 3. Create `supabase/functions/create-dodo-checkout/index.ts`
A new backend function that:
- Authenticates the user via their session token
- Calls the Dodo Payments REST API (`POST https://api.dodopayments.com/checkouts`) with your product ID
- Passes the user's email and a `return_url` pointing to `/profile?payment=success`
- Returns the `checkout_url` for the frontend to redirect to

### 4. Create `supabase/functions/dodo-webhook/index.ts`
A new backend function that:
- Receives POST events from Dodo Payments
- Verifies the webhook signature using `DODO_WEBHOOK_SECRET`
- Handles these event types:
  - `subscription.active` -- creates/updates subscription record to "active"
  - `subscription.renewed` -- updates the billing period
  - `subscription.on_hold` -- sets status to "on_hold"
  - `subscription.failed` -- sets status to "failed"
- Looks up the user by the email from the webhook payload and updates the `subscriptions` table

### 5. Update `src/components/SubscribeModal.tsx`
- Remove the `openPaddleCheckout` import
- Instead, call the `create-dodo-checkout` backend function
- Redirect the user to the returned `checkout_url` (opens in same tab or new tab)

### 6. Update `src/pages/Profile.tsx`
- Remove `openPaddleCheckout` import and usage
- The `handleSubscribe` function will call `create-dodo-checkout` and redirect to the checkout URL

### 7. Update `src/pages/Pricing.tsx`
- Remove `openPaddleCheckout` import
- "Get Started" button calls `create-dodo-checkout` and redirects to checkout URL

### 8. Delete `supabase/functions/paddle-webhook/index.ts`
No longer needed.

### 9. Update `supabase/config.toml`
Replace `paddle-webhook` with `dodo-webhook` (both need `verify_jwt = false`). Also add `create-dodo-checkout` (with JWT verification enabled, the default).

### 10. Secret management
- Add `DODO_PAYMENTS_API_KEY` as a new secret
- Add `DODO_WEBHOOK_SECRET` as a new secret
- Existing `PADDLE_WEBHOOK_SECRET` can remain (harmless) or be cleaned up later

## Key Difference: User Identification
Paddle allowed passing `custom_data.user_id` directly in the checkout. Dodo's checkout session uses a `customer.email` field. The webhook will need to look up the user by email in the `profiles` table to find the correct `user_id` for updating the subscription. Alternatively, Dodo supports a `metadata` field on checkout sessions that can carry the `user_id`.

## Files Modified
- `index.html` -- remove Paddle.js script
- `src/components/SubscribeModal.tsx` -- use Dodo checkout
- `src/pages/Profile.tsx` -- use Dodo checkout
- `src/pages/Pricing.tsx` -- use Dodo checkout

## Files Created
- `supabase/functions/create-dodo-checkout/index.ts`
- `supabase/functions/dodo-webhook/index.ts`

## Files Deleted
- `src/lib/paddle.ts`
- `supabase/functions/paddle-webhook/index.ts`

## Technical Notes
- Dodo's API base URL is `https://api.dodopayments.com` for live mode and `https://test.dodopayments.com` for test mode
- Webhook signature verification uses HMAC-SHA256 (similar to Paddle)
- The `subscriptions` table schema stays the same -- only `payment_provider` will be set to `'dodo'` instead of `'paddle'`
- The `cancel-subscription` backend function can remain as-is since it only updates the local DB; for actually canceling on Dodo's side, you'd call their Cancel Subscription API
