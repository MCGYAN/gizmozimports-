/**
 * One-time script: create an admin user in Supabase Auth and set role in profiles.
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
 *           ADMIN_EMAIL, ADMIN_PASSWORD
 * Run: node scripts/create-admin-user.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function loadEnvLocal() {
  const path = resolve(process.cwd(), '.env.local');
  if (!existsSync(path)) {
    console.error('.env.local not found. Create it with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, ADMIN_PASSWORD');
    process.exit(1);
  }
  const content = readFileSync(path, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        let val = trimmed.slice(eq + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
          val = val.slice(1, -1);
        process.env[key] = val;
      }
    }
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

if (!email || !password) {
  console.error('Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env.local. Add them temporarily, run this script, then remove ADMIN_PASSWORD.');
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function main() {
  console.log('Creating admin user:', email);
  const { data: user, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError) {
    if (createError.message && createError.message.includes('already been registered')) {
      console.log('User already exists. Updating profile to admin...');
      const { data: { users } } = await supabase.auth.admin.listUsers();
      const existing = users.find(u => u.email === email);
      if (!existing) {
        console.error('Could not find existing user.');
        process.exit(1);
      }
      const { error: updateError } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', existing.id);
      if (updateError) {
        console.error('Failed to update profile:', updateError.message);
        process.exit(1);
      }
      console.log('Profile updated. You can log in at /admin/login with', email);
      return;
    }
    console.error('Create user failed:', createError.message);
    process.exit(1);
  }

  const { error: updateError } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', user.user.id);
  if (updateError) {
    console.error('User created but failed to set admin role:', updateError.message);
    process.exit(1);
  }

  console.log('Admin user created. Log in at /admin/login with:', email);
}

main();
