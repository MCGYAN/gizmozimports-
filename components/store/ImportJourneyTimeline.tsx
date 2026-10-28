'use client';

import Link from 'next/link';
import { PackageSearch } from 'lucide-react';

const STAGES = [
  { code: '01', label: 'Order received', phase: 'Ghana / Online' },
  { code: '02', label: 'Supplier verified', phase: 'China desk' },
  { code: '03', label: 'Sourced & paid', phase: 'China desk' },
  { code: '04', label: 'China warehouse', phase: 'Consolidation' },
  { code: '05', label: 'Export prep', phase: 'Manifest' },
  { code: '06', label: 'Shipped', phase: 'Air / Sea' },
  { code: '07', label: 'In transit', phase: 'Corridor' },
  { code: '08', label: 'Arrived (Tema)', phase: 'Ghana port' },
  { code: '09', label: 'Customs clearing', phase: 'Tema / Kotoka' },
  { code: '10', label: 'Ready for delivery', phase: 'Accra dispatch' },
];

const MOBILE_MILESTONES = [
  { code: '01', label: 'Order received', detail: 'Quote & invoice confirmed' },
  { code: '02', label: 'Sourced in China', detail: 'Received at China warehouse' },
  { code: '03', label: 'In transit', detail: 'Air or sea freight departed' },
  { code: '04', label: 'Cleared in Ghana', detail: 'Customs & port handling' },
  { code: '05', label: 'Ready for pickup', detail: 'Accra pickup or dispatch' },
];

export default function ImportJourneyTimeline() {
  return (
    <section className="relative overflow-hidden border-b border-slate-900/20 bg-[#172554] py-10 md:py-20">
      <div className="store-container relative">
        <div className="flex flex-col justify-between gap-4 border-b border-white/15 pb-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold text-brand-accent">Shipment tracking</p>
            <h2 className="mt-1 font-heading text-xl font-bold leading-tight tracking-tight text-white md:text-3xl">
              Ten checkpoints from supplier floor to Ghana
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-100/75 md:text-base">
              Every order moves through a recorded manifest so you never have to chase vague shipping promises.
            </p>
          </div>
          <Link
            href="/order-tracking"
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10 sm:text-sm"
          >
            <PackageSearch className="h-4 w-4 text-brand-accent" />
            Look up an order number
          </Link>
        </div>

        {/* Mobile — clean vertical manifest */}
        <ol className="mt-6 divide-y divide-white/10 border-y border-white/10 md:hidden">
          {MOBILE_MILESTONES.map((m) => (
            <li key={m.code} className="flex items-baseline justify-between gap-4 py-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-semibold text-brand-accent">{m.code}</span>
                <span className="text-sm font-semibold text-white">{m.label}</span>
              </div>
              <span className="text-right text-xs text-blue-100/65">{m.detail}</span>
            </li>
          ))}
        </ol>

        {/* Desktop — 10-stage freight ledger grid */}
        <ol className="mt-8 hidden grid-cols-5 border-l border-t border-white/15 md:grid">
          {STAGES.map((stage) => (
            <li
              key={stage.code}
              className="flex flex-col justify-between border-b border-r border-white/15 bg-white/[0.02] p-4 lg:p-5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-brand-accent">{stage.code}</span>
                <span className="text-[11px] text-blue-200/55">{stage.phase}</span>
              </div>
              <p className="mt-4 font-heading text-sm font-semibold text-white lg:text-[15px]">
                {stage.label}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-xs text-blue-200/55">
          Exact checkpoints depend on whether your goods travel by air express or sea freight.
        </p>
      </div>
    </section>
  );
}
