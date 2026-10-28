export default function ProcessSteps() {
  const steps = [
    {
      title: 'Shop the products',
      description: 'Browse what is listed on the site and add what you want to your cart.',
    },
    {
      title: 'Get your invoice',
      description: 'Checkout and receive a clear invoice for your order.',
    },
    {
      title: 'Pay',
      description: 'Pay by MoMo or bank using the details on your invoice. Then mark that you have paid.',
    },
    {
      title: 'Track to Ghana',
      description: 'Follow your order step by step from China until it is ready in Ghana.',
    },
  ];

  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-black">How buying works</h2>
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
