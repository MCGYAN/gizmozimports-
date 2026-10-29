import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { confirmPhoneOtp } from '@/lib/phone-otp';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const auth = await verifyAuth(req);
  if (!auth.authenticated || !auth.user?.id) {
    return NextResponse.json({ error: auth.error || 'Sign in required' }, { status: 401 });
  }

  let body: { phone?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  try {
    const result = await confirmPhoneOtp(
      auth.user.id,
      String(body.phone || ''),
      String(body.code || ''),
    );
    return NextResponse.json({
      success: true,
      phone: result.phone,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not verify code.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
