import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client with service role key.
 * ONLY use this in API routes and server actions — NEVER in client components.
 * This bypasses RLS, so always verify the caller is authorized first.
 */

// Use fallbacks so `next build` can evaluate modules without env (CI / frontend-only preview).
// Real admin routes still need SUPABASE_SERVICE_ROLE_KEY + NEXT_PUBLIC_SUPABASE_URL at runtime.
const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || 'https://placeholder.supabase.co';
const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || 'placeholder-service-role-key';

if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    console.warn(
        '[supabase-admin] SUPABASE_SERVICE_ROLE_KEY is not set — server admin DB calls will fail until configured.'
    );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});
