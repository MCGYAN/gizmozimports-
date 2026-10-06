export default function ProcessSteps() {
  const steps = [
    {
      title: 'Tell us what you need',
      description: 'Send product photo, specs, quantity, and timeline on WhatsApp.',
    },
    {
      title: 'We source and verify',
      description: 'We compare suppliers, confirm quality, and share verification proof.',
    },
    {
      title: 'You get full cost breakdown',
      description: 'Product cost + local China logistics + shipping + customs + service fee.',
    },
    {
      title: 'Pay and ship with updates',
      description: 'Once approved, we ship and keep you updated until delivery in Ghana.',
    },
  ];

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black">How it works</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <article key={step.title} className="rounded-card border border-gray-200 bg-white p-5">
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
              {index + 1}
            </div>
            <h3 className="font-semibold text-brand-black">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
