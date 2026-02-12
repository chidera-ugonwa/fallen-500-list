

# Switch from Paystack to Paddle

## Summary
Replace the Paystack payment integration with Paddle. Paddle handles USD pricing natively and accepts international dollar cards, which solves your payment issues.

## What I'll Need From You
Before I start coding, I'll securely request these three values:
1. **Paddle Client-Side Token** (from Paddle Developer Tools > Authentication)
2. **Paddle Price ID** (e.g., `pri_abc123` -- from your product's price in Paddle dashboard)
3. **Paddle Webhook Secret** (from Developer Tools > Notifications after setting the webhook URL)

Your webhook URL to enter in Paddle's dashboard:
`https://kyzbzcdkgggxhakwaqmb.supabase.co/functions/v1/paddle-webhook`

## Changes

### 1. Add Paddle.js script to `index.html`
Load Paddle's client-side SDK so the checkout overlay can open directly on your site (no redirect needed).

### 2. Rewrite `src/components/SubscribeModal.tsx`
- Remove Paystack edge function call
- Initialize Paddle with your Client-Side Token
- Open Paddle checkout overlay with your Price ID, passing user email and user ID as custom data
- Handle checkout completion event to show success feedback

### 3. Update `src/pages/Profile.tsx`
- Replace `handleSubscribe` to open Paddle checkout instead of calling `paystack-initialize`
- Keep cancel subscription logic as-is (direct DB update)

### 4. Update `src/pages/Pricing.tsx`
- "Get Started" button opens Paddle checkout for logged-in users (or redirects to auth if not signed in)

### 5. Create `supabase/functions/paddle-webhook/index.ts`
- Receives POST events from Paddle
- Verifies the webhook signature using `PADDLE_WEBHOOK_SECRET`
- Handles `subscription.activated` -- creates/updates subscription to "active"
- Handles `subscription.canceled` -- sets subscription to "canceled"
- Handles `subscription.updated` -- updates period end date

### 6. Delete Paystack edge functions
- Remove `supabase/functions/paystack-initialize/index.ts`
- Remove `supabase/functions/paystack-webhook/index.ts`

### 7. Update `supabase/config.toml`
- Replace `paystack-webhook` with `paddle-webhook` (both need `verify_jwt = false`)

### 8. Secret management
- Add `PADDLE_WEBHOOK_SECRET` as a new secret
- The `PAYSTACK_SECRET_KEY` secret can remain (harmless) or be cleaned up later

## How the New Flow Works

```text
User clicks "Subscribe"
        |
        v
Paddle.Checkout.open() -- overlay appears on your site
        |
        v
User enters card details (USD, international cards supported)
        |
        v
Paddle processes payment and sends webhook
        |
        v
paddle-webhook edge function verifies signature
        |
        v
Subscription record created/updated in database
        |
        v
User sees active subscription on next page load
```

## Files Modified
- `index.html` -- add Paddle.js script
- `src/components/SubscribeModal.tsx` -- Paddle checkout
- `src/pages/Profile.tsx` -- Paddle checkout
- `src/pages/Pricing.tsx` -- Paddle checkout

## Files Created
- `supabase/functions/paddle-webhook/index.ts`

## Files Deleted
- `supabase/functions/paystack-initialize/index.ts`
- `supabase/functions/paystack-webhook/index.ts`

