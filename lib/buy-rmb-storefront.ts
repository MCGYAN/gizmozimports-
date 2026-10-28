import { supabaseAdmin } from '@/lib/supabase-admin';

export const BUY_RMB_STOREFRONT_SETTING_KEY = 'buy_rmb_storefront_enabled';

/** Default ON so existing stores keep showing Buy RMB until admin turns it off. */
export function parseBuyRmbStorefrontEnabled(value: unknown): boolean {
  if (value === false || value === 'false' || value === 0 || value === '0') return false;
  if (value && typeof value === 'object' && 'enabled' in (value as object)) {
    return Boolean((value as { enabled: unknown }).enabled);
  }
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value.toLowerCase() !== 'false';
  // jsonb true / null / missing → enabled
  return true;
}

export async function getBuyRmbStorefrontEnabled(): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('store_settings')
    .select('value')
    .eq('key', BUY_RMB_STOREFRONT_SETTING_KEY)
    .maybeSingle();

  if (error) {
    console.warn('[buy-rmb] could not read storefront setting:', error.message);
    return true;
  }
  if (!data) return true;
  return parseBuyRmbStorefrontEnabled(data.value);
}

export async function setBuyRmbStorefrontEnabled(
  enabled: boolean,
  updatedBy?: string | null,
): Promise<boolean> {
  const { error } = await supabaseAdmin.from('store_settings').upsert(
    {
      key: BUY_RMB_STOREFRONT_SETTING_KEY,
      value: enabled,
      description:
        'When false, Buy RMB is hidden from the online store. Admin desk still works.',
      updated_at: new Date().toISOString(),
      ...(updatedBy ? { updated_by: updatedBy } : {}),
    },
    { onConflict: 'key' },
  );

  if (error) {
    throw new Error(error.message || 'Could not save Buy RMB storefront setting.');
  }
  return enabled;
}
