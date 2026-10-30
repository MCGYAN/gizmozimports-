/**
 * Homepage “top picks” caps — keep the home grid short and intentional.
 */

import { supabase } from '@/lib/supabase';

export const HOMEPAGE_FEATURED_PRODUCT_LIMIT = 4;
export const HOMEPAGE_CATEGORY_LIMIT = 4;

export type FeaturedSlotStatus = {
  count: number;
  limit: number;
  remaining: number;
  full: boolean;
};

/** How many products are currently marked featured (optionally ignore one id while editing). */
export async function getFeaturedProductSlotStatus(
  excludeProductId?: string | null,
): Promise<FeaturedSlotStatus> {
  let query = supabase
    .from('products')
    .select('id', { count: 'exact', head: true })
    .eq('featured', true);

  if (excludeProductId) {
    query = query.neq('id', excludeProductId);
  }

  const { count, error } = await query;
  if (error) {
    console.error('[homepage featured count]', error);
    return {
      count: 0,
      limit: HOMEPAGE_FEATURED_PRODUCT_LIMIT,
      remaining: HOMEPAGE_FEATURED_PRODUCT_LIMIT,
      full: false,
    };
  }

  const used = count || 0;
  return {
    count: used,
    limit: HOMEPAGE_FEATURED_PRODUCT_LIMIT,
    remaining: Math.max(0, HOMEPAGE_FEATURED_PRODUCT_LIMIT - used),
    full: used >= HOMEPAGE_FEATURED_PRODUCT_LIMIT,
  };
}

export function featuredHomepageFullMessage(status: FeaturedSlotStatus): string {
  return `Homepage is full (${status.count}/${status.limit}). Turn off “Feature on homepage” on another product first.`;
}
