'use client';

import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** Tall hero for marketing pages; compact for catalog/account flows */
  size?: 'compact' | 'large';
}

export default function PageHero({ title, subtitle, size = 'compact' }: PageHeroProps) {
  const isLarge = size === 'large';

  return (
    <div className={`hero-mesh relative overflow-hidden ${isLarge ? 'py-14 md:py-24' : 'py-10 md:py-16'}`}>
      <div className="store-container relative z-10">
        <div className={`${isLarge ? 'max-w-3xl' : 'max-w-2xl'} max-md:mobile-editorial-inset`}>
          <p className="mb-2 text-sm font-medium text-blue-100/90 md:mb-3">Gizmoz Trades</p>
          <h1
            className={`font-heading font-bold tracking-tight text-white ${
              isLarge
                ? 'text-[1.75rem] leading-tight sm:text-4xl md:text-5xl'
                : 'text-[1.625rem] leading-tight sm:text-3xl md:text-4xl'
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`mt-3 max-w-2xl leading-relaxed text-white/85 ${
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
