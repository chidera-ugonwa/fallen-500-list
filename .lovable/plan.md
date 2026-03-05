

## Plan

### 1. Password visibility toggle on Auth page

Add an eye/eye-off icon button to each password field in the login and signup forms on `src/pages/Auth.tsx`. Clicking toggles `type` between `"password"` and `"text"`.

**Changes:**
- **`src/pages/Auth.tsx`**: Import `Eye` and `EyeOff` from lucide-react. Add `showPassword` state. Wrap each password `<Input>` in a relative container with an absolute-positioned toggle button. Toggle `type` between `"password"` and `"text"`.

### 2. Fix build errors (TypeScript `unknown` type on `error`)

All 5 edge functions have `catch (error)` blocks accessing `error.message` without type narrowing.

**Changes** (same pattern in each file):
- **`supabase/functions/cancel-subscription/index.ts`** (line 51): `catch (error)` → `catch (error: any)` or cast with `(error as Error).message`
- **`supabase/functions/create-dodo-checkout/index.ts`** (line 78): same fix
- **`supabase/functions/delete-account/index.ts`** (line 145): same fix
- **`supabase/functions/dodo-webhook/index.ts`** (line 160): same fix
- **`supabase/functions/generate-billionaire-data/index.ts`** (lines 78, 112, 161): same fix across multiple catch blocks

### 3. Chargebee migration plan (draft)

Below is a plan for switching from Dodo Payments to Chargebee for subscription billing.

#### Overview

Replace the three Dodo-specific edge functions and frontend helper with Chargebee equivalents. The `subscriptions` database table and `useSubscription` hook stay the same -- only the payment provider value and edge function logic change.

#### Steps

**A. Obtain Chargebee credentials**
- Chargebee Site name, API Key, and Publishable Key from the Chargebee dashboard.
- Create a Plan/Item Price in Chargebee for the $9.99/month subscription. Note the `item_price_id`.
- Store `CHARGEBEE_API_KEY` and `CHARGEBEE_SITE` as secrets.

**B. Create checkout edge function** (`create-chargebee-checkout/index.ts`)
- Authenticate user (same pattern as current).
- Call Chargebee's "Create a hosted checkout page" API: `POST https://{site}.chargebee.com/api/v2/hosted_pages/checkout_new_for_items` with the item price ID and customer email.
- Return the hosted page URL to the frontend.

**C. Create webhook edge function** (`chargebee-webhook/index.ts`)
- Verify webhook using Chargebee's webhook password or basic auth.
- Handle events: `subscription_created`, `subscription_activated`, `subscription_renewed`, `subscription_cancelled`, `subscription_paused`, `payment_failed`.
- Upsert/update the `subscriptions` table with `payment_provider: 'chargebee'` and the Chargebee subscription ID as `payment_reference`.

**D. Update cancel-subscription edge function**
- Call Chargebee's cancel subscription API: `POST https://{site}.chargebee.com/api/v2/subscriptions/{id}/cancel_for_items` using the `payment_reference` stored in the DB.
- Then update the local `subscriptions` row.

**E. Frontend changes**
- Replace `src/lib/dodo.ts` with `src/lib/chargebee.ts` that invokes `create-chargebee-checkout`.
- Update imports in `SubscribeModal.tsx` and `Pricing.tsx`.
- Optionally embed Chargebee.js for in-app checkout instead of redirect.

**F. Cleanup**
- Delete `create-dodo-checkout`, `dodo-webhook` edge functions.
- Remove `DODO_PAYMENTS_API_KEY` and `DODO_WEBHOOK_SECRET` secrets.
- Update `supabase/config.toml` with new function entries.

**G. Database**
- No schema changes needed. The `subscriptions` table already has `payment_provider` and `payment_reference` columns.
- Existing Dodo subscriptions remain in the table; new ones get `payment_provider: 'chargebee'`.

