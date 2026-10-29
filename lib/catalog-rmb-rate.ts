import { supabaseAdmin } from '@/lib/supabase-admin';

/** Store setting: RMB per 1 GH¢ used only for product catalog pricing. Independent of Buy RMB desk. */
export const CATALOG_RMB_RATE_SETTING_KEY = 'catalog_rmb_rate';

export function parseCatalogRmbRate(value: unknown): number | null {
  if (value == null) return null;
  if (typeof value === 'number') {
    return Number.isFinite(value) && value > 0 ? value : null;
  }
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  if (typeof value === 'object' && value !== null && 'rate' in value) {
    const n = Number((value as { rate: unknown }).rate);
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return null;
}

export async function getCatalogRmbRate(): Promise<number | null> {
  const { data, error } = await supabaseAdmin
    .from('store_settings')
    .select('value')
    .eq('key', CATALOG_RMB_RATE_SETTING_KEY)
    .maybeSingle();

  if (error) {
    console.warn('[catalog-rmb-rate] could not read setting:', error.message);
    return null;
  }
  if (!data) return null;
  return parseCatalogRmbRate(data.value);
}

export async function setCatalogRmbRate(
  rate: number,
  updatedBy?: string | null,
): Promise<number> {
  const next = Number(rate);
  if (!(next > 0) || !Number.isFinite(next)) {
    throw new Error('Catalog RMB rate must be a positive number (RMB per 1 GH¢).');
  }

  const { error } = await supabaseAdmin.from('store_settings').upsert(
    {
      key: CATALOG_RMB_RATE_SETTING_KEY,
      value: next,
      description:
        'RMB per 1 GH¢ for product pricing. Independent of the Buy RMB exchange desk.',
      updated_at: new Date().toISOString(),
      ...(updatedBy ? { updated_by: updatedBy } : {}),
    },
    { onConflict: 'key' },
  );

  if (error) {
    throw new Error(error.message || 'Could not save catalog RMB rate.');
  }
  return next;
}
