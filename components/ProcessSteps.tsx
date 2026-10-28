export default function ProcessSteps() {
  const steps = [
    {
      code: '01',
      title: 'Tell us what you need',
      description: 'Send a product photo, specs, quantity, and target timeline on WhatsApp or pick from the store.',
    },
    {
      code: '02',
      title: 'We source and verify',
      description: 'We compare factories in China, confirm build quality, and share verification details.',
    },
    {
      code: '03',
      title: 'You get full cost breakdown',
      description: 'Supplier price, local China transport, air or sea freight, clearing, and our service fee—itemised.',
    },
    {
      code: '04',
      title: 'Pay and track to Ghana',
      description: 'Once approved, we pay the supplier, consolidate at our warehouse, and update you until pickup in Accra.',
    },
  ];

  return (
    <section>
      <div className="mb-6 border-b border-slate-200 pb-4">
        <p className="text-xs font-semibold text-brand-accent">Step-by-step</p>
        <h2 className="mt-1 font-heading text-2xl font-bold text-brand-primary md:text-3xl">
          Four stages from quote to delivery
        </h2>
      </div>
      <ol className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.code} className="flex flex-col justify-between bg-white p-6">
            <div>
              <span className="font-mono text-xs font-semibold text-brand-accent">
                STAGE {step.code}
              </span>
              <h3 className="mt-3 font-heading text-base font-bold text-brand-primary">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
