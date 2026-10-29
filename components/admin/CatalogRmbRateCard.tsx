'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import ProductRepriceModal from '@/components/admin/ProductRepriceModal';
import type { ProductRepriceRow } from '@/lib/product-pricing';

async function authHeaders(): Promise<Record<string, string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    'Content-Type': 'application/json',
    ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
  };
}

/**
 * One-time catalog FX for product pricing (RMB → GH¢).
 * Independent of Buy RMB desk / storefront toggle.
 */
export default function CatalogRmbRateCard() {
  const [rateInput, setRateInput] = useState('');
  const [savedRate, setSavedRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [repriceOpen, setRepriceOpen] = useState(false);
  const [repriceChanges, setRepriceChanges] = useState<ProductRepriceRow[]>([]);
  const [pendingRate, setPendingRate] = useState<number | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const headers = await authHeaders();
      const res = await fetch('/api/admin/products/catalog-rate', { headers });
      const data = await res.json();
      if (!res.ok) return;
      const rate = data.catalog_rmb_rate != null ? Number(data.catalog_rmb_rate) : null;
      if (rate != null && rate > 0) {
        setSavedRate(rate);
        setRateInput(String(rate));
      } else {
        setSavedRate(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    const next = Number(rateInput);
    if (!(next > 0)) {
      alert('Enter a valid rate, e.g. 0.54 (RMB per 1 GH¢).');
      return;
    }

    setSaving(true);
    try {
      const headers = await authHeaders();
      const previous = savedRate;
      const res = await fetch('/api/admin/products/catalog-rate', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ catalog_rmb_rate: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Could not save catalog rate.');
        return;
      }

      const saved = Number(data.catalog_rmb_rate);
      setSavedRate(saved);
      setRateInput(String(saved));

      if (previous != null && Math.abs(previous - saved) > 0.000001) {
        const previewRes = await fetch(
          `/api/admin/products/rmb-reprice?catalog_rmb_rate=${encodeURIComponent(String(saved))}`,
          { headers },
        );
        const previewData = await previewRes.json();
        if (previewRes.ok && Array.isArray(previewData.changes) && previewData.changes.length > 0) {
          setPendingRate(saved);
          setRepriceChanges(previewData.changes);
          setRepriceOpen(true);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="admin-card border border-brand-primary/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Catalog pricing
            </p>
            <h2 className="mt-1 font-heading text-base font-bold text-brand-primary md:text-lg">
              RMB rate for products
            </h2>
            <p className="mt-1 max-w-xl text-sm text-slate-500">
              Set this once. Supplier prices in RMB convert to customer prices in cedis for the
              online store. Separate from Buy RMB — you do not need that desk to sell products.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-end">
            <div className="min-w-[11rem]">
              <label className="mb-1 block text-xs font-semibold text-slate-600">
                1 GH¢ = ? RMB
              </label>
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={rateInput}
                onChange={(e) => setRateInput(e.target.value)}
                disabled={loading}
                placeholder="e.g. 0.54"
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-brand-primary focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
              />
            </div>
            <button
              type="button"
              onClick={save}
              disabled={saving || loading}
              className="admin-btn-primary whitespace-nowrap disabled:opacity-60"
            >
              {saving ? 'Saving…' : savedRate != null ? 'Update rate' : 'Save rate'}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="mt-3 text-xs text-slate-400">Loading rate…</p>
        ) : savedRate != null ? (
          <p className="mt-3 text-xs font-medium text-slate-500">
            Active catalog rate: 1 GH¢ = {savedRate} RMB · prices round to nearest GH¢10
          </p>
        ) : (
          <p className="mt-3 text-xs font-medium text-amber-700">
            No catalog rate yet. Set one before adding products priced in RMB.
          </p>
        )}
      </div>

      <ProductRepriceModal
        open={repriceOpen}
        buyRmbRate={pendingRate ?? 0}
        changes={repriceChanges}
        onClose={() => setRepriceOpen(false)}
        onApplied={() => {
          setRepriceChanges([]);
          setPendingRate(null);
        }}
        getAuthHeaders={authHeaders}
      />
    </>
  );
}
