# Fixing Vercel / Admin Login Errors

## manifest.json 401

**Symptom:** `Manifest fetch from .../manifest.json failed, code 401`

**Cause:** [Vercel Deployment Protection](https://vercel.com/docs/security/deployment-protection) (password or Vercel Auth) returns 401 for unauthenticated requests. The browser requests `/manifest.json` without auth, so it gets 401.

**Fix:**

1. Open your project on [Vercel Dashboard](https://vercel.com/dashboard).
2. Go to **Settings → Deployment Protection**.
3. Either **disable** protection for preview/production, or set **“By pass for”** so that requests to `/manifest.json` (or static assets) are not blocked.  
   (Exact option names depend on your plan; the goal is to allow public access to `/manifest.json`.)

Alternatively, disable “Vercel Authentication” for the deployment so the site is fully public.

---

## store_modules 404

**Symptom:** `.../store_modules?select=... 404` and “Error fetching modules”.

**Cause:** The `store_modules` table does not exist in your Supabase database (migration not applied).

**Fix:** Apply the schema to your Supabase project:

1. In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Run the contents of `supabase/migrations/20260209000000_complete_schema.sql` (or at least the `store_modules` table and its RLS policies).

The app is now written to skip the modules fetch on the login page and to ignore a missing table, so login can still work; applying the migration fixes the 404 and enables the modules feature.

---

## token?grant_type=password 400

**Symptom:** Supabase `/auth/v1/token?grant_type=password` returns **400**.

**Causes:**

- **Invalid email or password** — Use the admin credentials you created (e.g. from `scripts/create-admin-user.mjs`).
- **Wrong env on Vercel** — Production must use the same Supabase project and keys.

**Fix:**

1. In Vercel: **Project → Settings → Environment Variables**.
2. Add (for Production and Preview):
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon/public key
3. Redeploy so the new variables are used.
4. Confirm the admin user exists in Supabase (**Authentication → Users**) and the password is correct.

---

## SES / “Removing unpermitted intrinsics”

This is usually from the browser or an extension (e.g. Trusted Types / SES), not from your app. It can be ignored unless you see broken behavior. To reduce noise, try a normal incognito window or another browser.
