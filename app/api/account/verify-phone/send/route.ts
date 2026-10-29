import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { sendPhoneOtp } from '@/lib/phone-otp';
import { maskPhoneDisplay } from '@/lib/auth-copy';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated || !auth.user?.id) {
    return NextResponse.json({ error: auth.error || 'Sign in required' }, { status: 401 });
  }

  let body: { phone?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  try {
    const result = await sendPhoneOtp(auth.user.id, String(body.phone || ''));
    return NextResponse.json({
      success: true,
      phone: result.phone,
      phoneMasked: maskPhoneDisplay(result.phone),
      expiresAt: result.expiresAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not send code.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
