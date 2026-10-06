export default function TrustSection() {
  const checks = [
    'Supplier verification before payment',
    'Video/photo proof from factory or market before shipping',
    'Clear quotation with product + freight + service cost',
    'Tracking updates from dispatch in China to delivery in Ghana',
  ];

  return (
    <section className="rounded-card-lg bg-brand text-white p-8 md:p-10">
      <h2 className="text-2xl md:text-3xl font-bold">Avoid scams when buying from China</h2>
      <p className="mt-3 max-w-3xl text-sm md:text-base text-blue-100">
        We help you verify products and suppliers before money leaves your hands. No blind payments, no unclear fees.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {checks.map((item) => (
          <div key={item} className="rounded-card bg-white/10 p-4">
            <p className="flex items-start gap-2 text-sm md:text-base">
              <i className="ri-shield-check-line mt-0.5 text-brand-accent" />
              <span>{item}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
