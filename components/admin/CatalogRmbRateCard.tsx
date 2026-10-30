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

  const isSet = savedRate != null && savedRate > 0;

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl border border-brand-primary/10 bg-gradient-to-br from-brand-primary/[0.06] via-white to-brand-accent/[0.05]">
        <div
          className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand-accent/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-10 h-40 w-40 rounded-full bg-brand-primary/10 blur-3xl"
          aria-hidden
        />

        <div className="relative grid gap-6 p-5 md:grid-cols-[1.2fr_auto] md:items-center md:gap-8 md:p-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary text-white shadow-sm shadow-brand-primary/20">
                <i className="ri-exchange-funds-line text-lg" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-accent">
                  Set once
                </p>
                <h2 className="font-heading text-lg font-bold leading-tight text-brand-primary md:text-xl">
                  Catalog RMB rate
                </h2>
              </div>
              {!loading && (
                <span
                  className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold md:ml-2 ${
                    isSet
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/80'
                      : 'bg-amber-50 text-amber-800 ring-1 ring-amber-200/80'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isSet ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  />
                  {isSet ? 'Active' : 'Needed'}
                </span>
              )}
            </div>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
              One rate for every product. Enter supplier prices in RMB — customer cedis update
              automatically on the store. Independent of Buy RMB.
            </p>

            {isSet ? (
              <p className="mt-3 text-xs text-slate-500">
                Live formula · ¥ ÷ {savedRate} → GH¢ · rounded to nearest 10
              </p>
            ) : !loading ? (
              <p className="mt-3 text-xs font-medium text-amber-800/90">
                Add a rate before creating RMB-priced products.
              </p>
            ) : null}
          </div>

          <div className="w-full rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_10px_30px_rgba(17, 24, 39,0.06)] backdrop-blur-sm md:w-[min(100%,22rem)]">
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
              Conversion
            </p>

            <div className="flex items-center justify-center gap-2.5 sm:gap-3">
              <div className="flex min-w-0 flex-col items-center rounded-xl bg-brand-primary/[0.04] px-3 py-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  Cedis
                </span>
                <span className="font-heading text-xl font-bold text-brand-primary">GH¢1</span>
              </div>

              <i className="ri-arrow-right-line text-lg text-brand-accent" aria-hidden />

              <div className="min-w-0 flex-1">
                <label htmlFor="catalog-rmb-rate" className="sr-only">
                  RMB per 1 Ghana cedi
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                    ¥
                  </span>
                  <input
                    id="catalog-rmb-rate"
                    type="number"
                    step="0.001"
                    min="0.001"
                    value={rateInput}
                    onChange={(e) => setRateInput(e.target.value)}
                    disabled={loading}
                    placeholder="0.54"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-12 text-center font-heading text-xl font-bold text-brand-primary tabular-nums placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-slate-300 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                    RMB
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={save}
              disabled={saving || loading}
              className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                'Saving…'
              ) : (
                <>
                  <i className={isSet ? 'ri-refresh-line' : 'ri-check-line'} />
                  {isSet ? 'Update rate' : 'Save rate'}
                </>
              )}
            </button>
          </div>
        </div>
      </section>

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
