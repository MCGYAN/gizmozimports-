'use client';

import { useEffect, useState } from 'react';

/**
 * Whether Buy RMB should appear on the public store.
 * Until the setting loads, treat as hidden so an OFF store never flashes Buy RMB links.
 */
export function useBuyRmbStorefront() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/exchange/storefront')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (typeof d.enabled === 'boolean') setEnabled(d.enabled);
        else setEnabled(true);
      })
      .catch(() => {
        if (!cancelled) setEnabled(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { enabled: loading ? false : enabled, loading };
}
