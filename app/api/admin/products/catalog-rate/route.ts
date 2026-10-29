import { NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { getCatalogRmbRate, setCatalogRmbRate } from '@/lib/catalog-rmb-rate';

/** GET — current catalog RMB rate (RMB per 1 GH¢). Independent of Buy RMB desk. */
export async function GET(req: Request) {
  const auth = await verifyAuth(req, { requireModule: 'products' });
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  try {
    const rate = await getCatalogRmbRate();
    return NextResponse.json({
      success: true,
      catalog_rmb_rate: rate,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not load catalog rate';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** PUT { catalog_rmb_rate } — save catalog rate used for RMB → cedis product pricing. */
export async function PUT(req: Request) {
  const auth = await verifyAuth(req, { requireModule: 'products' });
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
  }

  let body: { catalog_rmb_rate?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const rate = Number(body.catalog_rmb_rate);
  if (!(rate > 0)) {
    return NextResponse.json(
      { error: 'Enter a valid catalog rate (RMB per 1 GH¢), e.g. 0.54.' },
      { status: 400 },
    );
  }

  try {
    const saved = await setCatalogRmbRate(rate, auth.user?.id ?? null);
    return NextResponse.json({
      success: true,
      catalog_rmb_rate: saved,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Could not save catalog rate';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
