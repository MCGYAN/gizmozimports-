import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import {
  getBuyRmbStorefrontEnabled,
  setBuyRmbStorefrontEnabled,
} from '@/lib/buy-rmb-storefront';

/** GET — public: is Buy RMB visible on the storefront? */
export async function GET() {
  const enabled = await getBuyRmbStorefrontEnabled();
  return NextResponse.json({ success: true, enabled });
}

/** PUT — admin: turn Buy RMB storefront visibility on or off */
export async function PUT(req: Request) {
  const auth = await verifyAuth(req, { requireModule: 'exchange' });
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const enabled = Boolean(body.enabled ?? body.storefront_enabled ?? body.is_enabled);

  try {
    await setBuyRmbStorefrontEnabled(enabled, auth.user?.id || null);
    return NextResponse.json({ success: true, enabled });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Could not save setting.' },
      { status: 500 },
    );
  }
}
