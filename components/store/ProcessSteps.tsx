'use client';

import { Search, FileText, CreditCard, MapPin } from 'lucide-react';

const STEPS = [
  {
    icon: Search,
    title: 'Shop the list',
    desc: 'Browse products on the site. Pick what you want.',
    mobileDesc: 'Browse and pick what you want.',
  },
  {
    icon: FileText,
    title: 'Get your invoice',
    desc: 'Checkout and receive a clear invoice for your order.',
    mobileDesc: 'Checkout and get a clear invoice.',
  },
  {
    icon: CreditCard,
    title: 'Pay',
    desc: 'Pay by bank or MoMo using the details on your invoice.',
    mobileDesc: 'Pay by bank or MoMo on your invoice.',
  },
  {
    icon: MapPin,
    title: 'Track to Ghana',
    desc: 'Follow your order step by step from China to Ghana.',
    mobileDesc: 'Track it from China to Ghana.',
  },
];

export default function ProcessSteps() {
  return (
    <section className="border-b border-slate-200/80 bg-white py-8 md:store-section md:py-16 lg:py-20">
      <div className="store-container">
        <div className="md:max-w-xl">
          <h2 className="font-heading text-[1.35rem] font-bold leading-tight tracking-tight text-brand-primary md:text-[1.75rem] lg:text-[2.25rem]">
            How buying works
          </h2>
          <p className="mt-1 hidden text-sm leading-relaxed text-slate-600 md:mt-2 md:block md:text-base">
            Four clear steps. No chasing. You stay in control.
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
              <div className="min-w-0 flex-1 border border-slate-200 bg-slate-50 p-3 pb-4">
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
                className="border border-slate-200 bg-white p-5"
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
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
