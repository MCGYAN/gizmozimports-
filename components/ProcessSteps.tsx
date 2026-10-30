export default function ProcessSteps() {
  const steps = [
    {
      title: '1. Shop',
      description: 'Look at the products on the site and add what you want.',
    },
    {
      title: '2. Get your bill',
      description: 'Checkout and get a clear invoice for your order.',
    },
    {
      title: '3. Pay',
      description: 'Pay by bank or MoMo using the details on your bill. Then tap that you paid.',
    },
    {
      title: '4. Track to Ghana',
      description: 'Follow the order from China until it is ready for you in Ghana.',
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold text-brand-black md:text-3xl">Four easy steps</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <article key={step.title} className="rounded-card border border-gray-200 bg-white p-5">
            <h3 className="font-semibold text-brand-black">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
