'use client';

import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** Optional corridor or section tag shown in the top ledger strip */
  kicker?: string;
  /** Tall hero for marketing pages; compact for catalog/account flows */
  size?: 'compact' | 'large';
}

export default function PageHero({
  title,
  subtitle,
  kicker = 'CN → GH Sourcing & Freight',
  size = 'compact',
}: PageHeroProps) {
  const isLarge = size === 'large';

  return (
    <div
      className={`hero-mesh relative overflow-hidden border-b border-slate-900/20 ${
        isLarge ? 'py-12 md:py-20' : 'py-9 md:py-14'
      }`}
    >
      <div className="store-container relative z-10">
        <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-white/15 pb-3 text-xs font-medium text-blue-100/80 md:mb-6">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden />
          <span>Gizmoz Trades</span>
          <span className="text-white/30" aria-hidden>
            /
          </span>
          <span className="text-white/90">{kicker}</span>
        </div>

        <div className={isLarge ? 'max-w-3xl' : 'max-w-2xl'}>
          <h1
            className={`font-heading font-bold tracking-tight text-white ${
              isLarge
                ? 'text-[1.85rem] leading-[1.12] sm:text-4xl md:text-[3.1rem]'
                : 'text-[1.65rem] leading-[1.15] sm:text-3xl md:text-4xl'
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`mt-3.5 max-w-2xl leading-relaxed text-blue-100/85 ${
                isLarge ? 'text-[15px] sm:text-lg' : 'text-[15px] sm:text-base'
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
