import { createHash, randomInt, timingSafeEqual } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { normalizeGhPhoneE164 } from '@/lib/auth-copy';
import { sendSMS } from '@/lib/notifications';

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const RESEND_COOLDOWN_MS = 60 * 1000;

function hashOtp(code: string, userId: string, phone: string): string {
  return createHash('sha256').update(`${userId}:${phone}:${code}`).digest('hex');
}

function codesMatch(a: string, b: string): boolean {
  try {
    const bufA = Buffer.from(a, 'hex');
    const bufB = Buffer.from(b, 'hex');
    if (bufA.length !== bufB.length) return false;
    return timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

export function parsePhoneForOtp(raw: string): string | null {
  return normalizeGhPhoneE164(raw);
}

export async function sendPhoneOtp(userId: string, rawPhone: string) {
  const phone = parsePhoneForOtp(rawPhone);
  if (!phone) {
    throw new Error('Enter a valid Ghana phone number (e.g. 0551234567).');
  }

  const { data: latest } = await supabaseAdmin
    .from('phone_otps')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latest?.created_at) {
    const age = Date.now() - new Date(latest.created_at).getTime();
    if (age < RESEND_COOLDOWN_MS) {
      const wait = Math.ceil((RESEND_COOLDOWN_MS - age) / 1000);
      throw new Error(`Wait ${wait}s before requesting another code.`);
    }
  }

  await supabaseAdmin.from('phone_otps').delete().eq('user_id', userId);

  const code = String(randomInt(100000, 999999));
  const expiresAt = new Date(Date.now() + OTP_TTL_MS).toISOString();

  const { error: insertError } = await supabaseAdmin.from('phone_otps').insert({
    user_id: userId,
    phone,
    code_hash: hashOtp(code, userId, phone),
    expires_at: expiresAt,
  });
  if (insertError) {
    throw new Error(insertError.message || 'Could not create verification code.');
  }

  const smsResult = await sendSMS({
    to: phone,
    message: `Your Gizmoz Trades code is ${code}. It expires in 10 minutes. Do not share it.`,
  });

  if (!smsResult) {
    await supabaseAdmin.from('phone_otps').delete().eq('user_id', userId);
    throw new Error('SMS is not configured. Please contact support.');
  }
  if (smsResult.status !== 1) {
    await supabaseAdmin.from('phone_otps').delete().eq('user_id', userId);
    throw new Error('Could not send SMS. Check the number and try again.');
  }

  return { phone, expiresAt };
}

export async function confirmPhoneOtp(userId: string, rawPhone: string, rawCode: string) {
  const phone = parsePhoneForOtp(rawPhone);
  const code = String(rawCode || '').replace(/\D/g, '');
  if (!phone) {
    throw new Error('Enter a valid Ghana phone number.');
  }
  if (code.length !== 6) {
    throw new Error('Enter the 6-digit code from your SMS.');
  }

  const { data: row, error } = await supabaseAdmin
    .from('phone_otps')
    .select('id, code_hash, attempts, expires_at, phone')
    .eq('user_id', userId)
    .eq('phone', phone)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message || 'Could not check code.');
  if (!row) throw new Error('No code found. Request a new SMS code.');
  if (new Date(row.expires_at).getTime() < Date.now()) {
    await supabaseAdmin.from('phone_otps').delete().eq('id', row.id);
    throw new Error('Code expired. Request a new one.');
  }
  if (Number(row.attempts) >= MAX_ATTEMPTS) {
    await supabaseAdmin.from('phone_otps').delete().eq('id', row.id);
    throw new Error('Too many attempts. Request a new code.');
  }

  const expected = hashOtp(code, userId, phone);
  if (!codesMatch(expected, row.code_hash)) {
    await supabaseAdmin
      .from('phone_otps')
      .update({ attempts: Number(row.attempts) + 1 })
      .eq('id', row.id);
    throw new Error('Wrong code. Check the SMS and try again.');
  }

  const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    phone,
    phone_confirm: true,
  });
  if (authError) {
    throw new Error(authError.message || 'Could not save verified phone on your account.');
  }

  await supabaseAdmin
    .from('profiles')
    .update({ phone, updated_at: new Date().toISOString() })
    .eq('id', userId);

  await supabaseAdmin.from('phone_otps').delete().eq('user_id', userId);

  return { phone };
}
