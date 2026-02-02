

# Plan: Fix Google Sign-In for Custom Domain & Payment Considerations

## Summary

This plan addresses two issues:
1. **Google Sign-In not working on fallen500.site** - requires adding your custom domain as an allowed redirect URL in the authentication settings
2. **Dollar card payments** - current Paystack setup works but has limitations for international users

---

## Issue 1: Google Sign-In for Custom Domain

### The Problem
Google OAuth uses redirect URLs after authentication. Currently, only the preview URL (`*.lovable.app`) is configured. When users try to sign in from `fallen500.site`, the redirect fails because that domain isn't whitelisted.

### Solution (Manual Configuration Required)
You need to add your custom domain to the authentication settings. This is a configuration change in the backend dashboard, not a code change.

**Steps to complete:**
1. Open the backend dashboard (button provided below)
2. Navigate to **Users** → **Authentication Settings**
3. Find the **Site URL** section and set it to `https://fallen500.site`
4. Find the **Redirect URLs** section and add:
   - `https://fallen500.site`
   - `https://www.fallen500.site`
   - `https://fallen500.site/auth`
   - Keep the existing preview URL as well
5. Save changes

This should enable Google Sign-In to work on your custom domain within a few minutes.

---

## Issue 2: Dollar Card Payments

### Current Setup
Your app currently uses **Paystack** which:
- Processes payments in Nigerian Naira (NGN at ₦15,000)
- Displays price as $9.99 USD to users
- Has limited international card support

### Paystack's International Card Support
Paystack does accept some international cards, but there are limitations:
- Works best with Visa and Mastercard
- Some international cards may be declined
- Currency conversion happens on Paystack's side

### If You Want Broader International Support (Future Consideration)
For the widest international card acceptance, you would need to:
1. Create Stripe edge functions (`stripe-create-checkout` and `stripe-webhook`)
2. Create a Stripe product and price in Stripe Dashboard
3. Update the SubscribeModal to use Stripe instead of Paystack

Since you chose to leave payments as-is, no code changes are needed now. If you later want to switch to Stripe for better international support, let me know.

---

## Action Required From You

Open the backend dashboard and configure the redirect URLs for your custom domain:

