'use client';

import { Search, MessageCircle, Package, MapPin } from 'lucide-react';

const STEPS = [
  { icon: Search, title: 'Look around', desc: 'Find what you need. Gadgets, appliances, and more.', mobileDesc: 'Browse gadgets, appliances & more.' },
  { icon: MessageCircle, title: 'Ask or order', desc: 'Message us on WhatsApp or buy online when you are ready.', mobileDesc: 'WhatsApp us or buy online.' },
  { icon: Package, title: 'We handle it', desc: 'We source it and ship it from China. You do not have to.', mobileDesc: 'We source & ship from China.' },
  { icon: MapPin, title: 'It arrives home', desc: 'Your import lands in Ghana. You know when and where.', mobileDesc: 'Lands in Ghana. You track it.' },
];

export default function ProcessSteps() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-8 md:store-section md:py-16 lg:py-20">
      <div className="store-container">
        <div className="md:max-w-xl">
          <h2 className="font-heading text-[1.35rem] font-bold leading-tight tracking-tight text-brand-primary md:text-[1.75rem] lg:text-[2.25rem]">
            How it works
          </h2>
          <p className="mt-1 hidden text-sm leading-relaxed text-slate-600 md:mt-2 md:block md:text-base">
            Four steps. No confusion. Easier than you thought.
          </p>
        </div>

        <div className="mt-4 md:hidden">
          {STEPS.map((step, i) => (
            <div key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
              {i < STEPS.length - 1 ? (
                <div
                  className="absolute left-[15px] top-8 bottom-0 w-px bg-slate-200"
                  aria-hidden
                />
              ) : null}
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-accent text-[11px] font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1 liquid-glass-card p-3 pb-4">
                <h3 className="font-heading text-[14px] font-bold leading-snug text-brand-primary">
                  {step.title}
                </h3>
                <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500">{step.mobileDesc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 hidden md:mt-10 md:block">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="liquid-glass-card liquid-glass-card-interactive p-5"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent text-sm font-bold text-white shadow-md shadow-brand-accent/20">
                    {i + 1}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg liquid-glass-well">
                    <step.icon className="h-[18px] w-[18px] text-brand-primary" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="font-heading text-[15px] font-bold leading-snug text-brand-primary">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
