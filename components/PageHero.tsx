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
    <div className={`hero-mesh relative overflow-hidden ${isLarge ? 'py-12 sm:py-14 md:py-24' : 'py-7 sm:py-10 md:py-16'}`}>
      <div className="store-container relative z-10">
        <div className={`${isLarge ? 'max-w-3xl' : 'max-w-2xl'}`}>
          <p className="mb-1.5 text-xs font-medium text-blue-100/90 sm:mb-2 sm:text-sm md:mb-3">Gizmoz Trades</p>
          <h1
            className={`font-heading font-bold tracking-tight text-white ${
              isLarge
                ? 'text-[1.65rem] leading-tight sm:text-4xl md:text-5xl'
                : 'text-[1.4rem] leading-tight sm:text-3xl md:text-4xl'
            }`}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={`mt-2 max-w-2xl leading-relaxed text-white/85 sm:mt-3 ${
                isLarge ? 'text-sm sm:text-lg' : 'text-sm sm:text-base'
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
