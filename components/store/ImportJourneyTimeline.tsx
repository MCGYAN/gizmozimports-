'use client';

const STAGES = [
  'Pending',
  'Processing',
  'Sourced',
  'Warehouse (China)',
  'Export prep',
  'Shipped',
  'In transit',
  'Arrived (Tema)',
  'Clearing',
  'Ready for delivery',
];

const MOBILE_MILESTONES = [
  { label: 'Order received' },
  { label: 'Sourced in China' },
  { label: 'Shipped' },
  { label: 'Cleared' },
  { label: 'Delivered' },
];

export default function ImportJourneyTimeline() {
  return (
    <section className="relative overflow-hidden bg-[#172554] py-8 md:py-20">
      <div className="store-container relative">
        <div className="md:max-w-2xl">
          <h2 className="font-heading text-[1.35rem] font-bold leading-tight tracking-tight text-white md:text-[1.75rem] lg:text-[2.25rem]">
            Track your order from China to Ghana
          </h2>
          <p className="mt-1 hidden text-sm leading-relaxed text-white/70 md:mt-2 md:block md:text-base">
            After you pay, follow each step online — no need to keep asking where it is.
          </p>
        </div>

        <div className="mt-5 md:hidden">
          <div className="relative flex justify-between">
            <div className="absolute left-2 right-2 top-[11px] h-0.5 bg-white/15" aria-hidden />
            <div
              className="absolute left-2 top-[11px] h-0.5 w-[88%] bg-brand-accent"
              aria-hidden
            />
            {MOBILE_MILESTONES.map((m, i) => (
              <div
                key={m.label}
                className="relative z-10 flex flex-col items-center"
                style={{ width: `${100 / MOBILE_MILESTONES.length}%` }}
              >
                <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-white ring-2 ring-[#172554]">
                  {i + 1}
                </span>
                <span className="mt-2 max-w-[4.5rem] text-center text-[9px] font-semibold leading-tight text-white/90">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-[11px] text-white/45">
            Full status on your order page · steps can vary by product
          </p>
        </div>

        <div className="relative mt-8 hidden md:mt-10 md:block">
          <div className="flex flex-wrap justify-center gap-2">
            {STAGES.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-accent text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="whitespace-nowrap text-sm font-medium text-white/90">
                    {label}
                  </span>
                </div>
                {i < STAGES.length - 1 ? (
                  <span className="text-white/25" aria-hidden>
                    ·
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/40">
            Steps may vary by product. Your account shows your real status.
          </p>
        </div>
      </div>
    </section>
  );
}
