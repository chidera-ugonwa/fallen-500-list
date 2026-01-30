
# Pre-Deployment Checklist Plan

## Summary
Before publishing, your "Fallen 500" app needs several polish items and essential features to ensure a professional, secure, and legally compliant launch.

---

## Priority 1: Essential / Legal

### 1.1 Add Privacy Policy Page
Create `/privacy` route with a page explaining:
- What data you collect (email, payment info)
- How data is stored (via backend services)
- Third-party services (Paystack, Google OAuth)
- User rights regarding their data

### 1.2 Add Terms of Service Page
Create `/terms` route covering:
- Subscription terms and refund policy
- Content disclaimer (estimates, educational purposes)
- User account responsibilities
- Limitation of liability

### 1.3 Add Footer Links
Update `Footer.tsx` to include links to Privacy Policy and Terms of Service pages.

---

## Priority 2: User Experience

### 2.1 Add Error Boundary Component
Create a global error boundary to catch JavaScript errors and display a friendly fallback UI instead of crashing the entire app.

### 2.2 Restyle 404 Page
Update `NotFound.tsx` to match the dark theme with:
- Background using `bg-background`
- Proper text colors and fonts
- Styled "Return to Home" button

### 2.3 Add Loading Skeletons
Replace plain "Loading..." text with skeleton placeholders in:
- `Articles.tsx`
- `Profile.tsx`
- `FallenList.tsx`

---

## Priority 3: Security

### 3.1 Protect Admin Routes
Either:
- Remove `/populate-database` route before deployment, OR
- Add authentication check to prevent unauthorized access

### 3.2 Implement Proper Account Deletion
Create a backend function to:
- Delete user data from `subscriptions` table
- Delete user data from `profiles` table
- Delete the auth user account

---

## Priority 4: SEO & Branding

### 4.1 Create Custom OG Image
Replace the default Lovable OG image with a branded "Fallen 500" image for better social sharing. Update `index.html` meta tags.

### 4.2 Generate Sitemap
Create a `public/sitemap.xml` with:
- Home page
- Articles page
- Privacy and Terms pages
- Dynamic billionaire detail pages (optional, can be generated)

---

## Priority 5: Content Polish

### 5.1 Consider Adding Billionaire Images
Currently 0 of 500 entries have images. Options:
- Add placeholder images for key entries
- Use industry-related stock images
- Leave as-is (images aren't required for functionality)

---

## Implementation Order

```text
1. Privacy Policy + Terms of Service (legal requirement)
2. Update Footer with legal links
3. Restyle 404 page (quick win)
4. Add Error Boundary (stability)
5. Protect/remove populate-database route (security)
6. Add Loading Skeletons (polish)
7. Custom OG Image + Sitemap (SEO)
8. Account deletion function (compliance)
```

---

## Files to Create
- `src/pages/Privacy.tsx` - Privacy policy page
- `src/pages/Terms.tsx` - Terms of service page
- `src/components/ErrorBoundary.tsx` - Global error handler
- `public/sitemap.xml` - Site map for SEO
- `supabase/functions/delete-account/index.ts` - Account deletion

## Files to Modify
- `src/App.tsx` - Add new routes, wrap with ErrorBoundary
- `src/components/Footer.tsx` - Add legal links
- `src/pages/NotFound.tsx` - Update styling
- `src/pages/Articles.tsx` - Add skeleton loading
- `src/pages/Profile.tsx` - Add skeleton loading
- `index.html` - Update OG image URL

---

## Optional Enhancements (Post-Launch)
- Add newsletter signup
- Social sharing buttons on articles
- Search engine submission
- Analytics integration
- Cookie consent banner (if required by your jurisdiction)
